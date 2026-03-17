import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { createFolder, deleteFolder, fetchAllFolder, fetchFolder, updateFolders } from "../controllers/folder.controller.js";
const router = express.Router();

router.get("/all",authMiddleware,fetchAllFolder)
router.get("/:folderId",authMiddleware,fetchFolder)
router.post("/",authMiddleware,createFolder)
router.delete("/:folderId",authMiddleware,deleteFolder)
router.patch("/:folderId",authMiddleware,updateFolders)
export default router;