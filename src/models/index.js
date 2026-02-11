

/**
 * index.js – connexion à la base de données et définition des associations
 */

import { Sequelize,DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // pour utiliser les variables d'environnement depuis .env

// Import des modèles
import userModel from "./user.model.js";
import classeModel from "./classe.model.js";
import childModel from "./child.model.js";
import homeworkModel from "./homework.model.js";
import mealModel from "./meal.model.js";
import reservationMealModel from "./reservationMeal.model.js";
import eventModel from "./event.model.js";
import participationEventModel from "./participationsEvent.model.js";

/**
 * Connexion à la base PostgreSQL
 * On utilise les variables d'environnement pour sécuriser les identifiants
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,  // Nom de la base
  process.env.DB_USER,  // Utilisateur
  process.env.DB_PASSWORD,  // Mot de passe
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false // Désactive l'affichage des requêtes SQL dans la console
  }
);

try {
  await sequelize.authenticate();
  console.log("Connexion à la DB réussie ✅", process.env.DB_USER);
} catch (err) {
  console.error("Erreur de connexion à la DB :", err.message);
}

/**
 * Objet db qui contiendra tous les modèles et la connexion
 */
const db = {};
db.sequelize = sequelize;
db.Sequelize =Sequelize;

/**
 * Initialisation des modèles
 * Chaque modèle est une fonction qui prend 'sequelize' et 'DataTypes' en paramètres
 */
db.User = userModel(sequelize,DataTypes);
db.Classe = classeModel(sequelize,DataTypes);
db.Child = childModel(sequelize,DataTypes);
db.Homework = homeworkModel(sequelize,DataTypes);
db.Meal = mealModel(sequelize,DataTypes);
db.ReservationMeal = reservationMealModel(sequelize,DataTypes);
db.Event = eventModel(sequelize,DataTypes);
db.ParticipationEvent = participationEventModel(sequelize,DataTypes);

/**
 * ============================
 * ASSOCIATIONS ENTRE LES TABLES
 * ============================
 */

/**
 * User (enseignant) → Classe
 * Un enseignant peut gérer plusieurs classes
 */
db.User.hasMany(db.Classe, { foreignKey: "enseignant_id" });
db.Classe.belongsTo(db.User, { foreignKey: "enseignant_id", as: "enseignant" });

/**
 * User (parent) → Child
 * Un parent peut avoir plusieurs enfants
 */
db.User.hasMany(db.Child, { foreignKey: "parent_id" });
db.Child.belongsTo(db.User, { foreignKey: "parent_id", as: "parent" });

/**
 * Classe → Child
 * Une classe contient plusieurs enfants
 */
db.Classe.hasMany(db.Child, { foreignKey: "classe_id" });
db.Child.belongsTo(db.Classe, { foreignKey: "classe_id" });

/**
 *  Classe → Homework
 * Une classe a plusieurs devoirs
 */
db.Classe.hasMany(db.Homework, { foreignKey: "classe_id" });
db.Homework.belongsTo(db.Classe, { foreignKey: "classe_id" });

/**
 * Child → ReservationMeal
 * Un enfant peut avoir plusieurs réservations de repas
 */
db.Child.hasMany(db.ReservationMeal, { foreignKey: "child_id" });
db.ReservationMeal.belongsTo(db.Child, { foreignKey: "child_id" });

/**
 * Meal → ReservationMeal
 * Un repas peut être réservé par plusieurs enfants
 */
db.Meal.hasMany(db.ReservationMeal, { foreignKey: "meal_id" });
db.ReservationMeal.belongsTo(db.Meal, { foreignKey: "meal_id" });

/**
 *  Child ↔ Event via ParticipationEvent
 * Un enfant peut participer à plusieurs événements
 */
db.Child.hasMany(db.ParticipationEvent, { foreignKey: "child_id" });
db.Event.hasMany(db.ParticipationEvent, { foreignKey: "event_id" });
db.ParticipationEvent.belongsTo(db.Child, { foreignKey: "child_id" });
db.ParticipationEvent.belongsTo(db.Event, { foreignKey: "event_id" });

/**
 * Export de l'objet db
 */
export default db;
