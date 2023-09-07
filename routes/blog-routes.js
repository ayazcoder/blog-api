import express from "express";
import { getAllBlogs, addBlogs, deleteBlog, getBlogById, updateBlogs } from "../controllers/blog-controller";
const blogRouter = express.Router();
blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlogs);
blogRouter.put('/update/:id', updateBlogs);
blogRouter.get('/:id', getBlogById);
blogRouter.delete('/:id', deleteBlog);


export default blogRouter;