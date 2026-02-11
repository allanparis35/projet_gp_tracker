# 🎵 F.Y.T.by Signal
## 🇫🇷 Version Française

Plateforme web de decouverte de concerts et de gestion de billetterie, concue pour connecter les fans a leurs artistes preferes.

---

## Sommaire

- A propos
- Installation et Lancement
- Configuration
- Stack Technique
- Fonctionnalites
- Architecture

---

## A propos

Groupie Tracker est une application immersive permettant de suivre des artistes, de consulter leurs prochaines dates de concerts et d'acheter des billets en ligne. Le projet met l'accent sur une experience utilisateur fluide et une interface moderne avec une identite graphique sombre et marquee.

---

## Installation et Lancement

### 1. Prerequis
- Go (derniere version stable)
- Node.js et npm (pour le frontend React)
- PostgreSQL (installe localement ou via Docker)

### Lancement du Backend (API Go)

Avant de lancer le serveur le front vous devez lancer le backend via le repo suivant, il contient sont propre README pour vous guider.

https://github.com/enzo959/projet_gp_tracker_backend.git

Lancer le FrontEnd
cd ui
npm install
npm run dev

Lancement de Docker
psql -U <VOTRE_UTILISATEUR> -p <VOTRE_PORT> -h <VOTRE_HOTE> -d <NOM_DE_VOTRE_BASE>
\c groupie_db


Projet_gp_tracker/
├── images/             
├── src/
│   ├── node_modules/      
│   ├── pages/         
│   ├── App.jsx          
│   └── main.jsx         
├── index.html          
└── package.json      

## 🇬🇧 English Version

A web platform for discovering concerts and managing ticketing, designed to connect fans with their favorite artists.

Table of Contents

About

Installation & Launch

Configuration

Tech Stack

Features

Architecture

About

Groupie Tracker is an immersive application that allows users to follow artists, view their upcoming concert dates, and purchase tickets online. The project focuses on a smooth user experience and a modern interface with a distinctive dark visual identity.

Installation & Launch
1. Prerequisites

Go (latest stable version)

Node.js and npm (for the React frontend)

PostgreSQL (installed locally or via Docker)

Launching the Backend (Go API)

Before starting the frontend server, you must first start the backend using the following repository. It contains its own README to guide you:

https://github.com/enzo959/projet_gp_tracker_backend.git

Launching the Frontend
cd ui
npm install
npm run dev

Launching Docker
psql -U <YOUR_USER> -p <YOUR_PORT> -h <YOUR_HOST> -d <YOUR_DATABASE_NAME>
\c groupie_db

Project Structure
Projet_gp_tracker/
├── images/             
├── src/
│   ├── node_modules/      
│   ├── pages/         
│   ├── App.jsx          
│   └── main.jsx         
├── index.html          
└── package.json 