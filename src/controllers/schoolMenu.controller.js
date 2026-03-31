import db from "../models/index.js";
const Meal = db.Meal;

export const getSchoolMenu = async (req, res) => {
  try {
    const meals = await Meal.findAll({
      order: [["date", "ASC"]],
    });

    res.json(meals);
  } catch (error) {
    console.error("Erreur menu école :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};
