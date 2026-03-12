┌───────────────────────────┐
│          SCHOOLS          │
├───────────────────────────┤
│ id_school (PK)            │
│ nom                       │
│ adresse                   │
│ telephone                 │
└───────────────┬───────────┘
                │ 1..*
                ▼
┌───────────────────────────┐
│           USERS           │
├───────────────────────────┤
│ id_user (PK)              │
│ nom                       │
│ prenom                    │
│ email                     │
│ password                  │
│ role (parent/enseignant)  │
│ school_id (FK)            │
└───────────────┬───────────┬───────────────────────────────┐
                │ 1..*       │ 1..*                          │
                ▼            ▼                                ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│          CLASSES          │   │       NOTIFICATIONS       │
├───────────────────────────┤   ├───────────────────────────┤
│ id_classe (PK)            │   │ id_notification (PK)      │
│ nom                       │   │ user_id (FK→USERS)        │
│ enseignant_id (FK→USERS)  │   │ type                      │
│ school_id (FK→SCHOOLS)    │   │ message                   │
└───────────────┬───────────┘   │ entity_id                │
                │ 1..*           │ is_read (bool)           │
                ▼                │ created_at               │
┌───────────────────────────┐   └───────────────────────────┘
│          CHILDREN         │
├───────────────────────────┤
│ id_child (PK)             │
│ nom                       │
│ prenom                    │
│ date_naissance            │
│ classe_id (FK)            │
│ parent_id (FK→USERS)      │
└───────────────┬───────────┘
                │ 1..*
                ├───────────────────────────────┐
                │                               │
                ▼                               ▼
┌───────────────────────────┐        ┌──────────────────────────────┐
│     RESERVATION_MEAL      │        │    PARTICIPATION_EVENT       │
├───────────────────────────┤        ├──────────────────────────────┤
│ id_reservation (PK)       │        │ id_participation (PK)        │
│ child_id (FK)             │        │ child_id (FK)                │
│ meal_id (FK)              │        │ event_id (FK)                │
│ type_repas                │        │ statut                       │
│ absence (bool)            │        └───────────────┬──────────────┘
└───────────────┬───────────┘                        │
                │                                     ▼
                │                           ┌──────────────────────────┐
                │                           │          EVENTS          │
                │                           ├──────────────────────────┤
                │                           │ id_event (PK)            │
                │                           │ titre                    │
                │                           │ event_date               │
                │                           │ lieu                     │
                │                           │ materiel                 │
                │                           │ cout                     │
                │                           └──────────────────────────┘
                │
                ▼
┌───────────────────────────┐
│        ATTENDANCE         │
├───────────────────────────┤
│ id_attendance (PK)        │
│ child_id (FK)             │
│ date                      │
│ present (bool)            │
│ heure_arrivee             │
│ heure_depart              │
└───────────────────────────┘


┌───────────────────────────┐
│          MEALS            │
├───────────────────────────┤
│ id_meal (PK)              │
│ meal_date                 │
│ description               │
│ allergenes                │
│ school_id (FK)            │
└───────────────┬───────────┘
                │ 1..*
                ▼
┌───────────────────────────┐
│     RESERVATION_MEAL      │
└───────────────────────────┘


┌───────────────────────────┐
│          HOMEWORK         │
├───────────────────────────┤
│ id_homework (PK)          │
│ classe_id (FK)            │
│ enseignant_id (FK→USERS)  │
│ titre                     │
│ description               │
│ fichier                   │
│ homework_date             │
└───────────────┬───────────┘
                │ 1..*
                ▼
┌──────────────────────────────┐
│     HOMEWORK_SUBMISSION      │
├──────────────────────────────┤
│ id_submission (PK)           │
│ homework_id (FK)             │
│ child_id (FK)                │
│ fichier                      │
│ statut                       │
│ date_envoi                   │
└──────────────────────────────┘
