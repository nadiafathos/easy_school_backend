Projet  d'élaboration d'une application mobile de gestion:
-repas de cantine
-de devoir
-de sorties
dans une école primaire.

Nom de L'application: "EASY_SCHOOL(à changer plustard)
Api Restfull React Native,Express Js

## Diagrammes

📄 Diagramme de classes  
[Voir le PDF](docs/diagram&me-classes.pdf)



USERS STORIES:

 1-Gestion de la Cantine:

Parents:USER01:
En tant que Parent:
  -je veux pouvoir me connecter en tant que parent de tel enfant
  -je veux voir le menu de la cantine du mois ou de la semaine
  -je veux pouvoir réserver un menu pour mon enfant
  -je veux pouvoir annuler un repas pour mon enfant
  -je veux recevoir une notification si le menu change

Enseignants/personnel USER02:
En tant que Enseignant:
  -je veux pouvoir ajouter ou modifier le menu pour chaque jour
  - je veux pouvoir faire les réservations des repas pour gérer le stock


2-Gestion des devoirs:

Parents:USER03:
En tant que Parent:
  -je veux pouvoir voir les devoirs assignés à mon enfant
  -je veux pouvoir recevoir un rappel de la date limite
  -je veux pouvoir recevoir une notification si devoir de mon enfant est fait ou pas

Enseignants:USER04:
En tant que Enseignant:
   -je veux pouvoir créer ,ajouter ou modifier ou supprimer un devoir pour mes élèves
   -je veux pouvoir marquer un devoir terminé ou corrigé 

3-Gestion des sorties /évènements:

Parents:USER5:
En tant que parent:
  -je veux pouvoir consulter les sorties ou évènements prévus pour mon enfant
  -je veux pouvoir confirmer ou annuler la participation de mon enfant à une sortie

Enseignant:USER6: 
En tant que enseignant:
  -je veux pouvoir planifier une sortie ou un évènement avec date et lieu 
  -je veux pouvoir consulter la liste des participants pour chaque sortie
  -je veux pouvoir annuler ou modifier une sortie ou un évènement


4-Authentification et Profil

Tous les users ou utilisateurs:
En tant que utilisateur
   -je veux pouvoir m'inscrire et me connecter avec mon email/mot de passe
   -je veux pouvoir réinitialiser mon mot de passe si je l'oublie
   -je veux pouvoir mettre à jour mes informations personnelles
   -je veux pouvoir supprimer mon compte 

5-Fonctionalites Mobile/Capteurs:

Parents:
En tant que parent, je veux pouvoir recevoir une notification push pour les changements importants(menu,devoirs,sorties).

Enseignement/utilisateur:
En tant que parent ou enseignement ,je veux pouvoir scanner un QR code ou prendre une photo pour valider la présence d'un enfant lors d'une sortie.

En tant qu'utilisateur je veux que l'application fonctionne hors-ligne et se synchronise automatiquement dès qu'il y a connexion.


Diagramme de base de données(Modèle logique de données:entités relations)


Diagramme entité relation:
Table users {
  id_user int [pk, increment]
  nom varchar
  email varchar [unique]
  password varchar
  role varchar [note: "parent | enseignant | admin"]
}

Table classes {
  id_classe int [pk, increment]
  nom varchar
  enseignant_id int
}

Table children {
  id_child int [pk, increment]
  nom varchar
  classe_id int
  parent_id int
}

Table meals {
  id_meal int [pk, increment]
  meal_date date
  description text
  allergenes varchar
}

Table reservation_meal {
  id_reservation int [pk, increment]
  child_id int
  meal_id int
  type_repas varchar [note: "porc | sans porc | poisson"]
  absence boolean
}

Table homework {
  id_homework int [pk, increment]
  classe_id int
  titre varchar
  description text
  fichier varchar
  homework_date date
}

Table events {
  id_event int [pk, increment]
  titre varchar
  event_date date
  lieu varchar
  materiel text
  cout decimal
}

Table participation_event {
  id_participation int [pk, increment]
  child_id int
  event_id int
  statut varchar [note: "autorisé | refusé | en attente"]
}

/* Relations */
Ref: classes.enseignant_id > users.id_user
Ref: children.classe_id > classes.id_classe
Ref: children.parent_id > users.id_user
Ref: reservation_meal.child_id > children.id_child
Ref: reservation_meal.meal_id > meals.id_meal
Ref: homework.classe_id > classes.id_classe
Ref: participation_event.child_id > children.id_child
Ref: participation_event.event_id > events.id_event

***Structure du backend

easy_school_backend/
│
├── src/
│   ├── app.js
│   ├── server.js
│   
│   ├── config/
│   │   └── db.js
│
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── classes.routes.js
│   │   ├── meals.routes.js
│   │   ├── homeworks.routes.js
│   │   └── events.routes.js
│
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── users.controller.js
│   │   ├── classes.controller.js
│   │   ├── meals.controller.js
│   │   ├── homeworks.controller.js
│   │   └── events.controller.js
│
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│
│   └── utils/
│       └── hash.js
│
── docs
├── .env
├── .gitignore
├── package.json
└── README.md













 











