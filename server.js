const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://phantom96oliver_db_user:<db_password>@cluster0.rlk4nz9.mongodb.net/?appName=Cluster0")
  .then(() => console.log("DB подключена"))
  .catch(err => console.log(err));

  const JobSchema = new mongoose.Schema({
  title: String,
  price: Number
});

const Job = mongoose.model("Job", JobSchema);

app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.use(express.json());

app.post("/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

const ResponseSchema = new mongoose.Schema({
  jobId: String,
  text: String
});

const Response = mongoose.model("Response", ResponseSchema);

app.post("/responses", async (req, res) => {
  const response = new Response(req.body);
  await response.save();
  res.json(response);
});

app.get("/responses/:jobId", async (req, res) => {
  const responses = await Response.find({ jobId: req.params.jobId });
  res.json(responses);
});



const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Сервер работает 1");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Сервер запущен");
});