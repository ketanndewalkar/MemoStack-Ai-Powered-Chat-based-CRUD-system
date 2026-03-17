import express from "express"
import AuthMiddleware from "../middleware/auth.middleware.js";
import { signup, login, logout, refreshAccessToken } from "../controllers/auth.controller.js"
const router = express.Router()

router.post("/signup",signup);
router.post("/login",login);
router.post("/refresh-token",refreshAccessToken);
router.get("/logout",AuthMiddleware,logout);

export default router;