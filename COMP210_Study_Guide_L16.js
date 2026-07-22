/* ============================================================
   LESSON 16 — Hashing (hash tables, functions, collision resolution).
   Injects into #l16. Loaded before the main engine.
   Includes an interactive hash-table probing visualizer.
   ============================================================ */
document.getElementById('l16').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l16-basics')">Basics</button>
  <button onclick="showTopic(this,'l16-hashfn')">Hash Functions</button>
  <button onclick="showTopic(this,'l16-chaining')">Chaining</button>
  <button onclick="showTopic(this,'l16-probing')">Probing &amp; Clustering</button>
  <button onclick="showTopic(this,'l16-double')">Double Hashing</button>
  <button onclick="showTopic(this,'l16-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l16-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== BASICS ===================== -->
  <section class="topic active" id="l16-basics">
    <h2>Lesson 16 · Hashing Basics</h2>
    <div class="concept">A <b>hash table</b> stores key-indexed data with <b>O(1) average</b> insert/lookup/delete. The trick: a <b>hash function</b> turns a key into an integer <b>index</b> into an array. A <b>Hash Map</b> is a hash-table implementation of the <b>Map ADT</b> (<code>put</code>, <code>get</code>, <code>contains</code>, <code>remove</code>).</div>
    <div class="card">
      <h3>Match the term (your quiz)</h3>
      <table class="match" id="match-hash">
        <tr><td class="match-term">Hashing</td><td><select class="match-def"><option value="">— choose —</option><option value="h">The concept of computing an integer hash value from a key value</option><option value="hf">A function that computes a hash value</option><option value="hm">A hash-table implementation of the Map ADT</option></select></td></tr>
        <tr><td class="match-term">Hash Function</td><td><select class="match-def"><option value="">— choose —</option><option value="h">The concept of computing an integer hash value from a key value</option><option value="hf">A function that computes a hash value</option><option value="hm">A hash-table implementation of the Map ADT</option></select></td></tr>
        <tr><td class="match-term">Hash Map</td><td><select class="match-def"><option value="">— choose —</option><option value="h">The concept of computing an integer hash value from a key value</option><option value="hf">A function that computes a hash value</option><option value="hm">A hash-table implementation of the Map ADT</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-hash','fb-match-hash',['h','hf','hm'])">Check</button>
      <div class="fb" id="fb-match-hash"></div>
    </div>
    <div class="card">
      <h3>Fill in — what collisions depend on (your quiz)</h3>
      <p>The probability of collision depends on the
        <input type="text" class="fillblank sm" data-answer="probability" placeholder="?">
        <input type="text" class="fillblank sm" data-answer="distribution" placeholder="?"> of the hash function.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answer: <b>probability distribution</b>. A good hash function spreads keys <b>uniformly</b> across the table; a bad one clumps them, causing collisions.</div>
    </div>
    <div class="card">
      <h3>The Map ADT</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Which set of operations defines the Map ADT that a Hash Map implements?</div>
        <button class="opt" data-i="0"><code>push</code>, <code>pop</code>, <code>peek</code></button>
        <button class="opt" data-i="1"><code>put(key,value)</code>, <code>get(key)</code>, <code>contains(key)</code>, <code>remove(key)</code></button>
        <button class="opt" data-i="2"><code>enqueue</code>, <code>dequeue</code></button>
        <div class="fb">A Map stores key→value associations: put/get/contains/remove. A Hash Map makes all of these O(1) on average by hashing the key to an array index.</div>
      </div>
    </div>
  </section>

  <!-- ===================== HASH FUNCTIONS ===================== -->
  <section class="topic" id="l16-hashfn">
    <h2>Lesson 16 · Hash Functions &amp; Load</h2>
    <div class="concept">A hash function maps a key to an index in <code>0..M-1</code> (M = table size), usually with <b>modular arithmetic</b> (<code>mod M</code>) so any integer "loops around" into the table. Example: <code>h("Bob") = (66+111+98) mod 10 = 275 mod 10 = 5</code>. A good hash function runs in <b>O(1)</b> and distributes keys <b>uniformly</b>.</div>
    <div class="card">
      <h3>Load factor</h3>
      <div class="concept"><b>Load factor = N / M</b> — the number of stored elements over the table size. It drives the collision probability: <code>N &lt;&lt; M</code> → few collisions; <code>N ≈ M</code> → many collisions (and probing breaks down).</div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>A table of size <code>M = 20</code> holds <code>N = 5</code> keys. What is the load factor?</div>
        <button class="opt" data-i="0">4.0</button>
        <button class="opt" data-i="1">0.25</button>
        <button class="opt" data-i="2">15</button>
        <div class="fb"><b>0.25</b> (= 5/20). Low load → collisions are rare → operations stay near O(1).</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Which hash function for strings gives a more <b>uniform</b> distribution (M = 26)?</div>
        <button class="opt" data-i="0"><code>h(s) = (sum of ASCII codes) mod 26</code></button>
        <button class="opt" data-i="1"><code>h(s) = index of the first letter</code></button>
        <button class="opt" data-i="2">They're identical.</button>
        <div class="fb">Summing all characters mixes far more information than just the first letter, so keys spread out more evenly. "First letter" clumps everything under common starting letters (lots of names start with 'a'/'s').</div>
      </div>
    </div>
    <div class="card">
      <h3>Why a prime table size?</h3>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Making the table size <code>M</code> a <b>prime</b> number helps, because it avoids <code>M</code> sharing a common divisor with the keys (which would waste slots).</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 48). If keys are multiples of 4 and M = 12, they only ever land on multiples of 4 → clustering. A prime M has no common divisor with the keys, spreading them out.</div>
      </div>
    </div>
  </section>

  <!-- ===================== CHAINING ===================== -->
  <section class="topic" id="l16-chaining">
    <h2>Lesson 16 · Chaining</h2>
    <div class="concept"><b>Chaining</b> resolves collisions by making each table slot a <b>linked list</b> (a "chain"). All keys that hash to index <code>i</code> live in the list at <code>i</code>. Insert prepends to the head → <b>O(1)</b>.</div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What is the <b>worst-case</b> search time with chaining?</div>
        <button class="opt" data-i="0">O(1)</button>
        <button class="opt" data-i="1">O(N) — a terrible hash function could put all N keys in one chain</button>
        <button class="opt" data-i="2">O(log N)</button>
        <div class="fb"><b>O(N)</b>. If the hash function is poor (e.g. every key hashes to the same slot), you get one long linked list and search degrades to O(N). With a good hash function and low load, it's O(1) average.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Inserting into a chained hash table is O(1) because you just prepend to the linked list at the hashed index.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True — compute the index (O(1)) and prepend to that chain's head (O(1)). No probing, no shifting. ➡ Try it in Diagram It.</div>
      </div>
    </div>
  </section>

  <!-- ===================== PROBING ===================== -->
  <section class="topic" id="l16-probing">
    <h2>Lesson 16 · Probing &amp; Clustering</h2>
    <div class="concept"><b>Open addressing / probing</b> stores everything in the array itself — on a collision, it <b>probes</b> for the next open slot. <b>Linear:</b> <code>h(k,i) = (k + i) mod M</code>. <b>Quadratic:</b> <code>h(k,i) = (k + i²) mod M</code>. Here <code>i</code> is the collision number (0, 1, 2, …).</div>
    <div class="card">
      <h3>Primary vs. secondary clustering</h3>
      <table class="match" id="match-cluster">
        <tr><td class="match-term">Primary clustering<br><span class="muted">(linear probing)</span></td><td><select class="match-def"><option value="">— choose —</option><option value="prim">Long runs of filled slots merge into big blocks; any key hashing near a block extends it</option><option value="sec">Keys with the SAME initial hash follow the SAME probe path, clumping along it</option></select></td></tr>
        <tr><td class="match-term">Secondary clustering<br><span class="muted">(quadratic probing)</span></td><td><select class="match-def"><option value="">— choose —</option><option value="prim">Long runs of filled slots merge into big blocks; any key hashing near a block extends it</option><option value="sec">Keys with the SAME initial hash follow the SAME probe path, clumping along it</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-cluster','fb-match-cluster',['prim','sec'])">Check</button>
      <div class="fb" id="fb-match-cluster"></div>
      <p class="muted" style="margin-top:8px">Quadratic probing <b>avoids primary</b> clustering but still has <b>secondary</b> clustering — and can even <b>fail to insert</b> (it may cycle through a limited set of slots).</p>
    </div>
    <div class="card">
      <h3>The quadratic-probing trap (your quiz)</h3>
      <p class="muted">M = 8, <code>h(k, i) = (k + i²) mod 8</code>. Insert 5, 22, 9, then 13. What index is <b>13</b> inserted at?</p>
      <div class="q" data-mc="8">
        <div class="prompt"><span class="tag">Multiple choice</span>Where does 13 go?</div>
        <button class="opt" data-i="0">0</button><button class="opt" data-i="1">1</button><button class="opt" data-i="2">2</button><button class="opt" data-i="3">3</button>
        <button class="opt" data-i="4">4</button><button class="opt" data-i="5">5</button><button class="opt" data-i="6">6</button><button class="opt" data-i="7">7</button>
        <button class="opt" data-i="8">Cannot be inserted</button>
        <div class="fb"><b>Cannot be inserted.</b> First: 5→5, 22→6, 9→1. Now 13's probes: i²mod8 cycles through {0,1,4,1,0,1,4,1}, so (13 + that) mod 8 only ever gives indices <b>5, 6, 1</b> — all occupied! It never reaches the empty slots (0,2,3,4,7). That's secondary clustering causing an insertion failure.</div>
      </div>
    </div>
    <div class="card">
      <h3>The deletion problem (linear probing)</h3>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Why can't you just blank out a slot when deleting from a probing table?</div>
        <button class="opt" data-i="0">Deletion is impossible in a hash table.</button>
        <button class="opt" data-i="1">It would make the table bigger.</button>
        <button class="opt" data-i="2">An empty slot signals "not present" to searches, so blanking a slot could cut off the probe path to a later key. Use a <b>tombstone flag</b> instead.</button>
        <div class="fb">Search stops at the first truly-empty slot. If you blank a deleted slot in the middle of a cluster, a later key that probed past it becomes unreachable. Mark deletions with a <b>tombstone (flag)</b> that search skips over but insert can reuse.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>When the probability of collision is high, chaining is generally better than linear probing. (your quiz)</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. As N approaches M, linear probing suffers heavy clustering and breaks down, while chaining still works (chains just get a bit longer). Chaining degrades more gracefully at high load.</div>
      </div>
    </div>
  </section>

  <!-- ===================== DOUBLE HASHING ===================== -->
  <section class="topic" id="l16-double">
    <h2>Lesson 16 · Double Hashing</h2>
    <div class="concept"><b>Double hashing</b> uses a <b>second</b> hash function to decide the probe step size, so keys that share an initial index still follow <b>different</b> probe paths: <code>h(k, i) = (h1(k) + i · h2(k)) mod M</code>. This avoids <b>both</b> primary and secondary clustering.</div>
    <div class="card">
      <h3>The three probe steps</h3>
      <table class="match" id="match-probe">
        <tr><td class="match-term">Linear probing</td><td><select class="match-def"><option value="">— choose —</option><option value="lin">Step + 1 each time: (k + i) mod M</option><option value="quad">Step + i² each time: (k + i²) mod M</option><option value="dbl">Step + h2(k) each time: (h1(k) + i·h2(k)) mod M</option></select></td></tr>
        <tr><td class="match-term">Quadratic probing</td><td><select class="match-def"><option value="">— choose —</option><option value="lin">Step + 1 each time: (k + i) mod M</option><option value="quad">Step + i² each time: (k + i²) mod M</option><option value="dbl">Step + h2(k) each time: (h1(k) + i·h2(k)) mod M</option></select></td></tr>
        <tr><td class="match-term">Double hashing</td><td><select class="match-def"><option value="">— choose —</option><option value="lin">Step + 1 each time: (k + i) mod M</option><option value="quad">Step + i² each time: (k + i²) mod M</option><option value="dbl">Step + h2(k) each time: (h1(k) + i·h2(k)) mod M</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-probe','fb-match-probe',['lin','quad','dbl'])">Check</button>
      <div class="fb" id="fb-match-probe"></div>
    </div>
    <div class="card">
      <h3>Which are collision-resolution techniques? (your quiz — select all)</h3>
      <div id="ma-hash">
        <label class="ma-item"><input type="checkbox"> Chaining</label>
        <label class="ma-item"><input type="checkbox"> Searching</label>
        <label class="ma-item"><input type="checkbox"> Logarithmic probing</label>
        <label class="ma-item"><input type="checkbox"> Linear probing</label>
        <label class="ma-item"><input type="checkbox"> Quadratic probing</label>
        <label class="ma-item"><input type="checkbox"> Hashing</label>
        <label class="ma-item"><input type="checkbox"> Double hashing</label>
      </div>
      <button class="btn small" style="margin-top:8px" onclick="maHash()">Check</button>
      <div class="fb" id="fb-ma-hash"></div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l16-diagram">
    <h2>Lesson 16 · Diagram It — Hash Table</h2>
    <div class="concept">Table size <b>M = 11</b>, <code>h(k) = k mod 11</code> (and <code>h2(k) = 7 − (k mod 7)</code> for double hashing). Pick a collision-resolution method, insert keys, and watch the <b>probe sequence</b> (amber) and where each key lands (green). Try inserting several keys that collide to see clustering build up.</div>
    <div class="card">
      <div class="toolbar">
        <button class="btn small" id="htm-chain" onclick="htSetMethod('chain')">Chaining</button>
        <button class="btn small" id="htm-lin" onclick="htSetMethod('lin')">Linear</button>
        <button class="btn small" id="htm-quad" onclick="htSetMethod('quad')">Quadratic</button>
        <button class="btn small" id="htm-dbl" onclick="htSetMethod('dbl')">Double</button>
      </div>
      <div class="toolbar">
        <input type="text" id="ht-val" placeholder="key (int)" style="width:90px">
        <button class="btn small" onclick="htInsert()">Insert</button>
        <button class="btn ghost small" onclick="htDemo()">Insert demo set</button>
        <button class="btn ghost small" onclick="htSetMethod(HTMETHOD)">Clear</button>
      </div>
      <div id="ht-cells" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;max-width:420px"></div>
      <div class="step-desc" id="ht-note"></div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l16-code">
    <h2>Lesson 16 · Code Writing</h2>
    <div class="concept">A hash function turns a key into an index; the collision strategy decides where to actually store it.</div>
    <div class="card">
      <h3>1. A string hash function</h3>
      <p>Write <code>hash(String s, int M)</code> = (sum of the characters' codes) mod M.</p>
      <textarea placeholder="int hash(String s, int M) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">int</span> <span class="fn">hash</span>(String s, <span class="ty">int</span> M) {
    <span class="ty">int</span> sum = <span class="nm">0</span>;
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nm">0</span>; i &lt; s.length(); i++)
        sum += s.charAt(i);        <span class="cm">// char auto-promotes to its int code</span>
    <span class="kw">return</span> sum % M;                <span class="cm">// map into 0..M-1</span>
}</pre>
        <div class="concept">O(1) if string lengths are bounded. The final <code>mod M</code> is what constrains the result to a valid table index.</div>
      </div>
    </div>
    <div class="card">
      <h3>2. put with linear probing</h3>
      <p>Write <code>put(int key)</code> for an <code>int[] table</code> of size M using linear probing (empty slots hold <code>-1</code>). Assume there is room.</p>
      <textarea placeholder="void put(int key) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">void</span> <span class="fn">put</span>(<span class="ty">int</span> key) {
    <span class="ty">int</span> i = <span class="nm">0</span>;
    <span class="ty">int</span> idx = key % M;
    <span class="kw">while</span> (table[idx] != -<span class="nm">1</span>) {   <span class="cm">// occupied → probe next</span>
        i++;
        idx = (key + i) % M;      <span class="cm">// linear: step by 1</span>
    }
    table[idx] = key;
}</pre>
        <div class="concept">Swap the one line <code>(key + i) % M</code> for <code>(key + i*i) % M</code> to get quadratic probing, or <code>(key%M + i*h2(key)) % M</code> for double hashing. For deletion, use a tombstone value the search skips but put can overwrite.</div>
      </div>
    </div>
  </section>
</main>`;

/* ---- style multiple-answer items ---- */
document.querySelectorAll('#l16 .ma-item').forEach(el=>{
  el.style.cssText='display:flex;align-items:center;gap:10px;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:6px 0;cursor:pointer;font-size:14px';
});
function maHash(){
  const correct=[0,3,4,6];   // Chaining, Linear, Quadratic, Double
  const items=document.querySelectorAll('#ma-hash .ma-item');
  let all=true;
  items.forEach((item,i)=>{ const ch=item.querySelector('input').checked, should=correct.indexOf(i)!==-1, ok=ch===should;
    item.style.borderColor=ok?'var(--green)':'var(--red)'; item.style.background=ok?'rgba(21,153,87,.14)':'rgba(192,57,43,.12)'; if(!ok)all=false; });
  const fb=document.getElementById('fb-ma-hash');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all ? '✓ Correct! Chaining, Linear probing, Quadratic probing, and Double hashing are all collision-resolution techniques.'
    : '✗ Not quite. The four techniques are <b>Chaining, Linear probing, Quadratic probing, Double hashing</b>. "Searching", "Logarithmic probing", and "Hashing" are not. Green rows are right as-is.';
}

/* ============================================================
   Interactive hash-table visualizer (M = 11)
   ============================================================ */
const HTM=11;
let HTMETHOD='chain', HT=[];
function htMethodName(m){ return m==='chain'?'Chaining':m==='lin'?'Linear probing':m==='quad'?'Quadratic probing':'Double hashing'; }
function htSetMethod(m){
  HTMETHOD=m; HT=[]; for(let i=0;i<HTM;i++) HT[i]=(m==='chain')?[]:null;
  ['chain','lin','quad','dbl'].forEach(x=>{ const b=document.getElementById('htm-'+x); if(b) b.className='btn small'+(x===m?'':' ghost'); });
  htRender([],-1,'Method: <b>'+htMethodName(m)+'</b>. M = 11, h(k) = k mod 11'+(m==='dbl'?', h2(k) = 7 − (k mod 7)':'')+(m==='lin'?', h(k,i) = (k + i) mod 11':'')+(m==='quad'?', h(k,i) = (k + i²) mod 11':'')+'. Insert keys to watch the probe sequence.');
}
function htInsert(){
  const inp=document.getElementById('ht-val'); let k=parseInt(inp.value); if(isNaN(k)) k=Math.floor(Math.random()*90); inp.value='';
  if(HTMETHOD==='chain'){ const idx=((k%HTM)+HTM)%HTM; HT[idx].unshift(k); htRender([idx],idx,'h('+k+') = '+k+' mod 11 = '+idx+'. Prepended '+k+' to the chain at index '+idx+' — O(1), no probing.'); return; }
  const probed=[];
  for(let i=0;i<HTM;i++){
    let idx;
    if(HTMETHOD==='lin') idx=(k+i)%HTM;
    else if(HTMETHOD==='quad') idx=(k+i*i)%HTM;
    else idx=((k%HTM)+i*(7-(k%7)))%HTM;
    idx=((idx%HTM)+HTM)%HTM; probed.push(idx);
    if(HT[idx]===null){ HT[idx]=k; htRender(probed,idx,'Inserted '+k+' at index '+idx+' after '+i+' collision'+(i===1?'':'s')+'. Probe sequence: '+probed.join(' → ')+'.'); return; }
  }
  htRender(probed,-1,'⚠ Cannot insert '+k+': after 11 probes every slot in the sequence ('+probed.join(' → ')+') was occupied — the clustering/cycle failure.');
}
function htDemo(){
  htSetMethod(HTMETHOD);
  [0,1,8,9,41,33,45,42,61,53].forEach(k=>{
    if(HTMETHOD==='chain'){ HT[((k%HTM)+HTM)%HTM].unshift(k); return; }
    for(let i=0;i<HTM;i++){ let idx; if(HTMETHOD==='lin')idx=(k+i)%HTM; else if(HTMETHOD==='quad')idx=(k+i*i)%HTM; else idx=((k%HTM)+i*(7-(k%7)))%HTM; idx=((idx%HTM)+HTM)%HTM; if(HT[idx]===null){HT[idx]=k;break;} }
  });
  htRender([],-1,'Inserted the demo set [0, 1, 8, 9, 41, 33, 45, 42, 61, 53] with <b>'+htMethodName(HTMETHOD)+'</b>. Compare how the keys cluster (or chain) across methods!');
}
function htRender(hi,fin,note){
  hi=hi||[];
  let html='';
  for(let i=0;i<HTM;i++){
    const on=hi.indexOf(i)!==-1, isf=(i===fin);
    const border=isf?'var(--green)':(on?'var(--amber)':'var(--line)');
    const bg=isf?'rgba(21,153,87,.2)':(on?'rgba(214,137,16,.2)':'transparent');
    let content;
    if(HTMETHOD==='chain') content = HT[i].length ? HT[i].join(' → ') : '<span class="muted">·</span>';
    else content = (HT[i]===null) ? '<span class="muted">·</span>' : HT[i];
    html+='<div style="display:flex;align-items:center;gap:8px;margin:3px 0"><div style="width:22px;text-align:right;color:var(--muted);font-family:monospace;font-size:12px">'+i+'</div><div style="flex:1;min-height:26px;background:'+bg+';border:1px solid '+border+';border-radius:6px;padding:4px 10px;font-family:monospace;font-weight:700">'+content+'</div></div>';
  }
  document.getElementById('ht-cells').innerHTML=html;
  document.getElementById('ht-note').innerHTML=note||'';
}
htSetMethod('lin');
