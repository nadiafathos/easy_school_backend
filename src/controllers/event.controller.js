import db from "../models/index.js";
const Event = db.Event;

// Créer un événement
export const createEvent = async (req, res) => {
  try {
    const { titre, date, lieu, materiel, cout } = req.body;
    const event = await Event.create({ titre, date, lieu, materiel, cout });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer tous les événements
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un événement par id
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Événement introuvable" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un événement
export const updateEvent = async (req, res) => {
  try {
    const { titre, date, lieu, materiel, cout } = req.body;
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Événement introuvable" });

    await event.update({ titre, date, lieu, materiel, cout });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un événement
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Événement introuvable" });

    await event.destroy();
    res.json({ message: "Événement supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

