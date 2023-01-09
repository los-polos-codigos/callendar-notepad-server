import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const testSchema = new Schema({
  type: String,
});

export const DatabaseTest = new mongoose.model("test", testSchema);
