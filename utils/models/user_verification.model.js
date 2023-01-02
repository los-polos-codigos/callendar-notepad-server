import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const user_verificationSchema = new Schema({ phone: String });
export const user_verification = mongoose.model("User", user_verificationSchema);
