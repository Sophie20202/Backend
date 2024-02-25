import express,{Router} from "express"
import {commentcontroller} from "../controller/commentcontroller"
import VerifyAcess from "../middleware/verifyAcess"

const commentRouter:Router=express.Router()

commentRouter.post("/:blogId",VerifyAcess("user"),commentcontroller.createcomment)
// router.get("/",commentcontroller.getcomment)
// router.get("/:id",commentcontroller.getonecomment)
// router.delete("/",commentcontroller.deletecomment)
// router.delete("/:id",commentcontroller.deleteoncommet)

export default commentRouter





