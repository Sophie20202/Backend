import express, { Router } from "express";
import userController from "../controller/usercontroller";
import { dataChecker } from "../middleware/datachecker";

const router: Router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", dataChecker.inputIsEmpty, dataChecker.EmailExist, userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);

export default router;
