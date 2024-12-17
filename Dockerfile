# Étape 1 : Image Node.js pour le développement
FROM node:lts AS dev

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port utilisé par le mode dev d'Astro (par défaut 3000)
EXPOSE 3000

# Commande par défaut pour démarrer le mode dev
CMD ["npm", "run", "dev"]
