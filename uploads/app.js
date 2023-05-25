const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { limiterApi } = require("./helpers/constants");

const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api/", rateLimit(limiterApi));

app.use("/api/", require("./routes/api"));

app.use((req, res) => {
  res.status(`404`).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res
    .status(status)
    .json({
      status: status === 500 ? "fail" : "error",
      code: status,
      message: err.message,
    });
});

module.exports = app;
