const express = require("express");
const router = express.Router();
const {
  createTodoController,
  updateTodoController,
  deleteTodoController,
  getAllTodosController,
  updateTaskStatus,
  getAllAdminTodosController,
} = require("../controllers/crudController");
const authenticate = require("../middleware/authenticate");

router.post("/create", authenticate, createTodoController);
router.patch("/update/:id", authenticate, updateTodoController);
router.get("/get", authenticate, getAllTodosController);
router.get("/getAllTasks", authenticate, getAllAdminTodosController);
router.delete("/delete/:_id", authenticate, deleteTodoController);
router.patch("/changeStatus/:_id", authenticate, updateTaskStatus);

module.exports = router;
