import express,{Router} from "express"
import {commentcontroller} from "../controller/commentcontroller"
import VerifyAcess from "../middleware/verifyAcess"

const commentRouter:Router=express.Router()

commentRouter.post("/:blogId",commentcontroller.createcomment)
commentRouter.get("/:id",commentcontroller.getcomments)// router.get("/",commentcontroller.getcomment)
// commentRouter.get("/:id",VerifyAcess("admin"),commentcontroller.getcomment)
commentRouter.delete("/:id",VerifyAcess("admin"),commentcontroller.deletecomment)
commentRouter.patch("/:id",VerifyAcess,commentcontroller.updatecomment)


export default commentRouter





