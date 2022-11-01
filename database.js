import { MongoClient, ServerApiVersion } from "mongodb";

const username = encodeURIComponent("ServerRoot");
const password = encodeURIComponent("snKjYI8yNKX4KJyH");
const cluster = "notecallendar.mqzbdke.mongodb.net";
const authSource = "retryWrites=true";
const authMechanism = "w=majority";

const uri = `mongodb+srv://${username}:${password}@${cluster}/?${authSource}&${authMechanism}`;

export const server = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await client
      .db("test")
      .collection("test")
      .find({})
      .toArray();
    console.log(result);
  } finally {
    client.close();
  }
};
