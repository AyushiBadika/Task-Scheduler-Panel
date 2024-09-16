import express from "express";
import cron from "node-cron";
import nodemailer from "nodemailer";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import Task from "./models/task.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({ origin: "*" }));

const connectDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://badikaayushi:gHnnPKeclLL4R08W@taskscheduler.qlxay.mongodb.net/");
    console.log("MongoDb Host", connect.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDb();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

cron.schedule("* * * * *", async () => {
  const tasks = await Task.find({ status: "pending" });
  tasks.forEach((task) => {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: task.email,
      subject: `Task: ${task.name} - ${task.frequency}`,
      text: `Executing task ${task.name} with frequency ${task.frequency}`,
    });

    task.lastExecuted = new Date();
    task.save();
  });
});

// email validator
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isEmailValid(email) {
  if (!email || email.length > 254) return false;

  if (!emailRegex.test(email)) return false;

  const parts = email.split("@");
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split(".");

  if (domainParts.some((part) => part.length > 63) || domainParts.length < 2) return false;

  return true;
}

app.post("/add-task", async (req, res) => {
  const { name, frequency, email } = req.body;

  if (!name || !frequency || !email) {
    res.status(404).json({ message: "All fields are mandatory!" });
  }

  if (!isEmailValid(email)) {
    res.status(400).json({ message: "Email is not valid" });
  }

  const task = new Task({ name, frequency, email });
  await task.save();
  res.status(200).json({ message: "Task added successfully" });
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.listen(port, () => {
  console.log("Server Started at port :", port);
});
