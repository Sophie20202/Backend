"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenmessage = (res, status, message, data, token) => {
    res.status(status).json({
        message: message,
        data: data
    });
};
exports.default = tokenmessage;
