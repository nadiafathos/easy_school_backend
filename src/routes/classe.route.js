import express from "express";
import {
    createClasse,
    getAllClasses,
    getClasseById,
    updateClasse,
    deleteClasse,
    getClassesByTeacher,
    getChildrenByClass
} from "../controllers/classe.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middlware.js";

const router =express.Router();

router.post("/",authMiddleware,createClasse);
router.get("/",authMiddleware,getAllClasses);
router.get("/:id",authMiddleware,getClasseById);
router.put("/:id",authMiddleware,updateClasse);
router.delete("/:id",authMiddleware,deleteClasse);
router.get("/teacher/:teacherId",authMiddleware,getClassesByTeacher);

router.get("/id/children",authMiddleware,authorizeRoles("admin","enseignant"),getChildrenByClass);

export default router;
