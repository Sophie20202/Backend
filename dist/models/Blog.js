"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});
exports.Blog = mongoose_1.default.model("Blog", BlogSchema);
