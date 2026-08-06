/* ============================================================
   LESSON 13 — AVL Trees.
   Injects into #l13. Loaded before the main engine.
   Includes a self-contained ordering widget and an interactive
   rotation-case visualizer (LL / RR / LR / RL, before -> after).
   ============================================================ */
document.getElementById('l13').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l13-inv')">Invariants</button>
  <button onclick="showTopic(this,'l13-cases')">Rebalancing Cases</button>
  <button onclick="showTopic(this,'l13-insert')">Insertion</button>
  <button onclick="showTopic(this,'l13-complexity')">Complexity</button>
  <button onclick="showTopic(this,'l13-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l13-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== INVARIANTS ===================== -->
  <section class="topic active" id="l13-inv">
    <h2>Lesson 13 · AVL Tree Invariants</h2>
    <div class="concept">An <b>AVL tree</b> (Adelson-Velsky &amp; Landis) is a <b>self-balancing BST</b>. Each node has a <b>balance factor</b> <code>BF = H(left) − H(right)</code> (difference in subtree heights). A tree is <b>strictly balanced</b> when <b>every</b> node has <code>|BF| ≤ 1</code>. So an AVL tree is a BST that keeps <code>|BF| ≤ 1</code> everywhere — which forces its height to stay <b>O(log n)</b>.</div>
    <div class="card">
      <h3>Multiple choice — what makes a tree strictly balanced? (your quiz)</h3>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>A tree is strictly balanced if all of its nodes have…</div>
        <button class="opt" data-i="0">0 or 2 children</button>
        <button class="opt" data-i="1">a complete shape</button>
        <button class="opt" data-i="2"><code>|BF| ≤ 1</code></button>
        <button class="opt" data-i="3">log n height</button>
        <div class="fb"><b><code>|BF| ≤ 1</code></b> at every node. The other options describe related-but-different ideas: "0 or 2 children" is a <i>full</i> tree; "complete shape" and "log n height" are consequences of balance, not the definition of it.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>A node's left subtree has height 2 and its right subtree has height 0. What is its balance factor, and is it allowed in an AVL tree?</div>
        <button class="opt" data-i="0">BF = 0, allowed</button>
        <button class="opt" data-i="1">BF = 2, NOT allowed (|BF| &gt; 1)</button>
        <button class="opt" data-i="2">BF = −2, allowed</button>
        <div class="fb"><code>BF = H(L) − H(R) = 2 − 0 = 2</code>. Since <code>|2| &gt; 1</code>, this node violates the AVL invariant → it must be rebalanced. Tip: compute BFs starting from the leaves (leaves have height 0, empty = height −1).</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Perfect and complete binary trees are strictly balanced and have log n height.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 6). They're the "most balanced" shapes — every node has <code>|BF| ≤ 1</code> — which is exactly why their height is O(log n).</div>
      </div>
    </div>
  </section>

  <!-- ===================== REBALANCING CASES ===================== -->
  <section class="topic" id="l13-cases">
    <h2>Lesson 13 · The Four Rebalancing Cases</h2>
    <div class="concept">When an insert breaks the invariant, you find three nodes: <b>z</b> = the lowest node where the imbalance exists (<code>|BF| &gt; 1</code>), <b>y</b> = z's child with the larger height, <b>x</b> = y's child with the larger height. The <b>path z → y → x</b> (each step Left or Right) names the case: <b>LL, RR, LR, RL</b>.</div>
    <div class="card">
      <h3>Order the steps to fix an imbalance (your quiz)</h3>
      <p class="muted">Use ▲ / ▼ to arrange, then check.</p>
      <div id="avl-order"></div>
      <button class="btn small" style="margin-top:8px" onclick="avlCheckOrder()">Check order</button>
      <div class="fb" id="fb-avl-order"></div>
    </div>
    <div class="card">
      <h3>Match each case with its rotation(s) (your quiz)</h3>
      <table class="match" id="match-avl">
        <tr><td class="match-term">LL</td><td><select class="match-def"><option value="">— choose —</option><option value="r">Right rotation</option><option value="l">Left rotation</option><option value="lr">Left + right rotation</option><option value="rl">Right + left rotation</option></select></td></tr>
        <tr><td class="match-term">RR</td><td><select class="match-def"><option value="">— choose —</option><option value="r">Right rotation</option><option value="l">Left rotation</option><option value="lr">Left + right rotation</option><option value="rl">Right + left rotation</option></select></td></tr>
        <tr><td class="match-term">LR</td><td><select class="match-def"><option value="">— choose —</option><option value="r">Right rotation</option><option value="l">Left rotation</option><option value="lr">Left + right rotation</option><option value="rl">Right + left rotation</option></select></td></tr>
        <tr><td class="match-term">RL</td><td><select class="match-def"><option value="">— choose —</option><option value="r">Right rotation</option><option value="l">Left rotation</option><option value="lr">Left + right rotation</option><option value="rl">Right + left rotation</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-avl','fb-match-avl',['r','l','lr','rl'])">Check</button>
      <div class="fb" id="fb-match-avl"></div>
      <p class="muted" style="margin-top:8px">Memory aid: a <b>single</b> letter-pair that's the <i>same</i> (LL, RR) needs <b>one</b> rotation in the <i>opposite</i> direction (LL→Right, RR→Left). A <b>mixed</b> pair (LR, RL) needs <b>two</b> rotations. ➡ See them animate in Diagram It.</p>
    </div>
  </section>

  <!-- ===================== INSERTION ===================== -->
  <section class="topic" id="l13-insert">
    <h2>Lesson 13 · Insertion &amp; Rebalancing</h2>
    <div class="concept">Insert (or delete) like a normal BST, then <b>walk back up the parent chain</b> from the new leaf toward the root. Stop at the <b>first</b> node with <code>|BF| &gt; 1</code>, rebalance it (find z/y/x, determine the case, rotate), and continue up. Each fix is O(1); the walk is O(log n).</div>
    <div class="card">
      <h3>Which case? insert(4, 16, 8) into an empty AVL tree (your quiz)</h3>
      <div class="q" data-mc="3">
        <div class="prompt"><span class="tag">Multiple choice</span>Starting empty, insert 4, then 16, then 8. What rebalancing case results?</div>
        <button class="opt" data-i="0">LL</button>
        <button class="opt" data-i="1">RR</button>
        <button class="opt" data-i="2">LR</button>
        <button class="opt" data-i="3">RL</button>
        <button class="opt" data-i="4">None, the tree is balanced</button>
        <div class="fb"><b>RL</b>. 4 is the root; 16 &gt; 4 → right child; 8 &lt; 16 → left child of 16. Now z = 4 (BF = −2), y = 16 (z's right child), x = 8 (y's left child). Path z→y→x = <b>Right, then Left</b> → <b>RL</b> → fix with a right rotation then a left rotation.</div>
      </div>
    </div>
    <div class="card">
      <h3>Same-height tie-breaker</h3>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>If both children of y have the <b>same</b> height (either single or double rotation would balance it), which do the slides say to prefer?</div>
        <button class="opt" data-i="0">The <b>single</b> rotation (prefer LL over LR, and RR over RL) — it's faster</button>
        <button class="opt" data-i="1">The double rotation, always</button>
        <button class="opt" data-i="2">It doesn't matter and there's no preference</button>
        <div class="fb">Slide 17: prefer the <b>single</b> rotation (treat it as LL/RR rather than LR/RL) because one rotation is fewer operations than two. Both produce a valid AVL tree.</div>
      </div>
    </div>
  </section>

  <!-- ===================== COMPLEXITY ===================== -->
  <section class="topic" id="l13-complexity">
    <h2>Lesson 13 · Time Complexity</h2>
    <div class="concept">Because an AVL tree stays balanced, its height is always <b>O(log n)</b>. Every operation is bounded by that height.</div>
    <div class="card">
      <h3>Multiple choice — AVL operations (your quiz)</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>The height, search, insertion, and deletion of an AVL tree are all…</div>
        <button class="opt" data-i="0">O(1)</button>
        <button class="opt" data-i="1">O(log n)</button>
        <button class="opt" data-i="2">O(n)</button>
        <button class="opt" data-i="3">O(n log n)</button>
        <button class="opt" data-i="4">O(n²)</button>
        <div class="fb"><b>O(log n)</b>. Height is O(log n) (balanced); search/insert/delete follow a root-to-leaf path = O(log n); walking back up to check balance = O(log n); and each rotation fix is <b>O(1)</b>. The guaranteed balance is what a plain BST lacks — a plain BST can degrade to O(n).</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Why is an AVL tree better than a plain BST for search-heavy workloads?</div>
        <button class="opt" data-i="0">A plain BST can degenerate to a "stick" (O(n)); the AVL tree guarantees O(log n) by rebalancing.</button>
        <button class="opt" data-i="1">AVL trees use less memory.</button>
        <button class="opt" data-i="2">AVL trees don't need comparisons.</button>
        <div class="fb">Recall from L11: a plain BST's shape depends on insert order and can become a linked list (O(n)). The AVL tree pays a little extra work per insert to <b>keep itself balanced</b>, guaranteeing O(log n) forever.</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l13-diagram">
    <h2>Lesson 13 · Diagram It — The Four Rotations</h2>
    <div class="concept">Pick a case to see the <b>imbalanced</b> tree (with z, y, x labeled) and the <b>balanced</b> result after the rotation(s). Watch how "the closest child gets handed off." <span style="color:var(--red)">z</span> = imbalance, <span style="color:var(--amber)">y</span> = taller child, <span style="color:var(--stack)">x</span> = taller grandchild.</div>
    <div class="card">
      <div class="toolbar">
        <button class="btn small" onclick="avlCase('LL')">LL</button>
        <button class="btn small" onclick="avlCase('RR')">RR</button>
        <button class="btn small" onclick="avlCase('LR')">LR</button>
        <button class="btn small" onclick="avlCase('RL')">RL</button>
      </div>
      <div class="two">
        <div>
          <div class="muted" style="font-size:12px;text-align:center;margin-bottom:4px">Imbalanced (|BF| &gt; 1)</div>
          <div id="avl-before" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center"></div>
        </div>
        <div>
          <div class="muted" style="font-size:12px;text-align:center;margin-bottom:4px">After rotation → balanced</div>
          <div id="avl-after" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center"></div>
        </div>
      </div>
      <div class="step-desc" id="avl-note"></div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l13-code">
    <h2>Lesson 13 · Code Writing <span class="muted" style="font-size:13px">— A8 recursive style</span></h2>
    <div class="concept">This matches the <b>A8 AVL assignment</b>: there is <b>no separate Node class</b> — each <code>AVLTree&lt;T&gt;</code> object <i>is</i> a subtree, with fields <code>_value</code>, <code>_left</code>, <code>_right</code> (both <code>AVLTree&lt;T&gt;</code>), <code>_height</code>, <code>_size</code>. An <b>empty tree</b> is a real object (<code>_value=null</code>, <code>_height=-1</code>, <code>_size=0</code>), and a non-empty node's children are <b>empty AVLTree objects, never <code>null</code></b>. Rotations/fixes are methods on <code>this</code> that <b>return the new subtree root</b>.</div>

    <div class="card">
      <h3>The rule that trips everyone up: recapture the result</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why write <code>_left = (AVLTree&lt;T&gt;) _left.insert(element);</code> instead of just <code>_left.insert(element);</code>?</div>
        <button class="opt" data-i="0">To make it compile.</button>
        <button class="opt" data-i="1">A rotation inside the child can change which object is the child's root, so you must reassign <code>_left</code> to the returned root — otherwise the rebalanced subtree is lost.</button>
        <button class="opt" data-i="2">Because insert is static.</button>
        <div class="fb">Self-balancing means <code>insert</code>/<code>remove</code> can return a <b>different</b> root object. Throw away the return value and any rotation below is lost. <b>Always recapture</b> the result into the child field. (This is why the interface methods return the tree.)</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Because empty children are real AVLTree objects (not <code>null</code>), you can call <code>_left.height()</code> without a null check.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True — the empty-tree sentinel returns height −1 and size 0, so the recursive calls just work. That's the payoff of using empty objects instead of <code>null</code> children.</div>
      </div>
    </div>

    <div class="card">
      <h3>1. updateHeightAndSize &amp; balanceFactor</h3>
      <p>Recompute this node's stats from its children (empty child → height −1, size 0). Balance factor = left height − right height.</p>
      <textarea placeholder="void updateHeightAndSize() { ... }  /  int balanceFactor() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">private void</span> <span class="fn">updateHeightAndSize</span>() {
    _height = <span class="nm">1</span> + Math.max(_left.height(), _right.height());
    _size   = <span class="nm">1</span> + _left.size() + _right.size();
}
<span class="kw">private int</span> <span class="fn">balanceFactor</span>() {
    <span class="kw">return</span> _left.height() - _right.height();   <span class="cm">// H(L) - H(R)</span>
}</pre>
        <div class="concept">No null checks needed. Call <code>updateHeightAndSize()</code> after <b>any</b> structural change — after a rotation, and after an insert/remove recursion returns.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. rotateRight &amp; rotateLeft (called on <code>this</code>)</h3>
      <p>No parameter — they rotate <code>this</code> down and return the new root. Update heights on <code>this</code> <b>first</b> (it dropped), then on the new root.</p>
      <textarea placeholder="AVLTree<T> rotateRight() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">private</span> AVLTree&lt;T&gt; <span class="fn">rotateRight</span>() {
    AVLTree&lt;T&gt; newRoot = _left;
    _left = newRoot._right;        <span class="cm">// hand off newRoot's right subtree</span>
    newRoot._right = <span class="kw">this</span>;        <span class="cm">// this drops to newRoot's right</span>
    <span class="kw">this</span>.updateHeightAndSize();     <span class="cm">// this is now lower — update it first</span>
    newRoot.updateHeightAndSize();
    <span class="kw">return</span> newRoot;
}
<span class="kw">private</span> AVLTree&lt;T&gt; <span class="fn">rotateLeft</span>() {    <span class="cm">// mirror image</span>
    AVLTree&lt;T&gt; newRoot = _right;
    _right = newRoot._left;
    newRoot._left = <span class="kw">this</span>;
    <span class="kw">this</span>.updateHeightAndSize();
    newRoot.updateHeightAndSize();
    <span class="kw">return</span> newRoot;
}</pre>
        <div class="concept">Same three pointer moves as the generic rotation, just as instance methods on the node being rotated down. <code>rotateLeft</code> is <code>rotateRight</code> with every left/right swapped.</div>
      </div>
    </div>

    <div class="card">
      <h3>3. fixIfImbalanced (the LL/RR/LR/RL dispatch)</h3>
      <p>Update stats, read the balance factor, and if <code>|BF| &gt; 1</code> pick the case and rotate. Return the (possibly new) root.</p>
      <textarea placeholder="AVLTree<T> fixIfImbalanced() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">private</span> AVLTree&lt;T&gt; <span class="fn">fixIfImbalanced</span>() {
    updateHeightAndSize();
    <span class="ty">int</span> bf = balanceFactor();
    <span class="kw">if</span> (bf &gt; <span class="nm">1</span>) {                          <span class="cm">// left-heavy</span>
        <span class="kw">if</span> (_left.balanceFactor() &lt; <span class="nm">0</span>)       <span class="cm">// LR: straighten child first</span>
            _left = _left.rotateLeft();
        <span class="kw">return</span> rotateRight();              <span class="cm">// LL (or finish LR)</span>
    } <span class="kw">else if</span> (bf &lt; -<span class="nm">1</span>) {                 <span class="cm">// right-heavy</span>
        <span class="kw">if</span> (_right.balanceFactor() &gt; <span class="nm">0</span>)      <span class="cm">// RL: straighten child first</span>
            _right = _right.rotateRight();
        <span class="kw">return</span> rotateLeft();               <span class="cm">// RR (or finish RL)</span>
    }
    <span class="kw">return</span> <span class="kw">this</span>;                          <span class="cm">// already balanced</span>
}</pre>
        <div class="concept"><b>Order matters:</b> <code>updateHeightAndSize()</code> comes <b>before</b> reading <code>balanceFactor()</code>, or the BF is stale. The LR/RL child rotations use recapture (<code>_left = _left.rotateLeft()</code>) — same rule as insert.</div>
      </div>
    </div>

    <div class="card">
      <h3>4. insert</h3>
      <p>Empty tree → become a one-node tree (with empty children). Otherwise BST-recurse with <b>recapture</b>, then <code>fixIfImbalanced()</code>.</p>
      <textarea placeholder="SelfBalancingBST<T> insert(T element) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public</span> SelfBalancingBST&lt;T&gt; <span class="fn">insert</span>(T element) {
    <span class="kw">if</span> (isEmpty()) {                     <span class="cm">// fill this empty node</span>
        _value = element;
        _left  = <span class="kw">new</span> AVLTree&lt;&gt;();
        _right = <span class="kw">new</span> AVLTree&lt;&gt;();
        _height = <span class="nm">0</span>; _size = <span class="nm">1</span>;
        <span class="kw">return</span> <span class="kw">this</span>;
    }
    <span class="ty">int</span> cmp = element.compareTo(_value);
    <span class="kw">if</span> (cmp &lt; <span class="nm">0</span>)  _left  = (AVLTree&lt;T&gt;) _left.insert(element);
    <span class="kw">else if</span> (cmp &gt; <span class="nm">0</span>) _right = (AVLTree&lt;T&gt;) _right.insert(element);
    <span class="kw">else</span> <span class="kw">return</span> <span class="kw">this</span>;                <span class="cm">// duplicate — no change</span>
    <span class="kw">return</span> fixIfImbalanced();
}</pre>
        <div class="concept">A new value always lands in an <b>empty</b> AVLTree (height −1), which becomes a leaf with two empty children. Each recursion recaptures the child; the final <code>fixIfImbalanced()</code> rebalances on the way back up.</div>
      </div>
    </div>

    <div class="card">
      <h3>5. remove (the three delete cases)</h3>
      <p>BST-remove, then rebalance. When you find the node: leaf → become empty; one child → return the other; two children → copy the successor (min of the right subtree) and remove it from the right.</p>
      <textarea placeholder="SelfBalancingBST<T> remove(T element) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public</span> SelfBalancingBST&lt;T&gt; <span class="fn">remove</span>(T element) {
    <span class="kw">if</span> (isEmpty()) <span class="kw">return</span> <span class="kw">this</span>;         <span class="cm">// not found</span>
    <span class="ty">int</span> cmp = element.compareTo(_value);
    <span class="kw">if</span> (cmp &lt; <span class="nm">0</span>)  _left  = (AVLTree&lt;T&gt;) _left.remove(element);
    <span class="kw">else if</span> (cmp &gt; <span class="nm">0</span>) _right = (AVLTree&lt;T&gt;) _right.remove(element);
    <span class="kw">else</span> {                              <span class="cm">// found it</span>
        <span class="kw">if</span> (_left.isEmpty() &amp;&amp; _right.isEmpty()) {
            _value = <span class="kw">null</span>; _left = <span class="kw">null</span>; _right = <span class="kw">null</span>;
            _height = -<span class="nm">1</span>; _size = <span class="nm">0</span>;
            <span class="kw">return</span> <span class="kw">this</span>;                    <span class="cm">// leaf → become empty</span>
        } <span class="kw">else if</span> (_left.isEmpty())  <span class="kw">return</span> _right;   <span class="cm">// one child</span>
        <span class="kw">else if</span> (_right.isEmpty()) <span class="kw">return</span> _left;
        <span class="kw">else</span> {                          <span class="cm">// two children</span>
            T successor = _right.findMin();
            _value = successor;
            _right = (AVLTree&lt;T&gt;) _right.remove(successor);
        }
    }
    <span class="kw">return</span> fixIfImbalanced();
}</pre>
        <div class="concept">Two-children case: copy the <b>successor</b> (smallest value in the right subtree) into this node, then remove that successor from the right — it's guaranteed to be an easy leaf/one-child delete. Every branch ends by rebalancing with <code>fixIfImbalanced()</code>.</div>
      </div>
    </div>
  </section>
</main>`;

/* ============================================================
   Self-contained ordering widget (the fix-an-imbalance steps)
   ============================================================ */
const AVL_ORDER=['Determine the z, y, and x nodes','Determine imbalance type','Perform the necessary rotation(s)'];
let avlOrderState=[AVL_ORDER[2],AVL_ORDER[0],AVL_ORDER[1]];   // start shuffled
function avlRenderOrder(){
  const box=document.getElementById('avl-order');
  box.innerHTML=avlOrderState.map((item,i)=>
    '<div class="order-item"><span><span class="num">'+(i+1)+'</span>'+item+'</span>'
    +'<span class="order-btns">'
    +'<button onclick="avlMoveOrder('+i+',-1)" '+(i===0?'disabled style=opacity:.3':'')+'>▲</button>'
    +'<button onclick="avlMoveOrder('+i+',1)" '+(i===avlOrderState.length-1?'disabled style=opacity:.3':'')+'>▼</button>'
    +'</span></div>').join('');
}
function avlMoveOrder(i,d){
  const j=i+d; if(j<0||j>=avlOrderState.length)return;
  const t=avlOrderState[i]; avlOrderState[i]=avlOrderState[j]; avlOrderState[j]=t;
  avlRenderOrder();
}
function avlCheckOrder(){
  const items=document.querySelectorAll('#avl-order .order-item');
  let all=true;
  avlOrderState.forEach((item,i)=>{
    const ok=item===AVL_ORDER[i];
    items[i].classList.remove('correct','wrong');
    items[i].classList.add(ok?'correct':'wrong');
    if(!ok)all=false;
  });
  const fb=document.getElementById('fb-avl-order');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all
    ? '✓ Correct: (1) Determine the z, y, and x nodes → (2) Determine imbalance type → (3) Perform the necessary rotation(s).'
    : '✗ Not yet. First find z/y/x, then decide the case (LL/RR/LR/RL), then rotate. Green rows are in the right spot.';
}

/* ============================================================
   Rotation-case visualizer (before -> after, small SVG trees)
   ============================================================ */
/* node = {v, x, y, tag}  (tag optional: z/y/x)   edge = [i,j] */
const AVL_CASES={
  RR:{ rot:'Left rotation', ex:'insert(10, 20, 30)',
    before:{nodes:[{v:10,x:45,y:30,tag:'z'},{v:20,x:105,y:90,tag:'y'},{v:30,x:165,y:150,tag:'x'}],edges:[[0,1],[1,2]]},
    after:{nodes:[{v:20,x:105,y:35},{v:10,x:55,y:110},{v:30,x:155,y:110}],edges:[[0,1],[0,2]]},
    note:'z=10 is right-heavy and its taller child y=20 is ALSO right-heavy (path z→y→x = Right, Right). A single <b>LEFT rotation</b> about z lifts 20 to the top: 10 becomes its left child, 30 stays right.'},
  LL:{ rot:'Right rotation', ex:'insert(30, 20, 10)',
    before:{nodes:[{v:30,x:165,y:30,tag:'z'},{v:20,x:105,y:90,tag:'y'},{v:10,x:45,y:150,tag:'x'}],edges:[[0,1],[1,2]]},
    after:{nodes:[{v:20,x:105,y:35},{v:10,x:55,y:110},{v:30,x:155,y:110}],edges:[[0,1],[0,2]]},
    note:'z=30 is left-heavy and its taller child y=20 is ALSO left-heavy (path z→y→x = Left, Left). A single <b>RIGHT rotation</b> about z lifts 20 to the top: 30 becomes its right child, 10 stays left.'},
  RL:{ rot:'Right + Left rotation', ex:'insert(1, 3, 2)',
    before:{nodes:[{v:1,x:45,y:30,tag:'z'},{v:3,x:165,y:90,tag:'y'},{v:2,x:105,y:150,tag:'x'}],edges:[[0,1],[1,2]]},
    after:{nodes:[{v:2,x:105,y:35},{v:1,x:55,y:110},{v:3,x:155,y:110}],edges:[[0,1],[0,2]]},
    note:'z=1 goes Right to y=3, then Left to x=2 (path = Right, Left → <b>RL</b>). Two rotations: first a <b>right rotation on y</b> (turns it into an RR shape), then a <b>left rotation on z</b>. The middle value 2 ends up on top.'},
  LR:{ rot:'Left + Right rotation', ex:'insert(3, 1, 2)',
    before:{nodes:[{v:3,x:165,y:30,tag:'z'},{v:1,x:45,y:90,tag:'y'},{v:2,x:105,y:150,tag:'x'}],edges:[[0,1],[1,2]]},
    after:{nodes:[{v:2,x:105,y:35},{v:1,x:55,y:110},{v:3,x:155,y:110}],edges:[[0,1],[0,2]]},
    note:'z=3 goes Left to y=1, then Right to x=2 (path = Left, Right → <b>LR</b>). Two rotations: first a <b>left rotation on y</b> (turns it into an LL shape), then a <b>right rotation on z</b>. The middle value 2 ends up on top.'}
};
const AVL_TAGCOLOR={z:'#c0392b', y:'#d68910', x:'#2e86de'};
function avlTreeSVG(tree){
  let e='', n='';
  tree.edges.forEach(([a,b])=>{
    const A=tree.nodes[a], B=tree.nodes[b];
    e+='<line x1="'+A.x+'" y1="'+A.y+'" x2="'+B.x+'" y2="'+B.y+'" stroke="#2b3c50" stroke-width="1.5"/>';
  });
  tree.nodes.forEach(nd=>{
    const stroke=nd.tag?AVL_TAGCOLOR[nd.tag]:'#159957';
    const fill=nd.tag?'rgba(255,255,255,0.04)':'rgba(21,153,87,.18)';
    n+='<circle cx="'+nd.x+'" cy="'+nd.y+'" r="17" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2.5"/>';
    n+='<text x="'+nd.x+'" y="'+(nd.y+5)+'" text-anchor="middle" fill="#e8eef5" font-size="13" font-weight="700">'+nd.v+'</text>';
    if(nd.tag) n+='<text x="'+(nd.x+20)+'" y="'+(nd.y-14)+'" fill="'+AVL_TAGCOLOR[nd.tag]+'" font-size="12" font-weight="700">'+nd.tag+'</text>';
  });
  return '<svg viewBox="0 0 210 180" style="width:100%;max-width:230px">'+e+n+'</svg>';
}
function avlCase(key){
  const c=AVL_CASES[key];
  document.getElementById('avl-before').innerHTML=avlTreeSVG(c.before);
  document.getElementById('avl-after').innerHTML=avlTreeSVG(c.after);
  document.getElementById('avl-note').innerHTML='<b>'+key+' → '+c.rot+'</b> &nbsp;<span class="muted">('+c.ex+')</span><br>'+c.note;
}

avlRenderOrder();
avlCase('RR');
