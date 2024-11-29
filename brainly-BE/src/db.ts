import mongoose from "mongoose";
import  { MONGOOSE_URL}  from "./config";
const Schema = mongoose.Schema;
const objectId  = Schema.ObjectId;
import dotenv from 'dotenv';
dotenv.config();
// dotenv.config();OOSE_URL: string = process.env.MONGOOSE_URL || "your_default_mongodb_url
// const MONG";

export const connectDb = async() => {
  try{
    // console.log("MONGOOSE_URL:", MONGOOSE_URL);
    // console.log("MONGOOSE_URL:", typeof(MONGOOSE_URL));

    await mongoose.connect(MONGOOSE_URL);
    console.log("Connected to DB")
  }
  catch(error){
    console.log(`Connection failed ${error}`)
    //process.exit(1); // Exit the process if the connection fails
  }
}

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String, required: true},
    email: {type: String, unique: true},
})

const contentType = ['Tweets', 'Videos', 'Documents', 'Links', 'Tags'];

const ContentSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    type: {type: String, enum: contentType, required: true},
    userId: {type: objectId, ref: 'Users', required: true},
    tags: [{type: String}],
})

const LinkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: objectId, ref: 'Users', required: true, unique: true}
})

// const TagSchema = new Schema({
//     title: {type: String, required: true, unique: true}
// })

export const UserModel = mongoose.model("Users", UserSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
export const LinkModel = mongoose.model("Link", LinkSchema);
// export const TagModel = mongoose.model("Tag", TagSchema);

