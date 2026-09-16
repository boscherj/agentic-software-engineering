# 01 — Fondamentaux de l’Agentic Software Engineering

## Objectif
Comprendre le passage de l’assistance au code à la délégation de tâches d’ingénierie complètes.

## Thèmes
- assistant, agent et autonomie ;
- boucle agentique : observer, raisonner, agir, vérifier ;
- rôle de l’ingénieur logiciel ;
- niveaux de délégation ;
- limites, risques et contrôle humain ;
- anatomie d’un workflow agentique de développement.

## TP
À définir avec le projet fil rouge.

## Laboratoire guidé — à quoi sert l'environnement créé ?

L'environnement du dépôt n'est pas une collection d'outils installés « au cas
où ». Il forme une chaîne de contrôle qui permet à un agent de travailler sur
du code sans intégrer silencieusement ses changements dans la version de
référence.

Le laboratoire réalisé dans ce dépôt a consisté à ajouter la fonction
`est_pair(nombre: int) -> bool`. La fonctionnalité est volontairement simple :
elle permet d'observer chaque étape sans que la difficulté algorithmique ne
masque le fonctionnement du workflow.

### Résultat attendu

La fonction doit renvoyer :

| Entrée | Résultat attendu | Raison |
| --- | --- | --- |
| `2` | `True` | 2 est divisible par 2. |
| `3` | `False` | 3 n'est pas divisible par 2. |
| `0` | `True` | 0 est divisible par 2. |
| `-4` | `True` | La parité s'applique aussi aux entiers négatifs. |

L'objectif pédagogique n'est pas « écrire cinq lignes de Python ». Il est de
suivre un changement depuis une demande précise, la lecture du contexte, une
branche isolée et des tests, jusqu'à la revue humaine et la fusion explicite
dans `main`.

## Les acteurs : qui sait quoi ?

Un agent ne possède pas une connaissance magique du projet. Chaque acteur a
une vue différente et limitée de la situation.

| Acteur | Ce qu'il connaît ou reçoit | Ce qu'il ne connaît pas automatiquement |
| --- | --- | --- |
| Vous, l'ingénieur | Le besoin métier, la priorité, les risques acceptables et la décision finale. | Le détail exact de chaque modification tant que vous n'avez pas relu le diff. |
| L'agent | Votre demande, les fichiers qu'il lit, les sorties de commandes et les instructions telles que `AGENTS.md`. | Vos intentions implicites, les fichiers qu'il n'a pas lus, vos mots de passe et toute information hors de son accès autorisé. |
| Git local | Les fichiers suivis, les modifications, les branches et les commits du clone local. | Le contenu d'une PR tant que celle-ci n'est pas créée sur GitHub, et les fichiers non ajoutés au commit. |
| GitHub | Les commits et branches qui ont été poussés, puis la PR, ses commentaires et ses résultats CI. | Les fichiers qui restent uniquement sur votre Mac, comme `.mcp.json` dans ce laboratoire. |
| GitHub Actions | Le commit confié au workflow, le fichier `.github/workflows/ci.yml`, les dépendances téléchargées et le jeton temporaire limité par le workflow. | Votre environnement local, vos fichiers non poussés et vos identifiants personnels. |
| La pull request | La comparaison entre une branche source et une branche cible, les discussions et les contrôles associés. | Elle n'exécute pas elle-même le code : c'est le workflow CI qui le fait. |

Cette séparation permet de répondre à une question simple pour chaque
information sensible ou changement : « qui peut le voir, et à quel moment ? »

### Quel outil a réellement été utilisé dans ce laboratoire ?

Le terme « agent » désigne un rôle dans le workflow, pas un outil précis. Dans
le laboratoire `est_pair`, ce rôle a été assuré par **Codex**, exécuté dans
l'environnement local partagé. Codex a lu les fichiers du dépôt, créé la
branche `feature/est-pair`, écrit les tests et le code, lancé les commandes de
validation, créé le commit, poussé la branche et ouvert la pull request.

**GitHub n'a pas généré la fonction `est_pair`.** Il a reçu le commit déjà
créé par Codex, hébergé la branche et la pull request, exécuté la CI, appliqué
la protection de `main` et enregistré la fusion après la décision humaine.

Les outils suivants n'ont pas été utilisés pour réaliser cet exercice :

| Outil | A-t-il été utilisé ? | Son rôle dans le cours |
| --- | --- | --- |
| VS Code | Non. | Éditeur graphique optionnel ; il sera utile lorsque le module GitHub Copilot présentera Agent Mode. |
| Claude Code | Non. | Client agent alternatif, étudié et comparé dans son module dédié. |
| Codex | Oui. | Client agent local qui a réalisé la tâche de développement dans ce laboratoire. |
| GitHub | Oui, après le push. | Service distant qui héberge la PR, applique les règles et exécute la CI. |

Le même workflow peut être reproduit par Claude Code ou GitHub Copilot Agent
Mode : l'agent change, mais `AGENTS.md`, Git, les tests, la pull request et la
CI restent les mêmes garde-fous. VS Code est une interface de travail possible,
pas une exigence du workflow.

### Comparaison réelle : Codex local et GitHub Copilot Cloud Agent

Le dépôt contient deux laboratoires comparables. Ils permettent de séparer ce
qui dépend du **client agent** de ce qui dépend du **workflow d'ingénierie**.

| Laboratoire | Agent qui a produit le code | Fonction ajoutée | Pull request |
| --- | --- | --- | --- |
| Premier laboratoire | Codex, exécuté depuis l'environnement local partagé. | `est_pair` | [PR n°2](https://github.com/boscherj/agentic-software-engineering/pull/2) |
| Second laboratoire | GitHub Copilot Cloud Agent, exécuté dans GitHub. | `est_multiple_de_trois` | [PR n°5](https://github.com/boscherj/agentic-software-engineering/pull/5) |

La PR n°5 est identifiée par GitHub comme venant du compte bot
`app/copilot-swe-agent`. Elle a créé la branche
`copilot/ajoute-fonction-est-multiple-de-trois`, ajouté la fonction et quatre
tests, puis proposé la PR. La fusion n'est intervenue qu'après la revue et les
checks verts.

#### Où le travail s'exécute-t-il ?

| Question | Codex local | Copilot Cloud Agent |
| --- | --- | --- |
| Où l'agent lit-il le dépôt ? | Dans le clone présent sur le Mac. | Dans un environnement temporaire créé par GitHub pour l'agent. |
| Où les tests sont-ils lancés par l'agent ? | Dans l'environnement local `uv` du dépôt. | Dans l'environnement temporaire de l'agent sur GitHub. |
| Qui crée la branche ? | Codex, via Git local puis `git push`. | Copilot, directement dans le dépôt GitHub. |
| Qui ouvre la PR ? | Codex, via GitHub CLI après le push. | Copilot, depuis sa session GitHub. |
| Où l'humain relit-il le résultat ? | Dans la PR sur GitHub. | Dans la même PR sur GitHub. |
| Qui exécute la CI finale ? | GitHub Actions. | GitHub Actions. |

Copilot Cloud Agent dispose de son propre environnement éphémère pour explorer
le dépôt, modifier les fichiers et exécuter des contrôles. Il ne se connecte
pas à votre Mac. Cette séparation rend le travail asynchrone : vous pouvez
fermer votre terminal pendant que l'agent travaille, puis revenir lire sa PR.
Voir la [documentation GitHub sur l'environnement du cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent).

#### Ce que chaque agent peut voir

Codex local peut lire les fichiers auxquels son environnement local lui donne
accès. Cela inclut potentiellement des fichiers non suivis présents dans le
clone ; c'est pourquoi l'agent doit respecter le périmètre fixé, et pourquoi
`.mcp.json` a été explicitement exclu des commits pendant les laboratoires.

Copilot Cloud Agent part de ce que GitHub connaît : le commit de départ, les
fichiers versionnés, la demande reçue et les instructions de dépôt accessibles
dans sa branche. Il ne voit pas les fichiers qui restent uniquement sur le Mac,
ni les programmes installés localement, ni les secrets non fournis à son
environnement.

Cette différence ne rend pas automatiquement l'un plus sûr que l'autre. Elle
déplace le lieu où il faut contrôler les accès : permissions et fichiers locaux
pour l'agent local ; permissions de dépôt, secrets GitHub et accès réseau pour
l'agent cloud.

#### Ce qui ne change pas

Quel que soit le client agent, les éléments de contrôle restent identiques :

- `AGENTS.md` définit les règles du dépôt ;
- les tests et Ruff fournissent un retour exécutable ;
- une branche isole le changement ;
- une pull request expose le diff et la discussion ;
- GitHub Actions vérifie le commit indépendamment ;
- la protection de `main` empêche la fusion directe ;
- un humain décide de la fusion.

Le choix entre Codex local et Copilot Cloud Agent est donc principalement un
choix d'expérience de travail : interaction synchrone dans le poste local ou
délégation asynchrone depuis GitHub. Dans les deux cas, ne pas relire le diff
ou ignorer un check CI reviendrait à contourner les garde-fous du workflow.

## Instructions persistantes : `AGENTS.md`

`AGENTS.md` est un fichier Markdown qui donne à un agent des règles durables
sur la manière de travailler dans un dépôt. Ce n'est pas un fichier nécessaire
au fonctionnement de Python, de Git ou de GitHub : le projet peut fonctionner
sans lui. Son intérêt est de ne pas devoir répéter les mêmes règles dans chaque
prompt envoyé à chaque nouvel agent.

Dans ce dépôt, `AGENTS.md` demande notamment de limiter le périmètre des
changements, d'ajouter des tests pour un changement de comportement, de lancer
les vérifications pertinentes, de ne pas versionner de secrets et de préserver
les fichiers sans rapport avec la tâche.

### Une instruction n'est pas une permission

Il faut distinguer deux mécanismes :

| Mécanisme | Exemple | Ce qu'il fait réellement |
| --- | --- | --- |
| Instruction | « Ne modifie pas de fichier sans rapport. » | Guide le comportement attendu de l'agent. |
| Permission technique | `contents: read` dans la CI | Empêche techniquement le workflow d'écrire dans le dépôt. |
| Contrôle automatisé | pytest et Ruff | Détecte certains problèmes après la modification. |
| Protection de branche | PR et check CI obligatoires | Empêche la fusion directe dans `main`. |

Un agent peut mal interpréter ou ne pas suivre une instruction. `AGENTS.md`
est donc un élément de contexte utile, mais jamais une frontière de sécurité.
Les permissions, les tests, la CI et la protection de branche restent
indispensables.

### Faut-il obligatoirement un `AGENTS.md` ?

Non. Sans ce fichier, un agent peut toujours travailler à partir du prompt et
des fichiers qu'il explore. En revanche, les règles de projet doivent alors
être répétées dans chaque demande, avec un risque plus élevé d'oubli ou de
formulation incohérente.

Le fichier est particulièrement utile lorsque plusieurs personnes ou plusieurs
clients agents travaillent sur le même dépôt. Il donne une référence versionnée,
relisible dans une pull request et commune aux sessions futures.

### Où placer le fichier ?

Un `AGENTS.md` à la racine est la convention la plus simple pour les règles
applicables à l'ensemble du dépôt : structure générale, commandes de test,
gestion des secrets et définition de fini.

Il n'est pas obligatoire de le placer à la racine. Lorsqu'un client agent
prend en charge les instructions hiérarchiques, des fichiers plus ciblés peuvent
être placés dans des sous-dossiers :

```text
AGENTS.md                         règles communes à tout le dépôt
src/frontend/AGENTS.md            règles propres au frontend
infrastructure/AGENTS.md          règles propres au déploiement
```

Pour GitHub Copilot, plusieurs fichiers `AGENTS.md` peuvent être présents dans
un dépôt et le fichier le plus proche de la zone travaillée a priorité. Dans
VS Code, la prise en charge des fichiers situés hors de la racine de l'espace
de travail est désactivée par défaut ; il faut donc vérifier le comportement
du client réellement employé. Voir la [documentation GitHub](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide).

La recommandation pour ce cours est de commencer par un seul fichier à la
racine. Ajouter un fichier local à un sous-dossier seulement lorsqu'une règle
est réellement spécifique à ce sous-dossier.

### `AGENTS.md` est-il réservé à Copilot ?

Non. `AGENTS.md` est une convention d'instructions partagée par plusieurs
clients agents. Dans les laboratoires de ce dépôt, Codex local a lu le fichier
racine et GitHub Copilot Cloud Agent pouvait lui aussi l'utiliser. Claude Code,
Copilot et Codex peuvent toutefois avoir d'autres conventions ou options ; il
faut vérifier le support du client avant de supposer qu'un fichier est chargé.

GitHub Copilot propose en plus des formats qui lui sont propres :

| Portée souhaitée | Fichier recommandé |
| --- | --- |
| Règles communes à plusieurs agents | `AGENTS.md` |
| Règles applicables à Copilot dans tout le dépôt | `.github/copilot-instructions.md` |
| Règles Copilot limitées à certains chemins | `.github/instructions/*.instructions.md` |

Copilot Cloud Agent prend en charge ces instructions de dépôt, ainsi que les
instructions d'agent comme `AGENTS.md`. La matrice de prise en charge varie
selon le client Copilot employé ; consulter la [référence GitHub](https://docs.github.com/en/copilot/reference/custom-instructions-support) avant de multiplier les fichiers.

### Éviter les contradictions

Deux fichiers d'instructions qui répètent la même règle finissent souvent par
diverger. La règle pratique est donc la suivante :

- placer les règles générales et partagées dans `AGENTS.md` ;
- placer une exception limitée à un dossier dans son fichier local ;
- placer dans `.github/copilot-instructions.md` uniquement ce qui est vraiment
  spécifique à Copilot ;
- éviter de recopier textuellement les mêmes exigences dans plusieurs fichiers.

Le fichier `AGENTS.md` de ce dépôt est aujourd'hui le bon niveau de simplicité :
il partage les mêmes règles à Codex et Copilot sans créer de source de vérité
concurrente. Une instruction spécifique à Copilot ne sera ajoutée que si un
besoin distinct apparaît.

## Mandat de délégation : demander une tâche à un agent

Un bon mandat de délégation décrit le résultat attendu et les limites de
l'autonomie. Il ne se réduit pas à « ajoute une fonction » ou « corrige ce
bug ». Sans ces précisions, l'agent doit deviner le périmètre, le niveau de
qualité et les actions qu'il peut prendre.

Le mandat répond à six questions :

| Élément | Question | Exemple |
| --- | --- | --- |
| Objectif | Quel résultat faut-il obtenir ? | Ajouter une fonction qui détermine si un entier est multiple de trois. |
| Périmètre | Quels fichiers ou composants sont concernés ? | Le module de calcul et ses tests. |
| Critères d'acceptation | Comment reconnaître le résultat correct ? | 3, 0 et -6 sont acceptés ; 4 est refusé. |
| Vérifications | Quelles preuves l'agent doit-il produire ? | pytest et Ruff doivent réussir. |
| Autonomie | Jusqu'où l'agent peut-il aller seul ? | Créer une branche et une PR, sans fusionner. |
| Limites | Quelles actions sont interdites ? | Pas de dépendance, pas de fichier hors périmètre, pas de fusion. |

### Modèle de mandat réutilisable

Le modèle suivant convient à une tâche de niveau 3, qui est le niveau par
défaut de ce cours : l'agent produit une proposition complète, mais l'humain
conserve la décision d'intégration.

```text
Objectif
<résultat observable à obtenir>

Périmètre
- Fichiers ou composants autorisés : <liste>
- Hors périmètre : <liste>

Critères d'acceptation
- <comportement 1 vérifiable>
- <comportement 2 vérifiable>

Vérifications obligatoires
- <commande de test>
- <commande de linting ou analyse>

Autonomie autorisée
- Lire le dépôt et les instructions.
- Créer une branche, modifier les fichiers autorisés, lancer les vérifications.
- Créer un commit et une pull request.

Actions interdites
- Ne pas modifier <zones sensibles>.
- Ne pas ajouter de dépendance sans le signaler.
- Ne pas fusionner la pull request.

Restitution attendue
- Résumer les fichiers modifiés, les commandes exécutées et leurs résultats.
- Signaler toute ambiguïté, échec ou décision qui sort du périmètre.
```

Les rubriques sont plus importantes que la formulation exacte. Elles évitent
que l'agent confonde « résultat souhaité » et « liberté totale de choisir les
moyens ou d'intégrer le résultat ».

### Exemple réel du dépôt

Le mandat envoyé à GitHub Copilot Cloud Agent pour le second laboratoire était
équivalent à celui-ci :

```text
Ajoute une fonction est_multiple_de_trois(nombre: int) dans le module de calcul.

Ajoute des tests pour les valeurs 3, 4, 0 et -6.

Lis AGENTS.md, ne modifie pas de fichiers hors du module et de ses tests,
exécute les tests et Ruff, puis crée une pull request. Ne fusionne pas la pull
request.
```

Ce mandat a donné une branche, une implémentation courte, quatre tests, une PR
et des checks CI verts. La fusion a ensuite nécessité une décision humaine
explicite.

### Adapter le mandat au niveau d'autonomie

Le même objectif peut être délégué à des niveaux très différents :

| Niveau | Formulation à ajouter au mandat | Ce que l'agent ne doit pas faire |
| --- | --- | --- |
| 0 — Répondre | « Explique la solution ; ne lis ni ne modifie le dépôt. » | Accéder au projet ou produire un changement. |
| 1 — Analyser | « Lis le dépôt et propose un plan ; ne modifie aucun fichier. » | Écrire du code ou exécuter des actions de Git. |
| 2 — Modifier | « Modifie les fichiers et lance les contrôles ; ne crée ni commit ni PR. » | Publier quoi que ce soit sur GitHub. |
| 3 — Proposer | « Crée une branche et une PR ; ne fusionne pas. » | Intégrer dans `main`. |
| 4 — Intégrer | « Fusionne uniquement la PR n°X après confirmation explicite. » | Choisir seul quelle PR fusionner. |

La dernière ligne mérite une prudence particulière. Même avec une CI verte,
une fusion est une décision produit et d'ingénierie ; elle doit rester liée à
une PR précise et à une autorisation claire.

### Ce qu'un mandat ne remplace pas

Un mandat de qualité ne remplace pas les règles techniques déjà en place :

- `AGENTS.md` fournit les règles générales du dépôt ;
- Git isole et trace le changement ;
- pytest et Ruff apportent des preuves exécutables ;
- la pull request rend le diff visible ;
- la CI reproduit les contrôles à distance ;
- la protection de `main` applique la politique de fusion.

Le mandat donne une direction à l'agent. Le workflow vérifie le résultat et
limite les conséquences d'une erreur, d'une ambiguïté ou d'une mauvaise
interprétation.

## Étape 1 — formuler une demande vérifiable

La demande adressée à un agent doit annoncer le résultat et les limites, pas
seulement une idée vague. Pour ce laboratoire, elle peut être formulée ainsi :

> Ajoute `est_pair(nombre: int) -> bool` dans le module de calcul. Ajoute des
> tests pour un entier pair, un entier impair, zéro et un entier négatif pair.
> Ne modifie pas de fichiers hors du module et de ses tests. Lance pytest et
> Ruff avant de proposer une pull request.

Cette formulation apporte cinq informations opérationnelles :

1. **Le résultat attendu** : une fonction qui retourne un booléen.
2. **La zone concernée** : le module de calcul et son fichier de tests.
3. **Les cas d'acceptation** : 2, 3, 0 et -4.
4. **La limite de périmètre** : pas de fichier annexe.
5. **Les preuves attendues** : pytest et Ruff.

Un agent peut alors vérifier lui-même une grande partie de son travail, mais
il ne choisit pas seul d'élargir le besoin ou de fusionner dans `main`.

## Étape 2 — lire le contexte avant d'agir

Avant toute modification, l'agent doit lire `AGENTS.md`, le code concerné et
les tests existants. Dans ce dépôt, `AGENTS.md` impose notamment des changements
petits et faciles à relire, des tests pour tout comportement modifié,
l'exécution des vérifications pertinentes et l'absence de secrets dans Git.

L'agent constate alors que `.mcp.json` est un fichier local non suivi. Il est
visible sur le poste de développement, mais pas dans l'historique Git et pas
sur GitHub. Il doit rester hors du commit, car il ne fait pas partie de la
fonctionnalité demandée.

Cette phase d'observation ouvre la boucle agentique : observer, raisonner,
agir, vérifier, puis rendre compte.

## Étape 3 — isoler le travail dans une branche

La commande suivante crée une branche locale et s'y place :

```bash
git switch -c feature/est-pair
```

`feature/est-pair` part du commit actuellement présent dans `main`. Elle
contient au départ exactement les mêmes fichiers, mais les nouveaux commits
seront enregistrés sur cette branche et non sur `main`.

La branche répond à deux problèmes : elle préserve une version stable du projet
pendant le travail, et elle donne à GitHub un objet précis à comparer avec
`main` lors de la future pull request.

## Étape 4 — écrire des tests avant l'implémentation

Les tests suivants ont d'abord été ajoutés au fichier `tests/test_calcul.py` :

```python
def test_est_pair_retourne_vrai_pour_un_entier_pair() -> None:
    assert est_pair(2) is True


def test_est_pair_retourne_faux_pour_un_entier_impair() -> None:
    assert est_pair(3) is False


def test_est_pair_consider_zero_comme_pair() -> None:
    assert est_pair(0) is True


def test_est_pair_accepte_un_entier_negatif_pair() -> None:
    assert est_pair(-4) is True
```

À ce moment, la fonction n'existait pas. La commande suivante a donc échoué :

```bash
uv run pytest
```

Le message n'était pas ambigu : Python ne pouvait pas importer `est_pair` du
module de calcul. Cet échec est utile : il confirme que le test demande bien
un comportement qui n'est pas encore fourni. Un échec de test n'est pas
toujours un problème à cacher ; c'est souvent l'information qui guide la
prochaine correction.

## Étape 5 — implémenter le minimum nécessaire

La fonction ajoutée est :

```python
def est_pair(nombre: int) -> bool:
    """Indique si un nombre entier est divisible par deux."""
    return nombre % 2 == 0
```

L'opérateur `%` calcule le reste d'une division entière. Si le reste de la
division par 2 vaut 0, le nombre est pair. La signature `nombre: int -> bool`
documente le type d'entrée et de sortie attendu.

## Étape 6 — vérifier localement

Après l'implémentation, quatre contrôles différents sont exécutés :

```bash
uv run pytest
uv run ruff check .
git diff --check
git diff
```

| Commande | Question à laquelle elle répond | Résultat du laboratoire |
| --- | --- | --- |
| `uv run pytest` | Les comportements attendus fonctionnent-ils ? | 6 tests réussis. |
| `uv run ruff check .` | Le code présente-t-il une erreur statique ou une règle de style violée ? | Réussi. |
| `git diff --check` | Le diff contient-il des espaces ou fins de ligne problématiques ? | Réussi. |
| `git diff` | Quel changement exact sera proposé à la revue ? | Deux fichiers : code et tests. |

`uv` exécute les outils dans l'environnement Python défini par le projet. Ce
n'est pas un Python global choisi au hasard : les dépendances proviennent de
`pyproject.toml` et de `uv.lock`.

Les contrôles locaux sont rapides, mais ils ne sont pas la validation finale.
Ils confirment seulement que l'agent ne pousse pas une erreur triviale.

## Étape 7 — créer un commit et pousser la branche

Les commandes utilisées sont :

```bash
git add src/agentic_software_engineering/calcul.py tests/test_calcul.py
git commit -m "Add even number check"
git push -u origin feature/est-pair
```

`git add` sélectionne explicitement les deux fichiers utiles. Il ne faut pas
employer aveuglément une commande qui ajouterait tous les fichiers présents,
car elle pourrait embarquer `.mcp.json`, une configuration locale ou un secret.

`git commit` crée un objet Git local et immuable qui contient le diff choisi.
À ce stade, le commit est encore uniquement sur le Mac.

`git push` transmet la branche et ses commits au dépôt distant appelé `origin`.
Dans ce projet, `origin` correspond à
`https://github.com/boscherj/agentic-software-engineering.git`. L'option `-u`
enregistre le lien entre la branche locale et la branche GitHub du même nom.

Après ce push, GitHub connaît `feature/est-pair`, mais il ne modifie toujours
pas `main`. Une branche poussée n'est pas une pull request.

## Étape 8 — où se crée réellement la pull request ?

Une pull request est un objet **hébergé par GitHub**, pas un objet créé par
Git local sur le Mac. Git sait gérer des branches et des commits ; GitHub ajoute
au-dessus de Git une interface de proposition, de discussion, de contrôle et
de fusion.

Elle peut être créée à deux endroits :

1. Dans le navigateur, sur la page du dépôt GitHub. Après un push de branche,
   GitHub propose souvent le bouton **Compare & pull request**.
2. Dans le terminal, avec GitHub CLI :

   ```bash
   gh pr create --base main --head feature/est-pair
   ```

Dans les deux cas, le résultat est le même : GitHub stocke une PR distante avec
une branche cible et une branche source.

| Élément de la PR n°2 | Valeur | Signification |
| --- | --- | --- |
| Dépôt | `boscherj/agentic-software-engineering` | L'espace GitHub qui héberge la proposition. |
| Branche cible (*base*) | `main` | La version qui recevra le changement si la PR est fusionnée. |
| Branche source (*head*) | `feature/est-pair` | La branche qui apporte les commits. |
| Diff | `calcul.py` et `test_calcul.py` | Les différences entre la source et la cible. |
| Conversation | Commentaires, demandes de changement et décisions. | La revue humaine lisible et traçable. |
| Checks | Résultats de GitHub Actions. | Les preuves automatiques liées à cette proposition. |

La page de la PR n°2 est :
<https://github.com/boscherj/agentic-software-engineering/pull/2>.

Dans l'interface GitHub, les onglets ont des rôles différents :

- **Conversation** : titre, description, commentaires, décision de fusion et
  résumé des checks ;
- **Commits** : les commits apportés par la branche ;
- **Files changed** : le diff ligne par ligne à relire ;
- **Checks** : les exécutions et journaux de GitHub Actions.

Une PR ne copie pas les fichiers de votre Mac vers GitHub. Elle référence les
commits déjà poussés et demande à GitHub de comparer la branche source avec la
branche cible.

## Étape 9 — ce qui déclenche la CI, et où elle s'exécute

Deux événements ont déclenché le workflow `CI` : le push de
`feature/est-pair`, puis l'ouverture de la pull request. C'est pourquoi deux
checks verts peuvent être visibles dans la PR.

GitHub Actions crée pour chaque exécution une machine Ubuntu temporaire. Cette
machine ne reçoit pas votre disque local. Le workflow :

1. récupère le commit à tester ;
2. installe la version Python indiquée par `.python-version` ;
3. installe `uv` ;
4. reconstruit les dépendances à partir de `uv.lock` ;
5. lance Ruff ;
6. lance pytest.

Le détail de cette configuration est documenté dans le
[module 08](../08-testing-review-security/README.md). Ici, le point important
est que la CI vérifie la branche sur une machine indépendante du Mac et de
l'agent ayant produit le changement.

## Étape 10 — pourquoi l'agent ne peut pas fusionner directement

La branche `main` est protégée dans GitHub. La règle active exige :

- une pull request avant la fusion ;
- le check `Vérifier le code Python` réussi ;
- une branche à jour avec `main` avant la fusion ;
- la résolution des conversations ;
- l'absence de force-push et de suppression de `main` ;
- l'application de ces règles y compris à l'administrateur du dépôt.

Le dépôt est actuellement utilisé seul, donc une approbation par une seconde
personne n'est pas encore requise. Lorsque plusieurs personnes participeront
au cours, cette exigence pourra être fixée à une approbation minimum.

Cette règle change la nature de l'autonomie de l'agent. Il peut préparer une
branche, des tests et une PR, mais il ne peut pas contourner le circuit de
contrôle pour intégrer directement son résultat dans `main`.

## Étape 11 — la revue humaine et la fusion

Avant de fusionner la PR n°2, la revue a vérifié :

1. que seuls deux fichiers annoncés étaient modifiés ;
2. que la fonction était la plus petite solution répondant au besoin ;
3. que les quatre tests couvraient les cas annoncés ;
4. que les checks GitHub étaient verts ;
5. qu'aucune dépendance, permission ou configuration sans rapport n'était
   ajoutée.

La fusion s'est alors faite dans l'interface GitHub. GitHub a créé le commit de
fusion `5cfc4ee13b6aa2f2203906beb49bb3cb20ba19b3` dans `main`, puis a déclenché
une nouvelle CI sur ce commit. Cette CI post-fusion a elle aussi réussi.

Le poste local doit ensuite être synchronisé :

```bash
git fetch origin
git switch main
git pull --ff-only origin main
```

`git fetch origin` télécharge les références distantes sans modifier les
fichiers de travail. `git switch main` revient sur la branche de référence.
`git pull --ff-only origin main` met ensuite cette branche à jour seulement si
Git peut avancer sans créer de fusion locale implicite.

## Ce que prouve réellement cette démonstration

Elle prouve que l'environnement peut faire appliquer un processus :

```text
agent : produit une proposition limitée
tests locaux : donnent un retour rapide
Git : trace et isole la proposition
GitHub : expose le diff et la conversation
CI : reproduit les contrôles sur une machine indépendante
protection de branche : empêche la fusion hors du circuit
ingénieur : relit et décide
```

Elle ne prouve pas que tout code généré par un agent est correct, sécurisé ou
adapté au besoin métier. Les tests peuvent être incomplets, la demande peut
être ambiguë et le diff peut contenir une erreur que Ruff ne détecte pas. Les
contrôles diminuent le risque ; ils ne remplacent ni la compréhension du
problème ni la responsabilité humaine.

## À retenir pour la suite du cours

À partir de maintenant, chaque outil sera étudié avec la même question :

> Quelle information cet outil donne-t-il à l'agent, quelle action lui permet-il
> d'exécuter, et quel garde-fou permet de vérifier cette action ?

Les modules suivants présenteront successivement GitHub Copilot, Claude Code,
Codex, le contexte persistant, MCP et les workflows multi-agents. L'objectif
reste identique : augmenter l'autonomie de l'agent sans perdre la capacité de
voir, vérifier et décider.

## Laboratoire complémentaire — VS Code et GitHub Copilot Agent Mode

Ce laboratoire reprend le même dépôt, mais place **GitHub Copilot Agent Mode**
dans VS Code au rôle de l'agent local. Le changement est volontairement
minuscule : ajouter deux tests de bord à la fonction existante `additionner`.
L'objectif est d'observer le workflow, et non de produire un algorithme difficile.

### Résultat final

Le travail a produit la [PR n°9](https://github.com/boscherj/agentic-software-engineering/pull/9), ensuite fusionnée dans `main`.

| Élément | Résultat vérifié |
| --- | --- |
| Branche source | `test/addition-cas-limites` |
| Branche cible | `main` |
| Commit | `Test addition edge cases` |
| Fichier modifié | `tests/test_calcul.py` uniquement |
| Contenu | Deux tests d'addition ajoutés ; aucun code de production modifié |
| Validation locale | 12 tests pytest réussis et Ruff réussi |
| Validation distante | Check GitHub Actions `Vérifier le code Python` réussi |
| Fusion | Décision humaine dans GitHub, jamais déléguée à l'agent |

La PR a été intégrée dans `main` par le commit de fusion
`169ed1541d509a02a8ab3fb682caaad6e43f7fe8`.

### Où se situe VS Code dans l'environnement ?

VS Code n'est pas requis pour Git, Python, uv, GitHub ni GitHub Actions. Il
sert ici de **poste de pilotage graphique** : il réunit l'éditeur, le chat avec
l'agent, les demandes d'autorisation, le diff local et Source Control.

| Question | Codex local | Copilot Cloud Agent | Copilot Agent Mode dans VS Code |
| --- | --- | --- | --- |
| Lieu de la conversation | Codex | GitHub | panneau Chat de VS Code |
| Lieu où l'agent modifie les fichiers | clone local | environnement temporaire GitHub | clone local ouvert dans VS Code |
| Lieu de la PR et de la fusion | GitHub | GitHub | GitHub |
| Validation indépendante finale | GitHub Actions | GitHub Actions | GitHub Actions |

Le client agent change ; les garde-fous ne changent pas : instructions du
dépôt, tests, diff, branche, pull request, CI et décision humaine.

### Précondition : sélectionner le bon mode

L'icône Copilot dans la barre d'état confirme que l'extension est disponible,
mais ce n'est pas une preuve qu'un agent agit. Le laboratoire utilise
**Chat**, avec les réglages suivants :

| Réglage | Valeur retenue | Sens |
| --- | --- | --- |
| Mode | `Agent` | Copilot peut lire le dépôt, proposer des modifications et demander l'exécution d'outils. |
| Modèle | `Auto` | Copilot choisit un modèle adapté ; cela n'accorde aucune permission supplémentaire. |

`Auto` ne veut pas dire « accepter toutes les actions ». L'utilisateur doit
garder les confirmations, lire les autorisations et pouvoir les refuser.

### Vue d'ensemble du chemin suivi

```text
mandat limité dans VS Code
        ↓
lecture et analyse du contexte
        ↓
modification locale et contrôles
        ↓
revue humaine du diff dans Source Control
        ↓
branche, commit, push et PR
        ↓
CI GitHub Actions indépendante
        ↓
revue humaine et fusion dans GitHub
        ↓
synchronisation et nettoyage du clone local
```

Chaque flèche est une frontière de contrôle, pas une permission automatique.

### Niveau 1 — analyser sans changer le dépôt

La première demande demandait à Copilot d'identifier les fonctions, les tests
existants et une amélioration simple, sans modifier le projet ni lancer de
commande. La formulation initiale interdisait aussi d'ouvrir les fichiers.
Copilot a refusé de confirmer leur contenu sans les lire.

C'était le bon comportement : un agent ne doit pas inventer ce qu'il n'a pas
observé. Le mandat a donc été corrigé pour autoriser la lecture seule de
`AGENTS.md`, `calcul.py` et `test_calcul.py`, tout en interdisant les
écritures, le terminal, Git et GitHub.

Après cette lecture, Copilot a identifié les fonctions `additionner`,
`est_pair` et `est_multiple_de_trois`, ainsi que leurs tests. Il a proposé
des tests de bord pour l'addition : le zéro et deux nombres négatifs. Le
résultat du niveau 1 est une analyse fondée sur des sources réelles, pas du code.

### Niveau 2 — modifier et valider localement, sans publier

Après approbation de l'analyse, le mandat autorisait uniquement ceci :

```text
Ajoute uniquement deux tests dans tests/test_calcul.py :
- additionner(0, 5) doit retourner 5 ;
- additionner(-2, -3) doit retourner -5.

Tu peux lire le dépôt, modifier uniquement ce fichier et exécuter :
uv run pytest
uv run ruff check .

Ne modifie pas le code de production. Ne crée ni branche, ni commit,
ni push, ni pull request.
```

| Clause | Rôle |
| --- | --- |
| Deux tests explicites | Empêche une refonte non demandée. |
| Un seul fichier autorisé | Rend le diff prévisible. |
| Aucun code de production | Sépare le test de la modification de comportement. |
| Deux commandes exactes | Produit des preuves locales comparables. |
| Pas de GitHub | L'humain conserve la possibilité de relire avant publication. |

Copilot a rapporté 12 tests réussis et `All checks passed!` pour Ruff. Cela
ne dispense pas de la revue : les commandes prouvent que les contrôles ont
réussi, elles ne prouvent pas que l'agent a respecté chaque limite du mandat.

#### Revue locale obligatoire

Avant toute publication, l'utilisateur a ouvert **Source Control** dans VS
Code et a contrôlé :

1. que la section **Changes** ne contenait que `tests/test_calcul.py` ;
2. que le diff ajoutait uniquement les deux tests annoncés ;
3. que les assertions correspondaient à `additionner(0, 5) == 5` et
   `additionner(-2, -3) == -5`.

Le rapport de l'agent est utile ; le diff est la preuve. Cette étape permet de
stopper une erreur avant qu'elle ne devienne un commit ou une PR.

### Niveau 3 — proposer une PR, sans fusion

Le mandat a ensuite augmenté l'autonomie :

```text
Le diff de tests/test_calcul.py a été vérifié et approuvé.

Crée une branche nommée test/addition-cas-limites, puis :
1. ajoute uniquement tests/test_calcul.py à l'index Git ;
2. crée un commit avec le message exact : Test addition edge cases ;
3. pousse la branche sur GitHub ;
4. crée une pull request vers main.

Vérifie une dernière fois que seuls les deux nouveaux tests font partie du
changement. Ne modifie aucun autre fichier. Ne fusionne pas la PR.
```

L'**index Git** (*staging area*) est la sélection exacte des fichiers qui
entrent dans un commit. La consigne « ajoute uniquement ce fichier à l'index »
protège contre l'ajout involontaire d'une configuration locale ou d'un fichier
sans rapport.

Copilot a créé la branche, le commit, le push et la PR n°9. Il s'est arrêté
avant la fusion, comme demandé.

#### Lire les demandes d'autorisation

Dans Agent Mode, une demande d'autorisation décrit une action proposée ; ce
n'est jamais une obligation d'accepter.

| Action | Décision dans ce laboratoire |
| --- | --- |
| Lire les fichiers autorisés | Autoriser |
| Modifier le seul fichier de test | Autoriser au niveau 2 |
| Lancer pytest et Ruff | Autoriser |
| Créer branche, commit, push et PR | Autoriser seulement après revue du diff |
| Fusionner la PR | Refuser : décision humaine |
| Ajouter un fichier non lié | Refuser |

Une même action Git peut être acceptable au niveau 3 et interdite au niveau 1
ou 2. L'autorisation se juge toujours par rapport au mandat en cours.

### Revue sur GitHub : la PR n°9

Une fois la PR créée, elle a été contrôlée à partir de l'état réellement
poussé, et non uniquement à partir du résumé de Copilot :

1. source : `test/addition-cas-limites` ;
2. cible : `main` ;
3. un seul commit, au message demandé ;
4. un seul fichier, `tests/test_calcul.py` ;
5. seulement les deux tests ajoutés ;
6. checks terminés et réussis ;
7. PR ouverte, sans fusion par l'agent.

| Zone GitHub | Ce qui est vérifié |
| --- | --- |
| **Conversation** | objectif, commentaires et décision d'intégration |
| **Commits** | objets Git apportés par la branche |
| **Files changed** | diff ligne par ligne |
| **Checks** | exécution effective de la CI |
| Bouton de fusion | dernière décision humaine |

Deux checks verts `Vérifier le code Python` étaient visibles. Le workflow peut
être lancé à la fois par le push de la branche et par l'ouverture ou la mise à
jour de la PR. Ce sont deux vérifications automatisées, pas deux revues humaines.

### Niveau 4 — la fusion est une décision, pas une étape d'agent

La fusion de la PR n°9 a été effectuée manuellement dans GitHub après la revue
du diff et la confirmation des checks. Une CI verte répond à « les contrôles
configurés ont-ils réussi ? ». Elle ne répond pas seule à « est-ce le bon
changement métier ? » ni à « doit-il être intégré maintenant ? ».

L'agent prépare une proposition vérifiable. L'ingénieur décide de l'intégrer.
Cette séparation est la raison pour laquelle le mandat interdisait explicitement
la fusion.

### Après la fusion : synchroniser et nettoyer

La fusion sur GitHub ne met pas automatiquement à jour les fichiers du Mac.
Le clone local doit revenir sur `main`, récupérer l'état distant et être
contrôlé. La branche locale de travail peut être supprimée seulement lorsque
son contenu est bien présent dans `main`.

Un incident instructif s'est produit pendant ce nettoyage : un commit local
accidentel a été créé sur `main` :

```text
75a429c Exercice des tests pour le module de calcul
```

Il contenait seulement `.mcp.json`, une configuration locale sans rapport
avec le laboratoire. Git affichait alors :

```text
main...origin/main [ahead 1]
```

Cette information ne signifie pas « pousser immédiatement ». Elle signifie que
le Mac possède un commit absent de GitHub. Le contenu a donc été inspecté avant
toute action, puis le commit non poussé a été retiré tout en conservant le
fichier sur le Mac.

Enfin, `.mcp.json` a été ajouté à `.git/info/exclude`. Ce fichier
d'exclusions appartient uniquement à ce clone Git : contrairement à
`.gitignore`, il n'est ni committé ni partagé. L'état final était :

```text
main...origin/main
```

Cette erreur est pédagogique : un dépôt propre ne signifie pas ne jamais se
tromper ; il signifie détecter l'écart, en comprendre la cause et le corriger
avant de le publier.

### Checklist réutilisable

Avant l'agent :

- définir le résultat, les fichiers autorisés et les contrôles attendus ;
- annoncer le niveau d'autonomie ;
- interdire explicitement les actions non voulues, notamment la fusion.

Avant publication :

- lire le diff dans Source Control ;
- vérifier la liste des fichiers modifiés ;
- lire chaque demande d'autorisation ;
- confirmer les résultats des contrôles locaux.

Dans GitHub :

- contrôler source, cible, commits et **Files changed** ;
- attendre les checks terminés et verts ;
- fusionner seulement après une décision humaine explicite.

Après la fusion :

- synchroniser `main` avec GitHub ;
- vérifier que le répertoire de travail est propre ;
- supprimer la branche locale devenue inutile ;
- exclure localement les configurations du poste qui ne doivent pas être
  versionnées.
