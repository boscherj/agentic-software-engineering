// Chargé uniquement par la console intervenant, jamais par audience.html.
window.SPEAKER_NOTES = {
  "f01": {
    "goal": "Faire comprendre le résultat attendu du parcours avant de présenter les produits.",
    "say": [
      "« Nous avons installé un environnement complet. Aujourd’hui, nous allons montrer à quoi sert chaque élément quand nous confions du travail à une IA. Nous utiliserons quelques lignes de Python pour rendre visibles des mécanismes qui restent valables dans un grand projet. »",
      "Présentez les trois leçons : le processus commun, Copilot dans VS Code, puis Claude dans le terminal. Les durées proposées incluent les échanges et de courtes démonstrations ; prévoyez des pauses en plus. Le public doit pouvoir lire une fonction Python et comprendre ce qu’est un fichier."
    ],
    "demo": [
      "Ouvrir le dépôt de formation et montrer les dossiers 01, 02, 03, 08 ainsi que .github/workflows.",
      "Annoncer que les preuves viennent des PR réelles du dépôt. Il n’est pas nécessaire de relancer des modifications déjà intégrées pour suivre le cours."
    ],
    "question": "Quand un agent écrit « terminé », qu’avez-vous besoin de voir avant de lui donner raison ?",
    "answer": "Le changement exact, les tests exécutés et leur résultat, les limites restantes et le respect du périmètre. Une assurance verbale ne suffit pas.",
    "pitfall": "Ne pas commencer par les versions et abonnements. Ces détails évoluent ; le processus est le fil conducteur.",
    "transition": "Partons de ce qui distingue un assistant d’un agent."
  },
  "f02": {
    "goal": "Distinguer une réponse textuelle d’une suite d’actions sur un environnement.",
    "say": [
      "« Un assistant peut proposer une fonction dans une conversation. Un agent peut aller lire le fichier, y appliquer la modification, exécuter un test, constater un échec et corriger. Ce sont les outils et cette boucle de retour qui rendent la délégation possible. »",
      "Le résultat d’un outil devient une nouvelle observation, pas une vérité universelle. Un test réussi prouve un cas testé. Une commande échouée peut révéler un défaut de configuration plutôt qu’un défaut du programme."
    ],
    "demo": [
      "Raconter le laboratoire est_pair : des tests ont d’abord échoué parce que la fonction n’existait pas ; l’implémentation a ensuite permis leur passage.",
      "Distinguer explicitement la décision de l’agent de l’exécution par le terminal ou GitHub Actions."
    ],
    "question": "Un agent qui s’arrête faute de permission a-t-il nécessairement échoué ?",
    "answer": "Non. Il peut respecter son mandat et rendre le blocage visible. L’autonomie utile comporte des conditions d’arrêt.",
    "pitfall": "Ne pas présenter le raisonnement de l’agent comme transparent ou forcément correct. Nous examinons surtout ses actions et leurs effets.",
    "transition": "Plaçons maintenant les outils sur le poste et sur GitHub."
  },
  "f03": {
    "goal": "Rendre concrète la répartition des rôles et prévenir la confusion « GitHub a tout fait ».",
    "say": [
      "« Dans la PR #2, Codex a produit la fonction en local. GitHub a reçu les commits, présenté leur diff et exécuté les vérifications. Dans la PR #5, un agent cloud a produit le changement dans un environnement distant. Ce sont deux lieux d’exécution différents pour un processus comparable. »",
      "Un agent local peut accéder à des fichiers non suivis si ses outils et permissions le permettent. GitHub ne reçoit pas ces fichiers via un push s’ils ne sont pas dans les commits. Cette distinction ne dit pas ce qu’un fournisseur de modèle reçoit pendant une session : la configuration et les conditions du service sont une autre question."
    ],
    "demo": [
      "Montrer la séparation src/, tests/ et .github/workflows/. Ne pas afficher le contenu d’un fichier de configuration personnel.",
      "Ouvrir la PR #2 et distinguer Files changed et Checks."
    ],
    "question": "Un fichier visible dans VS Code est-il forcément visible sur GitHub ?",
    "answer": "Non. Il faut qu’il soit suivi, enregistré dans un commit et que ce commit soit poussé vers le dépôt concerné.",
    "pitfall": "Ne pas confondre interface locale et modèle exécuté localement. « Agent local » décrit ici le lieu de travail sur le dépôt.",
    "transition": "Chaque composant de notre environnement fournit une pièce de preuve."
  },
  "f04": {
    "goal": "Expliquer à quoi sert l’installation effectuée avant les exercices.",
    "say": [
      "« pyproject.toml décrit le projet et ses dépendances. uv.lock fixe les versions résolues. La CI reconstruit l’environnement au lieu de dépendre de ce qui se trouve déjà sur notre Mac. »",
      "pytest exécute les comportements que nous avons décrits dans les tests. Ruff inspecte le Python selon les règles configurées. Git rend visibles les modifications. La PR les présente à la revue. La CI répète des contrôles à distance. Un test ne vérifie pas que nous avons évité tous les fichiers hors périmètre : le diff sert précisément à cela."
    ],
    "demo": [
      "Montrer les noms pyproject.toml, uv.lock, .python-version.",
      "Lire les deux commandes : uv run pytest et uv run ruff check . ; commenter une réussite et l’absence éventuelle de tests."
    ],
    "question": "« collected 0 items » signifie-t-il « tous les tests ont réussi » ?",
    "answer": "Non. Aucun test n’a été découvert. pytest renvoie normalement le code de sortie 5 dans ce cas ; une CI ne doit pas présenter cela comme une suite validée.",
    "pitfall": "Ne pas assimiler Ruff à l’exécution du programme, ni le verrouillage des dépendances à une garantie universelle de reproductibilité.",
    "transition": "Pour obtenir ces preuves, le mandat doit les demander explicitement."
  },
  "f05": {
    "goal": "Faire produire une consigne exploitable par le public.",
    "say": [
      "« Une demande vague oblige l’agent à deviner le résultat, les fichiers autorisés et le moment où il doit s’arrêter. Nous allons rendre ces choix explicites. Ce n’est pas la longueur du prompt qui compte, c’est la présence des décisions nécessaires. »",
      "Prenez est_pair comme exemple. Accepter zéro et les négatifs est une décision de comportement. Interdire une nouvelle dépendance est une limite de périmètre. Autoriser la PR sans la fusion est une limite d’autonomie. Ces trois dimensions doivent être séparées dans l’explication."
    ],
    "demo": [
      "Donner deux minutes aux participants pour réécrire « ajoute la parité ».",
      "Comparer les propositions aux six rubriques projetées. Insister sur une restitution finale qui inclut les échecs et non seulement les réussites."
    ],
    "question": "Que doit faire l’agent si un test demandé semble incompatible avec le besoin ?",
    "answer": "Signaler l’ambiguïté, expliquer les faits et demander une décision ; il ne doit pas affaiblir silencieusement le test pour obtenir du vert.",
    "pitfall": "Un mandat n’accorde pas à lui seul une permission technique ; il ne remplace ni le sandbox ni les droits GitHub.",
    "transition": "On peut déléguer la même tâche avec plusieurs degrés d’autonomie."
  },
  "f06": {
    "goal": "Donner un vocabulaire de décision commun aux trois leçons.",
    "say": [
      "« Ces niveaux ne sont pas une norme d’un fournisseur. Nous les utilisons pour rendre nos consignes comparables entre outils. Au niveau 1, nous pouvons autoriser des lectures précises ; au niveau 2, les tests ; au niveau 3, la publication. »",
      "Dans le cours, la décision d’intégrer appartient à l’humain. Celui-ci peut cliquer lui-même ou demander explicitement à un agent de fusionner une PR précise. Le responsable de la décision et l’outil qui exécute le clic ne sont pas nécessairement la même personne."
    ],
    "demo": [
      "Faire classer « lis le code », « lance pytest », « ouvre une PR » et « fusionne #11 » dans les niveaux.",
      "Montrer que passer au niveau suivant demande une nouvelle consigne, pas forcément une nouvelle session."
    ],
    "question": "L’autorisation de créer une PR autorise-t-elle sa fusion ?",
    "answer": "Non. Notre niveau 3 s’arrête à la proposition ; le niveau 4 exige une décision supplémentaire.",
    "pitfall": "Ne pas dire qu’une branche protégée empêche techniquement tout agent de fusionner. Avec les droits appropriés et les conditions satisfaites, un agent peut le faire.",
    "transition": "Les instructions persistantes précisent le cadre entre deux demandes."
  },
  "f07": {
    "goal": "Répondre aux questions de portée et de caractère obligatoire sans promettre une prise en charge universelle.",
    "say": [
      "« AGENTS.md est facultatif pour Python, Git et GitHub. Il facilite la continuité entre sessions. Il n’est pas réservé à Copilot et ne garantit pas à lui seul qu’un agent le lira ou lui obéira. »",
      "Le support des fichiers imbriqués dépend du client. Dans notre exercice Claude, nous demandons explicitement la lecture d’AGENTS.md ; nous n’en déduisons pas un chargement automatique. Commencez avec une seule source de règles partagées et évitez des copies contradictoires."
    ],
    "demo": [
      "Ouvrir AGENTS.md et choisir trois exigences réelles : limiter le périmètre, exécuter les vérifications, ne pas résoudre un exercice non assigné.",
      "Faire comparer une instruction « ne pousse pas » avec une absence effective de droit d’écriture."
    ],
    "question": "Supprimer AGENTS.md empêcherait-il pytest de fonctionner ?",
    "answer": "Non. Ce fichier fournit un contexte de travail aux agents ; il n’exécute ni ne configure pytest.",
    "pitfall": "Ne pas transformer une convention d’instructions en mécanisme de protection des secrets.",
    "transition": "Voyons une tâche entière dans les preuves historiques du dépôt."
  },
  "f08": {
    "goal": "Faire lire une preuve réelle sans refaire un exercice déjà intégré.",
    "say": [
      "« Nous utilisons ici la PR #2 comme étude de cas. Les quatre cas sont le contrat ; les tests le rendent exécutable. Dans ce laboratoire, les tests ont précédé l’implémentation et ont échoué sur l’import de la fonction manquante. »",
      "Ce premier rouge est attendu et utile, puis le vert montre que l’implémentation satisfait les cas. Les annotations int et bool ne constituent pas une validation automatique des entrées à l’exécution. Nous restons dans le contrat de nombres entiers."
    ],
    "demo": [
      "Ouvrir Files changed de la PR #2. Distinguer le fichier de production et le fichier de tests.",
      "Montrer le commit et le résultat des checks. Les 6 tests mentionnés dans ce laboratoire sont un total historique, pas le nombre attendu aujourd’hui."
    ],
    "question": "Pourquoi tester zéro alors qu’il semble évident ?",
    "answer": "Il explicite le contrat et protège ce cas lors d’une réécriture. La simplicité de l’implémentation ne remplace pas un critère d’acceptation.",
    "pitfall": "Ne pas ajouter à nouveau est_pair sur main : cette fonction existe déjà. En démonstration, lire l’historique.",
    "transition": "Les mots commit, push et PR décrivent des événements différents."
  },
  "f09": {
    "goal": "Lever les confusions rencontrées pendant le cours réel.",
    "say": [
      "« Git est le système d’historique ; GitHub héberge une copie et ajoute la PR. Une PR est un objet distant avec une branche source, une cible, un diff, une discussion et des contrôles. Elle peut être créée au navigateur ou avec gh ; elle reste hébergée sur GitHub. »",
      "L’index mérite une attention particulière : git add d’un fichier ne vide pas ce qui y était déjà préparé. Un commit enregistre l’ensemble de l’index. La revue doit donc porter à la fois sur les changements de travail et sur git diff --cached."
    ],
    "demo": [
      "Sur une PR existante, montrer Conversation, Commits, Files changed et Checks.",
      "Expliquer pourquoi un README poussé sur une branche de documentation n’apparaît pas encore sur le lien tree/main."
    ],
    "question": "Un push réussi implique-t-il que les participants voient le nouveau cours sur main ?",
    "answer": "Non. Si le push vise une branche de travail, il faut encore une fusion vers main.",
    "pitfall": "Ne pas utiliser git add . comme raccourci pédagogique lorsque des fichiers personnels peuvent être présents.",
    "transition": "La CI contrôle précisément les commits confiés au workflow."
  },
  "f10": {
    "goal": "Lire la CI comme une succession d’opérations concrètes et distinguer succès des tests et succès de l’installation.",
    "say": [
      "« GitHub prépare une machine Ubuntu, récupère le dépôt, installe le Python défini dans .python-version et uv, puis reconstruit les dépendances verrouillées. Ruff et pytest tournent ensuite. L’ordre et les commandes proviennent du workflow réel. »",
      "contents: read limite le jeton GitHub fourni au job ; cela ne rend pas tout le processus inoffensif ni sans accès réseau. Un workflow exécute du code. Le verrouillage des dépendances et la revue du workflow restent utiles. Lors du premier montage de notre CI, une référence setup-uv invalide a empêché l’installation : les tests n’étaient pas la cause."
    ],
    "demo": [
      "Ouvrir le workflow source et nommer chaque étape. Les versions d’actions visibles sont celles du dépôt de référence, pas une recommandation universelle d’installation.",
      "Dans Actions, ouvrir une exécution et montrer le journal d’une étape. Expliquer qu’un push et une PR peuvent produire deux exécutions distinctes."
    ],
    "question": "Un check rouge impose-t-il de modifier le test Python ?",
    "answer": "Non. Il faut d’abord identifier l’étape échouée : installation, linting, tests ou autre. Corriger le test sans diagnostic peut masquer le problème.",
    "pitfall": "Un test passing localement ne garantit pas un résultat distant ; inversement, une CI verte ne prouve ni exhaustivité fonctionnelle ni absence de vulnérabilité.",
    "transition": "La revue humaine complète cette preuve automatisée."
  },
  "f11": {
    "goal": "Séparer protection technique, revue et responsabilité.",
    "say": [
      "« Le dépôt de formation a été configuré avec PR et check obligatoires, conversations résolues et protection de main. Les réglages doivent être vérifiés avant une nouvelle session. Les documents décrivent un travail solo avec zéro approbation obligatoire ; cela n’est pas équivalent à zéro revue. »",
      "Lorsque nous sommes plusieurs, une exigence d’approbation peut être renforcée selon l’organisation. Aucune de ces règles ne garantit à elle seule qu’un humain a lu intelligemment le diff. Dans le cours, nous rendons cette décision explicite."
    ],
    "demo": [
      "Comparer la page d’une PR ouverte et celle d’une PR fusionnée.",
      "Expliquer le retour local : fetch, switch main puis pull --ff-only, avec arrêt si des modifications inattendues sont présentes."
    ],
    "question": "Pourquoi garder une décision humaine si la CI est verte ?",
    "answer": "Les tests sont un échantillon du contrat. Le besoin, le périmètre et le moment d’intégration exigent une appréciation supplémentaire.",
    "pitfall": "Ne pas affirmer que GitHub connaît l’intention métier ni que zéro approbation interdit les fusions automatisées.",
    "transition": "Vérifions que chacun sait maintenant reconnaître les étapes."
  },
  "f12": {
    "goal": "Évaluer les distinctions essentielles avant de pratiquer un outil.",
    "say": [
      "Donnez une minute de réflexion, puis faites reformuler le scénario par deux participants. Demandez une explication complète plutôt que trois mots. Le changement existe sur la branche distante ; les checks CI, le diff et le périmètre doivent être examinés ; une fusion acceptée le fera entrer dans main.",
      "Si quelqu’un confond push et fusion, reprenez la séquence précédente avec les noms de branches. Si l’on confond agent et GitHub Actions, demandez qui produit le changement et qui le vérifie."
    ],
    "demo": [
      "Faire écrire un mandat en six rubriques pour une petite amélioration de test.",
      "Conserver ce mandat comme référence de départ de la leçon Copilot."
    ],
    "question": "Quels sont les trois éléments que vous emportez pour déléguer demain ?",
    "answer": "Un périmètre et des critères explicites ; des preuves vérifiables ; une limite d’autonomie avec décision d’intégration.",
    "pitfall": "Les participants ne doivent pas mémoriser des SHA ou des noms de version. Évaluer la compréhension des responsabilités.",
    "transition": "Nous allons appliquer ce cadre dans VS Code avec Copilot."
  },
  "p01": {
    "goal": "Donner le livrable observable de la leçon.",
    "say": [
      "« Nous reprenons exactement la discipline de la première leçon. Copilot est le client avec lequel nous allons dialoguer. VS Code permet de réunir la conversation, les fichiers, le terminal et le diff. »",
      "Le code reste simple : l’objectif est de suivre qui autorise quoi, où le changement se trouve et quand il devient partagé. Les deux tests portent sur additionner(0, 5) et additionner(-2, -3)."
    ],
    "demo": [
      "Montrer la PR #9 comme preuve finale visée.",
      "Annoncer la distinction entre relecture historique et atelier reproductible dans une copie dédiée."
    ],
    "question": "Pourquoi choisir un changement aussi petit ?",
    "answer": "Il est facile à comprendre et à relire ; toute modification supplémentaire devient immédiatement visible.",
    "pitfall": "Ne pas laisser la démonstration dériver vers des refontes ou des suggestions de fonctionnalité.",
    "transition": "Préparons le point de départ."
  },
  "p02": {
    "goal": "Éviter un atelier qui ne marche que sur un ancien état implicite.",
    "say": [
      "« La PR #9 est un résultat historique. Pour la montrer, nous pouvons lire son diff. Pour la refaire, il faut repartir de son état antérieur dans une copie d’atelier, pas supprimer les tests de main. »",
      "Le résultat historique avant ce laboratoire comptait dix tests ; après, douze. Sur main après la leçon Claude, on en trouve treize. Le bon critère est le changement attendu par rapport au point de départ, pas la répétition aveugle d’un nombre."
    ],
    "demo": [
      "Par défaut : ouvrir la PR #9, consulter Files changed et les validations, sans modifier main.",
      "Pour un atelier préparé : utiliser un clone séparé ou un fork de formation au commit parent 169ed1541d509a02a8ab3fb682caaad6e43f7fe8^1. Créer ensuite une branche d’atelier propre. Préparer cet environnement avant la séance, avec un dépôt cible autorisé pour les PR."
    ],
    "question": "Si le test existe déjà, que doit faire l’agent ?",
    "answer": "Le signaler, expliquer le résultat de son inspection et ne pas créer de doublon.",
    "pitfall": "Ne pas réinitialiser le clone de travail partagé pour reproduire l’histoire. Si l’état est sale ou inattendu, s’arrêter et l’expliquer.",
    "transition": "Repérons maintenant les commandes de l’interface."
  },
  "p03": {
    "goal": "Éviter les confusions observées dans les menus de Copilot.",
    "say": [
      "« L’icône Copilot et les fonctions de suggestions en ligne ne sont pas à elles seules le panneau de délégation. Ouvrez Chat, puis repérez le mode Agent. Dans notre session, Auto était le réglage de modèle. »",
      "Les intitulés varient selon la version de VS Code et l’extension. Il faut vérifier les contrôles réellement affichés sur le poste. Le point durable est la séparation entre mode, modèle et approbation des actions. Ne déduisez pas les permissions du mot Auto."
    ],
    "demo": [
      "Montrer Chat et les réglages visibles, puis Source Control et le dossier ouvert.",
      "Conserver des confirmations adaptées à l’exercice. Lire une demande d’outil avant de l’approuver."
    ],
    "question": "Auto signifie-t-il « fusionne automatiquement toutes les PR » ?",
    "answer": "Non. Dans cet écran, Auto concerne le modèle. La fusion dépend de la consigne, des outils et des droits.",
    "pitfall": "Ne pas présenter les menus d’une version comme universels, ni promettre qu’une confirmation apparaît pour chaque action.",
    "transition": "La première consigne n’autorise que l’analyse."
  },
  "p04": {
    "goal": "Construire un contexte précis sans déclencher de modification.",
    "say": [
      "« Dans l’exercice réel, Copilot a indiqué qu’il ne pouvait pas confirmer le code sans ouvrir les fichiers alors que les commandes étaient interdites. Nous avons clarifié la lecture autorisée. Il est utile qu’un agent rende cette ambiguïté visible. »",
      "Il ne faut pas interpréter l’absence de permission de commande comme une obligation d’inventer. Une lecture par outil peut être autorisée sans permettre le terminal. Vérifiez la réponse : elle doit nommer additionner, est_pair et est_multiple_de_trois dans l’état choisi."
    ],
    "demo": [
      "Copier le prompt, puis comparer la réponse aux fichiers.",
      "Si les tests cibles existent déjà, passer à la lecture de la PR historique ou utiliser l’environnement d’atelier préparé."
    ],
    "question": "Peut-on juger la réponse uniquement sur son assurance ?",
    "answer": "Non. Les fonctions et tests annoncés doivent correspondre aux fichiers effectivement lus.",
    "pitfall": "Ne pas attribuer à Claude l’ambiguïté initiale de lecture observée avec Copilot. Le support distingue les deux sessions.",
    "transition": "Après validation du besoin, accordons l’écriture d’un seul fichier."
  },
  "p05": {
    "goal": "Pratiquer une délégation d’écriture sans publication.",
    "say": [
      "« Nous séparons la modification de sa publication. Cela permet de relire le résultat avant qu’un commit soit poussé. L’agent n’a pas à corriger calcul.py pour cet exercice : le comportement fonctionne déjà. »",
      "Les prompts du site peuvent être copiés, mais ne sont jamais exécutés par le site. Le participant doit les soumettre à son agent dans l’environnement d’atelier. S’il n’a pas cet environnement, il suit la démonstration historique."
    ],
    "demo": [
      "Faire identifier le fichier autorisé et les quatre actions Git interdites.",
      "Laisser l’agent exécuter les deux validations autorisées puis lire leur sortie, pas uniquement la phrase « terminé »."
    ],
    "question": "Si Ruff échoue sur un fichier sans rapport, l’agent peut-il lancer une refonte générale ?",
    "answer": "Non. Il rapporte l’échec et son origine ; un élargissement du périmètre doit être décidé explicitement.",
    "pitfall": "Ne pas modifier des tests pour masquer un échec ni installer une dépendance non demandée en silence.",
    "transition": "Comparons le compte rendu à ce qui a réellement changé."
  },
  "p06": {
    "goal": "Appliquer l’amélioration issue de la revue de documentation #10.",
    "say": [
      "« Une revue qui ne regarde que Changes est incomplète. Un autre fichier peut déjà être dans Staged Changes. git add tests/test_calcul.py ne l’enlèvera pas : le prochain commit embarquera les deux. »",
      "Lisez le statut global, puis le diff de travail. Avant l’ajout, vérifiez l’index. Après l’ajout, relisez-le encore pour connaître le contenu exact du commit. Si un fichier inattendu est là, identifiez son propriétaire et son rôle avant de toucher à quoi que ce soit."
    ],
    "demo": [
      "Montrer les deux sections de Source Control. Sur un état propre, expliquer pourquoi elles peuvent être vides.",
      "Ouvrir le diff historique : deux tests, huit lignes ajoutées dans la PR #9."
    ],
    "question": "Changes est vide. Peut-on conclure qu’aucun commit n’est à préparer ?",
    "answer": "Pas avec cette seule zone. Il faut également regarder Staged Changes et l’état de la branche.",
    "pitfall": "Les fichiers ignorés peuvent rester sur disque et être accessibles à un agent. Une exclusion Git n’est pas une restriction d’accès.",
    "transition": "Une fois la sélection approuvée, on peut publier une proposition."
  },
  "p07": {
    "goal": "Faire observer la transition du travail local vers GitHub.",
    "say": [
      "« Nous autorisons maintenant plusieurs opérations précises. Elles étaient interdites au niveau précédent. Le compte rendu final doit fournir une URL de PR et le périmètre publié. Un push seul ne suffit pas à remplir ce mandat. »",
      "Pour répéter l’exercice, convenez d’un nom de branche unique et du dépôt cible. Les branches historiques sont des repères du cours, pas des noms à réutiliser aveuglément dans un dépôt partagé."
    ],
    "demo": [
      "Repérer dans le terminal ou le journal de l’agent le commit, le push, puis la création de PR.",
      "Comparer le résultat annoncé à la page GitHub : source, cible, commit, fichier."
    ],
    "question": "Où la PR est-elle créée si l’agent utilise le terminal ?",
    "answer": "Sur GitHub, via une API ou GitHub CLI. Le terminal sert de client ; la PR n’est pas un objet Git local.",
    "pitfall": "Ne pas accepter une demande de fusion parce qu’elle suit naturellement l’ouverture de la PR : le mandat s’arrête avant.",
    "transition": "GitHub fournit maintenant une vue indépendante du résultat poussé."
  },
  "p08": {
    "goal": "Savoir conduire une revue simple sans la réduire à un check vert.",
    "say": [
      "« Le premier contrôle est le périmètre. Le second est le sens des assertions. Le troisième est la validation indépendante. Enfin, regardez si des discussions restent ouvertes et qui décide de l’intégration. »",
      "Les douze tests annoncés sont le résultat de cette version du dépôt. Le site ne surveille pas les checks en direct : les valeurs présentées décrivent la séance et les sources figées. Pour une PR nouvelle, consultez ses propres checks."
    ],
    "demo": [
      "Ouvrir la PR #9 avec le lien de preuve au bas de l’écran.",
      "Faire lire les deux assertions à voix haute puis montrer leur relation avec le mandat."
    ],
    "question": "Deux checks verts prouvent-ils deux relectures humaines ?",
    "answer": "Non. Le push et la PR peuvent déclencher deux exécutions du même workflow. La revue est une autre activité.",
    "pitfall": "Une discussion non résolue peut bloquer la fusion même avec des tests verts. Traiter son contenu avant de la résoudre.",
    "transition": "La fusion ouvre encore une étape locale."
  },
  "p09": {
    "goal": "Terminer le workflow jusqu’à l’état local cohérent.",
    "say": [
      "« fetch met à jour notre connaissance du distant. switch choisit la branche locale. pull --ff-only ne met main à jour que sans créer de fusion locale implicite. Si Git refuse, nous inspectons l’état au lieu de forcer. »",
      "Un répertoire sans modifications peut néanmoins être en avance d’un commit. Propre décrit les fichiers ; aligné décrit la relation entre branches. C’est exactement la confusion qui a rendu l’incident suivant intéressant."
    ],
    "demo": [
      "Montrer un statut main...origin/main et expliquer ce qu’il ne dit pas si la dernière récupération est ancienne.",
      "Nommer la différence entre branche locale, branche distante et référence origin/branche."
    ],
    "question": "Pourquoi garder --ff-only ?",
    "answer": "Pour refuser une intégration locale divergente non décidée et rendre la situation visible.",
    "pitfall": "Ne pas changer de branche ou réinitialiser si des modifications appartiennent à un autre travail. Comprendre d’abord l’état.",
    "transition": "Un commit accidentel permet d’exercer ce diagnostic."
  },
  "p10": {
    "goal": "Faire raisonner sur un incident sans distribuer une recette destructive.",
    "say": [
      "« L’utilisateur avait créé un commit par erreur. Nous avons identifié qu’il portait uniquement sur une configuration locale. Le commit n’était pas poussé. Avec son accord, il a été retiré de main tout en conservant le fichier sur disque. »",
      "Le support ne propose pas de reset à exécuter automatiquement : une correction dépend de l’historique, du partage éventuel et du travail à préserver. Un commit déjà publié demande une autre décision. Dans notre cas, une exclusion locale a ensuite réduit le risque d’ajout ordinaire."
    ],
    "demo": [
      "Lire le statut et la liste des fichiers d’un commit ; ne pas projeter le contenu sensible d’une configuration.",
      "Montrer le rôle de .git/info/exclude sans ouvrir le fichier personnel .mcp.json."
    ],
    "question": "Un fichier ignoré est-il impossible à committer ?",
    "answer": "Non. Une exclusion évite l’ajout ordinaire d’un fichier non suivi ; un ajout forcé peut la contourner. Les fichiers déjà suivis restent suivis.",
    "pitfall": "Ne pas attribuer cet incident à l’agent : l’utilisateur a explicitement indiqué l’avoir créé lui-même.",
    "transition": "Nous pouvons maintenant comparer les deux lieux d’exécution de Copilot."
  },
  "p11": {
    "goal": "Comparer l’exercice local au cas cloud sans quitter le sujet du module.",
    "say": [
      "« Le cloud agent de la PR #5 a ajouté est_multiple_de_trois. La PR #9 est issue de Copilot dans VS Code. GitHub héberge les deux propositions, mais cela ne signifie pas que le travail s’est déroulé au même endroit. »",
      "Ce qui compte pour la délégation, c’est le contexte disponible, les outils, les permissions et le résultat attendu. Les conditions exactes des services et leur interface évoluent ; les tableaux du cours décrivent le laboratoire."
    ],
    "demo": [
      "Comparer les pages des PR #5 et #9.",
      "Demander où les tests de l’agent ont été exécutés, puis où la CI indépendante a été exécutée."
    ],
    "question": "L’agent cloud voit-il automatiquement la configuration personnelle non poussée du Mac ?",
    "answer": "Non. Il travaille sur le contexte distant qui lui est fourni et ses accès autorisés, pas sur une copie implicite du disque local.",
    "pitfall": "Ne pas assimiler « distant » à « sûr » ou « local » à « privé ». Les accès réels font la différence.",
    "transition": "Vérifions les points de passage avant de changer d’outil."
  },
  "p12": {
    "goal": "Évaluer la capacité à terminer une tâche, pas seulement à lancer un agent.",
    "say": [
      "Faites expliquer par un participant les états successifs du changement. Un autre vérifie qu’il n’a omis ni l’index ni la CI. Demandez enfin quelle phrase du mandat empêche de confondre publication et intégration.",
      "L’exercice est réussi si le participant peut justifier ses autorisations et lire le résultat. Ne notez pas la rapidité à cliquer sur tous les dialogues."
    ],
    "demo": [
      "Faire rédiger un compte rendu de quatre lignes : changement, contrôles, PR et limite restante.",
      "Si une anomalie est proposée, demander le contrôle le plus ciblé qui permettrait de la comprendre."
    ],
    "question": "La consigne « ne fusionne pas » est-elle devenue inutile une fois la CI verte ?",
    "answer": "Non. Les conditions de qualité et le droit d’intégrer sont distincts.",
    "pitfall": "Ne pas déclarer le module entier maîtrisé parce qu’un seul petit TP a réussi. C’est une base de pratique contrôlée.",
    "transition": "Nous allons reproduire le processus avec Claude Code dans le terminal."
  },
  "c01": {
    "goal": "Relier la nouvelle interface aux acquis du module précédent.",
    "say": [
      "« Nous gardons le dépôt, les tests, Git et GitHub. Nous changeons le client agent et l’interface. Claude Code a reçu un mandat qui s’élargissait étape par étape, exactement comme Copilot. »",
      "Le test ajouté couvre un entier négatif non divisible par trois. Le code de production fonctionne déjà. Nous chercherons surtout les preuves du respect du périmètre et la clarté de la restitution."
    ],
    "demo": [
      "Montrer le module 03 et la PR #11.",
      "Préciser que le support raconte les actions observées, et n’impose pas une version de modèle ou un libellé d’interface."
    ],
    "question": "Quels contrôles peut-on réutiliser sans les changer ?",
    "answer": "Lecture des règles, pytest, Ruff, diff de travail, diff indexé, revue PR et CI.",
    "pitfall": "Ne pas transformer la comparaison en classement de modèles à partir d’un seul petit exercice.",
    "transition": "Commençons par le lieu d’exécution et les permissions."
  },
  "c02": {
    "goal": "Savoir où l’agent travaille et ce que l’interface indique réellement.",
    "say": [
      "« Pendant la session observée, l’écran affichait manual mode on, un modèle et API Usage Billing. Ce sont des informations de cette session, pas des prérequis universels de ce support. Avant la formation, vérifiez l’installation, l’authentification et la facturation du compte utilisé. »",
      "Le point de départ de l’exercice historique est antérieur à la PR #11, avec douze tests. Sur main actuel, le treizième test est déjà là. Utilisez la PR comme démonstration ou préparez une copie d’atelier au parent 17678d750453b5dc5c1f2daf6b7c37b22524668d^1. Ne retirez pas de tests du dépôt partagé."
    ],
    "demo": [
      "Montrer le répertoire affiché au lancement et localiser les demandes de permission.",
      "Distinguer la sortie d’une action terminée de la suggestion de saisie en bas de l’interface."
    ],
    "question": "Une ligne proposée après l’invite prouve-t-elle que la commande a été exécutée ?",
    "answer": "Non. Il faut observer un appel d’outil et sa sortie ou un résultat vérifié. Une suggestion peut n’avoir jamais été envoyée.",
    "pitfall": "Ne pas recopier une suggestion comme s’il s’agissait d’une instruction déjà exécutée.",
    "transition": "Le premier mandat demande explicitement les lectures."
  },
  "c03": {
    "goal": "Ancrer la réponse dans des fichiers, sans supposer une mémoire automatique.",
    "say": [
      "« Claude a lu les trois fichiers puis décrit trois fonctions et douze tests dans l’état historique. Nous ne lui demandons pas de modifier quoi que ce soit. Les règles de ce dépôt entrent dans son contexte parce que la lecture a été demandée. »",
      "Ne confondez pas cette lecture explicite avec les mécanismes automatiques d’instructions d’un client. Le support ne suppose pas qu’AGENTS.md serait chargé automatiquement dans toutes les installations de Claude Code."
    ],
    "demo": [
      "Comparer les fonctions annoncées avec calcul.py.",
      "Contrôler que les cas négatifs True sont couverts, puis rechercher le cas négatif False manquant dans l’état d’atelier."
    ],
    "question": "Quel énoncé serait suspect dans une réponse sans lecture des fichiers ?",
    "answer": "Toute affirmation précise sur les fonctions, les tests ou la configuration actuelle non fondée sur un contexte effectivement fourni.",
    "pitfall": "La version actuelle possède déjà le cas cible ; accepter une analyse qui le signale plutôt que forcer un diagnostic historique faux.",
    "transition": "Expliquons la valeur du petit test proposé."
  },
  "c04": {
    "goal": "Justifier le test sans exagérer ce qu’il protège.",
    "say": [
      "« En Python, avec un diviseur positif, le reste de −4 modulo 3 vaut 2. Mais pour la divisibilité, ce qui compte est simplement de savoir si le reste vaut zéro. Le test renforce la couverture des entrées négatives qui donnent False. »",
      "Il ne faut pas dire que toute utilisation d’abs casse ce comportement : abs(n) % 3 == 0 préserve la divisibilité. Le bon argument est le contrat de test et l’asymétrie de couverture, pas une régression hypothétique mal démontrée. is False vérifie l’identité avec le booléen False, et pas seulement une valeur fausse comme zéro."
    ],
    "demo": [
      "Lire les deux assertions est_multiple_de_trois(-6) is True et est_multiple_de_trois(-4) is False.",
      "Demander quel fichier doit changer si l’implémentation répond déjà au comportement."
    ],
    "question": "Doit-on modifier calcul.py pour rendre ce test utile ?",
    "answer": "Non. Un test peut renforcer la spécification d’un comportement existant sans changement de production.",
    "pitfall": "Ne pas ajouter de validation des types ou de nouveaux contrats non demandés dans cet exercice.",
    "transition": "Le mandat d’écriture tient alors en quelques lignes."
  },
  "c05": {
    "goal": "Exercer la délégation d’une modification petite et bornée.",
    "say": [
      "« Autorisez les actions correspondant au mandat. Si Claude propose d’autres opérations, lisez leur justification et leur effet avant de décider. Le simple fait qu’un outil soit disponible ne signifie pas qu’il entre dans le périmètre. »",
      "Dans l’exercice réel, Claude a ajouté quatre lignes au fichier de tests et rapporté treize réussites et Ruff vert. Ces faits ne sont pas encore une revue indépendante : nous allons inspecter le diff."
    ],
    "demo": [
      "Lire le nom du nouveau test et l’assertion.",
      "Observer le résultat de pytest et Ruff. Un résultat absent n’est pas un résultat réussi."
    ],
    "question": "Si la session n’a pas le droit d’exécuter pytest, peut-elle annoncer une validation ?",
    "answer": "Non. Elle doit indiquer que le test n’a pas été exécuté et expliquer la limite.",
    "pitfall": "Ne pas approuver un commit lors de cette étape : la publication n’est pas encore autorisée.",
    "transition": "La prochaine étape consiste à lire Git sans rien changer."
  },
  "c06": {
    "goal": "Savoir interpréter une sortie partielle et une sortie vide.",
    "say": [
      "« Dans la session réelle, l’utilisateur a d’abord transmis un extrait incomplet du diff. Nous n’avions pas encore la preuve sur l’index. La lecture supplémentaire a confirmé qu’il était vide. Ce n’était pas une formalité : un fichier déjà indexé aurait pu se retrouver dans le commit. »",
      "Lire seulement les lignes de contexte d’un diff ne suffit pas à approuver l’ajout. Affichez également les lignes préfixées par + et vérifiez leur sens. Après git add, le diff utile sera le diff indexé."
    ],
    "demo": [
      "Expliquer les colonnes courtes du statut sans présumer que tous les participants les connaissent.",
      "Faire lire l’ajout exact et la sortie vide de git diff --cached avant l’indexation."
    ],
    "question": "git diff --cached vide veut-il dire qu’il n’existe aucune modification locale ?",
    "answer": "Non. Des modifications peuvent rester dans l’arbre de travail, hors de l’index. Il faut les autres lectures.",
    "pitfall": "Ne pas conclure sur un extrait tronqué. Demander la partie manquante ou une restitution complète.",
    "transition": "Nous disposons maintenant des preuves nécessaires pour publier."
  },
  "c07": {
    "goal": "Faire vérifier le résultat distant après une publication autorisée.",
    "say": [
      "« Le titre du commit indique le changement, la branche isole la proposition et la PR donne le lieu de revue. Le mandat demande aussi une restitution : nous voulons pouvoir ouvrir une URL et vérifier le résultat. »",
      "Dans un atelier répété, le nom de branche et le dépôt cible doivent être propres à la session. N’envoyez pas tous les participants sur la branche historique ou vers un dépôt auquel ils ne doivent pas écrire."
    ],
    "demo": [
      "Retrouver le commit 35bba50 de la PR #11 et le fichier tests/test_calcul.py.",
      "Montrer le lien source/cible de la PR et distinguer push et ouverture de PR."
    ],
    "question": "Pourquoi vérifier à nouveau le diff après l’indexation ?",
    "answer": "Parce que c’est alors la sélection effective du prochain commit. Le contrôle avant ajout n’est pas une garantie sur son état après ajout.",
    "pitfall": "Une phrase « un seul fichier » doit être confrontée aux fichiers réellement inclus dans le commit.",
    "transition": "Une ligne d’attribution dans le commit a soulevé une question utile."
  },
  "c08": {
    "goal": "Expliquer le message réel et éviter une réécriture inutile d’historique.",
    "say": [
      "« La session de Claude indiquait que sa configuration ajoutait une attribution. Nous l’avons conservée : le titre demandé était correct et les fichiers n’avaient pas changé. La présence de cette ligne dépend de la configuration ; elle n’est pas une règle universelle imposée à tous les commits. »",
      "git commit --amend aurait créé un nouvel objet Git, avec un autre identifiant. Sur une branche déjà publiée, cela peut impliquer une réécriture distante. Rien dans notre besoin pédagogique n’exigeait cette opération."
    ],
    "demo": [
      "Dans Commits de la PR #11, distinguer le titre du corps du message.",
      "Lire le diff pour rappeler que la preuve fonctionnelle porte sur les fichiers."
    ],
    "question": "L’attribution prouve-t-elle que le test est correct ?",
    "answer": "Non. Elle documente une contribution ; les tests, la revue et la CI évaluent le changement.",
    "pitfall": "Ne pas promettre qu’une configuration d’attribution donnée s’applique à toutes les installations de Claude Code.",
    "transition": "Passons aux contrôles qui ont précédé la fusion."
  },
  "c09": {
    "goal": "Décrire fidèlement la différence entre décider et exécuter.",
    "say": [
      "« Ici, l’utilisateur a demandé explicitement de fusionner la PR #11. La fusion a été exécutée par l’assistant via GitHub CLI, après une nouvelle lecture des checks et de l’état de la PR. Dire simplement “clic manuel dans GitHub” serait imprécis pour cet épisode. »",
      "Les contrôles verts autorisaient une intégration selon les règles techniques du dépôt ; ils ne remplaçaient pas cette demande. L’agent de développement Claude s’était arrêté à la PR."
    ],
    "demo": [
      "Ouvrir la PR #11 et son état fusionné.",
      "Distinguer le commit de travail 35bba50 et le commit de fusion 17678d7."
    ],
    "question": "Qui a décidé de la fusion, et quel outil l’a exécutée ?",
    "answer": "L’utilisateur a pris la décision explicite ; l’assistant a exécuté la fusion sur GitHub. Claude avait produit la proposition.",
    "pitfall": "Ne pas assimiler « décision humaine » à une obligation de clic manuel, ni à une permission générale de fusionner d’autres PR.",
    "transition": "Il reste à remettre la copie locale en état de référence."
  },
  "c10": {
    "goal": "Enseigner la fermeture du cycle sans banaliser les suppressions.",
    "say": [
      "« Après fusion, Claude a synchronisé main. La suppression locale puis distante a été demandée séparément, avec des cibles précises. Dans cet exercice, les commits étaient bien intégrés et la PR restait consultable. »",
      "git branch -d refuse certaines suppressions de branches non fusionnées ; il ne remplace pas l’inspection de la bonne cible et de l’intégration dans main. --prune ne supprime pas une branche qui existe encore sur le serveur : il nettoie les références locales de branches distantes déjà supprimées."
    ],
    "demo": [
      "Nommer distinctement test/multiple-negatif-non-multiple en local et la branche de même nom sur origin.",
      "Lire le statut final communiqué : main au commit 17678d7, travail propre, puis 13 tests et Ruff réussis."
    ],
    "question": "Supprimer la branche distante efface-t-il la PR fusionnée ?",
    "answer": "Non. Dans ce cas, la PR reste consultable et les commits intégrés restent dans main.",
    "pitfall": "Ne pas automatiser une suppression sur une branche inconnue ni proposer -D pour contourner un refus sans diagnostic.",
    "transition": "Comparons ce qui a changé et ce qui a tenu entre les outils."
  },
  "c11": {
    "goal": "Faire une comparaison factuelle et transférable.",
    "say": [
      "« Copilot et Claude ont travaillé sur des cas simples, à des moments différents du dépôt. Les résultats ne constituent pas un benchmark de performance ou de qualité globale. En revanche, le protocole de délégation et de revue est comparable. »",
      "Demandez à la salle ce qui était plus lisible dans chaque interface : les permissions, les diffs, la continuité de la conversation ou les commandes. Les préférences d’interface sont légitimes ; les preuves de validation restent nécessaires dans les deux cas."
    ],
    "demo": [
      "Faire remplir oralement les quatre critères avec un exemple de Copilot puis de Claude.",
      "Conserver une amélioration de mandat issue de la comparaison."
    ],
    "question": "Que change le passage de VS Code au terminal dans les critères d’acceptation ?",
    "answer": "Rien au comportement attendu. L’interface et la manière d’inspecter changent, pas le contrat ni les exigences de preuve.",
    "pitfall": "Ne pas noter les agents sur la seule fluidité de leur compte rendu.",
    "transition": "Terminons par une situation nouvelle à résoudre sans outil."
  },
  "c12": {
    "goal": "Vérifier le transfert des acquis au-delà des exemples déjà vus.",
    "say": [
      "Laissez les participants formuler une réponse avant de donner le corrigé. Les tests verts ne suffisent pas : il faut comprendre les trois fichiers, leur nécessité et leur conformité au besoin. Le travail hors périmètre ne doit pas être publié sans décision explicite.",
      "Le résultat attendu du parcours est une autonomie de l’ingénieur : savoir écrire un mandat, inspecter le contexte, autoriser une action, lire un diff et intégrer une proposition. Les modules suivants approfondiront les autres outils et le contexte ; ce support s’arrête volontairement aux trois premières leçons."
    ],
    "demo": [
      "Faire rédiger un mandat réutilisable avec résultat, fichiers, contrôles, arrêt et restitution.",
      "Demander une auto-évaluation : expliquer CI, distinguer commit/push/PR, lire l’index, choisir une permission et terminer sur main."
    ],
    "question": "Quel serait un bon prochain message à l’agent ?",
    "answer": "« Explique le rôle des trois fichiers et présente leur diff. Ne publie rien. Reviens au périmètre autorisé si les ajouts sont inutiles ; signale toute extension réellement nécessaire avant d’agir. »",
    "pitfall": "Ne pas demander de supprimer ou d’écraser aveuglément les fichiers supplémentaires : ils peuvent appartenir à un travail antérieur.",
    "transition": "Inviter la salle à conserver le mandat et la grille de revue comme outils pour ses propres projets."
  }
};
