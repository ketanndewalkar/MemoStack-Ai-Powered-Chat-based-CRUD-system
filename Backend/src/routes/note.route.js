import express from "express"
import { createNote, deleteNote, fetchAllNotes, fetchAllNotesInFolder, fetchNote, updateNote } from "../controllers/note.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/all",authMiddleware,fetchAllNotes)
router.get("/folder/:folderId",authMiddleware,fetchAllNotesInFolder)
router.get("/:noteId",authMiddleware,fetchNote)
router.post("/:folderId/new",authMiddleware,createNote)
router.patch("/:noteId",authMiddleware,updateNote)
router.delete("/:noteId",authMiddleware,deleteNote)

export default router