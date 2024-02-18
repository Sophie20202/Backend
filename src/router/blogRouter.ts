import express, { Router } from "express";
import blogcontroller from "../controller/blogcontroller";

const blogRouter: Router = express.Router();

blogRouter.get("/", blogcontroller.getblog);
blogRouter.get("/:id", blogcontroller.getblog);
blogRouter.post("/", blogcontroller.createblog);
blogRouter.put("/:id", blogcontroller.updateblog);
blogRouter.delete("/:id", blogcontroller.deleteblog);

export default blogRouter;