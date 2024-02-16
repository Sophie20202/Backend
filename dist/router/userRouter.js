"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = __importDefault(require("../controller/usercontroller"));
const router = express_1.default.Router();
router.get("/", usercontroller_1.default.getUsers);
router.get("/:id", usercontroller_1.default.getUser);
router.post("/", usercontroller_1.default.createUser);
router.put("/:id", usercontroller_1.default.updateUser);
router.delete("/:id", usercontroller_1.default.deleteUser);
exports.default = router;
