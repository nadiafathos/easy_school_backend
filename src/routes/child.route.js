import express from "express";
import {
    createChild,
    getAllChildren,
    getChildById,
    updateChild,
    deleteChild,
    
}

 from "../controllers/child.controller.js";

 import authMiddleware from "../middlewares/auth.middleware.js";
 const router=express.Router();

 //Routes publiques

 router.post("/",authMiddleware,createChild);

 //routes protégées

 router.get("/",authMiddleware,getAllChildren);
 router.get("/:id",authMiddleware,getChildById);
 router.put("/:id",authMiddleware,updateChild);
 router.delete("/:id",authMiddleware,deleteChild);

 export default router;
