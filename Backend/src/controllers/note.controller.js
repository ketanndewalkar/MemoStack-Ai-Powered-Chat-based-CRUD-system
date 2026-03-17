import note from "../models/note.model.js";
import { noteDefaultStructure } from "../utils/noteDefaultStructure.js";

export const fetchAllNotes = async (req, res) => {
  try {
    const existUser = req.user;
    const allNotes = await note.find({ userId: existUser.id });
    res.status(200).json({
      message: "fetcehd All Notes",
      data: allNotes,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllNotesInFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    if (!folderId) {
      res.status(400).json({
        message: "invalid request",
      });
    }
    console.log();
    const allNotesInFolder = await note.find({ folderId });
    res.status(200).json({
      message: "fetched Notes in Folder Successfully",
      data: allNotesInFolder,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    if (!noteId) {
      res.status(400).json({
        message: "Invalid Request",
      });
    }
    const Note = await note.findById(noteId);
    res.status(200).json({
      message: "Fetched Note Successfully",
      data: Note,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNote = async (req, res) => {
  try {
    const { name, content } = req.body;
    const { folderId } = req.params;
    const existUser = req.user;
    if (!name) {
      res.status(400).json({
        message: "All field is required",
      });
    }
    if (!folderId) {
      res.status(400).json({
        message: "Folder is not recognizable",
      });
    }
    const newNote = await note.create({
      name,
      content,
      userId: existUser.id,
      folderId,
    });
    await newNote.save();
    res.status(201).json({
      message: "created Note Successfully",
      data: newNote,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const {name,content} = req.body
    if (!noteId) {
      res.status(400).json({
        message: "Invalid Requests",
      });
    }
    console.log(req.body)
    const updatedNote = await note.findByIdAndUpdate(
      noteId,
      {
        ...req.body,
      },
      { new: true },
    );
    res.status(200).json({
      message: "updated Note Successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    if (!noteId) {
      res.status(400).json({
        message: "Invalid Request",
      });
    }
    await note.findByIdAndDelete(noteId);
    res.status(200).json({
      message: "deleted Node Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
