# Installation et validation de Claude Code

> Environnement de référence validé le 11 septembre 2026 sur macOS Apple Silicon.

Ce document explique **ce qu’est Claude Code**, pourquoi nous l’utilisons dans la formation **Agentic Software Engineering**, comment l’installer, le valider, comprendre son modèle de permissions et vérifier son fonctionnement sur un repository réel.

La méthode retenue suit la structure commune aux autres outils de la formation :

1. à quoi sert l’outil ;
2. pourquoi il est utilisé dans la formation ;
3. installation ou vérification de présence ;
4. authentification et configuration ;
5. validation fonctionnelle ;
6. premier test sur le repository ;
7. points de sécurité et de diagnostic.

---

# 1. À quoi sert Claude Code ?

**Claude Code est un agent de développement logiciel en ligne de commande.**

Contrairement à un simple assistant de complétion, il peut travailler à l’échelle d’un repository complet et utiliser le terminal comme environnement d’action.

Il peut notamment :

- explorer un codebase ;
- lire plusieurs fichiers pour comprendre une architecture ;
- rechercher où se trouve une fonctionnalité ;
- proposer un plan ;
- modifier plusieurs fichiers ;
- créer de nouveaux fichiers ;
- exécuter des commandes shell ;
- lancer des tests ;
- analyser les erreurs ;
- corriger le code puis relancer les tests ;
- utiliser Git ;
- travailler dans un worktree ;
- utiliser des serveurs MCP ;
- lancer ou coordonner des sous-agents selon la configuration.

Le workflow typique n’est donc plus :

```text
Développeur → question → suggestion de code
```

mais davantage :

```text
Ingénieur
   ↓
objectif / tâche
   ↓
Claude Code
   ├── explore le repository
   ├── lit les instructions du projet
   ├── planifie
   ├── modifie les fichiers
   ├── exécute des commandes
   ├── lance les tests
   ├── observe les erreurs
   └── corrige
   ↓
Ingénieur : contrôle, diff, validation
```

Claude Code illustre donc directement le passage du **coding assisté par IA** à l’**Agentic Software Engineering**.

---

# 2. Pourquoi Claude Code est-il important dans la formation ?

Nous utilisons Claude Code pour plusieurs raisons pédagogiques.

## 2.1 Montrer qu’un agent n’est pas nécessairement lié à l’IDE

GitHub Copilot est fortement intégré à VS Code. Claude Code permet de montrer une autre architecture :

```text
VS Code
  ├── code
  ├── Git
  └── terminal
        ↓
     Claude Code
```

L’IDE reste le poste de travail de l’ingénieur, mais l’agent peut vivre dans le terminal et agir directement sur le repository.

## 2.2 Travailler sur des tâches complètes

Claude Code est particulièrement adapté aux exercices où l’on veut déléguer une tâche de bout en bout :

```text
issue
  ↓
analyse
  ↓
plan
  ↓
modifications
  ↓
tests
  ↓
corrections
  ↓
diff
```

## 2.3 Comparer plusieurs agents

La formation utilise plusieurs agents : GitHub Copilot, Claude Code et OpenAI Codex CLI.

L’objectif est de distinguer :

- les principes généraux de l’Agentic Software Engineering ;
- les choix d’interface propres à chaque outil ;
- leur niveau d’autonomie ;
- leur manière d’explorer un repository ;
- leur gestion des permissions ;
- leur comportement face aux tests et aux erreurs.

Nous pourrons donc confier une même catégorie de tâche à plusieurs agents et comparer les résultats.

---

# 3. Installation validée sur le poste de référence

Sur le poste utilisé pour préparer la formation, Claude Code était déjà installé.

La commande :

```bash
claude --version
```

a retourné :

```text
2.1.259 (Claude Code)
```

La commande :

```bash
which claude
```

a retourné :

```text
/Users/jackieboscher/.local/bin/claude
```

Claude Code n’était pas installé comme package npm global. La commande :

```bash
npm list -g --depth=0 | grep claude
```

n’a retourné aucun package Claude Code.

Cela confirme que l’installation utilisée est une **installation native** et non une installation globale npm.

---

# 4. Vérifier le type d’installation avec `claude doctor`

La commande de diagnostic principale est :

```bash
claude doctor
```

Sur le poste de référence, elle a confirmé :

```text
Running: native (2.1.259)
Platform: darwin-arm64
Config install method: native
Search: OK (bundled)
Auto-updates: enabled
Auto-update channel: latest
No installation issues found.
```

Le binaire utilisé est stocké sous :

```text
~/.local/share/claude/versions/2.1.259
```

et le lanceur accessible dans le `PATH` est :

```text
~/.local/bin/claude
```

Cette distinction est importante : un poste peut contenir plusieurs méthodes d’installation concurrentes. Pour diagnostiquer une anomalie, il faut toujours vérifier **quel exécutable est réellement lancé**.

Commandes utiles :

```bash
which claude
claude --version
claude doctor
```

---

# 5. Installation native : méthode de référence pour la formation

Pour la formation, nous retenons la **méthode native** comme méthode principale lorsque cela est possible.

Claude Code fournit une commande d’installation native :

```bash
claude install
```

Le help de la version validée indique qu’elle accepte un canal ou une version cible :

```text
claude install [target]
```

avec notamment :

```text
stable
latest
ou une version spécifique
```

Exemples :

```bash
claude install stable
```

ou :

```bash
claude install latest
```

Pour un environnement de formation, l’objectif n’est pas d’être en permanence sur la toute dernière build publiée, mais d’utiliser une version stable et testée avant la session.

---

# 6. Politique de versions

Le poste de référence utilise :

```text
Claude Code 2.1.259
```

`claude doctor` indique :

```text
Auto-updates: enabled
Auto-update channel: latest
```

Cela signifie que cette installation peut évoluer automatiquement.

Pour une formation professionnelle, la bonne pratique est de **valider la version quelques jours avant la session** et d’éviter une mise à jour non testée juste avant les exercices.

La formation ne doit donc pas dépendre d’une fonctionnalité apparue le matin même.

Commandes utiles :

```bash
claude --version
claude update
claude install stable
```

---

# 7. Authentification et facturation

Au lancement de Claude Code sur le poste de référence, l’interface a affiché :

```text
Claude Code v2.1.259
Opus 5 (1M context) · API Usage Billing
~/Dev/agentic-software-engineering
```

Cela montre que la session active utilise une configuration **API Usage Billing**.

Il faut distinguer cette situation du **Remote Control**, qui est une fonctionnalité séparée.

`claude doctor` a indiqué que le Remote Control n’était pas actif :

```text
Remote Control requires a claude.ai subscription.
Not signed in to claude.ai
claude.ai subscription auth not active
```

Cela n’empêche pas Claude Code de fonctionner localement avec le mode d’authentification déjà disponible.

Claude Code fournit également :

```bash
claude auth
```

pour gérer l’authentification.

Pour une formation, il faut vérifier avant la session que chaque participant dispose d’un mode d’authentification autorisé et fonctionnel.

---

# 8. Premier lancement dans un repository : workspace trust

Lors du premier lancement dans le repository :

```bash
claude
```

Claude Code a affiché un avertissement de sécurité demandant si le dossier courant était un projet de confiance.

Le message précisait notamment que Claude Code pourrait :

- lire les fichiers ;
- modifier les fichiers ;
- exécuter des fichiers ou commandes dans ce dossier.

Cette étape est fondamentale.

Un agent CLI ne doit pas être lancé aveuglément dans un repository inconnu.

Le bon raisonnement est :

```text
Repository connu / de confiance
        ↓
      OUI
        ↓
Claude Code peut recevoir un accès contrôlé
```

mais :

```text
Repository inconnu
        ↓
examiner d’abord les fichiers
        ↓
comprendre scripts et dépendances
        ↓
seulement ensuite accorder la confiance
```

Cette vérification fait partie des mécanismes de sécurité que nous enseignerons.

---

# 9. Interface et modèle utilisé

Une fois le repository approuvé, Claude Code a démarré dans :

```text
~/Dev/agentic-software-engineering
```

avec :

```text
Opus 5 (1M context)
```

Cette information décrit le modèle actif et la taille de contexte présentée par l’interface de cette session.

Le modèle peut être choisi explicitement avec :

```bash
claude --model <model>
```

Il est également possible de régler l’effort :

```bash
claude --effort low
claude --effort medium
claude --effort high
```

La formation ne cherchera pas à multiplier les combinaisons de modèles. L’objectif est de comprendre le workflow agentique avant d’optimiser le choix du modèle.

---

# 10. Permissions : principe central

Claude Code peut exécuter des actions puissantes. Son CLI expose donc plusieurs mécanismes de contrôle.

Le help validé montre notamment :

```text
--allowed-tools
--disallowed-tools
--permission-mode
--restricted
--dangerously-skip-permissions
```

## 10.1 Outils autorisés et interdits

Il est possible de limiter les outils disponibles :

```bash
claude --allowed-tools "Read"
```

ou d’interdire certaines catégories :

```bash
claude --disallowed-tools "Bash"
```

Le but est d’appliquer le **principe du moindre privilège** : donner à l’agent uniquement les capacités nécessaires.

## 10.2 Modes de permission

La version validée expose notamment les modes :

```text
acceptEdits
auto
bypassPermissions
manual
dontAsk
plan
```

Ces modes permettent d’adapter le niveau d’autonomie au type d’exercice.

Pour apprendre ou travailler sur un projet sensible, privilégier des modes qui conservent des points de validation humaine.

## 10.3 `--dangerously-skip-permissions`

Claude Code propose aussi :

```bash
--dangerously-skip-permissions
```

Le nom est volontairement explicite.

Ce mode contourne les vérifications de permission. Il ne doit pas devenir le mode normal d’utilisation.

La documentation intégrée indique qu’il est destiné à des environnements fortement isolés, par exemple des sandboxes sans accès Internet.

Dans cette formation, nous insisterons sur le fait que :

```text
plus d’autonomie
    ≠
moins de contrôle
```

---

# 11. Mode restreint

Le CLI expose également :

```bash
claude --restricted
```

Ce mode retire par défaut certains outils capables d’exécuter du code ou des commandes et limite davantage l’accès aux fichiers et à la configuration.

C’est un bon exemple pédagogique de **réduction de surface d’action** d’un agent.

---

# 12. Context Engineering dans Claude Code

Claude Code ne travaille pas uniquement à partir du prompt courant.

Il peut utiliser plusieurs sources de contexte :

- fichiers du repository ;
- documentation ;
- structure du projet ;
- état Git ;
- fichiers d’instructions ;
- serveurs MCP ;
- settings et agents personnalisés.

Le help montre notamment l’auto-discovery de `CLAUDE.md` dans certains modes et la possibilité de fournir du contexte supplémentaire avec :

```bash
--add-dir
--append-system-prompt
--system-prompt
--settings
--agents
--mcp-config
```

Dans notre repository, `AGENTS.md` contient déjà des règles génériques destinées aux agents. Nous testerons et documenterons séparément la manière dont chaque agent consomme les instructions projet.

---

# 13. Premier test de compréhension du repository

Nous avons volontairement commencé par une tâche **non destructive**.

Prompt utilisé :

```text
Analyse ce repository sans modifier aucun fichier.
```

Claude Code a répondu correctement en comprenant l’objectif et la structure générale du repository.

Ce test est particulièrement intéressant parce que le prompt ne lui indiquait pas quels fichiers lire.

L’agent devait donc :

1. inspecter le repository ;
2. décider quels fichiers étaient pertinents ;
3. reconstruire son contexte ;
4. répondre sans modifier le projet.

Ce type de test permet de vérifier une compétence centrale d’un agent de développement : **comprendre un codebase avant d’agir**.

---

# 14. Pourquoi commencer par un test sans modification ?

Avant de déléguer une écriture, il est utile de valider :

```text
compréhension
   ↓
contexte
   ↓
instructions
   ↓
action
```

plutôt que :

```text
action immédiate
   ↓
problème éventuel
   ↓
compréhension a posteriori
```

Cette discipline sera utilisée dans les premiers exercices de la formation.

---

# 15. Git worktrees

La version validée expose une option très intéressante :

```bash
claude --worktree
```

Elle permet de créer un worktree Git pour une session.

C’est particulièrement pertinent lorsque plusieurs agents travaillent en parallèle :

```text
main
  ├── worktree-claude-a
  ├── worktree-claude-b
  └── worktree-codex
```

Chaque agent peut alors travailler dans un espace de fichiers séparé tout en partageant le même repository Git.

Cette capacité sera approfondie dans le module **workflows multi-agents**.

---

# 16. Background agents et sous-agents

Le help expose également :

```text
claude agents
claude --bg
claude attach
claude logs
claude stop
```

ainsi que des options pour définir des agents personnalisés :

```bash
--agent
--agents
```

Cela permet de construire des workflows où plusieurs tâches sont exécutées de façon distincte ou parallèle.

Nous ne considérerons pas cette fonctionnalité comme un simple gadget de productivité : elle pose immédiatement des questions d’isolation, de coordination, de ressources et de revue.

---

# 17. MCP

Claude Code intègre directement la gestion du Model Context Protocol avec :

```bash
claude mcp
```

et :

```bash
--mcp-config
```

MCP permet à l’agent d’accéder à des outils et systèmes externes selon une interface standardisée.

Ce sujet sera traité dans le module dédié **MCP et outils**.

La règle générale reste : ne connecter que les outils réellement nécessaires à la tâche.

---

# 18. Diagnostic

## Vérification rapide

```bash
claude --version
which claude
claude doctor
```

## Diagnostic complet dans une session

Le message de `claude doctor` indique également qu’un diagnostic plus complet peut être lancé depuis Claude Code avec :

```text
/doctor
```

## Vérifier les mises à jour

```bash
claude update
```

## Consulter le help

```bash
claude --help
```

Ces commandes doivent être privilégiées avant de réinstaller l’outil.

---

# 19. Ne pas multiplier les installations

Si `which claude` pointe déjà vers une installation native fonctionnelle, ne pas installer en parallèle une seconde copie globale avec npm sans raison.

Une situation comme :

```text
/usr/local/bin/claude
~/.local/bin/claude
~/.nvm/.../bin/claude
```

peut rendre le diagnostic difficile : la version exécutée dépend alors du `PATH`.

Règle de formation : **une méthode d’installation claire, un binaire identifiable, une version vérifiée**.

---

# 20. Copier un prompt multiligne

Dans le terminal intégré de VS Code sur macOS, un prompt peut être préparé dans un autre éditeur puis collé en une seule fois avec :

```text
Cmd + V
```

Il n’est pas nécessaire de saisir les lignes une à une.

Pour les exercices de formation, nous fournirons des prompts copiables afin que les différences observées entre agents ne proviennent pas d’erreurs de saisie.

---

# 21. Checklist de validation

Avant les exercices Claude Code, vérifier :

- [ ] `claude --version` fonctionne ;
- [ ] `which claude` pointe vers le binaire attendu ;
- [ ] `claude doctor` ne signale pas de problème d’installation ;
- [ ] la plateforme correspond à la machine utilisée ;
- [ ] le mode d’authentification permet réellement une session ;
- [ ] `claude` démarre dans le repository attendu ;
- [ ] le workspace trust a été compris et validé uniquement pour un dépôt de confiance ;
- [ ] l’agent peut analyser le repository sans modification ;
- [ ] les participants comprennent le modèle de permissions ;
- [ ] aucune option de bypass des permissions n’est utilisée par défaut.

---

# 22. Procédure courte pour un poste de formation

Vérification :

```bash
claude --version
which claude
claude doctor
```

Puis depuis la racine du projet :

```bash
claude
```

Valider le repository uniquement s’il est connu et de confiance.

Premier test :

```text
Analyse ce repository sans modifier aucun fichier.
```

---

# 23. À retenir

```text
Claude Code
  = agent de développement en terminal

Il peut :
  lire
  rechercher
  planifier
  modifier
  exécuter
  tester
  corriger
  utiliser Git
  utiliser MCP

L’ingénieur reste responsable de :
  la tâche
  le contexte
  les permissions
  les tests
  la revue
  l’intégration
```

Claude Code est donc un excellent outil pour enseigner l’Agentic Software Engineering, précisément parce qu’il rend visible la transition entre **assistant conversationnel** et **agent capable d’agir sur un environnement logiciel réel**.

## Références officielles

- Documentation Claude Code : https://docs.anthropic.com/en/docs/claude-code
- Claude Code overview : https://docs.anthropic.com/en/docs/claude-code/overview
- GitHub Anthropic / Claude Code : https://github.com/anthropics/claude-code
