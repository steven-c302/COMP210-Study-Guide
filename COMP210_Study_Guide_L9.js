/* ============================================================
   LESSON 9 — Lists, ArrayList & LinkedList.
   Injects into #l9. Loaded before the main engine.
   Includes a self-contained interactive linked-list builder
   and a multiple-answer (checkbox) widget.
   ============================================================ */
document.getElementById('l9').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l9-list')">List ADT</button>
  <button onclick="showTopic(this,'l9-arraylist')">ArrayList</button>
  <button onclick="showTopic(this,'l9-linkedlist')">LinkedList</button>
  <button onclick="showTopic(this,'l9-compare')">Compare &amp; Delete</button>
  <button onclick="showTopic(this,'l9-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l9-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== LIST ADT ===================== -->
  <section class="topic active" id="l9-list">
    <h2>Lesson 9 · List (the ADT)</h2>
    <div class="concept">A <b>List</b> is an <b>ADT</b> (Lesson 6 idea): an <b>interface</b> describing behavior, with no implementation. It holds <b>ordered</b> elements indexed <code>0</code> to <code>n-1</code>. Two classes implement it differently: <b>ArrayList</b> (elements in an array) and <b>LinkedList</b> (elements in linked nodes).</div>
    <div class="card">
      <h3>Fill in — the two implementations</h3>
      <p>ArrayLists store elements in an
        <input type="text" class="fillblank sm" data-answer="array" placeholder="?"> while LinkedLists store each element in its own
        <input type="text" class="fillblank sm" data-answer="node" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>array</b> and <b>node</b> (matches your quiz). Same <code>List</code> contract, two very different underlying structures.</div>
    </div>
    <div class="card">
      <h3>The <code>List&lt;T&gt;</code> interface</h3>
      <p class="muted">From <code>list/List.java</code> — a set of method signatures, no bodies:</p>
<pre><span class="kw">public interface</span> <span class="ty">List</span>&lt;T&gt; {
    <span class="ty">int</span> <span class="fn">size</span>();
    <span class="kw">boolean</span> <span class="fn">isEmpty</span>();
    <span class="kw">void</span> <span class="fn">clear</span>();
    <span class="kw">boolean</span> <span class="fn">contains</span>(T element);
    <span class="ty">int</span> <span class="fn">find</span>(T element);
    <span class="kw">void</span> <span class="fn">add</span>(T element);
    <span class="kw">void</span> <span class="fn">add</span>(<span class="ty">int</span> index, T element);   <span class="cm">// overloaded</span>
    <span class="kw">boolean</span> <span class="fn">remove</span>(T element);
    T <span class="fn">remove</span>(<span class="ty">int</span> index);            <span class="cm">// overloaded</span>
    T <span class="fn">get</span>(<span class="ty">int</span> index);
    T <span class="fn">set</span>(<span class="ty">int</span> index, T element);
}</pre>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Having both <code>add(T element)</code> and <code>add(int index, T element)</code> is an example of <b>method overloading</b> — same name, different parameter lists.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 14). Overloaded methods share a name but are distinguished by the number/types of parameters. The compiler picks the right one based on the arguments you pass.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What does the <code>&lt;T&gt;</code> in <code>List&lt;T&gt;</code> mean?</div>
        <button class="opt" data-i="0">The list can only hold objects of a class literally named T.</button>
        <button class="opt" data-i="1">A generic type placeholder — you fill in the real type when you use it, e.g. <code>List&lt;Integer&gt;</code> or <code>List&lt;String&gt;</code>.</button>
        <button class="opt" data-i="2">It means the list is sorted.</button>
        <div class="fb"><code>T</code> is a <b>generic</b> placeholder. <code>List&lt;String&gt; s = new ArrayList&lt;&gt;();</code> makes a list of Strings; the same class works for any element type.</div>
      </div>
    </div>
  </section>

  <!-- ===================== ARRAYLIST ===================== -->
  <section class="topic" id="l9-arraylist">
    <h2>Lesson 9 · ArrayList — a dynamic array</h2>
    <div class="concept">A plain Java array has a <b>fixed size</b>. An <b>ArrayList</b> fixes that: it stores elements in an array with some initial <b>capacity</b> (e.g. 4), and when the array gets full it allocates a <b>bigger</b> array (e.g. ×1.5) and copies everything over. Accessing <code>a[i]</code> stays <b>O(1)</b>.</div>
    <div class="card">
      <h3>Using an ArrayList</h3>
<pre>List&lt;String&gt; songs = <span class="kw">new</span> <span class="fn">ArrayList</span>&lt;&gt;();
songs.add(<span class="st">"Growing Pain"</span>);
songs.add(<span class="st">"New Rules"</span>);

System.out.println(songs.get(<span class="nm">0</span>));          <span class="cm">// first element</span>
songs.remove(songs.size() - <span class="nm">1</span>);          <span class="cm">// remove LAST element</span>
songs.add(<span class="st">"Blue Hour"</span>);</pre>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>How do you access the <b>last</b> element of an ArrayList <code>a</code>?</div>
        <button class="opt" data-i="0"><code>a.get(a.length)</code></button>
        <button class="opt" data-i="1"><code>a.get(-1)</code></button>
        <button class="opt" data-i="2"><code>a.get(a.size() - 1)</code></button>
        <div class="fb"><b><code>a.get(a.size() - 1)</code></b>. Indices run 0..size-1, so the last one is at <code>size - 1</code>. (Java has no negative indexing, and Lists use <code>size()</code>, not <code>length</code>.)</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why can't the internal array be declared <code>T[] arr = new T[size]</code>?</div>
        <button class="opt" data-i="0">Because T is always an int.</button>
        <button class="opt" data-i="1">You can't create an array of a generic type in Java — so ArrayList uses <code>Object[]</code> (Object holds anything) and casts.</button>
        <button class="opt" data-i="2">Because arrays can't be resized.</button>
        <div class="fb">Slide 21: <code>new T[size]</code> is illegal. Since every type <b>is-a</b> <code>Object</code>, an <code>Object[]</code> can store any element, and you cast back to <code>T</code> on retrieval.</div>
      </div>
    </div>
    <div class="card">
      <h3>Amortized time — the key ArrayList idea</h3>
      <div class="concept">A single <code>add</code> is usually O(1), but the <b>one</b> add that triggers a resize costs O(n) (copy everything to the new array). Averaged over a long run of adds, the rare expensive copies spread out to <b>amortized O(1)</b> per add.</div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span><b>Amortized time</b> is time taken averaged over a fixed, known sequence of operations — as opposed to random sampling from a distribution of operations.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (matches your quiz). <b>Amortized</b> = averaged over a known sequence (e.g. 1000 straight adds). <b>Average</b> = averaged over a random distribution of operations. They answer different questions.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What are the worst-case and amortized time of an ArrayList <code>add</code>?</div>
        <button class="opt" data-i="0">Both O(1)</button>
        <button class="opt" data-i="1">Worst case O(n) (the resize/copy), amortized O(1)</button>
        <button class="opt" data-i="2">Worst case O(1), amortized O(n)</button>
        <div class="fb">Slide 23–27: worst case is <b>O(n)</b> (when it must copy to a bigger array), but the amortized cost is <b>O(1)</b> because resizes are rare and their cost spreads over many cheap adds.</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>When would you care about <b>worst-case</b> time rather than amortized?</div>
        <button class="opt" data-i="0">Real-time systems, where a guaranteed per-operation bound is critical.</button>
        <button class="opt" data-i="1">When you only ever do one operation.</button>
        <button class="opt" data-i="2">Never — amortized is always what matters.</button>
        <div class="fb">Slide 28: worst-case matters when guarantees are critical (real-time systems); amortized is fine when average performance is acceptable.</div>
      </div>
    </div>
  </section>

  <!-- ===================== LINKEDLIST ===================== -->
  <section class="topic" id="l9-linkedlist">
    <h2>Lesson 9 · LinkedList — chained nodes</h2>
    <div class="concept">A <b>LinkedList</b> stores each element in its own <b>node</b> allocated separately on the heap (non-contiguous memory). Each node holds its <b>value</b> and a <b>reference to the next node</b>. The list keeps a reference to the first node (<code>_head</code>), often the last (<code>_tail</code>), and the <code>_size</code>.</div>
    <div class="card">
      <h3>Fill in — the LinkedList fields</h3>
      <p>The LinkedList class has two reference-type fields:
        <input type="text" class="fillblank sm" data-answer="_head" placeholder="?"> (which is required) and
        <input type="text" class="fillblank sm" data-answer="_tail" placeholder="?"> (which is optional).</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>_head</b> and <b>_tail</b> — <i>with the leading underscore</i> (that's the field-naming convention, and what the quiz wanted; plain "head"/"tail" was marked wrong). <code>_head</code> is required to find the list at all; <code>_tail</code> is optional but makes adding at the end O(1).</div>
    </div>
    <div class="card">
      <h3>The Node</h3>
      <p class="muted">From <code>linkedList/NodeImpl.java</code> — a value plus a pointer to the next node:</p>
<pre><span class="kw">public class</span> <span class="ty">NodeImpl</span>&lt;T&gt; <span class="kw">implements</span> <span class="ty">Node</span>&lt;T&gt; {
    <span class="kw">private</span> T _value;
    <span class="kw">private</span> Node&lt;T&gt; _next;   <span class="cm">// reference to the NEXT node</span>

    <span class="kw">public</span> <span class="fn">NodeImpl</span>(T value, Node&lt;T&gt; next) {
        _value = value;
        _next = next;
    }
    <span class="cm">// getValue/setValue/getNext/setNext ...</span>
}</pre>
      <div class="q" data-tf="F">
        <div class="prompt"><span class="tag">T / F</span>LinkedList nodes are stored in one contiguous block of memory, like an array.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">False (slide 47). Each node is allocated <b>separately</b> and can live anywhere on the heap; they're chained together by the <code>_next</code> references, not by being adjacent in memory.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What is the time to access the i-th element <code>L(i)</code> of a LinkedList?</div>
        <button class="opt" data-i="0">O(1) — jump straight to it</button>
        <button class="opt" data-i="1">O(n) — you must walk from the head, following <code>_next</code> i times</button>
        <button class="opt" data-i="2">O(log n) — halve each step</button>
        <div class="fb"><b>O(n)</b> (slide 46). There's no direct indexing — to reach index i you start at <code>_head</code> and follow <code>getNext()</code> i times. This is the big trade-off vs an array's O(1) access.</div>
      </div>
    </div>
    <div class="card">
      <h3>Singly vs Doubly linked</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What extra field does a <b>doubly</b> linked list's node have?</div>
        <button class="opt" data-i="0">A reference to the head</button>
        <button class="opt" data-i="1">A reference to the <b>previous</b> node (as well as next)</button>
        <button class="opt" data-i="2">Its index</button>
        <div class="fb">Slide 52: a doubly linked node adds a <b>previous</b>-node reference, so you can traverse in both directions (useful for, e.g., deleting a node when you only have a reference to it).</div>
      </div>
    </div>
  </section>

  <!-- ===================== COMPARE & DELETE ===================== -->
  <section class="topic" id="l9-compare">
    <h2>Lesson 9 · ArrayList vs LinkedList, and Deletion Cases</h2>
    <div class="concept">The two implementations trade off <b>access speed</b> against <b>flexibility</b>. Arrays give O(1) indexing but a fixed size and wasteful spare capacity; linked lists give O(n) indexing but grow one node at a time.</div>
    <div class="card">
      <h3>Fill in — memory utilization</h3>
      <p>The memory utilization of ArrayLists is
        <input type="text" class="fillblank sm" data-answer="wasteful" placeholder="?">, LinkedLists' is
        <input type="text" class="fillblank sm" data-answer="efficient" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>wasteful</b> and <b>efficient</b> (matches your quiz). An ArrayList over-allocates spare capacity (unused slots), while a LinkedList allocates exactly one node per element as needed.</div>
    </div>
    <div class="card">
      <h3>Pros &amp; cons — match them up</h3>
      <table class="match" id="match-l9">
        <tr><td class="match-term">Array / ArrayList — access <code>a[i]</code></td><td><select class="match-def"><option value="">— choose —</option><option value="o1">O(1) — direct indexing</option><option value="on">O(n) — must walk the chain</option></select></td></tr>
        <tr><td class="match-term">LinkedList — access <code>L(i)</code></td><td><select class="match-def"><option value="">— choose —</option><option value="o1">O(1) — direct indexing</option><option value="on">O(n) — must walk the chain</option></select></td></tr>
        <tr><td class="match-term">Array — size</td><td><select class="match-def"><option value="">— choose —</option><option value="fixed">Fixed (con)</option><option value="dyn">Dynamic, grows as needed (pro)</option></select></td></tr>
        <tr><td class="match-term">LinkedList — size</td><td><select class="match-def"><option value="">— choose —</option><option value="fixed">Fixed (con)</option><option value="dyn">Dynamic, grows as needed (pro)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-l9','fb-match-l9',['o1','on','fixed','dyn'])">Check</button>
      <div class="fb" id="fb-match-l9"></div>
    </div>
    <div class="card">
      <h3>Deletion cases — select ALL that apply</h3>
      <p class="muted">This is the multiple-answer question from your quiz. When you write <code>remove</code> for a LinkedList, which distinct cases must the code handle? Check every one that is a real case.</p>
      <div id="ma-delete">
        <label class="ma-item"><input type="checkbox"> The size of the LinkedList is 0</label>
        <label class="ma-item"><input type="checkbox"> The size of the LinkedList is 0 and the node to delete is the tail</label>
        <label class="ma-item"><input type="checkbox"> The size of the LinkedList is 1</label>
        <label class="ma-item"><input type="checkbox"> The size of the LinkedList is 1 and the node to delete is not the head</label>
        <label class="ma-item"><input type="checkbox"> The size of the LinkedList is &gt; 1 and the node to delete is the head</label>
        <label class="ma-item"><input type="checkbox"> The size of the LinkedList is &gt; 1 and the node to delete is not the head</label>
        <label class="ma-item"><input type="checkbox"> The size of the LinkedList is &gt; 1 and the node to delete is the tail</label>
        <label class="ma-item"><input type="checkbox"> The size of the LinkedList is &gt; 1 and the node to delete is not the tail</label>
      </div>
      <button class="btn small" style="margin-top:8px" onclick="maDelete()">Check</button>
      <div class="fb" id="fb-ma-delete"></div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l9-diagram">
    <h2>Lesson 9 · Diagram It — Build a Linked List</h2>
    <div class="concept">Add and remove nodes to see how <code>_head</code>, <code>_tail</code>, and <code>_size</code> change, and how each node points to the next. Then "traverse to L(i)" to watch why access is <b>O(n)</b> — every hop from the head counts.</div>
    <div class="card">
      <div class="toolbar">
        <input type="text" id="ll-val" placeholder="value" style="width:90px">
        <button class="btn small" onclick="llAdd('tail')">Add at tail</button>
        <button class="btn small" onclick="llAdd('head')">Add at head</button>
        <button class="btn ghost small" onclick="llRemoveHead()">Remove head</button>
        <button class="btn ghost small" onclick="llClear()">Clear</button>
      </div>
      <div id="ll-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:18px;min-height:90px;overflow-x:auto"></div>
      <div id="ll-info" class="step-desc"></div>
      <div class="toolbar">
        <label class="muted">Traverse to index:</label>
        <input type="text" id="ll-idx" placeholder="i" style="width:60px">
        <button class="btn small" onclick="llGet()">get(i) — walk from head</button>
        <button class="btn ghost small" onclick="llRender()">clear highlight</button>
      </div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l9-code">
    <h2>Lesson 9 · Code Writing</h2>
    <div class="concept">Write each yourself, then reveal. These are the core LinkedList operations — the walking-with-a-<code>current</code>-pointer pattern shows up again and again.</div>

    <div class="card">
      <h3>1. The Node class</h3>
      <p>Write a generic <code>NodeImpl&lt;T&gt;</code> with private <code>_value</code> and <code>_next</code> (a <code>Node&lt;T&gt;</code>), a constructor taking both, and getters/setters for each.</p>
      <textarea placeholder="public class NodeImpl<T> implements Node<T> { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">NodeImpl</span>&lt;T&gt; <span class="kw">implements</span> <span class="ty">Node</span>&lt;T&gt; {
    <span class="kw">private</span> T _value;
    <span class="kw">private</span> Node&lt;T&gt; _next;

    <span class="kw">public</span> <span class="fn">NodeImpl</span>(T value, Node&lt;T&gt; next) {
        _value = value;
        _next = next;
    }

    <span class="kw">public</span> T <span class="fn">getValue</span>()          { <span class="kw">return</span> _value; }
    <span class="kw">public void</span> <span class="fn">setValue</span>(T value) { _value = value; }
    <span class="kw">public</span> Node&lt;T&gt; <span class="fn">getNext</span>()      { <span class="kw">return</span> _next; }
    <span class="kw">public void</span> <span class="fn">setNext</span>(Node&lt;T&gt; next) { _next = next; }
}</pre>
        <div class="concept">A node is basically a box with two things: the value and a reference to the next box. That <code>_next</code> reference is what chains the list together.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. add at the tail</h3>
      <p>Write <code>add(T element)</code> that appends a new node to the end. Fields available: <code>_head</code>, <code>_tail</code>, <code>_size</code>. Handle the empty-list case.</p>
      <textarea placeholder="public void add(T element) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public void</span> <span class="fn">add</span>(T element) {
    Node&lt;T&gt; newNode = <span class="kw">new</span> <span class="fn">NodeImpl</span>&lt;&gt;(element, <span class="kw">null</span>);
    <span class="kw">if</span> (isEmpty()) {          <span class="cm">// empty: new node is both head and tail</span>
        _head = newNode;
        _tail = newNode;
    } <span class="kw">else</span> {                  <span class="cm">// otherwise: link it after the current tail</span>
        _tail.setNext(newNode);
        _tail = newNode;
    }
    _size++;
}</pre>
        <div class="concept">Keeping a <code>_tail</code> reference is what makes this O(1): you jump straight to the end. Without <code>_tail</code> you'd have to walk the whole list first — O(n).</div>
      </div>
    </div>

    <div class="card">
      <h3>3. get(index) — the traversal pattern</h3>
      <p>Write <code>get(int index)</code> returning the value at that position (assume the index is valid).</p>
      <textarea placeholder="public T get(int index) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public</span> T <span class="fn">get</span>(<span class="ty">int</span> index) {
    Node&lt;T&gt; current = _head;   <span class="cm">// start at the head</span>
    <span class="ty">int</span> i = <span class="nm">0</span>;
    <span class="kw">while</span> (i &lt; index) {         <span class="cm">// hop forward index times</span>
        current = current.getNext();
        i++;
    }
    <span class="kw">return</span> current.getValue();
}</pre>
        <div class="concept">This walk-from-the-head-with-a-<code>current</code>-pointer is <b>the</b> LinkedList pattern, and it's exactly why <code>get</code> is O(n): reaching index i takes i hops.</div>
      </div>
    </div>

    <div class="card">
      <h3>4. reverse the list</h3>
      <p>Write <code>reverse()</code> that reverses the node order in place (e.g. <code>10 -&gt; 9 -&gt; 8</code> becomes <code>8 -&gt; 9 -&gt; 10</code>).</p>
      <textarea placeholder="public void reverse() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public void</span> <span class="fn">reverse</span>() {
    Node&lt;T&gt; prev = <span class="kw">null</span>;
    Node&lt;T&gt; current = _head;
    _tail = _head;                 <span class="cm">// old head becomes the new tail</span>
    <span class="kw">while</span> (current != <span class="kw">null</span>) {
        Node&lt;T&gt; nextNode = current.getNext(); <span class="cm">// save the next</span>
        current.setNext(prev);     <span class="cm">// flip this node's pointer backward</span>
        prev = current;            <span class="cm">// advance prev</span>
        current = nextNode;        <span class="cm">// advance current</span>
    }
    _head = prev;                  <span class="cm">// last node is the new head</span>
}</pre>
        <div class="concept">The trick is the three pointers: <code>prev</code>, <code>current</code>, and a saved <code>nextNode</code> (so you don't lose the rest of the list when you flip <code>current</code>'s pointer). Walk through once, flipping each <code>_next</code> to point backward.</div>
      </div>
    </div>

    <div class="card">
      <h3>5. size() and isEmpty()</h3>
      <p>Given a <code>_size</code> field, write both.</p>
      <textarea placeholder="public int size() { ... }  /  public boolean isEmpty() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public int</span> <span class="fn">size</span>()        { <span class="kw">return</span> _size; }
<span class="kw">public boolean</span> <span class="fn">isEmpty</span>() { <span class="kw">return</span> _size == <span class="nm">0</span>; }</pre>
        <div class="concept">Because the list tracks <code>_size</code> as a field (updated on every add/remove), both are O(1) — no need to walk the list to count.</div>
      </div>
    </div>
  </section>
</main>`;

/* ---- style the multiple-answer items ---- */
document.querySelectorAll('#ma-delete .ma-item').forEach(el=>{
  el.style.cssText='display:flex;align-items:center;gap:10px;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:6px 0;cursor:pointer;font-size:14px';
});

/* ============================================================
   Multiple-answer grader (self-contained, per-item feedback)
   ============================================================ */
function maDelete(){
  const correct=[0,2,4,5];   // size 0; size 1; size>1 & head; size>1 & not head
  const items=document.querySelectorAll('#ma-delete .ma-item');
  let all=true;
  items.forEach((item,i)=>{
    const checked=item.querySelector('input').checked;
    const shouldCheck=correct.indexOf(i)!==-1;
    const ok=(checked===shouldCheck);
    item.style.borderColor=ok?'var(--green)':'var(--red)';
    item.style.background=ok?'rgba(21,153,87,.14)':'rgba(192,57,43,.12)';
    if(!ok)all=false;
  });
  const fb=document.getElementById('fb-ma-delete');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all
    ? '✓ Correct! The four real cases: size 0 (empty), size 1, and size &gt; 1 split into "delete the head" vs "not the head." The tail sub-cases are already covered by those.'
    : '✗ Not yet. Green rows are right as-is; red rows are wrong (checked one you should not have, or missed one). The four correct cases are: size 0; size 1; size &gt; 1 &amp; node is the head; size &gt; 1 &amp; node is not the head.';
}

/* ============================================================
   Interactive linked-list builder
   ============================================================ */
let LL=[];            // list of values; index 0 = head
function llAdd(where){
  const inp=document.getElementById('ll-val');
  let v=inp.value.trim();
  if(v==='') v=Math.floor(Math.random()*90+10)+'';   // random if blank
  if(where==='head') LL.unshift(v); else LL.push(v);
  inp.value='';
  llRender('Added '+v+' at the '+where+'. _size = '+LL.length+'.');
}
function llRemoveHead(){
  if(LL.length===0){ llRender('List is already empty — nothing to remove (this is deletion case: size 0).'); return; }
  const v=LL.shift();
  llRender('Removed head node ('+v+'). _head now points to the next node. _size = '+LL.length+'.');
}
function llClear(){ LL=[]; llRender('Cleared. _head = null, _tail = null, _size = 0.'); }
function llRender(note, hi){
  const cont=document.getElementById('ll-canvas');
  if(LL.length===0){
    cont.innerHTML='<div class="muted">(empty list) &nbsp; _head = null &nbsp; _tail = null &nbsp; _size = 0</div>';
  } else {
    let h='<div style="display:flex;align-items:center;flex-wrap:wrap;gap:0;font-family:monospace">';
    h+='<span style="color:var(--stack);font-weight:700;margin-right:8px">_head →</span>';
    LL.forEach((v,i)=>{
      const isHi = (hi!==undefined && i<=hi);
      const border = isHi ? 'var(--amber)' : 'var(--heap)';
      const bg = isHi ? 'rgba(214,137,16,.18)' : 'rgba(142,68,173,.14)';
      const tailTag = (i===LL.length-1) ? '<div style="font-size:10px;color:var(--heap);text-align:center">↑ _tail</div>' : '';
      h+='<div style="display:flex;flex-direction:column;align-items:center">'
        +'<div style="display:flex;border:1px solid '+border+';background:'+bg+';border-radius:6px;overflow:hidden">'
        +'<span style="padding:8px 12px;font-weight:700;color:var(--ink)">'+v+'</span>'
        +'<span style="padding:8px 10px;border-left:1px solid '+border+';color:var(--muted);font-size:12px">next</span>'
        +'</div>'+tailTag+'</div>';
      h+='<span style="color:var(--muted);margin:0 8px">→</span>';
    });
    h+='<span style="color:var(--muted)">null</span></div>';
    cont.innerHTML=h;
  }
  document.getElementById('ll-info').innerHTML = note || ('_head → first node, _tail → last node, _size = '+LL.length+'.');
}
function llGet(){
  const i=parseInt(document.getElementById('ll-idx').value);
  if(isNaN(i)||i<0||i>=LL.length){ llRender('Index out of range (valid: 0 to '+(LL.length-1)+').'); return; }
  llRender('get('+i+'): started at _head and followed getNext() '+i+' time(s) — '+(i+1)+' node(s) visited — to reach value '+LL[i]+'. That walk is why access is O(n).', i);
}
llRender();
