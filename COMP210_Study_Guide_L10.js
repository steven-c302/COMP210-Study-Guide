/* ============================================================
   LESSON 10 — Linked Lists, Stacks & Queues.
   Injects into #l10. Loaded before the main engine.
   Includes interactive Stack (LIFO) and Queue (FIFO) visualizers.
   ============================================================ */
document.getElementById('l10').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l10-adts')">ADTs vs Implementations</button>
  <button onclick="showTopic(this,'l10-stack')">Stack</button>
  <button onclick="showTopic(this,'l10-queue')">Queue</button>
  <button onclick="showTopic(this,'l10-impl')">Implementation &amp; Complexity</button>
  <button onclick="showTopic(this,'l10-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l10-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== ADTs vs IMPLEMENTATIONS ===================== -->
  <section class="topic active" id="l10-adts">
    <h2>Lesson 10 · ADTs vs. Implementations</h2>
    <div class="concept">An <b>Abstract Data Type (ADT)</b> is a <i>theoretical model</i> — it defines what operations exist and what they do, but <b>not how</b> they're built. <b>List</b>, <b>Stack</b>, and <b>Queue</b> are ADTs. An <b>implementation</b> is the concrete data structure that realizes an ADT — <b>Array</b>, <b>ArrayList</b>, and <b>LinkedList</b>. The same ADT can be built on different implementations, with different time complexities.</div>
    <div class="card">
      <h3>Categorize — ADT or Implementation? (your quiz)</h3>
      <table class="match" id="match-adt">
        <tr><td class="match-term">Stack</td><td><select class="match-def"><option value="">— choose —</option><option value="adt">ADT (defines operations, not how)</option><option value="impl">Implementation (a concrete structure)</option></select></td></tr>
        <tr><td class="match-term">List</td><td><select class="match-def"><option value="">— choose —</option><option value="adt">ADT (defines operations, not how)</option><option value="impl">Implementation (a concrete structure)</option></select></td></tr>
        <tr><td class="match-term">Queue</td><td><select class="match-def"><option value="">— choose —</option><option value="adt">ADT (defines operations, not how)</option><option value="impl">Implementation (a concrete structure)</option></select></td></tr>
        <tr><td class="match-term">LinkedList</td><td><select class="match-def"><option value="">— choose —</option><option value="adt">ADT (defines operations, not how)</option><option value="impl">Implementation (a concrete structure)</option></select></td></tr>
        <tr><td class="match-term">ArrayList</td><td><select class="match-def"><option value="">— choose —</option><option value="adt">ADT (defines operations, not how)</option><option value="impl">Implementation (a concrete structure)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-adt','fb-match-adt',['adt','adt','adt','impl','impl'])">Check</button>
      <div class="fb" id="fb-match-adt"></div>
      <p class="muted" style="margin-top:8px">ADTs = <b>Stack, List, Queue</b>. Implementations = <b>Array, ArrayList, LinkedList</b>. (An interface is how we <i>specify</i> an ADT in Java — the L6 idea.)</p>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What does an ADT specify?</div>
        <button class="opt" data-i="0">The exact memory layout and code.</button>
        <button class="opt" data-i="1">The operations and what they do — but not their implementation.</button>
        <button class="opt" data-i="2">Only the time complexity.</button>
        <div class="fb">An ADT is the <b>contract</b> (operations + behavior). How it's stored and how fast each operation runs depends on the <b>implementation</b> you choose.</div>
      </div>
    </div>
  </section>

  <!-- ===================== STACK ===================== -->
  <section class="topic" id="l10-stack">
    <h2>Lesson 10 · Stack — Last In, First Out (LIFO)</h2>
    <div class="concept">A <b>Stack&lt;T&gt;</b> is a <b>LIFO</b> list: the last thing you add is the first thing you remove — like a stack of plates. Two operations: <b>push</b> (add to the top) and <b>pop</b> (remove from the top).</div>
    <div class="card">
      <h3>Fill in — Stack operations (your quiz)</h3>
      <p>The operations that a Stack can perform are
        <input type="text" class="fillblank sm" data-answer="push" placeholder="?"> and
        <input type="text" class="fillblank sm" data-answer="pop" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>push</b> (add on top) and <b>pop</b> (remove from top). Both happen at the <b>same end</b> — the top.</div>
    </div>
    <div class="card">
      <h3>LIFO in action</h3>
<pre>push(4); push(2); push(0);   <span class="cm">// top is now 0</span>
pop() -> 0
pop() -> 2
pop() -> 4</pre>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>After <code>push(4); push(2); push(0);</code> which value does the <b>first</b> <code>pop()</code> return?</div>
        <button class="opt" data-i="0">4 (the first one pushed)</button>
        <button class="opt" data-i="1">2</button>
        <button class="opt" data-i="2">0 (the last one pushed)</button>
        <div class="fb"><b>0</b> — the <b>last</b> pushed is the <b>first</b> popped (LIFO). The most recent addition sits on top and comes off first. ➡ Try it in Diagram It.</div>
      </div>
    </div>
  </section>

  <!-- ===================== QUEUE ===================== -->
  <section class="topic" id="l10-queue">
    <h2>Lesson 10 · Queue — First In, First Out (FIFO)</h2>
    <div class="concept">A <b>Queue&lt;T&gt;</b> is a <b>FIFO</b> list: the first thing you add is the first thing you remove — like a line at a checkout. Two operations: <b>enqueue</b> (add to the back) and <b>dequeue</b> (remove from the front).</div>
    <div class="card">
      <h3>Fill in — Queue operations (your quiz)</h3>
      <p>The operations that a Queue can perform are
        <input type="text" class="fillblank sm" data-answer="enqueue" placeholder="?"> and
        <input type="text" class="fillblank sm" data-answer="dequeue" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>enqueue</b> (add at the back) and <b>dequeue</b> (remove from the front). Adds and removes happen at <b>opposite ends</b> — that's what makes it FIFO.</div>
    </div>
    <div class="card">
      <h3>FIFO in action</h3>
<pre>enqueue(4); enqueue(2); enqueue(0);
dequeue() -> 4
dequeue() -> 2
dequeue() -> 0</pre>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>After <code>enqueue(4); enqueue(2); enqueue(0);</code> which value does the <b>first</b> <code>dequeue()</code> return?</div>
        <button class="opt" data-i="0">4 (the first one enqueued)</button>
        <button class="opt" data-i="1">0 (the last one enqueued)</button>
        <button class="opt" data-i="2">2</button>
        <div class="fb"><b>4</b> — first in, first out. Contrast with a Stack: same three adds, but a Stack pops 0 first while a Queue dequeues 4 first. ➡ Compare them side-by-side in Diagram It.</div>
      </div>
    </div>
  </section>

  <!-- ===================== IMPLEMENTATION & COMPLEXITY ===================== -->
  <section class="topic" id="l10-impl">
    <h2>Lesson 10 · Implementing with LinkedList vs ArrayList</h2>
    <div class="concept">You can build a Stack or Queue on <b>either</b> an ArrayList or a LinkedList. The choice affects the <b>worst-case</b> time complexity. A LinkedList adds/removes at the <b>head</b> in <b>O(1)</b> (just re-point <code>_head</code>), and at the <b>tail</b> in O(1) too <i>if the tail is tracked</i>.</div>
    <div class="card">
      <h3>LinkedList memory — True or False</h3>
      <div class="q" data-tf="F">
        <div class="prompt"><span class="tag">T / F</span>LinkedList nodes are stored sequentially in memory. (your quiz)</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">False — nodes are allocated <b>piecemeal</b> anywhere on the heap (non-contiguous) and chained by <code>_next</code> references. Arrays are the ones stored contiguously; that's why arrays get O(1) indexing and linked lists don't.</div>
      </div>
      <div class="q">
        <div class="prompt"><span class="tag">Fill in</span>The time complexity for adding and removing from the <b>head</b> of a LinkedList is
          <input type="text" class="fillblank sm" data-answer="o(1)" placeholder="O(?)"><button class="btn small" onclick="checkFill(this)">Check</button></div>
        <div class="fb">Answer: <b>O(1)</b>. To add at the head you make a new node pointing to the old head and move <code>_head</code>; to remove, you move <code>_head</code> to <code>_head.next</code>. No shifting, no walking — constant time. (This is exactly what a Stack needs.)</div>
      </div>
    </div>
    <div class="card">
      <h3>The one you got wrong — worst-case comparison</h3>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>For both Stacks and Queues, the LinkedList implementation has a <b>better (worst case)</b> time complexity than ArrayList. (your quiz — answer is True)</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>True.</b> LinkedList stack/queue operations are O(1) <b>worst case</b> (re-point head/tail). ArrayList is only O(1) <b>amortized</b> — its worst case is <b>O(n)</b>: a push may trigger a resize (copy the whole array), and dequeuing from the front of an ArrayList shifts every element. So for the guaranteed worst case, LinkedList wins.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why can an ArrayList <code>push</code> (add) be O(n) in the worst case?</div>
        <button class="opt" data-i="0">Because arrays can't hold objects.</button>
        <button class="opt" data-i="1">When the backing array is full, it must allocate a bigger array and copy every element over.</button>
        <button class="opt" data-i="2">Because ArrayList has no push method.</button>
        <div class="fb">That resize-and-copy is the O(n) worst case. It's rare (so <b>amortized</b> O(1)), but a LinkedList never needs it — its worst case stays O(1). This is the amortized-vs-worst-case distinction from Lesson 9.</div>
      </div>
    </div>
    <div class="card">
      <h3>Why LinkedList for quick sort?</h3>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>The slides ask which list is best for quick sort. The key is which can <b>swap elements</b> efficiently. Which wins, and why?</div>
        <button class="opt" data-i="0">LinkedList — swapping is just re-pointing references (no shifting)</button>
        <button class="opt" data-i="1">ArrayList — because indexing is O(1)</button>
        <button class="opt" data-i="2">Neither can swap</button>
        <div class="fb">Slide 45: <b>LinkedList</b>, because a swap is a matter of re-pointing node references rather than moving data around in a fixed array. (Note the "sort on demand" bubble-sort example was O(n³) for <i>both</i> — the data structure doesn't always change the order.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l10-diagram">
    <h2>Lesson 10 · Diagram It — Stack &amp; Queue</h2>
    <div class="concept">Push/pop on the <b>Stack</b> (LIFO — one end) and enqueue/dequeue on the <b>Queue</b> (FIFO — opposite ends). Add the same values to both and watch how differently they come out.</div>
    <div class="two">
      <div class="card">
        <h3 style="margin-top:0">▮ Stack (LIFO)</h3>
        <div class="toolbar">
          <input type="text" id="st-val" placeholder="value" style="width:80px">
          <button class="btn small" onclick="stPush()">push</button>
          <button class="btn ghost small" onclick="stPop()">pop</button>
          <button class="btn ghost small" onclick="stClear()">clear</button>
        </div>
        <div id="st-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;min-height:170px;display:flex;flex-direction:column-reverse;align-items:center;gap:6px;justify-content:flex-start"></div>
        <div id="st-note" class="muted" style="font-size:12px;margin-top:8px;text-align:center"></div>
      </div>
      <div class="card">
        <h3 style="margin-top:0">▮ Queue (FIFO)</h3>
        <div class="toolbar">
          <input type="text" id="q-val" placeholder="value" style="width:80px">
          <button class="btn small" onclick="qEnq()">enqueue</button>
          <button class="btn ghost small" onclick="qDeq()">dequeue</button>
          <button class="btn ghost small" onclick="qClear()">clear</button>
        </div>
        <div id="q-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;min-height:80px;display:flex;align-items:center;gap:6px;flex-wrap:wrap"></div>
        <div id="q-note" class="muted" style="font-size:12px;margin-top:8px;text-align:center"></div>
      </div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l10-code">
    <h2>Lesson 10 · Code Writing</h2>
    <div class="concept">Both are built on a linked list of nodes. A Stack uses the <b>head</b> for everything; a Queue uses the <b>head</b> to dequeue and a tracked <b>tail</b> to enqueue — both O(1).</div>

    <div class="card">
      <h3>1. A Stack on a linked list</h3>
      <p>Write <code>push</code>, <code>pop</code>, and <code>peek</code> for a linked stack. Add and remove at the <b>head</b> so everything is O(1).</p>
      <textarea placeholder="public class LinkedStack<T> { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">LinkedStack</span>&lt;T&gt; {
    <span class="kw">private</span> Node&lt;T&gt; _head;
    <span class="kw">private int</span> _size;

    <span class="kw">public void</span> <span class="fn">push</span>(T element) {          <span class="cm">// add at head — O(1)</span>
        _head = <span class="kw">new</span> <span class="fn">NodeImpl</span>&lt;&gt;(element, _head);
        _size++;
    }
    <span class="kw">public</span> T <span class="fn">pop</span>() {                     <span class="cm">// remove head — O(1)</span>
        T v = _head.getValue();
        _head = _head.getNext();
        _size--;
        <span class="kw">return</span> v;
    }
    <span class="kw">public</span> T <span class="fn">peek</span>() { <span class="kw">return</span> _head.getValue(); } <span class="cm">// look, don't remove</span>
}</pre>
        <div class="concept">Because push and pop both work at the head — new node points to the old head; pop moves <code>_head</code> forward — there's no shifting or walking, so both are O(1) worst case.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. A Queue on a linked list</h3>
      <p>Write <code>enqueue</code> and <code>dequeue</code>. Enqueue at the <b>tail</b> (tracked) and dequeue from the <b>head</b> — both O(1). Handle the empty case.</p>
      <textarea placeholder="public class LinkedQueue<T> { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">LinkedQueue</span>&lt;T&gt; {
    <span class="kw">private</span> Node&lt;T&gt; _head, _tail;
    <span class="kw">private int</span> _size;

    <span class="kw">public void</span> <span class="fn">enqueue</span>(T element) {       <span class="cm">// add at tail — O(1)</span>
        Node&lt;T&gt; n = <span class="kw">new</span> <span class="fn">NodeImpl</span>&lt;&gt;(element, <span class="kw">null</span>);
        <span class="kw">if</span> (_tail == <span class="kw">null</span>) { _head = n; _tail = n; }  <span class="cm">// was empty</span>
        <span class="kw">else</span> { _tail.setNext(n); _tail = n; }
        _size++;
    }
    <span class="kw">public</span> T <span class="fn">dequeue</span>() {                 <span class="cm">// remove head — O(1)</span>
        T v = _head.getValue();
        _head = _head.getNext();
        <span class="kw">if</span> (_head == <span class="kw">null</span>) _tail = <span class="kw">null</span>;      <span class="cm">// became empty</span>
        _size--;
        <span class="kw">return</span> v;
    }
}</pre>
        <div class="concept">The tracked <code>_tail</code> is what makes enqueue O(1) — without it you'd have to walk the whole list to reach the end (O(n)). Dequeue at the head is naturally O(1). Don't forget: when the last element leaves, reset <code>_tail</code> to null too.</div>
      </div>
    </div>
  </section>
</main>`;

/* ============================================================
   Interactive Stack (LIFO) visualizer — top is the bottom of
   the flex column (column-reverse), so pushes grow upward.
   ============================================================ */
let ST=[];
function stPush(){
  const inp=document.getElementById('st-val'); let v=inp.value.trim();
  if(v==='') v=Math.floor(Math.random()*90+10)+'';
  ST.push(v); inp.value='';
  stRender('push('+v+') — added to the TOP. Last in, first out.');
}
function stPop(){
  if(ST.length===0){ stRender('Stack is empty — nothing to pop.'); return; }
  const v=ST.pop(); stRender('pop() → '+v+' — the most recently pushed value comes off first (LIFO).');
}
function stClear(){ ST=[]; stRender('Cleared.'); }
function stRender(note){
  const c=document.getElementById('st-canvas');
  if(ST.length===0){ c.innerHTML='<span class="muted">(empty stack)</span>'; }
  else {
    c.innerHTML=ST.map((v,i)=>{
      const isTop=i===ST.length-1;
      const border=isTop?'var(--amber)':'var(--stack)';
      const bg=isTop?'rgba(214,137,16,.22)':'rgba(46,134,222,.16)';
      const tag=isTop?' &nbsp;<span style="font-size:10px;color:var(--amber)">← top</span>':'';
      return '<div style="min-width:120px;text-align:center;background:'+bg+';border:1px solid '+border+';border-radius:6px;padding:8px 12px;font-family:monospace;font-weight:700;color:var(--ink)">'+v+tag+'</div>';
    }).join('');
  }
  document.getElementById('st-note').innerHTML = note || 'push/pop both happen at the top.';
}

/* ============================================================
   Interactive Queue (FIFO) visualizer — front on the left.
   ============================================================ */
let QU=[];
function qEnq(){
  const inp=document.getElementById('q-val'); let v=inp.value.trim();
  if(v==='') v=Math.floor(Math.random()*90+10)+'';
  QU.push(v); inp.value='';
  qRender('enqueue('+v+') — added to the BACK.');
}
function qDeq(){
  if(QU.length===0){ qRender('Queue is empty — nothing to dequeue.'); return; }
  const v=QU.shift(); qRender('dequeue() → '+v+' — the FRONT (first enqueued) leaves first (FIFO).');
}
function qClear(){ QU=[]; qRender('Cleared.'); }
function qRender(note){
  const c=document.getElementById('q-canvas');
  if(QU.length===0){ c.innerHTML='<span class="muted">(empty queue)</span>'; }
  else {
    c.innerHTML=QU.map((v,i)=>{
      const isFront=i===0, isBack=i===QU.length-1;
      const border=isFront?'var(--amber)':'var(--stack)';
      const bg=isFront?'rgba(214,137,16,.22)':'rgba(46,134,222,.16)';
      let tag='';
      if(isFront) tag='<div style="font-size:10px;color:var(--amber)">front</div>';
      else if(isBack) tag='<div style="font-size:10px;color:var(--muted)">back</div>';
      return '<div style="text-align:center"><div style="background:'+bg+';border:1px solid '+border+';border-radius:6px;padding:8px 12px;font-family:monospace;font-weight:700;color:var(--ink)">'+v+'</div>'+tag+'</div>';
    }).join('<span style="color:var(--muted)">→</span>');
  }
  document.getElementById('q-note').innerHTML = note || 'enqueue at the back, dequeue from the front.';
}

stRender();
qRender();
