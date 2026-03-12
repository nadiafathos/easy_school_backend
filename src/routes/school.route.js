/**
 * definis les routes pour les écoles
 * Ces routes permettent de gérer les opérations CRUD (Create, Read, Update, Delete) sur les écoles.            
 * Chaque route est associée à une fonction du contrôleur correspondant qui traite la requête et renvoie une réponse appropriée.
 */
import express from "express";
import {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool
} from "../controllers/school.controllers.js";  
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();    
// routes pour les opérations CRsUD sur les écoles
router.post("/", authMiddleware, createSchool);
router.get("/", authMiddleware, getAllSchools);
router.get("/:id", authMiddleware, getSchoolById);
router.put("/:id", authMiddleware, updateSchool);
router.delete("/:id", authMiddleware, deleteSchool);    
export default router;