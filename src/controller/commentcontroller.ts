import express,{Request,Response} from "express"
import { Comment } from "../models/comment"
import { Blog } from "../models/Blog"
import errormessage from "../utils/errormsg"
import successmessage from "../utils/successmsg"
class commentcontroller{
    public static async createcomment(req:Request,res:Response):Promise<void>{
          try {
            const blogId=req.params.blogId
            req.body.user=req.user?.user.id
            const comment = await Comment.create(req.body)
            const blog = await Blog.findByIdAndUpdate(blogId,{$push:{comments:comment}},{new:true})
            if(!blog){
                return errormessage(res,401,`no blog found on this id ${blogId}`)
            }else{
                return successmessage(res,201,'comment successfuly posted',comment)
            }
          } catch (error) {
             return errormessage(res,500,`${error}`)
          }
    }
}
export {commentcontroller}
