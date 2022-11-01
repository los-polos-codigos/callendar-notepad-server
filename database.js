import { MongoClient, ServerApiVersion } from "mongodb";
import { isReadable } from "nodemailer/lib/xoauth2";

const username = encodeURIComponent("ServerRoot");
const password = encodeURIComponent("snKjYI8yNKX4KJyH");
const cluster = "notecallendar.mqzbdke.mongodb.net";
const authSource = "retryWrites=true";
const authMechanism = "w=majority";

const uri = `mongodb+srv://${username}:${password}@${cluster}/?${authSource}&${authMechanism}`;

export const server = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object

    client.close();
  });
};
