import express from "express"
import { createLink, deleteLink, fetchAllLinks, fetchLinkById, updateLink } from "../controllers/link.contoller.js"
import authMiddleware from "../middleware/auth.middleware.js"
const router = express.Router()

router.get("/all",authMiddleware,fetchAllLinks)
router.get("/:linkId",authMiddleware,fetchLinkById)
router.post("/",authMiddleware,createLink)
router.patch("/:linkId",authMiddleware,updateLink)
router.delete("/:linkId",authMiddleware,deleteLink)

export default router;