import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


import {config} from 'dotenv'
import mongoose from "mongoose";
import {server} from "./database.js";
config()


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/", async (req, res) => {
    res.status(200)
    res.send("Server works");
})

app.get('/app-health', async (req, res) => {
    res.status(200)
    res.send('OK');
});

const testSchema = new mongoose.Schema({
    type: String
});

const Test = new mongoose.model('Test', testSchema);

app.get('/database-health', async (req, res) => {

    // await server();

    const lol = await Test.find();

    console.log(lol[0].type)

    res.status(200);
    res.send('OK');
})

export {app};

