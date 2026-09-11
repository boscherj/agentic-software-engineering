# Installation et validation de Docker Desktop

> Environnement de référence validé le 11 septembre 2026 sur macOS Apple Silicon.

Ce document explique **à quoi sert Docker**, pourquoi il est important dans la formation **Agentic Software Engineering**, comment installer et valider Docker Desktop, et surtout comment l’utiliser comme outil de reproductibilité et d’isolation pour des workflows où des agents peuvent exécuter du code et des commandes.

La méthode suit la structure commune aux outils de la formation :

1. à quoi sert l’outil ;
2. pourquoi il est utilisé dans la formation ;
3. installation ;
4. vérification ;
5. premier test ;
6. sécurité, isolation et usage agentique ;
7. diagnostic et checklist.

---

# 1. À quoi sert Docker ?

Docker permet d’exécuter des applications dans des **conteneurs** : des environnements isolés, reproductibles et construits à partir d’images.

Il faut distinguer plusieurs notions.

## 1.1 Docker CLI

Le CLI est la commande utilisée dans le terminal :

```bash
docker
```

Par exemple :

```bash
docker --version
docker info
docker run ...
docker ps
docker images
```

Le CLI est le **client**. Il transmet des demandes au moteur Docker.

## 1.2 Docker Engine / daemon

Le moteur Docker réalise effectivement les opérations :

- téléchargement des images ;
- création des conteneurs ;
- démarrage et arrêt ;
- réseaux ;
- volumes ;
- isolation des processus.

Schéma simplifié :

```text
Utilisateur
    ↓
docker CLI
    ↓
Docker Engine
    ↓
Images / conteneurs / réseaux / volumes
```

## 1.3 Docker Desktop sur macOS

Sur macOS, Docker Desktop fournit l’environnement permettant notamment d’exécuter le moteur Docker Linux dont les conteneurs ont besoin.

Sur le poste de référence, `docker info` indique :

```text
Context: desktop-linux
Operating System: Docker Desktop
OSType: linux
Architecture: aarch64
Kernel Version: 7.0.12-linuxkit
```

Le Mac est Apple Silicon, tandis que les conteneurs s’exécutent dans l’environnement Linux géré par Docker Desktop.

## 1.4 Image

Une **image** est un modèle immuable utilisé pour créer des conteneurs.

Exemple :

```text
hello-world:latest
```

Une image peut contenir un système minimal, un runtime, des bibliothèques, une application et sa configuration de départ.

## 1.5 Conteneur

Un **conteneur** est une instance d’exécution créée à partir d’une image.

On peut résumer :

```text
Image = modèle
Container = instance en cours d’exécution ou arrêtée
```

Une même image peut servir à créer plusieurs conteneurs.

---

# 2. Pourquoi Docker est-il important en Agentic Software Engineering ?

Un agent de développement peut être capable de :

- modifier des fichiers ;
- installer des dépendances ;
- lancer des scripts ;
- exécuter des tests ;
- appeler des outils ;
- démarrer des services ;
- utiliser le réseau selon les permissions accordées.

Plus l’agent possède de capacités, plus il est important de maîtriser **où** ces actions sont exécutées.

Docker apporte trois propriétés particulièrement utiles.

## 2.1 Reproductibilité

Au lieu de dépendre entièrement de la configuration du Mac du stagiaire :

```text
Mac A → environnement A
Mac B → environnement B
Mac C → environnement C
```

on peut décrire un environnement commun :

```text
Dockerfile / image
        ↓
environnement reproductible
        ↓
Mac A   Mac B   CI   agent
```

## 2.2 Isolation

Un processus exécuté dans un conteneur ne travaille pas automatiquement dans tout l’environnement hôte.

L’isolation n’est pas absolue et dépend de la configuration : volumes montés, réseau, privilèges, secrets, socket Docker, etc. Docker ne doit donc pas être présenté comme une frontière de sécurité magique.

Mais il permet de **réduire et contrôler la surface d’action**.

## 2.3 Environnements jetables

Un agent peut tester une opération dans un environnement que l’on peut recréer ou supprimer.

Cela est particulièrement intéressant pour :

- exécuter du code généré ;
- tester des dépendances ;
- reproduire une erreur ;
- comparer plusieurs configurations ;
- isoler certains travaux multi-agents.

---

# 3. Docker n’est pas une machine virtuelle classique

Les conteneurs utilisent les mécanismes d’isolation du système Linux et partagent le noyau de leur environnement hôte Linux.

Sur macOS, Docker Desktop doit toutefois fournir cet environnement Linux, car macOS n’est pas un hôte Linux natif pour les conteneurs Linux.

Dans notre environnement :

```text
Mac Apple Silicon
       ↓
Docker Desktop
       ↓
LinuxKit / Linux aarch64
       ↓
Docker Engine
       ↓
conteneurs Linux
```

Cette architecture explique pourquoi `docker --version` peut fonctionner alors que les conteneurs ne fonctionnent pas : le CLI peut être présent même si Docker Desktop et le moteur ne sont pas démarrés.

---

# 4. Installation sur macOS Apple Silicon

Utiliser Docker Desktop pour Mac et choisir la distribution **Apple silicon**.

Documentation officielle :

<https://docs.docker.com/desktop/setup/install/mac-install/>

Installation graphique :

1. télécharger Docker Desktop pour Mac Apple Silicon ;
2. ouvrir le fichier `.dmg` ;
3. placer Docker dans `Applications` ;
4. lancer Docker ;
5. accepter les autorisations nécessaires ;
6. attendre que Docker Desktop indique que le moteur est opérationnel.

Pour les premiers exercices, un compte Docker n’est pas nécessaire uniquement pour vérifier le fonctionnement local de Docker.

---

# 5. Le point souvent oublié : Docker Desktop doit être lancé

Sur le poste de référence, après installation mais avant lancement de Docker Desktop :

```bash
docker --version
```

fonctionnait :

```text
Docker version 29.7.2, build a7dcaa6
```

mais :

```bash
docker info
```

échouait avec :

```text
failed to connect to the docker API at unix:///var/run/docker.sock
```

C’est un cas de diagnostic très instructif.

```text
docker --version OK
       ↓
CLI présent

mais

docker info KO
       ↓
Engine inaccessible / non démarré
```

Après lancement de l’application **Docker** depuis `Applications`, le contexte actif est devenu :

```text
desktop-linux
```

et le serveur Docker est devenu accessible.

---

# 6. Vérifier l’installation

## 6.1 Version du client

```bash
docker --version
```

Environnement validé :

```text
Docker version 29.7.2, build a7dcaa6
```

## 6.2 Emplacement du CLI

```bash
which docker
```

Environnement validé :

```text
/usr/local/bin/docker
```

Cette commande permet de savoir quel exécutable est réellement résolu par le `PATH`.

## 6.3 Vérifier le moteur

```bash
docker info
```

C’est une vérification beaucoup plus complète que `docker --version`.

Elle confirme notamment sur le poste de référence :

```text
Client Version: 29.7.2
Context: desktop-linux
Server Version: 29.7.2
Operating System: Docker Desktop
OSType: linux
Architecture: aarch64
CPUs: 8
Total Memory: 3.825GiB
```

Le fait d’obtenir une section `Server` fonctionnelle prouve que le CLI communique avec le moteur Docker.

---

# 7. Docker Compose

Docker Compose permet de décrire et lancer plusieurs services coordonnés à partir d’un fichier de configuration.

Exemple conceptuel :

```text
application
   ├── API Python
   ├── base PostgreSQL
   └── service auxiliaire
```

au lieu de lancer manuellement trois conteneurs avec plusieurs commandes.

Vérification :

```bash
docker compose version
```

Sur le poste de référence :

```text
Docker Compose version v5.5.1
```

Un détail intéressant est apparu pendant l’installation : avant le démarrage de Docker Desktop, `docker compose` n’était pas disponible. Après lancement de Docker Desktop, les plugins ont été correctement exposés sous :

```text
~/.docker/cli-plugins/
```

avec notamment :

```text
docker-compose
```

Il faut donc éviter de conclure trop vite qu’il faut installer Compose séparément : vérifier d’abord que Docker Desktop est réellement démarré et que ses plugins sont disponibles.

---

# 8. Premier test : `hello-world`

Commande :

```bash
docker run --rm hello-world
```

Le poste de référence ne possédait encore aucune image locale. Docker a donc affiché :

```text
Unable to find image 'hello-world:latest' locally
```

puis a téléchargé l’image depuis Docker Hub.

L’exécution a ensuite produit :

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

Le test valide toute la chaîne :

```text
Terminal
   ↓
Docker CLI
   ↓
Docker daemon
   ↓
recherche de hello-world:latest
   ↓
image absente localement
   ↓
pull depuis le registry
   ↓
création du conteneur
   ↓
exécution du programme
   ↓
sortie renvoyée au terminal
   ↓
suppression du conteneur avec --rm
```

---

# 9. Que signifie `--rm` ?

Dans :

```bash
docker run --rm hello-world
```

`--rm` demande à Docker de supprimer automatiquement le **conteneur** après la fin de son exécution.

Cela ne signifie pas que l’image téléchargée est supprimée.

Après le test :

```text
conteneur hello-world terminé
        ↓
supprimé automatiquement

image hello-world
        ↓
reste dans le cache local
```

On peut inspecter les images avec :

```bash
docker images
```

et les conteneurs actifs avec :

```bash
docker ps
```

Tous les conteneurs, y compris arrêtés :

```bash
docker ps -a
```

---

# 10. Registry, image et pull

Lorsque Docker ne trouve pas une image localement, il peut la télécharger depuis un registry configuré.

Dans notre premier test :

```text
hello-world:latest
```

est l’image demandée.

`latest` est un **tag**. Il ne faut pas l’interpréter comme une garantie universelle de reproductibilité.

Pour des exercices reproductibles, on privilégiera lorsque cela est pertinent une version ou une référence explicitement contrôlée plutôt qu’un tag mouvant.

---

# 11. Architecture Apple Silicon

Le poste de référence utilise une architecture ARM64.

`docker info` confirme :

```text
Architecture: aarch64
```

et le téléchargement de `hello-world` a utilisé la variante :

```text
arm64v8
```

Cette information est importante lorsqu’une image ou une dépendance n’est disponible que pour certaines architectures.

Un agent qui modifie une configuration Docker doit donc comprendre que :

```text
amd64 ≠ arm64
```

même si de nombreuses images modernes sont multi-architecture.

---

# 12. Volumes : la frontière d’isolation doit être comprise

Un conteneur n’accède pas automatiquement à tout le repository de l’hôte.

Mais on peut monter explicitement des fichiers ou répertoires.

Conceptuellement :

```text
Mac
~/Dev/projet
      │
      │ volume mount
      ↓
/container/workspace
```

Dès qu’un répertoire hôte est monté en écriture, un processus ou un agent dans le conteneur peut potentiellement modifier les fichiers accessibles par ce montage.

La question n’est donc jamais seulement :

> « L’agent est-il dans Docker ? »

mais aussi :

> « Qu’avons-nous exposé au conteneur ? »

---

# 13. Réseau

Un conteneur peut disposer d’un accès réseau selon sa configuration.

Cela signifie qu’un sandboxing sérieux doit considérer plusieurs dimensions :

```text
filesystem
réseau
secrets
environment variables
processus
privilèges
volumes
socket Docker
```

Isoler les fichiers sans réfléchir au réseau ou aux secrets ne suffit pas toujours.

---

# 14. Attention au socket Docker

Donner à un conteneur ou à un agent un accès puissant au daemon Docker peut considérablement augmenter ses capacités.

Le socket ou l’API Docker ne doivent donc pas être exposés machinalement à un conteneur simplement parce que cela facilite un exercice.

Principe pédagogique :

```text
capacité minimale nécessaire
        ↓
permissions minimales nécessaires
        ↓
validation humaine
```

C’est le principe du moindre privilège appliqué aux agents de développement.

---

# 15. Docker et sandboxing des agents

Docker est utile pour créer un environnement d’exécution contrôlé, mais un conteneur ne doit pas être présenté comme une sandbox parfaite par définition.

Le niveau d’isolation dépend de la configuration.

Exemples de questions à poser avant de déléguer une commande à un agent :

- quels répertoires sont montés ?
- sont-ils en lecture seule ou lecture/écriture ?
- le réseau est-il nécessaire ?
- quels secrets sont injectés ?
- le conteneur tourne-t-il avec des privilèges excessifs ?
- le daemon Docker est-il accessible ?
- l’image utilisée est-elle maîtrisée ?
- peut-on recréer l’environnement après l’expérience ?

C’est cette réflexion qui fait de Docker un outil d’Agentic Software Engineering et non simplement un outil de packaging.

---

# 16. Plugins présents dans Docker Desktop

Le `docker info` du poste de référence expose plusieurs plugins, notamment :

```text
agent
a i
buildx
compose
debug
desktop
mcp
model
sandbox
scout
```

Les versions observées comprennent notamment :

```text
Docker Compose v5.5.1
Docker Buildx v0.36.1-desktop.1
Docker MCP Plugin v0.43.3
Docker Model Runner v1.2.6
Docker AI Agent Runner v1.128.0
```

La présence de ces plugins est particulièrement intéressante pour la formation car Docker évolue au-delà du simple lancement de conteneurs.

Cependant, **présence ne signifie pas usage automatique**. Nous n’utiliserons un plugin que lorsqu’il apporte quelque chose au scénario pédagogique et après avoir vérifié sa documentation et son comportement dans la version réellement installée.

Le plugin `sandbox` observé indique lui-même que la commande correspondante est dépréciée au profit de Docker Sandboxes. Il ne faut donc pas construire un TP sur une interface dépréciée sans réévaluation préalable.

---

# 17. Docker et MCP

Le poste de référence contient :

```text
docker mcp
```

Cette présence est pertinente pour le module consacré à **MCP et aux outils**.

Le Model Context Protocol permet à des agents et modèles d’interagir avec des outils et sources de contexte selon une interface structurée.

Docker peut être utilisé pour empaqueter, exécuter ou gérer certains composants de cette architecture.

Nous traiterons cependant MCP dans son module dédié : l’objectif de l’installation Docker est d’abord de garantir un environnement de conteneurisation fonctionnel et compris.

---

# 18. Docker et modèles / agents IA

L’installation validée expose également :

```text
docker model
docker agent
docker ai
```

Ces commandes montrent l’évolution de Docker vers des workflows liés aux modèles et agents IA.

Elles pourront servir de démonstrations complémentaires, mais elles ne constituent pas les fondations de la formation.

Les fondations restent :

```text
isolation
reproductibilité
contrôle des dépendances
contrôle de la surface d’action
```

---

# 19. Docker Compose dans les futurs exercices

Compose deviendra utile lorsque les exercices nécessiteront plusieurs composants.

Exemple :

```text
Agent
  ↓
application Python
  ↓
API
  ↓
base de données
```

Un fichier Compose peut rendre cet environnement reproductible pour tous les stagiaires.

L’objectif ne sera pas d’enseigner Docker Compose exhaustivement, mais de savoir lire et contrôler l’environnement dans lequel un agent travaille.

---

# 20. Diagnostic rapide

## Cas 1 — `docker: command not found`

Le CLI n’est pas accessible.

Vérifier l’installation et le `PATH`.

```bash
which docker
```

## Cas 2 — `docker --version` fonctionne mais `docker info` échoue

C’est exactement le cas rencontré pendant la préparation.

Cause probable : Docker Desktop / Docker Engine n’est pas démarré.

Action :

1. ouvrir `Applications` ;
2. lancer Docker ;
3. attendre que le moteur soit prêt ;
4. relancer :

```bash
docker info
```

## Cas 3 — `docker compose` inconnu

Avant d’installer Compose séparément :

1. vérifier que Docker Desktop est démarré ;
2. relancer un terminal si nécessaire ;
3. vérifier :

```bash
docker info
docker compose version
```

et éventuellement :

```bash
ls -la ~/.docker/cli-plugins
```

## Cas 4 — architecture incompatible

Vérifier :

```bash
docker info
```

et rechercher :

```text
Architecture: aarch64
```

sur le Mac Apple Silicon de référence.

---

# 21. Commandes essentielles à connaître

```bash
docker --version
docker info
docker compose version
docker images
docker ps
docker ps -a
docker run --rm hello-world
```

Pour la formation, mieux vaut comprendre parfaitement ces commandes de base que mémoriser des dizaines d’options Docker.

---

# 22. Checklist stagiaire

Avant les travaux pratiques :

```text
[ ] Docker Desktop est installé
[ ] Docker Desktop est lancé
[ ] docker --version fonctionne
[ ] which docker pointe vers le CLI attendu
[ ] docker info affiche une section Server
[ ] contexte desktop-linux actif sur le poste de référence
[ ] docker compose version fonctionne
[ ] docker run --rm hello-world fonctionne
[ ] architecture cohérente avec le poste
```

Sur le poste de référence validé :

```text
Docker CLI / Server : 29.7.2
Docker Compose : v5.5.1
Context : desktop-linux
Architecture : aarch64
Operating System : Docker Desktop
```

---

# 23. Ce que le stagiaire doit retenir

Docker n’est pas dans cette formation pour apprendre à administrer des conteneurs de production.

Il est là parce qu’un agent logiciel peut exécuter des actions réelles.

Nous devons donc être capables de construire des environnements :

```text
reproductibles
     +
isolés
     +
inspectables
     +
jetables
     +
contrôlés
```

Le raisonnement central est :

```text
Agent puissant
    ↓
Environnement maîtrisé
    ↓
Permissions minimales
    ↓
Exécution observable
    ↓
Tests et diff
    ↓
Validation humaine
```

Docker est l’un des outils permettant de mettre ce principe en pratique.

---

# 24. Références officielles

- Docker Desktop sur Mac : <https://docs.docker.com/desktop/setup/install/mac-install/>
- Docker Get Started : <https://docs.docker.com/get-started/>
- Docker Engine : <https://docs.docker.com/engine/>
- Docker Compose : <https://docs.docker.com/compose/>
- Docker security : <https://docs.docker.com/engine/security/>

Docker Desktop et ses plugins évoluent rapidement. Avant une session de formation, vérifier la version réellement distribuée et tester les commandes utilisées dans les TP sur l’environnement de référence.