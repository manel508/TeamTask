import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect, isManager } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // toutes les routes ci-dessous sont protégées

router.get("/", getTasks); // accessible à tous les utilisateurs
router.post("/", isManager, createTask); // seulement les managers
router.put("/:id", updateTask); // accessible si propriétaire ou manager
router.delete("/:id", isManager, deleteTask); // seulement les managers

export default router;
