import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  getTeacherClasses,
  addChild,
  markAttendance
} from "../controllers/teacher.controller.js";

const router = express.Router();

// 📚 Récupérer les classes du professeur connecté
router.get("/classes", auth, getTeacherClasses);

// 👦 Ajouter un élève (avec photo)
router.post("/children", auth, addChild);

// 📝 Marquer une présence
router.post("/attendance", auth, markAttendance);

export default router;
