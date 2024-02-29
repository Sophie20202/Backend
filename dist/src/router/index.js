"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const blogRouter_1 = __importDefault(require("./blogRouter"));
const contactRouter_1 = __importDefault(require("./contactRouter"));
const commentRouter_1 = __importDefault(require("./commentRouter"));
// import loginRouter from "./loginRouter"
const router = express_1.default.Router();
router.use("/user", userRouter_1.default);
router.use("/blog", blogRouter_1.default);
router.use("/contact", contactRouter_1.default);
router.use("/comment", commentRouter_1.default);
// router.use("/login",loginRouter);
exports.default = router;
