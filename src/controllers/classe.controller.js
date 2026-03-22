/**
 * Classe Controller
 * -----------------
 * Gère toutes les opérations CRUD liées aux classes :
 * - Création
 * - Lecture (toutes les classes, classe par ID)
 * - Mise à jour
 * - Suppression
 * - Récupération des classes d’un enseignant (NOUVEAU) qui permet de récupérer toutes les classes associées à un enseignant spécifique.
 * 
 * Ces fonctions interagissent avec le modèle Classe pour effectuer les opérations nécessaires sur la base de données.
 */


import db from "../models/index.js";
const Classe = db.Classe;

// Créer une classe
/**
 * @desc Crée une nouvelle classe dans la base de données.
 * @route POST /classes
 * @access Admin {*} req 
 * 
 */
export const createClasse = async (req, res) => {
  try {
    const { nom, enseignant_id } = req.body;
    const classe = await Classe.create({ nom, enseignant_id });
    res.status(201).json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer toutes les classes
/**
 * @desc Récupère toutes les classes de la base de données.
 * @route GET /classes
 * @access Admin, Enseignant
  
 */
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Classe.findAll();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une classe par id
/**@desc Récupère une classe spécifique par son ID.
 * @route GET /classes/:id
 * @access Admin, Enseignant
 */

export const getClasseById = async (req, res) => {
  try {
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) return res.status(404).json({ message: "Classe introuvable" });
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une classe
/**
 * 
 * @desc Mettre à jour une classe
 * @route PUT /classe/ :id
 
 * @returns Admin
 */
export const updateClasse = async (req, res) => {
  try {
    const { nom, enseignant_id } = req.body;
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) {return res.status(404).json({ message: "Classe introuvable" });
  }

    await classe.update({ nom, enseignant_id });
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une classe
/**
 * @desc Supprime une classe de la base de données.
 * @route DELETE /classes/:id
 * @access Admin
 */
export const deleteClasse = async (req, res) => {
  try {
    const classe = await Classe.findByPk(req.params.id);
    if (!classe) return res.status(404).json({ message: "Classe introuvable" });

    await classe.destroy();
    res.json({ message: "Classe supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * @desc Récupère toutes les classes associées à un enseignant spécifique.
 * @route GET /classes/teacher/:teacherId
 * @access Admin, Enseignant
 */

export const getClassesByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const classes = await db.Classe.findAll({
      where: { enseignant_id: teacherId },
      include: [
        {
          model: db.Child,
          as: "children"
        }
      ]
    });

    return res.json(classes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


/**
 * recuperer les enfants d'une classe   
 * @param {*} req   -
 * @param {*} res 
 * @returns 
 */
export const getChildrenByClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const children = await db.Child.findAll({
      where: { classe_id: classId }
    });

    return res.json(children);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


