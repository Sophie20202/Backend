"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const successmsg_1 = __importDefault(require("../utils/successmsg"));
const errormsg_1 = __importDefault(require("../utils/errormsg"));
const contact_1 = require("../models/contact");
class contactcontroller {
    static async contacts(req, res) {
        try {
            const contact = await contact_1.Contact.find();
            if (contact) {
                return (0, successmsg_1.default)(res, 200, ` ${contact.length} Contacts founded successfully!!`, contact);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "No Contact found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async contact(req, res) {
        try {
            const contact = await contact_1.Contact.findById(req.params.id);
            if (!contact) {
                return (0, errormsg_1.default)(res, 404, "contact not found");
            }
            else {
                return (0, successmsg_1.default)(res, 200, "contact found successfully", contact);
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async createcontact(req, res) {
        try {
            const contacts = new contact_1.Contact(req.body);
            await contacts.save();
            // const blogs=await Blog.create(req.body)
            if (contacts) {
                return (0, successmsg_1.default)(res, 200, "Contact created successfully!!", contacts);
            }
            else {
                return (0, errormsg_1.default)(res, 401, "Contact creation failed");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async updatecontact(req, res) {
        try {
            const contacts = await contact_1.Contact.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (contacts) {
                return (0, successmsg_1.default)(res, 200, "Contact updated successfully", contacts);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "Contact not found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
    static async deletecontact(req, res) {
        try {
            const contacts = await contact_1.Contact.findByIdAndDelete(req.params.id);
            if (contacts) {
                return (0, successmsg_1.default)(res, 200, "Contact deleted successfully", contacts);
            }
            else {
                return (0, errormsg_1.default)(res, 404, "Contact not found");
            }
        }
        catch (error) {
            return (0, errormsg_1.default)(res, 500, error.message);
        }
    }
}
exports.default = contactcontroller;
