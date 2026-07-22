/* ============================================================
   LESSON 14 — Red-Black Trees.
   Injects into #l14. Loaded before the main engine.
   Includes an interactive colored-tree case viewer (valid tree,
   the insertion recolor case, and the insertion rotate case).
   ============================================================ */
document.getElementById('l14').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l14-inv')">Invariants</button>
  <button onclick="showTopic(this,'l14-identify')">Identify</button>
  <button onclick="showTopic(this,'l14-insert')">Insertion</button>
  <button onclick="showTopic(this,'l14-delete')">Deletion</button>
  <button onclick="showTopic(this,'l14-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l14-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== INVARIANTS ===================== -->
  <section class="topic active" id="l14-inv">
    <h2>Lesson 14 · Red-Black Tree Invariants</h2>
    <div class="concept">A <b>Red-Black tree</b> is another <b>self-balancing BST</b>. It's a normal BST plus five color rules that together keep the height <b>O(log n)</b> — but with a looser balance than AVL, so it needs fewer rotations on insert/delete.</div>
    <div class="card">
      <h3>The five properties</h3>
      <table class="match" id="match-rb">
        <tr><td class="match-term"><b>Color</b></td><td><select class="match-def"><option value="">— choose —</option><option value="color">Every node is either red or black</option><option value="root">The root is black</option><option value="leaves">Leaves (the NIL null pointers) are black</option><option value="red">A red node cannot have red children (no two reds in a row)</option><option value="black">Every path from a node down to its NIL leaves passes through the same number of black nodes</option></select></td></tr>
        <tr><td class="match-term"><b>Root</b></td><td><select class="match-def"><option value="">— choose —</option><option value="color">Every node is either red or black</option><option value="root">The root is black</option><option value="leaves">Leaves (the NIL null pointers) are black</option><option value="red">A red node cannot have red children (no two reds in a row)</option><option value="black">Every path from a node down to its NIL leaves passes through the same number of black nodes</option></select></td></tr>
        <tr><td class="match-term"><b>Leaves</b></td><td><select class="match-def"><option value="">— choose —</option><option value="color">Every node is either red or black</option><option value="root">The root is black</option><option value="leaves">Leaves (the NIL null pointers) are black</option><option value="red">A red node cannot have red children (no two reds in a row)</option><option value="black">Every path from a node down to its NIL leaves passes through the same number of black nodes</option></select></td></tr>
        <tr><td class="match-term"><b>Red</b></td><td><select class="match-def"><option value="">— choose —</option><option value="color">Every node is either red or black</option><option value="root">The root is black</option><option value="leaves">Leaves (the NIL null pointers) are black</option><option value="red">A red node cannot have red children (no two reds in a row)</option><option value="black">Every path from a node down to its NIL leaves passes through the same number of black nodes</option></select></td></tr>
        <tr><td class="match-term"><b>Black</b></td><td><select class="match-def"><option value="">— choose —</option><option value="color">Every node is either red or black</option><option value="root">The root is black</option><option value="leaves">Leaves (the NIL null pointers) are black</option><option value="red">A red node cannot have red children (no two reds in a row)</option><option value="black">Every path from a node down to its NIL leaves passes through the same number of black nodes</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-rb','fb-match-rb',['color','root','leaves','red','black'])">Check</button>
      <div class="fb" id="fb-match-rb"></div>
      <p class="muted" style="margin-top:8px">The "same number of black nodes on every path" count is called the <b>black height</b>.</p>
    </div>
    <div class="card">
      <h3>Why it stays balanced</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What do the color rules guarantee about the tree's shape?</div>
        <button class="opt" data-i="0">Every node has exactly two children.</button>
        <button class="opt" data-i="1">The longest root-to-leaf path is at most <b>twice</b> the shortest, so the height is at most <code>2·log₂(n+1)</code> = O(log n).</button>
        <button class="opt" data-i="2">The tree is always perfectly balanced like an AVL tree.</button>
        <div class="fb">The "no two reds in a row" + "equal black height" rules force the longest path to be ≤ 2× the shortest → height O(log n). It's a <i>looser</i> balance than AVL (which is ~1.44·log n), which is the trade-off.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>If the insertion process ever leaves the root red, you can simply recolor the root black without breaking anything.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 4). Recoloring the root from red to black adds one black node to <i>every</i> root-to-leaf path equally, so the black-height property still holds.</div>
      </div>
    </div>
  </section>

  <!-- ===================== IDENTIFY ===================== -->
  <section class="topic" id="l14-identify">
    <h2>Lesson 14 · Identify Valid vs. Invalid</h2>
    <div class="concept">To check a tree, verify all five properties. The two that break most often: <b>Red</b> (a red node with a red child) and <b>Black</b> (paths with different black-node counts). ➡ See colored examples in the <b>Diagram It</b> tab.</div>
    <div class="card">
      <h3>Which property is violated?</h3>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>A tree has a <b>red</b> node whose left child is also <b>red</b>. Which property is violated?</div>
        <button class="opt" data-i="0">Red (a red node cannot have red children)</button>
        <button class="opt" data-i="1">Root</button>
        <button class="opt" data-i="2">Black</button>
        <div class="fb">The <b>Red</b> property: two reds in a row are never allowed. Fix during insertion via recoloring or rotation.</div>
      </div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>One root-to-leaf path passes through 3 black nodes; another passes through 2. Which property is violated?</div>
        <button class="opt" data-i="0">Color</button>
        <button class="opt" data-i="1">Red</button>
        <button class="opt" data-i="2">Black (every path must have the same black height)</button>
        <div class="fb">The <b>Black</b> property requires <i>equal black height</i> on every path. Unequal counts mean one side is deeper in black nodes → invalid.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>The root node is colored <b>red</b>. Which property is violated?</div>
        <button class="opt" data-i="0">Leaves</button>
        <button class="opt" data-i="1">Root (the root must be black)</button>
        <button class="opt" data-i="2">Red</button>
        <div class="fb">The <b>Root</b> property: the root is always black. (This one's the easiest fix — just recolor it.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== INSERTION ===================== -->
  <section class="topic" id="l14-insert">
    <h2>Lesson 14 · Insertion</h2>
    <div class="concept">Insert like a normal BST, color the new node <b>red</b> (root → black), then fix any red-red violation. The fix depends on the <b>pibling</b> (the parent's sibling — the new node's "aunt/uncle"): red pibling → <b>recolor</b>; black pibling → <b>rotate</b>.</div>
    <div class="card">
      <h3>Order the insertion steps</h3>
      <p class="muted">Use ▲ / ▼ to arrange, then check.</p>
      <div id="rb-order"></div>
      <button class="btn small" style="margin-top:8px" onclick="rbCheckOrder()">Check order</button>
      <div class="fb" id="fb-rb-order"></div>
    </div>
    <div class="card">
      <h3>Recolor or rotate?</h3>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>You insert a red node, its parent is red, and the <b>pibling is also red</b>. What do you do?</div>
        <button class="opt" data-i="0"><b>Recolor:</b> set parent and pibling to black, grandparent to red, then re-check from the grandparent (traverse up).</button>
        <button class="opt" data-i="1">Rotate immediately.</button>
        <button class="opt" data-i="2">Delete the new node.</button>
        <div class="fb">Red pibling → <b>recolor</b> (push the "blackness" down from the grandparent). Because the grandparent turned red, you must re-check upward — the violation may have moved up the tree.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Parent is red but the <b>pibling is black</b> (or NIL). What do you do?</div>
        <button class="opt" data-i="0">Recolor parent and pibling.</button>
        <button class="opt" data-i="1"><b>Rotate:</b> figure out the LL / RR / LR / RL path from grandparent to the new node, rotate accordingly, set the new subtree root black and its children red.</button>
        <button class="opt" data-i="2">Nothing — it's already valid.</button>
        <div class="fb">Black pibling → <b>rotate</b> (same LL/RR/LR/RL cases as AVL!), then recolor: new subtree root black, its two children red. After a rotation fix you're done — no need to keep traversing up.</div>
      </div>
    </div>
  </section>

  <!-- ===================== DELETION ===================== -->
  <section class="topic" id="l14-delete">
    <h2>Lesson 14 · Deletion (the double-black idea)</h2>
    <div class="concept">Delete like a normal BST. The tricky case is removing a <b>black leaf</b> — that removes a black node from one path, breaking the black-height rule. Mark the NIL that replaced it as a <b>"double black"</b> and resolve it back to a single black through recoloring/rotation cases.</div>
    <div class="card">
      <h3>Color arithmetic</h3>
      <div class="concept">Think of colors as levels of "blackness," weakest → strongest: <b>R &lt; B &lt; DB</b> (double black). Combining rules:<br>
      <code>R + DB = B</code> &nbsp; <code>R + B = B</code> &nbsp; <code>B + B = DB</code></div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why does deleting a <b>black leaf</b> create a problem, but deleting a red leaf doesn't?</div>
        <button class="opt" data-i="0">Red leaves can't be deleted.</button>
        <button class="opt" data-i="1">Removing a black node drops the black count on that path by one, breaking the equal-black-height rule; a red node isn't counted in black height, so removing it changes nothing.</button>
        <button class="opt" data-i="2">Black leaves are always the root.</button>
        <div class="fb">Black height only counts black nodes. Delete a red leaf → no black-count change → fine. Delete a black leaf → that path is now short one black → the "double black" placeholder tracks the deficit until you fix it.</div>
      </div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>When resolving a double black, the sibling is black with <b>two black children</b>. What happens?</div>
        <button class="opt" data-i="0">Rotate immediately.</button>
        <button class="opt" data-i="1">Delete the sibling.</button>
        <button class="opt" data-i="2">Recolor the sibling red and push the double-black up to the parent (if the parent was black, keep going up; if red, it absorbs the extra black and you stop).</button>
        <div class="fb">Sibling black + 2 black children → recolor sibling red, move the "extra black" up to the parent. This is the case that can <b>propagate up the tree</b>, like the recolor case in insertion. (Sibling red, or sibling with a red child, are handled by rotations instead.)</div>
      </div>
    </div>
    <div class="card">
      <h3>Animated walkthrough — delete(J, G, Z)</h3>
      <p class="muted">Step through each deletion on the sample tree. <b>J</b>: successor copy + red-sibling fix + RL rotation. <b>G</b>: recolor-push then RL rotation. <b>Z</b>: a pure recolor-propagation up to the root.</p>
      <div class="toolbar">
        <button class="btn small" onclick="rbDel('J')">delete J</button>
        <button class="btn small" onclick="rbDel('G')">delete G</button>
        <button class="btn small" onclick="rbDel('Z')">delete Z</button>
      </div>
      <div id="rbd-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center;min-height:230px;overflow-x:auto"></div>
      <div class="step-desc" id="rbd-desc"></div>
      <div class="toolbar" style="justify-content:space-between">
        <div><button class="btn ghost small" onclick="rbDelStep(-1)">◀ Prev</button>
        <button class="btn small" onclick="rbDelStep(1)">Next ▶</button>
        <button class="btn ghost small" onclick="rbDel(rbDelKey)">⟲ Restart</button></div>
        <span class="score-badge" id="rbd-step"></span>
      </div>
      <div class="muted" style="font-size:11px;margin-top:6px">
        <span style="display:inline-block;width:16px;height:11px;border-radius:3px;background:#2b3c50;border:2px solid #e05a5a;vertical-align:middle"></span> DB nil &nbsp;
        <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#c9d2de;border:2px double #e05a5a;vertical-align:middle"></span> DB node (double-black on a real node)
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l14-diagram">
    <h2>Lesson 14 · Diagram It — Colors &amp; Insertion Fixes</h2>
    <div class="concept"><span style="color:#e05a5a;font-weight:700">Red</span> and <span style="color:#cfd8e3;font-weight:700">black</span> nodes. See a valid tree, then the two insertion fixes: a <b>red pibling</b> triggers a recolor, a <b>black pibling</b> triggers a rotation.</div>
    <div class="card">
      <div class="toolbar">
        <button class="btn small" onclick="rbCase('valid')">Valid RB tree</button>
        <button class="btn small" onclick="rbCase('recolor')">Red pibling → recolor</button>
        <button class="btn small" onclick="rbCase('rotate')">Black pibling → rotate</button>
      </div>
      <div id="rb-single" style="display:none;background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center"></div>
      <div id="rb-pair" class="two" style="display:none">
        <div><div class="muted" style="font-size:12px;text-align:center;margin-bottom:4px" id="rb-beforelbl">Before</div>
          <div id="rb-before" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center"></div></div>
        <div><div class="muted" style="font-size:12px;text-align:center;margin-bottom:4px" id="rb-afterlbl">After</div>
          <div id="rb-after" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center"></div></div>
      </div>
      <div class="step-desc" id="rb-note"></div>
    </div>
    <div class="card">
      <h3>Animated rotation walkthrough</h3>
      <p class="muted">Pick a case, then step through the rotation(s) + recolor. All four end with the <b>middle value on top (black)</b> and its children red. (LL/RR are single rotations; LR/RL are doubles.)</p>
      <div class="toolbar">
        <button class="btn small" onclick="rbAnim('LL')">LL</button>
        <button class="btn small" onclick="rbAnim('RR')">RR</button>
        <button class="btn small" onclick="rbAnim('LR')">LR</button>
        <button class="btn small" onclick="rbAnim('RL')">RL</button>
      </div>
      <div id="rba-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center;min-height:180px"></div>
      <div class="step-desc" id="rba-desc"></div>
      <div class="toolbar" style="justify-content:space-between">
        <div><button class="btn ghost small" onclick="rbStep(-1)">◀ Prev</button>
        <button class="btn small" onclick="rbStep(1)">Next ▶</button>
        <button class="btn ghost small" onclick="rbAnim(rbCurCase)">⟲ Restart</button></div>
        <span class="score-badge" id="rba-step"></span>
      </div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l14-code">
    <h2>Lesson 14 · Code Writing</h2>
    <div class="concept">A red-black node is a BST node plus a color. A common convention: <b>null children count as black</b>, which makes the color checks clean.</div>

    <div class="card">
      <h3>1. The node + an isRed helper</h3>
      <p>Write an <code>enum Color</code>, a node with a <code>_color</code> field, and <code>isRed(node)</code> (null = black).</p>
      <textarea placeholder="enum Color { RED, BLACK }  /  class RBNode { ... }  /  boolean isRed(RBNode n) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">enum</span> Color { RED, BLACK }

<span class="kw">class</span> <span class="ty">RBNode</span> {
    <span class="ty">int</span> _value;
    Color _color;
    RBNode _left, _right;
}

<span class="kw">private boolean</span> <span class="fn">isRed</span>(RBNode n) {
    <span class="kw">return</span> n != <span class="kw">null</span> &amp;&amp; n._color == Color.RED;  <span class="cm">// null (NIL) is black</span>
}</pre>
        <div class="concept">Treating <code>null</code> as black matches the "Leaves are black" invariant and means you never have to null-check a color separately.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. The recolor step (red-pibling case)</h3>
      <p>Given a node whose parent and pibling are both red, write the recolor: parent &amp; pibling → black, grandparent → red.</p>
      <textarea placeholder="void recolor(RBNode parent, RBNode pibling, RBNode grandparent) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">private void</span> <span class="fn">recolor</span>(RBNode parent, RBNode pibling, RBNode grandparent) {
    parent._color      = Color.BLACK;
    pibling._color     = Color.BLACK;
    grandparent._color = Color.RED;
    <span class="cm">// grandparent is now red, so re-check the violation from grandparent upward</span>
}</pre>
        <div class="concept">This "pushes blackness down" from the grandparent to its two children. Because the grandparent became red, you loop again treating it as the newly-inserted node — the fix may cascade up to the root (which you then just recolor black).</div>
      </div>
    </div>

    <div class="card">
      <h3>3. Rotations (reused from AVL)</h3>
      <p>The black-pibling fix uses the same <code>rotateLeft</code> / <code>rotateRight</code> as AVL — the LL/RR/LR/RL cases are identical. Write <code>rotateRight</code>.</p>
      <textarea placeholder="RBNode rotateRight(RBNode z) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">private</span> RBNode <span class="fn">rotateRight</span>(RBNode z) {
    RBNode y = z._left;
    z._left  = y._right;   <span class="cm">// hand off y's right subtree</span>
    y._right = z;
    <span class="kw">return</span> y;              <span class="cm">// y is the new subtree root</span>
}</pre>
        <div class="concept">Structurally identical to the AVL rotation (Lesson 13) — the only new work in a red-black tree is the <b>recoloring</b> around it: after the rotation, set the new subtree root black and its children red.</div>
      </div>
    </div>
  </section>
</main>`;

/* ============================================================
   Self-contained ordering widget (insertion steps)
   ============================================================ */
const RB_ORDER=['Insert the new node like a normal BST','Color it red (or black if it is the root)','If the parent is red, check the pibling','Recolor (red pibling) or rotate (black pibling) to fix the violation'];
let rbOrderState=[RB_ORDER[2],RB_ORDER[0],RB_ORDER[3],RB_ORDER[1]];
function rbRenderOrder(){
  const box=document.getElementById('rb-order');
  box.innerHTML=rbOrderState.map((item,i)=>
    '<div class="order-item"><span><span class="num">'+(i+1)+'</span>'+item+'</span>'
    +'<span class="order-btns">'
    +'<button onclick="rbMoveOrder('+i+',-1)" '+(i===0?'disabled style=opacity:.3':'')+'>▲</button>'
    +'<button onclick="rbMoveOrder('+i+',1)" '+(i===rbOrderState.length-1?'disabled style=opacity:.3':'')+'>▼</button>'
    +'</span></div>').join('');
}
function rbMoveOrder(i,d){
  const j=i+d; if(j<0||j>=rbOrderState.length)return;
  const t=rbOrderState[i]; rbOrderState[i]=rbOrderState[j]; rbOrderState[j]=t;
  rbRenderOrder();
}
function rbCheckOrder(){
  const items=document.querySelectorAll('#rb-order .order-item');
  let all=true;
  rbOrderState.forEach((item,i)=>{ const ok=item===RB_ORDER[i]; items[i].classList.remove('correct','wrong'); items[i].classList.add(ok?'correct':'wrong'); if(!ok)all=false; });
  const fb=document.getElementById('fb-rb-order');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all
    ? '✓ Correct: insert like a BST → color it red (root=black) → if parent is red, check the pibling → recolor or rotate.'
    : '✗ Not yet. First insert (BST), then color, then check the parent/pibling, then fix. Green rows are in the right spot.';
}

/* ============================================================
   Colored-tree case viewer (SVG)
   ============================================================ */
/* node = {v, x, y, c}  c='R' or 'B'   edge=[i,j] */
function rbColors(c){ return c==='R' ? {fill:'rgba(224,90,90,.30)',stroke:'#e05a5a',text:'#ffdede'}
                                      : {fill:'rgba(60,72,90,.55)',stroke:'#cfd8e3',text:'#e8eef5'}; }
function rbTreeSVG(tree){
  let e='', n='';
  tree.edges.forEach(([a,b])=>{ const A=tree.nodes[a], B=tree.nodes[b];
    e+='<line x1="'+A.x+'" y1="'+A.y+'" x2="'+B.x+'" y2="'+B.y+'" stroke="#2b3c50" stroke-width="1.5"/>'; });
  tree.nodes.forEach(nd=>{ const col=rbColors(nd.c);
    n+='<circle cx="'+nd.x+'" cy="'+nd.y+'" r="17" fill="'+col.fill+'" stroke="'+col.stroke+'" stroke-width="2.5"/>';
    n+='<text x="'+nd.x+'" y="'+(nd.y+5)+'" text-anchor="middle" fill="'+col.text+'" font-size="13" font-weight="700">'+nd.v+'</text>'; });
  return '<svg viewBox="0 0 300 210" style="width:100%;max-width:320px">'+e+n+'</svg>';
}
const RB_SCENES={
  valid:{ single:{nodes:[
      {v:13,x:150,y:30,c:'B'},{v:8,x:80,y:95,c:'R'},{v:17,x:220,y:95,c:'R'},
      {v:1,x:45,y:160,c:'B'},{v:11,x:115,y:160,c:'B'},{v:15,x:185,y:160,c:'B'},{v:25,x:255,y:160,c:'B'}],
      edges:[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]},
    note:'A <b>valid</b> red-black tree. Root 13 is black; every red node (8, 17) has only black children; and every path from the root to a NIL leaf passes through the same number of black nodes (black height = 2). All five properties hold.'},
  recolor:{
    before:{nodes:[{v:'G',x:150,y:35,c:'B'},{v:'P',x:85,y:105,c:'R'},{v:'U',x:225,y:105,c:'R'},{v:'x',x:45,y:170,c:'R'}],edges:[[0,1],[0,2],[1,3]]},
    after:{nodes:[{v:'G',x:150,y:35,c:'R'},{v:'P',x:85,y:105,c:'B'},{v:'U',x:225,y:105,c:'B'},{v:'x',x:45,y:170,c:'R'}],edges:[[0,1],[0,2],[1,3]]},
    note:'New node <b>x</b> is red and its parent <b>P</b> is red → red-red violation. The pibling <b>U</b> is also <b>red</b>, so we <b>recolor</b>: P and U → black, grandparent G → red. Now re-check from G upward (the violation may have moved up). If G ends up as the root, just recolor it black.'},
  rotate:{
    before:{nodes:[{v:'G',x:200,y:35,c:'B'},{v:'P',x:120,y:105,c:'R'},{v:'x',x:60,y:170,c:'R'}],edges:[[0,1],[1,2]]},
    after:{nodes:[{v:'P',x:150,y:45,c:'B'},{v:'x',x:85,y:120,c:'R'},{v:'G',x:215,y:120,c:'R'}],edges:[[0,1],[0,2]]},
    note:'New node <b>x</b> is red under red parent <b>P</b>, and the pibling is <b>black</b> (NIL). The path G→P→x is <b>LL</b>, so <b>rotate right</b> on G. Then recolor: the new subtree root <b>P</b> → black, its children <b>x</b> and <b>G</b> → red. Done — no need to traverse up after a rotation fix.'}
};
function rbShowSingle(on){ document.getElementById('rb-single').style.display=on?'block':'none'; document.getElementById('rb-pair').style.display=on?'none':'grid'; }
function rbCase(key){
  const s=RB_SCENES[key];
  if(s.single){ rbShowSingle(true); document.getElementById('rb-single').innerHTML=rbTreeSVG(s.single); }
  else { rbShowSingle(false);
    document.getElementById('rb-before').innerHTML=rbTreeSVG(s.before);
    document.getElementById('rb-after').innerHTML=rbTreeSVG(s.after); }
  document.getElementById('rb-note').innerHTML=s.note;
}

/* ============================================================
   Animated rotation walkthrough (LL / RR / LR / RL)
   Small trees on values 10/20/30; each ends 20(B) over 10(R),30(R).
   ============================================================ */
const RB_ANIM={
  LL:[
    {hi:['30','20','10'],edges:[['30','20'],['20','10']],colors:{'30':'B','20':'R','10':'R'},pos:{'30':[200,40],'20':[130,110],'10':[70,180]},
      desc:'<b>LL:</b> z=30 (black) is left-heavy and its child y=20 (red) also leans left → path z→y→x = Left, Left. Fix = a single <b>RIGHT rotation on z (30)</b>.'},
    {hi:['20','30'],edges:[['20','10'],['20','30']],colors:{'30':'B','20':'R','10':'R'},pos:{'20':[135,50],'10':[80,120],'30':[190,120]},
      desc:'<b>Right rotation on 30:</b> its left child 20 rises to the top; 30 drops to become the right child of 20. Colors are unchanged for now (20 and 10 are still both red).'},
    {hi:['20'],edges:[['20','10'],['20','30']],colors:{'30':'R','20':'B','10':'R'},pos:{'20':[135,50],'10':[80,120],'30':[190,120]},
      desc:'<b>Recolor:</b> new subtree root 20 → black; its children 10 and 30 → red. No two reds adjacent, equal black height. ✅'}
  ],
  RR:[
    {hi:['10','20','30'],edges:[['10','20'],['20','30']],colors:{'10':'B','20':'R','30':'R'},pos:{'10':[100,40],'20':[170,110],'30':[230,180]},
      desc:'<b>RR:</b> z=10 (black) is right-heavy and its child y=20 (red) also leans right → Right, Right. Fix = a single <b>LEFT rotation on z (10)</b>.'},
    {hi:['20','10'],edges:[['20','10'],['20','30']],colors:{'10':'B','20':'R','30':'R'},pos:{'20':[135,50],'10':[80,120],'30':[190,120]},
      desc:'<b>Left rotation on 10:</b> its right child 20 rises to the top; 10 drops to become the left child of 20.'},
    {hi:['20'],edges:[['20','10'],['20','30']],colors:{'10':'R','20':'B','30':'R'},pos:{'20':[135,50],'10':[80,120],'30':[190,120]},
      desc:'<b>Recolor:</b> root 20 → black; children 10 and 30 → red. ✅'}
  ],
  LR:[
    {hi:['30','10','20'],edges:[['30','10'],['10','20']],colors:{'30':'B','10':'R','20':'R'},pos:{'30':[200,40],'10':[110,110],'20':[160,180]},
      desc:'<b>LR:</b> z=30, y=10 (left of z), x=20 (right of y) → Left, Right. Double rotation: <b>LEFT on the parent (10)</b>, then <b>RIGHT on the grandparent (30)</b>.'},
    {hi:['10','20'],edges:[['30','20'],['20','10']],colors:{'30':'B','20':'R','10':'R'},pos:{'30':[200,40],'20':[120,110],'10':[70,180]},
      desc:'<b>Step 1 — left-rotate the parent (10):</b> 20 rises above 10. Now it is a straight <b>LL</b> shape (30 ← 20 ← 10).'},
    {hi:['30','20'],edges:[['20','10'],['20','30']],colors:{'30':'B','20':'R','10':'R'},pos:{'20':[135,50],'10':[80,120],'30':[190,120]},
      desc:'<b>Step 2 — right-rotate the grandparent (30):</b> 20 rises to the top; 30 drops to its right.'},
    {hi:['20'],edges:[['20','10'],['20','30']],colors:{'30':'R','20':'B','10':'R'},pos:{'20':[135,50],'10':[80,120],'30':[190,120]},
      desc:'<b>Step 3 — recolor:</b> root 20 → black; children → red. ✅'}
  ],
  RL:[
    {hi:['10','30','20'],edges:[['10','30'],['30','20']],colors:{'10':'B','30':'R','20':'R'},pos:{'10':[100,40],'30':[190,110],'20':[140,180]},
      desc:'<b>RL:</b> z=10, y=30 (right of z), x=20 (left of y) → Right, Left. Double rotation: <b>RIGHT on the parent (30)</b>, then <b>LEFT on the grandparent (10)</b>.'},
    {hi:['30','20'],edges:[['10','20'],['20','30']],colors:{'10':'B','20':'R','30':'R'},pos:{'10':[100,40],'20':[180,110],'30':[230,180]},
      desc:'<b>Step 1 — right-rotate the parent (30):</b> 20 rises above 30. Now it is a straight <b>RR</b> shape (10 → 20 → 30).'},
    {hi:['10','20'],edges:[['20','10'],['20','30']],colors:{'10':'B','20':'R','30':'R'},pos:{'20':[135,50],'10':[80,120],'30':[190,120]},
      desc:'<b>Step 2 — left-rotate the grandparent (10):</b> 20 rises to the top; 10 drops to its left.'},
    {hi:['20'],edges:[['20','10'],['20','30']],colors:{'10':'R','20':'B','30':'R'},pos:{'20':[135,50],'10':[80,120],'30':[190,120]},
      desc:'<b>Step 3 — recolor:</b> root 20 → black; children → red. ✅'}
  ]
};
let rbCurCase='RL', rbIdx=0, rbCur=null, rbRaf=null;
function rbNodeCol(c){ return c==='R' ? {f:'#f2b8b8',s:'#e05a5a',t:'#7a1f1f'} : {f:'#c9d2de',s:'#3a4658',t:'#1b2430'}; }
function rbAnimDraw(pos, st){
  let e='', n='';
  st.edges.forEach(pr=>{ const A=pos[pr[0]], B=pos[pr[1]]; e+='<line x1="'+A[0]+'" y1="'+A[1]+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="#44566e" stroke-width="2.5"/>'; });
  Object.keys(st.colors).forEach(id=>{ const p=pos[id], c=rbNodeCol(st.colors[id]), hl=st.hi.indexOf(id)!==-1;
    n+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="20" fill="'+c.f+'" stroke="'+(hl?'#2e86de':c.s)+'" stroke-width="'+(hl?4.5:2.5)+'"/>';
    n+='<text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" font-size="15" font-weight="700" fill="'+c.t+'">'+id+'</text>'; });
  document.getElementById('rba-canvas').innerHTML='<svg viewBox="0 0 300 230" style="width:100%;max-width:320px">'+e+n+'</svg>';
}
function rbAnimGo(t){
  const seq=RB_ANIM[rbCurCase]; t=Math.max(0,Math.min(seq.length-1,t));
  const from=JSON.parse(JSON.stringify(rbCur)), to=seq[t].pos, t0=performance.now(), dur=700;
  if(rbRaf) cancelAnimationFrame(rbRaf);
  function frame(now){
    let k=Math.min(1,(now-t0)/dur); k = k<0.5 ? 2*k*k : 1-Math.pow(-2*k+2,2)/2;
    const p={}; Object.keys(to).forEach(id=>{ const f=from[id]||to[id]; p[id]=[f[0]+(to[id][0]-f[0])*k, f[1]+(to[id][1]-f[1])*k]; });
    rbAnimDraw(p,seq[t]); rbCur=p;
    if(k<1) rbRaf=requestAnimationFrame(frame); else rbCur=JSON.parse(JSON.stringify(to));
  }
  rbRaf=requestAnimationFrame(frame);
  document.getElementById('rba-desc').innerHTML=seq[t].desc;
  document.getElementById('rba-step').textContent='Step '+(t+1)+' / '+seq.length;
  rbIdx=t;
}
function rbAnim(key){ rbCurCase=key; rbCur=JSON.parse(JSON.stringify(RB_ANIM[key][0].pos)); rbIdx=0;
  rbAnimDraw(RB_ANIM[key][0].pos,RB_ANIM[key][0]);
  document.getElementById('rba-desc').innerHTML=RB_ANIM[key][0].desc;
  document.getElementById('rba-step').textContent='Step 1 / '+RB_ANIM[key].length; }
function rbStep(d){ rbAnimGo(rbIdx+d); }

rbRenderOrder();
rbCase('valid');
/* ============================================================
   Animated deletion walkthrough — delete(J, G, Z)
   ============================================================ */
function rbdN(id,l,c,x,y,o){o=o||{};return {id:id,l:l,c:c,x:x,y:y,hi:!!o.hi,nil:!!o.nil,db:!!o.db};}
const RBDEL={
  J:[
    {desc:`<b>Delete J.</b> J has two children (G, Q) → replace with its in-order successor = smallest value in the right subtree = <b>M</b> (leftmost from Q).`,
     edges:[['r','G'],['r','Q'],['G','B'],['G','H'],['Q','Mo'],['Q','X'],['X','V'],['X','Z'],['V','S']],
     nodes:[rbdN('r','J','B',280,40,{hi:1}),rbdN('G','G','B',160,110),rbdN('Q','Q','B',400,110),rbdN('B','B','B',100,180),rbdN('H','H','B',220,180),rbdN('Mo','M','B',340,180),rbdN('X','X','R',460,180),rbdN('V','V','B',420,250),rbdN('Z','Z','B',510,250),rbdN('S','S','R',390,320)]},
    {desc:`Copy successor <b>M</b> into the root; now delete the <b>original M</b> leaf (black).`,
     edges:[['r','G'],['r','Q'],['G','B'],['G','H'],['Q','Mo'],['Q','X'],['X','V'],['X','Z'],['V','S']],
     nodes:[rbdN('r','M','B',280,40,{hi:1}),rbdN('G','G','B',160,110),rbdN('Q','Q','B',400,110),rbdN('B','B','B',100,180),rbdN('H','H','B',220,180),rbdN('Mo','M','B',340,180,{hi:1}),rbdN('X','X','R',460,180),rbdN('V','V','B',420,250),rbdN('Z','Z','B',510,250),rbdN('S','S','R',390,320)]},
    {desc:`Black leaf removed → <b>double-black</b>. Sibling <b>X is RED</b> → the red-sibling case.`,
     edges:[['r','G'],['r','Q'],['G','B'],['G','H'],['Q','DB'],['Q','X'],['X','V'],['X','Z'],['V','S']],
     nodes:[rbdN('r','M','B',280,40),rbdN('G','G','B',160,110),rbdN('Q','Q','B',400,110),rbdN('B','B','B',100,180),rbdN('H','H','B',220,180),rbdN('DB','DB','B',340,180,{nil:1,hi:1}),rbdN('X','X','R',460,180,{hi:1}),rbdN('V','V','B',420,250),rbdN('Z','Z','B',510,250),rbdN('S','S','R',390,320)]},
    {desc:`Swap colors (X → black, Q → red) and <b>left-rotate Q</b>. X rises. The DB's new sibling is <b>V (black) with a red child S</b> → path M→X→S is <b>RL</b>.`,
     edges:[['r','G'],['r','X'],['G','B'],['G','H'],['X','Q'],['X','Z'],['Q','DB'],['Q','V'],['V','S']],
     nodes:[rbdN('r','M','B',280,40),rbdN('G','G','B',160,110),rbdN('X','X','B',400,110),rbdN('B','B','B',100,180),rbdN('H','H','B',220,180),rbdN('Q','Q','R',340,180,{hi:1}),rbdN('Z','Z','B',460,180),rbdN('DB','DB','B',300,250,{nil:1,hi:1}),rbdN('V','V','B',390,250,{hi:1}),rbdN('S','S','R',360,320)]},
    {desc:`<b>RL double rotation</b> (right-rotate V, then left-rotate Q). S rises to the top of this subtree.`,
     edges:[['r','G'],['r','X'],['G','B'],['G','H'],['X','S'],['X','Z'],['S','Q'],['S','V'],['Q','DB']],
     nodes:[rbdN('r','M','B',280,40),rbdN('G','G','B',160,110),rbdN('X','X','B',400,110),rbdN('B','B','B',100,180),rbdN('H','H','B',220,180),rbdN('S','S','R',340,180,{hi:1}),rbdN('Z','Z','B',460,180),rbdN('Q','Q','R',300,250),rbdN('V','V','B',390,250),rbdN('DB','DB','B',270,320,{nil:1,hi:1})]},
    {desc:`<b>Recolor:</b> S takes the old parent's color (red); its children Q and V → black; the double-black resolves. ✅ delete(J) done.`,
     edges:[['r','G'],['r','X'],['G','B'],['G','H'],['X','S'],['X','Z'],['S','Q'],['S','V']],
     nodes:[rbdN('r','M','B',280,40),rbdN('G','G','B',160,110),rbdN('X','X','B',400,110),rbdN('B','B','B',100,180),rbdN('H','H','B',220,180),rbdN('S','S','R',340,180,{hi:1}),rbdN('Z','Z','B',460,180),rbdN('Q','Q','B',300,250,{hi:1}),rbdN('V','V','B',390,250,{hi:1})]}
  ],
  G:[
    {desc:`<b>Delete G</b> (tree after delete J). Two children (B, H) → successor = <b>H</b>.`,
     edges:[['r','g'],['r','X'],['g','B'],['g','Ho'],['X','S'],['X','Z'],['S','Q'],['S','V']],
     nodes:[rbdN('r','M','B',280,40),rbdN('g','G','B',160,110,{hi:1}),rbdN('X','X','B',400,110),rbdN('B','B','B',100,180),rbdN('Ho','H','B',220,180),rbdN('S','S','R',340,180),rbdN('Z','Z','B',460,180),rbdN('Q','Q','B',300,250),rbdN('V','V','B',390,250)]},
    {desc:`Copy successor <b>H</b> in; delete the original H leaf (black).`,
     edges:[['r','g'],['r','X'],['g','B'],['g','Ho'],['X','S'],['X','Z'],['S','Q'],['S','V']],
     nodes:[rbdN('r','M','B',280,40),rbdN('g','H','B',160,110,{hi:1}),rbdN('X','X','B',400,110),rbdN('B','B','B',100,180),rbdN('Ho','H','B',220,180,{hi:1}),rbdN('S','S','R',340,180),rbdN('Z','Z','B',460,180),rbdN('Q','Q','B',300,250),rbdN('V','V','B',390,250)]},
    {desc:`Black leaf removed → DB. Sibling <b>B is black with two black children</b> → recolor case.`,
     edges:[['r','g'],['r','X'],['g','B'],['g','DB'],['X','S'],['X','Z'],['S','Q'],['S','V']],
     nodes:[rbdN('r','M','B',280,40),rbdN('g','H','B',160,110),rbdN('X','X','B',400,110),rbdN('B','B','B',100,180,{hi:1}),rbdN('DB','DB','B',220,180,{nil:1,hi:1}),rbdN('S','S','R',340,180),rbdN('Z','Z','B',460,180),rbdN('Q','Q','B',300,250),rbdN('V','V','B',390,250)]},
    {desc:`<b>B → red</b>; the double-black moves UP to the H-node. Sibling <b>X (black) has red child S</b> → M→X→S is <b>RL</b>.`,
     edges:[['r','g'],['r','X'],['g','B'],['X','S'],['X','Z'],['S','Q'],['S','V']],
     nodes:[rbdN('r','M','B',280,40),rbdN('g','H','B',160,110,{db:1,hi:1}),rbdN('X','X','B',400,110),rbdN('B','B','R',100,180),rbdN('S','S','R',340,180),rbdN('Z','Z','B',460,180),rbdN('Q','Q','B',300,250),rbdN('V','V','B',390,250)]},
    {desc:`<b>RL rotation</b> (right-rotate X, then left-rotate M). Since M was the root, <b>S becomes the new root</b>.`,
     edges:[['S','M'],['S','X'],['M','g'],['M','Q'],['X','V'],['X','Z'],['g','B']],
     nodes:[rbdN('S','S','R',280,40,{hi:1}),rbdN('M','M','B',160,110),rbdN('X','X','B',400,110),rbdN('g','H','B',90,180,{db:1}),rbdN('Q','Q','B',230,180),rbdN('V','V','B',350,180),rbdN('Z','Z','B',470,180),rbdN('B','B','R',50,250)]},
    {desc:`<b>Recolor:</b> S → black; its children M and X → black; DB resolves. ✅ delete(G) done.`,
     edges:[['S','M'],['S','X'],['M','g'],['M','Q'],['X','V'],['X','Z'],['g','B']],
     nodes:[rbdN('S','S','B',280,40,{hi:1}),rbdN('M','M','B',160,110,{hi:1}),rbdN('X','X','B',400,110,{hi:1}),rbdN('g','H','B',90,180),rbdN('Q','Q','B',230,180),rbdN('V','V','B',350,180),rbdN('Z','Z','B',470,180),rbdN('B','B','R',50,250)]}
  ],
  Z:[
    {desc:`<b>Delete Z</b> (tree after delete G). Z is a black leaf → double-black.`,
     edges:[['S','M'],['S','X'],['M','H'],['M','Q'],['X','V'],['X','Z'],['H','B']],
     nodes:[rbdN('S','S','B',280,40),rbdN('M','M','B',170,110),rbdN('X','X','B',400,110),rbdN('H','H','B',110,180),rbdN('Q','Q','B',230,180),rbdN('V','V','B',350,180),rbdN('Z','Z','B',470,180,{hi:1}),rbdN('B','B','R',60,250)]},
    {desc:`DB at Z's spot. Sibling <b>V is black with two black children</b> → recolor: V → red, push DB up.`,
     edges:[['S','M'],['S','X'],['M','H'],['M','Q'],['X','V'],['X','DB'],['H','B']],
     nodes:[rbdN('S','S','B',280,40),rbdN('M','M','B',170,110),rbdN('X','X','B',400,110),rbdN('H','H','B',110,180),rbdN('Q','Q','B',230,180),rbdN('V','V','B',350,180,{hi:1}),rbdN('DB','DB','B',470,180,{nil:1,hi:1}),rbdN('B','B','R',60,250)]},
    {desc:`<b>V → red</b>; DB moves up to X. X's sibling <b>M is black with two black children</b> → recolor again.`,
     edges:[['S','M'],['S','X'],['M','H'],['M','Q'],['X','V'],['H','B']],
     nodes:[rbdN('S','S','B',280,40),rbdN('M','M','B',170,110,{hi:1}),rbdN('X','X','B',400,110,{db:1,hi:1}),rbdN('H','H','B',110,180),rbdN('Q','Q','B',230,180),rbdN('V','V','R',350,180),rbdN('B','B','R',60,250)]},
    {desc:`<b>X → black, M → red</b>; the double-black moves up to the root S.`,
     edges:[['S','M'],['S','X'],['M','H'],['M','Q'],['X','V'],['H','B']],
     nodes:[rbdN('S','S','B',280,40,{db:1,hi:1}),rbdN('M','M','R',170,110),rbdN('X','X','B',400,110),rbdN('H','H','B',110,180),rbdN('Q','Q','B',230,180),rbdN('V','V','R',350,180),rbdN('B','B','R',60,250)]},
    {desc:`DB reached the <b>root</b> → keep it black and stop. ✅ delete(Z) done — full delete(J, G, Z) complete!`,
     edges:[['S','M'],['S','X'],['M','H'],['M','Q'],['X','V'],['H','B']],
     nodes:[rbdN('S','S','B',280,40,{hi:1}),rbdN('M','M','R',170,110),rbdN('X','X','B',400,110),rbdN('H','H','B',110,180),rbdN('Q','Q','B',230,180),rbdN('V','V','R',350,180),rbdN('B','B','R',60,250)]}
  ]
};
let rbDelKey='J', rbDelIdx=0, rbdCur={}, rbdRaf=null;
function rbdPosOf(st){ const m={}; st.nodes.forEach(n=>m[n.id]=[n.x,n.y]); return m; }
function rbdDraw(st,pmap){
  let e='',n='';
  st.edges.forEach(pr=>{ const A=pmap[pr[0]],B=pmap[pr[1]]; if(A&&B) e+='<line x1="'+A[0]+'" y1="'+A[1]+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="#44566e" stroke-width="2.5"/>'; });
  st.nodes.forEach(nd=>{ const p=pmap[nd.id]||[nd.x,nd.y];
    if(nd.nil){ e+='<rect x="'+(p[0]-17)+'" y="'+(p[1]-14)+'" width="34" height="28" rx="5" fill="#2b3c50" stroke="'+(nd.hi?'#2e86de':'#e05a5a')+'" stroke-width="'+(nd.hi?4:3)+'"/><text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" font-size="12" font-weight="700" fill="#f2b8b8">DB</text>'; return; }
    const c=rbNodeCol(nd.c);
    if(nd.db) e+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="24" fill="none" stroke="#e05a5a" stroke-width="2"/>';
    n+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="20" fill="'+c.f+'" stroke="'+(nd.hi?'#2e86de':(nd.db?'#e05a5a':c.s))+'" stroke-width="'+((nd.hi||nd.db)?4:2.5)+'"/>';
    n+='<text x="'+p[0]+'" y="'+(p[1]+6)+'" text-anchor="middle" font-size="15" font-weight="700" fill="'+c.t+'">'+nd.l+'</text>';
  });
  document.getElementById('rbd-canvas').innerHTML='<svg viewBox="0 0 580 380" style="width:100%;min-width:480px">'+e+n+'</svg>';
}
function rbdGo(t){
  const seq=RBDEL[rbDelKey]; t=Math.max(0,Math.min(seq.length-1,t));
  const to=rbdPosOf(seq[t]), from=rbdCur, t0=performance.now(), dur=750;
  if(rbdRaf) cancelAnimationFrame(rbdRaf);
  (function frame(now){ let k=Math.min(1,(now-t0)/dur); k=k<0.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
    const p={}; Object.keys(to).forEach(id=>{ const f=from[id]||to[id]; p[id]=[f[0]+(to[id][0]-f[0])*k,f[1]+(to[id][1]-f[1])*k]; });
    rbdDraw(seq[t],p); rbdCur=p; if(k<1) rbdRaf=requestAnimationFrame(frame); else rbdCur=to; })(performance.now());
  document.getElementById('rbd-desc').innerHTML=seq[t].desc;
  document.getElementById('rbd-step').textContent='delete '+rbDelKey+' — Step '+(t+1)+' / '+seq.length;
  rbDelIdx=t;
}
function rbDel(key){ rbDelKey=key; rbDelIdx=0; rbdCur=rbdPosOf(RBDEL[key][0]); rbdDraw(RBDEL[key][0],rbdCur);
  document.getElementById('rbd-desc').innerHTML=RBDEL[key][0].desc;
  document.getElementById('rbd-step').textContent='delete '+key+' — Step 1 / '+RBDEL[key].length; }
function rbDelStep(d){ rbdGo(rbDelIdx+d); }

rbAnim('RL');
rbDel('J');
