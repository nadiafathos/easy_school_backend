/**
 * Controller School
 * Gère les opérations liées à l'école, telles que la création, la mise à jour, la suppression et la récupération des écoles.
 * Utilise le modèle School pour interagir avec la base de données.
 * Fournit des fonctions pour chaque opération CRUD (Create, Read, Update, Delete) sur les écoles.
 * Ces fonctions sont utilisées dans les routes correspondantes pour gérer les requêtes HTTP liées aux écoles.
 */

import db from "../models/index.js";
const School = db.School;       
export const createSchool = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;
        const school = await School.create({ name, address, phone, email });
        res.status(201).json(school);
    } catch (err) {
        res.status(500).json({ error:"Erreur lors de la création de l'école."
    });
}
};

    /**
     * Récupérer toutes les écoles
     * Cette fonction récupère toutes les écoles de la base de données et les renvoie au client.
     * En cas d'erreur, elle renvoie un message d'erreur avec un code de statut 500.
     */
    export const getAllSchools = async (req, res) => {
        try {
            const schools = await School.findAll();
            res.json(schools);
        } catch (err) {
            res.status(500).json({ error: "Erreur lors de la récupération des écoles." });
        }
    };
     /**
      * Récupérer une école par son ID
      * Cette fonction récupère une école spécifique de la base de données en utilisant son ID et la renvoie au client.
      * Si l'école n'est pas trouvée, elle renvoie un message d'erreur avec un code de statut 404.                                              
      */
    export const getSchoolById = async (req, res) => {
        try {
            const school = await School.findByPk(req.params.id);
            if (!school) {
                return res.status(404).json({ error: "École introuvable." });
            }
            res.json(school);
        } catch (err) {
            res.status(500).json({ error: "Erreur lors de la récupération de l'école." });
        }
    };   

        /**
         * mettre à jour une école par son ID
         * Cette fonction récupère une école spécifique de la base de données en utilisant son ID et la renvoie au client.
         * Si l'école n'est pas trouvée, elle renvoie un message d'erreur avec un code de statut 404.
         */


    export  const updateSchool = async (req, res) => {
        try {
            const { name, address, phone, email } = req.body;           

            const school = await School.findByPk(req.params.id);
            if (!school) {
                return res.status(404).json({ error: "École introuvable." });
            }       
            await school.update({ name, address, phone, email });                                                                               
            res.json(school);
        } catch (err) {
            res.status(500).json({ error: "Erreur lors de la mise à jour de l'école." });
        }
    };
     /**
      * Supprimer une école par son ID
      * Cette fonction supprime une école spécifique de la base de données en utilisant son ID.
      * Si l'école n'est pas trouvée, elle renvoie un message d'erreur avec un code de statut 404.  
      * En cas de succès, elle renvoie un message de confirmation.
      */
   export  const deleteSchool = async (req, res) => {   
        try {
            const school = await School.findByPk(req.params.id);
            if (!school) {
                return res.status(404).json({ error: "École introuvable." });
            }        
            await school.destroy();
            res.json({ message: "École supprimée avec succès." });
        } catch (err) {
            res.status(500).json({ error: "Erreur lors de la suppression de l'école." });
        }
    };

    