import express from "express";
import { getSchoolMap } from "../controllers/schoolMap.controller.js";  

const router = express.Router();    
router.get("/map", getSchoolMap); // Route pour récupérer la carte d'une école  
export default router;