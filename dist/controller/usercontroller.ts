"use strict";
import { Request, Response } from "express";
import { User } from "../models/user";
import successmsg from "../utils/successmsg";
import errormsg from "../utils/errormsg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendToken from "../utils/token";

class UserController {
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find();
            if (users) {
                return successmsg(res, 200, ` ${users.length} Users founded successfully!!`, users);
            } else {
                return errormsg(res, 404, "No users found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return errormsg(res, 404, "User not found");
            } else {
                return successmsg(res, 200, "User found successfully", user);
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const hashpassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashpassword;
            const user = new User(req.body);
            await user.save();
            if (user) {
                return successmsg(res, 200, "User created successfully!!", user);
            } else {
                return errormsg(res, 401, "User creation failed");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (user) {
                return successmsg(res, 200, "User updated successfully", user);
            } else {
                return errormsg(res, 404, "User not found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (user) {
                return successmsg(res, 200, "User deleted successfully", user);
            } else {
                return errormsg(res, 404, "User not found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const secretKey = process.env.SECRET_KEY;
        try {
            if (!secretKey) {
                return errormsg(res, 500, `Secret key is not defined`);
            }
            const user = await User.findOne({ email });
            if (!user) {
                return errormsg(res, 401, `Invalid email or password`);
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return errormsg(res, 401, `Invalid email or password`);
            }
            const token = jwt.sign({ user: user }, secretKey, { expiresIn: '1d' });
            if (token) {
                return sendToken(res, 200, `User login successful`, user, token);
            } else {
                return errormsg(res, 500, `Failed to generate token`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            return errormsg(res, 500, `Internal server error`);
        }
    }
}

export default UserController;
