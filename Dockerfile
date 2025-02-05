# Étape 1 : Construction de l'application Angular
:FROM node:22-alpine AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Construire l'application Angular
RUN npm run build -- --configuration=production

# Étape 2 : Préparation pour le déploiement (serveur nginx)
FROM nginx:stable-alpine

# Copier les fichiers de build Angular vers le dossier nginx/html
COPY --from=build /app/dist/p4veilletech /usr/share/nginx/html

# Copier un fichier de configuration nginx (optionnel, si requis)
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80 pour le trafic HTTP
EXPOSE 80

# Commande par défaut pour exécuter nginx
CMD ["nginx", "-g", "daemon off;"]
