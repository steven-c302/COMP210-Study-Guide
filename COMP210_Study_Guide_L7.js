/* ============================================================
   LESSON 7 — Big-O & Sorting.  Injects content into #l7 and
   runs an interactive bubble-sort visualizer. Loaded BEFORE the
   main engine (COMP210_Study_Guide.js), which wires up the
   generic .q / .match / .fillblank widgets afterward.
   ============================================================ */
document.getElementById('l7').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l7-basics')">Big-O Basics</button>
  <button onclick="showTopic(this,'l7-calc')">Calculating Complexity</button>
  <button onclick="showTopic(this,'l7-space')">Space Complexity</button>
  <button onclick="showTopic(this,'l7-binary')">Binary Search</button>
  <button onclick="showTopic(this,'l7-bubble')">Bubble Sort</button>
  <button onclick="showTopic(this,'l7-quick')">Quick Sort</button>
  <button onclick="showTopic(this,'l7-recursion')">Recursion Complexity</button>
</nav>
<main>

  <!-- BIG-O BASICS -->
  <section class="topic active" id="l7-basics">
    <h2>Lesson 7 · Big-O Basics</h2>
    <div class="concept"><b>Time complexity</b> = the relationship between an algorithm's running time <code>T(n)</code> and its <b>input size</b> <code>n</code> — i.e. how <code>T(n)</code> grows as <code>n</code> grows. <b>Big-O</b> describes the <b>worst-case</b> upper bound as <code>n → ∞</code>: keep only the highest-order term and drop coefficients and constants. So <code>T(n) = 3n² + 5n + 9</code> becomes <code>O(n²)</code>.</div>
    <div class="card">
      <h3>Fill in — definition</h3>
      <p>Time complexity is the relationship between
        <input type="text" class="fillblank lg" data-answer="algorithm running time" placeholder="?"> and
        <input type="text" class="fillblank" data-answer="input size" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>algorithm running time</b> and <b>input size</b> (matches your quiz). Written symbolically: how does <code>T(n)</code> grow with <code>n</code>?</div>
    </div>
    <div class="card">
      <h3>Fill in — the three cases</h3>
      <p>The 3 cases for an algorithm's time or space complexity are
        <input type="text" class="fillblank sm" data-answer="best" placeholder="?">,
        <input type="text" class="fillblank sm" data-answer="average" placeholder="?">, and
        <input type="text" class="fillblank sm" data-answer="worst" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all three</button>
      <div class="fb">Answers: <b>best</b>, <b>average</b>, <b>worst</b>. For linear search of a random array: best = 1 iteration <code>O(1)</code>, average = n/2 <code>O(n)</code>, worst = n <code>O(n)</code>. When a case isn't stated, assume <b>worst</b> case.</div>
    </div>
    <div class="card">
      <h3>Big-O vs Ω vs Θ</h3>
      <table class="match" id="match-bounds">
        <tr><td class="match-term">Big-O</td><td><select class="match-def"><option value="">— choose —</option><option value="up">Worst-case performance (upper bound)</option><option value="low">Best-case performance (lower bound)</option><option value="exact">Exact performance (tight bound)</option></select></td></tr>
        <tr><td class="match-term">Big-Ω (Omega)</td><td><select class="match-def"><option value="">— choose —</option><option value="up">Worst-case performance (upper bound)</option><option value="low">Best-case performance (lower bound)</option><option value="exact">Exact performance (tight bound)</option></select></td></tr>
        <tr><td class="match-term">Big-Θ (Theta)</td><td><select class="match-def"><option value="">— choose —</option><option value="up">Worst-case performance (upper bound)</option><option value="low">Best-case performance (lower bound)</option><option value="exact">Exact performance (tight bound)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-bounds','fb-match-bounds',['up','low','exact'])">Check</button>
      <div class="fb" id="fb-match-bounds"></div>
    </div>
    <div class="card">
      <h3>Match each complexity class to a familiar example</h3>
      <table class="match" id="match-classes">
        <tr><td class="match-term"><code>O(1)</code> constant</td><td><select class="match-def"><option value="">— choose —</option><option value="c1">Retrieving <code>a[i]</code> or a single statement</option><option value="logn">Binary search on a sorted array</option><option value="n">Linear search / one loop over n items</option><option value="nlogn">Quicksort (average case)</option><option value="n2">Bubble sort / two nested loops</option><option value="exp">Naive recursive Fibonacci</option></select></td></tr>
        <tr><td class="match-term"><code>O(log n)</code></td><td><select class="match-def"><option value="">— choose —</option><option value="c1">Retrieving <code>a[i]</code> or a single statement</option><option value="logn">Binary search on a sorted array</option><option value="n">Linear search / one loop over n items</option><option value="nlogn">Quicksort (average case)</option><option value="n2">Bubble sort / two nested loops</option><option value="exp">Naive recursive Fibonacci</option></select></td></tr>
        <tr><td class="match-term"><code>O(n)</code> linear</td><td><select class="match-def"><option value="">— choose —</option><option value="c1">Retrieving <code>a[i]</code> or a single statement</option><option value="logn">Binary search on a sorted array</option><option value="n">Linear search / one loop over n items</option><option value="nlogn">Quicksort (average case)</option><option value="n2">Bubble sort / two nested loops</option><option value="exp">Naive recursive Fibonacci</option></select></td></tr>
        <tr><td class="match-term"><code>O(n log n)</code></td><td><select class="match-def"><option value="">— choose —</option><option value="c1">Retrieving <code>a[i]</code> or a single statement</option><option value="logn">Binary search on a sorted array</option><option value="n">Linear search / one loop over n items</option><option value="nlogn">Quicksort (average case)</option><option value="n2">Bubble sort / two nested loops</option><option value="exp">Naive recursive Fibonacci</option></select></td></tr>
        <tr><td class="match-term"><code>O(n²)</code> quadratic</td><td><select class="match-def"><option value="">— choose —</option><option value="c1">Retrieving <code>a[i]</code> or a single statement</option><option value="logn">Binary search on a sorted array</option><option value="n">Linear search / one loop over n items</option><option value="nlogn">Quicksort (average case)</option><option value="n2">Bubble sort / two nested loops</option><option value="exp">Naive recursive Fibonacci</option></select></td></tr>
        <tr><td class="match-term"><code>O(2ⁿ)</code> exponential</td><td><select class="match-def"><option value="">— choose —</option><option value="c1">Retrieving <code>a[i]</code> or a single statement</option><option value="logn">Binary search on a sorted array</option><option value="n">Linear search / one loop over n items</option><option value="nlogn">Quicksort (average case)</option><option value="n2">Bubble sort / two nested loops</option><option value="exp">Naive recursive Fibonacci</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-classes','fb-match-classes',['c1','logn','n','nlogn','n2','exp'])">Check</button>
      <div class="fb" id="fb-match-classes"></div>
      <p class="muted" style="margin-top:10px">Growth order (slow → fast): <code>O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(n³) &lt; O(2ⁿ)</code>.</p>
    </div>
    <div class="card">
      <h3>True or False — dropping terms</h3>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span><code>T(n) = 5n² + 100n + 3000</code> simplifies to <code>O(n²)</code>.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. For large <code>n</code> the highest-order term dominates; coefficients and lower terms don't matter. Even the <code>100n</code> and <code>3000</code> are irrelevant asymptotically.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>The base of the logarithm doesn't matter in Big-O, so <code>log₂ n</code> and <code>log₁₀ n</code> are both written <code>O(log n)</code>.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True — logs of different bases differ only by a constant factor (<code>log₂ n = 3.32 · log₁₀ n</code>), and constants are dropped.</div>
      </div>
    </div>
  </section>

  <!-- CALCULATING COMPLEXITY -->
  <section class="topic" id="l7-calc">
    <h2>Lesson 7 · Calculating Complexity</h2>
    <div class="concept">Analyze code piece by piece, then combine: a <b>series of statements</b> takes the largest individual cost; a <b>loop</b> is (worst-case iterations) × (cost of body); <b>nested loops</b> multiply; an <b>if/else</b> is the test plus the biggest branch; a <b>method call</b> costs the body plus its argument expressions.</div>
    <div class="card">
      <h3>Match each code construct to its complexity rule</h3>
      <table class="match" id="match-rules">
        <tr><td class="match-term">If / then / else</td><td><select class="match-def"><option value="">— choose —</option><option value="ite">Largest of O(test expressions), O(then), O(else)</option><option value="mc">Larger of O(expression for parameter values) and O(method body)</option><option value="dc">Amount of work at each level × number of levels</option><option value="ex">O(1) or O(most expensive method call)</option><option value="lp">Worst-case # of iterations × O(loop body)</option><option value="ss">Largest O(individual statement)</option></select></td></tr>
        <tr><td class="match-term">Method call</td><td><select class="match-def"><option value="">— choose —</option><option value="ite">Largest of O(test expressions), O(then), O(else)</option><option value="mc">Larger of O(expression for parameter values) and O(method body)</option><option value="dc">Amount of work at each level × number of levels</option><option value="ex">O(1) or O(most expensive method call)</option><option value="lp">Worst-case # of iterations × O(loop body)</option><option value="ss">Largest O(individual statement)</option></select></td></tr>
        <tr><td class="match-term">Divide &amp; conquer algorithm</td><td><select class="match-def"><option value="">— choose —</option><option value="ite">Largest of O(test expressions), O(then), O(else)</option><option value="mc">Larger of O(expression for parameter values) and O(method body)</option><option value="dc">Amount of work at each level × number of levels</option><option value="ex">O(1) or O(most expensive method call)</option><option value="lp">Worst-case # of iterations × O(loop body)</option><option value="ss">Largest O(individual statement)</option></select></td></tr>
        <tr><td class="match-term">Expressions / single statements</td><td><select class="match-def"><option value="">— choose —</option><option value="ite">Largest of O(test expressions), O(then), O(else)</option><option value="mc">Larger of O(expression for parameter values) and O(method body)</option><option value="dc">Amount of work at each level × number of levels</option><option value="ex">O(1) or O(most expensive method call)</option><option value="lp">Worst-case # of iterations × O(loop body)</option><option value="ss">Largest O(individual statement)</option></select></td></tr>
        <tr><td class="match-term">Loop</td><td><select class="match-def"><option value="">— choose —</option><option value="ite">Largest of O(test expressions), O(then), O(else)</option><option value="mc">Larger of O(expression for parameter values) and O(method body)</option><option value="dc">Amount of work at each level × number of levels</option><option value="ex">O(1) or O(most expensive method call)</option><option value="lp">Worst-case # of iterations × O(loop body)</option><option value="ss">Largest O(individual statement)</option></select></td></tr>
        <tr><td class="match-term">Series of statements</td><td><select class="match-def"><option value="">— choose —</option><option value="ite">Largest of O(test expressions), O(then), O(else)</option><option value="mc">Larger of O(expression for parameter values) and O(method body)</option><option value="dc">Amount of work at each level × number of levels</option><option value="ex">O(1) or O(most expensive method call)</option><option value="lp">Worst-case # of iterations × O(loop body)</option><option value="ss">Largest O(individual statement)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-rules','fb-match-rules',['ite','mc','dc','ex','lp','ss'])">Check</button>
      <div class="fb" id="fb-match-rules"></div>
      <p class="muted" style="margin-top:8px">This is the 2-point matching question from your quiz.</p>
    </div>
    <div class="card">
      <h3>Worked example — one loop (<code>findMax</code>)</h3>
<pre><span class="kw">public static int</span> <span class="fn">findMax</span>(<span class="ty">int</span>[] data) {
    <span class="ty">int</span> max = data[<span class="nm">0</span>];            <span class="cm">// O(1)</span>
    <span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;data.length; i++) { <span class="cm">// n iterations</span>
        <span class="kw">if</span> (data[i] &gt; max) max = data[i]; <span class="cm">// O(1) body</span>
    }
    <span class="kw">return</span> max;                     <span class="cm">// O(1)</span>
}</pre>
      <div class="q">
        <div class="prompt"><span class="tag">Fill in</span>In terms of <code>n = data.length</code>, O(findMax) =
          <input type="text" class="fillblank sm" data-answer="o(n)" placeholder="O(?)"><button class="btn small" onclick="checkFill(this)">Check</button></div>
        <div class="fb">Answer: <b>O(n)</b>. One loop of n iterations with an O(1) body → n × O(1) = O(n). The surrounding O(1) statements don't change the order.</div>
      </div>
    </div>
    <div class="card">
      <h3>Worked example — nested loops (<code>SumArray</code>)</h3>
      <p class="muted">From <code>nestedLoops/SumArray.java</code>. Match each to its complexity:</p>
      <table class="match" id="match-nested">
        <tr><td class="match-term"><code>singleLoop</code> — one loop to n</td><td><select class="match-def"><option value="">— choose —</option><option value="n">O(n)</option><option value="n2">O(n²)</option><option value="n3">O(n³)</option></select></td></tr>
        <tr><td class="match-term"><code>doublyNestedLoop</code> — loop in a loop</td><td><select class="match-def"><option value="">— choose —</option><option value="n">O(n)</option><option value="n2">O(n²)</option><option value="n3">O(n³)</option></select></td></tr>
        <tr><td class="match-term"><code>triplyNestedLoop</code> — three deep</td><td><select class="match-def"><option value="">— choose —</option><option value="n">O(n)</option><option value="n2">O(n²)</option><option value="n3">O(n³)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-nested','fb-match-nested',['n','n2','n3'])">Check</button>
      <div class="fb" id="fb-match-nested"></div>
      <p class="muted" style="margin-top:8px">Nested loops <b>multiply</b>: each level over n items multiplies the work by n. If n doubles, O(n²) time quadruples and O(n³) time goes up 8×.</p>
    </div>
    <div class="card">
      <h3>Trickier — constant inner loop</h3>
<pre><span class="kw">public static long</span> <span class="fn">fun</span>(<span class="ty">int</span> N) {
    <span class="ty">int</span> x = <span class="nm">2</span>;
    <span class="kw">for</span> (<span class="ty">int</span> i=N; i&gt;<span class="nm">0</span>; i--) {        <span class="cm">// ~N times</span>
        <span class="kw">for</span> (<span class="ty">int</span> j=i; j&lt;i+<span class="nm">8</span>; j++) {   <span class="cm">// exactly 8 times</span>
            <span class="kw">for</span> (<span class="ty">int</span> k=<span class="nm">0</span>; k&lt;i; k++) { <span class="cm">// ~N times</span>
                x += i-j*k;
            }
        }
    }
    <span class="kw">return</span> x;
}</pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>In terms of N, O(fun) = ?</div>
        <button class="opt" data-i="0">O(n³)</button>
        <button class="opt" data-i="1">O(n²)</button>
        <button class="opt" data-i="2">O(n)</button>
        <div class="fb"><b>O(n²)</b>. The middle loop runs a <b>fixed 8 times</b> (a constant), so it doesn't add an order of n. Only the outer (≈N) and inner (≈N) loops scale → N × 8 × N = 8N² → O(n²). Watch for loops with constant bounds!</div>
      </div>
    </div>
  </section>

  <!-- SPACE COMPLEXITY -->
  <section class="topic" id="l7-space">
    <h2>Lesson 7 · Space Complexity</h2>
    <div class="concept"><b>Space complexity S(n)</b> = the <b>additional / auxiliary</b> memory an algorithm uses, <b>excluding the input itself</b>. A few loop variables → <code>O(1)</code>. Allocating a new array proportional to the input → <code>O(n)</code>.</div>
    <div class="card">
      <h3>O(1) vs O(n) space</h3>
      <div class="two">
        <div><p class="muted"><code>findMax</code> — just a couple of locals</p>
<pre><span class="ty">int</span> max = data[<span class="nm">0</span>];
<span class="ty">int</span> i;
<span class="cm">// no new array → O(1) space</span></pre></div>
        <div><p class="muted"><code>copyArray</code> (SpaceComplexity.java) — new array of size n</p>
<pre><span class="ty">int</span>[] yCopy = <span class="kw">new</span> <span class="ty">int</span>[y.length];
<span class="kw">for</span> (...) yCopy[i] = y[i];
<span class="cm">// allocates n extra slots → O(n) space</span></pre></div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What is the auxiliary space complexity of <code>copyArray</code>?</div>
        <button class="opt" data-i="0">O(1)</button>
        <button class="opt" data-i="1">O(n)</button>
        <button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(n)</b>. It allocates a brand-new array of size <code>n</code>, so the extra memory grows linearly with input size. (The input array itself doesn't count toward auxiliary space.)</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Time and space can be competing criteria — an algorithm that uses less space may take more time, and vice versa.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. It's a trade-off. The slides note: if you run out of space the algorithm fails, whereas a slow algorithm at least finishes eventually — so which is "better" depends on the situation.</div>
      </div>
    </div>
  </section>

  <!-- BINARY SEARCH -->
  <section class="topic" id="l7-binary">
    <h2>Lesson 7 · Binary Search — O(log n)</h2>
    <div class="concept"><b>Binary search</b> finds a key in a <b>sorted</b> array by repeatedly checking the <b>middle</b> element and throwing away half the array each time: if the middle equals the key, done; if the key is smaller, search the bottom half; if larger, search the top half. Halving each step gives <code>O(log n)</code>.</div>
    <div class="card">
      <h3>Worked trace</h3>
      <p class="muted">Search for <code>key = 10</code> in the sorted array <code>a = [3, 4, 5, 6, 10, 20, 25]</code> (n = 7).</p>
<pre>Step 1: whole array, middle index 3 → a[3] = 6.  10 &gt; 6 → search TOP half.
Step 2: [10, 20, 25], middle → 20.               10 &lt; 20 → search BOTTOM half.
Step 3: [10], middle → 10.                        10 == 10 → FOUND (3 steps).</pre>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Why must the array be <b>sorted</b> for binary search to work?</div>
        <button class="opt" data-i="0">Sorting makes the array smaller.</button>
        <button class="opt" data-i="1">So the middle element is always the answer.</button>
        <button class="opt" data-i="2">Because comparing to the middle only tells you which half to keep if the data is in order.</button>
        <div class="fb">Sorted order is what lets one comparison eliminate half the elements. On unsorted data, "less than the middle" tells you nothing about where the key is.</div>
      </div>
      <div class="q">
        <div class="prompt"><span class="tag">Fill in</span>The time complexity of binary search is
          <input type="text" class="fillblank sm" data-answer="o(log n)" placeholder="O(?)"><button class="btn small" onclick="checkFill(this)">Check</button></div>
        <div class="fb">Answer: <b>O(log n)</b>. Each step halves the search space, so it takes about <code>log₂ n + 1</code> steps. (This relies on <code>a[i]</code> being O(1) — true for arrays, but not for every data structure!)</div>
      </div>
      <div class="q" data-tf="F">
        <div class="prompt"><span class="tag">T / F</span>Binary search is O(log n) no matter what data structure holds the data.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">False — it's O(log n) <i>because</i> array indexing <code>a[i]</code> is O(1). On a structure where reaching the middle isn't O(1) (e.g. a linked list), the analysis changes. Complexity depends on the data structure used.</div>
      </div>
    </div>
  </section>

  <!-- BUBBLE SORT -->
  <section class="topic" id="l7-bubble">
    <h2>Lesson 7 · Bubble Sort — O(n²)</h2>
    <div class="concept"><b>Bubble sort</b> makes repeated <b>passes</b> over the list. In each pass it compares each adjacent pair and swaps them if the left is greater than the right, so the largest remaining value "bubbles" to the end. Each pass stops one element earlier (the tail is already sorted). It finishes when a full pass makes <b>zero swaps</b>.</div>
    <div class="card">
      <h3>Interactive — step through a bubble sort</h3>
      <p class="muted">Array: <code>[5, 1, 4, 2, 8]</code>. Step through each comparison and swap.
      <br><span style="color:var(--amber)">▮ comparing</span> &nbsp; <span style="color:var(--red)">▮ swapped</span> &nbsp; <span style="color:var(--green)">▮ sorted/locked</span> &nbsp; <span style="color:var(--stack)">▮ unsorted</span></p>
      <div id="bs-bars" style="display:flex;align-items:flex-end;gap:10px;height:180px;padding:10px;background:#0b1119;border:1px solid var(--line);border-radius:10px"></div>
      <div class="step-desc" id="bs-note"></div>
      <div class="toolbar" style="justify-content:space-between">
        <div><button class="btn ghost small" onclick="bsStep(-1)">◀ Back</button>
        <button class="btn small" onclick="bsStep(1)">Next ▶</button>
        <button class="btn ghost small" onclick="bsReset()">⟲ Restart</button></div>
        <span class="score-badge" id="bs-counter"></span>
      </div>
    </div>
    <div class="card">
      <h3>Complexity</h3>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Bubble sort's average and worst case time complexity are both <code>O(n²)</code>.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (matches your quiz). It walks the array (O(n)) up to n times → O(n²). (Best case, an already-sorted array, is O(n) — one clean pass with no swaps.)</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>What is bubble sort's <b>space</b> complexity?</div>
        <button class="opt" data-i="0">O(1) — it swaps in place, needing no extra array</button>
        <button class="opt" data-i="1">O(n) — it copies the array each pass</button>
        <button class="opt" data-i="2">O(n²) — one slot per comparison</button>
        <div class="fb"><b>O(1)</b>. Bubble sort sorts <b>in place</b> using only a temp variable for swaps — no auxiliary space that grows with n.</div>
      </div>
    </div>
  </section>

  <!-- QUICK SORT -->
  <section class="topic" id="l7-quick">
    <h2>Lesson 7 · Quick Sort — divide &amp; conquer</h2>
    <div class="concept"><b>Quick sort</b> is a <b>divide-and-conquer</b> algorithm: pick a <b>pivot</b>, <b>partition</b> the array so everything smaller than the pivot is on its left and everything larger is on its right (the pivot lands in its final sorted spot), then <b>recurse</b> on the left and right sub-arrays. Base case: a sub-array of one element is already sorted.</div>
    <div class="card">
      <h3>The steps</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>After one <b>partition</b> around a pivot, what is guaranteed?</div>
        <button class="opt" data-i="0">The whole array is sorted.</button>
        <button class="opt" data-i="1">The pivot is in its final sorted position, with all smaller elements left of it and all larger right of it.</button>
        <button class="opt" data-i="2">The array is reversed.</button>
        <div class="fb">Partitioning fixes the pivot's final spot and splits the rest into "smaller" and "larger" groups. Those groups aren't sorted yet — that's what the recursive calls handle.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Quick sort's recursion bottoms out (base case) when a sub-array has only one element, since a single element is already sorted.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True — a one-element sub-array needs no work, so the recursion stops there.</div>
      </div>
    </div>
    <div class="card">
      <h3>Complexity — why two answers?</h3>
      <table class="match" id="match-quick">
        <tr><td class="match-term">Average case</td><td><select class="match-def"><option value="">— choose —</option><option value="nlogn">O(n log n) — pivots split the array roughly in half → ~log n levels, O(n) work per level</option><option value="n2">O(n²) — a poor pivot barely splits the array → ~n levels, O(n) work per level</option></select></td></tr>
        <tr><td class="match-term">Worst case</td><td><select class="match-def"><option value="">— choose —</option><option value="nlogn">O(n log n) — pivots split the array roughly in half → ~log n levels, O(n) work per level</option><option value="n2">O(n²) — a poor pivot barely splits the array → ~n levels, O(n) work per level</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-quick','fb-match-quick',['nlogn','n2'])">Check</button>
      <div class="fb" id="fb-match-quick"></div>
      <p class="muted" style="margin-top:8px">Both cases do <b>O(n)</b> work partitioning at each level. The difference is the number of <b>levels</b>: good pivots → ~log n levels (O(n log n)); bad pivots (already-sorted-ish input, always picking an extreme) → ~n levels (O(n²)). That's why the pivot is often chosen randomly.</p>
    </div>
  </section>

  <!-- RECURSION COMPLEXITY -->
  <section class="topic" id="l7-recursion">
    <h2>Lesson 7 · Complexity of Recursive Algorithms</h2>
    <div class="concept">For recursion, complexity = (number of calls / levels) × (work done per call / level). Three common shapes: <b>linear</b>, <b>divide &amp; conquer</b>, and <b>exponential</b>.</div>
    <div class="card">
      <h3>Match each recursion shape to its analysis</h3>
      <table class="match" id="match-rec7">
        <tr><td class="match-term">Linear recursion<br><span class="muted">e.g. factorial</span></td><td><select class="match-def"><option value="">— choose —</option><option value="lin">n calls × O(1) work each → O(n)</option><option value="dc">~log n levels × O(n) work per level (good split) → O(n log n)</option><option value="exp">Calls multiply by a factor each time n grows by 1 → O(2ⁿ)</option></select></td></tr>
        <tr><td class="match-term">Divide &amp; conquer<br><span class="muted">e.g. quicksort (avg)</span></td><td><select class="match-def"><option value="">— choose —</option><option value="lin">n calls × O(1) work each → O(n)</option><option value="dc">~log n levels × O(n) work per level (good split) → O(n log n)</option><option value="exp">Calls multiply by a factor each time n grows by 1 → O(2ⁿ)</option></select></td></tr>
        <tr><td class="match-term">Exponential recursion<br><span class="muted">e.g. naive Fibonacci</span></td><td><select class="match-def"><option value="">— choose —</option><option value="lin">n calls × O(1) work each → O(n)</option><option value="dc">~log n levels × O(n) work per level (good split) → O(n log n)</option><option value="exp">Calls multiply by a factor each time n grows by 1 → O(2ⁿ)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-rec7','fb-match-rec7',['lin','dc','exp'])">Check</button>
      <div class="fb" id="fb-match-rec7"></div>
    </div>
    <div class="card">
      <h3>Spot the exponential</h3>
<pre><span class="kw">public static int</span> <span class="fn">fib</span>(<span class="ty">int</span> x) {
    <span class="kw">if</span> (x == <span class="nm">0</span>) <span class="kw">return</span> <span class="nm">0</span>;
    <span class="kw">if</span> (x == <span class="nm">1</span>) <span class="kw">return</span> <span class="nm">1</span>;
    <span class="kw">return</span> <span class="fn">fib</span>(x-<span class="nm">1</span>) + <span class="fn">fib</span>(x-<span class="nm">2</span>);
}</pre>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>What is O(fib)?</div>
        <button class="opt" data-i="0">O(n)</button>
        <button class="opt" data-i="1">O(n log n)</button>
        <button class="opt" data-i="2">O(2ⁿ)</button>
        <div class="fb"><b>O(2ⁿ)</b>. Each call spawns <b>two</b> more, so the number of calls roughly doubles every time <code>x</code> grows by 1 — the tell-tale sign of exponential recursion. (Compare to divide &amp; conquer, where each call shrinks the problem instead of duplicating it.)</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Recall <code>recur(4)</code> from Lesson 4: <code>return recur(n-1) * recur(n-1)</code>. What made it explode to 15 calls?</div>
        <button class="opt" data-i="0">Each call makes two recursive calls, so the count doubles per level — exponential, like fib.</button>
        <button class="opt" data-i="1">It allocated a big array.</button>
        <button class="opt" data-i="2">It was O(log n).</button>
        <div class="fb">Same pattern as <code>fib</code>: two calls per call → the call tree doubles each level (1+2+4+8 = 15 for n=4). Two branching recursive calls = exponential blow-up.</div>
      </div>
    </div>
  </section>
</main>`;

/* ============================================================
   Interactive bubble-sort visualizer
   ============================================================ */
const BS_ARR=[5,1,4,2,8];
let BS_STEPS=[], bsIdx=0;
function bsGen(){
  let a=[...BS_ARR]; const n=a.length; const steps=[];
  steps.push({arr:[...a], sortedFrom:n, note:'Unsorted array. Bubble sort repeatedly compares adjacent pairs and swaps them if they are out of order.'});
  for(let pass=0; pass<n-1; pass++){
    let swapped=false;
    for(let k=0;k<n-1-pass;k++){
      steps.push({arr:[...a], cmp:[k,k+1], sortedFrom:n-pass, note:'Pass '+(pass+1)+': compare '+a[k]+' and '+a[k+1]+'.'});
      if(a[k]>a[k+1]){
        const t=a[k]; a[k]=a[k+1]; a[k+1]=t; swapped=true;
        steps.push({arr:[...a], swap:[k,k+1], sortedFrom:n-pass, note:a[k]+' &lt; '+a[k+1]+', so they were swapped.'});
      } else {
        steps.push({arr:[...a], keep:[k,k+1], sortedFrom:n-pass, note:'Already in order — no swap.'});
      }
    }
    steps.push({arr:[...a], sortedFrom:n-pass-1, note:'End of pass '+(pass+1)+'. The largest unsorted value has bubbled into position — it is now locked (green).'});
    if(!swapped){ steps.push({arr:[...a], sortedFrom:0, note:'A full pass happened with zero swaps → the array is sorted. Done!'}); break; }
  }
  steps.push({arr:[...a], sortedFrom:0, note:'Sorted! Bubble sort is O(n²) time (up to n passes of n comparisons) and O(1) space (sorts in place).'});
  return steps;
}
function bsRender(){
  const s=BS_STEPS[bsIdx];
  const max=Math.max(...s.arr);
  let h='';
  s.arr.forEach((v,idx)=>{
    let bg='var(--stack)';
    if(s.sortedFrom!==undefined && idx>=s.sortedFrom) bg='var(--green)';
    if(s.cmp && (idx===s.cmp[0]||idx===s.cmp[1])) bg='var(--amber)';
    if(s.keep && (idx===s.keep[0]||idx===s.keep[1])) bg='var(--amber)';
    if(s.swap && (idx===s.swap[0]||idx===s.swap[1])) bg='var(--red)';
    const ht=24+(v/max)*130;
    h+='<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end">'
      +'<div style="background:'+bg+';height:'+ht+'px;border-radius:6px 6px 0 0;color:#fff;font-weight:700;font-size:14px;text-align:center;padding-top:4px;transition:height .2s,background .2s">'+v+'</div></div>';
  });
  document.getElementById('bs-bars').innerHTML=h;
  document.getElementById('bs-note').innerHTML=s.note;
  document.getElementById('bs-counter').textContent='Step '+(bsIdx+1)+' / '+BS_STEPS.length;
}
function bsStep(d){bsIdx=Math.max(0,Math.min(BS_STEPS.length-1,bsIdx+d));bsRender();}
function bsReset(){bsIdx=0;bsRender();}
BS_STEPS=bsGen(); bsRender();
