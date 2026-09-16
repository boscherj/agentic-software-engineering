// Contenu projetable. Les notes orales sont dans un fichier distinct.
window.COURSE = {
  "title": "Agentic Software Engineering",
  "revision": "1bffca0ce6ad5a942b8423b7ec19c37124f7b7b7",
  "date": "16 septembre 2026",
  "repo": "https://github.com/boscherj/agentic-software-engineering",
  "sources": {
    "m1": {
      "label": "Module 01 · Fondamentaux",
      "path": "01-fondamentaux-agentic-se/README.md"
    },
    "m2": {
      "label": "Module 02 · Copilot Agent Mode",
      "path": "02-copilot-agent-mode/README.md"
    },
    "m3": {
      "label": "Module 03 · Claude Code",
      "path": "03-claude-code/README.md"
    },
    "m8": {
      "label": "Module 08 · Tests, revue et sécurité",
      "path": "08-testing-review-security/README.md"
    },
    "ci": {
      "label": "Workflow CI · configuration réelle",
      "path": ".github/workflows/ci.yml"
    },
    "agents": {
      "label": "AGENTS.md · règles du dépôt",
      "path": "AGENTS.md"
    }
  },
  "lessons": [
    {
      "id": "fondamentaux",
      "number": "01",
      "title": "Comprendre la délégation",
      "subtitle": "Fondamentaux de l’Agentic Software Engineering",
      "description": "Du besoin à la preuve : situer chaque outil et garder la décision.",
      "color": "blue",
      "sources": [
        "m1",
        "ci",
        "m8",
        "agents"
      ],
      "slides": [
        {
          "id": "f01",
          "title": "Déléguer le code.\nGarder la maîtrise.",
          "minutes": 3,
          "kind": "Ouverture",
          "lead": "À la fin de cette leçon, vous saurez formuler une tâche, choisir son niveau d’autonomie et demander des preuves.",
          "visual": {
            "type": "cards",
            "items": [
              [
                "Définir",
                "Un résultat observable et un périmètre."
              ],
              [
                "Vérifier",
                "Des tests, un diff et des contrôles indépendants."
              ],
              [
                "Décider",
                "Une intégration explicitement autorisée."
              ]
            ]
          },
          "takeaway": "Une tâche terminée est une tâche dont on peut examiner le résultat."
        },
        {
          "id": "f02",
          "title": "Un agent agit dans une boucle.",
          "minutes": 4,
          "kind": "Concept",
          "lead": "Il observe le projet, choisit une action, utilise un outil, puis interprète le résultat.",
          "visual": {
            "type": "flow",
            "items": [
              [
                "Observer",
                "Lire le code et les règles"
              ],
              [
                "Raisonner",
                "Choisir une action limitée"
              ],
              [
                "Agir",
                "Modifier ou lancer un outil"
              ],
              [
                "Vérifier",
                "Lire les preuves et ajuster"
              ]
            ]
          },
          "takeaway": "La capacité d’agir rend le périmètre et les permissions essentiels."
        },
        {
          "id": "f03",
          "title": "Qui travaille, et où ?",
          "minutes": 5,
          "kind": "Repères",
          "lead": "Le poste local et GitHub partagent des commits. Ils ne partagent pas automatiquement tout le disque.",
          "visual": {
            "type": "table",
            "headers": [
              "Acteur",
              "Rôle dans le laboratoire",
              "Lieu"
            ],
            "rows": [
              [
                "VS Code / terminal",
                "Interface pour lire et piloter",
                "Votre poste"
              ],
              [
                "Agent local",
                "Lire, modifier, lancer les outils autorisés",
                "Clone local"
              ],
              [
                "Git",
                "Historique, index et branches",
                "Local + distant"
              ],
              [
                "GitHub",
                "PR, discussion, règles de fusion",
                "Service distant"
              ],
              [
                "GitHub Actions",
                "Exécuter le workflow CI",
                "Machine temporaire"
              ]
            ]
          },
          "takeaway": "Une PR vit sur GitHub ; les modifications commencent souvent sur votre poste."
        },
        {
          "id": "f04",
          "title": "L’environnement est une chaîne de preuves.",
          "minutes": 4,
          "kind": "Méthode",
          "lead": "Les outils répondent à des questions différentes. Aucun ne remplace tous les autres.",
          "visual": {
            "type": "cards",
            "items": [
              [
                "uv + fichiers de projet",
                "Avec quel Python et quelles dépendances ?"
              ],
              [
                "pytest + Ruff",
                "Quels comportements passent ? Quelles règles statiques ?"
              ],
              [
                "Git + PR + CI",
                "Quel changement ? Quelle revue ? Quel résultat distant ?"
              ]
            ]
          },
          "takeaway": "Un contrôle utile répond à une question précise."
        },
        {
          "id": "f05",
          "title": "Écrire un mandat vérifiable.",
          "minutes": 6,
          "kind": "Atelier",
          "lead": "Transformer « améliore ce code » en une demande dont la fin et les limites sont observables.",
          "visual": {
            "type": "table",
            "headers": [
              "Rubrique",
              "Exemple"
            ],
            "rows": [
              [
                "Résultat",
                "Ajouter est_pair(nombre) → bool"
              ],
              [
                "Périmètre",
                "Module de calcul et fichier de tests"
              ],
              [
                "Acceptation",
                "2 → True ; 3 → False ; 0 et −4 → True"
              ],
              [
                "Preuves",
                "pytest, Ruff, diff"
              ],
              [
                "Autonomie",
                "Branche et PR autorisées"
              ],
              [
                "Arrêt",
                "Ne pas fusionner ; signaler les ambiguïtés"
              ]
            ]
          },
          "takeaway": "Le résultat attendu et le droit d’agir sont deux parties du même mandat."
        },
        {
          "id": "f06",
          "title": "Augmenter l’autonomie par étapes.",
          "minutes": 4,
          "kind": "Cadre du cours",
          "lead": "Ces cinq niveaux sont notre convention pédagogique pour préciser la délégation.",
          "visual": {
            "type": "table",
            "headers": [
              "Niveau",
              "Action autorisée",
              "Limite"
            ],
            "rows": [
              [
                "0 · Expliquer",
                "Répondre",
                "Pas d’accès au dépôt"
              ],
              [
                "1 · Analyser",
                "Lire et proposer",
                "Pas de modification"
              ],
              [
                "2 · Modifier",
                "Écrire et tester",
                "Pas de publication"
              ],
              [
                "3 · Proposer",
                "Commit, push et PR",
                "Pas de fusion"
              ],
              [
                "4 · Intégrer",
                "Fusionner une PR désignée",
                "Décision explicite requise"
              ]
            ]
          },
          "takeaway": "Une capacité disponible n’est pas une autorisation permanente."
        },
        {
          "id": "f07",
          "title": "AGENTS.md : des règles, pas un verrou.",
          "minutes": 4,
          "kind": "Contexte",
          "lead": "Un fichier versionné permet de partager les conventions du projet avec les agents.",
          "visual": {
            "type": "cards",
            "items": [
              [
                "Ce qu’il porte",
                "Petits changements, tests, absence de secrets, définition de fini."
              ],
              [
                "Où le placer",
                "À la racine pour commencer ; portée locale si le client la prend en charge."
              ],
              [
                "Comment l’utiliser",
                "Vérifier le support du client, ou demander explicitement sa lecture."
              ]
            ]
          },
          "takeaway": "Les instructions guident. Les permissions limitent techniquement."
        },
        {
          "id": "f08",
          "title": "Cas réel : ajouter est_pair.",
          "minutes": 5,
          "kind": "Démonstration",
          "lead": "La PR #2 relie une demande courte à des tests, une implémentation et une revue.",
          "visual": {
            "type": "code",
            "label": "Python · comportement et critères",
            "code": "def est_pair(nombre: int) -> bool:\n    return nombre % 2 == 0\n\n# Critères d’acceptation du laboratoire\nassert est_pair(2) is True\nassert est_pair(3) is False\nassert est_pair(0) is True\nassert est_pair(-4) is True"
          },
          "takeaway": "Une fonction minuscule suffit à observer un workflow complet."
        },
        {
          "id": "f09",
          "title": "Du fichier local à la pull request.",
          "minutes": 5,
          "kind": "Git & GitHub",
          "lead": "Chaque étape change ce que les autres peuvent voir.",
          "visual": {
            "type": "flow",
            "items": [
              [
                "Modifier",
                "Fichiers sur le poste"
              ],
              [
                "Indexer",
                "Sélection du prochain commit"
              ],
              [
                "Committer",
                "Historique local"
              ],
              [
                "Pousser",
                "Branche sur GitHub"
              ],
              [
                "Ouvrir la PR",
                "Proposition vers main"
              ]
            ]
          },
          "takeaway": "Pousser une branche ne fusionne pas son contenu dans main."
        },
        {
          "id": "f10",
          "title": "La CI reconstruit et vérifie.",
          "minutes": 6,
          "kind": "GitHub Actions",
          "lead": "CI signifie intégration continue. Le workflow du dépôt déclenche des contrôles sur push et pull request.",
          "visual": {
            "type": "code",
            "label": ".github/workflows/ci.yml · extrait",
            "code": "on:\n  push:\n  pull_request:\npermissions:\n  contents: read\n\n# Après récupération du dépôt, installation de Python et uv :\n# uv sync --locked --dev\n# uv run ruff check .\n# uv run pytest"
          },
          "takeaway": "Vert signifie : les contrôles configurés ont réussi sur cette exécution."
        },
        {
          "id": "f11",
          "title": "Une proposition prête à intégrer.",
          "minutes": 4,
          "kind": "Revue",
          "lead": "La décision s’appuie sur le besoin, le diff et les preuves — pas seulement sur la couleur des checks.",
          "visual": {
            "type": "cards",
            "items": [
              [
                "Périmètre",
                "Fichiers prévus, aucune dépendance ou permission surprise."
              ],
              [
                "Comportement",
                "Cas acceptés, tests pertinents, limites comprises."
              ],
              [
                "Intégration",
                "Checks réussis, discussions traitées, décision explicite."
              ]
            ]
          },
          "takeaway": "Une protection de branche encadre la fusion ; les droits déterminent qui peut l’exécuter."
        },
        {
          "id": "f12",
          "title": "Pouvez-vous expliquer la chaîne ?",
          "minutes": 5,
          "kind": "Vérification des acquis",
          "lead": "Un agent a poussé une branche. Les tests locaux passent. La page main n’a pas changé.",
          "visual": {
            "type": "quiz",
            "questions": [
              "Où se trouve le changement ?",
              "Quelles preuves restent à consulter ?",
              "Quelle action rendra le changement visible dans main ?"
            ]
          },
          "takeaway": "Livrable de la leçon : un mandat et une revue que vous savez justifier."
        }
      ]
    },
    {
      "id": "copilot",
      "number": "02",
      "title": "Piloter Copilot dans VS Code",
      "subtitle": "GitHub Copilot & Agent Mode",
      "description": "Un changement local, deux tests, une proposition vérifiable.",
      "color": "green",
      "sources": [
        "m2",
        "m8",
        "ci"
      ],
      "slides": [
        {
          "id": "p01",
          "title": "Deux tests.\nUne délégation complète.",
          "minutes": 3,
          "kind": "Ouverture",
          "lead": "Dans VS Code, piloter Copilot depuis la lecture du projet jusqu’à une PR.",
          "visual": {
            "type": "cards",
            "items": [
              [
                "Entrée",
                "Une fonction additionner déjà correcte."
              ],
              [
                "Travail",
                "Deux cas : zéro et deux négatifs."
              ],
              [
                "Preuve historique",
                "PR #9 · 1 fichier · 12 tests au total."
              ]
            ]
          },
          "takeaway": "Objectif : savoir augmenter l’autonomie au bon moment."
        },
        {
          "id": "p02",
          "title": "Préparer un atelier reproductible.",
          "minutes": 5,
          "kind": "Préparation",
          "lead": "Sur main aujourd’hui, les tests sont déjà présents. On commence par observer l’état réel.",
          "visual": {
            "type": "code",
            "label": "Lecture de l’état local",
            "code": "git status -sb\ngit diff\ngit diff --cached\n\n# Puis lire :\n# AGENTS.md\n# src/agentic_software_engineering/calcul.py\n# tests/test_calcul.py"
          },
          "takeaway": "Ne jamais fabriquer un nouveau changement en dupliquant un test existant."
        },
        {
          "id": "p03",
          "title": "Agent, modèle, permissions.",
          "minutes": 4,
          "kind": "Interface",
          "lead": "Trois choix différents dans le panneau Chat de VS Code.",
          "visual": {
            "type": "cards",
            "items": [
              [
                "Agent",
                "Le mode de travail : explorer et utiliser des outils."
              ],
              [
                "Auto",
                "Le choix du modèle dans la session observée."
              ],
              [
                "Permissions",
                "Les opérations effectivement autorisées."
              ]
            ]
          },
          "takeaway": "Choisir un modèle n’accorde pas automatiquement des droits supplémentaires."
        },
        {
          "id": "p04",
          "title": "Niveau 1 : lire avant de proposer.",
          "minutes": 5,
          "kind": "Prompt à utiliser",
          "lead": "Demander des faits tirés des fichiers, puis une amélioration ciblée.",
          "visual": {
            "type": "code",
            "label": "Mandat · lecture seule",
            "code": "Lis AGENTS.md, src/agentic_software_engineering/calcul.py\net tests/test_calcul.py avec tes outils de lecture.\nExplique les fonctions, les cas testés et une petite amélioration.\n\nNe modifie aucun fichier, ne lance aucun test\net n’effectue aucune opération Git ou GitHub.\nSi une lecture exige une permission supplémentaire, signale-le."
          },
          "takeaway": "Autoriser la lecture permet une analyse fondée sur le projet réel."
        },
        {
          "id": "p05",
          "title": "Niveau 2 : une modification bornée.",
          "minutes": 6,
          "kind": "Exercice",
          "lead": "Deux comportements attendus, un fichier autorisé, deux contrôles.",
          "visual": {
            "type": "code",
            "label": "Mandat · modification locale",
            "code": "Dans tests/test_calcul.py, ajoute les tests manquants :\nadditionner(0, 5) == 5\nadditionner(-2, -3) == -5\n\nSi ces cas sont déjà couverts, signale-le sans les dupliquer.\nNe modifie aucun autre fichier.\nValide avec uv run pytest et uv run ruff check .\nNe crée ni branche, ni commit, ni push, ni PR."
          },
          "takeaway": "Le niveau 2 s’arrête au résultat local et à ses preuves."
        },
        {
          "id": "p06",
          "title": "Source Control : deux zones à relire.",
          "minutes": 5,
          "kind": "Revue locale",
          "lead": "Changes et Staged Changes ne décrivent pas la même chose.",
          "visual": {
            "type": "table",
            "headers": [
              "Zone",
              "Question",
              "Équivalent terminal"
            ],
            "rows": [
              [
                "Changes",
                "Que reste-t-il hors de l’index ?",
                "git diff"
              ],
              [
                "Staged Changes",
                "Que contiendra le prochain commit ?",
                "git diff --cached"
              ],
              [
                "État complet",
                "Quels fichiers sont présents ou modifiés ?",
                "git status --short"
              ]
            ]
          },
          "takeaway": "Un index vide avant l’ajout, puis un diff indexé vérifié avant le commit."
        },
        {
          "id": "p07",
          "title": "Niveau 3 : publier une proposition.",
          "minutes": 5,
          "kind": "Prompt à utiliser",
          "lead": "La branche isole le changement ; la PR le rend discutable.",
          "visual": {
            "type": "code",
            "label": "Mandat · après revue du diff",
            "code": "Crée une branche d’atelier au nom convenu.\nVérifie l’index et ajoute uniquement tests/test_calcul.py.\nRelis git diff --cached ; arrête-toi si le périmètre diffère.\nCommit : Test addition edge cases\nPousse vers le dépôt d’atelier autorisé et ouvre une PR vers main.\n\nDonne l’URL, les fichiers inclus et les validations.\nNe fusionne pas."
          },
          "takeaway": "Historique : test/addition-cas-limites → main, PR #9."
        },
        {
          "id": "p08",
          "title": "Lire la PR #9 comme une preuve.",
          "minutes": 5,
          "kind": "Cas réel",
          "lead": "Le compte rendu local est confronté aux objets réellement publiés.",
          "visual": {
            "type": "table",
            "headers": [
              "À examiner",
              "Résultat historique"
            ],
            "rows": [
              [
                "Source → cible",
                "test/addition-cas-limites → main"
              ],
              [
                "Commit",
                "Test addition edge cases"
              ],
              [
                "Files changed",
                "tests/test_calcul.py · +8 lignes"
              ],
              [
                "Checks",
                "Deux exécutions CI réussies"
              ],
              [
                "Intégration",
                "Fusion décidée par l’utilisateur"
              ]
            ]
          },
          "takeaway": "Conversation, Commits, Files changed et Checks ont chacun un rôle."
        },
        {
          "id": "p09",
          "title": "Après la fusion, revenir à main.",
          "minutes": 4,
          "kind": "Synchronisation",
          "lead": "GitHub et votre clone évoluent séparément jusqu’à la récupération des commits.",
          "visual": {
            "type": "code",
            "label": "Après inspection d’un état local propre",
            "code": "git fetch origin\ngit switch main\ngit pull --ff-only origin main\ngit status -sb\n\n# Le ménage des branches vient ensuite,\n# après vérification de leur intégration."
          },
          "takeaway": "Fusionner à distance ne met pas automatiquement le Mac à jour."
        },
        {
          "id": "p10",
          "title": "Incident : main est « ahead 1 ».",
          "minutes": 5,
          "kind": "Diagnostic",
          "lead": "Un commit local ajoute .mcp.json par erreur. Le répertoire peut paraître propre.",
          "visual": {
            "type": "code",
            "label": "Inspection avant toute décision",
            "code": "git status -sb\ngit log --oneline origin/main..main\ngit show --stat <commit-identifié>\n\n# ahead 1 : un commit local absent de la référence origin/main.\n# Actualiser la référence avant de conclure sur GitHub."
          },
          "takeaway": "Ne pas pousser un écart dont on n’a pas compris le contenu."
        },
        {
          "id": "p11",
          "title": "Local ou cloud : localiser le travail.",
          "minutes": 4,
          "kind": "Comparaison",
          "lead": "Les mêmes preuves restent nécessaires, quel que soit le lieu où l’agent agit.",
          "visual": {
            "type": "table",
            "headers": [
              "Question",
              "Copilot dans VS Code · PR #9",
              "Copilot cloud · PR #5"
            ],
            "rows": [
              [
                "Fichiers modifiés",
                "Clone du poste",
                "Environnement distant"
              ],
              [
                "Interface",
                "Chat de l’éditeur",
                "Session GitHub"
              ],
              [
                "Fichiers personnels du Mac",
                "Potentiellement accessibles selon droits",
                "Pas présents par défaut"
              ],
              [
                "Livrable",
                "PR + preuves",
                "PR + preuves"
              ]
            ]
          },
          "takeaway": "Choisir l’interface ne supprime ni le mandat ni la revue."
        },
        {
          "id": "p12",
          "title": "Votre contrat de fin de tâche.",
          "minutes": 4,
          "kind": "Vérification des acquis",
          "lead": "Le résultat doit être lisible par quelqu’un qui n’a pas suivi la conversation.",
          "visual": {
            "type": "quiz",
            "questions": [
              "Le compte rendu liste-t-il les fichiers et les contrôles ?",
              "Avez-vous relu l’index puis le diff publié ?",
              "Savez-vous ce qui est local, poussé et fusionné ?"
            ]
          },
          "takeaway": "Livrable : une PR limitée, une revue argumentée et un clone remis à jour."
        }
      ]
    },
    {
      "id": "claude",
      "number": "03",
      "title": "Travailler avec Claude Code",
      "subtitle": "L’agent dans le terminal",
      "description": "Changer d’interface, conserver le même niveau d’exigence.",
      "color": "orange",
      "sources": [
        "m3",
        "m8",
        "ci",
        "agents"
      ],
      "slides": [
        {
          "id": "c01",
          "title": "Le terminal change.\nLa discipline reste.",
          "minutes": 3,
          "kind": "Ouverture",
          "lead": "Confier à Claude Code un test manquant et suivre sa proposition jusqu’à l’intégration.",
          "visual": {
            "type": "cards",
            "items": [
              [
                "Contexte",
                "Le même module Python et les mêmes règles."
              ],
              [
                "Tâche",
                "est_multiple_de_trois(-4) is False"
              ],
              [
                "Résultat historique",
                "PR #11 · 1 fichier · 13 tests au total."
              ]
            ]
          },
          "takeaway": "Objectif : piloter un agent dans le terminal en lisant ses actions."
        },
        {
          "id": "c02",
          "title": "Lancer dans le bon répertoire.",
          "minutes": 4,
          "kind": "Préparation",
          "lead": "Le dossier courant définit le contexte de travail initial de la session.",
          "visual": {
            "type": "code",
            "label": "Après vérification des fichiers et de la branche",
            "code": "cd /chemin/vers/agentic-software-engineering\ngit status -sb\nclaude\n\n# Repérer le dossier affiché et les permissions actives.\n# Les libellés exacts dépendent de la version utilisée."
          },
          "takeaway": "Lire les permissions réelles ; le nom du mode n’est pas une preuve suffisante."
        },
        {
          "id": "c03",
          "title": "Niveau 1 : demander des faits.",
          "minutes": 5,
          "kind": "Prompt à utiliser",
          "lead": "Trois fichiers suffisent pour une première analyse du changement.",
          "visual": {
            "type": "code",
            "label": "Mandat · lecture seule",
            "code": "Lis AGENTS.md, src/agentic_software_engineering/calcul.py\net tests/test_calcul.py.\nExplique les fonctions, les cas couverts, une amélioration\nminimale et les règles de travail applicables.\n\nN’écris aucun fichier. Ne lance ni tests ni commande Git.\nSignale toute impossibilité de lecture."
          },
          "takeaway": "Dans ce laboratoire, la lecture d’AGENTS.md est explicitement demandée."
        },
        {
          "id": "c04",
          "title": "Pourquoi tester −4 ?",
          "minutes": 4,
          "kind": "Comportement",
          "lead": "Les négatifs multiples de trois et les négatifs non multiples couvrent deux résultats différents.",
          "visual": {
            "type": "table",
            "headers": [
              "Entrée",
              "Reste modulo 3 en Python",
              "Résultat"
            ],
            "rows": [
              [
                "3",
                "0",
                "True"
              ],
              [
                "0",
                "0",
                "True"
              ],
              [
                "−6",
                "0",
                "True"
              ],
              [
                "−4",
                "2",
                "False"
              ]
            ]
          },
          "takeaway": "Le nouveau test documente un cas manquant ; il ne corrige pas un défaut connu."
        },
        {
          "id": "c05",
          "title": "Niveau 2 : un seul test.",
          "minutes": 6,
          "kind": "Exercice",
          "lead": "Une assertion, un fichier et une restitution vérifiable.",
          "visual": {
            "type": "code",
            "label": "Mandat · modification locale",
            "code": "Ajoute dans tests/test_calcul.py le test manquant :\nassert est_multiple_de_trois(-4) is False\n\nS’il existe déjà, indique-le sans le dupliquer.\nNe modifie aucun autre fichier.\nExécute uv run pytest et uv run ruff check .\nNe crée ni branche, ni commit, ni push, ni PR.\nRapporte les résultats exacts, y compris les échecs."
          },
          "takeaway": "Historique : 12 → 13 tests ; aucune modification de calcul.py."
        },
        {
          "id": "c06",
          "title": "Trois lectures avant le commit.",
          "minutes": 5,
          "kind": "Revue locale",
          "lead": "Lire l’état, le diff de travail et l’index apporte trois informations complémentaires.",
          "visual": {
            "type": "code",
            "label": "Commandes de lecture autorisées",
            "code": "git status --short\ngit diff -- tests/test_calcul.py\ngit diff --cached\n\n# Attendu avant git add :\n# un fichier de test modifié ; index vide."
          },
          "takeaway": "Une sortie vide de git diff --cached signifie que l’index ne diffère pas de HEAD."
        },
        {
          "id": "c07",
          "title": "Niveau 3 : branche, commit, PR.",
          "minutes": 5,
          "kind": "Prompt à utiliser",
          "lead": "Autoriser une proposition complète sans céder la décision d’intégration.",
          "visual": {
            "type": "code",
            "label": "Mandat · après approbation du diff",
            "code": "Crée une branche d’atelier au nom convenu.\nAjoute uniquement tests/test_calcul.py à l’index.\nRelis git diff --cached ; arrête-toi en cas de fichier inattendu.\nTitre du commit : Test negative non-multiple of three\nPousse vers le dépôt autorisé et ouvre une PR vers main.\nDonne son URL, les fichiers inclus et les validations.\nNe fusionne pas."
          },
          "takeaway": "Historique : test/multiple-negatif-non-multiple → main, PR #11."
        },
        {
          "id": "c08",
          "title": "Le titre et l’attribution du commit.",
          "minutes": 3,
          "kind": "Traçabilité",
          "lead": "Un message de commit peut contenir un titre et un pied d’attribution.",
          "visual": {
            "type": "code",
            "label": "Message historique · PR #11",
            "code": "Test negative non-multiple of three\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
          },
          "takeaway": "Le pied d’attribution observé n’a pas changé le diff."
        },
        {
          "id": "c09",
          "title": "La revue et la décision d’intégrer.",
          "minutes": 5,
          "kind": "Cas réel",
          "lead": "La PR #11 apporte quatre lignes dans un seul fichier. Ses checks ont réussi avant fusion.",
          "visual": {
            "type": "cards",
            "items": [
              [
                "Diff",
                "Un test pour −4 → False."
              ],
              [
                "CI",
                "Validation distante des contrôles configurés."
              ],
              [
                "Décision",
                "Fusion explicitement demandée par l’utilisateur."
              ]
            ]
          },
          "takeaway": "La décision était humaine ; son exécution a été déléguée après autorisation."
        },
        {
          "id": "c10",
          "title": "Finir sur une copie cohérente.",
          "minutes": 5,
          "kind": "Synchronisation",
          "lead": "Un mandat de nettoyage doit nommer précisément les branches concernées.",
          "visual": {
            "type": "flow",
            "items": [
              [
                "Récupérer",
                "fetch origin"
              ],
              [
                "Synchroniser",
                "main + pull --ff-only"
              ],
              [
                "Vérifier",
                "Statut et intégration"
              ],
              [
                "Nettoyer",
                "Locale puis distante"
              ],
              [
                "Valider",
                "pytest et Ruff sur main"
              ]
            ]
          },
          "takeaway": "Supprimer une branche fusionnée conserve les commits intégrés et la PR."
        },
        {
          "id": "c11",
          "title": "Comparer les agents par leurs preuves.",
          "minutes": 4,
          "kind": "Retour d’expérience",
          "lead": "Le même protocole permet une comparaison utile des clients.",
          "visual": {
            "type": "table",
            "headers": [
              "Critère",
              "Ce qu’on observe"
            ],
            "rows": [
              [
                "Contexte",
                "Fichiers lus, règles reconnues, ambiguïtés signalées"
              ],
              [
                "Autonomie",
                "Actions conformes au mandat et arrêt au bon moment"
              ],
              [
                "Qualité",
                "Diff limité et validations exécutées"
              ],
              [
                "Restitution",
                "Fichiers, résultats, PR et limites explicites"
              ]
            ]
          },
          "takeaway": "Une petite réussite démontre un processus, pas la supériorité générale d’un outil."
        },
        {
          "id": "c12",
          "title": "Vous savez maintenant piloter le cycle.",
          "minutes": 5,
          "kind": "Bilan du parcours",
          "lead": "Un agent veut modifier trois fichiers alors que le mandat n’en autorise qu’un. Les tests passent.",
          "visual": {
            "type": "quiz",
            "questions": [
              "Autorisez-vous la publication ?",
              "Que demandez-vous pour comprendre l’écart ?",
              "Comment reformulez-vous la prochaine consigne ?"
            ]
          },
          "takeaway": "Le prochain gain d’autonomie doit s’accompagner de preuves adaptées."
        }
      ]
    }
  ]
};
