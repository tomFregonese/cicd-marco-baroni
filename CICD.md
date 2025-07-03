# CI/CD Workflow

Ce document décrit le **workflow complet** du projet, depuis le développement jusqu'au déploiement automatique, en passant par les tests et la validation.

---

## 🌿 Organisation des branches

| Branche       | Rôle                                  | Déploiement auto |
|---------------|----------------------------------------|------------------|
| `feature/*`   | Développement de nouvelles fonctionnalités | ❌               |
| `staging`     | Pré-intégration et tests manuels        | ✅ Netlify       |
| `develop`     | Intégration validée, pré-production     | ✅ Netlify       |
| `main`        | Code en production                      | ✅ Netlify       |

---

## 🔄 Workflow de développement

1. **Création d’une branche `feature/xyz` ou `fix/xyz`**
    - Pour chaque nouvelle fonctionnalité ou correctif.

2. **Développement et commits**
    - Travail local sur la branche `feature/*`/`fix/*`.

3. **Pull Request vers `staging`**
    - Tests manuels et revue de code.
    - ✅ Requiert **2 validateurs** pour merger.

4. **Pull Request vers `develop`**
    - Intégration validée.
    - ✅ Requiert aussi **2 validateurs**.

5. **Pull Request vers `main`**
    - Déploiement en production.
    - ✅ Toujours **2 validateurs minimum**.

---

## 🔒 Règles de protection des branches

- ❌ **Aucun push direct** n’est autorisé sur :
    - `main`
    - `develop`
    - `staging`
- ✅ Seuls les **pull requests** avec **2 approbations** peuvent être mergés.

---

## 🚀 Déploiements automatiques

- `staging` → Environnement de test via **Netlify**
- `develop` → Pré-production via **Netlify**
- `main` → Production via **Netlify**

Chaque push dans l'une de ces branches déclenche un déploiement automatique.

---

## ⚙️ Pipeline GitHub Actions

Définie dans `.github/workflows/ci.yml`.

### Déclencheurs
Push et pull request sur les branches `main` et toutes les autres branches.

```yaml
on:
  push:
    branches:
      - main
      - "**"
  pull_request:
```

### Étapes

1. Lint
Vérifie la qualité du code avec npm run lint.

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
```

### 2. Build & Test
Compile le code et exécute les tests.

```yaml
  build_test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm run test
```

### 3. Docker Build & Push
Crée et publie l’image Docker sur GitHub Container Registry.

```yaml
  docker:
    runs-on: ubuntu-latest
    needs: build_test
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v3
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/tomfregonese/cicd-marco-baroni:latest
```