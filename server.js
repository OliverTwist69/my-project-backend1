const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Сервер работает 1");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Сервер запущен");
});