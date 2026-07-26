# COMP210 Study Guide

Interactive study guide for COMP210 (Data Structures & Algorithms).

Open **COMP210_Study_Guide.html** in any web browser. All files must stay in the same folder.

Covers:
- ★ Quizzes + Practice Exams — all 4 in-class quizzes (real questions + correct answers) plus two original full-length practice finals matching their style and difficulty
- ★ Final Prep — data-structures taxonomy (clickable overview of the L21 slide: ADT vs implementation), master complexity cheat-sheet, mixed cross-course rapid-fire, and an exam checklist
- Lesson 1 — Intro: data structures & algorithms, time vs space complexity, primary/secondary storage, number systems (binary/hex/octal), bits/bytes & ASCII
- Lesson 2 — Java: execution model (javac → JVM/JIT), primitives vs reference types, Strings & arrays, control flow
- Lesson 3 — Java II: Scanner input, reading docs, methods & access modifiers, pair programming roles
- Lesson 4 — Scope, Stack & Heap memory, Recursion, Debugger (+ interactive stack/heap diagramming)
- Lesson 5 — OOP: classes, objects, instance vs class members, is-a, getters/setters
- Lesson 6 — Interfaces, ADTs, encapsulation, unit testing (JUnit)
- Lesson 7 — Big-O, binary search, bubble sort (interactive), quick sort, complexity of recursion
- Lesson 8 — Recursion vs iteration, dynamic programming, generics (class/method/interface) + Fibonacci recursion-tree visualizer
- Lesson 9 — Lists, ArrayList (amortized time), LinkedList (nodes) + interactive linked-list builder
- Lesson 10 — Stacks (LIFO) & Queues (FIFO), ADTs vs implementations, LinkedList vs ArrayList complexity + interactive stack/queue visualizers
- Lesson 11 — Binary Trees, tree traversals (pre/in/post/level), Binary Search Trees + interactive traversal visualizer
- Lesson 12 — Heaps, Priority Queues, Binary Min Trees, Binary Heaps (array), buildHeap + interactive min-heap visualizer
- Lesson 13 — AVL Trees: balance factor, the four rebalancing cases (LL/RR/LR/RL) & rotations + interactive rotation visualizer
- Lesson 14 — Red-Black Trees: the five color invariants, insertion (recolor vs rotate), double-black deletion + interactive colored-tree case viewer, animated rotation & deletion walkthroughs
- Lesson 15 — Red-Black Trees II: O(log n) complexity & real-world uses, comparing BST/AVL/RB, binary-tree taxonomy (full/complete/perfect/balanced), RB & AVL node fields
- Lesson 16 — Hashing: hash tables/functions, load factor, chaining, linear & quadratic probing, primary/secondary clustering, double hashing + interactive hash-table probing visualizer
- Lesson 17 — Hashing II: load factor, table resizing & thresholds (Tc=1.0 / Tp=0.75), worst-case vs amortized complexity, chaining vs probing, data-structure comparison + resize/rehash code
- Lesson 18 — Graphs: heap/quick sort recap, graph basics (V/E/n/m), properties (edge/structural/density), adjacency matrix vs list, sparsity + interactive graph↔matrix↔list explorer
- Lesson 19 — Graph Algorithms: topological sort (DAGs, in/out-degree, Kahn's algorithm), BFS shortest paths, O(V+E) complexity + interactive step-through BFS visualizer
- Lesson 20 — Graph Algorithms II: edge relaxation, Dijkstra's (greedy, min-heap PQ, O((n+m)log n)), Bellman-Ford (negative weights & cycle detection, O(nm)), algorithm comparison, graph terminology + interactive step-through Dijkstra visualizer
- Lesson 21 — Minimum Spanning Trees: spanning trees & MSTs, Kruskal's (union-find, sparse graphs), Prim's (tree growth, dense graphs), greedy strategy + interactive Kruskal's/Prim's MST builder
- Practice — ramped time/space complexity problems + code-writing challenges

## Files
- `COMP210_Study_Guide.html` — main page (shell + Lessons 4 & 5)
- `COMP210_Study_Guide.js` — shared engine (navigation, grading, diagram renderers)
- `COMP210_Study_Guide_Final.js` — ★ Final Prep (clickable DS taxonomy, complexity cheat-sheet, mixed practice)
- `COMP210_Study_Guide_Quizzes.js` — ★ Quizzes 1–4 (real questions + answers) and two practice exams
- `COMP210_Study_Guide_L1.js` — Lesson 1 module
- `COMP210_Study_Guide_L2.js` — Lesson 2 module
- `COMP210_Study_Guide_L3.js` — Lesson 3 module
- `COMP210_Study_Guide_L6.js` — Lesson 6 module
- `COMP210_Study_Guide_L7.js` — Lesson 7 module (with bubble-sort visualizer)
- `COMP210_Study_Guide_L8.js` — Lesson 8 module (with Fibonacci recursion-tree visualizer)
- `COMP210_Study_Guide_L9.js` — Lesson 9 module (with linked-list builder)
- `COMP210_Study_Guide_L10.js` — Lesson 10 module (with stack/queue visualizers)
- `COMP210_Study_Guide_L11.js` — Lesson 11 module (with tree-traversal visualizer)
- `COMP210_Study_Guide_L12.js` — Lesson 12 module (with binary min-heap visualizer)
- `COMP210_Study_Guide_L13.js` — Lesson 13 module (with AVL rotation visualizer)
- `COMP210_Study_Guide_L14.js` — Lesson 14 module (with red-black colored-tree case viewer + animated rotation/deletion walkthroughs)
- `COMP210_Study_Guide_L15.js` — Lesson 15 module (tree comparison & taxonomy)
- `COMP210_Study_Guide_L16.js` — Lesson 16 module (with interactive hash-table probing visualizer)
- `COMP210_Study_Guide_L17.js` — Lesson 17 module (load factor, resizing, complexity, comparisons)
- `COMP210_Study_Guide_L18.js` — Lesson 18 module (with interactive graph↔matrix↔list explorer)
- `COMP210_Study_Guide_L19.js` — Lesson 19 module (with interactive step-through BFS visualizer)
- `COMP210_Study_Guide_L20.js` — Lesson 20 module (with interactive step-through Dijkstra visualizer)
- `COMP210_Study_Guide_L21.js` — Lesson 21 module (with interactive Kruskal's/Prim's MST builder)
- `COMP210_Study_Guide_Practice.js` — Practice module
