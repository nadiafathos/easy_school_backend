/**
 *Contrôleur des notifications pour Easy School.
 * Gère :
 * - récupération des notifications d’un utilisateur
 * - récupération d’une notification par ID
 * - création d’une notification
 * - marquage comme lue
 * - suppression
 
 */
import db from "../models/index.js";
const { Notification, User } = db;



// Récupérer toutes les notifications d'un utilisateur
export const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });

    res.json(notifications);
  } catch (err) {
    console.error("Erreur getNotificationsByUser:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer une notification par son ID
export const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ error: "Notification non trouvée" });
    }

    res.json(notification);
  } catch (err) {
    console.error("Erreur getNotificationById:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Créer une notification
export const createNotification = async (req, res) => {
  try {
    const { user_id, type, message, entity_id } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ error: "Utilisateur inexistant" });
    }

    const notification = await Notification.create({
      user_id,
      type,
      message,
      entity_id,
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error("Erreur création notification:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Marquer une notification comme lue
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ error: "Notification non trouvée" });
    }

    notification.is_read = true;
    await notification.save();

    res.json({ message: "Notification marquée comme lue" });
  } catch (err) {
    console.error("Erreur markNotificationAsRead:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer une notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.destroy({
      where: { id_notification: id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: "Notification non trouvée" });
    }

    res.json({ message: "Notification supprimée" });
  } catch (err) {
    console.error("Erreur deleteNotification:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
