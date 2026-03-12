Élève               App Mobile            Backend API            Base de données
   |                     |                     |                         |
   | Téléverse fichier   |                     |                         |
   |-------------------->|                     |                         |
   |                     | POST /homework_submission                      |
   |                     |-------------------->|                         |
   |                     |                     | INSERT homework_submission
   |                     |                     | (homework_id, child_id, fichier...)
   |                     |                     |------------------------>|
   |                     |                     |           OK            |
   |                     |                     |<------------------------|
   |                     | Confirmation        |                         |
   |                     |<--------------------|                         |
   | Devoir envoyé       |                     |                         |
