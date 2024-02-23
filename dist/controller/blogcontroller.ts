import { Request, Response } from "express";
import { Blog } from "../models/Blog";
import successmsg from "../utils/successmsg";
import errormsg from "../utils/errormsg";

class BlogController {
    static async getBlog(req: Request, res: Response) {
        try {
            const blog = await Blog.find();
            if (blog.length > 0) {
                return successmsg(res, 200, `${blog.length} Users founded successfully!!`, blog);
            } else {
                return errormsg(res, 404, "No users found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async getBlogs(req: Request, res: Response) {
        try {
            const blogs = await Blog.findById(req.params.id);
            if (!blogs) {
                return errormsg(res, 404, "User not found");
            } else {
                return successmsg(res, 200, "User found successfully", blogs);
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async createBlog(req: Request, res: Response) {
        try {
            const blog = new Blog(req.body);
            await blog.save();
            if (blog) {
                return successmsg(res, 200, "Blog created successfully!!", blog);
            } else {
                return errormsg(res, 401, "Blog creation failed");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async updateBlog(req: Request, res: Response) {
        try {
            const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (blog) {
                return successmsg(res, 200, "Blog updated successfully", blog);
            } else {
                return errormsg(res, 404, "Blog not found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async deleteBlog(req: Request, res: Response) {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            if (blog) {
                return successmsg(res, 200, "Blog deleted successfully", blog);
            } else {
                return errormsg(res, 404, "Blog not found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }
}
export default BlogController;