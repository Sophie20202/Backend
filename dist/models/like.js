"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.like = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const likeSchema = new mongoose_1.default.Schema({
    blogId: {
        type: String,
        required: true,
    },
    userlike: {
        type: Boolean,
        default: true
    },
});
exports.like = mongoose_1.default.model("like", likeSchema);
