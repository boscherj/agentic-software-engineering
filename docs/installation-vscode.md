# Installation et configuration de Visual Studio Code

> Environnement de référence de la formation **Agentic Software Engineering** — 10 septembre 2026

## 1. Version retenue

Pour la préparation actuelle de la formation, la version de référence est :

```text
Visual Studio Code 1.136.x Stable
```

La version minimale recommandée est **1.136**.

Microsoft a annoncé VS Code 1.137 le 9 septembre 2026, mais son déploiement sur le canal Stable est progressif. Au 10 septembre, la page de téléchargement Stable peut encore fournir VS Code 1.136.x selon le point de distribution.

**Il ne faut donc pas forcer l’installation de VS Code 1.137.**

Pour une formation professionnelle, nous privilégions une version Stable réellement disponible et reproductible sur l’ensemble des postes plutôt qu’une version tout juste publiée ou une version Insiders.

Références :

- https://code.visualstudio.com/download
- https://code.visualstudio.com/updates/v1_136
- https://code.visualstudio.com/updates/v1_137

---

## 2. Pourquoi VS Code ?

VS Code constitue le **poste de pilotage principal** de la formation.

L’objectif n’est plus seulement d’utiliser un éditeur qui propose de la complétion de code. VS Code permet de réunir dans un même environnement :

```text
VS Code
  ├── code source
  ├── terminal
  ├── Git
  ├── GitHub
  ├── GitHub Copilot
  ├── agents
  ├── tests
  └── inspection des modifications
```

Cette architecture est particulièrement adaptée à l’Agentic Software Engineering : l’ingénieur conserve un environnement central depuis lequel il peut observer et contrôler le travail réalisé par différents agents.

Nous utiliserons notamment VS Code pour :

- ouvrir et explorer le repository ;
- modifier manuellement le code lorsque nécessaire ;
- utiliser Git et visualiser les diffs ;
- exécuter les commandes dans le terminal intégré ;
- utiliser GitHub Copilot ;
- lancer Claude Code et Codex depuis le terminal ;
- exécuter les tests ;
- examiner les modifications réalisées par les agents ;
- travailler avec des branches et des worktrees.

---

## 3. Stable plutôt qu’Insiders

VS Code existe principalement sous deux canaux :

- **Stable** : version destinée à l’utilisation courante ;
- **Insiders** : version de développement donnant accès plus rapidement aux nouveautés.

Pour la formation, nous utiliserons exclusivement **Stable**.

Les fonctions agentiques évoluent très rapidement. Utiliser Insiders rendrait les exercices moins reproductibles et pourrait introduire des différences d’interface ou de comportement entre les participants.

---

# Installation sur macOS

## 4. Identifier l’architecture du Mac

Sur les Mac récents équipés de processeurs Apple Silicon (M1, M2, M3, M4, etc.), l’architecture est :

```text
arm64
```

Elle peut être vérifiée depuis le Terminal :

```bash
uname -m
```

Résultat attendu sur Apple Silicon :

```text
arm64
```

VS Code propose des distributions adaptées à macOS, dont Apple Silicon et Universal.

Pour un Mac Apple Silicon, privilégier la distribution **Apple Silicon** lorsqu’elle est proposée.

---

## 5. Télécharger VS Code

Utiliser exclusivement le site officiel :

https://code.visualstudio.com/download

Choisir :

```text
macOS
Stable
Apple Silicon
```

Si Microsoft propose encore **1.136.x Stable**, c’est actuellement normal : ne pas chercher une version 1.137 sur un site tiers.

---

## 6. Installation initiale

1. Télécharger VS Code depuis le site officiel.
2. Ouvrir l’archive téléchargée si nécessaire.
3. Déplacer `Visual Studio Code.app` dans :

```text
/Applications
```

4. Lancer Visual Studio Code.

macOS peut demander une confirmation lors du premier lancement d’une application téléchargée depuis Internet.

---

# Mise à jour d’une installation existante

## 7. Mise à jour automatique

Dans VS Code :

```text
Code → Check for Updates…
```

Le réglage :

```text
Update: Mode
```

doit normalement être positionné sur :

```text
default
```

Dans `settings.json`, cela correspond éventuellement à :

```json
"update.mode": "default"
```

---

## 8. Si la mise à jour est grisée ou indisponible

Il peut arriver que le menu de mise à jour soit grisé alors que `Update: Mode` vaut bien `default`.

Dans ce cas, il n’est pas nécessaire de désinstaller VS Code ni de supprimer sa configuration.

Procédure recommandée :

1. télécharger la dernière version **Stable** depuis le site officiel ;
2. quitter complètement VS Code avec `Cmd + Q` ;
3. ouvrir le téléchargement ;
4. déplacer la nouvelle application dans `/Applications` ;
5. lorsque macOS demande quoi faire avec l’application existante, choisir **Remplacer** ;
6. relancer VS Code.

Les réglages utilisateur et les extensions sont stockés séparément de l’application et ne doivent pas être supprimés lors de cette opération.

---

# Vérification

## 9. Vérifier la version installée

Dans VS Code :

```text
Code → About Visual Studio Code
```

Pour la configuration actuelle de la formation, le numéro doit commencer par :

```text
Version: 1.136
```

On peut également utiliser le terminal si la commande `code` est disponible :

```bash
code --version
```

---

## 10. Installer la commande `code` dans le PATH

Cette commande sera utile pendant la formation.

Dans VS Code :

1. ouvrir la palette de commandes avec `Cmd + Shift + P` ;
2. rechercher :

```text
Shell Command: Install 'code' command in PATH
```

3. exécuter la commande ;
4. ouvrir un nouveau terminal ;
5. vérifier :

```bash
code --version
```

La commande permet notamment d’ouvrir le dossier courant avec :

```bash
code .
```

---

# Configuration recommandée pour la formation

## 11. Mises à jour

Le réglage doit rester :

```text
Update: Mode = default
```

Cependant, à l’approche d’une session de formation, l’équipe pédagogique vérifiera la version Stable utilisée avant de demander aux participants de mettre leur installation à jour.

L’objectif est d’éviter qu’une mise à jour majeure publiée juste avant une formation modifie l’interface ou le comportement d’un exercice.

---

## 12. Vérification avant formation

Avant de passer aux extensions et aux agents, vérifier les points suivants :

```text
[ ] VS Code Stable est installé
[ ] version >= 1.136
[ ] l’application se trouve dans /Applications
[ ] Update: Mode = default
[ ] la commande `code` fonctionne dans le terminal
[ ] `code --version` retourne la version attendue
```

---

# À retenir

Pour cette formation, VS Code n’est pas seulement notre éditeur de code.

Il constitue le **poste de contrôle de l’ingénieur** :

```text
                 ┌─ GitHub Copilot
                 │
Ingénieur → VS Code ─┼─ Claude Code
                 │
                 ├─ Codex
                 │
                 ├─ Git / GitHub
                 │
                 └─ tests / terminal / diff
```

La suite de la configuration consistera à installer et vérifier les différents composants qui viennent se connecter à ce poste de pilotage.
