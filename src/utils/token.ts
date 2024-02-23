import { Response } from "express";

const tokenmessage = (res: Response, status: number, message: string, data: any, token:any): void => {
    res.status(status).json({
        message: message,
        data: data
    });
};

export default tokenmessage;