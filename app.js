import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";

const app = express();
app.use(express.json())
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.johozl0.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database and listening to the server"))
  .catch((error) => console.log(error));
