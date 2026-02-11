import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("Utilisateur DB :", process.env.DB_USER);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log("✅ Connexion DB réussie !");
} catch (err) {
  console.error("Erreur :", err.message);
}
