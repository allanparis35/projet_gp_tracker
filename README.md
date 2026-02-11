# Groupie Tracker

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

Avant de lancer le serveur, vous devez configurer vos variables d'environnement avec vos propres identifiants.

#### Sur Windows (PowerShell)
```bash
$env:DATABASE_URL="postgres://<UTILISATEUR>:<MOT_DE_PASSE>@<HOTE>:<PORT>/<NOM_DB>?sslmode=disable"
$env:JWT_SECRET="<VOTRE_CLE_SECRETE>"
go run ./cmd/api

### Sur Linux/MacOs
export DATABASE_URL="postgres://<UTILISATEUR>:<MOT_DE_PASSE>@<HOTE>:<PORT>/<NOM_DB>?sslmode=disable"
export JWT_SECRET="<VOTRE_CLE_SECRETE>"
go run ./cmd/api

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