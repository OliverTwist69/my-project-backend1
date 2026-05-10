const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express(); // ✅ СНАЧАЛА создаём app

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://phantom96oliver_db_user:h8ZV3aVGxWqP0Gf3@cluster0.rlk4nz9.mongodb.net/mydb")
  .then(() => console.log("DB подключена"))
  .catch(err => console.log(err));


// 📦 МОДЕЛЬ ЗАКАЗОВ
const JobSchema = new mongoose.Schema({
  title: String,
  price: Number
});

const Job = mongoose.model("Job", JobSchema);


// 📋 ПОЛУЧИТЬ ЗАКАЗЫ
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});


// ➕ ДОБАВИТЬ ЗАКАЗ
app.post("/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});


// 💬 МОДЕЛЬ ОТКЛИКОВ
const ResponseSchema = new mongoose.Schema({
  jobId: String,
  text: String
});

const Response = mongoose.model("Response", ResponseSchema);


// ➕ ДОБАВИТЬ ОТКЛИК
app.post("/responses", async (req, res) => {
  const response = new Response(req.body);
  await response.save();
  res.json(response);
});


// 📥 ПОЛУЧИТЬ ОТКЛИКИ
app.get("/responses/:jobId", async (req, res) => {
  const responses = await Response.find({ jobId: req.params.jobId });
  res.json(responses);
});


// 🧪 ТЕСТ
app.get("/", (req, res) => {
  res.send("Сервер работает 🚀11221");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Сервер запущен");
});