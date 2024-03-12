"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errormsg_1 = __importDefault(require("../utils/errormsg"));
class likecontroller {
    static async Bloglikes(req, res) {
        try {
        }
        catch (error) {
            // Handle any unexpected errors
            console.error(error);
            return (0, errormsg_1.default)(res, 500, 'Internal Server Error');
        }
    }
}
exports.default = likecontroller;
