import express,{Router} from "express"
import {commentcontroller} from "../controller/commentcontroller"
import VerifyAcess from "../middleware/verifyAcess"

const commentRouter:Router=express.Router()

commentRouter.post("/:blogId",VerifyAcess("user"),commentcontroller.createcomment)
commentRouter.get("/",VerifyAcess("admin"),commentcontroller.getcomments)// router.get("/",commentcontroller.getcomment)
commentRouter.get("/:id",VerifyAcess("admin"),commentcontroller.getcomment)
commentRouter.delete("/:id",VerifyAcess("admin"),commentcontroller.deletecomment)


export default commentRouter





