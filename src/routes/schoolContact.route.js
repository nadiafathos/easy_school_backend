import express from "express";
import { getSchoolContact } from "../controllers/schoolContact.controller.js";

const router = express.Router();

router.get("/contact", getSchoolContact);

export default router;
