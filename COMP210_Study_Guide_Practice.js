/* ============================================================
   PRACTICE — extra code-writing + complexity problems.
   Injects into #practice. Loaded before the main engine.
   Complexity questions are multiple-choice (exact grading);
   code-writing questions use type-then-reveal.
   ============================================================ */
document.getElementById('practice').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'pr-time')">Time Complexity</button>
  <button onclick="showTopic(this,'pr-space')">Space Complexity</button>
  <button onclick="showTopic(this,'pr-rec')">Code: Recursion</button>
  <button onclick="showTopic(this,'pr-oop')">Code: Classes &amp; OOP</button>
  <button onclick="showTopic(this,'pr-int')">Code: Interfaces &amp; Tests</button>
</nav>
<main>

  <!-- ===================== TIME COMPLEXITY ===================== -->
  <section class="topic active" id="pr-time">
    <h2>Practice · Time Complexity <span class="muted" style="font-size:13px">(easy → exam-level)</span></h2>
    <div class="concept">For each snippet, give its Big-O in terms of <code>n</code> (or <code>n</code> and <code>k</code>). Remember: sequential statements <b>add</b> (keep the largest); nested loops <b>multiply</b>; a loop with a <b>constant</b> bound doesn't add an order.</div>

    <div class="card">
      <h3>1. Warm-up — single loop</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++) {
    sum += a[i];
}</pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(n²)</button><button class="opt" data-i="3">O(log n)</button>
        <div class="fb"><b>O(n)</b>. One loop of n iterations × O(1) body = O(n).</div>
      </div>
    </div>

    <div class="card">
      <h3>2. Two separate loops</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++) sum += a[i];
<span class="kw">for</span> (<span class="ty">int</span> j=<span class="nm">0</span>; j&lt;n; j++) prod *= a[j];</pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n²)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(2n) — you keep the 2</button><button class="opt" data-i="3">O(1)</button>
        <div class="fb"><b>O(n)</b>. The loops are <i>sequential</i>, not nested → you <b>add</b>: O(n) + O(n) = O(2n) = O(n). Drop the coefficient. (Nesting would multiply; running one after the other doesn't.)</div>
      </div>
    </div>

    <div class="card">
      <h3>3. No loop</h3>
<pre><span class="ty">int</span> x = a[<span class="nm">0</span>] + a[n-<span class="nm">1</span>];
<span class="kw">return</span> x * <span class="nm">2</span>;</pre>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(2)</button><button class="opt" data-i="3">O(log n)</button>
        <div class="fb"><b>O(1)</b>. A fixed number of operations regardless of n — array indexing and arithmetic are all constant time.</div>
      </div>
    </div>

    <div class="card">
      <h3>4. Nested loops</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++)
    <span class="kw">for</span> (<span class="ty">int</span> j=<span class="nm">0</span>; j&lt;n; j++)
        grid[i][j] = i*j;</pre>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(2n)</button><button class="opt" data-i="2">O(n²)</button><button class="opt" data-i="3">O(n log n)</button>
        <div class="fb"><b>O(n²)</b>. Nested loops multiply: n outer × n inner × O(1) body = O(n²).</div>
      </div>
    </div>

    <div class="card">
      <h3>5. Nested loop with a <i>constant</i> inner bound</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++)
    <span class="kw">for</span> (<span class="ty">int</span> j=<span class="nm">0</span>; j&lt;<span class="nm">100</span>; j++)   <span class="cm">// always 100 times</span>
        total += grid[i][j];</pre>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n²)</button><button class="opt" data-i="2">O(100n²)</button><button class="opt" data-i="3">O(1)</button>
        <div class="fb"><b>O(n)</b>. The inner loop runs a <b>fixed 100 times</b> — a constant, not tied to n. So it's n × 100 × O(1) = O(100n) = O(n). Watch for constant loop bounds!</div>
      </div>
    </div>

    <div class="card">
      <h3>6. Triangular nested loop</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++)
    <span class="kw">for</span> (<span class="ty">int</span> j=<span class="nm">0</span>; j&lt;i; j++)     <span class="cm">// inner grows with i</span>
        System.out.println(a[j]);</pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n²)</button><button class="opt" data-i="2">O(n log n)</button><button class="opt" data-i="3">O(log n)</button>
        <div class="fb"><b>O(n²)</b>. The inner loop runs 0+1+2+…+(n-1) = n(n-1)/2 total times ≈ ½n². Drop the constant ½ → O(n²). Even though each inner loop is short, they sum to a quadratic.</div>
      </div>
    </div>

    <div class="card">
      <h3>7. A loop that doubles the counter</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">1</span>; i&lt;n; i=i*<span class="nm">2</span>) {   <span class="cm">// 1, 2, 4, 8, ...</span>
    System.out.println(i);
}</pre>
      <div class="q" data-mc="3">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n²)</button><button class="opt" data-i="2">O(1)</button><button class="opt" data-i="3">O(log n)</button>
        <div class="fb"><b>O(log n)</b>. <code>i</code> doubles each pass, so it reaches n in about log₂ n steps. Anything that repeatedly <b>multiplies/divides</b> the counter (rather than adding) is logarithmic — same reason binary search is O(log n).</div>
      </div>
    </div>

    <div class="card">
      <h3>8. Exam-style — three loops, one with a fixed bound</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++)
    <span class="kw">for</span> (<span class="ty">int</span> j=i; j&lt;i+<span class="nm">8</span>; j++)   <span class="cm">// exactly 8 times</span>
        <span class="kw">for</span> (<span class="ty">int</span> k=<span class="nm">0</span>; k&lt;n; k++)
            x += i-j*k;</pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n³)</button><button class="opt" data-i="1">O(n²)</button><button class="opt" data-i="2">O(8n)</button><button class="opt" data-i="3">O(n)</button>
        <div class="fb"><b>O(n²)</b>. Outer ≈ n, middle is a <b>constant 8</b>, inner ≈ n → n × 8 × n = 8n² → O(n²). This is the exact trap from your L7 quiz: a middle loop with a constant bound does NOT make it cubic.</div>
      </div>
    </div>

    <div class="card">
      <h3>9. Two different arrays (lengths n and k)</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++)     <span class="cm">// a.length = n</span>
    <span class="kw">for</span> (<span class="ty">int</span> j=<span class="nm">0</span>; j&lt;k; j++)   <span class="cm">// b.length = k</span>
        compare(a[i], b[j]);</pre>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n²)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(nk)</button><button class="opt" data-i="3">O(n+k)</button>
        <div class="fb"><b>O(nk)</b>. When the two loop bounds are <b>different variables</b>, you keep both: n outer × k inner = O(nk). Don't collapse it to n² — that would only be right if k were also n.</div>
      </div>
    </div>

    <div class="card">
      <h3>10. Recursion — halving</h3>
<pre><span class="kw">static void</span> <span class="fn">search</span>(<span class="ty">int</span>[] a, <span class="ty">int</span> lo, <span class="ty">int</span> hi, <span class="ty">int</span> key) {
    <span class="kw">if</span> (lo &gt; hi) <span class="kw">return</span>;
    <span class="ty">int</span> mid = (lo+hi)/<span class="nm">2</span>;
    <span class="kw">if</span> (a[mid]==key) <span class="kw">return</span>;
    <span class="kw">if</span> (key &lt; a[mid]) <span class="fn">search</span>(a, lo, mid-<span class="nm">1</span>, key);
    <span class="kw">else</span> <span class="fn">search</span>(a, mid+<span class="nm">1</span>, hi, key);
}</pre>
      <div class="q" data-mc="3">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n²)</button><button class="opt" data-i="2">O(2ⁿ)</button><button class="opt" data-i="3">O(log n)</button>
        <div class="fb"><b>O(log n)</b>. This is binary search: each call throws away half the array and makes just <b>one</b> recursive call. Halving → log n levels, O(1) work each.</div>
      </div>
    </div>

    <div class="card">
      <h3>11. Recursion — double branching</h3>
<pre><span class="kw">static int</span> <span class="fn">f</span>(<span class="ty">int</span> n) {
    <span class="kw">if</span> (n &lt;= <span class="nm">1</span>) <span class="kw">return</span> n;
    <span class="kw">return</span> <span class="fn">f</span>(n-<span class="nm">1</span>) + <span class="fn">f</span>(n-<span class="nm">2</span>);
}</pre>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Big-O?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n log n)</button><button class="opt" data-i="2">O(2ⁿ)</button><button class="opt" data-i="3">O(log n)</button>
        <div class="fb"><b>O(2ⁿ)</b>. This is Fibonacci: two recursive calls per call, each barely smaller than n, so the call count roughly doubles each level → exponential. (Contrast with #10, which makes only one call and shrinks by half.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== SPACE COMPLEXITY ===================== -->
  <section class="topic" id="pr-space">
    <h2>Practice · Space Complexity</h2>
    <div class="concept">Give the <b>auxiliary</b> space (extra memory the algorithm allocates, <b>excluding the input</b>). A fixed set of variables → O(1). A new array/list sized by n → O(n). Recursion depth counts too: d levels deep → O(d) stack space.</div>

    <div class="card">
      <h3>1. A few counters</h3>
<pre><span class="ty">int</span> max = a[<span class="nm">0</span>], min = a[<span class="nm">0</span>];
<span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++) { ... }</pre>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Auxiliary space?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(1)</b>. Just a fixed handful of variables no matter how big n is. The input array doesn't count.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. Building a copy</h3>
<pre><span class="ty">int</span>[] copy = <span class="kw">new</span> <span class="ty">int</span>[n];
<span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++) copy[i] = a[i]*<span class="nm">2</span>;</pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Auxiliary space?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(n)</b>. <code>new int[n]</code> allocates memory that grows with the input size. A <code>new</code> array sized by n is the classic O(n)-space tell.</div>
      </div>
    </div>

    <div class="card">
      <h3>3. A 2-D table</h3>
<pre><span class="ty">int</span>[][] dp = <span class="kw">new</span> <span class="ty">int</span>[n][n];</pre>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Auxiliary space?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(n²)</b>. An n×n grid holds n² cells → quadratic space.</div>
      </div>
    </div>

    <div class="card">
      <h3>4. In-place swapping (bubble-sort inner logic)</h3>
<pre><span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n-<span class="nm">1</span>; i++)
    <span class="kw">if</span> (a[i] &gt; a[i+<span class="nm">1</span>]) {
        <span class="ty">int</span> t = a[i]; a[i]=a[i+<span class="nm">1</span>]; a[i+<span class="nm">1</span>]=t;
    }</pre>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Auxiliary space?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(1)</b>. It rearranges the input array in place using only a single temp variable <code>t</code> — no new array. (This is why bubble sort is O(1) space even though it's O(n²) time.)</div>
      </div>
    </div>

    <div class="card">
      <h3>5. Fixed-size buffer, regardless of n</h3>
<pre><span class="ty">int</span>[] counts = <span class="kw">new</span> <span class="ty">int</span>[<span class="nm">256</span>];   <span class="cm">// always 256</span>
<span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++) counts[a[i]]++;</pre>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Auxiliary space?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(256n)</button>
        <div class="fb"><b>O(1)</b>. The array is a <b>constant</b> size (256) — it doesn't grow with n, so it's constant auxiliary space. Same trap as constant loop bounds, but for space.</div>
      </div>
    </div>

    <div class="card">
      <h3>6. Recursion depth</h3>
<pre><span class="kw">static int</span> <span class="fn">factorial</span>(<span class="ty">int</span> n) {
    <span class="kw">if</span> (n==<span class="nm">0</span>) <span class="kw">return</span> <span class="nm">1</span>;
    <span class="kw">return</span> n * <span class="fn">factorial</span>(n-<span class="nm">1</span>);
}</pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Auxiliary space (from the call stack)?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(2ⁿ)</button>
        <div class="fb"><b>O(n)</b>. It allocates no array, but it recurses n levels deep before hitting the base case, so n stack frames are alive at once → O(n) stack space. Recursion depth is real memory.</div>
      </div>
    </div>
  </section>

  <!-- ===================== CODE: RECURSION ===================== -->
  <section class="topic" id="pr-rec">
    <h2>Practice · Code Writing — Recursion</h2>
    <div class="concept">For each, write the method yourself first, then reveal to compare. Every one needs a <b>base case</b> (stops the recursion) and a <b>recursive case</b> (moves toward it).</div>

    <div class="card">
      <h3>1. Sum 1..n</h3>
      <p>Write <code>int sumTo(int n)</code> that returns 1 + 2 + … + n (assume n ≥ 0; <code>sumTo(0)</code> = 0).</p>
      <textarea placeholder="public static int sumTo(int n) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public static int</span> <span class="fn">sumTo</span>(<span class="ty">int</span> n) {
    <span class="kw">if</span> (n == <span class="nm">0</span>) <span class="kw">return</span> <span class="nm">0</span>;      <span class="cm">// base case</span>
    <span class="kw">return</span> n + <span class="fn">sumTo</span>(n - <span class="nm">1</span>);   <span class="cm">// recursive case</span>
}</pre>
        <div class="concept">Each call peels off <code>n</code> and adds it to the sum of everything below it. Base case <code>n==0</code> returns 0 so the additions can unwind.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. Power</h3>
      <p>Write <code>int power(int base, int exp)</code> that returns <code>base^exp</code> (assume exp ≥ 0; anything^0 = 1).</p>
      <textarea placeholder="public static int power(int base, int exp) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public static int</span> <span class="fn">power</span>(<span class="ty">int</span> base, <span class="ty">int</span> exp) {
    <span class="kw">if</span> (exp == <span class="nm">0</span>) <span class="kw">return</span> <span class="nm">1</span>;           <span class="cm">// base case: x^0 = 1</span>
    <span class="kw">return</span> base * <span class="fn">power</span>(base, exp - <span class="nm">1</span>); <span class="cm">// one fewer multiply</span>
}</pre>
        <div class="concept">Reduce the <i>exponent</i> toward 0 each call. <code>power(2,3)</code> = 2 * power(2,2) = 2*2*power(2,1) = 2*2*2*power(2,0) = 8.</div>
      </div>
    </div>

    <div class="card">
      <h3>3. Sum of an array</h3>
      <p>Write <code>int arraySum(int[] a, int i)</code> returning the sum of <code>a[i..end]</code>. Call it as <code>arraySum(a, 0)</code>.</p>
      <textarea placeholder="public static int arraySum(int[] a, int i) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public static int</span> <span class="fn">arraySum</span>(<span class="ty">int</span>[] a, <span class="ty">int</span> i) {
    <span class="kw">if</span> (i == a.length) <span class="kw">return</span> <span class="nm">0</span>;      <span class="cm">// past the end → nothing to add</span>
    <span class="kw">return</span> a[i] + <span class="fn">arraySum</span>(a, i + <span class="nm">1</span>); <span class="cm">// this element + the rest</span>
}</pre>
        <div class="concept">The index <code>i</code> is what shrinks toward the base case. When <code>i</code> reaches <code>a.length</code>, there's nothing left, so return 0.</div>
      </div>
    </div>

    <div class="card">
      <h3>4. Reverse a string</h3>
      <p>Write <code>String reverse(String s)</code> that returns <code>s</code> reversed (base case: empty or 1-char string).</p>
      <textarea placeholder="public static String reverse(String s) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public static</span> String <span class="fn">reverse</span>(String s) {
    <span class="kw">if</span> (s.length() &lt;= <span class="nm">1</span>) <span class="kw">return</span> s;              <span class="cm">// base case</span>
    <span class="kw">return</span> <span class="fn">reverse</span>(s.substring(<span class="nm">1</span>)) + s.charAt(<span class="nm">0</span>);
}</pre>
        <div class="concept">Peel off the first char, reverse the rest, then stick the first char on the <i>end</i>. <code>reverse("cat")</code> = reverse("at") + 'c' = "ta" + "c" = "tac".</div>
      </div>
    </div>

    <div class="card">
      <h3>5. Count down (and think about complexity)</h3>
      <p>Write <code>void countdown(int n)</code> that prints <code>n, n-1, …, 1</code> then stops. Then: what are its <b>time</b> and <b>space</b> complexity?</p>
      <textarea placeholder="public static void countdown(int n) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public static void</span> <span class="fn">countdown</span>(<span class="ty">int</span> n) {
    <span class="kw">if</span> (n == <span class="nm">0</span>) <span class="kw">return</span>;        <span class="cm">// base case</span>
    System.out.println(n);
    <span class="fn">countdown</span>(n - <span class="nm">1</span>);          <span class="cm">// one call, n shrinks by 1</span>
}</pre>
        <div class="concept"><b>Time O(n)</b> — n calls, O(1) work each (linear recursion). <b>Space O(n)</b> — it goes n frames deep on the call stack before unwinding.</div>
      </div>
    </div>
  </section>

  <!-- ===================== CODE: OOP ===================== -->
  <section class="topic" id="pr-oop">
    <h2>Practice · Code Writing — Classes &amp; OOP</h2>
    <div class="concept">Practice the anatomy: <code>private</code> fields, a constructor that sets them, and <code>public</code> methods (getters/setters) with validation. Fields use the class's leading-underscore convention.</div>

    <div class="card">
      <h3>1. Rectangle</h3>
      <p>Write a <code>Rectangle</code> class with private <code>_width</code> and <code>_height</code> (doubles), a constructor, a getter for each, and an <code>area()</code> method.</p>
      <textarea placeholder="public class Rectangle { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">Rectangle</span> {
    <span class="kw">private double</span> _width;
    <span class="kw">private double</span> _height;

    <span class="kw">public</span> <span class="fn">Rectangle</span>(<span class="ty">double</span> width, <span class="ty">double</span> height) {
        _width = width;
        _height = height;
    }

    <span class="kw">public double</span> <span class="fn">getWidth</span>()  { <span class="kw">return</span> _width; }
    <span class="kw">public double</span> <span class="fn">getHeight</span>() { <span class="kw">return</span> _height; }

    <span class="kw">public double</span> <span class="fn">area</span>() {
        <span class="kw">return</span> _width * _height;   <span class="cm">// derived property</span>
    }
}</pre>
        <div class="concept"><code>area()</code> is a good example of a <b>derived property</b> — it's computed from fields rather than stored, so there's no <code>_area</code> field to keep in sync.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. BankAccount with validation</h3>
      <p>Write a <code>BankAccount</code> with a private <code>_balance</code>, a constructor taking a starting balance, <code>getBalance()</code>, a <code>deposit(double amt)</code> that ignores non-positive amounts, and a <code>withdraw(double amt)</code> that refuses to overdraw.</p>
      <textarea placeholder="public class BankAccount { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">BankAccount</span> {
    <span class="kw">private double</span> _balance;

    <span class="kw">public</span> <span class="fn">BankAccount</span>(<span class="ty">double</span> startingBalance) {
        _balance = startingBalance;
    }

    <span class="kw">public double</span> <span class="fn">getBalance</span>() { <span class="kw">return</span> _balance; }

    <span class="kw">public void</span> <span class="fn">deposit</span>(<span class="ty">double</span> amt) {
        <span class="kw">if</span> (amt &lt;= <span class="nm">0</span>) <span class="kw">return</span>;         <span class="cm">// validate: ignore bad input</span>
        _balance += amt;
    }

    <span class="kw">public void</span> <span class="fn">withdraw</span>(<span class="ty">double</span> amt) {
        <span class="kw">if</span> (amt &lt;= <span class="nm">0</span> || amt &gt; _balance) <span class="kw">return</span>; <span class="cm">// no overdraw</span>
        _balance -= amt;
    }
}</pre>
        <div class="concept">The private field + validating methods are encapsulation in action: no outside code can set a negative balance, because the only doors in (<code>deposit</code>/<code>withdraw</code>) check first.</div>
      </div>
    </div>

    <div class="card">
      <h3>3. Student with a validating setter</h3>
      <p>Write a <code>Student</code> with private <code>_name</code> (String) and <code>_gpa</code> (double). Constructor sets the name; provide <code>getGpa()</code> and <code>setGpa(double gpa)</code> that only accepts values in 0.0–4.0.</p>
      <textarea placeholder="public class Student { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">Student</span> {
    <span class="kw">private</span> String _name;
    <span class="kw">private double</span> _gpa;

    <span class="kw">public</span> <span class="fn">Student</span>(String name) {
        _name = name;
        _gpa = <span class="nm">0.0</span>;
    }

    <span class="kw">public double</span> <span class="fn">getGpa</span>() { <span class="kw">return</span> _gpa; }

    <span class="kw">public void</span> <span class="fn">setGpa</span>(<span class="ty">double</span> gpa) {
        <span class="kw">if</span> (gpa &lt; <span class="nm">0.0</span> || gpa &gt; <span class="nm">4.0</span>) <span class="kw">return</span>; <span class="cm">// reject out-of-range</span>
        _gpa = gpa;
    }
}</pre>
        <div class="concept">A read-only-ish field with a guarded setter: the object can never hold a GPA outside 0–4, because that rule lives inside <code>setGpa</code>.</div>
      </div>
    </div>
  </section>

  <!-- ===================== CODE: INTERFACES & TESTS ===================== -->
  <section class="topic" id="pr-int">
    <h2>Practice · Code Writing — Interfaces &amp; Tests</h2>
    <div class="concept">An interface lists method <b>signatures</b> (no bodies); an implementing class provides the bodies as <code>public</code> methods. JUnit tests use <code>@BeforeEach</code> to set up and <code>@Test</code> methods with assertions.</div>

    <div class="card">
      <h3>1. Write an interface</h3>
      <p>Write an interface <code>Shape</code> that requires two methods: <code>double area()</code> and <code>double perimeter()</code>.</p>
      <textarea placeholder="public interface Shape { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public interface</span> <span class="ty">Shape</span> {
    <span class="ty">double</span> <span class="fn">area</span>();
    <span class="ty">double</span> <span class="fn">perimeter</span>();
}</pre>
        <div class="concept">Signatures only — each ends in a semicolon, no <code>{ }</code>, no fields. It's a contract, not an implementation.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. Implement the interface</h3>
      <p>Write a <code>Circle</code> class that <code>implements Shape</code>: private <code>_radius</code>, a constructor, and both required methods (<code>area = πr²</code>, <code>perimeter = 2πr</code>). Use <code>Math.PI</code>.</p>
      <textarea placeholder="public class Circle implements Shape { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">Circle</span> <span class="kw">implements</span> <span class="ty">Shape</span> {
    <span class="kw">private double</span> _radius;

    <span class="kw">public</span> <span class="fn">Circle</span>(<span class="ty">double</span> radius) {
        _radius = radius;
    }

    <span class="kw">public double</span> <span class="fn">area</span>() {
        <span class="kw">return</span> Math.PI * _radius * _radius;
    }

    <span class="kw">public double</span> <span class="fn">perimeter</span>() {
        <span class="kw">return</span> <span class="nm">2</span> * Math.PI * _radius;
    }
}</pre>
        <div class="concept">Because it keeps the <code>Shape</code> promise, a <code>Circle</code> <b>is a</b> <code>Shape</code> — so <code>Shape s = new Circle(3);</code> is legal. Both interface methods must be declared <code>public</code>.</div>
      </div>
    </div>

    <div class="card">
      <h3>3. Write JUnit tests</h3>
      <p>Write a test class <code>CircleTest</code> that, before each test, creates a <code>Circle</code> of radius 2, then tests that <code>area()</code> is about 12.566 (use a delta) and that the circle object is not null.</p>
      <textarea placeholder="public class CircleTest { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">import</span> org.junit.jupiter.api.Test;
<span class="kw">import</span> org.junit.jupiter.api.BeforeEach;
<span class="kw">import static</span> org.junit.jupiter.api.Assertions.*;

<span class="kw">public class</span> <span class="ty">CircleTest</span> {
    <span class="kw">private</span> Circle c;

    <span class="nm">@BeforeEach</span>
    <span class="kw">public void</span> <span class="fn">setup</span>() {
        c = <span class="kw">new</span> <span class="fn">Circle</span>(<span class="nm">2.0</span>);
    }

    <span class="nm">@Test</span>
    <span class="kw">public void</span> <span class="fn">testArea</span>() {
        assertEquals(<span class="nm">12.566</span>, c.area(), <span class="nm">0.001</span>); <span class="cm">// delta for doubles</span>
    }

    <span class="nm">@Test</span>
    <span class="kw">public void</span> <span class="fn">testNotNull</span>() {
        assertNotNull(c);
    }
}</pre>
        <div class="concept">The delta <code>0.001</code> matters: <code>area()</code> is a double, so you can't check exact equality. <code>assertEquals(expected, actual, delta)</code> passes if they're within the delta.</div>
      </div>
    </div>
  </section>
</main>`;
