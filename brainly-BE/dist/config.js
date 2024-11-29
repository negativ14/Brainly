"use strict";
// export const JWT_SECRET : string  = process.env.JWT_SECRET || "DEFAULT-SECRET";
// export const MONGOOSE_URL : string = process.env.MONGOOSE_URL || "NO-URL";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGOOSE_URL = exports.JWT_SECRET = void 0;
//way 1
//ye bhi kaam karega, bas make sure karna ki undefined value na jaye
// if (!process.env.JWT_SECRET || !process.env.MONGOOSE_URL) {
//     throw new Error("Required environment variables are missing");
//   }
// export const JWT_SECRET: string = process.env.JWT_SECRET!;
// export const MONGOOSE_URL: string = process.env.MONGOOSE_URL!;
//way-2
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET || "Default";
exports.MONGOOSE_URL = process.env.MONGOOSE_URL || "URL";
//way-3  best way
// The ! operator tells TypeScript:
// "I know what I'm doing."
// "I guarantee that process.env.JWT_SECRET will always have a value at runtime."
// "Trust me, JWT_SECRET is not undefined. Treat it as a string."
// When Should You Use !?
// Use it only if:
// You are 100% certain that the value will never be null or undefined.
// You have external validation to ensure the environment variable exists, such as:
// A .env file with all required values.
// Code that explicitly checks for the variable and throws an error if it's missing.
