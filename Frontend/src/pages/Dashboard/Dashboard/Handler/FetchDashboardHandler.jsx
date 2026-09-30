import API from "../../../../services/api/axiosInstance";

export const getDashboardData = async () => {
  const res = await API.get("/dashboard");
  return res.data.data;
};

// Backward compatibility alias for any existing imports
export const getStats = getDashboardData;

export const submitTestimonialApi = async (data) => {
  const res = await API.post("/dashboard/testimonial", data);
  return res.data;
};

export const getTestimonialsApi = async () => {
  const res = await API.get("/dashboard/testimonials");
  return res.data.data;
};
