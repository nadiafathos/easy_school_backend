import db from "./models/index.js";

async function seedMeals() {
  try {
    const Meal = db.Meal;

    // On récupère la date d'aujourd'hui
    const today = new Date();

    // Trouver le lundi de la semaine actuelle
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));

    // Générer les dates du lundi au vendredi
    const days = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d.toISOString().split("T")[0]); // format YYYY-MM-DD
    }

    const mealsData = [
      {
        date: days[0],
        description: "Poulet rôti et légumes",
        allergenes: "gluten",
      },
      {
        date: days[1],
        description: "Pâtes bolognaise",
        allergenes: "lactose",
      },
      {
        date: days[2],
        description: "Poisson pané et purée",
        allergenes: "poisson",
      },
      {
        date: days[3],
        description: "Omelette et salade",
        allergenes: "œufs",
      },
      {
        date: days[4],
        description: "Pizza maison",
        allergenes: "gluten, lactose",
      },
    ];

    // Insérer les repas
    await Meal.bulkCreate(mealsData);

    console.log("🌟 Repas de la semaine insérés avec succès !");
    process.exit();
  } catch (err) {
    console.error("Erreur lors de l'insertion :", err);
    process.exit(1);
  }
}

seedMeals();
