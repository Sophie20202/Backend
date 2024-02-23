import { Request, Response } from "express";
import successmessage from "../utils/successmsg";
import errormessage from "../utils/errormsg";
import bcrypt from "bcrypt";
import { Contact } from "../models/contact";

class contactcontroller{
  public static async contacts(req: Request, res: Response): Promise<void> {
    try {
      const contact= await Contact.find();
      if (contact){
        return successmessage(
          res,
          200,
          ` ${contact.length} Contacts founded successfully!!`,
          contact
        );
      } else {
        return errormessage(res, 404, "No Contact found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async contact(req: Request, res: Response): Promise<void> {
    try {
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return errormessage(res, 404, "contact not found");
      } else {
        return successmessage(res, 200, "contact found successfully", contact);
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async createcontact(req: Request, res: Response): Promise<void> {
    try {

      const contacts = new Contact(req.body);
      await contacts.save();
      // const blogs=await Blog.create(req.body)

      if (contacts) {
        return successmessage(res, 200, "Contact created successfully!!", contacts);
      } else {
        return errormessage(res, 401, "Contact creation failed");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async updatecontact(req: Request, res: Response): Promise<void> {
    try {
      const contacts = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (contacts) {
        return successmessage(res, 200, "Contact updated successfully", contacts);
      } else {
        return errormessage(res, 404, "Contact not found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }

  public static async deletecontact(req: Request, res: Response): Promise<void> {
    try {
      const contacts = await Contact.findByIdAndDelete(req.params.id);
      if (contacts) {
        return successmessage(res, 200, "Contact deleted successfully",contacts);
      } else {
        return errormessage(res, 404, "Contact not found");
      }
    } catch (error) {
      return errormessage(res, 500, (error as Error).message);
    }
  }
}
export default contactcontroller;