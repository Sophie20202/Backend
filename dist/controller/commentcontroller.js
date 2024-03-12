"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentcontroller = void 0;
const comment_1 = require("../models/comment");
const Blog_1 = require("../models/Blog");
const errormsg_1 = __importDefault(require("../utils/errormsg"));
const successmsg_1 = __importDefault(require("../utils/successmsg"));
class commentcontroller {
    static async createcomment(req, res) {
        try {
            const blogId = req.params.blogId;
            req.body.user = req.user?.user.id;
            const data = {
                message: req.body.message, blogId
            };
            const comment = await comment_1.Comment.create(data);
            const blog = await Blog_1.Blog.findByIdAndUpdate(blogId, { $push: { comments: comment } }, { new: true });
            if (!blog) {
                return (0, errormsg_1.default)(res, 401, `no blog found on this id ${blogId}`);
            }
            else {
                return (0, successmsg_1.default)(res, 201, 'comment successfuly posted', comment);
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, `${error}`);
        }
    }
    static async getcomment(req, res) {
        try {
            const contact = await comment_1.Comment.findById(req.params.id);
            if (!comment_1.Comment) {
                return (0, errormsg_1.default)(res, 404, "comment not found");
            }
            else {
                return (0, successmsg_1.default)(res, 200, "comment found successfully", comment_1.Comment);
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async getcomments(req, res) {
        try {
            const comment = await comment_1.Comment.find({ blogId: req.params.id });
            if (comment) {
                return (0, successmsg_1.default)(res, 200, `  Comments founded successfully!!`, comment);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "No Comment found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async updatecomment(req, res) {
        try {
            const comment = await comment_1.Comment.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (comment) {
                return (0, successmsg_1.default)(res, 200, "Comment updated successfully", comment);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "Comment not found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async deletecomment(req, res) {
        try {
            const comment = await comment_1.Comment.findByIdAndDelete(req.params.id);
            if (comment_1.Comment) {
                return (0, successmsg_1.default)(res, 200, "Comment deleted successfully", comment);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "Comment not found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
}
exports.commentcontroller = commentcontroller;
