"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const successmessage = (res, status, message, data) => {
    res.status(status).json({
        message: message,
        data: data
    });
};
exports.default = successmessage;
