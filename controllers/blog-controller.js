import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlogs = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by id" });
  }
  let blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};
export const updateBlogs = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  try {
    // Find the blog by ID and update its title and description
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });

    // Check if the blog was found and updated successfully
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Return the updated blog as a response
    return res.status(200).json({ blog: updatedBlog });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getBlogById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(400).json({ message: "unable to delete" });
  }
  return res.status(200).json({ message: "Sucessfully deleted" });
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;

  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ blogs: userBlogs });
};
