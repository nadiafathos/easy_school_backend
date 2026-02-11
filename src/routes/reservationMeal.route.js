import express from "express";
import {
  createReservationMeal,
  getReservationMealById,
  deleteReservationMeal,
  updateReservationMeal,
  getAllReservationMeal,
  
} from "../controllers/reservationMeal.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createReservationMeal);
router.get("/", authMiddleware, getAllReservationMeal);
router.get("/:id", authMiddleware, getReservationMealById);
router.put("/:id", authMiddleware, updateReservationMeal);
router.delete("/:id", authMiddleware, deleteReservationMeal);

export default router;
