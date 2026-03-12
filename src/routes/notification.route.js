/**-
 * Ce fichier définit les routes pour les notifications dans l'application. Il utilise Express pour créer un routeur et associe chaque route à une fonction de contrôleur correspondante.
 * Les routes incluent des opérations CRUD (Create, Read, Update, Delete) pour les notifications, ainsi qu'une route pour marquer une notification comme lue.
 * Chaque route est protégée par un middleware d'authentification pour garantir que seules les utilisateurs authentifiés peuvent accéder aux notifications. 
 */

// src/routes/notifications.routes.js
import { Router } from "express";
import {
  getNotificationsByUser,
  getNotificationById,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notifications.controller.js";
import  authMiddleware  from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/user/:userId", getNotificationsByUser);
router.get("/:id", getNotificationById);
router.post("/", createNotification);
router.patch("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification);

export default router;
