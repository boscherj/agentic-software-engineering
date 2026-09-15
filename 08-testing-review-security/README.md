# 08 — Tests, revue et sécurité

## Objectif
Mettre en place les garde-fous permettant de déléguer davantage sans renoncer à la qualité et au contrôle.

## Thèmes
- tests comme critères exécutables ;
- linting ;
- CI ;
- revue de diff ;
- pull requests ;
- permissions des agents ;
- secrets et données sensibles ;
- sandboxing et Docker.

## TP
Faire produire une modification par un agent, la soumettre aux contrôles automatiques puis réaliser une revue avant intégration.

## Première intégration continue avec GitHub Actions

Le fichier `.github/workflows/ci.yml` définit la première **CI** (*Continuous
Integration*, ou intégration continue) du dépôt. Son rôle est d'exécuter les
mêmes contrôles que ceux validés localement, sur une machine GitHub indépendante.

```text
modification du code
        ↓
push ou pull request
        ↓
GitHub Actions démarre une machine temporaire
        ↓
Ruff + pytest
        ↓
succès ou échec visible dans GitHub
```

Un test qui passe sur un Mac peut échouer ailleurs à cause d'une dépendance,
d'une version de Python ou d'une configuration présente uniquement localement.
C'est pourquoi une validation indépendante est indispensable.

### Déclencheurs et permissions

```yaml
on:
  push:
  pull_request:

permissions:
  contents: read
```

- `push` lance la CI lorsqu'un commit est envoyé sur GitHub ;
- `pull_request` la lance lorsqu'une pull request est ouverte ou modifiée ;
- `contents: read` limite le jeton temporaire de GitHub à la lecture du dépôt.

Le workflow peut donc vérifier le code, mais pas le modifier, créer un commit
ou publier du contenu. C'est le principe du **moindre privilège** : attribuer
seulement les droits nécessaires.

### Préparer une machine neuve

```yaml
jobs:
  verification:
    runs-on: ubuntu-latest
```

Un *job* est une suite d'étapes exécutées dans la même machine temporaire.
`ubuntu-latest` demande une machine Linux neuve à GitHub ; elle ne réutilise
ni les fichiers ni l'environnement Python du poste de développement.

```yaml
- name: Récupérer le dépôt
  uses: actions/checkout@v7
```

Cette action copie le commit concerné dans la machine. Sans elle, aucun fichier
du projet ne serait disponible pour les étapes suivantes.

```yaml
- name: Installer Python
  uses: actions/setup-python@v7
  with:
    python-version-file: .python-version
```

`actions/setup-python` installe Python. `python-version-file` lui demande de
lire `.python-version`, la référence déjà utilisée par le projet, plutôt que
de s'appuyer sur une version Python préinstallée et variable.

```yaml
- name: Installer uv
  uses: astral-sh/setup-uv@bec219d24cd3e171d82865faccec33120bb574f4 # v10.1.0
```

Cette étape installe `uv`. L'identifiant long désigne le commit exact de
l'action officielle en version 10.1.0 : une mise à jour ultérieure d'un tag ne
peut donc pas modifier silencieusement le workflow.

### Reproduire l'environnement et vérifier le code

```yaml
- name: Installer les dépendances verrouillées
  run: uv sync --locked --dev
```

`uv sync` crée l'environnement et installe les dépendances. `--locked` exige
que `uv.lock` soit cohérent avec `pyproject.toml`, sans recalculer les versions
ni modifier les fichiers. `--dev` installe aussi pytest et Ruff.

```yaml
- name: Vérifier le style et les erreurs statiques
  run: uv run ruff check .

- name: Exécuter les tests
  run: uv run pytest
```

`uv run` exécute la commande dans l'environnement recréé. Ruff inspecte le
code sans le lancer ; pytest exécute les tests. L'échec de l'une de ces
commandes met le job, puis la CI, en échec.

### Lire le résultat

L'onglet **Actions** de GitHub liste les exécutions. Une coche verte signifie
que toutes les étapes ont réussi ; une croix rouge indique l'étape en erreur.
Il faut lire son journal avant de corriger quoi que ce soit : l'origine peut
être un test, le linting ou la configuration du workflow.

Le premier lancement de ce dépôt a illustré ce principe : les tests locaux
passaient, mais la référence à `setup-uv` était invalide pour GitHub. La CI a
détecté cette différence ; le workflow a été corrigé et l'exécution suivante a
réussi.
