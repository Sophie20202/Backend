"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogcontroller_1 = __importDefault(require("../controller/blogcontroller"));
const blogRouter = express_1.default.Router();
blogRouter.get("/", blogcontroller_1.default.getblog);
blogRouter.get("/:id", blogcontroller_1.default.getblog);
blogRouter.post("/", blogcontroller_1.default.createblog);
blogRouter.put("/:id", blogcontroller_1.default.updateblog);
blogRouter.delete("/:id", blogcontroller_1.default.deleteblog);
exports.default = blogRouter;
