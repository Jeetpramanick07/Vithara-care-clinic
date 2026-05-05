import express from "express";
import {
  getBlogs,
  getAdminBlogs,
  getAdminBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes must come before "/:slug"
router.get("/admin/all", protect, getAdminBlogs);
router.get("/admin/:id", protect, getAdminBlogById);

// Public routes
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// Protected admin CRUD
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;