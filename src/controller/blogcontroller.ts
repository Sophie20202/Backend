import { Request, Response } from "express";
import   {Blog} from "../models/Blog";
import successmessage from "../utils/successmsg";
import errormessage from "../utils/errormsg";
import bcrypt from "bcrypt";
class blogcontroller{
  public static async getblog(req: Request, res: Response): Promise<void> {
    try {
      const blog = await Blog.find();
      if (blog){
        return successmessage(
          res,
          200,
          ` ${blog.length} Users founded successfully!!`,
          blog
        );
      } else {
        return errormessage(res, 404, "No users found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async getblogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await Blog.findById(req.params.id);

      if (!blogs) {
        return errormessage(res, 404, "User not found");
      } else {
        return successmessage(res, 200, "User found successfully", blogs);
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async createblog(req: Request, res: Response): Promise<void> {
    try {

      const blogs = new Blog(req.body);
      await blogs.save();
      // const blogs=await Blog.create(req.body)

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
