'use strict';

/**
 * index.js – connexion à la base de données et définition des associations
 */

import { Sequelize } from "sequelize";
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
import participationEventModel from "./participationEvent.model.js";

/**
 * Connexion à la base PostgreSQL
 * On utilise les variables d'environnement pour sécuriser les identifiants
 */
const sequelize = new Sequelize(
  process.env.DB_DATABASE,  // Nom de la base
  process.env.DB_USERNAME,  // Utilisateur
  process.env.DB_PASSWORD,  // Mot de passe
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false // Désactive l'affichage des requêtes SQL dans la console
  }
);

/**
 * Objet db qui contiendra tous les modèles et la connexion
 */
const db = {};
db.sequelize = sequelize;

/**
 * Initialisation des modèles
 * Chaque modèle est une fonction qui prend 'sequelize' et 'DataTypes' en paramètres
 */
db.User = userModel(sequelize);
db.Classe = classeModel(sequelize);
db.Child = childModel(sequelize);
db.Homework = homeworkModel(sequelize);
db.Meal = mealModel(sequelize);
db.ReservationMeal = reservationMealModel(sequelize);
db.Event = eventModel(sequelize);
db.ParticipationEvent = participationEventModel(sequelize);

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
