# Support web — les trois premières leçons

Site statique en français, sans dépendance JavaScript, sans compte et sans appel
à un service tiers. Il transforme les modules du dépôt en un support d’animation :
36 séquences, 12 par leçon, environ 2 h 44 hors pauses (durées indicatives).

## Ouvrir le site

Depuis la racine du dépôt :

```bash
python3 -m http.server 8765 --bind 127.0.0.1 --directory cours
```

Ouvrir [l’accueil local](http://127.0.0.1:8765/).
Le serveur expose seulement ce dossier sur le poste local, pas le dépôt entier.
Arrêter le serveur avec Ctrl+C. Choisir un autre port si 8765 est déjà utilisé.

On peut également ouvrir `index.html` directement dans un navigateur : le
contenu et la navigation fonctionnent sans serveur. Le serveur local est
recommandé pour la copie dans le presse-papiers et la synchronisation des vues.

## Deux surfaces réellement distinctes

- `audience.html` : concepts, tableaux, schémas, exemples et questions à projeter.
  Cette page ne charge **pas** `speaker-notes.js`.
- `teacher.html` : aperçu de la projection, intention pédagogique, trame orale,
  démonstration, question avec réponse attendue, point de vigilance et transition.

Depuis la console intervenant, **Ouvrir la projection** crée une vue auditoire
liée à la session. Déplacer cette fenêtre sur l’écran de projection ou partager
uniquement cet onglet en visioconférence. Les changements de séquence depuis la
console sont transmis à la projection via `BroadcastChannel`.

Cette synchronisation suppose le même navigateur, la même origine (hôte et
port), la même session dans l’URL et la prise en charge de BroadcastChannel.
Elle ne relie pas les ordinateurs des participants. La projection peut aussi
être utilisée de façon autonome. Si les fenêtres surgissantes sont bloquées,
le site affiche un message.

La séparation est pédagogique, **pas un contrôle d’accès**. Publier tout le
dossier rend aussi la console intervenant accessible à qui connaît son URL.
Pour une publication réservée à l’auditoire, ne pas publier `teacher.html` ni
`speaker-notes.js`, et adapter les liens de l’accueil ; un espace intervenant
réellement privé nécessite une protection au niveau de l’hébergement.

## Navigation et impression

- Boutons Précédent / Suivant ou flèches gauche / droite hors contrôles de saisie.
- Sélecteur de leçon côté auditoire ; sommaire de séquences côté intervenant.
- Liens directs : `audience.html#f01`, `audience.html#p01`, `audience.html#c01`.
- Le fragment de l’URL conserve la séquence lors d’un rechargement.
- Le bouton Copier copie du texte : aucune commande n’est exécutée par le site.
- Plein écran utilise la fonction du navigateur, avec message si indisponible.
- Imprimer la leçon génère les 12 séquences de la leçon courante.
- Imprimer le conducteur ajoute les notes à ces 12 séquences. Le navigateur
  peut ensuite enregistrer en PDF. L’impression native des pages de leçon est
  aussi prise en charge.
- L’accueil propose les prérequis, le lexique et les sources.

## Parcours et preuves

| Leçon | Séquences | Durée indicative | Cas étudié |
| --- | --- | --- | --- |
| 01 — Fondamentaux | 12 | 55 min | Fonction est_pair, PR #2 ; comparaison PR #5 |
| 02 — Copilot dans VS Code | 12 | 55 min | Deux tests d’addition, PR #9 |
| 03 — Claude Code | 12 | 54 min | Négatif non multiple de trois, PR #11 |

Les sources sont figées au commit
`1bffca0ce6ad5a942b8423b7ec19c37124f7b7b7` :

- `01-fondamentaux-agentic-se/README.md` ;
- `02-copilot-agent-mode/README.md` ;
- `03-claude-code/README.md` ;
- `08-testing-review-security/README.md` ;
- `.github/workflows/ci.yml` ;
- `AGENTS.md`.

Le module 08 et le workflow fournissent les explications de validation
transversales ; ils ne constituent pas une quatrième leçon.
Les chiffres de tests et états des PR sont historiques, pas des indicateurs
mis à jour en temps réel.

## Préparer les ateliers

Le dépôt actuel contient déjà les tests des PR #9 et #11. Par défaut, utiliser
ces PR comme démonstrations documentaires. Pour une manipulation réelle, préparer
un fork ou une copie dédiée, un dépôt distant autorisé et une branche propre à
chaque participant. Les points de départ historiques sont :

- Copilot : premier parent de `169ed1541d509a02a8ab3fb682caaad6e43f7fe8` ;
- Claude : premier parent de `17678d750453b5dc5c1f2daf6b7c37b22524668d`.

Ces références servent à préparer un environnement isolé avant le cours.
Ne pas réinitialiser le clone partagé ni supprimer des tests sur main pour
rejouer la séance. Chaque prompt prévoit le cas où le test existe déjà.
Les agents restent utilisés avec les accès, permissions et conditions de
facturation de chaque compte ; aucune connexion à leurs API n’est faite ici.

## Précisions éditoriales par rapport aux récits sources

Le support clarifie certains raccourcis des README et de la conversation :

- les niveaux 0 à 4 sont une convention pédagogique ;
- les droits et protections de branche ne réservent pas intrinsèquement la
  fusion à un humain ; on distingue décision explicite et outil d’exécution ;
- pour la PR #11, la décision était humaine et l’exécution a été déléguée à
  l’assistant via GitHub CLI ;
- l’ambiguïté de lecture de fichiers était observée avec Copilot, pas Claude ;
- la lecture d’AGENTS.md a été explicitement demandée à Claude : aucun chargement
  automatique universel n’est affirmé ;
- ignorer un fichier Git n’empêche pas un ajout forcé et ne retire pas un fichier
  déjà suivi ; une exclusion ne restreint pas l’accès de l’agent au disque ;
- « propre » et « à jour avec le distant » sont des états distincts ;
- `contents: read` limite le jeton GitHub, pas tous les effets possibles du job ;
- l’utilisation d’abs ne casse pas, en soi, le test de divisibilité ;
- le pied Co-Authored-By est une observation de session, pas une obligation
  générale de Claude Code ;
- les menus, versions et modèles sont présentés comme des observations, non
  comme des instructions d’installation à jour.

## Modifier le support

- `course.js` : données projetables et liens de sources, avec identifiants stables.
- `speaker-notes.js` : contenu oral distinct, indexé par ces identifiants.
- `app.js` : rendu, navigation, copie, impression et synchronisation.
- `styles.css` : présentation responsive, projection et impression.
- `tests/course.test.mjs` : vérification de cohérence, séparation et sources.

Tout contenu textuel est échappé au rendu ; les prompts sont affichés comme texte.
Ne pas inclure de secret dans les fichiers pédagogiques.

## Vérifier

Avec un Node.js opérationnel :

```bash
node --test cours/tests/course.test.mjs
node --check cours/app.js
uv run pytest
uv run ruff check .
git diff --check
```

Les tests de données vérifient les identifiants, les notes complètes, les
formats des visuels, les sources locales et la séparation des scripts entre les
vues. Ils ne remplacent pas les essais réels au navigateur : parcourir les
36 séquences, ouvrir une projection depuis la console, vérifier la copie et
essayer un écran étroit. La CI Python existante n’exécute pas les tests Node.

Le site peut être hébergé comme un dossier statique. Aucun déploiement ni
modification de GitHub Actions n’est nécessaire pour l’aperçu local.
