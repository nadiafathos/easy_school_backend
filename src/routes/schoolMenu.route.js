import express from "express";
import { getSchoolMenu } from "../controllers/schoolMenu.controller.js";

const router = express.Router();

router.get("/menu", getSchoolMenu);

export default router;
