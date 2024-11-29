// types/express/index.d.ts

import { JwtPayload } from "jsonwebtoken";

// Extend Express' Request interface
declare global {
    namespace Express {
        interface Request {
            userId?: string; // or the appropriate type for userId
            // You can also add other properties you want to extend:
            // isAdmin?: boolean;
        }
    }
}
