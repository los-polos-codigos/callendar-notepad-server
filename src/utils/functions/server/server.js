import mongoose from "mongoose";
import { config } from "dotenv";

config();

const { CLUSTER, AUTH_MECHANISM, AUTH_SOURCE, DATABASE } = process.env;
const PASSWORD = encodeURIComponent(process.env.PASSWORD);

const USERNAME = "1ServerRoot1";
const USERNAME2 = "ServerRoot";

export let databaseErr = true;

export const server = async () => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DATABASE}?${AUTH_SOURCE}&${AUTH_MECHANISM}`;
  const URL_LOCAL = "mongodb://127.0.0.1:27017/test-database";
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.NODE_ENV === "dev" ? URL_LOCAL : uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB started!");
    databaseErr = false;
  } catch (err) {
    console.log(err);
    databaseErr = true;
  }
};
