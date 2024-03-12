"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likecontroller_1 = __importDefault(require("../controller/likecontroller"));
const likesRouter = express_1.default.Router();
// likesRouter.get("/:blogid", likecontroller.Bloglikes);
likesRouter.post("/:blogid", likecontroller_1.default.createlikes);
exports.default = likesRouter;
