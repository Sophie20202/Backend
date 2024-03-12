import express, { Router } from "express";
import controller from "../controller/usercontroller";
import { dataChecker } from "../middleware/datachecker";
import likecontroller from "../controller/likecontroller";
import VerifyAccess from "../middleware/verifyAcess";

const likesRouter: Router = express.Router();


likesRouter.get("/:blogid", likecontroller.getLikeStatus);
likesRouter.post("/:blogid",likecontroller.createlikes);
likesRouter.delete("/:blogid",likecontroller.createdislikes);

export default likesRouter;


