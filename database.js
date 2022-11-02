// // const cluster = "notecallendar.mqzbdke.mongodb.net";
// // const authSource = "retryWrites=true";
// // const authMechanism = "w=majority";
// //
// // import {config} from 'dotenv'
// // config()
// //
// // const uri = `mongodb+srv://${username}:${password}@${cluster}/?${authSource}&${authMechanism}`;
// //
// // console.log(process.env.NODE_ENV)
// //
// // // if(process.env.NODE_ENV === 'dev'){
// // //
// // // }
// //
// // const uri = `mongodb+srv://ServerRoot:${password}@notecallendar.mqzbdke.mongodb.net/?retryWrites=true&w=majority`
// //
// // const locallyUri = `mongodb://localhost:27017/test-database
// // `
// //
// // export const server = async () => {
// //
// //
// //   const client = new MongoClient(uri);
// //
// //
// //   try{
// //
// //     console.log('before client connect')
// //
// //     await client.connect();
// //
// //
// //     const result = await client.db("test-database").collection("test-collection").findOne({});
// //
// //     console.log(result.name);
// //
// //
// //     // dbo.collection("test").find({}, function(err, result) {
// //     //   if (err) throw err;
// //     //   console.log(result);
// //     //   dbo.close();
// //     // });
// //
// //     // const dbo = client.db('noteCallendar').collection('test.test').findOne((err, res) => {
// //     //   if(err) throw err;
// //     //
// //     //   console.log(res.test)
// //     // })
// //
// //     // dbo.collection("customers").findOne({}, function(err, result) {
// //     //   if (err) throw err;
// //     //   console.log(result.name);
// //     //   db.close();
// //     // });
// //
// //     // console.log(databasesList)
// //
// //     // await listDatabases(client);
// //   }catch(err){
// //     console.log(err);
// //   }finally {
// //     await client.close();
// //   }
// //
// //
// //
// //   // const client = new MongoClient(uri, {
// //   //   useNewUrlParser: true,
// //   //   useUnifiedTopology: true,
// //   //   serverApi: ServerApiVersion.v1,
// //   // });
// //   // client.connect((err) => {
// //   //   const collection = client.db("test").collection("devices");
// //   //   // perform actions on the collection object
// //   //
// //   //   client.close();
// //   // });
// // };
// import mongoose from "mongoose";
//
//
// TODO: te dane dodać do env
import mongoose from "mongoose";

const username = encodeURIComponent("ServerRoot");
const password = encodeURIComponent("snKjYI8yNKX4KJyH");
const cluster = "notecallendar.mqzbdke.mongodb.net";
const authSource = "retryWrites=true";
const authMechanism = "w=majority";


//
// const testSchema = new mongoose.Schema({
//   type: String
// });
//
// export const Test = new mongoose.model('Test', testSchema);

export const server = async () => {

  const uri = `mongodb+srv://${username}:${password}@${cluster}/?${authSource}&${authMechanism}`;

  try{
    await mongoose.connect('mongodb://localhost:27017/test-database');
    // await mongoose.connect(uri);

  } catch(err){
    console.log(err)
  }
}

// export const getTest = async () => await Test.find();
