import express, { Router } from "express";
import controller from "../controller/usercontroller";
import { dataChecker } from "../middleware/datachecker";
import likecontroller from "../controller/likecontroller";
import VerifyAccess from "../middleware/verifyAcess";

const likesRouter: Router = express.Router();


likesRouter.get("/:blogid/likes", likecontroller.getLikeStatus);
likesRouter.post("/:blogid/likes",likecontroller.createlikes);
likesRouter.delete("/:blogid/likes",likecontroller.createdislikes);

export default likesRouter;


