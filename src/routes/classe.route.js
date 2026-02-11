import express from "express";
import {
    createClasse,
    getAllClasses,
    getClasseById,
    updateClasse,
    deleteClasse
} from "../controllers/classe.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router =express.Router();

router.post("/",authMiddleware,createClasse);
router.get("/",authMiddleware,getAllClasses);
router.get("/:id",authMiddleware,getClasseById);
router.put("/:id",authMiddleware,updateClasse);
router.delete("/:id",authMiddleware,deleteClasse);

export default router;
