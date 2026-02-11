import db from "../models/index.js"
import bcrypt from"bcryptjs";
import jwt from "jsonwebtoken";



const User =db.User;
/**
 * creer un utilisateur
 * CRUD +authentification
 */

export  const createUser =async(req,res) =>{
    try{
        const {nom,email,password,role}=req.body;

        //verification d'email si existant

        const existing =await User.findOne({where:{email}} );
        if (existing) return res.status(400).json({messagr:"Email deja utilisé"});

        //hashage du mot de passe

        const hashedPassword =await bcrypt.hash(password,10);

        const user = await User.create({
            nom,
            email,
            password:hashedPassword,
            role});
            res.status(201).json(user);
        } catch (err){
            res.status(500).json({message:err.message});
        }

        };
    /**
     * connexion d'un utilisateur
     */
    export const loginUser =async(req,res) =>{
        try{
            const {email,password}=req.body;
         const user =await User.findOne({where:{email}});
         if (!user) return res.status(404).json({message:"Utilisateur non trouvé"});
         
         //verification du mot de passe


         const valid=awaitbcrypt.compare(password,user.password);
         if (!valid) return res.status(404).json({message:"Mot se passe incorrect"});

         //génération du token jwt

         const token=jwt.sign(
            {id:user.id_user,role:user.role},
            process.env.JWT_SECRET,
            {expireIn:'1h'}
         );
         res.json({token});


        } catch (err){
            res.status(500).json({message:err.message});
        }
    };

    /**
     * recuperer tous les users
     */
     export const getAllUsers =async(req,res) => {
        try {
            const users =await User.finAll({attributes:{exclude:["password"]}});
            res.json(users);
        } catch (err){
            res.status(500).json({message:err.message});

        }
        };
     /**
      * trouver un utilisateur par id getuser by id
      * 
      */
    
     export const getUserById =async(req,res) =>{
        try {
            const user =await User.fingByPk(req.params.id,{ attributes:{exclude:["password"]},
            });
            if(!user) return res.status(404).json({message:"Utilisateur non trouvé"});
            res.json(user);
        }catch (error){
            res.status(500).json({message:err.message});

        }
        };
        /**
         * update -modifier un utilisateur
         */

        export const updateUser =async(req,res) =>{
            try {
                const {nom,email,role}=req.body;
              const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    //si le mot de passe est mis à jour 
    let hashedPassword =user.password;
    if (password)hashedPassword=await bcrypt.hash(password,10);

    await user.update({ nom, email, role,password:hashedPassword });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE – supprimer un utilisateur
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user){
         return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    await user.destroy();
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    }  
            };
        
     

    
