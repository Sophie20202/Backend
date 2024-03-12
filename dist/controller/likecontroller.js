"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const successmsg_1 = __importDefault(require("../utils/successmsg"));
const errormsg_1 = __importDefault(require("../utils/errormsg"));
const like_1 = require("../models/like");
class likecontroller {
    static Bloglikes(arg0, Bloglikes) {
        throw new Error("Method not implemented.");
    }
    static async createlikes(req, res) {
        try {
            const blogId = req.params.blogid;
            //   req.body.user=req.user?.user.id
            const data = {
                blogId
            };
            const likes = await like_1.like.create(data);
            //   const like = await like.findByIdAndUpdate(blogId,{$push:{comments:like}},{new:true})
            if (!like_1.like) {
                return (0, errormsg_1.default)(res, 401, `this bolg id  not exist ${blogId}`);
            }
            else {
                return (0, successmsg_1.default)(res, 201, 'like successfuly posted', likes);
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, `${error}`);
        }
    }
    static async getLikeStatus(req, res) {
        const TotalLike = await like_1.like.countDocuments({ blogId: req.params.blogid });
        res.status(200).json({
            Total_like: TotalLike,
        });
    }
}
exports.default = likecontroller;
