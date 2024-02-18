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
                return (0, successmsg_1.default)(res, 200, ` ${blog.length} Users founded successfully!!`, blog);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "No users found");
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
                return (0, errormsg_1.default)(res, 404, "User not found");
            }
            else {
                return (0, successmsg_1.default)(res, 200, "User found successfully", blogs);
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async createblog(req, res) {
        try {
            const blogs = new Blog_1.Blog(req.body);
            await blogs.save();
            // const blogs=await Blog.create(req.body)
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
