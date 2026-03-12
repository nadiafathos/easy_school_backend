Parent              App Mobile            Backend API            Base de données
   |                     |                     |                         |
   | Choisit repas       |                     |                         |
   |-------------------->|                     |                         |
   |                     | POST /reservation   |                         |
   |                     |-------------------->|                         |
   |                     |                     | INSERT reservation_meal |
   |                     |                     |------------------------>|
   |                     |                     |          OK             |
   |                     |                     |<------------------------|
   |                     | Confirmation        |                         |
   |                     |<--------------------|                         |
   | Réservation OK      |                     |                         |
   |<--------------------|                     |                         |
