const mongoose = require("mongoose");

require("dotenv").config();
const uriDB = process.env.URI_DB;

const db = mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on("connected", (err) => {
  console.log(`Database connection successful`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", (err) => {
  console.log(`Mongoose disconnected `);
});

process.on("SIGNIT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection for DB  disconnected and app terminated");
    process.exit(1);
  });
});

module.exports = db;
