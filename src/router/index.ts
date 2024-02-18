import express, { Router } from "express";
import userRouter from "./userRouter";
import blogRouter from "./blogRouter";
const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/blog", blogRouter);
export default router;

