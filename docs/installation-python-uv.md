# Python, uv, pytest et Ruff : installation, rôle et validation

Ce document décrit la procédure réellement suivie et validée pour préparer l’environnement Python de la formation **Agentic Software Engineering**.

La structure retenue est la même que pour les autres outils :

1. à quoi sert l’outil ;
2. pourquoi il est important dans la formation ;
3. installation ou mise à jour ;
4. configuration ;
5. vérification ;
6. premier test fonctionnel.

## 1. À quoi sert Python ?

Python est le langage principal retenu pour le **projet fil rouge** de la formation.

Il permet de construire rapidement une application suffisamment réaliste pour travailler sur :

- architecture logicielle ;
- correction de bugs ;
- ajout de fonctionnalités ;
- refactoring ;
- tests ;
- gestion des dépendances ;
- CI ;
- documentation ;
- automatisation.

Le but n’est pas d’enseigner Python en tant que tel, mais d’utiliser un langage lisible afin que l’attention reste centrée sur les workflows agentiques.

## 2. À quoi sert uv ?

**uv** est l’outil retenu pour gérer l’environnement Python de la formation.

Il permet notamment de :

- installer et sélectionner une version de Python ;
- créer un environnement virtuel ;
- initialiser un projet Python ;
- ajouter et supprimer des dépendances ;
- résoudre et verrouiller les versions ;
- synchroniser un environnement ;
- exécuter les outils du projet.

Dans notre configuration, uv joue le rôle de **gestionnaire unique de l’environnement Python**.

```text
uv
├── Python 3.14
├── .venv
├── pyproject.toml
├── uv.lock
├── pytest
└── Ruff
```

## 3. Pourquoi uv dans une formation Agentic Software Engineering ?

Les agents de développement doivent pouvoir travailler dans un environnement reproductible et déterministe.

Avec uv, le repository contient les éléments nécessaires pour reconstruire l’environnement :

```text
pyproject.toml
      │
      │ décrit le projet et ses dépendances
      ▼
   uv.lock
      │
      │ verrouille les versions résolues
      ▼
    uv sync
      │
      ▼
    .venv/
```

Cette organisation est particulièrement adaptée aux agents : ils peuvent comprendre les dépendances du projet, lancer les outils de validation et reproduire l’environnement localement ou en CI.

## 4. Versions validées

Environnement réellement validé pendant la préparation :

| Outil | Version validée |
|---|---:|
| Python | **3.14.7** |
| uv | version stable mise à jour sur le poste |
| pytest | **9.1.1** |
| Ruff | **0.16.6** |

## 5. Vérifier uv

Dans le terminal intégré de VS Code :

```bash
uv --version
```

Lors de la préparation initiale, uv était déjà installé dans :

```text
~/.local/bin/uv
```

et une mise à jour a été réalisée avec :

```bash
uv self update
```

## 6. Installer Python 3.14 avec uv

Le Python système du Mac n’a pas été remplacé.

La version de Python utilisée par le projet est gérée par uv :

```bash
uv python install 3.14
```

Cette approche évite de modifier ou de casser le Python déjà présent sur la machine.

## 7. Créer l’environnement virtuel

À la racine du repository :

```bash
uv venv --python 3.14
```

Cela crée :

```text
.venv/
```

Activation sur macOS/Linux :

```bash
source .venv/bin/activate
```

Vérification :

```bash
python --version
which python
```

Le Python utilisé doit pointer vers `.venv/bin/python`.

## 8. Initialiser le projet Python

Une première tentative d’ajout de dépendances avec :

```bash
uv add --dev pytest ruff
```

a échoué car aucun `pyproject.toml` n’existait encore.

Le message d’erreur était :

```text
No `pyproject.toml` found in current directory or any parent directory
```

C’est une distinction importante :

- `uv venv` peut créer un environnement virtuel sans projet Python ;
- `uv add` ajoute une dépendance à un **projet**, donc exige un `pyproject.toml`.

Nous avons donc initialisé le repository avec :

```bash
uv init
```

Cette commande a créé :

```text
.python-version
pyproject.toml
src/
```

## 9. Fichier `.python-version`

Le fichier généré contient :

```text
3.14
```

Il indique la version Python attendue par le projet.

## 10. `pyproject.toml`

Le `pyproject.toml` constitue la définition du projet Python.

Il contient notamment :

- nom du projet ;
- version ;
- version minimale de Python ;
- dépendances ;
- dépendances de développement ;
- configuration du build.

Après ajout des outils de développement, le groupe `dev` contient :

```toml
[dependency-groups]
dev = [
    "pytest>=9.1.1",
    "ruff>=0.16.6",
]
```

## 11. Ajouter pytest et Ruff

Une fois le projet initialisé :

```bash
uv add --dev pytest ruff
```

Cette commande ajoute les outils au groupe de dépendances de développement et met à jour le fichier de verrouillage.

## 12. `uv.lock`

`uv.lock` enregistre les versions résolues du projet.

Il est **versionné dans Git** afin de rendre l’environnement reproductible.

À l’inverse, `.venv/` reste local à chaque machine et ne doit jamais être versionné.

## 13. Recréer l’environnement sur une autre machine

Après clonage du repository, la commande principale est :

```bash
uv sync
```

Elle permet de reconstruire l’environnement du projet à partir de `pyproject.toml` et `uv.lock`.

C’est la commande que nous utiliserons comme référence pour les stagiaires.

## 14. À quoi sert pytest ?

**pytest** est le framework de tests utilisé dans le projet.

Dans un workflow agentique, les tests jouent un rôle central : ils transforment une partie des exigences en critères exécutables.

Un agent peut alors travailler selon une boucle du type :

```text
implémentation
   ↓
pytest
   ↓
échec
   ↓
analyse
   ↓
correction
   ↓
pytest
   ↓
succès
```

Les tests deviennent donc un **garde-fou objectif** entre l’agent et le repository.

## 15. À quoi sert Ruff ?

**Ruff** est utilisé pour le linting et les contrôles rapides du code Python.

Il permet notamment de détecter automatiquement :

- erreurs simples ;
- imports inutilisés ;
- incohérences de style ;
- problèmes détectables statiquement.

Dans un workflow agentique, Ruff fournit un retour rapide et déterministe que l’agent peut utiliser pour corriger son propre travail.

## 16. Vérifier l’environnement

Les commandes suivantes ont été validées :

```bash
uv run python --version
```

Résultat :

```text
Python 3.14.7
```

```bash
uv run pytest --version
```

Résultat :

```text
pytest 9.1.1
```

```bash
uv run ruff --version
```

Résultat :

```text
ruff 0.16.6
```

## 17. Inspecter les dépendances

La commande :

```bash
uv tree
```

a permis de vérifier l’arbre résolu :

```text
agentic-software-engineering v0.1.0
├── pytest v9.1.1 (group: dev)
└── ruff v0.16.6 (group: dev)
```

avec les dépendances transitives de pytest résolues par uv.

## 18. `.gitignore`

Le repository contient un `.gitignore` afin de ne pas versionner les éléments locaux ou temporaires, notamment :

```text
.venv/
__pycache__/
*.py[cod]
.pytest_cache/
.ruff_cache/
.DS_Store
```

## 19. Structure obtenue

Après initialisation :

```text
agentic-software-engineering/
├── .python-version
├── .gitignore
├── pyproject.toml
├── uv.lock
├── .venv/                  # local, non versionné
└── src/
    └── agentic_software_engineering/
        └── __init__.py
```

## 20. Pourquoi cette structure est intéressante pour les agents

Cette structure donne à l’agent des informations explicites sur le projet :

```text
.python-version  → quelle version Python utiliser
pyproject.toml   → quelles dépendances et quels outils utiliser
uv.lock          → quelles versions exactes installer
.venv            → environnement d’exécution local
pytest           → comment vérifier le comportement
Ruff             → comment vérifier la qualité statique
```

L’agent peut donc agir dans un environnement mieux spécifié et plus reproductible.

## 21. Checklist de validation

- [ ] `uv --version` fonctionne ;
- [ ] Python 3.14 est installé via uv ;
- [ ] `.venv/` existe localement ;
- [ ] `.python-version` contient `3.14` ;
- [ ] `pyproject.toml` existe ;
- [ ] `uv.lock` existe et est versionné ;
- [ ] `.venv/` est ignoré par Git ;
- [ ] `uv run python --version` retourne Python 3.14.7 ;
- [ ] `uv run pytest --version` retourne pytest 9.1.1 ;
- [ ] `uv run ruff --version` retourne Ruff 0.16.6 ;
- [ ] `uv sync` permet de synchroniser l’environnement.

À ce stade, l’environnement Python est considéré comme prêt pour les futurs exercices de la formation.
