import express, { Router } from "express";
import blogController from "../controller/blogcontroller";

const blogRouter: Router = express.Router();

blogRouter.get("/", blogController.getBlog);
blogRouter.get("/:id", blogController.getBlogs); // Changed getblog to getblogs
blogRouter.post("/", blogController.createBlog);
blogRouter.put("/:id", blogController.updateBlog);
blogRouter.delete("/:id", blogController.deleteBlog);

export default blogRouter;

