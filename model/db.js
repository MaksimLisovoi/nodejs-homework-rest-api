const { MongoClient } = require("mongodb");
require("dotenv").config();
const uriDB = process.env.URI_DB;

const db = new MongoClient.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5,
});

process.on("SIGNIT", async () => {
  const client = await db;
  client.close();
  console.log("Connection for DB  disconnected and app terminated");
  process.exit(1);
});

module.exports = db;
