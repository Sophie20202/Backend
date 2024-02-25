"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogcontroller_1 = __importDefault(require("../controller/blogcontroller"));
const verifyAcess_1 = __importDefault(require("../middleware/verifyAcess"));
const multer_1 = __importDefault(require("../middleware/multer"));
const blogRouter = express_1.default.Router();
blogRouter.get("/", blogcontroller_1.default.getblog);
blogRouter.get("/:id", blogcontroller_1.default.getblog);
blogRouter.post("/", multer_1.default.single("image"), (0, verifyAcess_1.default)("admin"), blogcontroller_1.default.createblog);
blogRouter.put("/:id", blogcontroller_1.default.updateblog);
blogRouter.delete("/:id", blogcontroller_1.default.deleteblog);
exports.default = blogRouter;
