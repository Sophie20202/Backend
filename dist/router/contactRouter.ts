import express, { Router } from "express";
import contactController from "../controller/contactcontroller";

const contactRouter: Router = express.Router();

contactRouter.get("/", contactController.contacts);
contactRouter.get("/:id", contactController.contact);
contactRouter.post("/", contactController.createcontact);
contactRouter.put("/:id", contactController.updatecontact);
contactRouter.delete("/:id", contactController.deletecontact);

export default contactRouter;
