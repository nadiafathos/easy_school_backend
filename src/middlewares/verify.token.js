import jwt from "jsonwebtoken";
export const verifyToken =(req,res,next) => {
    const authHeader =req.authHeader.authorization;
    if(!authHeader) return res.status(401).json({message:"Token manquant"});

    const token =authHeader.split("")[1]; //token
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;//contient id_user
        next();
    } catch (err){
        return res.status(403).json({message:"Token expiré oiu invalide"});
    }
    };
