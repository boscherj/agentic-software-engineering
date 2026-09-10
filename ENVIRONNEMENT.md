# Environnement de développement de la formation

> Version de référence : 10 septembre 2026

Ce document décrit l’environnement logiciel retenu pour la formation **Agentic Software Engineering**. L’objectif n’est pas de former les participants à un produit unique, mais de leur faire pratiquer plusieurs approches complémentaires de l’ingénierie logicielle assistée et pilotée par des agents IA.

## Principes de choix

Nous retenons des outils qui répondent à quatre critères :

1. **forte adoption chez les ingénieurs logiciels** ;
2. **capacité réelle à exécuter des workflows agentiques**, et pas seulement à compléter du code ;
3. **complémentarité pédagogique** entre IDE, terminal, agents, Git et automatisation ;
4. **stabilité suffisante pour une formation professionnelle**.

Le poste de travail de référence repose donc sur le principe suivant :

```text
VS Code
  ├── Git / GitHub
  ├── GitHub Copilot
  ├── terminal
  │    ├── Claude Code
  │    └── OpenAI Codex CLI
  ├── uv / Python / pytest / Ruff
  └── Docker
```

L’IDE reste le poste de pilotage, mais l’agent n’est pas lié à l’IDE : plusieurs agents peuvent agir sur le même dépôt, chacun avec son propre mode d’interaction.

---

## Configuration retenue

| Outil | Version de référence | Rôle dans la formation |
|---|---:|---|
| Visual Studio Code | **1.136.x Stable** (minimum 1.136) | IDE principal et poste de pilotage |
| GitHub Copilot | **dernière version stable** compatible avec VS Code | agent intégré à l’IDE |
| Claude Code | **2.1.236 `stable`** | agent de développement en terminal |
| OpenAI Codex CLI | **0.153.4** | second agent de développement en terminal |
| Git | **2.55.0** | versionnement, branches, diff, worktrees |
| GitHub CLI (`gh`) | **2.100.0** | interaction GitHub depuis le terminal |
| uv | **version stable validée avant la session** | gestionnaire Python, environnements et dépendances |
| Python | **3.14.7** | langage principal du projet fil rouge |
| pytest | **9.1.1** | tests automatisés |
| Ruff | **0.16.6** | linting et contrôle rapide du code Python |
| Node.js | **24.21.0 LTS** | runtime requis par une partie de l’écosystème IA/JS |
| Docker Desktop | **4.90.0** | environnement d’exécution contrôlé et reproductible |

> **Note VS Code — 10 septembre 2026 :** VS Code 1.137 a été annoncé par Microsoft, mais son déploiement Stable est progressif. Le téléchargement Stable peut encore fournir la série 1.136.x. Pour la formation, nous retenons donc **1.136.x Stable comme référence immédiatement reproductible** et nous ne forçons pas l’installation de 1.137 tant qu’elle n’est pas distribuée uniformément.

---

# 1. Visual Studio Code 1.136.x Stable

## Pourquoi VS Code ?

VS Code est retenu comme environnement principal car il reste l’un des environnements de développement les plus répandus et qu’il devient progressivement un **poste de pilotage d’agents**.

La série 1.136 Stable dispose déjà des fonctions nécessaires à la formation et constitue, au 10 septembre 2026, la base stable effectivement reproductible sur les postes des participants. La version 1.137 apporte de nouvelles fonctions agentiques, mais son déploiement Stable étant progressif, elle ne constitue pas encore notre prérequis.

Nous utiliserons la version **Stable**, et non Insiders, afin de limiter les variations de comportement pendant la formation.

## Ce que nous montrerons

- ouverture et compréhension d’un dépôt réel ;
- terminal intégré ;
- Git intégré ;
- lancement d’agents depuis l’environnement de travail ;
- inspection des changements ;
- comparaison entre agent intégré et agent CLI.

Références :
- https://code.visualstudio.com/updates/v1_136
- https://code.visualstudio.com/updates/v1_137

---

# 2. GitHub Copilot

## Pourquoi GitHub Copilot ?

GitHub Copilot représente le modèle de l’**agent directement intégré à l’IDE**. Il permet de montrer la continuité entre les usages historiques de l’IA dans le développement et les usages agentiques récents :

```text
complétion → chat → édition → agent → délégation
```

Il est également particulièrement adapté à une formation utilisant GitHub comme plateforme de collaboration, car l’environnement de travail peut relier code, issues, pull requests et revue.

## Version

Nous utiliserons la **dernière version stable de l’extension GitHub Copilot compatible avec la version Stable de VS Code retenue pour la session**.

Nous ne figerons pas son numéro de patch dans ce document, car l’extension est mise à jour fréquemment. Avant chaque session de formation, tous les postes devront être alignés sur la même version stable.

## Ce que nous montrerons

- Copilot Chat ;
- Agent Mode ;
- contexte du workspace ;
- instructions personnalisées ;
- modifications multi-fichiers ;
- utilisation du terminal et des outils ;
- revue des changements produits par l’agent.

---

# 3. Claude Code 2.1.236 `stable`

## Pourquoi Claude Code ?

Claude Code est retenu comme exemple majeur d’**agent de développement en terminal**.

Il permet de faire comprendre une idée fondamentale de l’Agentic Software Engineering :

> l’agent n’est pas nécessairement une fonction de l’IDE ; il peut travailler directement sur le repository, utiliser le terminal, exécuter des tests et modifier plusieurs fichiers.

Claude Code sera notamment utilisé pour pratiquer la boucle suivante :

```text
objectif
  ↓
exploration du dépôt
  ↓
planification
  ↓
modifications
  ↓
commandes terminal
  ↓
tests
  ↓
analyse des erreurs
  ↓
correction
  ↓
validation du diff
```

## Pourquoi le canal `stable` ?

Au 10 septembre 2026 :

- le tag npm `latest` est **2.1.267** ;
- le tag npm `stable` est **2.1.236**.

Pour une formation, nous privilégions **`stable`** afin de réduire le risque de variations de comportement entre deux sessions.

Référence : https://www.npmjs.com/package/@anthropic-ai/claude-code?activeTab=versions

---

# 4. OpenAI Codex CLI 0.153.4

## Pourquoi Codex ?

Codex CLI constitue notre **deuxième agent de développement en terminal**.

L’intérêt pédagogique est essentiel : nous ne voulons pas que les participants confondent les principes de l’Agentic Software Engineering avec le fonctionnement particulier d’un seul outil.

Nous pourrons confier une même tâche à Claude Code et Codex, puis comparer :

- l’exploration du dépôt ;
- le plan proposé ;
- les fichiers modifiés ;
- les commandes exécutées ;
- la stratégie de test ;
- la qualité du diff final ;
- le niveau d’autonomie.

## Version

Nous utiliserons **0.153.4**, dernière version non pré-release disponible au 10 septembre 2026.

Les versions `0.154.0-alpha.*` ne seront pas utilisées dans la formation.

Référence : https://github.com/openai/codex/releases

---

# 5. Git 2.55.0

## Pourquoi Git devient encore plus important avec les agents ?

Dans un workflow agentique, Git n’est plus seulement un outil de versionnement. Il devient aussi un **mécanisme de contrôle et d’isolation du travail des agents**.

Nous utiliserons Git pour enseigner :

- commits petits et vérifiables ;
- branches ;
- comparaison de versions ;
- `diff` ;
- revert ;
- merge ;
- worktrees ;
- isolation de plusieurs agents travaillant en parallèle.

Exemple :

```text
repository
  ├── main
  ├── worktree agent-copilot
  ├── worktree agent-claude
  └── worktree agent-codex
```

Référence : https://git-scm.com/install/

---

# 6. GitHub CLI 2.100.0

## Pourquoi GitHub CLI ?

`gh` permet aux ingénieurs et aux agents de manipuler GitHub sans quitter le terminal.

C’est un composant important du workflow que nous voulons enseigner :

```text
issue → branche → développement → tests → commit → pull request → revue
```

Nous l’utiliserons notamment pour :

- consulter et créer des issues ;
- créer des branches liées à des issues ;
- travailler avec des worktrees ;
- créer et consulter des pull requests ;
- examiner les résultats des workflows GitHub Actions.

La version 2.100.0 est la version stable courante au 10 septembre 2026.

Référence : https://github.com/cli/cli/releases

---

# 7. uv

## Pourquoi uv ?

`uv` devient le **gestionnaire Python officiel de la formation**. Il est utilisé pour installer/sélectionner Python, créer `.venv`, gérer les dépendances, verrouiller les versions avec `uv.lock` et reconstruire l’environnement avec `uv sync`.

Cela évite de dépendre du Python système et rend les postes des stagiaires beaucoup plus reproductibles.

```text
pyproject.toml
      ↓
   uv.lock
      ↓
    uv sync
      ↓
    .venv/
```

Le repository versionne `pyproject.toml`, `.python-version` et `uv.lock`, mais jamais `.venv/`.

Guide détaillé : `docs/installation-python-uv.md`.

---

# 8. Python 3.14.7

## Pourquoi Python ?

Python sera le langage principal du **projet fil rouge**.

Le but de la formation n’est pas d’apprendre un framework ou un langage particulier. Python permet de construire rapidement une application suffisamment réaliste pour pratiquer :

- architecture logicielle ;
- correction de bugs ;
- ajout de fonctionnalités ;
- refactoring ;
- tests ;
- dépendances ;
- documentation ;
- CI.

Il permet également de garder le code lisible afin que l’attention reste centrée sur le travail des agents.

Nous utiliserons **Python 3.14.7**, installé et sélectionné via uv.

Référence : https://www.python.org/downloads/release/python-3147/

---

# 9. pytest 9.1.1

## Pourquoi pytest ?

Dans un développement agentique, le test automatisé devient une partie essentielle du contrat passé avec l’agent.

Un agent doit pouvoir :

1. comprendre les critères d’acceptation ;
2. exécuter les tests ;
3. constater un échec ;
4. modifier le code ;
5. réexécuter les tests ;
6. démontrer que la tâche est terminée.

pytest sera donc utilisé pour transformer les spécifications en **garde-fous exécutables**.

Version de référence : **9.1.1**.

Référence : https://pypi.org/project/pytest/

---

# 10. Ruff 0.16.6

## Pourquoi Ruff ?

Les agents peuvent produire rapidement beaucoup de code. Nous avons besoin de contrôles rapides et déterministes pour éviter que la qualité du dépôt ne se dégrade.

Ruff sera utilisé comme outil léger pour :

- linting ;
- détection d’erreurs simples ;
- contrôle automatique dans la CI ;
- retour immédiat exploitable par les agents.

Version de référence : **0.16.6**.

Référence : https://pypi.org/project/ruff/

---

# 11. Node.js 24.21.0 LTS

## Pourquoi installer Node.js si les TP sont en Python ?

Une grande partie de l’écosystème des outils de développement IA et MCP utilise JavaScript, TypeScript et npm.

Node.js est donc installé même si le projet fil rouge principal est en Python.

Nous retenons **Node.js 24.21.0 LTS**, plutôt que Node.js 26 Current, pour privilégier la stabilité et la reproductibilité sur les postes des stagiaires.

Référence : https://nodejs.org/fr/download

---

# 12. Docker Desktop 4.90.0

## Pourquoi Docker ?

Docker sera utilisé pour enseigner une notion centrale du développement agentique : **un agent ne doit pas nécessairement avoir accès à l’ensemble de la machine de l’ingénieur**.

Nous montrerons la différence entre :

```text
Agent
  ↓
ordinateur personnel avec accès large
```

et :

```text
Agent
  ↓
environnement contrôlé / container
  ↓
repository
  ↓
tests
```

Docker servira donc à illustrer :

- reproductibilité ;
- isolation ;
- sandboxing ;
- contrôle des dépendances ;
- sécurité de l’exécution agentique.

Version de référence : **Docker Desktop 4.90.0**, publiée le 7 septembre 2026.

Référence : https://docs.docker.com/desktop/release-notes/

---

# Politique de versions pour la formation

Les outils agentiques évoluent beaucoup plus vite que les environnements traditionnels. Nous appliquerons donc la politique suivante.

## Versions figées

Les composants structurants des TP sont figés sur une version précise ou une série précise :

- Python 3.14.7 ;
- pytest 9.1.1 ;
- Ruff 0.16.6 ;
- Node.js 24.21.0 LTS ;
- Git 2.55.0 ;
- GitHub CLI 2.100.0 ;
- Docker Desktop 4.90.0 ;
- OpenAI Codex CLI 0.153.4.

Les dépendances Python sont en outre verrouillées par `uv.lock`.

## Versions à mise à jour contrôlée

Pour les logiciels publiés à cadence très élevée :

- **VS Code** : dernière version Stable effectivement distribuée et validée avant la session ; référence actuelle **1.136.x**, minimum **1.136** ;
- **GitHub Copilot** : même version stable sur tous les postes ;
- **Claude Code** : canal npm `stable`, actuellement 2.1.236 ;
- **uv** : version stable validée avant chaque session, le projet restant reproductible grâce à `pyproject.toml` et `uv.lock`.

La configuration sera vérifiée quelques jours avant chaque session afin d’éviter qu’une mise à jour majeure non testée modifie le comportement des exercices.

---

# Ce que cet environnement permet d’enseigner

L’environnement n’est pas une simple liste d’outils. Il est conçu pour illustrer progressivement trois niveaux d’ingénierie logicielle avec l’IA.

## Niveau 1 — IA dans l’IDE

```text
Développeur → VS Code → GitHub Copilot → code
```

## Niveau 2 — Agent de développement

```text
Ingénieur
  ↓
spécification
  ↓
Claude Code / Codex
  ↓
repository + terminal + tests
  ↓
diff
  ↓
validation humaine
```

## Niveau 3 — Agentic Software Engineering

```text
Ingénieur
  ↓
issues / spécifications / critères d’acceptation
  ↓
orchestration
  ├── Copilot
  ├── Claude Code
  └── Codex
       ↓
branches / worktrees
       ↓
uv + environnement reproductible
       ↓
tests + lint + CI
       ↓
pull requests
       ↓
revue humaine et/ou agentique
       ↓
intégration
```

Le but de la formation est d’amener progressivement les participants du **coding assisté par IA** à cette troisième approche : l’ingénieur conçoit le système de travail, fournit le contexte, délègue, supervise, vérifie et intègre le travail produit par des agents logiciels.
