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
            const data={
              message:req.body.message,blogId
            }
            const comment = await Comment.create(data)
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

   public static async getcomment(req: Request, res: Response): Promise<void> {
        try {
            const contact = await Comment.findById(req.params.id);
            if (!Comment) {
            return errormessage(res, 404, "comment not found");
            } else {
            return successmessage(res, 200, "comment found successfully", Comment);
            }
            } catch (error) {
            return errormessage(res, 500, (error as Error).message);
        }
    }
    public static async getcomments(req: Request, res: Response): Promise<void> {
            try {
            const comment= await Comment.find();
             if (comment){
             return successmessage(
             res,
             200,
              ` ${comment.length} Comments founded successfully!!`,
             comment
           );
           } else {
            return errormessage(res, 404, "No Comment found");
            }
         } catch (error) {
         return errormessage(res, 500, (error as Error).message);
        }
   }
   public static async updatecomment(req: Request, res: Response): Promise<void> {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (comment ){
        return successmessage(res, 200, "Comment updated successfully", comment);
      } else {
        return errormessage(res, 404, "Comment not found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }
  public static async deletecomment(req: Request, res: Response): Promise<void> {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (Comment) {
        return successmessage(res, 200, "Comment deleted successfully",comment);
      } else {
        return errormessage(res, 404, "Comment not found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }


}
export {commentcontroller}
