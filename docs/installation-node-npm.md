# Installation et validation de Node.js, npm et nvm

> Environnement de référence validé le 11 septembre 2026 sur macOS Apple Silicon.

Ce document explique **ce que sont Node.js, npm et nvm**, pourquoi ils sont présents dans la formation **Agentic Software Engineering**, comment les installer et comment vérifier que l'environnement utilisé par le dépôt est correct.

L'objectif n'est pas seulement d'obtenir trois commandes qui fonctionnent. Un ingénieur qui travaille avec des agents doit comprendre **quel runtime exécute un outil, d'où il provient, quelle version est utilisée et comment rendre cette version reproductible pour les autres développeurs et pour les agents**.

---

# 1. À quoi servent Node.js, npm et nvm ?

Ces trois outils sont liés, mais ils ont des rôles différents.

```text
nvm
 │
 ├── installe et sélectionne une version de Node.js
 │
 ▼
Node.js
 │
 ├── exécute du JavaScript hors du navigateur
 │
 └── fournit npm
       │
       ├── installe des packages
       ├── installe des outils CLI
       └── exécute des scripts de projet
```

## 1.1 Node.js : le runtime

**Node.js** est un environnement d'exécution JavaScript. Il permet d'exécuter du JavaScript et des applications JavaScript/TypeScript en dehors d'un navigateur.

Dans un environnement de développement moderne, Node.js sert notamment à exécuter :

- des applications et services JavaScript/TypeScript ;
- des outils en ligne de commande ;
- des serveurs de développement ;
- des scripts d'automatisation ;
- de nombreux outils de l'écosystème IA et MCP.

Il faut distinguer le **langage JavaScript** du **runtime Node.js** : le premier décrit le langage, le second fournit l'environnement qui exécute le programme.

## 1.2 npm : le gestionnaire de packages

**npm** est le gestionnaire de packages historiquement associé à Node.js. Une installation standard de Node.js fournit généralement également npm.

npm permet notamment de :

- télécharger des bibliothèques et outils publiés dans le registre npm ;
- déclarer les dépendances d'un projet ;
- installer ces dépendances ;
- exécuter des scripts définis par un projet ;
- installer ou lancer certains outils CLI de l'écosystème JavaScript.

Exemples de commandes :

```bash
npm --version
npm install
npm run test
npm run lint
```

Dans un projet JavaScript/TypeScript, le fichier `package.json` joue un rôle central : il décrit notamment le projet, ses dépendances et ses scripts.

## 1.3 nvm : le gestionnaire de versions de Node.js

**nvm (Node Version Manager)** ne remplace ni Node.js ni npm. Il permet de **gérer plusieurs versions de Node.js sur une même machine** et de sélectionner celle qui doit être utilisée.

C'est particulièrement utile lorsqu'un développeur travaille sur plusieurs projets :

```text
Projet A → Node 22
Projet B → Node 24
Projet C → autre version
```

Au lieu de remplacer manuellement Node.js sur la machine, nvm permet de changer de version :

```bash
nvm use 24
```

ou, lorsqu'un projet fournit un fichier `.nvmrc` :

```bash
nvm use
```

---

# 2. Pourquoi ces outils sont-ils importants dans la formation ?

Le projet fil rouge de la formation utilise principalement **Python**, mais cela ne signifie pas que Node.js est facultatif.

Une partie importante de l'écosystème actuel des outils de développement assisté par IA est construite en JavaScript ou TypeScript et distribuée via l'écosystème Node/npm.

Node.js peut notamment être nécessaire pour :

- installer ou exécuter des CLI d'agents ;
- utiliser des outils de développement écrits en JavaScript/TypeScript ;
- exécuter certains serveurs MCP ;
- installer des packages npm utilisés par des intégrations IA ;
- construire ponctuellement des exemples ou outils JavaScript/TypeScript.

L'objectif pédagogique est également plus général : un agent logiciel qui exécute une commande dépend d'un **environnement d'exécution précis**.

```text
Agent
  ↓
commande
  ↓
runtime
  ↓
dépendances
  ↓
programme
```

Si deux développeurs ou deux agents utilisent des versions différentes du runtime, une même commande peut produire des résultats différents. La maîtrise des versions fait donc partie de la **reproductibilité du développement agentique**.

---

# 3. Environnement retenu pour la formation

L'environnement effectivement validé est :

| Composant | Version validée | Rôle |
|---|---:|---|
| nvm | **0.40.3** | gestion des versions de Node.js |
| Node.js | **24.13.0 LTS — Krypton** | runtime JavaScript |
| npm | **11.6.2** | gestionnaire de packages |

Le dépôt impose la **branche majeure Node 24** grâce au fichier `.nvmrc` :

```text
24
```

Nous choisissons une branche **LTS (Long-Term Support)** plutôt qu'une version Current afin de privilégier la stabilité et la reproductibilité pendant une formation professionnelle.

---

# 4. Vérifier si les outils sont déjà installés

Avant toute installation, toujours inspecter l'environnement existant.

```bash
node --version
npm --version
nvm --version
```

Sur le poste de référence validé :

```text
Node.js : v24.13.0
npm     : 11.6.2
nvm     : 0.40.3
```

Il est également utile de vérifier **quel exécutable est réellement appelé** :

```bash
which node
which npm
```

Sur le poste de référence :

```text
~/.nvm/versions/node/v24.13.0/bin/node
~/.nvm/versions/node/v24.13.0/bin/npm
```

Ces chemins sont instructifs : ils montrent que Node.js et npm utilisés par le terminal proviennent de l'installation gérée par **nvm**, et non d'une autre installation présente sur macOS.

---

# 5. Comprendre le PATH et `which`

Lorsqu'on tape :

```bash
node
```

le shell recherche un exécutable nommé `node` dans les répertoires du `PATH`.

Il est possible d'avoir plusieurs installations de Node.js sur une même machine. La commande :

```bash
which node
```

permet de savoir **laquelle sera effectivement exécutée**.

Cette vérification est importante pour diagnostiquer des situations du type :

- « j'ai installé Node 24 mais `node --version` affiche encore Node 22 » ;
- « le terminal VS Code n'utilise pas la même version que mon autre terminal » ;
- « l'agent exécute un outil avec une version différente de celle attendue ».

Dans un workflow agentique, ne pas connaître l'exécutable réellement utilisé peut rendre un problème difficile à reproduire.

---

# 6. Installer nvm sur macOS

Si `nvm --version` fonctionne déjà, ne pas réinstaller nvm.

Pour une nouvelle machine, utiliser la procédure officielle du projet nvm :

https://github.com/nvm-sh/nvm

Après installation, ouvrir un nouveau terminal puis vérifier :

```bash
nvm --version
```

Si la commande n'est pas reconnue alors que nvm vient d'être installé, vérifier que le script d'initialisation de nvm est chargé par le shell (`~/.zshrc` sur une configuration macOS utilisant zsh).

Ne pas multiplier inutilement les méthodes d'installation de Node.js. Pour la formation, **nvm est la méthode de référence**.

---

# 7. Installer Node.js 24 LTS avec nvm

Pour installer la branche Node 24 :

```bash
nvm install 24
```

Puis la sélectionner :

```bash
nvm use 24
```

Vérifier :

```bash
node --version
npm --version
```

Pour connaître la version actuellement sélectionnée par nvm :

```bash
nvm current
```

---

# 8. Comprendre `nvm ls`

La commande :

```bash
nvm ls
```

affiche les versions de Node.js disponibles localement ainsi que plusieurs alias.

Sur le poste de référence, deux versions sont notamment installées :

```text
v22.14.0
v24.13.0
```

La flèche `->` indique la version active.

L'alias :

```text
default -> lts/*
```

indique que le choix par défaut de ce poste est la branche LTS.

L'alias LTS courant observé lors de la validation est :

```text
lts/krypton -> v24.13.0
```

Ces alias n'ont pas le même rôle que `.nvmrc` : le réglage `default` appartient à **la machine du développeur**, alors que `.nvmrc` appartient **au projet** et peut être versionné dans Git.

---

# 9. Le fichier `.nvmrc` : versionner l'intention du projet

À la racine du dépôt, nous avons créé :

```text
.nvmrc
```

avec le contenu :

```text
24
```

Ce fichier est volontairement versionné dans Git.

Il indique que ce dépôt doit être utilisé avec la branche majeure **Node 24**.

## Pourquoi écrire `24` plutôt que `24.13.0` ?

Nous voulons standardiser la **branche LTS Node 24** tout en autorisant les mises à jour de maintenance compatibles au sein de cette branche.

Cela évite de rendre la formation dépendante d'un patch particulier sans nécessité fonctionnelle.

Pour un contexte nécessitant une reproductibilité stricte jusqu'au patch, il serait possible de fixer une version complète. Ce n'est pas le choix retenu ici.

---

# 10. Utiliser `.nvmrc`

Depuis la racine du dépôt :

```bash
nvm use
```

nvm détecte automatiquement `.nvmrc`.

Lors de la validation du poste de référence, la commande a produit :

```text
Found '.../agentic-software-engineering/.nvmrc' with version <24>
Now using node v24.13.0 (npm v11.6.2)
```

C'est le comportement attendu.

Si Node 24 n'est pas encore installé sur la machine :

```bash
nvm install
```

nvm lit `.nvmrc`, installe une version correspondant à la contrainte, puis celle-ci peut être utilisée avec :

```bash
nvm use
```

---

# 11. Reproductibilité : réglage machine contre réglage projet

Cette distinction est essentielle.

## Configuration personnelle

```text
nvm default → lts/*
```

Elle indique ce que **la machine** préfère utiliser par défaut.

## Configuration du repository

```text
.nvmrc → 24
```

Elle indique ce que **le projet** attend.

Un projet ne doit pas dépendre silencieusement des préférences personnelles de son auteur.

C'est pourquoi `.nvmrc` est versionné dans Git.

```text
GitHub repository
      │
      └── .nvmrc = 24
              │
       git clone / pull
              │
              ▼
          nvm install
          nvm use
              │
              ▼
          Node 24 LTS
```

---

# 12. npm et les dépendances d'un projet

Dans le dépôt actuel, Node.js est principalement un **prérequis d'outillage**. Nous ne créons donc pas artificiellement un `package.json` uniquement pour prouver que npm fonctionne.

Lorsqu'un véritable composant JavaScript/TypeScript sera nécessaire, npm pourra gérer ses dépendances à partir de `package.json`.

Les fichiers classiques d'un projet npm sont alors :

```text
package.json       ← description, scripts et dépendances
package-lock.json  ← résolution verrouillée des dépendances
node_modules/      ← packages installés localement
```

La logique est comparable, sans être identique, à celle utilisée dans la partie Python :

```text
Python / uv                    Node.js / npm
-------------                  -------------
pyproject.toml                 package.json
uv.lock                        package-lock.json
.venv                          node_modules
```

`node_modules/` est généralement un artefact local reconstruit à partir des fichiers versionnés et ne doit pas être ajouté au dépôt.

---

# 13. Premier test contrôlé

Le premier test consiste volontairement à vérifier le runtime sans modifier le projet :

```bash
nvm use
node --version
npm --version
```

Résultat validé sur le poste de référence :

```text
Node v24.13.0
npm 11.6.2
```

On peut ensuite vérifier que Node exécute effectivement du JavaScript :

```bash
node -e 'console.log(`Node ${process.version} fonctionne`)'
```

Cette commande exécute directement une expression JavaScript avec le runtime Node.js sans créer de fichier dans le dépôt.

---

# 14. Ce qu'un agent doit comprendre de cet environnement

Un agent intervenant sur ce dépôt ne doit pas décider arbitrairement de changer la version de Node.js ou d'introduire un gestionnaire de packages supplémentaire.

Avant d'utiliser Node.js, il doit pouvoir observer :

```text
repository
  │
  ├── .nvmrc → Node 24
  │
  ├── AGENTS.md → règles du repository
  │
  └── éventuel package.json → dépendances et scripts
```

Le développeur doit de son côté contrôler les commandes proposées par l'agent, particulièrement lorsqu'elles :

- installent globalement un package ;
- changent de version de Node.js ;
- modifient `package.json` ou un lockfile ;
- exécutent des scripts téléchargés ;
- introduisent une nouvelle dépendance.

L'Agentic Software Engineering ne consiste pas à laisser l'agent modifier librement l'environnement : **l'environnement fait partie du contrat d'exécution de l'agent**.

---

# 15. Diagnostic rapide

## `nvm: command not found`

Vérifier que nvm est installé et que son initialisation est chargée par le shell. Sur macOS avec zsh, inspecter notamment `~/.zshrc` et rouvrir le terminal après modification.

## Mauvaise version de Node.js

Exécuter :

```bash
which node
node --version
nvm current
nvm use
```

Cela permet de distinguer un problème de version d'un problème de `PATH`.

## `.nvmrc` n'est pas détecté

Vérifier que la commande est exécutée depuis la racine du dépôt ou l'un de ses sous-répertoires selon le comportement de l'outil, et vérifier le fichier :

```bash
cat .nvmrc
```

Il doit contenir :

```text
24
```

## Node 24 n'est pas installé

Depuis la racine :

```bash
nvm install
nvm use
```

---

# 16. Checklist de validation

Avant la formation, chaque poste doit permettre de valider les points suivants :

- [ ] `nvm --version` fonctionne ;
- [ ] `node --version` retourne une version Node 24 ;
- [ ] `npm --version` fonctionne ;
- [ ] `which node` pointe vers l'installation attendue ;
- [ ] `which npm` pointe vers la même installation nvm ;
- [ ] `.nvmrc` existe à la racine du dépôt ;
- [ ] `.nvmrc` contient `24` ;
- [ ] `nvm use` détecte `.nvmrc` ;
- [ ] `nvm current` indique Node 24 ;
- [ ] aucun changement non souhaité n'est créé dans Git lors de ces vérifications.

---

# 17. Procédure courte pour un stagiaire

Après clonage du repository :

```bash
git clone <URL_DU_REPOSITORY>
cd agentic-software-engineering
nvm install
nvm use
node --version
npm --version
```

Puis poursuivre avec les autres prérequis de la formation.

---

# 18. À retenir

```text
nvm  = choisit et installe la version de Node.js
Node = exécute JavaScript/TypeScript et les outils qui en dépendent
npm  = gère les packages de l'écosystème Node.js
.nvmrc = exprime la version Node attendue par le repository
```

Dans cette formation, Node.js n'est pas le langage principal du projet fil rouge. Il constitue une **brique d'infrastructure de l'écosystème de développement agentique**. Le choix de Node 24 LTS et sa déclaration dans `.nvmrc` permettent d'obtenir un environnement compréhensible, contrôlé et reproductible.

## Références officielles

- Node.js : https://nodejs.org/
- npm : https://docs.npmjs.com/
- nvm : https://github.com/nvm-sh/nvm
