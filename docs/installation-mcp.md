# MCP — configuration et validation avec Claude Code et Codex

> Procédure validée le 15 septembre 2026 sur le repository `agentic-software-engineering`.

Ce guide introduit Model Context Protocol (MCP) avec une expérience simple : exposer le même serveur MCP `filesystem` à Claude Code puis à OpenAI Codex CLI.

> Pour la configuration **GitHub MCP via Docker MCP Toolkit** (catalogue, profil, allowlist read-only, secrets, gateway, connexion Claude Code/Codex), voir le guide détaillé : [`github-mcp-avec-docker.md`](github-mcp-avec-docker.md).

## 1. À quoi sert MCP ?

MCP fournit une interface standardisée entre une application agentique et des capacités externes.

```text
Agent / application
        ↓
    client MCP
        ↓
    protocole MCP
        ↓
    serveur MCP
        ↓
outils / ressources / systèmes externes
```

L’intérêt est de découpler l’agent de l’intégration. Un même serveur compatible peut être consommé par plusieurs clients MCP.

## 2. Pourquoi MCP dans la formation ?

Un agent de développement doit souvent lire des fichiers, rechercher de l’information, appeler une API ou utiliser des outils spécialisés. MCP permet d’exposer ces capacités par une interface commune.

Chaque outil augmente cependant les capacités de l’agent. MCP doit donc être étudié avec les notions de permissions, périmètre, secrets, authentification, validation humaine et moindre privilège.

## 3. Premier scénario

Nous utilisons :

```text
@modelcontextprotocol/server-filesystem
```

et ne lui accordons que :

```text
/Users/jackieboscher/Dev/agentic-software-engineering
```

Architecture :

```text
Claude Code ─┐
             ├── MCP / stdio ──> npx
Codex ───────┘                    ↓
                    server-filesystem
                              ↓
                    repository autorisé
```

## 4. Prérequis

Node.js, npm/npx, Claude Code, Codex CLI et le repository local doivent déjà être installés. Voir les autres guides du répertoire `docs/`.

## 5. Vérifier Claude Code

```bash
claude mcp --help
```

La version validée expose notamment `add`, `get`, `list`, `login`, `logout`, `remove` et `serve`.

État initial :

```bash
claude mcp list
```

```text
No MCP servers configured. Use `claude mcp add` to add a server.
```

## 6. Vérifier Codex

```bash
codex mcp --help
codex mcp add --help
```

La syntaxe observée est :

```text
codex mcp add [OPTIONS] <NAME> (--url <URL> | -- <COMMAND>...)
```

Elle distingue un serveur HTTP (`--url`) d’un processus local (`-- <COMMAND>...`).

L’état initial de `codex mcp list` contenait déjà des entrées internes à l’environnement ChatGPT/Codex (`codex_app`, `computer-use`, `cua_repl`, `node_repl`). Elles ne constituent pas notre serveur pédagogique filesystem.

## 7. Docker MCP Toolkit

Docker Desktop expose également :

```bash
docker mcp --help
```

avec notamment `catalog`, `client`, `gateway`, `oauth`, `profile`, `secret`, `server` et `tools`.

Nous ne l’utilisons volontairement pas pour la première expérience : un serveur local `stdio` rend le mécanisme plus transparent. Docker MCP sera étudié ensuite dans le guide dédié GitHub MCP.

## 8. Comprendre `stdio`

`stdio` signifie standard input / standard output. Le client lance le processus serveur et communique avec lui par ses flux standard.

```text
Claude Code ou Codex
        ↓ lance
       npx
        ↓
serveur MCP filesystem

client ⇄ stdin/stdout ⇄ serveur
```

Aucun port ni serveur HTTP n’est nécessaire pour cette expérience locale.

## 9. Pourquoi `npx` ?

La commande utilise :

```text
npx -y @modelcontextprotocol/server-filesystem ...
```

`npx` permet d’exécuter un package Node.js sans installation globale préalable. `-y` accepte automatiquement la confirmation éventuelle de npx.

Pour une formation reproductible, la version du package doit être revalidée avant chaque session et pourra être figée si nécessaire.

## 10. Ajouter filesystem à Claude Code

Depuis le repository :

```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /Users/jackieboscher/Dev/agentic-software-engineering
```

Résultat validé :

```text
Added stdio MCP server filesystem with command: npx -y @modelcontextprotocol/server-filesystem /Users/jackieboscher/Dev/agentic-software-engineering to local config
File modified: /Users/jackieboscher/.claude.json [project: /Users/jackieboscher/Dev/agentic-software-engineering]
```

## 11. Vérifier Claude

```bash
claude mcp list
```

```text
filesystem: npx -y @modelcontextprotocol/server-filesystem /Users/jackieboscher/Dev/agentic-software-engineering - ✔ Connected
```

Puis :

```bash
claude mcp get filesystem
```

Résultat validé :

```text
Scope: Local config (private to you in this project)
Status: ✔ Connected
Type: stdio
Command: npx
Args: -y @modelcontextprotocol/server-filesystem /Users/jackieboscher/Dev/agentic-software-engineering
```

Suppression éventuelle :

```bash
claude mcp remove filesystem -s local
```

## 12. Configuration locale et configuration partagée

Claude indique `Scope: Local config (private to you in this project)` et modifie `~/.claude.json`.

Cette configuration n’est donc pas un fichier MCP versionné dans le repository. Il faut distinguer configuration personnelle locale et configuration projet partageable. Une configuration partagée ne doit jamais servir à versionner des secrets.

## 13. Test réel avec Claude

Lancer :

```bash
claude
```

Puis :

```text
Quels outils MCP sont à ta disposition via le serveur filesystem ?
Ne modifie aucun fichier.
```

et :

```text
Utilise le serveur MCP filesystem pour lister le contenu du répertoire autorisé.
Ne modifie aucun fichier.
```

Tests validés.

Il est important de demander explicitement l’utilisation du serveur MCP : Claude possède déjà des outils natifs permettant de lire le repository. Une réponse correcte ne prouverait donc pas, à elle seule, que MCP a été utilisé.

## 14. Ajouter le même serveur à Codex

```bash
codex mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /Users/jackieboscher/Dev/agentic-software-engineering
```

Puis :

```bash
codex mcp list
codex mcp get filesystem
```

Configuration validée sur le poste de référence.

## 15. Test réel avec Codex

Lancer :

```bash
codex
```

Puis :

```text
Quels outils MCP sont à ta disposition via le serveur filesystem ?
Ne modifie aucun fichier.
```

et :

```text
Utilise le serveur MCP filesystem pour lister le contenu du répertoire autorisé.
Ne modifie aucun fichier.
```

Tests validés.

Nous avons ainsi démontré qu’un même type de serveur MCP peut être utilisé par deux agents différents via une interface commune.

## 16. Le chemin filesystem est une permission

Le chemin :

```text
/Users/jackieboscher/Dev/agentic-software-engineering
```

n’est pas un simple paramètre fonctionnel. Il délimite ce que nous choisissons d’exposer au serveur filesystem.

Principe :

```text
besoin de l’agent
      ↓
outil nécessaire
      ↓
permission minimale
      ↓
périmètre minimal
```

Accorder le repository est préférable à accorder inutilement tout le répertoire personnel.

## 17. MCP n’implique pas automatiquement la sécurité

MCP standardise l’interaction ; il ne rend pas automatiquement sûre toute capacité exposée. Avant d’ajouter un serveur, vérifier son origine, le code exécuté, les outils exposés, les fichiers accessibles, le réseau, les secrets, les API accessibles et les validations humaines nécessaires.

## 18. Attention à `npx -y`

`npx -y package` est pratique, mais autorise l’exécution d’un package récupéré via l’écosystème npm. En environnement professionnel : vérifier l’origine, privilégier les références officielles, envisager le pinning de version et ne pas exécuter aveuglément une commande MCP trouvée sur Internet.

Un serveur MCP est du code exécuté avec des capacités.

## 19. MCP et outils natifs

MCP ne remplace pas nécessairement les outils intégrés à Claude Code ou Codex :

```text
outils natifs
     +
serveurs MCP
     ↓
capacités disponibles
```

C’est pourquoi nos tests imposent explicitement l’usage de `filesystem`.

## 20. `stdio` versus HTTP

Notre premier serveur est local et lancé comme processus. Pour un serveur distant, les clients peuvent aussi prendre en charge un transport HTTP compatible. Codex matérialise cette distinction avec `--url <URL>` pour HTTP et `-- <COMMAND>...` pour un processus local.

Nous introduirons HTTP lorsqu’un scénario distant le justifiera.

## 21. Authentification et secrets

Claude Code et Codex exposent `login` et `logout` pour des scénarios nécessitant une authentification. Les tokens et clés ne doivent jamais être placés en clair dans Git simplement pour simplifier une configuration MCP.

```text
secret ≠ fichier versionné
```

## 22. Pourquoi ne pas commencer par GitHub MCP ?

GitHub introduit immédiatement authentification, tokens, permissions et opérations distantes. Filesystem permet d’isoler d’abord le concept MCP.

La suite est désormais documentée en détail dans [`github-mcp-avec-docker.md`](github-mcp-avec-docker.md).

Progression retenue :

```text
1. filesystem local
2. outils + scope + stdio
3. même serveur avec plusieurs agents
4. GitHub MCP via Docker
5. secrets + allowlist + gateway
6. clients Claude Code et Codex
```

## 23. Diagnostic

Claude :

```bash
claude mcp --help
claude mcp list
claude mcp get filesystem
```

Codex :

```bash
codex mcp --help
codex mcp add --help
codex mcp list
codex mcp get filesystem
```

Docker :

```bash
docker mcp --help
```

Les interfaces MCP évoluent rapidement : préférer les commandes `--help`, `list` et `get` aux suppositions sur leur syntaxe.

## 24. Checklist

```text
[ ] Node/npm/npx fonctionnent
[ ] Claude expose `claude mcp`
[ ] Codex expose `codex mcp`
[ ] état initial inspecté
[ ] filesystem ajouté à Claude
[ ] Claude affiche Connected
[ ] Claude confirme stdio + npx + bon chemin
[ ] test MCP explicite réussi dans Claude
[ ] filesystem ajouté à Codex
[ ] Codex liste filesystem
[ ] `codex mcp get filesystem` est cohérent
[ ] test MCP explicite réussi dans Codex
[ ] aucun secret ajouté au repository
[ ] périmètre filesystem limité au repository
```

## 25. Ce que le stagiaire doit retenir

MCP n’est pas l’agent. MCP est une interface permettant à un client compatible d’utiliser des capacités exposées par un serveur MCP.

Le raisonnement à conserver est :

```text
Je veux donner une capacité à l’agent
             ↓
Quel serveur l’expose ?
             ↓
Quel transport utilise-t-il ?
             ↓
Quel périmètre lui est accordé ?
             ↓
Quels risques introduit-il ?
             ↓
Comment vérifier son utilisation réelle ?
```

## 26. Étapes suivantes

1. Comparer MCP aux outils natifs de Claude Code et Codex.
2. Étudier une configuration MCP partageable au niveau projet.
3. Approfondir GitHub MCP via Docker MCP Toolkit.
4. Construire un petit serveur MCP afin de comprendre le protocole côté serveur.

## 27. Références

- Model Context Protocol : <https://modelcontextprotocol.io/>
- Spécification : <https://modelcontextprotocol.io/specification/>
- Serveurs MCP : <https://github.com/modelcontextprotocol/servers>
- Claude Code MCP : <https://docs.anthropic.com/en/docs/claude-code/mcp>
- OpenAI Codex : <https://github.com/openai/codex>
- Docker MCP Toolkit : <https://docs.docker.com/ai/mcp-catalog-and-toolkit/>
- Guide détaillé GitHub MCP : [`github-mcp-avec-docker.md`](github-mcp-avec-docker.md)

Avant une session de formation, vérifier les versions réellement installées et revalider les commandes sur l’environnement de référence.