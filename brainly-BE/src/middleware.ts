import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Request, Response, NextFunction } from "express";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(403).json({
            message: 'Token not found'
        });
        return
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);

        // If the decodedData is a string (invalid token), return error
        if (typeof decodedData === "string") {
            res.status(403).json({
                message: "Invalid token"
            });
            return 
        }

        req.userId = (decodedData as JwtPayload)._id;

        next();
    } catch (error) {
         res.status(403).json({
            message: "You are not logged in or token is expired"
        });
    }
};
