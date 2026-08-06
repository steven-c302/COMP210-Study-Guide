/* ============================================================
   Shared course-page renderer. Each course.html loads its own
   config.js (defining window.COURSE) then this script.
   ============================================================ */
(function(){
  const C = window.COURSE || {};
  const app = document.getElementById('app');
  const accent = C.color || 'var(--accent)';

  const matItem = (m, kind) => {
    const icon = kind === 'exam' ? '📝' : kind === 'lecture' ? '📄' : '🔗';
    const sub = [m.date, m.note].filter(Boolean).join(' · ');
    let acts = '';
    if (m.file) acts += '<a href="' + m.file + '" target="_blank">Open</a>';
    if (m.solution) acts += '<a href="' + m.solution + '" target="_blank">Solution</a>';
    if (m.url) acts = '<a href="' + m.url + '" target="_blank">Open ↗</a>';
    return '<li class="mat-item"><span class="ic">' + icon + '</span>' +
      '<div class="info"><div class="t">' + (m.title||'Untitled') + '</div>' +
      (sub ? '<div class="s">' + sub + '</div>' : '') + '</div>' +
      '<div class="act">' + acts + '</div></li>';
  };
  const list = (arr, kind, emptyMsg) =>
    (arr && arr.length) ? '<ul class="mat-list">' + arr.map(m => matItem(m, kind)).join('') + '</ul>'
                        : '<div class="empty">' + emptyMsg + '</div>';

  const nLec = (C.lectures||[]).length, nEx = (C.exams||[]).length;

  // ---- hero ----
  let html = '<div class="crumb"><a href="../../index.html">← Study Hub</a></div>' +
    '<div class="course-hero" style="border-bottom-color:' + accent + '33">' +
    '<div class="code" style="color:' + accent + '">' + (C.code||'') + '</div>' +
    '<h1>' + (C.title||'') + '</h1>' +
    (C.desc ? '<p class="desc">' + C.desc + '</p>' : '') +
    (C.requisites ? '<div class="req"><b>Requisites:</b> ' + C.requisites + '</div>' : '') +
    '</div>';

  // ---- tabs ----
  html += '<div class="tabs" id="tabs">' +
    '<button data-t="overview" class="active">Overview</button>' +
    '<button data-t="guide">Study Guide</button>' +
    '<button data-t="lectures">Lectures</button>' +
    '<button data-t="exams">Past Exams</button>' +
    '<button data-t="notes">Notes &amp; Resources</button>' +
    '</div>';

  // ---- overview ----
  html += '<div class="tab-panel active" id="p-overview">' +
    '<div class="card"><h2>Overview</h2>' +
    '<p>' + (C.desc||'') + '</p>' +
    '<div class="meta" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">' +
      '<span class="pill">' + (C.credits||3) + ' credits</span>' +
      '<span class="pill term">' + (C.term||'') + '</span>' +
      '<span class="pill">' + nLec + ' lecture' + (nLec===1?'':'s') + '</span>' +
      '<span class="pill">' + nEx + ' exam' + (nEx===1?'':'s') + '</span>' +
    '</div>';
  html += '<div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">';
  if (C.guide) html += '<a class="big-link" href="' + C.guide + '">📚 Open the interactive study guide</a>';
  html += '<a class="ghost-link" data-jump="lectures">📄 Lectures</a>' +
          '<a class="ghost-link" data-jump="exams">📝 Past exams</a></div>';
  html += '</div></div>';

  // ---- study guide ----
  html += '<div class="tab-panel" id="p-guide"><div class="card"><h2>Interactive Study Guide</h2>';
  if (C.guide) {
    html += '<p>Active-recall lessons, quizzes, and interactive diagrams for this course.</p>' +
      '<p><a class="big-link" href="' + C.guide + '">📚 Open the study guide</a></p>' +
      '<p class="muted" style="font-size:13px;margin-top:14px">Opens in this tab. Use your browser Back button to return here.</p>';
  } else {
    html += '<p class="muted">' + (C.guideNote ||
      'No study guide yet. This is where the interactive study guide for this course will live — ask Claude to build it lesson by lesson as the term goes, the same way COMP 210 was built.') + '</p>';
  }
  html += '</div></div>';

  // ---- lectures ----
  html += '<div class="tab-panel" id="p-lectures"><div class="card"><h2>Lecture Library</h2>' +
    '<p class="muted" style="font-size:13px">Slides, notes, and recordings. Add files to <code>materials/lectures/</code> and list them in <code>config.js</code>.</p>' +
    list(C.lectures, 'lecture', 'No lectures added yet.') + '</div></div>';

  // ---- exams ----
  html += '<div class="tab-panel" id="p-exams"><div class="card"><h2>Past Exams &amp; Quizzes</h2>' +
    '<p class="muted" style="font-size:13px">Store exams (and solutions) in <code>materials/exams/</code> and list them in <code>config.js</code>.</p>' +
    list(C.exams, 'exam', 'No past exams added yet.') + '</div></div>';

  // ---- notes ----
  html += '<div class="tab-panel" id="p-notes"><div class="card"><h2>Notes &amp; Resources</h2>';
  if (C.notes && C.notes.length) {
    html += C.notes.map(n => '<div class="note-box"><h4>' + (n.title||'') + '</h4><div>' + (n.body||'') + '</div></div>').join('');
  }
  if (C.noteFiles && C.noteFiles.length) html += list(C.noteFiles, 'note', '');
  if (C.resources && C.resources.length) {
    html += '<h3>Links</h3>' + list(C.resources, 'link', '');
  }
  if (!(C.notes&&C.notes.length) && !(C.noteFiles&&C.noteFiles.length) && !(C.resources&&C.resources.length)) {
    html += '<div class="empty">No notes or resources yet. Add them in <code>config.js</code> (notes / resources).</div>';
  }
  html += '</div></div>';

  html += '<div class="footer">Course hub · files live in this course\'s folder. Edit <code>config.js</code> to add materials.</div>';

  app.innerHTML = html;
  document.title = (C.code ? C.code + ' · ' : '') + (C.title || 'Course');

  // ---- tab switching ----
  function show(t){
    document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.t===t));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id==='p-'+t));
    window.scrollTo(0,0);
  }
  document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => show(b.dataset.t));
  document.querySelectorAll('[data-jump]').forEach(a => a.onclick = e => { e.preventDefault(); show(a.dataset.jump); });
})();
