import express from "express";
import {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal
} from "../controllers/meal.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMeal);
router.get("/", authMiddleware, getAllMeals);
router.get("/:id", authMiddleware, getMealById);
router.put("/:id", authMiddleware, updateMeal);
router.delete("/:id", authMiddleware, deleteMeal);

export default router;
