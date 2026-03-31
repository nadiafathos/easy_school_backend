export const getSchoolMap = async (req, res) => {
  try {
    const mapData = {
      latitude: 50.6900,   // Exemple Tubize
      longitude: 4.2000,
      zoom: 15
    };

    res.json(mapData);
  } catch (error) {
    console.error("Erreur map école :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};
