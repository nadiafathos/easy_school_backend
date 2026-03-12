/**
 * router pour la gestion des présences dans l'application Easy School.
 * Ce fichier définit les routes pour les opérations CRUD sur les présences (Attendance) dans l'application Easy School.
 * Il utilise le contrôleur AttendanceController pour gérer la logique métier associée à chaque route.  
 */
import { Router } from "express";
import {
    createAttendance,       
    getAttendanceByChild,
    getAttendanceByDate,
    updateAttendance,
    deleteAttendance,
    getAllAttendance        
} from "../controllers/attendance.controller.js";   
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
//ajouter une présence
router.post("/", authMiddleware, createAttendance);
//récupérer les présences d’un enfant
router.get("/child/:child_id", authMiddleware, getAttendanceByChild);
//récupérer les présences d’une date donnée
router.get("/date/:date", authMiddleware, getAttendanceByDate);
//mettre à jour une présence
router.put("/:id", authMiddleware, updateAttendance);
//supprimer une présence
router.delete("/:id", authMiddleware, deleteAttendance);
//récupérer toutes les présences
router.get("/", authMiddleware, getAllAttendance);  
export default router;
