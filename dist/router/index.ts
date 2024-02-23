import express, { Router } from "express";
import userRouter from "./userRouter";
import blogRouter from "./blogRouter";
import contactRouter from "./contactRouter";
// import loginRouter from "./loginRouter"

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use("/contact", contactRouter);
// router.use("/login",loginRouter);

export default router;
