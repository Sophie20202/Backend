import {Request,Response, NextFunction } from "express";
import { User } from "../models/user";
import errormessage from "../utils/errormsg";
class dataChecker{
    public static async inputIsEmpty(req:Request, res:Response,next : NextFunction) :Promise<void> {
    const{firstName,lastName,email,passWord}=req.body
    if(firstName ==""){
        return errormessage(res,201,`Please enter your latstname`)
    }else if(lastName == ""){
        return errormessage(res,201,`Please enter your firstname`)
    }else if(email == ""){
        return errormessage(res,201,`please enter your Email `)
    }
    else if(passWord == ""){
        return errormessage(res,201,`please enter your password`)
    }
    else{
        next()
    }
    }
    public static async EmailExist(req:Request,res:Response,next:NextFunction):Promise<void>{
        const {email}=req.body
        const user = await User.findOne({email})
        if(user){
            return errormessage(res,200,`email exist`)
        }else {
            next()
        }
    }
}
export { dataChecker }