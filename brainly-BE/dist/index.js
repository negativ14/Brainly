"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_2 = require("./db");
const middleware_1 = require("./middleware");
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const PORT = 3000;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.connectDb)();
app.post("/api/v1/signUp", async (req, res) => {
    try {
        const userInput = zod_1.z.object({
            username: zod_1.z.string().min(3).max(15),
            password: zod_1.z.string()
                .min(6)
                .max(15)
                .regex(/[A-Za-z]/, "Password must contain at least one letter")
                .regex(/\d/, "Password must contain at least one digit")
                .regex(/[\W_]/, "Password must contain at least one special character"),
            email: zod_1.z.string().email(),
        });
        const parsedUserInput = userInput.safeParse(req.body);
        if (!parsedUserInput.success) {
            return res.status(400).json({
                message: "Bad request",
                error: parsedUserInput.error.errors.map(err => err.message),
            });
        }
        const { username, password, email } = req.body;
        const existingUser = await db_2.UserModel.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with the same username or email.",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_2.UserModel.create({
            username,
            password: hashedPassword,
            email,
        });
        if (!user) {
            return res.status(403).json({
                message: "User sign up failed",
            });
        }
        res.status(200).json({
            message: "User signed up successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Server side issue: ${error}`,
        });
    }
});
app.post("/api/v1/signIn", async (req, res) => {
    try {
        const userInput = zod_1.z.object({
            username: zod_1.z.string().min(3).max(15),
            password: zod_1.z.string()
                .min(6)
                .max(15)
                .regex(/[A-Za-z]/, "Password must contain at least one character")
                .regex(/\d/, "Password must conatin at least one digit")
                .regex(/[\W_]/, "Password must contain at least one special character"),
        });
        const parsedUserInput = userInput.safeParse(req.body);
        if (!parsedUserInput.success) {
            return res.status(403).json({
                message: "Bad request",
                error: parsedUserInput.error.errors.map(err => err.message)
            });
        }
        const { username, password } = req.body;
        const user = await db_2.UserModel.findOne({ username: username });
        if (!user) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect Password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, config_1.JWT_SECRET);
        res.status(200).json({
            message: "User signed in successfully",
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`
        });
    }
});
//diskStorage() if you want to store the file in a specific location
app.post("/api/v1/add-content", middleware_1.middleware, upload.single('file'), async (req, res) => {
    try {
        const { title, link, type, tags, date } = req.body;
        const fileStorage = req.file?.buffer;
        await db_1.ContentModel.create({
            title,
            link,
            type,
            userId: req.userId,
            tags,
            file: fileStorage,
            date,
        });
        res.status(200).json({
            message: "Content created successfully!"
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`
        });
    }
});
app.get("/api/v1/get-content", middleware_1.middleware, async (req, res) => {
    try {
        const userId = req.userId;
        const content = await db_1.ContentModel.find({ userId }).populate("userId", "username"); // is userId ke table me bas username dalna hai na ki password email etc..
        // ContentModel.find({ userId }): Finds all the content items for a specific userId.
        // .populate("userId", "username"): Replaces the userId in the content with the actual User document, but only includes the username field from the User document.
        res.status(200).json({
            content: content
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`
        });
    }
});
app.delete("/api/v1/delete-content", middleware_1.middleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { contentId } = req.body;
        console.log("content id =", contentId);
        // const objectId = ObjectId(contentId); 
        // console.log(contentId);
        console.log(typeof contentId);
        // const objectContentId = ObjectId(contentId);
        // console.log(objectId);
        const resposne = await db_1.ContentModel.deleteOne({
            userId,
            _id: contentId
        });
        console.log(resposne);
        res.status(200).json({
            message: "Content deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`
        });
    }
});
app.post("/api/v1/brain/share", middleware_1.middleware, async (req, res) => {
    try {
        const share = req.body.share;
        const userId = req.userId;
        const generateHash = (length) => {
            return crypto_1.default.randomBytes(length).toString("hex").slice(0, length);
        };
        if (share) {
            const link = await db_1.LinkModel.findOne({ userId });
            if (link) {
                return res.status(201).json({
                    message: "Already Link available",
                    hash: link.hash
                });
            }
            const hash = generateHash(10);
            await db_1.LinkModel.create({
                hash,
                userId
            });
            res.status(200).json({
                message: "Created Link",
                GeneratedHash: hash
            });
        }
        else {
            await db_1.LinkModel.deleteOne({ userId });
            res.status(200).json({
                message: "Deleted Link"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`,
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    try {
        const shareLink = req.params.shareLink;
        const link = await db_1.LinkModel.findOne({
            hash: shareLink
        });
        if (!link) {
            return res.status(411).json({
                message: "Wrong Link",
            });
        }
        const content = await db_1.ContentModel.find({ userId: link.userId });
        // console.log(`${link.userId} log no 1`)
        // console.log(`${typeof(link.userId)} log no 2`)
        const user = await db_2.UserModel.findOne({ _id: link.userId });
        if (!user) {
            return res.status(411).json({
                message: "User not found"
            });
        }
        // console.log(`${user.username} log no 3`)
        res.status(200).json({
            username: user.username,
            content: content
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`,
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
