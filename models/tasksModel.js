const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user is required!"],
  },
  taskName: {
    type: "string",
    required: [true, "name field is Required"],
  },
  taskDescription: {
    type: "string",
    required: [true, "Description field is Required"],
  },
  status: {
    type: "string",
    enum: ["completed", "pending"],
    default: "pending",
  },
});

const Task = mongoose.model("task", tasksSchema);

module.exports = Task;
