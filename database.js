import { MongoClient, ServerApiVersion } from "mongodb";

const username = encodeURIComponent("ServerRoot");
const password = encodeURIComponent("snKjYI8yNKX4KJyH");
const cluster = "notecallendar.mqzbdke.mongodb.net";
const authSource = "retryWrites=true";
const authMechanism = "w=majority";

const uri = `mongodb+srv://${username}:${password}@${cluster}/?${authSource}&${authMechanism}`;

// const uri = `mongodb+srv://ServerRoot:${password}@notecallendar.mqzbdke.mongodb.net/?retryWrites=true&w=majority`

export const server = async () => {

    const client = new MongoClient(uri);
  try{

    await client.connect();


    const result = await client.db("test").collection("test").findOne({});

    console.log(result);
    // dbo.collection("test").find({}, function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    //   dbo.close();
    // });

    // const dbo = client.db('noteCallendar').collection('test.test').findOne((err, res) => {
    //   if(err) throw err;
    //
    //   console.log(res.test)
    // })

    // dbo.collection("customers").findOne({}, function(err, result) {
    //   if (err) throw err;
    //   console.log(result.name);
    //   db.close();
    // });

    // console.log(databasesList)

    // await listDatabases(client);
  }catch(err){
    console.log(err);
  }finally {
    await client.close();
  }



  // const client = new MongoClient(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   serverApi: ServerApiVersion.v1,
  // });
  // client.connect((err) => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //
  //   client.close();
  // });
};
