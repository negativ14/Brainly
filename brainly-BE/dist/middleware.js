"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware = (req, res, next) => {
    const token = req.headers.authorization;
    const decodedData = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (decodedData) {
        if (typeof decodedData === "string") {
            res.status(403).json({
                message: "Logged In"
            });
            return;
        }
        req.userId = decodedData._id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
};
exports.middleware = middleware;
