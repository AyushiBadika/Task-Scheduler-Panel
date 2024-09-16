import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  email: String,
  frequency: String,
  status: { type: String, default: "pending" },
  lastExecuted: Date,
});

export default mongoose.model("Task", taskSchema);
