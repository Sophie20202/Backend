"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentcontroller_1 = require("../controller/commentcontroller");
const verifyAcess_1 = __importDefault(require("../middleware/verifyAcess"));
const commentRouter = express_1.default.Router();
commentRouter.post("/:blogId", (0, verifyAcess_1.default)("user"), commentcontroller_1.commentcontroller.createcomment);
// router.get("/",commentcontroller.getcomment)
// router.get("/:id",commentcontroller.getonecomment)
// router.delete("/",commentcontroller.deletecomment)
// router.delete("/:id",commentcontroller.deleteoncommet)
exports.default = commentRouter;
