require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");

const app = express();
app.use(express.json());

// CORS Middleware
const allowed = [""];
const options = (req, res) => {
  let tmp;
  const origin = req.header("Origin");
  if (allowed.indexOf(origin)) {
    tmp = { origin: "http://localhost:3000", optionsSuccessStatus: 200 };
  }

  res(null, tmp);
};

app.use(cors(options));

// Routes

readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// DataBase

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error("Database Connection Failed", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Runing on Port ${PORT} ...`);
});
