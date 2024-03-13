"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const blogRouter_1 = __importDefault(require("./blogRouter"));
const contactRouter_1 = __importDefault(require("./contactRouter"));
const likes_1 = __importDefault(require("./likes"));
const commentRouter_1 = __importDefault(require("./commentRouter"));
// import loginRouter from "./loginRouter"
const router = express_1.default.Router();
router.use("/users", userRouter_1.default);
router.use("/blogs", blogRouter_1.default, commentRouter_1.default);
router.use("/contacts", contactRouter_1.default);
router.use("/blogs", likes_1.default);
exports.default = router;
