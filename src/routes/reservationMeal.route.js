import express from "express";
import {
  createReservationMeal,
  getReservationMealById,
  deleteReservationMeal,
  updateReservationMeal,
  getAllReservationMeal,
  getReservationsByChild   // ← le bon nom
} from "../controllers/reservationMeal.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Créer une réservation
router.post("/", authMiddleware, createReservationMeal);

// Récupérer toutes les réservations
router.get("/", authMiddleware, getAllReservationMeal);

// Récupérer les réservations d’un enfant
router.get("/child/:id", authMiddleware, getReservationsByChild);

// Récupérer une réservation par ID
router.get("/:id", authMiddleware, getReservationMealById);

// Mettre à jour une réservation
router.put("/:id", authMiddleware, updateReservationMeal);

// Supprimer une réservation
router.delete("/:id", authMiddleware, deleteReservationMeal);

export default router;
