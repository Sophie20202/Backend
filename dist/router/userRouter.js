"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = __importDefault(require("../controller/usercontroller"));
const datachecker_1 = require("../middleware/datachecker");
const router = express_1.default.Router();
router.get("/", usercontroller_1.default.getUsers);
router.get("/:id", usercontroller_1.default.getUser);
router.post("/", datachecker_1.dataChecker.inputIsEmpty, datachecker_1.dataChecker.EmailExist, usercontroller_1.default.createUser);
router.put("/:id", usercontroller_1.default.updateUser);
router.delete("/:id", usercontroller_1.default.deleteUser);
router.post("/login", usercontroller_1.default.login);
router.delete("/", usercontroller_1.default.deleteUsers);
exports.default = router;
