Utilisateur           App Mobile            Backend API            Base de données
     |                     |                     |                         |
     |  email+password     |                     |                         |
     |-------------------->|                     |                         |
     |                     |  POST /auth/login   |                         |
     |                     |-------------------->|                         |
     |                     |                     |  Vérifie credentials    |
     |                     |                     |------------------------>|
     |                     |                     |        OK               |
     |                     |                     |<------------------------|
     |                     |   JWT + rôle        |                         |
     |                     |<--------------------|                         |
     |   Accès accordé     |                     |                         |
     |<--------------------|                     |                         |
