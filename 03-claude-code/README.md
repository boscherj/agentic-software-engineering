# 03 — Claude Code

## Objectif
Comprendre et pratiquer un agent de développement opérant directement depuis le terminal.

## Thèmes
- lancement depuis un repository ;
- exploration du code ;
- planification ;
- modifications multi-fichiers ;
- exécution de commandes ;
- tests et corrections ;
- permissions et contrôle humain.

## TP
Confier à Claude Code une tâche complète du projet fil rouge, puis analyser son processus et son diff.


## Laboratoire guidé — Claude Code dans le terminal

Ce laboratoire reprend le petit module de calcul déjà présent dans le dépôt.
L'objectif n'est pas de démontrer une fonctionnalité Python complexe, mais de
suivre une tâche entière confiée à **Claude Code** depuis le terminal : analyse,
modification limitée, contrôles, branche, pull request, revue humaine, fusion
et nettoyage.

Le changement retenu est l'ajout d'un test de bord : vérifier que
`est_multiple_de_trois(-4)` retourne `False`. Le code de production était déjà
correct ; cette tâche renforce la couverture du comportement négatif qui donne
un résultat faux.

### Résultat final observé

| Élément | Résultat |
| --- | --- |
| Agent | Claude Code `v2.1.273`, modèle Opus 5 |
| Interface | Terminal, à la racine du dépôt |
| Mode | `manual mode on` |
| Branche | `test/multiple-negatif-non-multiple` |
| Commit | `Test negative non-multiple of three` |
| Fichier modifié | `tests/test_calcul.py` uniquement |
| Modification | Un test ajouté (+4 lignes) |
| Tests locaux | 13 tests pytest réussis |
| Analyse statique | `uv run ruff check .` réussi |
| PR | [PR n°11](https://github.com/boscherj/agentic-software-engineering/pull/11) |
| Fusion | manuelle dans GitHub |
| Commit de fusion | `17678d750453b5dc5c1f2daf6b7c37b22524668d` |

### Claude Code : ce qui change par rapport à VS Code

Claude Code est un client agent qui s'exécute dans le terminal. Il travaille
dans le répertoire depuis lequel il est lancé. Il peut lire les fichiers,
proposer un plan, modifier le dépôt et appeler des outils, selon le mandat et
les autorisations accordées.

| Question | Copilot Agent Mode dans VS Code | Claude Code |
| --- | --- | --- |
| Interface principale | panneau Chat de VS Code | terminal conversationnel |
| Diff local | Source Control et éditeur | commandes Git et fichiers du dépôt |
| Autorisations | dialogues VS Code/Copilot | demandes dans la session terminal |
| Répertoire de travail | workspace ouvert par VS Code | dossier courant au lancement |
| PR et CI | GitHub | GitHub |
| Décision de fusion | humaine | humaine |

Le changement d'interface ne change pas les garde-fous : `AGENTS.md`, un mandat
limité, les tests, Git, la pull request et GitHub Actions restent les éléments
de contrôle. Voir le [module 2](../02-copilot-agent-mode/README.md) pour la
même progression réalisée avec Copilot dans VS Code.

### 1. Démarrer dans le bon dépôt

Claude Code a été lancé à la racine de
`~/Dev/agentic-software-engineering`. Avant de confier une tâche, la branche
locale a été synchronisée :

```bash
git switch main
git pull --ff-only origin main
git status -sb
```

Le but est d'éviter de partir d'une branche ancienne ou d'un répertoire qui
contiendrait des modifications oubliées. `--ff-only` refuse de créer une fusion
locale implicite : si Git ne peut pas avancer proprement, il s'arrête et
demande une décision humaine.

L'écran initial affichait `manual mode on`. Ce réglage est approprié à un
laboratoire : Claude ne doit pas obtenir une autonomie silencieuse pour des
actions sensibles.

### 2. Niveau 1 — observation sans action

Le premier mandat demandait à Claude de lire seulement :

- `AGENTS.md` ;
- `src/agentic_software_engineering/calcul.py` ;
- `tests/test_calcul.py`.

Puis il devait expliquer les fonctions, les comportements déjà testés, une
petite amélioration possible et les règles du dépôt applicables. Il lui était
interdit d'écrire un fichier, de lancer des tests, d'utiliser Git ou de créer
une PR.

Cette étape a produit les constats suivants :

- `additionner(a, b)` retourne la somme de deux entiers ;
- `est_pair(nombre)` teste la divisibilité par deux ;
- `est_multiple_de_trois(nombre)` teste la divisibilité par trois ;
- les douze tests couvraient déjà les cas positifs, zéro et les cas négatifs
  donnant `True` ;
- le cas négatif donnant `False` pour les multiples de trois n'était pas
  couvert.

Claude a proposé `est_multiple_de_trois(-4) is False`. C'est une amélioration
petite mais utile : le modulo de Python pour un entier négatif peut surprendre
et une réécriture maladroite pourrait casser ce cas tout en laissant les tests
existants verts.

Un agent ne doit pas prétendre connaître un fichier qu'il n'a pas lu. Lorsque
la lecture était interdite par une première formulation, Claude a demandé
l'accès aux fichiers au lieu d'inventer une réponse. Cette prudence est le
résultat attendu au niveau 1.

### 3. Niveau 2 — modifier un seul fichier et vérifier

Après validation humaine de la proposition, le mandat autorisait uniquement :

```text
Ajoute dans tests/test_calcul.py un test vérifiant :
est_multiple_de_trois(-4) is False.

Tu peux modifier uniquement ce fichier et exécuter :
uv run pytest
uv run ruff check .

Ne modifie pas calcul.py. Ne crée ni branche, ni commit, ni push, ni PR.
```

Claude a ajouté le test suivant dans le fichier de tests :

```python
def test_est_multiple_de_trois_retourne_faux_pour_un_negatif_non_multiple() -> None:
    assert est_multiple_de_trois(-4) is False
```

Il a ensuite rapporté :

```text
uv run pytest        → 13 tests réussis, 0 échec
uv run ruff check .  → All checks passed!
```

| Limite | Effet |
| --- | --- |
| `tests/test_calcul.py` seul | aucun comportement de production n'est modifié |
| pas de Git | le changement reste local et réversible |
| pytest + Ruff | le nouveau test est exécutable et le projet respecte les règles configurées |
| compte rendu final | l'humain sait ce qui a été fait avant de poursuivre |

### 4. Revoir l'arbre de travail et l'index Git

Avant de créer un commit, Claude a reçu l'autorisation d'exécuter seulement :

```bash
git status --short
git diff -- tests/test_calcul.py
git diff --cached
```

Cette revue distingue deux zones Git qui ne doivent jamais être confondues :

| Zone | Ce qu'elle contient | Vérification |
| --- | --- | --- |
| Arbre de travail / **Changes** | modifications non indexées | `git status --short` et `git diff` |
| Index / **Staged Changes** | contenu exact du prochain commit | `git diff --cached` |

Le résultat a montré un seul fichier modifié dans l'arbre de travail et un
index vide. Cette dernière vérification est essentielle : ajouter un fichier à
l'index ne retire pas un fichier qui y était déjà. Sans `git diff --cached`,
un commit pourrait embarquer une configuration locale ou un secret déjà indexé
par erreur.

### 5. Niveau 3 — proposer une PR sans la fusionner

Après revue humaine du diff et de l'index vide, Claude a reçu le mandat de :

1. créer `test/multiple-negatif-non-multiple` ;
2. ajouter uniquement `tests/test_calcul.py` à l'index ;
3. revoir le diff indexé ;
4. créer le commit `Test negative non-multiple of three` ;
5. pousser la branche ;
6. créer une PR vers `main` ;
7. s'arrêter sans fusionner.

Le commit comporte aussi le pied :

```text
Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
```

Ce pied attribue la contribution à l'agent. Il ne modifie ni le titre du
commit, ni les fichiers, ni son périmètre. Il ne fallait donc pas réécrire le
commit ni réaliser un force-push seulement pour supprimer cette attribution.

La PR n°11 confirme, côté GitHub, que le résultat publié correspondait au
résultat local : une branche source, un seul commit, `tests/test_calcul.py`
seul et quatre lignes ajoutées.

### 6. CI, revue et fusion

GitHub Actions a exécuté le check `Vérifier le code Python`. Deux checks verts
peuvent apparaître, car le workflow est déclenché par le push de la branche et
par la pull request. Ces contrôles s'exécutent sur une machine GitHub
indépendante du Mac et de Claude Code.

Avant la fusion, la revue a vérifié :

- la branche source et la cible `main` ;
- le titre et le contenu du commit ;
- le seul fichier modifié ;
- le test `-4 → False` ;
- les checks terminés et réussis ;
- l'absence de fusion exécutée par l'agent.

La fusion a ensuite été explicitement demandée et réalisée dans GitHub. Claude
n'a jamais reçu le droit de décider seul de cette intégration.

### 7. Synchroniser après fusion et nettoyer les branches

Une PR fusionnée modifie GitHub, mais pas automatiquement le clone du Mac.
Claude a donc été chargé, sans écrire de fichier, de récupérer les références,
de revenir sur `main`, de l'avancer vers `origin/main` et de vérifier que le
répertoire était propre.

La branche locale `test/multiple-negatif-non-multiple` a ensuite été supprimée
avec `git branch -d`. Cette forme est volontairement sûre : Git refuse la
suppression si le travail n'est pas fusionné. La branche distante a été
supprimée séparément après confirmation de la fusion ; la PR reste consultable
et son historique demeure dans `main`.

Enfin, une validation post-fusion a confirmé :

```text
uv run pytest        → 13 tests réussis
uv run ruff check .  → All checks passed!
```

### Ce que le laboratoire enseigne

Ce laboratoire ne prouve pas qu'un agent terminal est infaillible. Il démontre
un mode de délégation contrôlé :

```text
lecture autorisée → proposition → modification limitée → contrôles locaux
→ revue du diff et de l'index → branche et PR → CI distante
→ décision humaine → synchronisation et nettoyage
```

La règle essentielle reste : ne pas confondre la capacité technique d'un agent
avec l'autorisation de l'utiliser. Le mandat définit le périmètre ; les
permissions rendent les actions visibles ; Git et la PR tracent le changement ;
les tests et la CI apportent des preuves ; l'ingénieur conserve la décision.

## TP proposé

Reproduire le même cycle avec une autre amélioration de test à faible risque :

1. demander à Claude une analyse en lecture seule ;
2. choisir une amélioration proposée et écrire un mandat de niveau 2 ;
3. vérifier les tests, Ruff, le diff et l'index ;
4. demander une PR de niveau 3, sans fusion ;
5. revoir la PR et décider explicitement de sa fusion ;
6. synchroniser `main` et nettoyer les branches.
