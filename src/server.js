import app from './app.js';
import db from './models/index.js';



const PORT =process.env.PORT || 3000;

(async() => {
    //test de la connexion
    try {
        await db.sequelize.authenticate();
        console.log('Connexion à la DB réussie !');

        //lancement du serveur

        app.listen(PORT,() => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
        
    } catch (err) {
        console.error('Erreur de connexion à la DB :',err);

    }

    })();
    