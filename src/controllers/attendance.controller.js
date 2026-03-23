/**
 * Modèle de données pour les présences dans Easy School.
 * Ce fichier définit le modèle Sequelize pour l'entité "Attendance" (Présence) dans l'application Easy School.
 * Il utilise le module 'sequelize' pour définir la structure de la table "attendances" dans la base de données.    
 */
import db from "../models/index.js";
const{ Attendance, Child } = db;
/**
 * ajouter une présence
 * récupérer les présences d'un enfant
 * récupérer une présence par id
 * mettre à jour une présence
 * supprimer une présence
 */ 

export const createAttendance = async (req, res) => {
  try {
    const { child_id, date, present, heure_arrivee, heure_depart } = req.body;

    // Vérifier si l'enfant existe
    const child = await Child.findByPk(child_id);
    if (!child) {
      return res.status(404).json({ message: "Enfant introuvable" });
    }

    const attendance = await Attendance.create({
      child_id,
      date,
      present,
      heure_arrivee,
      heure_depart,
    });

    return res.status(201).json(attendance);

  } catch (error) {
    console.error("Erreur createAttendance :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};



/**
 * Récupérer toutes les présences d’un enfant
 */
export const getAttendanceByChild = async (req, res) => {
    try {
        const { child_id } = req.params;

        const child = await Child.findByPk(child_id);
        if (!child) {
            return res.status(404).json({ message: "Enfant introuvable." });
        }

        const attendances = await Attendance.findAll({
            where: { child_id },
            order: [["date", "DESC"]],
        });

        return res.status(200).json(attendances);
    } catch (error) {
        console.error("Erreur getAttendanceByChild :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * Récupérer les présences d’une date donnée
 */
export const getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.params;

        const attendances = await Attendance.findAll({
            where: { date },
            include: [{ model: Child, as: "child" }],
        });

        return res.status(200).json(attendances);
    } catch (error) {
        console.error("Erreur getAttendanceByDate :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * Mettre à jour une présence
 */
export const updateAttendance = async (req, res) => {
    try {
        const { id_attendance } = req.params;

        const attendance = await Attendance.findByPk(id_attendance);
        if (!attendance) {
            return res.status(404).json({ message: "Présence introuvable." });
        }

        await attendance.update(req.body);

        return res.status(200).json(attendance);
    } catch (error) {
        console.error("Erreur updateAttendance :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * Supprimer une présence
 */
export const deleteAttendance = async (req, res) => {
    try {
        const { id_attendance } = req.params;

        const attendance = await Attendance.findByPk(id_attendance);
        if (!attendance) {
            return res.status(404).json({ message: "Présence introuvable." });
        }

        await attendance.destroy();

        return res.status(200).json({ message: "Présence supprimée." });
    } catch (error) {
        console.error("Erreur deleteAttendance :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * Récupérer toutes les présences (utile pour admin)
 */
export const getAllAttendance = async (req, res) => {
    try {
        const attendances = await Attendance.findAll({
            include: [{ model: Child, as: "child" }],
            order: [["date", "DESC"]],
        });

        return res.status(200).json(attendances);
    } catch (error) {
        console.error("Erreur getAllAttendance :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};
 