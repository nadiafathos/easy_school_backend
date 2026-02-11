import express from "express";
import {
    createParticipation,
    getAllParticipations,
    getParticipationById,
    updateParticipation,deleteParticipation
} from "../controllers/participationEvent.controller.js"

import authMiddleware from "../middlewares/auth.middleware.js";

const router= express.Router();
//routes protegées

router.post("/",authMiddleware,createParticipation);
router.get("/",authMiddleware,getAllParticipations);
router.get("/:id",authMiddleware,getParticipationById);
router.put("/:id",authMiddleware,updateParticipation);
router.delete("/:id",authMiddleware,deleteParticipation);

export default router;