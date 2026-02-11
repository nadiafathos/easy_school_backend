import express from "express";

import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from "../controllers/event.controller.js"

import authMiddleware from "../middlewares/auth.middleware.js";

const router =express.Router();

router.post("/", authMiddleware,createEvent);
router.get("/",authMiddleware,getAllEvents);
router.get("/id",authMiddleware,getEventById);
router.put("/:id",authMiddleware,updateEvent);
router.put("/:id",authMiddleware,deleteEvent);

export default router;

