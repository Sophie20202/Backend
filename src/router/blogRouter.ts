import express, { Router } from "express";
import blogcontroller from "../controller/blogcontroller";
import apload from "../middleware/multer"

const blogRouter: Router = express.Router();

blogRouter.get("/", blogcontroller.getblogs);
blogRouter.get("/:id", blogcontroller.getblog);
blogRouter.post("/",apload.single("image"),blogcontroller.createblog);
blogRouter.patch("/:id",apload.single("image"), blogcontroller.updateblog);
blogRouter.delete("/:id", blogcontroller.deleteblog);


export default blogRouter;