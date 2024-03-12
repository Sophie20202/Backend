import { Request, Response } from "express";
import   {Blog} from "../models/Blog";
import successmessage from "../utils/successmsg";
import errormessage from "../utils/errormsg"; 
import { like } from "../models/like";

class likecontroller{


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
public static  async getLikeStatus(req:Request, res:Response){
    const TotalLike=await like.countDocuments({blogId:req.params.blogid})
    res.status(200).json({
        Total_like:TotalLike,
       
    })
}
public static async createdislikes(req:Request,res:Response):Promise<void>{
    try {
      const blogId=req.params.blogid
      const data={
        blogId
      }
      const dislikes= await like.deleteOne(data)
   
      if(!dislikes){
          return errormessage(res,401,`this bolg id  not exist ${blogId}`)
      }else{
          return successmessage(res,201,'like successfuly posted',dislikes)
      }
    } catch (error) {
       return errormessage(res,500,`${error}`)
    }
}

}
      export default likecontroller;