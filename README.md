# Agentic Software Engineering

Support de formation BackProp consacré à l’ingénierie logicielle augmentée par des agents IA.

## Objectifs

Cette formation vise à apprendre à concevoir, piloter, contrôler et sécuriser des workflows de développement logiciel dans lesquels des agents IA interviennent sur un dépôt de code réel.

Les participants apprendront notamment à :

- distinguer assistant de code, agent de développement et workflow multi-agent ;
- fournir le bon contexte à un agent ;
- utiliser GitHub Copilot, Claude Code et OpenAI Codex ;
- structurer les instructions persistantes du dépôt ;
- déléguer des tâches de développement complètes ;
- faire exécuter tests, linting et validations par les agents ;
- utiliser Git, les branches, les pull requests et les worktrees pour isoler le travail ;
- intégrer des outils externes via MCP ;
- contrôler les permissions, la sécurité et les actions autonomes ;
- organiser des workflows dans lesquels l’ingénieur devient l’orchestrateur des agents.

## Environnement de référence

- Visual Studio Code Stable
- GitHub + GitHub CLI
- GitHub Copilot
- Claude Code
- OpenAI Codex CLI
- Git
- Python 3.14.x
- pytest
- Ruff
- Node.js 24 LTS
- Docker Desktop

Les numéros de patch évoluent rapidement : la formation privilégie les versions stables courantes des outils, tout en figeant les versions majeures utilisées dans les exercices.

## Parcours

1. [Fondamentaux de l’Agentic Software Engineering](01-fondamentaux-agentic-se/README.md)
2. [GitHub Copilot et Agent Mode](02-copilot-agent-mode/README.md)
3. [Claude Code](03-claude-code/README.md)
4. [OpenAI Codex](04-openai-codex/README.md)
5. [Context Engineering](05-context-engineering/README.md)
6. [MCP et outils](06-mcp-tools/README.md)
7. [Workflows multi-agents](07-multi-agent-workflows/README.md)
8. [Tests, revue et sécurité](08-testing-review-security/README.md)
9. [Projet de synthèse](09-capstone-project/README.md)

## Philosophie pédagogique

Le cours n’est pas centré sur un produit. Le même dépôt et les mêmes tâches seront utilisés avec plusieurs agents afin de comparer leurs comportements et d’enseigner les principes durables de l’Agentic Software Engineering.

Un projet fil rouge sera progressivement enrichi au cours de la formation.
