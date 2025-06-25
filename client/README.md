# 🧩 TeamTask — Application MERN de Gestion des Tâches

Application MERN avec authentification JWT, gestion multi-utilisateur et rôles (user vs manager), développée dans le cadre d’un exercice technique.

---

## 🔧 Stack utilisée

- **Frontend** : React + Redux Toolkit + React Router
- **Backend** : Node.js + Express + MongoDB (via Mongoose)
- **Authentification** : JWT (stocké en localStorage)
- **Sécurité** : Protection des routes, gestion des rôles

---

## 🚀 Fonctionnalités

### 👤 Authentification

- Inscription / Connexion via formulaire
- Authentification via JWT (stocké dans localStorage)
- Rôles : `user` et `manager`
- Middleware pour sécuriser les routes

### ✅ Gestion des tâches

- CRUD des tâches (Create, Read, Update, Delete)
- Attribution de tâches à des utilisateurs (manager uniquement)
- Liste filtrable par statut (`à faire`, `en cours`, `terminée`)
- Affichage personnalisé selon le rôle

### ⚙️ Interface manager

- Accès à toutes les tâches
- Page Admin : liste de tous les utilisateurs
- Formulaire de création de tâche avec sélection d’utilisateur

---

## 📁 Structure du projet

```
TeamTask/
├── client/         # React app
├── server/         # Express API
└── README.md
```

---

## 🛠️ Lancer le projet en local

### 1. Cloner le repo

```bash
git clone https://github.com/manel508/TeamTask.git
cd TeamTask
```

### 2. Lancer le backend

```bash
cd server
npm install
touch .env # puis ajouter MONGO_URI et JWT_SECRET
npm run dev
```

### 3. Lancer le frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 📸 Démo

[Home page](../client/src/assets/images/home.png) 
[connexion](../client/src/assets/images/connexion.png) 
[inscription](../client/src/assets/images/inscription.png) 
[task list](../client/src/assets/images/taskList.png)
[createTask](../client/src/assets/images/createTask.png) 
[userList](../client/src/assets/images/userList.png)
---

## 👤 Auteur

- **Nom** : Manel Ben Belgacem
- **Email** : bbelgacem.manel@gmail.com
- **Projet technique réalisé le** : Juin 2025
