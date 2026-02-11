import jwt from "jsonwebtoken";

/**
 * 
 * @param  {...string} roles verifier si l'user a l'un des roles autorisés 
 * 
 * 
 */
export const authorizeRoles=(...roles) => {
    return( req,res,next) => {
        //req.user est defini par le middleware authenticate
        if(!req.user){
            return res.status(401).json({message:"Utilisateur non authentifié"});
        }

        //verifier si le role de l'user se trouve dans la liste autorisée
        if( !roles.includes(req.user.role)) {
            return res.status(403).json({message:"Accès refusé:non autorisé"});
        }
        next()
    };
}; 