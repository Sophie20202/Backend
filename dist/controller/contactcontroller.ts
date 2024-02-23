"use strict";
import { Request, Response } from "express";
import successmsg from "../utils/successmsg";
import errormsg from "../utils/errormsg";
import { Contact } from "../models/contact";

 class ContactController {
    static async contacts(req: Request, res: Response) {
        try {
            const contact = await Contact.find();
            if (contact.length > 0) {
                return successmsg(res, 200, `${contact.length} Contacts founded successfully!!`, contact);
            } else {
                return errormsg(res, 404, "No Contact found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async contact(req: Request, res: Response) {
        try {
            const contact = await Contact.findById(req.params.id);
            if (!contact) {
                return errormsg(res, 404, "contact not found");
            } else {
                return successmsg(res, 200, "contact found successfully", contact);
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async createcontact(req: Request, res: Response) {
        try {
            const contacts = new Contact(req.body);
            await contacts.save();
            if (contacts) {
                return successmsg(res, 200, "Contact created successfully!!", contacts);
            } else {
                return errormsg(res, 401, "Contact creation failed");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async updatecontact(req: Request, res: Response) {
        try {
            const contacts = await Contact.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (contacts) {
                return successmsg(res, 200, "Contact updated successfully", contacts);
            } else {
                return errormsg(res, 404, "Contact not found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }

    static async deletecontact(req: Request, res: Response) {
        try {
            const contacts = await Contact.findByIdAndDelete(req.params.id);
            if (contacts) {
                return successmsg(res, 200, "Contact deleted successfully", contacts);
            } else {
                return errormsg(res, 404, "Contact not found");
            }
        } catch (error) {
            return errormsg(res, 500, error.message);
        }
    }
}
export default ContactController;