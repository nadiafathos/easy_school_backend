import express from "express";
import {
  createHomework,
  getAllHomeworks,
  getHomeworkById,
  updateHomework,
  deleteHomework
} from "../controllers/homework.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createHomework);
router.get("/", authMiddleware, getAllHomeworks);
router.get("/:id", authMiddleware, getHomeworkById);
router.put("/:id", authMiddleware, updateHomework);
router.delete("/:id", authMiddleware, deleteHomework);

export default router;
