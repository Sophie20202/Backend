import { Request, Response } from "express";
import   {Blog} from "../models/Blog";
import successmessage from "../utils/successmsg";
import errormessage from "../utils/errormsg"; 
import { like } from "../models/like";

class likecontroller{
static Bloglikes(arg0: string, Bloglikes: any) {
    throw new Error("Method not implemented.");
}

public static async createlikes(req:Request,res:Response):Promise<void>{
    try {
      const blogId=req.params.blogid
    //   req.body.user=req.user?.user.id
      const data={
        blogId
      }
      const likes= await like.create(data)
    //   const like = await like.findByIdAndUpdate(blogId,{$push:{comments:like}},{new:true})
      if(!like){
          return errormessage(res,401,`this bolg id  not exist ${blogId}`)
      }else{
          return successmessage(res,201,'like successfuly posted',likes)
      }
    } catch (error) {
       return errormessage(res,500,`${error}`)
    }
}
}
      export default likecontroller;