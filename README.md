# 🚀 Atelier CI/CD Workshop

Bienvenue dans ce projet réalisé dans le cadre du workshop CI/CD du module. Ce projet a pour objectif de mettre en œuvre une **pipeline CI/CD complète**, d'apprendre à gérer des incidents, documenter les process, et intégrer des bonnes pratiques de sécurité dans un environnement DevOps.

## 🧰 Stack utilisée

- **GitLab / GitHub** pour le versioning et CI
- **GitHub Actions** pour la CI/CD
- **Netlify** pour le déploiement
- **Markdow** pour la documentation
- **Framework** avec React et Vite

---

## Installation et lancement du projet

- **Etape 1** : ouvrir le terminal et lancer la commande `npm install`
- **Etape 2** : lancer le projet avec la commande `npm run dev`

---

## 📁 Structure des fichiers

- `README.md` – vous êtes ici 🧐
- `CICD.md` – détails sur le pipeline [ICI](./CICD.md)
- `SECURITY.md` – protocole de sécurité [ICI](./SECURITY.md)
- `INSPIRE.md` – mission d’analyse de projets GitHub [ICI](./INSPIRE.md)
- `.github/workflows/ci.yml` – pipeline CI/CD

---

## 🧪 Missions du Projet CI/CD

Ce document présente la résolution complète des missions du workshop CI/CD. Chaque mission simule une situation réelle que l’on peut rencontrer dans un environnement de développement professionnel.

Pour information, la mission 1 ainsi que les tickets associés ont été réalisés sur [Gitlab](https://gitlab.com/tomFregonese/cicd-marco-baroni), tandis que les autres missions ont été effectuées sur Github mais toutes les issues se trouvent sur GitLab.

---

### 🔧 Mission 1 – “The new dev broke the code…”

Cette mission avait pour objectif de simuler une situation fréquente en entreprise : un nouveau développeur casse le projet par inadvertance. Il s’agissait alors de détecter, corriger et documenter le bug, tout en exploitant les bonnes pratiques Git et CI/CD.

#### Étapes réalisées :
- L'intervenant a introduit une erreur volontaire sur une branche nommée `dev-marco` 
- La CI configurée via GitHub Actions s’est exécutée automatiquement lors du push, et a échoué au stade de vérification, signalant une anomalie.
- Correction du bug dans la branche main sous une nouvelle version V.1.0.1.
  
- Un [ticket #2](https://gitlab.com/tomFregonese/cicd-marco-baroni/-/issues) a été ouvert sur GitLab Issues pour documenter le processus de résolution du bug

---

### 🚀 Mission 2 – “It works for me… but not online”

Cette mission visait à reproduire un cas classique de "ça marche en local, mais pas en production", et à structurer le projet pour pouvoir y faire face efficacement.

#### Travail réalisé :
- Déploiement du projet en ligne sur **Netlify** à l’adresse suivante :  
  🔗 [https://shiny-unicorn-a7686b.netlify.app](https://shiny-unicorn-a7686b.netlify.app)
- Création et usage de trois branches distinctes :
  - `dev` : développement local
  - `staging` : environnement de test intermédiaire
  - `main` : production
- Création du [ticket #3](https://gitlab.com/tomFregonese/cicd-marco-baroni/-/issues) sur Gitlab Issues 

---

### 📄 Mission 3 – “Boss, I did it, I swear... better: read the doc.”

Dans cette mission, l’objectif était de rendre le projet compréhensible pour toute personne externe (manager, nouvel arrivant, client) grâce à une documentation claire et complète.

#### Actions menées :
- Rédaction du fichier `README.md` incluant :
  - Une description concise du projet
  - Les technologies utilisées
  - Les étapes pour installer, lancer, et tester le projet localement
  - L’URL de démo en ligne
- Création du fichier `CICD.md` contenant : `CICD.md` – détails sur le pipeline [ICI](./CICD.md)
  - Une explication du pipeline CI/CD mis en place
  - Les étapes de build, test et déploiement
---

### 🛡️ Mission 4 – “We’re attacked! What’s the plan, captain?”

Dans cette dernière mission, nous avons simulé un scénario de sécurité : une attaque provoquant l’affichage d’un message de type "You’ve been hacked" sur le site de production.

👉 Cliquez [ICI](./SECURITY.md) pour accéder à la  documentation de la mission 4.

> (Vous allez être redirigé manuellement)

---

### 💡 Mission Bonus – “Learn from best” ()

👉 Cliquez [ICI](./INSPIRE.md) pour accéder à la  documentation de la mission bonus.

> (Vous allez être redirigé manuellement)


## 📌 Annexes

- **Todo List** : chaque mission est liée à un ticket sur [GitLab Issues](https://gitlab.com/tomFregonese/cicd-marco-baroni/-/issues) pour suivre l'avancement du projet.

---

> **Groupe** : **Les Petits Ploufs**  
> **Membres** : Tom Fregonèse, Enzo Chamanier, Manon Lafosse, Julia Grossi, Gibault Alexandre 
> **Encadrant** : Marco Baroni – Product Manager & Consultant  

