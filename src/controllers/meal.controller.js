import db from "../models/index.js";
const Meal = db.Meal;

// Créer un repas
export const createMeal = async (req, res) => {
  try {
    const { date, description, allergenes } = req.body;
    const meal = await Meal.create({ date, description, allergenes });
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer tous les repas
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un repas par id
export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findByPk(req.params.id);
    if (!meal) return res.status(404).json({ message: "Repas introuvable" });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un repas
export const updateMeal = async (req, res) => {
  try {
    const { date, description, allergenes } = req.body;
    const meal = await Meal.findByPk(req.params.id);
    if (!meal) return res.status(404).json({ message: "Repas introuvable" });

    await meal.update({ date, description, allergenes });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un repas
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findByPk(req.params.id);
    if (!meal) return res.status(404).json({ message: "Repas introuvable" });

    await meal.destroy();
    res.json({ message: "Repas supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
