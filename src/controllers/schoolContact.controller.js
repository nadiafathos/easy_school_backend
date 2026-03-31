import db from "../models/index.js";
const School = db.School;

export const getSchoolContact = async (req, res) => {
  try {
    const school = await School.findOne();

    if (!school) {
      return res.status(404).json({ error: "Aucune école trouvée." });
    }

    res.json({
      name: school.name,
      adresse: school.address,
      telephone: school.phone,
      email: school.email,
      directeur: school.director,
      horaires: school.schedule,
    });
  } catch (err) {
    console.error("Erreur contact école :", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};
