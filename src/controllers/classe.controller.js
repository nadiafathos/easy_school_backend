import db from "../models/index.js";
const Classe = db.Classe;

// Créer une classe
export const createClasse = async (req, res) => {
  try {
    const { nom, enseignat_id } = req.body;
    const classe = await Classe.create({ nom, enseignat_id });
    res.status(201).json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer toutes les classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classe.findAll();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une classe par id
export const getClasseById = async (req, res) => {
  try {
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) return res.status(404).json({ message: "Classe introuvable" });
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une classe
export const updateClasse = async (req, res) => {
  try {
    const { nom, enseignat_id } = req.body;
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) return res.status(404).json({ message: "Classe introuvable" });

    await classe.update({ nom, enseignat_id });
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une classe
export const deleteClasse = async (req, res) => {
  try {
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) return res.status(404).json({ message: "Classe introuvable" });

    await classe.destroy();
    res.json({ message: "Classe supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
