import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getDashboardData,
  submitTestimonial,
  getTestimonials,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

// GET /api/v1/dashboard - Main dashboard route (stats, sorted folders by updatedAt, activities by day/week/month, testimonials)
router.get("/", authMiddleware, getDashboardData);

// POST /api/v1/dashboard/testimonial - Submit a new testimonial
router.post("/testimonial", authMiddleware, submitTestimonial);

// GET /api/v1/dashboard/testimonials - Fetch testimonials
router.get("/testimonials", authMiddleware, getTestimonials);

export default router;
