Système interne       Backend API            Base de données         Parent (App)
       |                    |                       |                     |
       | Génère notif       |                       |                     |
       |------------------->|                       |                     |
       |                    | INSERT notification   |                     |
       |                    |---------------------->|                     |
       |                    |                       |         OK          |
       |                    |<----------------------|                     |
       |                    | Push notification     |                     |
       |                    |-------------------------------------------->|
       |                    |                       |   Affiche notif     |
       |                    |                       |<--------------------|
