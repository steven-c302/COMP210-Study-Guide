/* ============================================================
   FINAL PREP — data-structures taxonomy (L21 overview slide),
   master complexity cheat-sheet, and mixed cross-course practice.
   Injects into #lfinal. Loaded before the main engine.
   ============================================================ */
document.getElementById('lfinal').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'f-map')">DS Taxonomy ★</button>
  <button onclick="showTopic(this,'f-cheat')">Complexity Cheat-Sheet</button>
  <button onclick="showTopic(this,'f-adt')">ADT vs Implementation</button>
  <button onclick="showTopic(this,'f-mixed')">Mixed Practice</button>
  <button onclick="showTopic(this,'f-checklist')">Exam Checklist</button>
</nav>
<main>

  <!-- ===================== TAXONOMY MAP ===================== -->
  <section class="topic active" id="f-map">
    <h2>Final Prep · Data Structures Overview ★</h2>
    <div class="concept">Your professor's hint points here: the <b>L21 data-structures overview slide</b>. It organizes everything you learned into four families. A <b>box = an ADT</b> (an interface: <i>what</i> it does); an <b>arrow (implements)</b> points from a concrete data structure to the ADT it realizes (<i>how</i>). <b>Click any structure below</b> to see its definition and complexity.</div>
    <div class="card">
      <div style="display:flex;flex-wrap:wrap;gap:12px">
        <div style="flex:1;min-width:230px;background:rgba(232,121,198,.08);border:1px solid rgba(232,121,198,.4);border-radius:10px;padding:12px">
          <div style="text-decoration:underline;font-weight:700;margin-bottom:8px;color:#e879c6">Linear</div>
          <div class="ds-row">${dsBtn('lists','Lists')}${dsBtn('stacks','Stacks')}${dsBtn('queues','Queues')}</div>
          <div class="ds-arrow">↑ implements</div>
          <div class="ds-row">${dsBtn('arraylist','ArrayLists')}${dsBtn('linkedlist','LinkedLists')}</div>
        </div>
        <div style="flex:1.3;min-width:260px;background:rgba(167,139,250,.08);border:1px solid rgba(167,139,250,.4);border-radius:10px;padding:12px">
          <div style="text-decoration:underline;font-weight:700;margin-bottom:8px;color:#a78bfa">Trees — Binary Trees</div>
          <div class="ds-row">${dsBtn('pq','Priority Queues')}${dsBtn('bmt','BMTs')}${dsBtn('heap','Heaps')}</div>
          <div class="ds-arrow" style="margin:8px 0">BSTs ↓</div>
          <div class="ds-row">${dsBtn('bst','BSTs')}${dsBtn('avl','AVL Trees')}${dsBtn('rb','Red-Black Trees')}</div>
        </div>
        <div style="flex:1;min-width:230px;background:rgba(96,165,250,.08);border:1px solid rgba(96,165,250,.4);border-radius:10px;padding:12px">
          <div style="text-decoration:underline;font-weight:700;margin-bottom:8px;color:#60a5fa">Maps</div>
          <div class="ds-row">${dsBtn('maps','Maps')}${dsBtn('hashmap','HashMaps')}</div>
          <div style="text-decoration:underline;font-weight:700;margin:14px 0 8px;color:#60a5fa">Graphs</div>
          <div class="ds-row">${dsBtn('graphs','Graphs')}${dsBtn('adjmat','Adjacency Matrices')}${dsBtn('adjlist','Adjacency Lists')}</div>
        </div>
      </div>
      <div id="ds-detail" style="margin-top:14px;background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:14px;min-height:90px"></div>
    </div>
  </section>

  <!-- ===================== CHEAT SHEET ===================== -->
  <section class="topic" id="f-cheat">
    <h2>Final Prep · Master Complexity Cheat-Sheet</h2>
    <div class="concept">n = number of elements / vertices, m = edges, h = tree height. "Average" assumes a good hash / balanced tree.</div>
    <div class="card">
      <h3>Data structures</h3>
      <table class="cmp">
        <tr><th>Structure</th><th>Access/Search</th><th>Insert</th><th>Delete</th><th>Space</th></tr>
        <tr><td>Array / ArrayList (by index)</td><td>O(1) index, O(n) search</td><td>O(1)* amortized at end, O(n) middle</td><td>O(n)</td><td>O(n)</td></tr>
        <tr><td>LinkedList</td><td>O(n)</td><td>O(1) at head/tail</td><td>O(1) at ends</td><td>O(n)</td></tr>
        <tr><td>Stack / Queue</td><td>O(n)</td><td>O(1) push/enqueue</td><td>O(1) pop/dequeue</td><td>O(n)</td></tr>
        <tr><td>BST (unbalanced)</td><td>O(h) → O(n) worst</td><td>O(h)</td><td>O(h)</td><td>O(n)</td></tr>
        <tr><td>AVL / Red-Black (balanced)</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>O(n)</td></tr>
        <tr><td>Binary Heap</td><td>O(1) peek min</td><td>O(log n)</td><td>O(log n) removeMin</td><td>O(n)</td></tr>
        <tr><td>HashMap</td><td>O(1) avg, O(n) worst</td><td>O(1) avg</td><td>O(1) avg</td><td>O(n)</td></tr>
      </table>
    </div>
    <div class="card">
      <h3>Sorting</h3>
      <table class="cmp">
        <tr><th>Sort</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr>
        <tr><td>Bubble sort</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td></tr>
        <tr><td>Quick sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td></tr>
        <tr><td>Heap sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td></tr>
      </table>
      <p class="muted"><b>buildHeap</b> alone = O(n). <b>Binary search</b> = O(log n).</p>
    </div>
    <div class="card">
      <h3>Graph algorithms</h3>
      <table class="cmp">
        <tr><th>Algorithm</th><th>Purpose</th><th>Time</th></tr>
        <tr><td>Topological sort (Kahn's)</td><td>Order a DAG</td><td>O(n + m)</td></tr>
        <tr><td>BFS</td><td>Shortest path, unweighted</td><td>O(n + m)</td></tr>
        <tr><td>Dijkstra's</td><td>Shortest path, non-negative weights</td><td>O((n + m) log n)</td></tr>
        <tr><td>Bellman-Ford</td><td>Shortest path, allows negative weights</td><td>O(nm)</td></tr>
        <tr><td>Kruskal's</td><td>MST (sparse graphs)</td><td>O(m log m)</td></tr>
        <tr><td>Prim's</td><td>MST (dense graphs)</td><td>O(m log n)</td></tr>
      </table>
    </div>
  </section>

  <!-- ===================== ADT vs IMPL ===================== -->
  <section class="topic" id="f-adt">
    <h2>Final Prep · ADT vs Implementation</h2>
    <div class="concept">The overview slide's key distinction: an <b>ADT</b> (Abstract Data Type) says <b>what</b> operations exist (the interface); an <b>implementation</b> is <b>how</b> it's built with concrete data structures. One ADT can have several implementations.</div>
    <div class="card">
      <h3>Which are ADTs, which are implementations?</h3>
      <table class="match" id="match-adt">
        <tr><td class="match-term">Priority Queue</td><td><select class="match-def"><option value="">— choose —</option><option value="a">ADT (interface — what)</option><option value="i">Implementation (how)</option></select></td></tr>
        <tr><td class="match-term">Binary Heap</td><td><select class="match-def"><option value="">— choose —</option><option value="a">ADT (interface — what)</option><option value="i">Implementation (how)</option></select></td></tr>
        <tr><td class="match-term">Map</td><td><select class="match-def"><option value="">— choose —</option><option value="a">ADT (interface — what)</option><option value="i">Implementation (how)</option></select></td></tr>
        <tr><td class="match-term">HashMap</td><td><select class="match-def"><option value="">— choose —</option><option value="a">ADT (interface — what)</option><option value="i">Implementation (how)</option></select></td></tr>
        <tr><td class="match-term">List</td><td><select class="match-def"><option value="">— choose —</option><option value="a">ADT (interface — what)</option><option value="i">Implementation (how)</option></select></td></tr>
        <tr><td class="match-term">ArrayList</td><td><select class="match-def"><option value="">— choose —</option><option value="a">ADT (interface — what)</option><option value="i">Implementation (how)</option></select></td></tr>
        <tr><td class="match-term">Stack</td><td><select class="match-def"><option value="">— choose —</option><option value="a">ADT (interface — what)</option><option value="i">Implementation (how)</option></select></td></tr>
        <tr><td class="match-term">AVL Tree</td><td><select class="match-def"><option value="">— choose —</option><option value="a">ADT (interface — what)</option><option value="i">Implementation (how)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-adt','fb-match-adt',['a','i','a','i','a','i','a','i'])">Check</button>
      <div class="fb" id="fb-match-adt"></div>
    </div>
    <div class="card">
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>A Priority Queue can be implemented by which of these?</div>
        <button class="opt" data-i="0">A Stack or a Queue</button>
        <button class="opt" data-i="1">An ArrayList only</button>
        <button class="opt" data-i="2">A Binary Min Tree or a Binary Heap</button>
        <div class="fb">A Priority Queue (ADT) is implemented by a <b>Binary Min Tree</b> (node-based) or a <b>Binary Heap</b> (array-based). Same interface — enqueue/dequeue by priority — two implementations.</div>
      </div>
    </div>
  </section>

  <!-- ===================== MIXED PRACTICE ===================== -->
  <section class="topic" id="f-mixed">
    <h2>Final Prep · Mixed Rapid-Fire</h2>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Complexity</span>You need guaranteed O(log n) search AND sorted-order traversal. Best structure?</div>
        <button class="opt" data-i="0">HashMap</button>
        <button class="opt" data-i="1">Balanced BST (AVL / Red-Black)</button>
        <button class="opt" data-i="2">Binary Heap</button>
        <div class="fb">A balanced BST gives O(log n) worst-case AND in-order traversal. A HashMap has no order; a heap only gives you the min/max.</div>
      </div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Hashing</span>At what load factor does a <b>probing</b> hash table typically resize?</div>
        <button class="opt" data-i="0">0.5</button>
        <button class="opt" data-i="1">1.0</button>
        <button class="opt" data-i="2">0.75</button>
        <div class="fb">Probing resizes at <b>Tp = 0.75</b> (chaining tolerates more, Tc = 1.0). Probing degrades from clustering as it fills, so it grows earlier.</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Trees</span>What is the max height of a red-black tree with n nodes?</div>
        <button class="opt" data-i="0">2·log₂(n + 1)</button>
        <button class="opt" data-i="1">log₂(n)</button>
        <button class="opt" data-i="2">n − 1</button>
        <div class="fb"><b>2·log₂(n+1)</b> — the longest path is at most twice the shortest. Range: log₂(n+1)−1 ≤ h ≤ 2·log₂(n+1). Still O(log n).</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Graphs</span>Your weighted graph has some negative edges (no negative cycle). Shortest-path algorithm?</div>
        <button class="opt" data-i="0">Dijkstra's</button>
        <button class="opt" data-i="1">Bellman-Ford</button>
        <button class="opt" data-i="2">BFS</button>
        <div class="fb"><b>Bellman-Ford</b> — the only one that handles negative weights (and detects negative cycles). Dijkstra breaks on negatives; BFS ignores weights.</div>
      </div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Heaps</span>Building a heap from an unordered array (buildHeap) is…</div>
        <button class="opt" data-i="0">O(n log n)</button>
        <button class="opt" data-i="1">O(log n)</button>
        <button class="opt" data-i="2">O(n)</button>
        <div class="fb"><b>O(n)</b> bottom-up — cheaper than n separate O(log n) inserts. Most nodes are near the bottom with tiny sift-downs.</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Sorting</span>Which sort is O(n log n) in the <b>worst</b> case and O(1) space?</div>
        <button class="opt" data-i="0">Heap sort</button>
        <button class="opt" data-i="1">Quick sort</button>
        <button class="opt" data-i="2">Bubble sort</button>
        <div class="fb"><b>Heap sort</b> — O(n log n) even worst-case, sorts in place (O(1) space). Quick sort is O(n²) worst; bubble sort is O(n²).</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">Graphs</span>Adjacency lists (O(n+m) space) are the better choice for sparse graphs.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. Lists store only real edges → O(n+m), great when m is small. Matrices (O(n²)) suit dense graphs.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">MST</span>Which builds an MST by repeatedly adding the globally smallest edge that doesn't make a cycle?</div>
        <button class="opt" data-i="0">Prim's</button>
        <button class="opt" data-i="1">Kruskal's</button>
        <button class="opt" data-i="2">Dijkstra's</button>
        <div class="fb"><b>Kruskal's</b> — smallest-edge-first with union-find cycle checks. Prim's grows one tree from a start vertex. Dijkstra's finds shortest paths, not MSTs.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Recursion</span>Building a data structure by inserting n elements one at a time into a balanced BST is…</div>
        <button class="opt" data-i="0">O(n)</button>
        <button class="opt" data-i="1">O(n log n)</button>
        <button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(n log n)</b> — n inserts, each O(log n). (Contrast: buildHeap does it in O(n) because of its bottom-up structure.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== CHECKLIST ===================== -->
  <section class="topic" id="f-checklist">
    <h2>Final Prep · Exam Checklist</h2>
    <div class="concept">Skim this the morning of. Each item links to a lesson tab where you can drill it.</div>
    <div class="card">
      <h3>Can you do each of these from memory?</h3>
      <div style="font-size:14px;line-height:1.9">
        ☐ Convert between decimal / binary / hex; encode ASCII (L1)<br>
        ☐ Primitives vs reference types; Java execution model (javac → JVM/JIT) (L2)<br>
        ☐ Scanner next/nextInt/nextLine behavior; access modifiers (L3)<br>
        ☐ Trace recursion; stack vs heap memory (L4)<br>
        ☐ OOP: classes, getters/setters, is-a; interfaces &amp; ADTs (L5–L6)<br>
        ☐ Big-O of loops &amp; recursion; bubble/quick sort (L7)<br>
        ☐ Generics; ArrayList (amortized) vs LinkedList (L8–L9)<br>
        ☐ Stack (LIFO) / Queue (FIFO) operations (L10)<br>
        ☐ Tree traversals (pre/in/post/level); BST ops (L11)<br>
        ☐ Heaps: sift up/down, buildHeap O(n), array indices 2i+1/2i+2 (L12)<br>
        ☐ AVL: balance factor, LL/RR/LR/RL rotations (L13)<br>
        ☐ Red-Black: 5 invariants, height 2·log₂(n+1) (L14–L15)<br>
        ☐ Hashing: chaining vs probing, clustering, load factor, resizing (L16–L17)<br>
        ☐ Graph properties, adjacency matrix vs list, sparsity (L18)<br>
        ☐ Topo sort (Kahn's) &amp; BFS, both O(n+m) (L19)<br>
        ☐ Relaxation, Dijkstra's, Bellman-Ford; when each applies (L20)<br>
        ☐ MSTs: Kruskal's (sparse) vs Prim's (dense), greedy (L21)<br>
        ☐ The whole DS taxonomy: ADT vs implementation (★ DS Taxonomy tab)
      </div>
    </div>
    <div class="card">
      <div class="concept"><b>Highest-yield reminders:</b> greedy = best local → best global · a balanced tree/hash keeps ops fast by bounding height/load · ADT (what) vs implementation (how) · match each graph algorithm to the graph type it needs (unweighted → BFS, non-negative → Dijkstra, negative → Bellman-Ford, MST → Kruskal/Prim). Good luck, Steven — you've got this. 🎓</div>
    </div>
  </section>
</main>`;

/* ---- taxonomy button helper (hoisted so it's available inside the template above) ---- */
function dsBtn(key,label){
  return '<button class="ds-node" data-k="'+key+'" onclick="dsInfo(\''+key+'\')">'+label+'</button>';
}

/* ---- styles for the taxonomy nodes ---- */
(function(){
  const s=document.createElement('style');
  s.textContent='#lfinal .ds-row{display:flex;flex-wrap:wrap;gap:6px}'
    +'#lfinal .ds-node{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:7px 11px;font-size:13px;font-weight:600;color:var(--text);cursor:pointer;transition:all .15s}'
    +'#lfinal .ds-node:hover{border-color:var(--accent);background:rgba(46,134,222,.16)}'
    +'#lfinal .ds-node.sel{border-color:var(--green);background:rgba(21,153,87,.2)}'
    +'#lfinal .ds-arrow{font-size:11px;color:var(--muted);margin:6px 0}';
  document.head.appendChild(s);
})();

/* ---- detail data for each structure (kind + one-liner + key complexity) ---- */
const DS_INFO={
  lists:{k:'ADT · Linear',d:'An ordered collection accessed by index. Defines add/get/remove/size. Implemented by ArrayList or LinkedList.',c:'depends on implementation'},
  stacks:{k:'ADT · Linear',d:'LIFO (last-in, first-out). Operations: push, pop, peek. Used for call stacks, undo, backtracking.',c:'push/pop/peek O(1)'},
  queues:{k:'ADT · Linear',d:'FIFO (first-in, first-out). Operations: enqueue, dequeue. Used for BFS, scheduling, buffers.',c:'enqueue/dequeue O(1)'},
  arraylist:{k:'Implementation · Linear',d:'A List backed by a resizable array. Fast random access; doubling on growth gives amortized O(1) append.',c:'index O(1) · append O(1)* · insert middle O(n)'},
  linkedlist:{k:'Implementation · Linear',d:'A List of nodes linked by pointers. Fast insert/remove at the ends; no random access.',c:'index O(n) · add/remove at ends O(1)'},
  pq:{k:'ADT · Trees',d:'A Priority Queue dequeues by priority, not insertion order. Implemented by a Binary Min Tree or a Binary Heap.',c:'peek O(1) · enqueue/dequeue O(log n)'},
  bmt:{k:'Implementation · Trees',d:'Binary Min Tree — a node-based, balanced tree where each node ≤ its subtree (min at root). One way to build a Priority Queue.',c:'O(log n) ops'},
  heap:{k:'Implementation · Trees',d:'Binary Heap — a complete binary tree packed into an array (children of i are 2i+1, 2i+2). The array-based Priority Queue.',c:'peek O(1) · insert/removeMin O(log n) · buildHeap O(n)'},
  bst:{k:'Subtype · Trees',d:'Binary Search Tree — left < node < right ordering enables searching. Can degrade to O(n) if unbalanced.',c:'O(h): O(log n) balanced, O(n) worst'},
  avl:{k:'Implementation · Trees',d:'A self-balancing BST keeping |balance factor| ≤ 1 via LL/RR/LR/RL rotations. Tightest balance → fastest search.',c:'search/insert/delete O(log n)'},
  rb:{k:'Implementation · Trees',d:'A self-balancing BST using color invariants (longest path ≤ 2× shortest). Fewer rotations than AVL → faster updates. Used in TreeMap/TreeSet.',c:'O(log n); height ≤ 2·log₂(n+1)'},
  maps:{k:'ADT · Maps',d:'A Map stores key→value associations. Operations: put, get, contains, remove. Implemented by a HashMap (or a balanced-tree map).',c:'depends on implementation'},
  hashmap:{k:'Implementation · Maps',d:'A hash-table Map: a hash function sends keys to array indices; collisions handled by chaining or probing; resize by load factor.',c:'put/get/remove O(1) avg, O(n) worst'},
  graphs:{k:'ADT · Graphs',d:'A graph G=(V,E) models relationships. Properties: directed/undirected, weighted/unweighted, cyclic/acyclic, dense/sparse. Implemented by an adjacency matrix or list.',c:'depends on implementation'},
  adjmat:{k:'Implementation · Graphs',d:'Adjacency Matrix — an n×n array; [i][j] holds the edge i→j. O(1) edge lookup, but O(n²) space always. Best for dense graphs.',c:'space O(n²) · edge check O(1)'},
  adjlist:{k:'Implementation · Graphs',d:'Adjacency List — a hash table (vertices) of linked lists (edges). Stores only real edges. Best for sparse graphs.',c:'space O(n+m) · edge check O(m/n) avg'}
};
function dsInfo(key){
  document.querySelectorAll('#lfinal .ds-node').forEach(b=>b.classList.toggle('sel', b.dataset.k===key));
  const info=DS_INFO[key]; if(!info) return;
  const name=document.querySelector('#lfinal .ds-node[data-k="'+key+'"]').textContent;
  document.getElementById('ds-detail').innerHTML=
    '<div style="font-weight:700;font-size:15px;margin-bottom:2px">'+name+'</div>'
    +'<div style="font-size:12px;color:var(--accent);font-weight:600;margin-bottom:8px">'+info.k+'</div>'
    +'<div style="font-size:14px;margin-bottom:8px">'+info.d+'</div>'
    +'<div style="font-family:monospace;font-size:13px;color:#7bd88f">⏱ '+info.c+'</div>';
}
dsInfo('pq');
