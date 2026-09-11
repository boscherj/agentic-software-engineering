# Installation et validation d’OpenAI Codex CLI

> Environnement de référence validé le 11 septembre 2026 sur macOS Apple Silicon.

Ce document explique **ce qu’est OpenAI Codex CLI**, pourquoi nous l’utilisons dans la formation **Agentic Software Engineering**, comment l’installer, le lancer dans un repository, comprendre les mécanismes de confiance et d’usage, puis vérifier son fonctionnement sur un projet réel.

La méthode suit la structure commune aux outils de la formation :

1. à quoi sert l’outil ;
2. pourquoi il est utilisé dans la formation ;
3. installation ;
4. vérification ;
5. confiance, sécurité et contexte ;
6. premier test ;
7. quotas et diagnostic.

---

# 1. À quoi sert OpenAI Codex CLI ?

**Codex CLI est un agent de développement logiciel utilisable depuis le terminal.**

Il ne faut pas le réduire à un chatbot dans une console. Dans un workflow agentique, l’objectif est qu’il puisse raisonner à l’échelle du repository, explorer les fichiers, comprendre le contexte du projet et, lorsqu’on l’y autorise, agir sur le code et utiliser les outils de développement.

Le schéma général est :

```text
Ingénieur
   ↓
objectif / tâche
   ↓
Codex CLI
   ├── explore le repository
   ├── lit le contexte du projet
   ├── raisonne sur la tâche
   ├── propose ou réalise des modifications
   ├── utilise les outils disponibles
   ├── exécute les validations nécessaires
   └── rend compte du résultat
   ↓
Ingénieur : contrôle, diff, tests, validation
```

La responsabilité de l’ingénieur ne disparaît donc pas. L’agent augmente sa capacité d’action, ce qui rend au contraire plus importants le contexte, les permissions, les tests, Git et la revue des changements.

---

# 2. Pourquoi Codex CLI dans la formation ?

La formation ne porte pas sur un produit unique. Elle enseigne les principes de l’**Agentic Software Engineering** à travers plusieurs agents.

Nous utilisons notamment :

```text
GitHub Copilot Agent Mode
Claude Code
OpenAI Codex CLI
```

Codex CLI permet de montrer qu’un agent peut être utilisé directement depuis le terminal tout en travaillant sur le même repository que les autres outils.

Cela permet de comparer :

- la découverte du codebase ;
- la construction du contexte ;
- les mécanismes de confiance ;
- les permissions et l’isolation ;
- la planification ;
- l’exécution des commandes ;
- les modifications multi-fichiers ;
- les tests ;
- le comportement face aux erreurs ;
- l’intégration avec Git ;
- la consommation de ressources et les quotas.

L’objectif pédagogique n’est donc pas de déterminer abstraitement « quel agent est le meilleur », mais d’apprendre à **piloter, contraindre, comparer et valider des agents de développement**.

---

# 3. Environnement de référence validé

Sur le poste utilisé pour préparer la formation :

```text
macOS Apple Silicon
Codex CLI 0.154.0
installation standalone/native
```

La commande :

```bash
codex --version
```

a retourné :

```text
codex-cli 0.154.0
```

La commande :

```bash
which codex
```

a retourné :

```text
/Users/jackieboscher/.local/bin/codex
```

L’installation standalone a placé la release sous :

```text
~/.codex/packages/standalone/releases/0.154.0-aarch64-apple-darwin
```

Le lanceur disponible dans le `PATH` est :

```text
~/.local/bin/codex
```

---

# 4. Vérifier avant d’installer

Avant toute installation, toujours vérifier si Codex existe déjà :

```bash
codex --version
which codex
```

Sur le poste de référence, la première commande retournait initialement :

```text
zsh: command not found: codex
```

Cela confirmait que Codex CLI n’était pas encore installé.

Cette étape évite de créer plusieurs installations concurrentes d’un même outil.

---

# 5. Installation native standalone

La méthode utilisée et validée sur macOS Apple Silicon est l’installation standalone :

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

L’installateur a détecté automatiquement :

```text
macOS (Apple Silicon)
```

et a résolu puis installé :

```text
Codex CLI 0.154.0
```

avec le package :

```text
0.154.0-aarch64-apple-darwin
```

Le terminal a également confirmé que :

```text
~/.local/bin
```

était déjà présent dans le `PATH`.

Après installation :

```bash
codex --version
which codex
```

permettent de vérifier immédiatement la version réellement exécutée et son emplacement.

## Pourquoi vérifier `which codex` ?

Un poste de développement peut contenir plusieurs installations d’un même CLI. Le shell exécute celle qu’il trouve selon l’ordre du `PATH`.

Ainsi :

```bash
which codex
```

répond à une question différente de :

```bash
codex --version
```

La première indique **quel exécutable sera lancé** ; la seconde indique **quelle version cet exécutable annonce**.

Cette distinction est essentielle pour diagnostiquer les environnements utilisés par des agents.

---

# 6. Pourquoi retenir l’installation native ?

Dans l’environnement de cette formation, nous privilégions une installation native/standalone lorsque celle-ci est disponible et validée.

Cela évite notamment de rendre Codex artificiellement dépendant de l’environnement Node/npm du projet.

Node et npm restent présents dans la formation pour les outils et projets qui en ont réellement besoin.

La règle générale est :

```text
outil autonome
   → installation autonome lorsque pertinente

dépendance du projet
   → gérée par le gestionnaire du projet
```

Cette séparation facilite le diagnostic et réduit les conflits de versions.

---

# 7. Lancer Codex dans le repository

Depuis le terminal intégré de VS Code, se placer à la racine du projet :

```text
~/Dev/agentic-software-engineering
```

puis lancer :

```bash
codex
```

Le terminal intégré de VS Code est privilégié dans la formation : VS Code sert de poste de pilotage commun pour le code, Git, les diffs, les tests et les différents agents CLI.

---

# 8. Première barrière de sécurité : faire confiance au repository

Au premier lancement dans le repository, Codex a affiché :

```text
Do you trust the contents of this directory?
```

et a explicitement averti que travailler avec du contenu non fiable augmente le risque de **prompt injection**.

Il indiquait également que faire confiance au répertoire permet de charger des éléments locaux au projet tels que :

- configuration ;
- hooks ;
- politiques d’exécution.

C’est un point fondamental de l’Agentic Software Engineering.

Un repository n’est plus seulement du code que l’on lit : il peut contenir des instructions et mécanismes susceptibles d’influencer le comportement d’un agent.

La règle est donc :

```text
repository créé par nous / équipe de confiance
        ↓
peut être approuvé après vérification
```

mais :

```text
repository inconnu
        ↓
ne pas accorder automatiquement la confiance
        ↓
inspecter d’abord le contenu
        ↓
identifier configurations, scripts, hooks et dépendances
```

Dans notre cas, `agentic-software-engineering` est notre propre repository ; le choix validé a donc été :

```text
Yes, continue
```

---

# 9. Interface validée

Après approbation du repository, l’interface a affiché :

```text
OpenAI Codex (v0.154.0)
directory: ~/Dev/agentic-software-engineering
```

La session a également affiché le modèle et le niveau d’effort actifs.

Ces informations sont importantes car une comparaison d’agents n’est pertinente que si l’on sait **quel outil, quelle version, quel modèle et quelle configuration** ont produit le résultat.

Il faut donc éviter de documenter uniquement :

```text
« testé avec Codex »
```

et préférer conserver au minimum :

```text
CLI + version
modèle/configuration visibles
repository
état des permissions
contexte de l’exercice
```

---

# 10. Context Engineering et instructions du repository

Un agent de développement ne reçoit pas seulement le texte saisi par l’utilisateur.

Son contexte peut provenir de plusieurs couches :

```text
objectif utilisateur
       +
instructions du projet
       +
fichiers du repository
       +
état Git
       +
configuration locale
       +
outils disponibles
       +
résultats des commandes
       =
contexte de travail de l’agent
```

Notre repository contient notamment `AGENTS.md`, destiné à exprimer des règles de travail communes aux agents : changements petits et révisables, respect du périmètre, tests, sécurité, validation et définition du « done ».

Un objectif majeur de la formation sera de montrer que la qualité d’un workflow agentique dépend fortement de ce **contexte d’ingénierie**, et pas uniquement de la formulation du prompt.

---

# 11. Premier test contrôlé

Comme pour Claude Code et GitHub Copilot, le premier test doit être non destructif.

Prompt retenu :

```text
Analyse ce repository sans modifier aucun fichier.
```

Cette formulation est volontairement courte.

Nous ne disons pas à l’agent :

- quels fichiers lire ;
- où se trouve la documentation ;
- quelle architecture il doit découvrir ;
- quels fichiers sont importants.

L’agent doit lui-même explorer le repository et construire le contexte nécessaire.

Ce test permet donc d’observer une compétence essentielle :

```text
exploration
    ↓
compréhension
    ↓
action seulement ensuite
```

Après résolution du problème de quota décrit plus bas, ce test a fonctionné sur le poste de référence.

---

# 12. Pourquoi commencer sans modification ?

Un agent capable d’écrire du code ne doit pas nécessairement commencer par écrire du code.

Une séquence plus sûre est :

```text
1. comprendre le repository
2. identifier les instructions
3. comprendre la tâche
4. établir le plan
5. modifier
6. tester
7. inspecter le diff
8. valider
```

Ce principe sera réutilisé dans les exercices de la formation.

---

# 13. Permissions, sandbox et autonomie

Codex CLI est un agent capable d’agir dans un environnement de développement. Il faut donc distinguer trois notions :

**Capacité** : ce que l’agent sait techniquement faire.

**Permission** : ce qu’on l’autorise à faire dans la session.

**Validation** : ce que l’ingénieur accepte effectivement après inspection du résultat.

Le but n’est pas de supprimer les garde-fous pour rendre l’agent « plus agentique ».

Au contraire :

```text
plus l’agent peut agir
        ↓
plus le contrôle du contexte, des permissions,
de l’isolation et des diffs devient important
```

Les modes exacts et options de sandbox évoluent avec le CLI ; ils doivent être vérifiés sur la version utilisée avant une session de formation plutôt que mémorisés à partir d’une ancienne version.

Pour obtenir l’aide de la version installée :

```bash
codex --help
```

et, dans l’interface interactive, utiliser les commandes d’aide proposées par la version courante.

---

# 14. Quotas d’utilisation : installation et capacité d’exécution sont deux choses différentes

Lors du premier test, Codex a répondu :

```text
Usage limit reached.
You've reached your usage limit.
Increase your limits to continue using codex.
```

Ce message ne signifiait pas que Codex était mal installé.

À ce moment-là :

- le binaire fonctionnait ;
- l’interface interactive fonctionnait ;
- le repository avait été approuvé ;
- le répertoire courant était correct ;
- mais le compte n’avait plus de quota utilisable.

Il faut donc distinguer :

```text
installation technique
        ≠
authentification
        ≠
permissions
        ≠
quota d’usage
```

C’est une distinction importante pour le diagnostic en formation.

---

# 15. Examiner l’usage avec `/usage`

Dans la session interactive, la commande utilisée a été :

```text
/usage
```

Elle permet d’accéder aux informations d’usage proposées par l’interface.

Sur le compte de référence, l’espace de gestion indiquait que l’usage inclus était partagé entre plusieurs produits concernés et que la **limite hebdomadaire était épuisée**.

Il indiquait également :

```text
0 crédits restants
```

mais proposait des **réinitialisations complètes** déjà disponibles.

---

# 16. Réinitialisations de limite et crédits

L’interface de gestion expliquait :

```text
Utilisez une réinitialisation pour rétablir votre limite de 5 heures,
votre limite hebdomadaire ou les deux.
```

Trois réinitialisations complètes étaient disponibles sur le compte de référence.

Nous avons utilisé celle dont l’expiration était la plus proche, sans acheter de crédits supplémentaires.

Après cette réinitialisation, le prompt :

```text
Analyse ce repository sans modifier aucun fichier.
```

a fonctionné.

Cette expérience fournit un bon arbre de diagnostic :

```text
Codex ne répond pas
    ↓
Le binaire se lance ?
    ├── non → installation / PATH
    └── oui
         ↓
Le repository est accessible ?
         ├── non → chemin / trust / permissions
         └── oui
              ↓
Message « Usage limit reached » ?
              ├── oui → quota / crédits / reset
              └── non → poursuivre le diagnostic technique
```

Ne pas réinstaller le CLI lorsqu’un message indique explicitement un problème de quota.

---

# 17. Modèles et affichage de session

Lors de la préparation, l’interface a affiché différents modèles/configurations au cours de la session.

Cela illustre une règle importante : **ne pas figer dans le support pédagogique un nom de modèle comme s’il définissait Codex CLI**.

Codex CLI est l’agent/l’interface ; le modèle disponible peut évoluer selon :

- le compte ;
- les politiques du produit ;
- la version ;
- les limites d’usage ;
- les réglages de session.

Avant une démonstration, noter le modèle réellement affiché par la session et le niveau d’effort sélectionné.

---

# 18. Git et revue humaine

Le workflow attendu dans cette formation reste :

```text
agent
  ↓
modifications
  ↓
git diff
  ↓
tests
  ↓
revue humaine
  ↓
commit / PR
```

Un message de succès de l’agent ne constitue pas une validation suffisante.

L’ingénieur doit pouvoir vérifier :

```bash
git status
git diff
```

et exécuter les tests du projet.

Pour le projet Python de la formation :

```bash
uv run pytest
uv run ruff check .
```

lorsque ces validations sont pertinentes pour la tâche.

---

# 19. Ce que l’agent doit respecter dans ce repository

Quel que soit l’agent utilisé, le comportement attendu est notamment :

- inspecter avant de modifier ;
- rester dans le périmètre de la tâche ;
- effectuer des changements petits et révisables ;
- ne pas modifier des fichiers sans rapport avec la demande ;
- préserver les tests existants ;
- ajouter ou mettre à jour les tests lorsqu’une modification le nécessite ;
- ne pas introduire de secret ;
- ne pas contourner les garde-fous uniquement pour faire passer une validation ;
- examiner les erreurs plutôt que les masquer ;
- laisser un diff compréhensible et vérifiable.

Ces principes sont plus durables que les options particulières d’un CLI.

---

# 20. Diagnostic rapide

## `codex: command not found`

Vérifier :

```bash
which codex
```

Si l’installation vient d’être effectuée, ouvrir éventuellement un nouveau terminal afin que l’environnement shell soit rechargé.

## Vérifier la version

```bash
codex --version
```

## Vérifier l’aide de la version courante

```bash
codex --help
```

## Le CLI démarre mais ne peut pas répondre

Lire le message exact. Si le message contient :

```text
Usage limit reached
```

le problème est lié à l’usage du compte, pas à l’installation du binaire.

## Repository inconnu

Ne pas répondre automatiquement « Yes » au dialogue de confiance. Inspecter le repository avant d’autoriser le chargement de sa configuration locale.

---

# 21. Checklist stagiaire

Avant les travaux pratiques :

```text
[ ] VS Code fonctionne
[ ] repository cloné
[ ] terminal ouvert à la racine du repository
[ ] codex --version fonctionne
[ ] which codex pointe vers l’installation attendue
[ ] Codex démarre
[ ] le repository est connu et peut être déclaré fiable
[ ] le compte dispose d’un quota utilisable
[ ] un prompt non destructif fonctionne
[ ] Git est propre avant le premier exercice
```

Commandes de contrôle :

```bash
codex --version
which codex
git status
```

Puis :

```bash
codex
```

Premier prompt :

```text
Analyse ce repository sans modifier aucun fichier.
```

---

# 22. Ce que le stagiaire doit retenir

L’installation de Codex CLI n’est que la première étape.

Les notions réellement importantes sont :

```text
Repository
   +
Contexte
   +
Instructions
   +
Agent
   +
Outils
   +
Permissions / sandbox
   +
Tests
   +
Git / diff
   +
Validation humaine
```

Le rôle de l’ingénieur évolue : il ne produit plus nécessairement chaque ligne manuellement, mais il doit être capable de **définir le problème, fournir le contexte, borner l’action, contrôler l’exécution et valider le résultat**.

C’est précisément ce que nous appelons ici **Agentic Software Engineering**.

---

# 23. Références officielles

Pour une formation, privilégier les sources officielles et les vérifier peu avant la session, car Codex CLI évolue rapidement :

- documentation Codex : <https://developers.openai.com/codex/>
- dépôt officiel OpenAI Codex : <https://github.com/openai/codex>
- tarification et limites : <https://developers.openai.com/codex/pricing>

La version, les modèles disponibles, les modes de permissions et les limites d’usage doivent être revérifiés avant chaque session de formation.
