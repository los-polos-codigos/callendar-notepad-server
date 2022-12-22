import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
config();

const { CLUSTER, AUTH_MECHANISM, AUTH_SOURCE } = process.env;
const USERNAME = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

export const server = async () => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/?${AUTH_SOURCE}&${AUTH_MECHANISM}`;
  const URL_LOCAL = "mongodb://127.0.0.1:27017/test-database";
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
