import express, { Router } from "express";
import controller from "../controller/usercontroller";
import { dataChecker } from "../middleware/datachecker";

const router: Router = express.Router();

router.get("/profile", controller.getUsers);
router.get("/profile/:id", controller.getUser);
router.post("/",dataChecker.inputIsEmpty,dataChecker.EmailExist, controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/profile/:id", controller.deleteUser);
router.post("/login",controller.login);
router.delete("/", controller.deleteUsers);
export default router;

