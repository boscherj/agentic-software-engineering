# GitHub MCP avec Docker MCP Toolkit — configuration détaillée et expliquée

> Procédure validée le 15 septembre 2026 sur macOS Apple Silicon, avec Docker Desktop, Claude Code, OpenAI Codex CLI et le repository `boscherj/agentic-software-engineering`.

Ce document décrit **pas à pas** la connexion d’agents de développement à GitHub via **Docker MCP Toolkit** et le serveur **GitHub Official MCP Server**.

Il ne s’agit pas seulement d’une recette de commandes. Chaque étape est expliquée afin de comprendre :

- pourquoi Docker intervient alors que GitHub fournit déjà un serveur MCP ;
- ce que Docker apporte concrètement ;
- le rôle du catalogue, du profil, de la gateway et du gestionnaire de secrets ;
- comment appliquer le principe du moindre privilège ;
- pourquoi nous limitons volontairement l’agent à six outils de lecture ;
- la différence entre les configurations Claude Code et Codex ;
- comment vérifier que l’agent lit bien GitHub à distance via MCP.

---

# 1. Le problème que nous voulons résoudre

Nous voulons permettre à un agent tel que Claude Code ou Codex d’accéder à GitHub.

Sans MCP, chaque agent devrait disposer de sa propre intégration spécifique avec GitHub.

Avec MCP, nous pouvons introduire une couche commune :

```text
Claude Code ─┐
             │
Codex ───────┼── MCP ──> GitHub
             │
Autre agent ─┘
```

Mais il reste plusieurs problèmes pratiques :

- comment sélectionner le bon serveur MCP GitHub ?
- comment le lancer ?
- comment stocker son token GitHub ?
- comment limiter ce qu’il peut faire ?
- comment connecter plusieurs clients sans dupliquer toute la configuration ?
- comment éviter d’exposer directement les secrets à chaque agent ?

C’est précisément là que **Docker MCP Toolkit** devient intéressant.

---

# 2. Pourquoi utiliser Docker pour GitHub MCP ?

Docker n’est pas obligatoire pour utiliser MCP.

Nous avons d’ailleurs commencé la formation sans Docker MCP Toolkit avec le serveur `filesystem` :

```text
Claude Code / Codex
        ↓
     stdio
        ↓
       npx
        ↓
server-filesystem
```

Pour GitHub, nous introduisons Docker parce qu’il ajoute une **couche de gestion et de contrôle** particulièrement utile lorsque les serveurs MCP deviennent plus puissants.

Docker MCP Toolkit nous apporte ici cinq bénéfices principaux.

## 2.1 Un catalogue de serveurs MCP

Docker peut maintenir un catalogue de serveurs MCP connus.

Au lieu de chercher manuellement une commande, une image ou un package, on peut importer un catalogue puis inspecter les serveurs disponibles.

Dans notre cas, le catalogue contenait trois entrées GitHub :

```text
github            → Archived
github-chat       → serveur limité à certaines analyses
github-official   → serveur officiel GitHub, 40 outils
```

Le catalogue joue donc le rôle de **registre de serveurs MCP**.

Il répond à la question :

> Quels serveurs MCP sont disponibles et comment sont-ils décrits ?

## 2.2 Une exécution encapsulée du serveur MCP

Le serveur retenu est fourni sous forme d’image :

```text
ghcr.io/github/github-mcp-server@sha256:...
```

Docker exécute donc le serveur dans son environnement de conteneurisation plutôt que de nous demander d’installer directement le serveur GitHub dans notre système.

Cela réduit les dépendances installées directement sur le Mac et rend l’environnement plus reproductible.

Schéma :

```text
Mac
 ↓
Docker Desktop
 ↓
GitHub Official MCP Server
 ↓
API GitHub
```

Cela ne signifie pas que « Docker rend tout sûr automatiquement ». Le serveur possède toujours des capacités réelles et des secrets. Mais il est exécuté dans un environnement plus contrôlé et standardisé.

## 2.3 Un profil qui définit les capacités exposées

Le serveur GitHub officiel fournit environ 40 outils dans la version utilisée lors de la préparation.

Parmi eux figurent des opérations très puissantes :

```text
create_branch
create_or_update_file
delete_file
issue_write
merge_pull_request
push_files
create_repository
...
```

Docker permet de créer un **profil** et de n’y activer qu’une partie des outils.

Notre profil `agentic_se_github` n’expose que :

```text
get_me
get_file_contents
list_branches
list_commits
list_issues
list_pull_requests
```

Ces six outils sont des opérations de lecture.

Le profil répond donc à la question :

> Parmi toutes les capacités du serveur MCP, lesquelles voulons-nous réellement présenter à l’agent ?

## 2.4 Un gestionnaire de secrets centralisé

Le serveur GitHub a besoin d’un credential.

Il attend :

```text
github.personal_access_token
```

Docker MCP Toolkit peut stocker ce secret dans son mécanisme de secrets associé au trousseau local plutôt que de l’écrire :

- dans le repository ;
- dans `AGENTS.md` ;
- dans un fichier `.env` versionné ;
- dans une commande visible contenant le token ;
- dans la configuration de chaque agent.

Le secret est donc géré séparément de la configuration fonctionnelle.

Cela répond à la question :

> Où stocker la clé nécessaire au serveur sans la diffuser aux différents fichiers de configuration ?

## 2.5 Une gateway commune à plusieurs clients MCP

Docker expose ensuite une **gateway MCP** aux clients.

Claude Code et Codex ne lancent pas eux-mêmes directement le conteneur GitHub ni ne gèrent le token GitHub.

Ils voient essentiellement :

```text
MCP_DOCKER
   ↓
docker mcp gateway run --profile agentic_se_github
```

La gateway applique le profil et relaie les outils autorisés vers le serveur MCP GitHub.

Nous obtenons donc :

```text
Claude Code ─┐
             │
Codex ───────┼── Docker MCP Gateway
             │          ↓
             │   profil agentic_se_github
             │          ↓
             │   6 outils read-only
             │          ↓
             │   GitHub Official MCP
             │          ↓
             └──────── GitHub API
```

C’est probablement le bénéfice le plus important pédagogiquement : **le contrôle est centralisé entre l’agent et le serveur externe**.

---

# 3. Docker ne remplace pas MCP

Il faut distinguer les rôles.

```text
MCP
= protocole d’interaction entre clients et serveurs

GitHub Official MCP Server
= serveur exposant les capacités GitHub

Docker MCP Toolkit
= couche de catalogue, configuration, secrets, profils et gateway

Claude Code / Codex
= clients MCP / agents qui consomment les outils
```

Docker est donc une **couche d’administration et d’exécution**, pas le protocole lui-même.

---

# 4. Défense en profondeur

Notre configuration applique plusieurs barrières successives.

```text
Fine-grained GitHub PAT
  → un repository sélectionné
  → permissions de lecture

           +

Docker MCP profile
  → un seul serveur GitHub
  → seulement 6 outils read-only

           +

Client MCP
  → Claude Code ou Codex

           +

Validation humaine
```

Pourquoi deux niveaux de restriction ?

Parce qu’un seul contrôle peut être mal configuré.

Le token limite ce que GitHub acceptera réellement.

Le profil Docker limite ce que l’agent voit comme outils disponibles.

Ces deux mécanismes se complètent.

---

# 5. Vérifier Docker MCP Toolkit

Commande :

```bash
docker mcp --help
```

Cette commande demande au plugin MCP de Docker d’afficher ses fonctions disponibles.

Dans notre version, on retrouve notamment :

```text
catalog
client
gateway
oauth
profile
secret
server
tools
```

Interprétation :

```text
catalog  → gérer les catalogues de serveurs
client   → connecter Docker MCP à Claude, Codex, VS Code, etc.
gateway  → lancer la gateway MCP
profile  → définir des ensembles de serveurs et d’outils
secret   → stocker les secrets
server   → opérations relatives aux serveurs MCP
tools    → inspecter/gérer les outils
```

---

# 6. Inspecter les commandes de catalogue

Commande :

```bash
docker mcp catalog --help
```

Cette commande ne modifie rien. Elle permet simplement de découvrir les sous-commandes disponibles pour les catalogues.

Nous avons observé :

```text
create
list
pull
push
remove
server
show
tag
```

Le sous-ensemble qui nous intéresse est :

```text
pull  → importer un catalogue
list  → voir les catalogues présents
server → inspecter les serveurs du catalogue
```

---

# 7. Importer le catalogue Docker MCP

Commande :

```bash
docker mcp catalog pull mcp/docker-mcp-catalog:latest
```

Décomposition :

```text
docker
  appelle le CLI Docker

mcp
  utilise le plugin MCP Toolkit

catalog
  agit sur les catalogues

pull
  télécharge/importer le catalogue

mcp/docker-mcp-catalog:latest
  référence du catalogue à importer
```

Résultat validé :

```text
Catalog mcp/docker-mcp-catalog:latest pulled
```

À retenir : cette commande **ne connecte encore aucun agent à GitHub**. Elle rend simplement le catalogue disponible localement.

---

# 8. Vérifier le catalogue importé

Commande :

```bash
docker mcp catalog list
```

Son but est d’afficher les catalogues déjà disponibles localement.

Résultat validé :

```text
mcp/docker-mcp-catalog:latest | ... | Docker MCP Catalog
```

Cette étape permet de vérifier qu’on ne travaille pas sur une hypothèse : le catalogue est réellement présent.

---

# 9. Chercher les serveurs GitHub disponibles

Commande :

```bash
docker mcp catalog server ls mcp/docker-mcp-catalog:latest --filter name=github
```

Décomposition :

```text
catalog server ls
  liste les serveurs contenus dans le catalogue

mcp/docker-mcp-catalog:latest
  catalogue à inspecter

--filter name=github
  limite l’affichage aux entrées contenant github
```

Résultat observé :

```text
github          → Archived
github-chat     → GitHub Chat
github-official → GitHub Official
```

Nous retenons :

```text
github-official
```

Pourquoi ?

Parce que c’est le serveur annoncé comme **Official GitHub MCP Server, by GitHub** et qu’il expose les capacités GitHub nécessaires à nos futurs workflows.

---

# 10. Créer un profil Docker MCP

Commande :

```bash
docker mcp profile create \
  --name agentic-se-github \
  --server catalog://mcp/docker-mcp-catalog/github-official
```

Décomposition :

```text
docker mcp profile create
  crée un nouveau profil MCP

--name agentic-se-github
  donne un nom humain au profil

--server catalog://...
  ajoute au profil le serveur github-official provenant du catalogue
```

Docker a normalisé l’identifiant interne en :

```text
agentic_se_github
```

alors que le nom reste :

```text
agentic-se-github
```

Le profil représente maintenant notre **politique d’exposition** pour le serveur GitHub.

Il ne contient pas encore nécessairement la politique finale des outils ; nous allons la réduire ensuite.

---

# 11. Vérifier la création du profil

Commande :

```bash
docker mcp profile list
```

Résultat validé :

```text
ID                  Name
agentic_se_github   agentic-se-github
```

Cette commande sert à vérifier que le profil existe et à récupérer son identifiant réel.

C’est important car les commandes suivantes utilisent l’ID :

```text
agentic_se_github
```

et non le nom d’affichage avec tirets.

---

# 12. Inspecter le profil

Commande :

```bash
docker mcp profile show agentic_se_github
```

Cette commande est centrale pour le diagnostic.

Elle permet de voir notamment :

- le serveur utilisé ;
- l’image exacte ;
- les secrets attendus ;
- les hosts autorisés ;
- les outils disponibles ;
- surtout les outils effectivement activés au niveau du profil.

Le serveur utilisé est :

```text
github-official
```

avec une image `ghcr.io/github/github-mcp-server@sha256:...`.

Le serveur indique qu’il utilise :

```text
github.personal_access_token
```

via :

```text
GITHUB_PERSONAL_ACCESS_TOKEN
```

---

# 13. Pourquoi ne pas exposer les 40 outils ?

Le serveur GitHub propose à la fois des outils de lecture et d’écriture.

Exemples d’écriture :

```text
create_branch
create_or_update_file
create_pull_request
delete_file
issue_write
merge_pull_request
push_files
update_pull_request
```

Pour une première connexion, ces capacités ne sont pas nécessaires.

Nous voulons uniquement démontrer que l’agent sait :

- identifier l’utilisateur ;
- lire un fichier distant ;
- lister les branches ;
- lister les commits ;
- lister les issues ;
- lister les pull requests.

Donc nous appliquons le principe :

```text
Ne jamais exposer une capacité dont l’exercice n’a pas besoin.
```

---

# 14. Désactiver tous les outils du serveur

Commande :

```bash
docker mcp profile tools agentic_se_github \
  --disable-all github-official
```

Décomposition :

```text
profile tools
  modifie l’allowlist des outils du profil

agentic_se_github
  profil concerné

--disable-all github-official
  désactive tous les outils du serveur github-official
```

Pourquoi commencer par tout désactiver ?

Parce qu’il est plus sûr de partir de :

```text
aucun outil
```

puis d’ajouter explicitement les capacités nécessaires, plutôt que de partir de 40 outils et d’essayer de se souvenir de ceux à retirer.

C’est une politique **default deny**.

---

# 15. Activer uniquement six outils de lecture

Commande :

```bash
docker mcp profile tools agentic_se_github \
  --enable github-official.get_me \
  --enable github-official.get_file_contents \
  --enable github-official.list_branches \
  --enable github-official.list_commits \
  --enable github-official.list_issues \
  --enable github-official.list_pull_requests
```

Chaque option `--enable` autorise précisément un outil.

### `get_me`

Permet de demander à GitHub :

> Quel utilisateur correspond au credential actuellement utilisé ?

C’est très utile pour vérifier l’authentification.

### `get_file_contents`

Permet de lire un fichier ou un répertoire dans un repository GitHub.

Nous l’utilisons pour lire `README.md` **depuis GitHub**, afin de prouver que l’agent utilise l’intégration distante et non le fichier local.

### `list_branches`

Permet de lister les branches du repository.

### `list_commits`

Permet de consulter l’historique des commits.

### `list_issues`

Permet de lister les issues.

### `list_pull_requests`

Permet de lister les pull requests.

Ces six outils sont annotés en lecture seule dans le serveur utilisé.

---

# 16. Vérifier l’allowlist active

Commande :

```bash
docker mcp profile show agentic_se_github
```

Il faut regarder la section active du profil :

```text
tools:
  - get_me
  - get_file_contents
  - list_branches
  - list_commits
  - list_issues
  - list_pull_requests
```

Attention : la sortie contient également un `snapshot` décrivant l’ensemble des outils disponibles dans le serveur GitHub.

La présence d’un outil dans le snapshot **ne signifie pas qu’il est activé**.

Il faut distinguer :

```text
snapshot.server.tools
= catalogue des capacités disponibles

servers[].tools
= capacités réellement exposées par notre profil
```

Cette distinction est importante pour éviter une mauvaise interprétation de la configuration.

---

# 17. Créer un token GitHub finement limité

Nous utilisons un **Fine-grained Personal Access Token** GitHub.

Le principe est de limiter le credential lui-même à :

```text
Resource owner : compte GitHub concerné
Repository access : Only select repositories
Repository : agentic-software-engineering
```

Permissions retenues :

```text
Contents       → Read-only
Issues         → Read-only
Pull requests  → Read-only
Metadata       → lecture automatique nécessaire
```

Ainsi, même si un outil d’écriture était accidentellement exposé plus tard, GitHub conserverait un niveau de contrôle indépendant grâce au token.

Ne jamais coller le token :

- dans le repository ;
- dans une conversation ;
- dans un fichier Markdown ;
- directement dans une commande qui restera dans l’historique du shell.

---

# 18. Saisir le token sans l’afficher

Commande :

```bash
read -s GITHUB_MCP_TOKEN
```

Explication :

```text
read
  lit une valeur saisie dans le terminal

-s
  mode silencieux : les caractères ne s’affichent pas

GITHUB_MCP_TOKEN
  nom de la variable shell temporaire
```

Après avoir lancé la commande :

1. coller le token ;
2. appuyer sur Entrée ;
3. aucun caractère n’est affiché, ce qui est normal.

Le token existe alors temporairement dans la variable shell du terminal courant.

---

# 19. Enregistrer le secret dans Docker MCP

Commande :

```bash
printf '%s' "$GITHUB_MCP_TOKEN" | docker mcp secret set github.personal_access_token
```

Décomposition :

```text
printf '%s' "$GITHUB_MCP_TOKEN"
  écrit le contenu de la variable sur la sortie standard

|
  pipe : transmet cette sortie à la commande suivante

docker mcp secret set
  enregistre un secret MCP

github.personal_access_token
  nom exact attendu par le serveur GitHub MCP
```

La commande peut ne rien afficher lorsqu’elle réussit.

Cela ne signifie pas forcément qu’elle a échoué.

---

# 20. Supprimer la variable shell temporaire

Commande :

```bash
unset GITHUB_MCP_TOKEN
```

Cette commande retire la variable du shell courant.

Nous ne voulons pas conserver inutilement le token en mémoire dans l’environnement de terminal après son transfert vers le gestionnaire de secrets.

---

# 21. Vérifier la présence du secret

Commande :

```bash
docker mcp secret ls
```

Résultat validé :

```text
docker/mcp/github.personal_access_token | docker-pass
```

Cette commande doit afficher le **nom du secret**, pas sa valeur.

Pendant la préparation, un premier appel a produit un timeout interne Docker :

```text
deadline_exceeded
```

Une nouvelle tentative a ensuite fonctionné. Il ne fallait donc pas recréer immédiatement le token : le problème concernait le service interne Docker, pas nécessairement le secret.

---

# 22. Connecter Claude Code au profil Docker MCP

Commande :

```bash
docker mcp client connect claude-code --profile agentic_se_github
```

Décomposition :

```text
client connect
  connecte Docker MCP Toolkit à un client MCP

claude-code
  client ciblé

--profile agentic_se_github
  indique quelle politique / quels serveurs exposer
```

Résultat :

```text
claude-code: connected
MCP_DOCKER: Docker MCP Catalog (gateway server) (stdio)
```

Docker ajoute donc au projet une entrée nommée :

```text
MCP_DOCKER
```

qui lance :

```text
docker mcp gateway run --profile agentic_se_github
```

---

# 23. Vérifier côté Claude Code

Commande :

```bash
claude mcp list
```

Résultat observé avant validation :

```text
MCP_DOCKER: docker mcp gateway run --profile agentic_se_github - ⏸ Pending approval
filesystem: ... - ✔ Connected
```

Pourquoi `Pending approval` ?

Claude Code demande explicitement l’accord de l’utilisateur avant d’utiliser une nouvelle configuration MCP du projet.

C’est un garde-fou utile : un repository ne devrait pas pouvoir ajouter silencieusement un serveur MCP puissant sans validation.

Il suffit alors de lancer :

```bash
claude
```

et d’approuver la configuration MCP que nous venons nous-mêmes de créer.

---

# 24. Test GitHub avec Claude Code

Prompt de validation :

```text
Utilise uniquement les outils GitHub fournis via MCP_DOCKER.

Dis-moi quel utilisateur GitHub est authentifié, puis lis le fichier README.md du repository boscherj/agentic-software-engineering depuis GitHub.

Ne lis pas le fichier local et ne modifie rien.
```

Pourquoi ce prompt est-il précis ?

Parce que Claude Code a déjà accès au repository local.

Si on demandait seulement :

> Lis le README

Claude pourrait lire le fichier local et nous donner une réponse correcte sans jamais utiliser GitHub MCP.

Nous devons tester **le chemin d’exécution**, pas seulement le résultat final.

Test validé.

---

# 25. Connecter Codex au même profil

Première tentative :

```bash
docker mcp client connect codex --profile agentic_se_github
```

Codex a répondu :

```text
codex only supports global configuration. Re-run with --global or -g
```

Cette différence est importante.

Claude Code accepte ici une configuration MCP au niveau du projet.

Codex, via cette intégration Docker, exige une configuration globale.

Commande correcte :

```bash
docker mcp client connect codex --profile agentic_se_github --global
```

`--global` signifie que la connexion Docker MCP est ajoutée à la configuration globale de Codex et n’est pas limitée à ce seul repository.

Attention : cela ne donne pas davantage de droits au profil GitHub. Les capacités restent définies par `agentic_se_github`.

---

# 26. Vérifier les clients Docker MCP globaux

Commande :

```bash
docker mcp client ls --global
```

Cette commande montre les intégrations configurées au niveau système/utilisateur.

Après connexion :

```text
codex: connected
MCP_DOCKER: Docker MCP Catalog (gateway server) (stdio)
```

Elle peut aussi afficher d’autres outils installés sur la machine. Il faut donc distinguer notre configuration de formation des configurations préexistantes.

---

# 27. Vérifier côté Codex

Commande :

```bash
codex mcp list
```

Résultat validé :

```text
MCP_DOCKER  docker  mcp gateway run --profile agentic_se_github  enabled
filesystem  npx ... @modelcontextprotocol/server-filesystem ...  enabled
```

Ainsi Codex dispose simultanément :

```text
filesystem
  → serveur MCP local configuré précédemment

MCP_DOCKER
  → gateway Docker vers GitHub Official MCP
```

Les deux configurations coexistent.

---

# 28. Pourquoi Codex affiche `Auth: Unsupported` ?

`codex mcp list` peut afficher :

```text
Auth: Unsupported
```

pour `MCP_DOCKER`.

Cela ne signifie pas que GitHub n’est pas authentifié.

L’authentification GitHub n’est simplement pas gérée directement par Codex.

Elle se trouve derrière la gateway :

```text
Codex
  ↓
MCP_DOCKER
  ↓
Docker MCP Gateway
  ↓
Docker Secret Store
  ↓
GitHub PAT
  ↓
GitHub MCP Server
```

Codex ne possède donc pas lui-même le credential GitHub.

C’est justement l’un des intérêts de cette architecture.

---

# 29. Test GitHub avec Codex

Après redémarrage de Codex :

```bash
codex
```

utiliser le même test :

```text
Utilise uniquement les outils GitHub fournis via MCP_DOCKER.

Dis-moi quel utilisateur GitHub est authentifié, puis lis le fichier README.md du repository boscherj/agentic-software-engineering depuis GitHub.

Ne lis pas le fichier local et ne modifie rien.
```

Test validé.

Nous avons donc démontré que le même profil Docker MCP et le même serveur GitHub peuvent être utilisés par plusieurs agents.

---

# 30. Architecture finale validée

```text
                       GitHub
                         ↑
               GitHub Official MCP
                         ↑
                 Docker container
                         ↑
                Docker MCP Gateway
                         ↑
              profil agentic_se_github
                         ↑
              6 outils read-only
                   ↙           ↘
          Claude Code         Codex
```

En parallèle :

```text
GitHub PAT fine-grained
   ↓
1 repository sélectionné
   ↓
Contents / Issues / PR en lecture
   ↓
Docker Secret Store
   ↓
GitHub Official MCP
```

---

# 31. Pourquoi cette architecture est meilleure qu’un token collé dans chaque agent

Une approche naïve serait :

```text
Claude → token GitHub
Codex  → token GitHub
Autre agent → token GitHub
```

Cela entraîne :

- duplication des secrets ;
- plusieurs endroits à sécuriser ;
- plusieurs configurations à maintenir ;
- davantage de risques de fuite ;
- plus de difficulté à contrôler les capacités.

Avec Docker MCP Toolkit :

```text
secret centralisé
      +
profil centralisé
      +
gateway commune
      ↓
plusieurs clients MCP
```

Cette architecture améliore la gouvernance des outils exposés aux agents.

---

# 32. Ce que Docker apporte réellement — résumé

Pour éviter toute confusion, voici la comparaison.

## Sans Docker MCP Toolkit

```text
Agent
  ↓
configuration MCP propre à l’agent
  ↓
serveur MCP
  ↓
secret à gérer
  ↓
GitHub
```

À répéter pour chaque agent.

## Avec Docker MCP Toolkit

```text
              Docker MCP Toolkit
          ┌────────┼───────────┐
       catalogue  profil     secrets
          │         │           │
          └─────────┼───────────┘
                    ↓
                 gateway
                 ↙     ↘
              Claude   Codex
                    ↓
              GitHub MCP
                    ↓
                 GitHub
```

Docker nous apporte donc ici principalement :

1. **catalogue** des serveurs ;
2. **exécution conteneurisée** du serveur ;
3. **profil** d’outils autorisés ;
4. **secret store** ;
5. **gateway** commune ;
6. **connexion standardisée** aux différents clients.

---

# 33. Ce que Docker ne garantit pas

Docker ne dispense pas de :

- limiter le token GitHub ;
- inspecter le serveur MCP ;
- limiter les outils ;
- surveiller les actions de l’agent ;
- revoir les modifications ;
- protéger les secrets ;
- vérifier les images et versions utilisées.

Il faut éviter le raisonnement :

```text
« c’est dans Docker, donc c’est sûr »
```

La bonne formulation est :

```text
Docker fournit des mécanismes supplémentaires d’isolation,
de distribution et de contrôle que nous devons configurer correctement.
```

---

# 34. Passage futur en écriture

Pour cette première étape, tout est volontairement en lecture seule.

Plus tard, nous pourrons créer un **deuxième profil** destiné à un exercice d’écriture contrôlé.

Par exemple :

```text
agentic_se_github_readonly
agentic_se_github_writer
```

Le second pourrait autoriser uniquement :

```text
create_branch
create_pull_request
```

ou d’autres outils strictement nécessaires au TP.

Il est préférable de créer un profil séparé plutôt que de transformer silencieusement le profil lecture seule en profil très permissif.

---

# 35. Checklist complète

```text
[ ] Docker Desktop est lancé
[ ] docker mcp --help fonctionne
[ ] catalogue Docker MCP importé
[ ] github-official identifié
[ ] profil agentic_se_github créé
[ ] tous les outils désactivés par défaut
[ ] seulement 6 outils read-only activés
[ ] profil inspecté avec profile show
[ ] PAT fine-grained limité au repository
[ ] permissions GitHub en lecture seule
[ ] token stocké dans Docker Secret Store
[ ] secret visible par son nom, jamais par sa valeur
[ ] Claude Code connecté au profil
[ ] configuration MCP approuvée dans Claude
[ ] lecture distante GitHub validée dans Claude
[ ] Codex connecté globalement au même profil
[ ] MCP_DOCKER visible dans codex mcp list
[ ] serveur filesystem toujours présent dans Codex
[ ] lecture distante GitHub validée dans Codex
```

---

# 36. Commandes de référence, dans l’ordre

```bash
# Inspecter Docker MCP Toolkit
docker mcp --help

# Importer le catalogue
docker mcp catalog pull mcp/docker-mcp-catalog:latest

# Vérifier le catalogue
docker mcp catalog list

# Chercher les serveurs GitHub
docker mcp catalog server ls mcp/docker-mcp-catalog:latest --filter name=github

# Créer le profil
docker mcp profile create \
  --name agentic-se-github \
  --server catalog://mcp/docker-mcp-catalog/github-official

# Vérifier son ID
docker mcp profile list

# Tout désactiver par défaut
docker mcp profile tools agentic_se_github \
  --disable-all github-official

# Activer uniquement les six outils read-only
docker mcp profile tools agentic_se_github \
  --enable github-official.get_me \
  --enable github-official.get_file_contents \
  --enable github-official.list_branches \
  --enable github-official.list_commits \
  --enable github-official.list_issues \
  --enable github-official.list_pull_requests

# Vérifier le profil
docker mcp profile show agentic_se_github

# Saisir temporairement le token sans affichage
read -s GITHUB_MCP_TOKEN

# Stocker le token dans le gestionnaire de secrets
printf '%s' "$GITHUB_MCP_TOKEN" | docker mcp secret set github.personal_access_token

# Supprimer la variable temporaire
unset GITHUB_MCP_TOKEN

# Vérifier que le secret existe
docker mcp secret ls

# Connecter Claude Code au profil du projet
docker mcp client connect claude-code --profile agentic_se_github

# Vérifier côté Claude
claude mcp list

# Connecter Codex globalement
docker mcp client connect codex --profile agentic_se_github --global

# Vérifier les clients globaux
docker mcp client ls --global

# Vérifier côté Codex
codex mcp list
```

---

# 37. Idée centrale à retenir

Docker MCP Toolkit nous permet de transformer :

```text
« donner un token GitHub à un agent »
```

en une architecture beaucoup plus contrôlée :

```text
Sélection du serveur
      ↓
Profil de capacités
      ↓
Secret centralisé
      ↓
Gateway
      ↓
Clients MCP
      ↓
Validation humaine
```

C’est une très bonne illustration de l’Agentic Software Engineering : **on ne cherche pas uniquement à rendre l’agent capable d’agir ; on conçoit l’environnement qui détermine comment, où et avec quelles permissions il peut agir.**

---

# 38. Références

- Docker MCP Catalog and Toolkit : <https://docs.docker.com/ai/mcp-catalog-and-toolkit/>
- GitHub MCP Server : <https://github.com/github/github-mcp-server>
- Model Context Protocol : <https://modelcontextprotocol.io/>
- GitHub fine-grained personal access tokens : <https://docs.github.com/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens>

Les outils évoluent rapidement. Avant chaque session de formation, revalider les commandes et les permissions avec les versions réellement installées.