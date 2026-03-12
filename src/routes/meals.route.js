import express from "express";
import {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getMealsOfWeek

} from "../controllers/meal.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// route pour récupérer les repas de la semaine
router.get("/week",authMiddleware,getMealsOfWeek);

// routes pour les opérations CRUD sur les repas

router.post("/", authMiddleware, createMeal);
router.get("/", authMiddleware, getAllMeals);
router.get("/:id", authMiddleware, getMealById);
router.put("/:id", authMiddleware, updateMeal);
router.delete("/:id", authMiddleware, deleteMeal);

export default router;
