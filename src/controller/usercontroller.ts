import { Request, Response } from "express";
import { User } from "../models/user";
import successmessage from "../utils/successmsg";
import errormessage from "../utils/errormsg";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import tokenmessage from "../utils/token";
import { getMaxListeners } from "events";

class Usercontroller {
  public static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      if (users) {
        return successmessage(
          res,
          200,
          ` ${users.length} Users founded successfully!!`,
          users
        );
      } else {
        return errormessage(res, 404, "No users found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return errormessage(res, 404, "User not found");
      } else {
        return successmessage(res, 200, "User found successfully", user);
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const hashpassword: string = bcrypt.hashSync(req.body.password, 10);
      const{firstname,lastname,email,password,role}=req.body
      const user = new User({firstname,lastname,email,password:hashpassword,role});
      await user.save();

      if (user) {
        return successmessage(res, 200, "User created successfully!!", user);
      } else {
        return errormessage(res, 401, "User creation failed");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (user) {
        return successmessage(res, 200, "User updated successfully", user);
      } else {
        return errormessage(res, 404, "User not found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        return successmessage(res, 200, "User deleted successfully", user);
      } else {
        return errormessage(res, 404, "User not found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }
    public static async deleteUsers(req: Request, res: Response): Promise<void> {
      try {
        const users = await User.deleteMany();
        if (users) {
          return successmessage(
            res,
            200,
            ` All Users deleted successfully!!`,
            null
          );
        } else {
          return errormessage(res, 404, "No users deleted");
        }
      } catch (error) {
        return errormessage(res, 500, (error as Error).message);
      }
    }
  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const secretKey ="Sophie"
    try {
        if (!secretKey) {
            return errormessage(res, 500, `Secret key is not defined`);
        }
        const user = await User.findOne({ email });
        if (!user) {
            return errormessage(res, 401, `Invalid email or password`);
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return errormessage(res, 401, `Invalid email or password`);
        }
        const token = jwt.sign({ user: user }, secretKey, { expiresIn: '1d' });
        if (token) {
            return tokenmessage(res, 200, `User login successful`,token);
        } else {
            return errormessage(res, 500, `Failed to generate token`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        return errormessage(res, 500, `Internal server error`);
    }


  }

}
export default Usercontroller;



