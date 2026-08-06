/* ============================================================
   LESSON 15 — Red-Black Trees II (comparison & tree taxonomy).
   Injects into #l15. Loaded before the main engine.
   ============================================================ */
document.getElementById('l15').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l15-complexity')">RB Complexity</button>
  <button onclick="showTopic(this,'l15-compare')">Comparing Balanced Trees</button>
  <button onclick="showTopic(this,'l15-taxonomy')">Tree Taxonomy</button>
  <button onclick="showTopic(this,'l15-code')">Fields &amp; Practice</button>
</nav>
<main>

  <!-- ===================== COMPLEXITY ===================== -->
  <section class="topic active" id="l15-complexity">
    <h2>Lesson 15 · Red-Black Tree Complexity</h2>
    <div class="concept">Like AVL trees, red-black trees stay balanced (height O(log n)), so <b>search, insert, and delete are all O(log n)</b>. Self-balancing BSTs are everywhere in real systems: <b>Java's TreeMap &amp; TreeSet</b>, the <b>Linux kernel scheduler</b>, and <b>C++ STL map &amp; set</b> are all red-black trees.</div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Search, insert, and delete on a red-black tree are all…</div>
        <button class="opt" data-i="0">O(1)</button>
        <button class="opt" data-i="1">O(log n)</button>
        <button class="opt" data-i="2">O(n)</button>
        <div class="fb"><b>O(log n)</b>. The color invariants cap the height at ~2·log₂(n+1), so every operation follows a root-to-leaf path of length O(log n) — same guarantee as AVL.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Java's <code>TreeMap</code> and <code>TreeSet</code> are implemented with red-black trees.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. Red-black trees are the go-to self-balancing BST in standard libraries because their O(1) rebalancing (fewer rotations than AVL) makes inserts/deletes fast while keeping O(log n) lookups.</div>
      </div>
    </div>
  </section>

  <!-- ===================== COMPARE ===================== -->
  <section class="topic" id="l15-compare">
    <h2>Lesson 15 · Comparing Self-Balancing Trees</h2>
    <div class="concept">AVL and red-black trees both guarantee O(log n), but they trade off differently. <b>AVL</b> keeps a <b>tighter</b> balance (|BF| ≤ 1) → shorter trees → faster <b>search</b>, but more rotations per update. <b>Red-black</b> allows a <b>looser</b> balance (longest path ≤ 2× shortest) → fewer rotations → faster <b>insert/delete</b>.</div>
    <div class="card">
      <h3>Match each tree to its edge</h3>
      <table class="match" id="match-bal">
        <tr><td class="match-term">Plain BST</td><td><select class="match-def"><option value="">— choose —</option><option value="bst">No self-balancing — can degrade to O(n) if inserts are unlucky</option><option value="avl">Tightest balance → best for search-heavy workloads</option><option value="rb">Looser balance, fewer rotations → best for insert/delete-heavy workloads</option></select></td></tr>
        <tr><td class="match-term">AVL Tree</td><td><select class="match-def"><option value="">— choose —</option><option value="bst">No self-balancing — can degrade to O(n) if inserts are unlucky</option><option value="avl">Tightest balance → best for search-heavy workloads</option><option value="rb">Looser balance, fewer rotations → best for insert/delete-heavy workloads</option></select></td></tr>
        <tr><td class="match-term">Red-Black Tree</td><td><select class="match-def"><option value="">— choose —</option><option value="bst">No self-balancing — can degrade to O(n) if inserts are unlucky</option><option value="avl">Tightest balance → best for search-heavy workloads</option><option value="rb">Looser balance, fewer rotations → best for insert/delete-heavy workloads</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-bal','fb-match-bal',['bst','avl','rb'])">Check</button>
      <div class="fb" id="fb-match-bal"></div>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why do standard libraries usually pick red-black over AVL?</div>
        <button class="opt" data-i="0">Red-black trees are always shorter.</button>
        <button class="opt" data-i="1">Red-black trees rebalance with fewer rotations, so inserts/deletes are faster — and most workloads mix reads and writes.</button>
        <button class="opt" data-i="2">AVL trees can't do deletion.</button>
        <div class="fb">Both are O(log n), but AVL's stricter balance means more rotations per update. Red-black's looser balance keeps updates cheap while lookups stay O(log n) — a good all-round default.</div>
      </div>
    </div>
  </section>

  <!-- ===================== TAXONOMY ===================== -->
  <section class="topic" id="l15-taxonomy">
    <h2>Lesson 15 · Binary Tree Taxonomy</h2>
    <div class="concept">The trees you've studied fit into a family. <b>Shape types</b> describe a tree's form; <b>subtypes</b> add ordering/balance rules; and heaps are an <b>alternate (array) representation</b>.</div>
    <div class="card">
      <h3>Match the shape type to its definition</h3>
      <table class="match" id="match-shape">
        <tr><td class="match-term">Full</td><td><select class="match-def"><option value="">— choose —</option><option value="full">Every node has either 0 or 2 children</option><option value="complete">All levels filled except possibly the last, which fills left-to-right</option><option value="perfect">Every internal node has 2 children AND all leaves are on the same level</option><option value="balanced">Height stays O(log n) — subtree heights don't differ too much</option></select></td></tr>
        <tr><td class="match-term">Complete</td><td><select class="match-def"><option value="">— choose —</option><option value="full">Every node has either 0 or 2 children</option><option value="complete">All levels filled except possibly the last, which fills left-to-right</option><option value="perfect">Every internal node has 2 children AND all leaves are on the same level</option><option value="balanced">Height stays O(log n) — subtree heights don't differ too much</option></select></td></tr>
        <tr><td class="match-term">Perfect</td><td><select class="match-def"><option value="">— choose —</option><option value="full">Every node has either 0 or 2 children</option><option value="complete">All levels filled except possibly the last, which fills left-to-right</option><option value="perfect">Every internal node has 2 children AND all leaves are on the same level</option><option value="balanced">Height stays O(log n) — subtree heights don't differ too much</option></select></td></tr>
        <tr><td class="match-term">Balanced</td><td><select class="match-def"><option value="">— choose —</option><option value="full">Every node has either 0 or 2 children</option><option value="complete">All levels filled except possibly the last, which fills left-to-right</option><option value="perfect">Every internal node has 2 children AND all leaves are on the same level</option><option value="balanced">Height stays O(log n) — subtree heights don't differ too much</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-shape','fb-match-shape',['full','complete','perfect','balanced'])">Check</button>
      <div class="fb" id="fb-match-shape"></div>
    </div>
    <div class="card">
      <h3>Subtypes &amp; representations</h3>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Which is an <b>alternate (array) representation</b> of a binary tree rather than a node-based subtype?</div>
        <button class="opt" data-i="0">AVL Tree</button>
        <button class="opt" data-i="1">Binary Search Tree</button>
        <button class="opt" data-i="2">Binary Heap (min/max)</button>
        <div class="fb">A <b>binary heap</b> stores a complete binary tree packed into an <b>array</b> (index arithmetic instead of pointers). BST/AVL/Red-Black/Binary Min-Max Trees are node-based subtypes.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>BSTs, AVL trees, Red-Black trees, and Binary Min/Max Trees are all subtypes of binary tree that add extra invariants (ordering and/or balance).</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True — each is a binary tree plus rules: BST (ordering), AVL/Red-Black (ordering + balance), Binary Min/Max Tree (heap-ordering + balance).</div>
      </div>
    </div>
  </section>

  <!-- ===================== CODE / FIELDS ===================== -->
  <section class="topic" id="l15-code">
    <h2>Lesson 15 · Fields &amp; Implementation Practice</h2>
    <div class="concept">The L15 practice asks you to list the fields of a Red-Black (and AVL) tree class. Here they are side by side — both are recursive "each node is a subtree" designs like your A8 code.</div>
    <div class="card">
      <h3>List the fields of a Red-Black Tree node</h3>
      <textarea placeholder="what fields does an RB tree node need?"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show fields</button></div>
      <div class="reveal">
<pre><span class="kw">class</span> <span class="ty">RBTree</span>&lt;T&gt; {
    T _value;             <span class="cm">// the key</span>
    Color _color;         <span class="cm">// RED or BLACK</span>
    RBTree&lt;T&gt; _left;      <span class="cm">// left subtree</span>
    RBTree&lt;T&gt; _right;     <span class="cm">// right subtree</span>
    <span class="cm">// (optional) RBTree&lt;T&gt; _parent;  // to walk UP during fix-up</span>
    <span class="cm">// (optional) int _size;</span>
}</pre>
        <div class="concept">The one field that distinguishes it from a plain BST is <code>_color</code>. A parent pointer is common so insertion/deletion can walk back up to recolor/rotate.</div>
      </div>
    </div>
    <div class="card">
      <h3>…and an AVL Tree node (for comparison)</h3>
      <textarea placeholder="what fields does an AVL tree node need?"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show fields</button></div>
      <div class="reveal">
<pre><span class="kw">class</span> <span class="ty">AVLTree</span>&lt;T&gt; {
    T _value;
    AVLTree&lt;T&gt; _left;
    AVLTree&lt;T&gt; _right;
    <span class="ty">int</span> _height;         <span class="cm">// to compute balance factor</span>
    <span class="ty">int</span> _size;
}</pre>
        <div class="concept">AVL tracks <b>_height</b> (to compute the balance factor); red-black tracks <b>_color</b> instead. Both use those fields to decide when/how to rotate. Everything else is the same recursive BST structure.</div>
      </div>
    </div>
  </section>
</main>`;
