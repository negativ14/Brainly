import mongoose from "mongoose";
import { MONGOOSE_URL } from "./config";
import { string } from "zod";
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

export const connectDb = async() => {
  try{
    await mongoose.connect(MONGOOSE_URL);
    console.log("Connected to DB")
  }
  catch(error){
    console.log(`Connection failed ${error}`)
    //process.exit(1); // Exit the process if the connection fails
  }
}

const UserSchema = new Schema({
    username: {type: string, unique: true},
    password: string,
    email: string
})

export const UserModel = mongoose.model("Users", UserSchema);

