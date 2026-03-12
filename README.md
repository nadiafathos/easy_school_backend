
EASY_SCHOOL – Application mobile de gestion scolaire

Application mobile de gestion pour une école primaire :

USERS STOTY:

- gestion des repas de cantine
- gestion des devoirs
- gestion des sorties / événements
- gestion de la présence des enfants
- système de notifications pour les parents et les enseignants
Technos principales : React Native (Expo) + API RESTful Node.js / Express.js + Sequelize / POstgres.

🎯 Objectifs fonctionnels
1. Gestion de la cantine

Parents (USER01)

En tant que parent, je veux pouvoir:
- me connecter en tant que parent de mon enfant
- voir le menu de la cantine de la semaine / du mois
- réserver un repas pour mon enfant
- annuler un repas pour mon enfant
- recevoir une notification si le menu change ou si un nouveau repas est ajouté


Enseignants / personnel (USER02)

En tant qu’enseignant, je veux pouvoir:
- ajouter ou modifier le menu pour chaque jour
- consulter les réservations de repas pour gérer le stock

2. Gestion des devoirs:

Parents (USER03)

En tant que parent, je veux pouvoir :
- voir les devoirs assignés à mon enfant
- recevoir un rappel avant la date limite
- recevoir une notification si le devoir de mon enfant est fait ou non

Enseignants (USER04)

En tant qu’enseignant, je veux pouvoir:
- créer, modifier, supprimer un devoir pour ma classe
- marquer un devoir comme terminé / corrigé

3. Gestion des sorties / événements

Parents (USER05)

En tant que parent, je veux pouvoir :
- consulter les sorties / événements prévus pour mon enfant
- confirmer ou refuser la participation de mon enfant

Enseignants (USER06)

En tant qu’enseignant, je veux pouvoir :
- planifier une sortie ou un événement (date, lieu, matériel, coût)
- consulter la liste des participants
- modifier ou annuler une sortie / un événement
- envoyer des rappels aux parents qui n’ont pas encore répondu

4. Gestion de la présence
Enseignants
En tant qu’enseignant, je veux pouvoir :

- encoder la présence / absence des enfants de ma classe
- indiquer l’heure d’arrivée et de départ si nécessaire

Parents

En tant que parent, je veux pouvoir :

- recevoir une notification lorsque mon enfant est marqué présent ou absent

5. Authentification et profil

Tous les utilisateurs

En tant qu’utilisateur, je veux pouvoir :

- m’inscrire et me connecter avec email / mot de passe
- réinitialiser mon mot de passe
- mettre à jour mes informations personnelles
- supprimer mon compte

6. Fonctionnalités mobiles / capteurs

- Notifications push pour les changements importants (menus, devoirs, événements, présence).

- Scan de QR code ou prise de photo pour valider la présence lors d’une sortie.

- Fonctionnement hors-ligne avec synchronisation automatique dès qu’il y a une connexion (objectif futur).


PRINCIPALES ENTITES:

SCHOOL/


schools
---------
id_school (PK)
nom
adresse
telephone

users
---------
id_user (PK)
nom
prenom
email (unique)
password
role  (parent | enseignant | admin)
school_id (FK → schools.id_school)

classes
---------
id_classe (PK)
nom
enseignant_id (FK → users.id_user)
school_id (FK → schools.id_school)

children
---------
id_child (PK)
nom
prenom
date_naissance
classe_id (FK → classes.id_classe)
parent_id (FK → users.id_user)


meals
---------
id_meal (PK)
meal_date
description
allergenes


reservation_meal
---------
id_reservation (PK)
child_id (FK → children.id_child)
meal_id (FK → meals.id_meal)
type_repas (porc | sans porc | poisson)
absence (boolean)

homework
---------
id_homework (PK)
classe_id (FK → classes.id_classe)
titre
description
fichier
homework_date

events
---------
id_event (PK)
titre
event_date
lieu
materiel
cout

participation_event
---------
id_participation (PK)
child_id (FK → children.id_child)
event_id (FK → events.id_event)
statut (autorisé | refusé | en attente)

attendance
---------
id_attendance (PK)
child_id (FK → children.id_child)
date
present (boolean)
heure_arrivee
heure_depart

notifications
---------
id_notification (PK)
user_id (FK → users.id_user)
type (meal | homework | homework_done | event | event_reminder | presence | absence)
message
entity_id (id du repas / devoir / événement / enfant)
is_read (boolean)
created_at

// RELATIONS:

users.school_id → schools.id_school
classes.school_id → schools.id_school
classes.enseignant_id → users.id_user
children.classe_id → classes.id_classe
children.parent_id → users.id_user
reservation_meal.child_id → children.id_child
reservation_meal.meal_id → meals.id_meal
homework.classe_id → classes.id_classe
participation_event.child_id → children.id_child
participation_event.event_id → events.id_event
attendance.child_id → children.id_child
notifications.user_id → users.id_user


erDiagram

    SCHOOLS ||--o{ USERS : "contient"
    SCHOOLS ||--o{ CLASSES : "contient"

    USERS ||--o{ CLASSES : "enseigne"
    USERS ||--o{ CHILDREN : "parent de"
    USERS ||--o{ NOTIFICATIONS : "reçoit"

    CLASSES ||--o{ CHILDREN : "contient"
    CLASSES ||--o{ HOMEWORK : "donne"

    CHILDREN ||--o{ RESERVATION_MEAL : "réserve"
    CHILDREN ||--o{ PARTICIPATION_EVENT : "participe"
    CHILDREN ||--o{ ATTENDANCE : "présence"

    MEALS ||--o{ RESERVATION_MEAL : "réservé pour"
    EVENTS ||--o{ PARTICIPATION_EVENT : "concerne"

    HOMEWORK ||--o{ HOMEWORK_SUBMISSION : "soumissions"


    SCHOOLS {
        int id_school PK
        varchar nom
        varchar adresse
        varchar telephone
    }

    USERS {
        int id_user PK
        varchar nom
        varchar prenom
        varchar email
        varchar password
        varchar role
        int school_id FK
    }

    CLASSES {
        int id_classe PK
        varchar nom
        int enseignant_id FK
        int school_id FK
    }

    CHILDREN {
        int id_child PK
        varchar nom
        varchar prenom
        date date_naissance
        int classe_id FK
        int parent_id FK
    }

    MEALS {
        int id_meal PK
        date meal_date
        text description
        varchar allergenes
    }

    RESERVATION_MEAL {
        int id_reservation PK
        int child_id FK
        int meal_id FK
        varchar type_repas
        boolean absence
    }

    HOMEWORK {
        int id_homework PK
        int classe_id FK
        varchar titre
        text description
        varchar fichier
        date homework_date
    }
        HOMEWORK_SUBMISSION {
        int id_submission PK
        int homework_id FK
        int child_id FK
        varchar fichier
        varchar statut
        datetime date_envoi
    }


    EVENTS {
        int id_event PK
        varchar titre
        date event_date
        varchar lieu
        text materiel
        decimal cout
    }

    PARTICIPATION_EVENT {
        int id_participation PK
        int child_id FK
        int event_id FK
        varchar statut
    }

    ATTENDANCE {
        int id_attendance PK
        int child_id FK
        date date
        boolean present
        time heure_arrivee
        time heure_depart
    }

    NOTIFICATIONS {
        int id_notification PK
        int user_id FK
        varchar type
        text message
        int entity_id
        boolean is_read
        datetime created_at
    }





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
│   │   ├── schools.routes.js
│   │   ├── classes.routes.js
│   │   ├── children.routes.js
│   │   ├── meals.routes.js
│   │   ├── reservations.routes.js
│   │   ├── homeworks.routes.js
│   │   ├── events.routes.js
│   │   ├── participation.routes.js
│   │   ├── attendance.routes.js
│   │   └── notifications.routes.js
│
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── users.controller.js
│   │   ├── schools.controller.js
│   │   ├── classes.controller.js
│   │   ├── children.controller.js
│   │   ├── meals.controller.js
│   │   ├── reservations.controller.js
│   │   ├── homeworks.controller.js
│   │   ├── events.controller.js
│   │   ├── participation.controller.js
│   │   ├── attendance.controller.js
│   │   └── notifications.controller.js
│
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│
│   └── utils/
│       └── hash.js
│
├── docs/
│   └── diagrammes, spécifications, etc.
├── .env
├── .gitignore
├── package.json
└── README.md














 











