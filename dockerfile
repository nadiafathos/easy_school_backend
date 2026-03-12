# Utilise l'image officielle Node
FROM node:18

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port utilisé par ton backend
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]