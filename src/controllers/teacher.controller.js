

import db from "../models/index.js";
import {  } from "module";

const Classe = db.Classe;
const Child = db.Child;
const Attendance = db.Attendance;

// 📚 1. Récupérer les classes du professeur connecté
export const getTeacherClasses = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const classes = await Classe.findAll({
      where: { enseignant_id: teacherId }
    });

    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👦 2. Ajouter un élève (avec photo)
export const addChild = async (req, res) => {
  try {
    const { nom, prenom, classId, photo } = req.body;

    const child = await Child.create({
      nom,
      prenom,
      class_id: classId,
      photo
    });

    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📝 3. Marquer une présence
export const markAttendance = async (req, res) => {
  try {
    const { childId, status } = req.body;

    const attendance = await Attendance.create({
      child_id: childId,
      date: new Date(),
      status
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
