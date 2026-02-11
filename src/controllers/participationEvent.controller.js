import db from "../models/index.js";
const ParticipationEvent = db.ParticipationEvent;

// Créer une participation
export const createParticipation = async (req, res) => {
  try {
    const { child_id, event_id, statut } = req.body;
    const participation = await ParticipationEvent.create({ child_id, event_id, statut });
    res.status(201).json(participation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer toutes les participations
export const getAllParticipations = async (req, res) => {
  try {
    const participations = await ParticipationEvent.findAll();
    res.json(participations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une participation par id
export const getParticipationById = async (req, res) => {
  try {
    const participation = await ParticipationEvent.findByPk(req.params.id);
    if (!participation) return res.status(404).json({ message: "Participation introuvable" });
    res.json(participation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une participation
export const updateParticipation = async (req, res) => {
  try {
    const { child_id, event_id, statut } = req.body;
    const participation = await ParticipationEvent.findByPk(req.params.id);
    if (!participation) return res.status(404).json({ message: "Participation introuvable" });

    await participation.update({ child_id, event_id, statut });
    res.json(participation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une participation
export const deleteParticipation = async (req, res) => {
  try {
    const participation = await ParticipationEvent.findByPk(req.params.id);
    if (!participation) return res.status(404).json({ message: "Participation introuvable" });

    await participation.destroy();
    res.json({ message: "Participation supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
