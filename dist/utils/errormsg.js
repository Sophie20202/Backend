"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errormessage = (res, status, message) => {
    res.status(status).json({
        message: message,
    });
};
exports.default = errormessage;
