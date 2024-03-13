import express, { Router } from "express";
import userRouter from "./userRouter";
import blogRouter from "./blogRouter";
import contactRouter from "./contactRouter";
import likesRouter from "./likes"
import commentRouter from "./commentRouter";
// import loginRouter from "./loginRouter"
const router: Router = express.Router();

router.use("/users", userRouter)

router.use("/blogs", blogRouter,commentRouter)

router.use("/contacts",contactRouter )



router.use("/blogs",likesRouter) 

export default router;

