import express,{Router} from "express"
import {commentcontroller} from "../controller/commentcontroller"
import VerifyAcess from "../middleware/verifyAcess"

const commentRouter:Router=express.Router()

commentRouter.post("/:blogId/comments",commentcontroller.createcomment)
commentRouter.get("/:blogId/comments",commentcontroller.getcomments)// router.get("/",commentcontroller.getcomment)
// commentRouter.get("/:id",VerifyAcess("admin"),commentcontroller.getcomment)
commentRouter.delete("/:id/comments",VerifyAcess("admin"),commentcontroller.deletecomment)
commentRouter.patch("/:id/comments",VerifyAcess,commentcontroller.updatecomment)


export default commentRouter





