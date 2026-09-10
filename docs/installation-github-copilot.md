# Installation et validation de GitHub Copilot dans VS Code

Ce document décrit la procédure réellement suivie et validée pour préparer GitHub Copilot dans l’environnement de formation **Agentic Software Engineering**.

> Dans notre cas, GitHub Copilot était déjà présent dans VS Code. La procédure a donc surtout consisté à **démontrer sa présence, vérifier son état et valider le mode Agent**, plutôt qu’à effectuer une nouvelle installation.

## 1. Prérequis

Avant cette vérification :

- Visual Studio Code Stable est installé ;
- le repository `boscherj/agentic-software-engineering` est cloné et ouvert dans VS Code ;
- un compte GitHub disposant de GitHub Copilot est disponible.

Environnement validé pendant la préparation :

- VS Code : **1.136.x Stable** ;
- macOS Apple Silicon ;
- repository : `boscherj/agentic-software-engineering`.

## 2. Rechercher GitHub Copilot dans les extensions

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

## 3. Vérifier que Copilot est chargé

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

## 4. Vérifier l’état de Copilot

Dans la palette de commandes, exécuter :

```text
GitHub Copilot: Open Status Menu
```

Dans l’environnement validé, le résultat obtenu est :

```text
Status = Ready
```

Cela constitue notre vérification opérationnelle : Copilot est disponible dans VS Code et prêt à être utilisé.

## 5. Vérifier Copilot Chat

Ouvrir Copilot Chat depuis VS Code.

On peut notamment utiliser la palette de commandes et rechercher :

```text
Chat: Open Chat
```

Vérifier que le panneau de conversation Copilot s’ouvre correctement.

## 6. Vérifier la présence du mode Agent

Dans Copilot Chat, vérifier les modes proposés dans l’interface.

Dans notre installation, **Agent** est disponible.

Cette vérification est essentielle pour la formation, car le mode Agent permet de dépasser la simple génération ou complétion de code. L’agent peut travailler à l’échelle du repository et, selon les permissions et outils disponibles, explorer les fichiers, proposer ou réaliser des modifications et utiliser les outils de développement.

## 7. Test de compréhension du repository

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

## 8. Pourquoi ce test est important pédagogiquement

Cette vérification introduit déjà une notion centrale de l’**Agentic Software Engineering** : un agent de développement ne travaille pas uniquement à partir du prompt courant.

Son comportement dépend également du contexte disponible dans le repository, notamment :

- le code ;
- la documentation ;
- la structure du projet ;
- les conventions ;
- les tests ;
- les instructions persistantes comme `AGENTS.md`.

Le repository devient donc une partie du **contexte de travail de l’agent**.

## 9. État attendu avant de poursuivre

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

## 10. Cas où Copilot n’est pas déjà présent

Si `GitHub Copilot Chat` n’apparaît pas comme installé dans la vue Extensions, rechercher l’extension officielle publiée par **GitHub** et procéder à son installation, puis se connecter au compte GitHub autorisé à utiliser Copilot.

Après installation, reprendre les vérifications de ce document à partir de la palette de commandes et du **Status Menu**.

> Pour une formation, il est préférable de valider cette installation sur les machines des participants avant de commencer les exercices agentiques.
