# HANDOFF — COMP210 Study Guide (paste into a new session)

You are continuing work on an **interactive HTML study guide for COMP210 (Data Structures & Algorithms)**. A previous session built Lessons 4–12; your job is to add more lessons / refine existing ones in the same style.

## Where the files live
- **Work here:** `C:\Users\steve\projects\COMP210-Study-Guide\` (a connected folder with its own git repo → the user's personal GitHub). All study-guide files live here.
- **Reference only — NEVER edit:** `C:\Users\steve\IdeaProjects\COMP210-SSII26\` is the professor's class repo. Read it for example code (`lectures/src/L<N>/*.java`) but make no changes to it.
- The user uploads lecture slides as `.pptx` (read via python-pptx in the bash tool) and posts quiz screenshots. Build each lesson's questions from **the quiz screenshots + slides + the repo's example code**, matching the course's conventions (leading-underscore field names like `_head`; 0-indexed heap arrays; etc.).

## Architecture (modular, to dodge a file-size limit)
- `COMP210_Study_Guide.html` = shell: all CSS/theme, the header + lesson-bar buttons, **Lessons 4 & 5 inline**, then empty containers `<div class="lesson" id="lN"></div>` for every other lesson, then `<script src>` tags, ending with the engine script.
- `COMP210_Study_Guide.js` = shared **engine** (loads LAST). Provides globals: `showLesson`, `showTopic`, `checkFill`, `checkFillGroup`, `checkMatch(tableId,fbId,keyArray)`, `checkOrder`, `toggleReveal`, `gradeInput`, progress tracking, and L4/L5 diagram renderers.
- `COMP210_Study_Guide_L<N>.js` = one module per lesson (6,7,8,9,10,11,12 exist). Each does `document.getElementById('l<N>').innerHTML = ` + a template literal, then defines any self-contained widget JS. **Modules must load BEFORE the engine** so the engine's `querySelectorAll('.q')` wires their questions.
- `COMP210_Study_Guide_Practice.js` = a "Practice" tab. `README.md` lists all files.

## How to author question types (reuse existing engine)
- **True/False:** `<div class="q" data-tf="T">` with two `<button class="opt" data-v="T">`/`data-v="F"` and a `<div class="fb">explanation</div>`.
- **Multiple choice:** `<div class="q" data-mc="2">` (index of correct option) with `<button class="opt" data-i="0">...` and a `.fb`.
- **Fill-in:** `<input type="text" class="fillblank" data-answer="x">` + a Check button calling `checkFill(this)` (single) or `checkFillGroup(this)` (all blanks in the card). `data-answer` supports alternatives with `|`, e.g. `data-answer="_head|head"`. NOTE: put each single-`checkFill` question inside its own `<div class="q">...<div class="fb"></div></div>` so multi-question cards grade the right feedback.
- **Matching:** a `<table class="match" id="...">` of rows each `<td class="match-term">` + `<select class="match-def">`, a button calling `checkMatch('tableId','fb-id',['key0','key1',...])`, and `<div class="fb" id="fb-id">`.
- **Reveal (code-writing):** a `<textarea>` + `<button onclick="toggleReveal(this)">Show solution</button>` + `<div class="reveal"><pre>...solution...</pre></div>`.
- **Multiple-answer / interactive visualizers:** not built into the engine — write a self-contained grader/renderer inside the module (see `maDelete` in L9, `maPQ`/heap visualizer in L12, tree traversal in L11). Style code with spans: `.kw .ty .fn .nm .cm .st`. Reusable classes: `.card .concept .two .step-desc .mem-col .toolbar .btn .btn.ghost .btn.small .muted`. Theme CSS vars: `--green --amber --red --stack --heap --accent --ink --muted --line --panel2`.

## CRITICAL workflow rules (learned the hard way)
1. **The Write tool truncates files past ~78 KB.** Keep the HTML shell small; always put new lesson content in its own `_L<N>.js` module (they're ~20-35 KB each — fine).
2. **Never write/edit files in the connected folder via the bash tool.** Bash writes caused a host/mount desync that silently truncated the HTML. Use the **Write/Edit tools only** for changes. Use **bash strictly read-only** (`node --check`, `grep`, reading slides/reference code).
3. **Injected HTML (inside a template literal) must contain NO backticks and NO `${`.** Use `&amp;` etc. as needed.
4. After edits, **verify with the Read tool** (host file is authoritative; bash mount can be stale) and **`node --check`** each JS module.

## Steps to add a lesson
1. Read the slides (`.pptx` in the uploads dir via python-pptx) and reference code (`COMP210-SSII26/lectures/src/L<N>/`) with bash (read-only).
2. **Edit** `COMP210_Study_Guide.html`: add a lesson-bar button `<button data-l="l<N>" onclick="showLesson('l<N>',this)">Lesson N &middot; Title</button>`; add an empty `<div class="lesson" id="l<N>"></div>`; add `<script src="COMP210_Study_Guide_L<N>.js"></script>` (before the Practice + engine scripts).
3. **Write** `COMP210_Study_Guide_L<N>.js` following the module pattern: a topics `<nav class="topics">`, several `<section class="topic" id="l<N>-...">`, concept cards, interactive questions built from the quiz, at least one **interactive diagram/visualizer**, and a **code-writing** section with reveal solutions.
4. Update `README.md`. Verify (node --check, Read the HTML tail to confirm the div/script landed, confirm every `onclick` function is defined in the module or engine).
5. Tell the user to `git add . && git commit && git push`.

## Current status
Lessons **4 (Stack/Heap/Recursion/Debugger), 5 (OOP), 6 (Interfaces/ADTs/Testing), 7 (Big-O & Sorting), 8 (Recursion & Generics), 9 (Lists), 10 (Stacks & Queues), 11 (Trees & BST), 12 (Heaps & Priority Queues), and a Practice tab** are all done — each with active-recall questions, an interactive diagram/visualizer, and code-writing. Style and tone: concise, warm, explains *why* not just *what*; the user is a student learning the concepts, so verify answers carefully against their quizzes and correct any mistakes they made.

Start by asking the user which lesson to add next (or what to refine), then request the relevant slides if not already provided.
