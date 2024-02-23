"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const successmsg_1 = __importDefault(require("../utils/successmsg"));
const errormsg_1 = __importDefault(require("../utils/errormsg"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../utils/token"));
class Usercontroller {
    static async getUsers(req, res) {
        try {
            const users = await user_1.User.find();
            if (users) {
                return (0, successmsg_1.default)(res, 200, ` ${users.length} Users founded successfully!!`, users);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "No users found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async getUser(req, res) {
        try {
            const user = await user_1.User.findById(req.params.id);
            if (!user) {
                return (0, errormsg_1.default)(res, 404, "User not found");
            }
            else {
                return (0, successmsg_1.default)(res, 200, "User found successfully", user);
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async createUser(req, res) {
        try {
            const hashpassword = bcrypt_1.default.hashSync(req.body.password, 10);
            req.body.password = hashpassword;
            const user = new user_1.User(req.body);
            await user.save();
            if (user) {
                return (0, successmsg_1.default)(res, 200, "User created successfully!!", user);
            }
            else {
                return (0, errormsg_1.default)(res, 401, "User creation failed");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async updateUser(req, res) {
        try {
            const user = await user_1.User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (user) {
                return (0, successmsg_1.default)(res, 200, "User updated successfully", user);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "User not found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async deleteUser(req, res) {
        try {
            const user = await user_1.User.findByIdAndDelete(req.params.id);
            if (user) {
                return (0, successmsg_1.default)(res, 200, "User deleted successfully", user);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "User not found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async login(req, res) {
        const { email, password } = req.body;
        const secretKey = process.env.SECRET_KEY;
        try {
            if (!secretKey) {
                return (0, errormsg_1.default)(res, 500, `Secret key is not defined`);
            }
            const user = await user_1.User.findOne({ email });
            if (!user) {
                return (0, errormsg_1.default)(res, 401, `Invalid email or password`);
            }
            const comparePassword = bcrypt_1.default.compareSync(password, user.password);
            if (!comparePassword) {
                return (0, errormsg_1.default)(res, 401, `Invalid email or password`);
            }
            const token = jsonwebtoken_1.default.sign({ user: user }, secretKey, { expiresIn: '1d' });
            if (token) {
                return (0, token_1.default)(res, 200, `User login successful`, user, token);
            }
            else {
                return (0, errormsg_1.default)(res, 500, `Failed to generate token`);
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            return (0, errormsg_1.default)(res, 500, `Internal server error`);
        }
    }
}
exports.default = Usercontroller;
