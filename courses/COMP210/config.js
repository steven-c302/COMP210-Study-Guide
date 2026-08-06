window.COURSE = {
  code: "COMP 210",
  title: "Data Structures & Algorithms",
  credits: 3,
  term: "Completed",
  color: "#2e86de",
  desc: "Stacks & heaps, recursion, OOP, interfaces & ADTs, Big-O, sorting, generics, lists, stacks/queues, binary trees (BST/AVL/Red-Black), heaps & priority queues, hashing, and graph algorithms (BFS, topological sort, Dijkstra, Bellman-Ford, MSTs).",
  requisites: "Prerequisite for COMP 211, 301.",

  // Interactive study guide (Lessons 1–21 + Final Prep + Quizzes & Practice Exams)
  guide: "guide/index.html",

  lectures: [
    // Add lecture decks here, e.g.:
    // { title: "L1 — Intro", file: "materials/lectures/L1-Intro.pdf", date: "6/22" }
  ],

  exams: [
    { title: "Quiz 1 — Intro, Memory, Java Basics", file: "materials/exams/Quiz1_graded.pdf", note: "Graded (questions + correct answers)" },
    { title: "Quiz 2 — OOP, ADTs, Big-O", file: "materials/exams/Quiz2_graded.pdf", note: "Graded" },
    { title: "Quiz 3 — Lists, Stacks/Queues, Trees, Heaps", file: "materials/exams/Quiz3_graded.pdf", note: "Graded" },
    { title: "Quiz 4 — AVL, Red-Black, Hashing", file: "materials/exams/Quiz4_graded.pdf", note: "Graded" }
  ],

  notes: [
    { title: "Tip", body: "All four quizzes above are also rebuilt as interactive, self-grading practice inside the study guide — see the <b>★ Quizzes + Practice Exams</b> tab (which also has 5 full-length practice exams)." }
  ],

  resources: [
    { title: "Final Prep — data-structures taxonomy & complexity cheat-sheet", url: "guide/index.html" }
  ]
};
