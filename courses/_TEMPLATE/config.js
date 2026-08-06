/* ============================================================
   COURSE TEMPLATE — copy this whole "_TEMPLATE" folder, rename it
   to your course slug (e.g. "COMP311"), edit the fields below, and
   add a matching entry to /hub_data.js.
   ============================================================ */
window.COURSE = {
  code: "DEPT 000",                 // e.g. "COMP 311"
  title: "New Course Title",
  credits: 3,
  term: "Upcoming",                 // e.g. "Fall 2026" / "Completed"
  color: "#2e86de",                 // card / accent color (any hex)
  desc: "One-paragraph course description (from the catalog).",
  requisites: "Prerequisites, if any.",

  // Set to "guide/index.html" to enable the Study Guide tab, or null to hide.
  guide: "guide/index.html",

  // Add materials as you collect them. Files live in materials/lectures and materials/exams.
  lectures: [
    // { title: "Lecture 1 — Intro", file: "materials/lectures/L1.pdf", date: "8/20" }
  ],
  exams: [
    // { title: "Midterm 1", file: "materials/exams/midterm1.pdf", solution: "materials/exams/midterm1_soln.pdf", date: "" }
  ],
  notes: [
    // { title: "Key formula", body: "..." }
  ],
  resources: [
    // { title: "Textbook site", url: "https://..." }
  ]
};
