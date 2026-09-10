# Installation et validation de GitHub Copilot dans VS Code

Ce document décrit la procédure réellement suivie et validée pour préparer GitHub Copilot dans l’environnement de formation **Agentic Software Engineering**.

> Dans notre cas, GitHub Copilot était déjà présent dans VS Code. La procédure a donc surtout consisté à **démontrer sa présence, vérifier son état et valider le mode Agent**, plutôt qu’à effectuer une nouvelle installation.

## 1. À quoi sert GitHub Copilot ?

**GitHub Copilot est un assistant de développement logiciel basé sur l’IA, intégré notamment à Visual Studio Code.** Il accompagne le développeur directement dans son environnement de travail et peut intervenir à plusieurs niveaux, depuis l’assistance à l’écriture d’une ligne de code jusqu’à l’exécution de tâches de développement plus complètes en mode agentique.

Dans une utilisation classique, Copilot peut notamment :

- proposer des **complétions de code** pendant la saisie ;
- générer des fonctions, classes, tests ou documentation à partir d’instructions en langage naturel ;
- expliquer du code existant ;
- répondre à des questions sur le projet ;
- aider à rechercher et corriger des erreurs ;
- proposer des refactorings ;
- générer ou modifier plusieurs fichiers.

### Copilot Chat

**Copilot Chat** ajoute une interface conversationnelle dans VS Code. Au lieu de demander uniquement une complétion à l’endroit où se trouve le curseur, le développeur peut dialoguer avec Copilot en langage naturel :

```text
Explique cette fonction.
```

```text
Où est gérée l'authentification dans ce projet ?
```

```text
Écris les tests manquants pour ce module.
```

Le point important est que Copilot peut utiliser le **contexte du workspace** : fichiers du repository, code, documentation, tests et instructions du projet.

### Du copilote à l’agent

Pour cette formation, la fonction la plus importante est le **mode Agent**.

Avec une assistance traditionnelle, le fonctionnement est principalement :

```text
Développeur → demande → suggestion de code → développeur
```

En mode Agent, le workflow devient davantage :

```text
Développeur
    ↓
objectif / tâche
    ↓
Copilot Agent
    ├── explore le repository
    ├── recherche les fichiers concernés
    ├── comprend les instructions du projet
    ├── planifie les changements
    ├── modifie un ou plusieurs fichiers
    ├── utilise les outils disponibles
    ├── peut lancer des commandes et des tests
    ├── observe les résultats
    └── corrige si nécessaire
    ↓
Développeur : contrôle et revue du résultat
```

Cette évolution est centrale dans l’**Agentic Software Engineering** : le développeur ne demande plus seulement à l’IA de produire un fragment de code. Il peut lui déléguer une **tâche de développement avec un objectif**, tout en conservant le contrôle sur le contexte, les permissions, les changements produits, les tests et l’intégration finale.

### Ce que Copilot ne remplace pas

L’utilisation d’un agent ne supprime pas le travail d’ingénierie. Le développeur reste responsable notamment :

- de la formulation du besoin ;
- de l’architecture et des contraintes ;
- du contexte donné à l’agent ;
- des permissions accordées ;
- de la qualité des tests ;
- de la revue du diff ;
- de la sécurité ;
- de la décision d’intégrer ou non les changements.

C’est précisément cette articulation entre **délégation à l’agent** et **contrôle d’ingénierie** qui sera étudiée dans le module `02-copilot-agent-mode`.

## 2. Prérequis

Avant cette vérification :

- Visual Studio Code Stable est installé ;
- le repository `boscherj/agentic-software-engineering` est cloné et ouvert dans VS Code ;
- un compte GitHub disposant de GitHub Copilot est disponible.

Environnement validé pendant la préparation :

- VS Code : **1.136.x Stable** ;
- macOS Apple Silicon ;
- repository : `boscherj/agentic-software-engineering`.

## 3. Rechercher GitHub Copilot dans les extensions

Ouvrir la vue **Extensions** :

```text
Cmd + Shift + X
```

Rechercher :

```text
GitHub Copilot
```

Dans l’environnement testé, l’extension visible est :

```text
GitHub Copilot Chat
Éditeur : GitHub
```

Aucun bouton **Install** n’était proposé : l’extension était donc déjà installée.

## 4. Vérifier que Copilot est chargé

Ouvrir la palette de commandes :

```text
Cmd + Shift + P
```

Puis rechercher :

```text
GitHub Copilot
```

La présence de commandes telles que :

```text
GitHub Copilot: Open Status Menu
GitHub Copilot: Enable Inline Suggestions
GitHub Copilot: Open Completions Panel
```

confirme que les fonctionnalités Copilot sont chargées dans VS Code.

## 5. Vérifier l’état de Copilot

Dans la palette de commandes, exécuter :

```text
GitHub Copilot: Open Status Menu
```

Dans l’environnement validé, le résultat obtenu est :

```text
Status = Ready
```

Cela constitue notre vérification opérationnelle : Copilot est disponible dans VS Code et prêt à être utilisé.

## 6. Vérifier Copilot Chat

Ouvrir Copilot Chat depuis VS Code.

On peut notamment utiliser la palette de commandes et rechercher :

```text
Chat: Open Chat
```

Vérifier que le panneau de conversation Copilot s’ouvre correctement.

## 7. Vérifier la présence du mode Agent

Dans Copilot Chat, vérifier les modes proposés dans l’interface.

Dans notre installation, **Agent** est disponible.

Cette vérification est essentielle pour la formation, car le mode Agent permet de dépasser la simple génération ou complétion de code. L’agent peut travailler à l’échelle du repository et, selon les permissions et outils disponibles, explorer les fichiers, proposer ou réaliser des modifications et utiliser les outils de développement.

## 8. Test de compréhension du repository

Avant d’autoriser une modification, nous avons effectué un premier test volontairement sans écriture.

Dans Copilot Chat, sélectionner **Agent**, puis utiliser le prompt :

```text
Analyse ce repository sans modifier aucun fichier. Explique-moi son objectif,
sa structure, le rôle de AGENTS.md et les règles que tu devras respecter si
je te demande ensuite de modifier le projet.
```

L’objectif est de vérifier que l’agent :

1. explore le repository ;
2. comprend son objectif pédagogique ;
3. identifie `AGENTS.md` ;
4. comprend que ce fichier définit des règles à respecter pour ses futures interventions ;
5. ne modifie aucun fichier pendant cette phase d’observation.

Lors de notre validation, Copilot a notamment conclu que le repository était un terrain d’apprentissage pour comparer les usages agentiques du développement logiciel et que `AGENTS.md` jouait le rôle de garde-fou imposant les bonnes pratiques de contribution et de validation.

Le test est donc considéré comme concluant.

## 9. Pourquoi ce test est important pédagogiquement

Cette vérification introduit déjà une notion centrale de l’**Agentic Software Engineering** : un agent de développement ne travaille pas uniquement à partir du prompt courant.

Son comportement dépend également du contexte disponible dans le repository, notamment :

- le code ;
- la documentation ;
- la structure du projet ;
- les conventions ;
- les tests ;
- les instructions persistantes comme `AGENTS.md`.

Le repository devient donc une partie du **contexte de travail de l’agent**.

## 10. État attendu avant de poursuivre

Checklist de validation :

- [ ] VS Code Stable est installé et le repository est ouvert ;
- [ ] `GitHub Copilot Chat` par GitHub est présent ;
- [ ] les commandes `GitHub Copilot` apparaissent dans la palette de commandes ;
- [ ] `GitHub Copilot: Open Status Menu` indique `Ready` ;
- [ ] Copilot Chat s’ouvre ;
- [ ] le mode `Agent` est disponible ;
- [ ] l’agent peut analyser le repository sans le modifier ;
- [ ] l’agent identifie et comprend le rôle de `AGENTS.md`.

Une fois ces points validés, l’environnement Copilot est prêt pour les futurs travaux pratiques du module **02 — GitHub Copilot et Agent Mode**.

## 11. Cas où Copilot n’est pas déjà présent

Si `GitHub Copilot Chat` n’apparaît pas comme installé dans la vue Extensions, rechercher l’extension officielle publiée par **GitHub** et procéder à son installation, puis se connecter au compte GitHub autorisé à utiliser Copilot.

Après installation, reprendre les vérifications de ce document à partir de la palette de commandes et du **Status Menu**.

> Pour une formation, il est préférable de valider cette installation sur les machines des participants avant de commencer les exercices agentiques.
