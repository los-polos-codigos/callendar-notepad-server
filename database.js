import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
config();

const { CLUSTER, AUTH_MECHANISM, AUTH_SOURCE } = process.env;
const USERNAME = encodeURIComponent(process.env.USERNAME);
const PASSWORD = encodeURIComponent(process.env.PASSWORD);

export const server = async () => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/?${AUTH_SOURCE}&${AUTH_MECHANISM}`;
  const URL_LOCAL = "mongodb://localhost:27017/test-database";

  try {
    await mongoose.connect(process.env.NODE_ENV === "dev" ? URL_LOCAL : uri);
  } catch (err) {
    console.log(err);
  }
};

const testSchema = new mongoose.Schema({
  type: String,
});

export const DatabaseTest = new mongoose.model("Test", testSchema);
