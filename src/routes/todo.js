import express from "express";
import {
  CreateTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todo.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authenticate, CreateTodo);
router.get("/gettodos", authenticate, getTodos);
router.get("/gettodo/:id", authenticate, getTodoById);
router.put("/updatetodo/:id", authenticate, updateTodo);
router.delete("/deletetodo/:id", authenticate, deleteTodo);

export default router;
