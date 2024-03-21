const Task = require("../models/tasksModel");

const createTodoController = async (req, res) => {
  try {
    const { title, description, id } = req.body;

    if (!(title && description && id)) {
      return res.status(500).json({ message: "All fields are required" });
    }

    const createdTask = await Task.create({
      taskName: title,
      taskDescription: description,
      user: id,
    });

    if (!createdTask) {
      return res.status(500).json({ message: "Something went wrong!" });
    }

    res
      .status(200)
      .json({ message: "Task Created Successfully!", createdTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoController = async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) {
      res.status(500).json({ message: "Id is required" });
    }
    const updatedTask = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      res.status(500).json({ message: "Something went wrong!" });
    }
    res
      .status(200)
      .json({ message: "Task Updated Successfully!", updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(req.params, req.query);
    if (!_id) {
      return res.status(500).json({ message: "Id is required" });
    }
    const deletedTodo = await Task.findByIdAndDelete(_id);
    if (!deletedTodo) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTodosController = async (req, res) => {
  try {
    const allTodos = await Task.find({ user: req.user._id });
    if (!allTodos) {
      res.status(500).json({ message: "Something went wrong!" });
    }
    res.status(200).json({ Tasks: allTodos, user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAdminTodosController = async (req, res) => {
  try {
    const allTodos = await Task.find().populate("user");
    if (!allTodos) {
      res.status(500).json({ message: "Something went wrong!" });
    }
    res.status(200).json({ Tasks: allTodos, user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { _id } = req.params;

    const { status } = req.body;
    if (!_id) {
      return res.status(500).json({ message: "Id is Required" });
    }
    if (!status) {
      return res.status(500).json({ message: "Status is Required" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { status: status },
      {
        new: true,
      }
    );
    console.log(updatedTask);
    if (!updatedTask) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
    res
      .status(200)
      .json({ message: "Status updated Successfully!", updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTodoController,
  updateTodoController,
  deleteTodoController,
  getAllTodosController,
  getAllAdminTodosController,
  updateTaskStatus,
};
