# CICD 

## GitHub Actions Workflow
 
### 1 : Lint

Nom du job : lint
Objectif : Vérifie la qualité du code.

Étapes :
1.	Clonage du dépôt (actions/checkout@v3)
2.	Configuration de Node.js (v20)
3.	Installation des dépendances (npm ci)
4.	Exécution du linter (npm run lint)


### 2 : Build & Test

Nom du job : build_test
Objectif : Compiler et tester l’application.

Étapes :
1.	Attente que le job lint réussisse (needs: lint)
2.	Clonage du dépôt
3.	Configuration de Node.js (v20)
4.	Installation des dépendances
5.	Compilation (npm run build)
6.	Lancement des tests (npm run test)


### 3 : Docker Build & Push

Nom du job : docker
Objectif : Construire et publier l’image Docker sur GitHub Container Registry.

Étapes :
1.	Attente que le job build_test réussisse (needs: build_test)
2.	Clonage du dépôt
3.	Configuration de Docker Buildx
4.	Connexion à GHCR (ghcr.io)
5.	Construction et push de l’image Docker avec le tag : ghcr.io/tomfregonese/cicd-marco-baroni:latest