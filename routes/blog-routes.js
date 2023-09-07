import express from "express";
import {
  getAllBlogs,
  addBlogs,
  deleteBlog,
  getBlogById,
  updateBlogs,
  getUserById,
} from "../controllers/blog-controller";
const blogRouter = express.Router();
blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlogs);
blogRouter.put("/update/:id", updateBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserById);

export default blogRouter;
