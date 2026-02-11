import db from "../models/index.js";
const Homework = db.Homework;

// Créer un devoir
export const createHomework = async (req, res) => {
  try {
    const { classe_id, titre, description, fichier, date } = req.body;
    const homework = await Homework.create({ classe_id, titre, description, fichier, date });
    res.status(201).json(homework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer tous les devoirs
export const getAllHomeworks = async (req, res) => {
  try {
    const homeworks = await Homework.findAll();
    res.json(homeworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un devoir par id
export const getHomeworkById = async (req, res) => {
  try {
    const homework = await Homework.findByPk(req.params.id);
    if (!homework) return res.status(404).json({ message: "Devoir introuvable" });
    res.json(homework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un devoir
export const updateHomework = async (req, res) => {
  try {
    const { classe_id, titre, description, fichier, date } = req.body;
    const homework = await Homework.findByPk(req.params.id);
    if (!homework) return res.status(404).json({ message: "Devoir introuvable" });

    await homework.update({ classe_id, titre, description, fichier, date });
    res.json(homework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un devoir
export const deleteHomework = async (req, res) => {
  try {
    const homework = await Homework.findByPk(req.params.id);
    if (!homework) return res.status(404).json({ message: "Devoir introuvable" });

    await homework.destroy();
    res.json({ message: "Devoir supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
