"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactcontroller_1 = __importDefault(require("../controller/contactcontroller"));
const contactRouter = express_1.default.Router();
contactRouter.get("/", contactcontroller_1.default.contacts);
contactRouter.get("/:id", contactcontroller_1.default.contact);
contactRouter.post("/", contactcontroller_1.default.createcontact);
contactRouter.put("/:id", contactcontroller_1.default.updatecontact);
contactRouter.delete("/:id", contactcontroller_1.default.deletecontact);
exports.default = contactRouter;
