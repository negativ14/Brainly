import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import cors from "cors";
import { connectDb } from "./db";
import z from "zod";
import bcryptjs from "bcryptjs";
import { UserModel } from "./db";
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
connectDb();


app.post("/api/v1/signUp", async (req: Request, res: Response) => {
    try {
        const userInput = z.object({
            username: z.string().min(3).max(15),
            password: z.string()
                .min(6)
                .max(15)
                .regex(/[A-Za-z]/, "Password must contain at least one letter")
                .regex(/\d/, "Password must contain at least one digit")
                .regex(/[/W_]/, "Password must contain at least one special character"),
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


app.post("/api/v1/signIn", async (req: Request, res: Response) => {
    
});

app.post("/api/v1/add-content", async (req: Request, res: Response) => {
    
});

app.get("/api/v1/content", async (req: Request, res: Response) => {

});

app.delete("/api/v1/delete-content", async (req: Request, res: Response) => {
  
});

app.post("/api/v1/brain/share", async (req: Request, res: Response) => {
   
});

app.post("/api/v1/brain/:shareLink", async (req: Request<{ shareLink: string }>, res: Response) => {
    
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
