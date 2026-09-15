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

## Pull request : faire vérifier un changement avant `main`

Une pull request (PR) est une proposition de fusion d'une branche vers une
autre. Elle évite d'envoyer directement une modification dans `main`, la
version de référence du dépôt.

Le parcours utilisé pour ce dépôt est le suivant :

```text
main
  ↓
branche isolée
  ↓
modification + tests locaux
  ↓
commit + envoi vers GitHub
  ↓
pull request + CI GitHub
  ↓
revue du diff
  ↓
fusion explicite dans main
```

Cette séparation est particulièrement utile avec un agent : il peut proposer
une modification et ses preuves de validation, mais la fusion reste une
décision visible et réversible de l'équipe.

### 1. Vérifier le point de départ

Avant de créer une branche, on inspecte le répertoire de travail :

```bash
git status --short
```

Cette commande liste les fichiers modifiés ou non suivis. Il faut comprendre
chaque ligne avant de continuer. Dans cet exercice, `.mcp.json` était déjà un
fichier local non suivi ; il ne faisait pas partie de la modification et n'a
donc jamais été ajouté au commit.

### 2. Créer une branche isolée

```bash
git switch -c test/addition-negative-integers
```

`git switch` change de branche. L'option `-c` signifie *create* : Git crée la
branche si elle n'existe pas encore, puis s'y place immédiatement.

Le nom de branche indique le type de changement (`test`) et son objectif
(`addition-negative-integers`). À ce moment, `main` ne bouge pas : tous les
commits suivants restent isolés sur cette branche jusqu'à une éventuelle fusion.

### 3. Modifier le code ou les tests

La modification choisie est volontairement petite : ajouter le test suivant
dans `tests/test_calcul.py`.

```python
def test_additionner_gere_les_nombres_negatifs() -> None:
    assert additionner(-2, 3) == 1
```

Le test affirme un comportement : une addition doit accepter des entiers
négatifs. Il n'implémente pas le comportement ; il le décrit sous une forme
exécutable. Si une modification ultérieure cassait ce cas, pytest le
signalerait.

### 4. Vérifier localement avant GitHub

```bash
uv run pytest
uv run ruff check .
git diff --check
git diff
```

Ces commandes répondent à quatre questions distinctes :

- `uv run pytest` : les tests passent-ils ? Dans cet exercice, pytest a trouvé
  et exécuté deux tests.
- `uv run ruff check .` : le code et les tests respectent-ils les règles
  statiques configurées ?
- `git diff --check` : le diff contient-il des défauts de fin de ligne ou des
  espaces en trop détectables par Git ?
- `git diff` : quel texte exact va être proposé à la revue ?

Un résultat local vert ne remplace pas la CI, mais il évite d'envoyer une
erreur triviale à GitHub.

### 5. Construire un commit limité au changement

```bash
git add tests/test_calcul.py
git commit -m "Test addition with negative integers"
```

`git add` ne signifie pas « ajouter tous les fichiers ». Il sélectionne ici
explicitement le seul fichier vérifié. Cela évite d'inclure par accident un
fichier local, un secret ou un changement sans rapport.

`git commit` enregistre ensuite un point d'historique local. Le message décrit
l'effet du commit : il ajoute un test pour les additions avec des nombres
négatifs.

### 6. Envoyer la branche, pas encore `main`

```bash
git push -u origin test/addition-negative-integers
```

`origin` est le nom du dépôt GitHub distant. Le dernier argument est la
branche envoyée. L'option `-u` établit un suivi entre la branche locale et sa
branche distante ; par la suite, un simple `git push` suffit depuis cette
branche.

Cette commande crée ou met à jour la branche sur GitHub. Elle ne fusionne rien
dans `main`.

### 7. Ouvrir et lire la pull request

Une PR peut être créée dans l'interface GitHub ou avec GitHub CLI :

```bash
gh pr create --base main --head test/addition-negative-integers
```

`--base main` désigne la branche de destination. `--head` désigne la branche
qui apporte les changements. GitHub affiche alors le diff entre les deux et
lance le workflow associé à l'événement `pull_request`.

Avant une fusion, la revue doit répondre au minimum à ces questions :

1. La PR modifie-t-elle uniquement les fichiers annoncés ?
2. Le comportement vérifié correspond-il à l'objectif ?
3. Les contrôles CI sont-ils verts ?
4. Y a-t-il un fichier inattendu, une dépendance nouvelle ou une permission
   élargie ?

Pour la PR n°1 de ce dépôt, la revue a trouvé un seul fichier modifié,
`tests/test_calcul.py`, et quatre lignes ajoutées. La CI était verte.

### 8. Fusionner seulement après les contrôles

Lorsque le diff est approuvé et que la CI est réussie, la PR peut être fusionnée
vers `main`. GitHub crée alors le commit de fusion et exécute de nouveau la CI
sur `main` : la branche de référence est ainsi elle aussi vérifiée.

Après une fusion, on synchronise le poste local :

```bash
git switch main
git pull --ff-only origin main
```

`git switch main` retourne sur la branche de référence. `git pull --ff-only`
télécharge les nouveaux commits et n'accepte qu'une mise à jour linéaire. S'il
devait créer un merge local inattendu, la commande s'arrêterait au lieu de
modifier l'historique automatiquement.

### Ce que garantit — et ne garantit pas — cette PR

La PR apporte une traçabilité du changement, une revue du diff et une
vérification automatisée reproductible. Elle ne prouve pas à elle seule que le
produit entier répond aux besoins métiers ni qu'il est exempt de toute faille
de sécurité. Les tests, le linting, la revue humaine et les règles de
protection de branche sont des garde-fous complémentaires.
