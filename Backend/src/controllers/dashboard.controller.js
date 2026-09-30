import Folder from "../models/folder.model.js";
import Note from "../models/note.model.js";
import Testimonial from "../models/testimonial.model.js";

// Helper to calculate activity data across Day, Week, and Month
const calculateActivities = async (userId) => {
  const now = new Date();

  // 1. Day Activity (Last 7 days, daily counts)
  const dayLabels = [];
  const dayData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const nextD = new Date(d);
    nextD.setDate(nextD.getDate() + 1);

    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const formattedDate = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const [notesCount, foldersCount] = await Promise.all([
      Note.countDocuments({
        userId,
        createdAt: { $gte: d, $lt: nextD },
      }),
      Folder.countDocuments({
        userId,
        createdAt: { $gte: d, $lt: nextD },
      }),
    ]);

    dayLabels.push(`${dayName} (${formattedDate})`);
    dayData.push({
      label: dayName,
      fullDate: formattedDate,
      notes: notesCount,
      folders: foldersCount,
      total: notesCount + foldersCount,
    });
  }

  // 2. Week Activity (Last 4 weeks)
  const weekData = [];
  for (let i = 3; i >= 0; i--) {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(startOfWeek.getDate() - (i * 7 + 6));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    const [notesCount, foldersCount] = await Promise.all([
      Note.countDocuments({
        userId,
        createdAt: { $gte: startOfWeek, $lt: endOfWeek },
      }),
      Folder.countDocuments({
        userId,
        createdAt: { $gte: startOfWeek, $lt: endOfWeek },
      }),
    ]);

    const label = i === 0 ? "This Week" : `${i}w ago`;
    weekData.push({
      label,
      range: `${startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`,
      notes: notesCount,
      folders: foldersCount,
      total: notesCount + foldersCount,
    });
  }

  // 3. Month Activity (Last 6 months)
  const monthData = [];
  for (let i = 5; i >= 0; i--) {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

    const monthName = startOfMonth.toLocaleDateString("en-US", {
      month: "short",
    });

    const [notesCount, foldersCount] = await Promise.all([
      Note.countDocuments({
        userId,
        createdAt: { $gte: startOfMonth, $lt: endOfMonth },
      }),
      Folder.countDocuments({
        userId,
        createdAt: { $gte: startOfMonth, $lt: endOfMonth },
      }),
    ]);

    monthData.push({
      label: monthName,
      year: startOfMonth.getFullYear(),
      notes: notesCount,
      folders: foldersCount,
      total: notesCount + foldersCount,
    });
  }

  return {
    day: dayData,
    week: weekData,
    month: monthData,
  };
};

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // 1. Fetch Folders sorted by updatedAt (descending)
    const sortedFolders = await Folder.find({ userId })
      .sort({ updatedAt: -1 })
      .lean();

    // Attach note count to each folder
    const foldersWithNotesCount = await Promise.all(
      sortedFolders.map(async (f) => {
        const count = await Note.countDocuments({ folderId: f._id });
        return {
          ...f,
          notesCount: count,
          date: f.updatedAt
            ? new Date(f.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recently",
        };
      })
    );

    // 2. Counts for Stats Cards
    const [totalFolders, totalNotes] = await Promise.all([
      Folder.countDocuments({ userId }),
      Note.countDocuments({ userId }),
    ]);

    const stats = [
      {
        title: "Total Folders",
        value: totalFolders,
      },
      {
        title: "Total Notes",
        value: totalNotes,
      },
    ];

    // 3. Activity trends across day, week, month
    const activities = await calculateActivities(userId);

    // 4. Testimonials (fetched from DB, fallback provided if empty)
    let testimonialsList = await Testimonial.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    if (testimonialsList.length === 0) {
      testimonialsList = [
        {
          _id: "default-1",
          name: "Alex Johnson",
          role: "Product Designer",
          message:
            "MemoStack improved how I organize knowledge and notes seamlessly.",
        },
        {
          _id: "default-2",
          name: "Sarah Lee",
          role: "Developer",
          message:
            "A powerful tool for managing notes, AI interactions, and bookmarks.",
        },
      ];
    }

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        stats,
        recentFolders: foldersWithNotesCount,
        activities,
        testimonials: testimonialsList,
      },
    });
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching dashboard data",
      error: error.message,
    });
  }
};

export const submitTestimonial = async (req, res) => {
  try {
    const { name, role, message, rating } = req.body;
    const userId = req.user ? req.user._id || req.user.id : null;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message/Feedback is required",
      });
    }

    const testimonialName =
      (name && name.trim()) ||
      (req.user && (req.user.name || req.user.username || req.user.email)) ||
      "Anonymous";

    const testimonialRole = (role && role.trim()) || "MemoStack User";

    const newTestimonial = await Testimonial.create({
      userId,
      name: testimonialName,
      role: testimonialRole,
      message: message.trim(),
      rating: Number(rating) || 5,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial submitted successfully! Thank you for your feedback.",
      data: newTestimonial,
    });
  } catch (error) {
    console.error("Error in submitTestimonial:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while submitting testimonial",
      error: error.message,
    });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("Error in getTestimonials:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching testimonials",
      error: error.message,
    });
  }
};
