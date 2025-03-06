import express from 'express';
import { addBlog, getAllBlogs,getBlog } from '../controllers/blog.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';  

const router = express.Router();

router.post("/addBlog", protectRoute, addBlog);
router.get("/AllBlogs", getAllBlogs);
router.get("/:blogid", getBlog);

export default router;