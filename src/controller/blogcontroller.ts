import { Request, Response } from "express";
import   {Blog} from "../models/Blog";
import successmessage from "../utils/successmsg";
import errormessage from "../utils/errormsg";
import bcrypt from "bcrypt";
class blogcontroller{
  public static async getblogs(req: Request, res: Response): Promise<void> {
    try {
      const blog = await Blog.find();
      if (blog){
        return successmessage(
          res,
          200,
          ` ${blog.length} blogs founded successfully!!`,
          blog
        );
      } else {
        return errormessage(res, 404, "No blogs found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async getblog(req: Request, res: Response): Promise<void> {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return errormessage(res, 404, "blog not found");
      } else {
        return successmessage(res, 200, "bolg is founded successfully", blog);
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async createblog(req: Request, res: Response): Promise<void> {
    try {
const { title,message}=req.body
const picture=req.file?.path
      const blogs = new Blog({title,message,picture});
      await blogs.save();

      if (blogs) {
        return successmessage(res, 200, "Blog created successfully!!", blogs);
      } else {
        return errormessage(res, 401, "Blog creation failed");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async updateblog(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (blogs) {
        return successmessage(res, 200, "Blog updated successfully", blogs);
      } else {
        return errormessage(res, 404, "Blog not found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async deleteblog(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await Blog.findByIdAndDelete(req.params.id);
      if (blogs) {
        return successmessage(res, 200, "Blog deleted successfully", blogs);
      } else {
        return errormessage(res, 404, "Blog not found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }
}
export default blogcontroller;
