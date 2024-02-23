import express, { Router } from "express";
import contactcontroller from "../controller/contactcontroller";

const contactRouter: Router = express.Router();

contactRouter.get("/", contactcontroller.contacts);
contactRouter.get("/:id", contactcontroller.contact);
contactRouter.post("/", contactcontroller.createcontact);
contactRouter.put("/:id", contactcontroller.updatecontact);
contactRouter.delete("/:id", contactcontroller.deletecontact);


export default contactRouter;
