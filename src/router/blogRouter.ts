import express, { Router } from "express";
import blogcontroller from "../controller/blogcontroller";
import VerifyAccess from "../middleware/verifyAcess";
import apload from "../middleware/multer"

const blogRouter: Router = express.Router();

blogRouter.get("/", blogcontroller.getblogs);
blogRouter.get("/:id", blogcontroller.getblog);
blogRouter.post("/",apload.single("image"),VerifyAccess("admin"),blogcontroller.createblog);
blogRouter.put("/:id", blogcontroller.updateblog);
blogRouter.delete("/:id", blogcontroller.deleteblog);


export default blogRouter;