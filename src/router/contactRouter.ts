import express, { Router } from "express";
import contactcontroller from "../controller/contactcontroller";

const contactRouter: Router = express.Router();

contactRouter.get("/", contactcontroller.contacts);
contactRouter.get("/messages/:id", contactcontroller.contact);
contactRouter.post("/messages", contactcontroller.createcontact);
contactRouter.put("/:id", contactcontroller.updatecontact);
contactRouter.delete("/messages/:id", contactcontroller.deletecontact);


export default contactRouter;
