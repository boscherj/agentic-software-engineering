# Git et GitHub CLI : installation, rôle et validation

Ce document décrit la procédure réellement suivie et validée pour préparer **Git** et **GitHub CLI (`gh`)** dans l’environnement de formation **Agentic Software Engineering**.

La structure retenue pour les outils de la formation est toujours la même :

1. à quoi sert l’outil ;
2. pourquoi il est important dans la formation ;
3. installation ou mise à jour ;
4. vérification ;
5. premier test fonctionnel.

## 1. À quoi sert Git ?

**Git est le système de gestion de versions utilisé pour suivre les modifications d’un projet logiciel.**

Il permet notamment de :

- enregistrer l’historique des modifications ;
- comparer des versions ;
- revenir en arrière ;
- créer des branches isolées ;
- fusionner des changements ;
- travailler à plusieurs sur le même repository ;
- préparer des pull requests ;
- isoler le travail de plusieurs agents.

Dans un workflow de développement classique, Git sert à organiser le travail humain.

Dans un workflow **agentique**, il devient encore plus important car il fournit les mécanismes de contrôle nécessaires pour déléguer des tâches à un ou plusieurs agents sans perdre la maîtrise du code.

Exemple :

```text
main
  |
  +-- feature-a       <- Agent 1
  |
  +-- feature-b       <- Agent 2
  |
  +-- bugfix-c        <- Agent 3
```

Chaque agent peut travailler dans un espace isolé, puis le développeur peut inspecter les diffs et décider ce qui doit être intégré.

## 2. Pourquoi Git est central dans l’Agentic Software Engineering

L’Agentic Software Engineering ne consiste pas uniquement à demander à une IA de générer du code.

Il faut aussi être capable de :

- isoler les changements produits par un agent ;
- visualiser précisément ce qu’il a modifié ;
- comparer différentes propositions ;
- tester avant intégration ;
- annuler une modification incorrecte ;
- travailler en parallèle ;
- tracer les décisions et modifications.

Git fournit cette couche de **contrôle, de traçabilité et de réversibilité**.

Pour cette raison, les notions suivantes seront particulièrement importantes dans la formation :

- `status` ;
- `diff` ;
- `commit` ;
- `branch` ;
- `merge` ;
- `revert` ;
- `worktree` ;
- synchronisation avec le repository distant.

## 3. À quoi sert GitHub CLI (`gh`) ?

**GitHub CLI est l’interface en ligne de commande officielle de GitHub.**

La commande principale est :

```bash
gh
```

Elle permet d’interagir avec GitHub directement depuis le terminal, sans devoir passer systématiquement par l’interface Web.

Par exemple :

```bash
gh repo view
```

permet de consulter un repository.

```bash
gh issue list
```

permet de consulter les issues.

```bash
gh pr list
```

permet de consulter les pull requests.

GitHub CLI permet également de créer et manipuler :

- issues ;
- pull requests ;
- repositories ;
- workflows GitHub Actions ;
- releases ;
- authentification GitHub.

## 4. Pourquoi GitHub CLI est important pour les agents

Les agents de développement utilisent fréquemment le terminal.

Avec `gh`, ils peuvent interagir directement avec GitHub depuis ce même environnement :

```text
Agent
  |
  +-- lit le repository
  +-- modifie les fichiers
  +-- exécute les tests
  +-- utilise Git
  +-- consulte une issue avec gh
  +-- crée ou inspecte une pull request
  +-- consulte les résultats CI
```

Cela permet de construire des workflows plus complets où l’agent ne manipule pas uniquement des fichiers locaux mais peut aussi participer au cycle de développement GitHub.

Le contrôle des permissions reste toutefois essentiel : un agent ne doit disposer que des droits nécessaires à la tâche demandée.

## 5. Versions validées pour la formation

Environnement réellement validé pendant la préparation :

| Outil | Version validée |
|---|---:|
| Git | **2.55.0** |
| GitHub CLI | **2.100.0** |

Le principe retenu pour la formation est d’utiliser une version stable récente et validée avant la session.

## 6. Vérifier les versions installées

Dans le terminal intégré de VS Code :

```bash
git --version
```

Résultat obtenu dans notre environnement :

```text
git version 2.55.0
```

Puis :

```bash
gh --version
```

Résultat obtenu :

```text
gh version 2.100.0 (2026-09-03)
```

## 7. Mise à jour avec Homebrew sur macOS

Dans notre environnement, Git et GitHub CLI ont été mis à jour avec Homebrew.

Pour Git :

```bash
brew upgrade git
```

Pour GitHub CLI :

```bash
brew upgrade gh
```

Après mise à jour, revérifier :

```bash
git --version
gh --version
```

> Si Homebrew indique que l’outil n’est pas installé ou n’est pas géré par lui, il faut adapter la procédure d’installation au poste concerné.

## 8. Vérifier l’authentification GitHub CLI

Exécuter :

```bash
gh auth status
```

Dans notre environnement, le résultat a confirmé :

```text
Logged in to github.com account boscherj
Active account: true
Git operations protocol: https
```

Le token était stocké dans le **keyring** du système.

### Bonnes pratiques de sécurité

Ne jamais copier ou afficher un token GitHub complet dans :

- un README ;
- une capture d’écran publique ;
- un commit ;
- un prompt partagé ;
- un fichier versionné.

Lors des démonstrations, masquer systématiquement les secrets.

## 9. Vérifier que le repository local pointe vers le bon GitHub

Exécuter :

```bash
git remote -v
```

Dans notre environnement :

```text
origin  https://github.com/boscherj/agentic-software-engineering.git (fetch)
origin  https://github.com/boscherj/agentic-software-engineering.git (push)
```

Cela confirme que le repository local est bien connecté au repository GitHub attendu.

## 10. Premier test Git : état du repository

Exécuter :

```bash
git status
```

Résultat obtenu :

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Ce test permet de vérifier trois informations essentielles :

- la branche courante est `main` ;
- la branche locale est synchronisée avec `origin/main` ;
- aucun changement local non commité n’est présent.

## 11. Premier test GitHub CLI : consulter le repository

Exécuter :

```bash
gh repo view boscherj/agentic-software-engineering
```

La commande a correctement affiché la description et le README du repository.

Cela valide :

```text
terminal local
   ↓
GitHub CLI
   ↓
GitHub
   ↓
repository distant
```

## 12. Deuxième test GitHub CLI : consulter les issues

Exécuter :

```bash
gh issue list --repo boscherj/agentic-software-engineering
```

Résultat obtenu pendant la préparation :

```text
no open issues in boscherj/agentic-software-engineering
```

Ce résultat est normal : aucune issue n’était ouverte au moment du test.

L’important est que la commande ait pu interroger GitHub correctement.

## 13. Git et GitHub : deux rôles différents

Il est important de distinguer les deux :

```text
Git
  = gestion des versions du code

GitHub
  = plateforme distante de collaboration autour du repository

GitHub CLI
  = interface terminal vers GitHub
```

Exemple de workflow :

```text
fichiers locaux
    ↓
Git
    ↓
commit
    ↓
push
    ↓
GitHub
    ↓
Pull Request
    ↓
CI / revue
    ↓
merge
```

## 14. Relation avec les agents IA

Dans la formation, nous chercherons progressivement à atteindre ce type de workflow :

```text
Issue GitHub
    ↓
Agent IA
    ↓
lecture du repository
    ↓
création d’une branche ou d’un worktree
    ↓
modification du code
    ↓
tests
    ↓
git diff
    ↓
commit
    ↓
Pull Request
    ↓
CI
    ↓
revue humaine
    ↓
merge
```

Git et GitHub CLI ne sont donc pas de simples prérequis techniques : ils font partie intégrante du **système de contrôle des agents**.

## 15. Checklist de validation

- [ ] Git est installé ;
- [ ] `git --version` retourne la version attendue ;
- [ ] GitHub CLI est installé ;
- [ ] `gh --version` retourne la version attendue ;
- [ ] `gh auth status` confirme l’authentification ;
- [ ] le bon compte GitHub est actif ;
- [ ] `git remote -v` pointe vers le bon repository ;
- [ ] `git status` fonctionne ;
- [ ] le repository est synchronisé avec `origin/main` ;
- [ ] `gh repo view` permet de consulter le repository ;
- [ ] `gh issue list` permet d’interroger GitHub.

À ce stade, Git et GitHub CLI sont considérés comme prêts pour les futurs exercices de la formation.
