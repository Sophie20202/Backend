import express, { Router } from "express";
import controller from "../controller/usercontroller";
import { dataChecker } from "../middleware/datachecker";

const router: Router = express.Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);
router.post("/",dataChecker.inputIsEmpty,dataChecker.EmailExist, controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);
router.post("/login",controller.login);
export default router;

