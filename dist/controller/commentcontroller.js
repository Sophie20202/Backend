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
            const comment = await comment_1.Comment.create(req.body);
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
}
exports.commentcontroller = commentcontroller;
