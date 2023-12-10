import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

let conn;
try {
  conn = await client.connect();
  console.log("Connected successfully to mongodb");
} catch (e) {
  console.error(e);
}
let db = conn.db(process.env.DB_NAME, { ignoreUndefined: true });
export default db;
