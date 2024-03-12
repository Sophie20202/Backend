import express, { Router } from "express";
import controller from "../controller/usercontroller";
import { dataChecker } from "../middleware/datachecker";
import likecontroller from "../controller/likecontroller";
import VerifyAccess from "../middleware/verifyAcess";

const likesRouter: Router = express.Router();


// likesRouter.get("/:blogid", likecontroller.Bloglikes);
likesRouter.post("/:blogid",likecontroller.createlikes);

export default likesRouter;


