const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());



// ======================
// MongoDB подключение
// ======================

mongoose.connect(
  "mongodb+srv://phantom96oliver_db_user:h8ZV3aVGxWqP0Gf3@cluster0.rlk4nz9.mongodb.net/godfreelance?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("DB подключена"))
.catch(err => console.log(err));



// ======================
// Схема заказов
// ======================

const JobSchema = new mongoose.Schema({
  title: String,
  price: Number
});

const Job = mongoose.model("Job", JobSchema);



// ======================
// Получить все заказы
// ======================

app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});



// ======================
// Создать заказ
// ======================

app.post("/jobs", async (req, res) => {
  const job = new Job(req.body);

  await job.save();

  res.json(job);
});



// ======================
// Схема откликов
// ======================

const ResponseSchema = new mongoose.Schema({
  jobId: String,
  text: String
});

const Response = mongoose.model("Response", ResponseSchema);



// ======================
// Создать отклик
// ======================

app.post("/responses", async (req, res) => {
  const response = new Response(req.body);

  await response.save();

  res.json(response);
});



// ======================
// Получить отклики
// ======================

app.get("/responses/:jobId", async (req, res) => {
  const responses = await Response.find({
    jobId: req.params.jobId
  });

  res.json(responses);
});



// ======================
// Схема пользователей
// ======================

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);



// ======================
// Регистрация
// ======================

app.post("/register", async (req, res) => {

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    10
  );

  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });

  await user.save();

  res.json({
    message: "Пользователь создан"
  });
});



// ======================
// Логин
// ======================

app.post("/login", async (req, res) => {

  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    return res.status(400).json({
      message: "Пользователь не найден"
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Неверный пароль"
    });
  }

  const token = jwt.sign(
    {
      id: user._id
    },
    "secret123"
  );

  res.json({
    token
  });
});



// ======================
// Главная
// ======================

app.get("/", (req, res) => {
  res.send("Сервер работает 🚀");
});



// ======================
// Запуск сервера
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Сервер запущен");
});