"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = require("../models/Blog");
const successmsg_1 = __importDefault(require("../utils/successmsg"));
const errormsg_1 = __importDefault(require("../utils/errormsg"));
class blogcontroller {
    static async getblog(req, res) {
        try {
            const blog = await Blog_1.Blog.find();
            if (blog) {
                return (0, successmsg_1.default)(res, 200, ` ${blog.length} blogs founded successfully!!`, blog);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "No blogs found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async getblogs(req, res) {
        try {
            const blogs = await Blog_1.Blog.findById(req.params.id);
            if (!blogs) {
                return (0, errormsg_1.default)(res, 404, "blog not found");
            }
            else {
                return (0, successmsg_1.default)(res, 200, "bolgs found successfully", blogs);
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async createblog(req, res) {
        try {
            const { title, message } = req.body;
            const picture = req.file?.path;
            const blogs = new Blog_1.Blog({ title, message, picture });
            await blogs.save();
            if (blogs) {
                return (0, successmsg_1.default)(res, 200, "Blog created successfully!!", blogs);
            }
            else {
                return (0, errormsg_1.default)(res, 401, "Blog creation failed");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async updateblog(req, res) {
        try {
            const blogs = await Blog_1.Blog.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (blogs) {
                return (0, successmsg_1.default)(res, 200, "Blog updated successfully", blogs);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "Blog not found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async deleteblog(req, res) {
        try {
            const blogs = await Blog_1.Blog.findByIdAndDelete(req.params.id);
            if (blogs) {
                return (0, successmsg_1.default)(res, 200, "Blog deleted successfully", blogs);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "Blog not found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
}
exports.default = blogcontroller;
