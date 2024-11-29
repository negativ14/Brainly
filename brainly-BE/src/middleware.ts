import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Request, Response, NextFunction } from "express";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    const decodedData = jwt.verify(token as string, JWT_SECRET);

    if (decodedData) {
        if (typeof decodedData === "string") {
            res.status(403).json({
                message: "Logged In"
            })
            return;
        }

        req.userId = (decodedData as JwtPayload)._id;
        next();
    }
    else{
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}