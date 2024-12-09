import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import cors from "cors";
import { connectDb, ContentModel, LinkModel } from "./db";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { UserModel } from "./db";
import mongoose, { ObjectId } from "mongoose";
import { middleware } from "./middleware";
import crypto from "crypto";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

const PORT = 3000;

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const app = express();
app.use(express.json());
app.use(cors());
connectDb();


app.post("/api/v1/signUp", async (req: Request, res: Response): Promise<any> => {
    try {
        const userInput = z.object({
            username: z.string().min(3).max(15),
            password: z.string()
                .min(6)
                .max(15)
                .regex(/[A-Za-z]/, "Password must contain at least one letter")
                .regex(/\d/, "Password must contain at least one digit")
                .regex(/[\W_]/, "Password must contain at least one special character"),
            email: z.string().email(),
        });

        const parsedUserInput = userInput.safeParse(req.body);

        if (!parsedUserInput.success) {
            return res.status(400).json({
                message: "Bad request",
                error: parsedUserInput.error.errors.map(err => err.message),
            });
        }

        const { username, password, email } = req.body;

        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with the same username or email.",
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await UserModel.create({
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
    } catch (error) {
        res.status(500).json({
            message: `Server side issue: ${error}`,
        });
    }
});


app.post("/api/v1/signIn", async (req: Request, res: Response): Promise<any> => {
    try {
        const userInput = z.object({
            username: z.string().min(3).max(15),
            password: z.string()
            .min(6)
            .max(15)
            .regex(/[A-Za-z]/, "Password must contain at least one character")
            .regex(/\d/, "Password must conatin at least one digit") 
            .regex(/[\W_]/, "Password must contain at least one special character"),
        })

        const parsedUserInput = userInput.safeParse(req.body);

        if(!parsedUserInput.success){
            return res.status(403).json({
                message:"Bad request",
                error: parsedUserInput.error.errors.map(err => err.message)
            })
        }

        interface User {
            username: string;
            email: string;
            password: string;
            _id: ObjectId;
        }

        const { username, password } = req.body;
        const user : User | null = await UserModel.findOne( {username: username} );

        if(!user){
            return res.status(403).json({
                message: "Incorrect credentials"
            })
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if(!passwordMatch){
            return res.status(403).json({
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET);

        res.status(200).json({
            message: "User signed in successfully",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`
        })
    }
});


//diskStorage() if you want to store the file in a specific location

app.post("/api/v1/add-content", middleware, upload.single('file'), async (req: Request, res: Response) => {
    try{
        const { title, link, type, tags, date}: { title: string, link: string, type: string, tags: string[], date: string} = req.body;
        const fileStorage = req.file?.buffer;

        console.log("file ",fileStorage);

        await ContentModel.create({
            title,
            link,
            type,
            userId: req.userId,
            tags,
            file: fileStorage,
            date,
        })

        res.status(200).json({
            message: "Content created successfully!"
        })
    }
    catch(error){
        res.status(500).json({
            message: `Server side issue ${error}`
        })
    }
});

app.get("/api/v1/get-content", middleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const content = await ContentModel.find({ userId }).populate("userId", "username"); // is userId ke table me bas username dalna hai na ki password email etc..

        // ContentModel.find({ userId }): Finds all the content items for a specific userId.
        // .populate("userId", "username"): Replaces the userId in the content with the actual User document, but only includes the username field from the User document.

        res.status(200).json({
            content: content
        })

    } catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`
        })
    }
});

app.delete("/api/v1/delete-content", middleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const {contentId} = req.body;
        
        console.log("content id =",contentId)
        // const objectId = ObjectId(contentId); 
        // console.log(contentId);
        console.log(typeof contentId);
        // const objectContentId = ObjectId(contentId);
        // console.log(objectId);

        const resposne = await ContentModel.deleteOne({
            userId,
            _id : contentId
        })

        console.log(resposne)

        res.status(200).json({
            message: "Content deleted successfully"
        })

       
    } catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`
        })
    }
});

app.post("/api/v1/brain/share", middleware, async (req: Request, res: Response): Promise<any> => {
    try {
        const share = req.body.share;
        const userId = req.userId;

        const generateHash = (length: number): string => {
            return crypto.randomBytes(length).toString("hex").slice(0, length);
        };

        if(share){

            const link = await LinkModel.findOne({ userId });
            if(link){
                return res.status(201).json({
                    message: "Already Link available",
                    hash: link.hash
                })
            }

            const hash = generateHash(10);

            await LinkModel.create({
                hash,
                userId
            })

            res.status(200).json({
                message: "Created Link",
                hash: hash
            })
        }
        else{
            await LinkModel.deleteOne({ userId });

            res.status(200).json({
                message: "Deleted Link"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`,
        })
    }
});

app.get("/api/v1/brain/:shareLink", async (req: Request<{ shareLink: string }>, res: Response): Promise<any> => {
    try {
        const shareLink = req.params.shareLink;

        const link = await LinkModel.findOne({
            hash: shareLink
        })

        if(!link){
            return res.status(411).json({
                message: "Wrong Link",
            })
        }

        const content = await ContentModel.find({ userId: link.userId })

        // console.log(`${link.userId} log no 1`)
        // console.log(`${typeof(link.userId)} log no 2`)

        const user = await UserModel.findOne({ _id: link.userId });

        if(!user){
            return res.status(411).json({
                message: "User not found"
            })
        }

        // console.log(`${user.username} log no 3`)

        res.status(200).json({
            username: user.username,
            content:content
        })

    } catch (error) {
        res.status(500).json({
            message: `Server side issue ${error}`,
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
