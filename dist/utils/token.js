"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenmessage = (res, status, message, token) => {
    res.status(status).json({
        message: message,
        token: token,
    });
};
exports.default = tokenmessage;
