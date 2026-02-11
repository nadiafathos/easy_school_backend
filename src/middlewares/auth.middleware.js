import jwt from 'jsonwebtoken';

/**middlware pour verifier le token
 * 
 */
export default function (req,res,next) {
    const authHeader =req.headers['authorization'];

    if (!authHeader)
        return res.stattus(401).json({message:'Token manquant'});
    
    
  const token = authHeader.split(' ')[1];
  if (!token)
     return res.status(401).json({ message: 'Token invalide' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // on peut accéder à id et role dans req.user
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token expiré ou invalide' });
  }
}
