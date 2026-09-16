/* Application statique : aucun prompt ni aucune commande n'est exécuté. */
(() => {
  "use strict";
  const course = window.COURSE;
  const view = document.body.dataset.view;
  document.body.classList.add(view);
  const app = document.querySelector("#app");
  const slides = course.lessons.flatMap((lesson) => lesson.slides.map((slide, index) => ({...slide, lesson, index})));
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const number = value => String(value).padStart(2, "0");
  const duration = lesson => lesson.slides.reduce((sum, slide) => sum + slide.minutes, 0);
  const sourceUrl = key => course.repo + "/blob/" + course.revision + "/" + course.sources[key].path;
  const link = (url, label) => '<a href="' + escape(url) + '" target="_blank" rel="noopener noreferrer">' + escape(label) + ' ↗</a>';
  const brand = '<a class="brand" href="index.html" aria-label="BackProp — accueil du cours"><img src="favicon.svg" alt="">backprop<span style="color:#7c9a80">.</span></a>';
  let toastTimer;
  let channel;
  let session = new URLSearchParams(location.search).get("session");
  if (session && !/^[a-zA-Z0-9-]{1,64}$/.test(session)) session = null;
  if (view === "teacher" && !session) {
    session = window.crypto?.randomUUID?.() || "session-" + Date.now();
    const url = new URL(location.href);
    url.searchParams.set("session", session);
    history.replaceState(null, "", url);
  }
  function current() {
    return slides.find(s => s.id === location.hash.slice(1)) || slides[0];
  }
  function toast(message) {
    const el = document.querySelector("#toast");
    el.textContent = message;
    el.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("visible"), 4500);
  }
  function visual(slide) {
    const v = slide.visual;
    if (v.type === "cards") return '<div class="visual-cards">' + v.items.map(([title, text], i) => '<section class="visual-card"><div class="card-index">' + number(i + 1) + '</div><h2>' + escape(title) + '</h2><p>' + escape(text) + '</p></section>').join("") + '</div>';
    if (v.type === "flow") return '<ol class="flow" style="--steps:' + v.items.length + '">' + v.items.map(([title, text], i) => '<li><span class="step">ÉTAPE ' + number(i + 1) + '</span><h2>' + escape(title) + '</h2><p>' + escape(text) + '</p></li>').join("") + '</ol>';
    if (v.type === "table") return '<div class="table-wrap"><table><caption class="sr-only">' + escape(slide.title) + '</caption><thead><tr>' + v.headers.map(h => '<th scope="col">' + escape(h) + '</th>').join("") + '</tr></thead><tbody>' + v.rows.map(row => '<tr>' + row.map(cell => '<td>' + escape(cell) + '</td>').join("") + '</tr>').join("") + '</tbody></table></div>';
    if (v.type === "code") return '<div class="code-block"><div class="code-top"><span>' + escape(v.label) + '</span><button type="button" data-copy="' + slide.id + '" aria-label="Copier le texte de cette séquence">Copier</button></div><pre><code>' + escape(v.code) + '</code></pre></div>';
    return '<ol class="quiz">' + v.questions.map(q => '<li>' + escape(q) + '</li>').join("") + '</ol>';
  }
  function evidence(slide) {
    const prs = slide.id === "f08" ? [2] : slide.id === "p08" ? [9] : slide.id === "p11" ? [5, 9] : ["c08","c09"].includes(slide.id) ? [11] : [];
    return '<div class="slide-sources"><span>Sources</span>' + slide.lesson.sources.slice(0, 2).map(key => link(sourceUrl(key), course.sources[key].label)).join("") + prs.map(n => link(course.repo + "/pull/" + n, "PR #" + n)).join("") + '</div>';
  }
  function slideContent(slide, mini = false) {
    return '<div class="slide-label"><span class="eyebrow">' + escape(slide.kind) + '</span><span class="pill">' + slide.minutes + ' min · indicatif</span></div>' +
      '<' + (mini ? 'h2' : 'h1') + ' tabindex="-1">' + escape(slide.title) + '</' + (mini ? 'h2' : 'h1') + '>' +
      '<p class="lead">' + escape(slide.lead) + '</p>' + visual(slide) +
      '<div class="takeaway"><span>À RETENIR</span><p>' + escape(slide.takeaway) + '</p></div>' + (mini ? "" : evidence(slide));
  }
  function sidebar(teacher = false) {
    const active = current();
    return '<aside class="sidebar">' + brand + '<p class="eyebrow">Le parcours / 01—03</p>' +
      (teacher ? '<nav class="teacher-nav" aria-label="Séquences du cours">' + course.lessons.map(l =>
        '<details ' + (l.id === active.lesson.id ? 'open' : '') + '><summary>' + l.number + ' · ' + escape(l.title) + '</summary>' +
        l.slides.map((s, i) => '<a class="sequence-link" href="#' + s.id + '" ' + (s.id === active.id ? 'aria-current="step"' : '') + '>' + number(i + 1) + ' · ' + escape(s.title.replace(/\n/g, " ")) + '</a>').join("") + '</details>').join("") + '</nav>' :
      '<nav aria-label="Navigation principale"><a class="side-link" href="index.html" aria-current="page"><span class="side-number">⌂</span>Vue d’ensemble</a>' +
      course.lessons.map(l => '<a class="side-link" href="audience.html#' + l.slides[0].id + '"><span class="side-number">' + l.number + '</span>' + escape(l.title) + '</a>').join("") +
      '<div class="side-rule"><a class="side-link" href="#ressources"><span class="side-number">↗</span>Sources & repères</a></div></nav>') +
      '<div class="sidebar-footer"><strong>Apprendre à faire confiance,<br>preuves à l’appui.</strong><br><br>Formation BackProp<br>Support de cours · Français<br>Édition septembre 2026</div></aside>';
  }
  function home() {
    const total = course.lessons.reduce((sum,l) => sum + duration(l), 0);
    app.innerHTML = sidebar() + '<div class="layout-main"><header class="topbar"><div class="crumb">FORMATION / <b>Agentic Software Engineering</b></div><a class="button" href="teacher.html#f01">Console intervenant <span>↗</span></a></header>' +
    '<main class="home-main" id="main"><section class="hero"><div><p class="eyebrow">L’ingénierie logicielle à l’ère des agents</p><h1>Déléguer le code.<br><em>Garder la maîtrise.</em></h1><p class="intro">Trois leçons pour confier une tâche à un agent, vérifier son travail et intégrer ses changements en connaissance de cause.</p><div class="actions"><a class="button primary" href="audience.html#f01">Commencer le parcours <span>→</span></a><a class="button secondary" href="#programme">Explorer les leçons</a></div></div>' +
    '<div class="hero-art" aria-label="Le processus : mandat, preuves, décision"><p class="eyebrow">La boucle de confiance</p><div class="workflow-card"><span>01</span><div><strong>Un mandat précis</strong><small>Objectif · périmètre · autonomie</small></div></div><div class="connector"></div><div class="workflow-card"><span>02</span><div><strong>Des preuves vérifiables</strong><small>Tests · diff · pull request · CI</small></div></div><div class="connector"></div><div class="workflow-card final"><span>03</span><div><strong>Une décision humaine</strong><small>Relire · comprendre · intégrer</small></div></div></div></section>' +
    '<div class="stats"><div class="stat"><b>03</b>leçons progressives</div><div class="stat"><b>36</b>séquences</div><div class="stat"><b>' + Math.floor(total/60) + ' h ' + number(total%60) + '</b>hors pauses</div></div>' +
    '<section id="programme"><div class="section-heading"><h2>Un même projet. Trois points de vue.</h2><p>Python, Git et un dépôt réel comme fil rouge.</p></div><div class="lesson-grid">' +
    course.lessons.map(l => '<article class="lesson-card ' + l.color + '"><div class="card-top"><span class="lesson-number">' + l.number + '</span><span class="pill">' + duration(l) + ' min</span></div><h3>' + escape(l.title) + '</h3><p>' + escape(l.description) + '</p><div class="card-bottom"><a href="audience.html#' + l.slides[0].id + '">Ouvrir la leçon →</a><span class="lesson-meta">' + l.slides.length + ' séquences</span></div></article>').join("") + '</div></section>' +
    '<div class="section-heading"><h2>Deux espaces pour enseigner.</h2><p>Le bon contenu, sur le bon écran.</p></div><section class="two-views" aria-label="Choisir son espace"><article class="view-box"><p class="eyebrow">01 / À projeter</p><h3>Le support auditoire</h3><p>Les idées essentielles, les schémas, les exemples et les exercices. Un écran lisible à la fois, sans notes orales.</p><a href="audience.html#f01">Ouvrir la projection →</a></article><article class="view-box"><p class="eyebrow">02 / Sur votre ordinateur</p><h3>Le conducteur intervenant</h3><p>Ce qu’il faut dire, montrer et demander. Les réponses attendues, les points de vigilance et les transitions.</p><a href="teacher.html#f01">Ouvrir le conducteur →</a></article></section>' +
    '<section class="resources" id="ressources"><h2>Partir du réel.</h2><p>Support construit à partir du dépôt de formation, à la révision <code>' + course.revision.slice(0,7) + '</code>. Les chiffres et les PR décrivent les laboratoires historiques, sans suivi en direct.</p><div class="source-list">' + Object.keys(course.sources).map(key=>link(sourceUrl(key),course.sources[key].label)).join("") + '</div>' +
    '<details><summary>Avant la séance : prérequis et préparation</summary><p>Prévoir un public capable de lire une fonction Python et de repérer un fichier. Pour les TP : Git, uv, le dépôt, les clients agents et leurs accès configurés. Les comptes et éventuels coûts d’utilisation restent ceux des participants. Les démonstrations historiques peuvent se suivre sans compte agent.</p><p>Les tests des leçons 2 et 3 sont déjà intégrés dans main. Pour les refaire, préparer une copie d’atelier dédiée à l’état antérieur indiqué dans les notes ; sinon, étudier les diffs des PR #9 et #11. Ne pas dupliquer les tests ni réinitialiser le dépôt partagé.</p></details>' +
    '<details><summary>Utiliser les deux écrans</summary><p>Ouvrir la console intervenant, puis « Ouvrir la projection ». Placer la fenêtre de projection sur l’écran partagé. Les flèches de la console changent la séquence sur les deux vues. La synchronisation nécessite le même navigateur et la même origine locale, avec BroadcastChannel disponible. La projection reste navigable seule.</p><p>Les notes ne sont pas chargées par la page auditoire. Cette séparation est une aide à la présentation, pas une authentification : si vous publiez tout le dossier, la page intervenant reste accessible à qui connaît son adresse.</p></details>' +
    '<details><summary>Petit lexique pour suivre le cours</summary><dl class="glossary">' +
    [["Agent","Client capable de lire un contexte, utiliser des outils et vérifier les résultats selon ses permissions."],["Mandat","Résultat demandé, périmètre, contrôles et limite d’autonomie."],["Diff","Comparaison des lignes entre deux états de fichiers."],["Index","Sélection du contenu que le prochain commit enregistrera."],["Commit","Point d’historique enregistré localement par Git."],["Push","Envoi de commits et mise à jour d’une branche distante."],["Pull request","Proposition hébergée sur GitHub pour intégrer une branche dans une autre."],["CI","Intégration continue : contrôles automatisés déclenchés par les événements configurés."],["Ruff","Outil d’analyse statique du Python."],["pytest","Outil de découverte et d’exécution des tests Python."]].map(([t,d])=>'<div><dt>'+escape(t)+'</dt><dd>'+escape(d)+'</dd></div>').join("") + '</dl></details>' +
    '<details><summary>Portée et fidélité des exemples</summary><p>Les libellés des interfaces, modèles et permissions évoluent. Le cours enseigne le processus observé sans imposer une version. Les niveaux 0 à 4 constituent une convention pédagogique. Une fusion décidée par un humain peut être exécutée par un outil après autorisation. Les règles de branche ne garantissent pas, à elles seules, une revue humaine.</p><p>Le module 08 et le workflow apportent les notions de tests, de CI et de sécurité nécessaires aux trois leçons. Ils ne forment pas une quatrième leçon dans ce support.</p></details></section>' +
    '<footer class="home-footer"><span>BackProp · Agentic Software Engineering</span><span>Sources figées · ' + escape(course.date) + ' · Fonctionne sans service tiers</span></footer></main></div>';
  }
  function navigation(slide) {
    const position = slides.findIndex(s => s.id === slide.id);
    return '<footer class="navigation"><div class="nav-inner"><div class="nav-progress"><p>Leçon ' + slide.lesson.number + ' · Séquence ' + number(slide.index + 1) + ' / ' + number(slide.lesson.slides.length) + '</p><div class="progress-track"><div class="progress-fill" style="width:' + ((slide.index+1)/slide.lesson.slides.length*100) + '%"></div></div></div><span class="shortcut">← → pour naviguer</span><div class="nav-controls"><button data-step="-1" ' + (position === 0 ? 'disabled' : '') + '>← Précédent</button>' +
    (position === slides.length-1 ? '<a class="button primary" href="index.html">Terminer ↗</a>' : '<button class="primary" data-step="1">' + (slide.index === slide.lesson.slides.length - 1 ? 'Leçon suivante →' : 'Suivant →') + '</button>') + '</div></div></footer>';
  }
  function audience(slide) {
    app.innerHTML = '<header class="topbar audience-header">' + brand + '<span class="pill"><span class="dot"></span>Vue auditoire</span><div class="lesson-nav"><label class="sr-only" for="lesson-select">Choisir une leçon</label><select id="lesson-select">' + course.lessons.map(l=>'<option value="'+l.slides[0].id+'" '+(l.id===slide.lesson.id?'selected':'')+'>'+l.number+' · '+escape(l.title)+'</option>').join("") + '</select></div><div class="toolbar"><button data-action="fullscreen">Plein écran</button><button data-action="print">Imprimer la leçon</button></div></header>' +
    '<main class="viewer-main" id="main"><p class="projection-top">' + escape(slide.lesson.subtitle) + (session ? ' · Projection reliée à une session intervenant' : '') + '</p><article class="slide">' + slideContent(slide) + '</article></main>' + navigation(slide) + '<div class="print-material"></div>';
  }
  function notesMarkup(slide) {
    const n=window.SPEAKER_NOTES[slide.id];
    return '<section class="note-box"><h2>Intention pédagogique</h2><p>'+escape(n.goal)+'</p></section>' +
    '<section class="note-box speech"><h2>À dire · trame orale</h2>'+n.say.map(p=>'<p>'+escape(p)+'</p>').join("")+'</section>' +
    '<section class="note-box"><h2>À montrer · démonstration</h2><ol>'+n.demo.map(p=>'<li>'+escape(p)+'</li>').join("")+'</ol></section>' +
    '<section class="note-box question"><h2>Faire participer</h2><p>'+escape(n.question)+'</p><div class="answer"><span class="note-label">Réponse attendue</span><p>'+escape(n.answer)+'</p></div></section>' +
    '<section class="note-box warning"><h2>Point de vigilance</h2><p>'+escape(n.pitfall)+'</p></section>' +
    '<section class="note-box"><h2>Transition</h2><p>'+escape(n.transition)+'</p></section>';
  }
  function teacher(slide) {
    app.innerHTML=sidebar(true)+'<div class="teacher-main"><header class="topbar"><div class="crumb"><b>Console intervenant</b><br>Notes réservées à votre écran de présentation</div><div class="toolbar"><button data-action="print">Imprimer le conducteur</button><button class="primary" data-action="project">Ouvrir la projection ↗</button></div></header><main class="teacher-body" id="main"><div class="teacher-warning">Projetez uniquement la fenêtre auditoire. Les notes sont séparées de la projection, mais ne sont pas protégées par un mot de passe.</div><div class="teacher-head"><div><p class="eyebrow">LEÇON '+slide.lesson.number+' / SÉQUENCE '+number(slide.index+1)+'</p><h1>'+escape(slide.title.replace(/\n/g," "))+'</h1><p class="muted">'+slide.minutes+' min suggérées · '+duration(slide.lesson)+' min pour cette leçon</p></div><span class="pill">Intervenant</span></div><div class="teacher-content"><section class="preview-panel"><div class="panel-label">Ce que voit l’auditoire</div><div class="mini-slide">'+slideContent(slide,true)+'</div></section><div class="teacher-notes">'+notesMarkup(slide)+evidence(slide)+'</div></div></main>'+navigation(slide)+'</div><div class="print-material"></div>';
  }
  function render() {
    if (view === "home") {home();return;}
    const slide=current();
    if (location.hash.slice(1)!==slide.id) history.replaceState(null,"","#"+slide.id);
    document.title=slide.lesson.number+" · "+slide.title.replace(/\n/g," ")+" — "+(view==="teacher"?"Intervenant":"Auditoire");
    if (view==="teacher") teacher(slide);else audience(slide);
    if (view==="teacher") channel?.postMessage({type:"slide",id:slide.id});
  }
  function go(id) {
    if (!slides.some(s=>s.id===id)) return;
    if (location.hash==="#"+id) return;
    location.hash=id;
  }
  function move(delta) {
    const index=slides.findIndex(s=>s.id===current().id);
    if (slides[index+delta]) go(slides[index+delta].id);
  }
  if (session && "BroadcastChannel" in window && ["teacher","audience"].includes(view)) {
    try {
      channel=new BroadcastChannel("backprop-course-"+session);
      channel.onmessage=({data})=>{
        if (view==="teacher" && data?.type==="ready") channel.postMessage({type:"slide",id:current().id});
        if (view==="audience" && data?.type==="slide") go(data.id);
      };
      if(view==="audience") channel.postMessage({type:"ready"});
    } catch { channel=null; }
  }
  app.addEventListener("click",async(event)=>{
    const button=event.target.closest("button");
    if(!button) return;
    if(button.dataset.step) {move(Number(button.dataset.step));return;}
    if(button.dataset.copy) {
      const text=slides.find(s=>s.id===button.dataset.copy).visual.code;
      try {await navigator.clipboard.writeText(text);toast("Texte copié. À relire avant de le soumettre à votre agent.");}
      catch {toast("Copie indisponible dans ce navigateur. Sélectionnez le texte du bloc pour le copier.");}
    }
    if(button.dataset.action==="fullscreen") {
      try {
        if(document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch {toast("Le plein écran n’est pas disponible ici. Utilisez le mode présentation de votre navigateur.");}
    }
    if(button.dataset.action==="project") {
      const url=new URL("audience.html",location.href);
      url.searchParams.set("session",session);url.hash=current().id;
      const opened=window.open(url,"course-audience-"+session);
      if(!opened) toast("Fenêtre bloquée : autorisez les fenêtres de ce site, puis réessayez.");
      else toast(channel?"Projection ouverte. Les changements de séquence sont synchronisés.":"Projection ouverte. Synchronisation indisponible : naviguez dans chaque vue.");
    }
    if(button.dataset.action==="print") {
      preparePrint();
      window.print();
    }
  });
  function preparePrint() {
    if (view === "home") return;
      document.querySelector(".print-material").innerHTML=current().lesson.slides.map(s=>{
        const slide=slides.find(item=>item.id===s.id);
        return '<article class="print-page"><p class="eyebrow">Leçon '+slide.lesson.number+' · '+escape(slide.lesson.title)+' · '+(slide.index+1)+'/12</p>'+slideContent(slide)+(view==="teacher"?'<h2>Conducteur intervenant</h2>'+notesMarkup(slide):"")+'</article>';
      }).join("");
  }
  window.addEventListener("beforeprint", preparePrint);
  app.addEventListener("change",event=>{if(event.target.id==="lesson-select") go(event.target.value);});
  document.querySelector(".skip-link").addEventListener("click", event => {
    event.preventDefault();
    const main = document.querySelector("#main");
    main.setAttribute("tabindex", "-1");
    main.focus();
    main.scrollIntoView();
  });
  window.addEventListener("keydown",event=>{
    if(view==="home" || event.ctrlKey || event.metaKey || event.altKey || event.target.closest("input,select,textarea,button,a,[contenteditable]"))return;
    if(event.key==="ArrowRight"){event.preventDefault();move(1);}
    if(event.key==="ArrowLeft"){event.preventDefault();move(-1);}
  });
  window.addEventListener("hashchange",()=>{
    if(view==="home")return;
    render();window.scrollTo(0,0);
  });
  render();
})();
