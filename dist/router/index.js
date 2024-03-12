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
const likes_1 = __importDefault(require("./likes"));
// import loginRouter from "./loginRouter"
const router = express_1.default.Router();
router.use("/user", userRouter_1.default /*
#swagger.tags = ['USERS']
*/);
router.use("/blog", blogRouter_1.default /*
#swagger.tags = ['BLOGS']
*/);
router.use("/contact", contactRouter_1.default /*
#swagger.tags = ['CONTACTS']
*/);
router.use("/comment", commentRouter_1.default /*
#swagger.tags = ['COMMENTS']
*/);
router.use("/likes", likes_1.default);
exports.default = router;
