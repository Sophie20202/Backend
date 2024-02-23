"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataChecker = void 0;
const user_1 = require("../models/user");
const errormsg_1 = __importDefault(require("../utils/errormsg"));
class dataChecker {
    static async inputIsEmpty(req, res, next) {
        const { firstName, lastName, email, passWord } = req.body;
        if (firstName == "") {
            return (0, errormsg_1.default)(res, 201, `Please enter your latstname`);
        }
        else if (lastName == "") {
            return (0, errormsg_1.default)(res, 201, `Please enter your firstname`);
        }
        else if (email == "") {
            return (0, errormsg_1.default)(res, 201, `please enter your Email `);
        }
        else if (passWord == "") {
            return (0, errormsg_1.default)(res, 201, `please enter your password`);
        }
        else {
            next();
        }
    }
    static async EmailExist(req, res, next) {
        const { email } = req.body;
        const user = await user_1.User.findOne({ email });
        if (user) {
            return (0, errormsg_1.default)(res, 200, `email exist`);
        }
        else {
            next();
        }
    }
}
exports.dataChecker = dataChecker;
