"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = require("../models/Blog");
const successmsg_1 = __importDefault(require("../utils/successmsg"));
const errormsg_1 = __importDefault(require("../utils/errormsg"));
const cloudinary_1 = require("cloudinary");
class blogcontroller {
    static async getblogs(req, res) {
        try {
            const blogs = await Blog_1.Blog.find();
            if (blogs) {
                return (0, successmsg_1.default)(res, 200, ` ${blogs.length} blogs founded successfully!!`, blogs);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "No blogs found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async getblog(req, res) {
        try {
            const blog = await Blog_1.Blog.findById(req.params.id);
            if (!blog) {
                return (0, errormsg_1.default)(res, 404, "blog not found");
            }
            else {
                return (0, successmsg_1.default)(res, 200, "bolg is founded successfully", blog);
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async createblog(req, res) {
        try {
            cloudinary_1.v2.config({
                cloud_name: 'dj9doj3zb',
                api_key: '828394813176886',
                api_secret: 'xaFk3eLbhALWnMlwSZPUlB2tH5M'
            });
            const { title, message } = req.body;
            let result = "";
            if (req.file) {
                const uploadedImage = await cloudinary_1.v2.uploader.upload(req.file.path);
                result = uploadedImage.secure_url;
            }
            const image = result;
            console.log(result);
            const blogs = new Blog_1.Blog({ title, message, image });
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
