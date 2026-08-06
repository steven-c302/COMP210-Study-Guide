# University Study Hub

A single, offline hub for all of Steven's courses — interactive study guides, lecture libraries, and past exams. Everything is static HTML/JS, so just open **`index.html`** in any web browser (no server or install needed).

## How to use

- Open **`index.html`** → the homepage shows a card for every course.
- Click a course → its page has tabs for **Overview**, **Study Guide**, **Lectures**, **Past Exams**, and **Notes & Resources**.
- The **COMP 210** study guide is fully built (Lessons 1–21, Final Prep, and 4 real quizzes + 5 practice exams). The other courses start with an empty study guide you grow over the term.

## Structure

```
index.html            ← hub homepage (course grid)
hub_data.js           ← the course registry (edit to add/reorder courses)
shared/
  hub.css             ← shared dark-theme styling
  course.js           ← renders each course page from its config
courses/
  COMP210/
    course.html       ← the course page (loads config.js + shared/course.js)
    config.js         ← course info + lists of lectures/exams/notes
    guide/            ← the interactive study guide (index.html + modules)
    materials/
      lectures/       ← lecture slides/notes (PDFs, etc.)
      exams/          ← past exams & quizzes (PDFs)
  COMP211/  COMP301/  STOR155/   ← same layout; guides to be built
  _TEMPLATE/          ← copy this to start a new course
```

## Add a new course

1. Copy the **`courses/_TEMPLATE`** folder and rename it to your course slug (e.g. `courses/COMP311`).
2. Edit that folder's **`config.js`** (code, title, description, color, requisites).
3. Add an entry for it in **`hub_data.js`** so it shows on the homepage.

## Add lectures or past exams to a course

1. Drop the file into that course's **`materials/lectures/`** or **`materials/exams/`** folder.
2. Add a line to the course's **`config.js`** under `lectures` or `exams`, e.g.
   ```js
   { title: "Midterm 1", file: "materials/exams/midterm1.pdf", solution: "materials/exams/midterm1_soln.pdf", date: "Oct 2026" }
   ```

## Build a study guide for a course

Ask Claude: *"Add Lesson 1 for COMP 211"* and upload the lecture slides (and any quiz). Claude builds an interactive lesson module (active-recall questions, code exercises, diagrams) into that course's `guide/`, the same way COMP 210 was built.

---
*Courses set up: COMP 210 (Data Structures & Algorithms), COMP 211 (Systems Fundamentals), COMP 301 (Foundations of Programming), STOR 155 (Data Models & Inference).*
