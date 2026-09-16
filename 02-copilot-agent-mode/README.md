# 02 — GitHub Copilot et Agent Mode

## Objectif
Passer de l’assistance interactive à l’exécution agentique dans l’environnement de développement.

## Thèmes
- Copilot dans VS Code ;
- Agent Mode ;
- contexte du workspace ;
- instructions personnalisées ;
- outils et terminal ;
- délégation à partir d’une issue ;
- revue des changements.

## TP
Résoudre une évolution du projet fil rouge avec Copilot.


## Laboratoire guidé — une tâche complète avec Copilot dans VS Code

Ce laboratoire documente l'exercice réellement effectué dans ce dépôt. Copilot
a d'abord analysé le code, puis ajouté deux tests de bord pour `additionner`,
et enfin créé une proposition GitHub. La [PR n°9](https://github.com/boscherj/agentic-software-engineering/pull/9) a été relue puis fusionnée manuellement.

### Résultat contrôlé

| Élément | Valeur |
| --- | --- |
| Branche | `test/addition-cas-limites` |
| Commit | `Test addition edge cases` |
| Fichier | `tests/test_calcul.py` uniquement |
| Diff | Deux tests ajoutés ; pas de code de production |
| Contrôles locaux | 12 tests pytest et Ruff réussis |
| Contrôles distants | GitHub Actions `Vérifier le code Python` réussi |
| Fusion | réalisée par l'humain dans GitHub |

La fusion a produit le commit `169ed1541d509a02a8ab3fb682caaad6e43f7fe8`
dans `main`.

### 1. Ouvrir Copilot correctement

Dans VS Code, l'icône Copilot de la barre d'état indique que l'extension est
active. Pour ce laboratoire, il faut ensuite ouvrir **Chat** et sélectionner :

| Réglage | Choix | Effet |
| --- | --- | --- |
| Mode | **Agent** | Copilot peut explorer le workspace, proposer des modifications et demander des actions. |
| Modèle | **Auto** | Copilot sélectionne un modèle adapté à la demande. |

`Auto` ne donne pas le droit d'écrire, de committer ou de pousser sans
contrôle. Chaque action sensible peut déclencher une demande d'autorisation.
Conserver ces confirmations est conseillé pendant l'apprentissage.

### 2. Niveau 1 : analyser sans modifier

La première demande ne devait ni modifier le dépôt, ni lancer une commande,
ni créer d'objet Git. Elle autorisait uniquement la lecture de `AGENTS.md`,
du module de calcul et de ses tests.

L'agent devait répondre à trois questions :

1. quelles fonctions existent dans `calcul.py` ;
2. quels comportements sont déjà testés ;
3. quelle petite amélioration de test proposer.

Une formulation qui interdit aussi la lecture des fichiers conduit
logiquement Copilot à répondre qu'il ne peut pas confirmer leur contenu. Ce
n'est pas un échec : c'est le comportement attendu d'un agent qui ne doit pas
inventer ce qu'il n'a pas observé.

Après lecture autorisée, Copilot a identifié `additionner`, `est_pair` et
`est_multiple_de_trois`. Il a proposé deux cas de bord pour l'addition :
zéro plus un entier, puis deux entiers négatifs.

### 3. Niveau 2 : modifier et vérifier localement

Après validation humaine de l'analyse, le mandat était limité à :

```text
Ajoute uniquement deux tests dans tests/test_calcul.py :
- additionner(0, 5) doit retourner 5 ;
- additionner(-2, -3) doit retourner -5.

Tu peux modifier uniquement ce fichier et exécuter :
uv run pytest
uv run ruff check .

Ne modifie pas le code de production.
Ne crée ni branche, ni commit, ni push, ni pull request.
```

Le résultat rapporté était :

```text
uv run pytest        → 12 tests réussis
uv run ruff check .  → All checks passed!
```

| Limite donnée à l'agent | Pourquoi elle compte |
| --- | --- |
| un seul fichier | le diff reste prévisible et facile à relire |
| aucun code de production | le comportement métier ne change pas |
| commandes explicites | les preuves locales sont connues à l'avance |
| aucune action Git/GitHub | l'humain peut contrôler le diff avant publication |

Les tests et Ruff sont des preuves utiles, pas une dispense de revue. Ils
disent que les contrôles configurés passent ; ils ne disent pas à eux seuls que
le périmètre du mandat est respecté.

### 4. Vérifier le diff dans Source Control

Avant d'augmenter l'autonomie, ouvrir **Source Control** dans la barre
latérale de VS Code. La revue locale doit confirmer :

1. que **Changes** contient seulement `tests/test_calcul.py` ;
2. que le diff contient les deux tests annoncés, et rien d'autre ;
3. que les assertions sont exactement `additionner(0, 5) == 5` et
   `additionner(-2, -3) == -5`.

Le compte rendu de Copilot aide à se repérer. Le diff, lui, est la preuve de ce
qui pourrait entrer dans un commit.

### 5. Niveau 3 : créer une proposition, sans fusionner

Une fois le diff approuvé, l'agent a reçu ce mandat :

```text
Le diff de tests/test_calcul.py a été vérifié et approuvé.

Crée la branche test/addition-cas-limites.
Ajoute uniquement tests/test_calcul.py à l'index.
Crée le commit exact : Test addition edge cases.
Pousse la branche, puis crée une pull request vers main.

Ne modifie aucun autre fichier. Ne fusionne pas la pull request.
```

L'**index Git** est la liste exacte des fichiers qui seront inclus dans le
prochain commit. Demander d'ajouter un seul fichier à l'index évite
d'embarquer une configuration locale ou un changement non relu.

Cette précaution ne suffit toutefois que si l'index était vide au départ.
Ajouter `tests/test_calcul.py` ne retire pas un fichier déjà présent dans
l'index : un commit enregistre **tous** les fichiers de la zone *Staged
Changes*. Juste avant le commit, il faut donc vérifier que cette zone contient
uniquement le fichier autorisé, en plus de vérifier la zone **Changes**.

Dans un terminal, la même revue s'obtient avec :

```bash
git diff --cached
```

Cette commande montre le diff qui entrera réellement dans le commit. Elle est
plus fiable qu'une vérification limitée aux seules modifications non ajoutées
à l'index, notamment si le poste contient une configuration locale ou un
secret potentiel.

À ce niveau, les autorisations se lisent à la lumière du mandat :

| Demande de Copilot | Décision |
| --- | --- |
| Lire les fichiers autorisés | autoriser |
| Modifier le fichier de test autorisé | autoriser |
| Lancer pytest et Ruff | autoriser |
| Créer branche, commit, push et PR | autoriser après revue du diff |
| Fusionner une PR | refuser : décision humaine |
| Ajouter un fichier hors périmètre | refuser |

Une action peut être appropriée au niveau 3 et interdite au niveau 1 ou 2.
L'autonomie ne se déduit pas de l'outil : elle est accordée dans le mandat.

### 6. Revoir la pull request sur GitHub

Une PR est hébergée par GitHub ; elle compare les commits de la branche source
avec la branche cible. Elle ne copie pas les fichiers du Mac et ne remplace pas
la CI.

Pour la PR n°9, les points de contrôle étaient :

1. source : `test/addition-cas-limites` ;
2. cible : `main` ;
3. un seul commit, au message attendu ;
4. un seul fichier changé ;
5. seulement les deux tests demandés ;
6. checks terminés et verts ;
7. aucune fusion exécutée par l'agent.

| Onglet GitHub | Rôle |
| --- | --- |
| **Conversation** | objectif, commentaires et décision de fusion |
| **Commits** | objets Git apportés par la branche |
| **Files changed** | diff ligne par ligne |
| **Checks** | résultat et journaux de la CI |

Deux checks verts peuvent être visibles : le workflow est susceptible de se
déclencher au push de branche puis lors de l'ouverture ou de la mise à jour de
la PR. Ce sont deux exécutions automatiques, pas deux validations humaines.

### 7. Niveau 4 : l'humain décide de la fusion

La fusion a été effectuée manuellement dans GitHub seulement après la revue du
diff et des checks. Une CI verte répond à « les contrôles configurés ont-ils
réussi ? ». Elle ne répond pas seule à « est-ce le bon changement métier ? »
ni à « voulons-nous l'intégrer maintenant ? ».

Le rôle correct de l'agent est donc de préparer une proposition vérifiable. Le
rôle de l'ingénieur est de décider si cette proposition entre dans `main`.

### 8. Après fusion : synchronisation et incident utile

Fusionner dans GitHub ne met pas automatiquement à jour le clone sur le Mac.
Il faut revenir sur `main`, récupérer l'état distant, puis vérifier que le
répertoire de travail est propre. La branche locale de travail ne doit être
supprimée qu'après confirmation de son intégration.

Pendant l'exercice, un commit local accidentel a été créé :

```text
75a429c Exercice des tests pour le module de calcul
```

Il contenait uniquement `.mcp.json`, une configuration locale. Git affichait
alors `main...origin/main [ahead 1]` : le clone possédait un commit absent de
GitHub. Il ne fallait donc pas pousser ; il fallait inspecter ce commit.

Le commit non poussé a été retiré en conservant le fichier sur le Mac.
`.mcp.json` a ensuite été ajouté à `.git/info/exclude`, qui ignore un fichier
uniquement pour ce clone Git. À la différence de `.gitignore`, cette exclusion
n'est ni commitée ni partagée.

### Checklist

Avant l'agent :

- définir résultat, périmètre, contrôles et niveau d'autonomie ;
- interdire explicitement la fusion si elle n'est pas demandée.

Avant publication :

- relire le diff dans Source Control ;
- vérifier les fichiers modifiés ;
- lire chaque autorisation ;
- confirmer les contrôles locaux.

Dans GitHub :

- vérifier source, cible, commits et **Files changed** ;
- attendre des checks terminés et réussis ;
- fusionner seulement après décision humaine.

Après la fusion :

- synchroniser `main` ;
- vérifier un répertoire propre ;
- supprimer la branche locale seulement après intégration ;
- isoler les configurations de poste hors de Git.
