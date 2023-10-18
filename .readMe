# API Bibliothèque

Cette API permet de gérer une bibliothèque, en offrant des fonctionnalités CRUD pour chaque table de la base de données.

## Prérequis

- Node.js
- MySQL

## Mise en place

1. **Clonage du dépôt**:

git clone https://github.com/Reelecks/ProjetRestApi


2. **Installation des dépendances**:
Accédez au dossier du projet, puis installez les dépendances nécessaires.

cd dossier_du_projet
npm install


3. **Configuration de la base de données**:

Faire fichier `.env` et mettez à jour les variables suivantes avec vos propres informations de configuration:

DB_USER=VotreNomUtilisateur
DB_PASSWORD=VotreMotDePasse
PORT=VotrePort



4. **Importation de la base de données**:

Importez le fichier `biblio.sql` dans votre système de gestion de base de données MySQL.

5. **Démarrage de l'API**:

node server.js

6. **Liste des routes**:

### Utilisateurs
- **GET** `/utilisateurs`: Affiche tous les utilisateurs
- **GET** `/utilisateurs/:id`: Récupère les informations d'un utilisateur spécifique
- **POST** `/utilisateurs`: Crée un nouvel utilisateur
- **PUT** `/utilisateurs/:id`: Modifie un utilisateur spécifique
- **DELETE** `/utilisateurs/:id`: Supprime un utilisateur spécifique

### Catégories
- **GET** `/categories`: Affiche toutes les catégories
- **GET** `/categories/:id`: Récupère les informations d'une catégorie spécifique
- **POST** `/categories`: Crée une nouvelle catégorie
- **PUT** `/categories/:id`: Modifie une catégorie spécifique
- **DELETE** `/categories/:id`: Supprime une catégorie spécifique

### Éditeurs
- **GET** `/editeurs`: Affiche tous les éditeurs
- **GET** `/editeurs/:id`: Récupère les informations d'un éditeur spécifique
- **POST** `/editeurs`: Crée un nouvel éditeur
- **PUT** `/editeurs/:id`: Modifie un éditeur spécifique
- **DELETE** `/editeurs/:id`: Supprime un éditeur spécifique

### Livres
- **GET** `/livres`: Affiche tous les livres
- **POST** `/livres`: Crée un nouveau livre
- **PUT** `/livres/:id`: Modifie un livre spécifique
- **DELETE** `/livres/:ISBN`: Supprime un livre spécifique
- **GET** `/livres/emprunts`: Affiche la liste des utilisateurs ayant emprunté un livre
- **GET** `/livres/disponibles/:nomCategorie`: Affiche la liste des livres disponibles dans une catégorie spécifique
- **GET** `/livres/emprunts/retards`: Affiche la liste des emprunts en retard

### Auteurs
- **GET** `/auteurs`: Affiche tous les auteurs
- **GET** `/auteurs/:id`: Récupère les informations d'un auteur spécifique
- **POST** `/auteurs`: Crée un nouvel auteur
