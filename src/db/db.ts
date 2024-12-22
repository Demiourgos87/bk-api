import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const dbUser = process.env.MONGODB_USER_NAME;
const password = process.env.MONGODB_USER_PASSWORD;
const dbName = process.env.MONGODB_DATABASE_NAME;
const uri = `mongodb+srv://${dbUser}:${password}@cluster0.9ca1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let db: Db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Open the connection to the database
export const connectToDatabase = async () => {
  if (!db) {
    try {
      await client.connect();

      db = client.db(dbName);
    } catch (error) {
      console.error('Error connecting to MongoDB: ', error);
      process.exit(1);
    }
  }

  return db;
};

// Get a collection from the database
export const getCollection = async (collection: string) => {
  const db = await connectToDatabase();

  return db.collection(collection);
};

// Close the connection to the database (optional, usually for clean-up during shutdown)
export const closeDatabase = async (): Promise<void> => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};

// // Ping the database
// export default async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
