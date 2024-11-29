"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const Schema = mongoose_1.default.Schema;
const objectId = Schema.ObjectId;
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGOOSE_URL);
        console.log("Connected to DB");
    }
    catch (error) {
        console.log(`Connection failed ${error}`);
        //process.exit(1); // Exit the process if the connection fails
    }
};
exports.connectDb = connectDb;
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
});
const contentType = ['Tweets', 'Videos', 'Documents', 'Links', 'Tags'];
const ContentSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: contentType, required: true },
    userId: { type: objectId, ref: 'Users', required: true },
    tags: [{ type: String }],
});
const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: objectId, ref: 'Users', required: true, unique: true }
});
// const TagSchema = new Schema({
//     title: {type: String, required: true, unique: true}
// })
exports.UserModel = mongoose_1.default.model("Users", UserSchema);
exports.ContentModel = mongoose_1.default.model("Content", ContentSchema);
exports.LinkModel = mongoose_1.default.model("Link", LinkSchema);
// export const TagModel = mongoose.model("Tag", TagSchema);