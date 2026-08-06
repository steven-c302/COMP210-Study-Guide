/* ============================================================
   LESSON 6 — Interfaces, ADTs & Unit Testing.
   Injects content into #l6. Loaded before the main engine,
   which wires up the generic widgets afterward.
   ============================================================ */
document.getElementById('l6').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l6-encap')">Encapsulation</button>
  <button onclick="showTopic(this,'l6-interfaces')">Interfaces</button>
  <button onclick="showTopic(this,'l6-implement')">Implementing &amp; Types</button>
  <button onclick="showTopic(this,'l6-adts')">ADTs</button>
  <button onclick="showTopic(this,'l6-junit')">Unit Testing (JUnit)</button>
</nav>
<main>

  <section class="topic active" id="l6-encap">
    <h2>Lesson 6 · Encapsulation</h2>
    <div class="concept"><b>Encapsulation</b> — bundling data (fields) and methods into a single unit (a class) while <b>restricting direct external access</b> to that data. The recipe is two rules: <b>(1)</b> make all fields <code>private</code>, and <b>(2)</b> provide <code>public</code> methods — getters and/or setters — to retrieve or change them.</div>
    <div class="card">
      <h3>Fill in — the encapsulation recipe</h3>
      <p>For encapsulation, make all fields
        <input type="text" class="fillblank sm" data-answer="private" placeholder="?"> and provide
        <input type="text" class="fillblank sm" data-answer="public" placeholder="?"> getters and setters for those fields.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Straight from your quiz &amp; slide 4: fields <b>private</b> (locked down), accessors <b>public</b> (the controlled doors in).</div>
    </div>
    <div class="card">
      <h3>Benefits — why bother?</h3>
      <div class="q" data-mc="3">
        <div class="prompt"><span class="tag">Multiple choice</span>Which is <b>NOT</b> a benefit of encapsulation listed on the slides?</div>
        <button class="opt" data-i="0">You can make a "read-only" field by providing a getter but no setter.</button>
        <button class="opt" data-i="1">A setter can validate a new value to prevent illegal state.</button>
        <button class="opt" data-i="2">You can expose derived/complex properties computed from multiple fields.</button>
        <button class="opt" data-i="3">It makes your program run in less memory automatically.</button>
        <div class="fb">The three real benefits (slide 4): read-only fields (no setter), validating setters, and derived properties. Encapsulation is about <b>control and safety</b>, not automatic memory savings.</div>
      </div>
    </div>
    <div class="card">
      <h3>Encapsulated vs. NOT — the danger</h3>
      <p class="muted">In <code>nonEncapsulated/</code>, <code>Point</code>'s fields have no <code>private</code>, so outside code can reach right in and corrupt a triangle:</p>
<pre><span class="cm">// Perimeter.java (nonEncapsulated) — this compiles and runs!</span>
t1._a._x += 5;        <span class="cm">// reaching directly into private data</span>
t1._a = t1._c;        <span class="cm">// now two corners are the same point</span></pre>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Why is the encapsulated version (fields <code>private</code>) safer?</div>
        <button class="opt" data-i="0">Outside code physically cannot touch the fields, so it can't put the object into a broken state — all changes must go through validated methods.</button>
        <button class="opt" data-i="1">Private fields make the math more accurate.</button>
        <button class="opt" data-i="2">Private fields run faster than public ones.</button>
        <div class="fb">With <code>private</code> fields, <code>t1._a._x += 5</code> won't even compile. Callers are forced through methods that can enforce the object's rules (like the co-linearity check in the real <code>Triangle</code>).</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Interfaces achieve the same hiding idea as encapsulation: they expose public methods while letting each implementing class keep its internal fields and implementation hidden.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True — slide 4 makes this link. An interface says <i>what</i> methods exist; the class hides <i>how</i>.</div>
      </div>
    </div>
  </section>

  <section class="topic" id="l6-interfaces">
    <h2>Lesson 6 · Interfaces</h2>
    <div class="concept">A <b>class</b> defines a data type. An <b>interface</b> defines an <b>abstract data type (ADT)</b> — it lists a set of public methods that must be available, separating <b>what</b> a type can do from <b>how</b> it does it. It's a <b>contract</b>: any class that implements it promises to provide those methods.</div>
    <div class="card">
      <h3>Anatomy of an interface</h3>
      <p class="muted">Own file, like a class. Body is just method <b>signatures</b> — no bodies, no fields. From <code>oneInterface/Point.java</code>:</p>
<pre><span class="kw">public interface</span> <span class="ty">Point</span> {
    <span class="ty">double</span> <span class="fn">getX</span>();
    <span class="ty">double</span> <span class="fn">getY</span>();
    <span class="ty">double</span> <span class="fn">distanceTo</span>(Point p);
    <span class="kw">boolean</span> <span class="fn">equals</span>(Point p);
}</pre>
      <div class="q" data-tf="F">
        <div class="prompt"><span class="tag">T / F</span>A normal interface method includes a body (the actual code) between curly braces.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">False — a method signature ends in a semicolon with no <code>{ }</code>. The body lives in the implementing class. (Exception: <code>default</code> methods, below.)</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>An interface can define <code>static</code> methods/fields and <code>default</code> instance methods — but a <code>default</code> method may only call other interface methods, not access fields directly.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">Slide 9. A <code>default</code> method can provide a body <i>because</i> it relies only on other interface methods (e.g. <code>get2X()</code> calls <code>getX()</code>) — it never touches fields, which interfaces don't have.</div>
      </div>
<pre><span class="cm">// default method example (slide 9)</span>
<span class="kw">public interface</span> <span class="ty">Point</span> {
    <span class="ty">double</span> <span class="fn">getX</span>();
    <span class="kw">default</span> <span class="ty">double</span> <span class="fn">get2X</span>() {
        <span class="kw">return</span> <span class="fn">getX</span>() * <span class="nm">2</span>;   <span class="cm">// only uses another interface method</span>
    }
}</pre>
    </div>
    <div class="card">
      <h3>Exposed vs. internal behavior</h3>
      <table class="match" id="match-behavior">
        <tr><td class="match-term">Exposed behavior</td><td><select class="match-def"><option value="">— choose —</option><option value="exp">Public methods required by the interface(s) the class implements</option><option value="int">Hidden private helper methods used internally</option></select></td></tr>
        <tr><td class="match-term">Internal behavior</td><td><select class="match-def"><option value="">— choose —</option><option value="exp">Public methods required by the interface(s) the class implements</option><option value="int">Hidden private helper methods used internally</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-behavior','fb-match-behavior',['exp','int'])">Check</button>
      <div class="fb" id="fb-match-behavior"></div>
      <p class="muted" style="margin-top:10px">In <code>PointTriangle</code>, <code>getArea()</code>/<code>getPerimeter()</code> are exposed (in the <code>Triangle</code> interface), while <code>sideABLength()</code> and <code>checkColinearity()</code> are <code>private</code> — internal implementation detail.</p>
    </div>
  </section>

  <section class="topic" id="l6-implement">
    <h2>Lesson 6 · Implementing an Interface &amp; Interface Types</h2>
    <div class="concept">A class <b>implements</b> an interface with <code>class X implements A, B</code> and must declare every interface method as <code>public</code>. The interface name can then be used as a <b>type</b> — a variable of that type can hold any object whose class implements it. But you <b>cannot instantiate an interface directly</b>.</div>
    <div class="card">
      <h3>The header</h3>
<pre><span class="kw">public class</span> <span class="ty">CartesianPoint</span> <span class="kw">implements</span> <span class="ty">Point</span> {
    <span class="cm">// must define getX, getY, distanceTo, equals — all public</span>
}</pre>
      <div class="q">
        <div class="prompt"><span class="tag">Fill in</span>If <code>Dog</code> implements the <code>Animal</code> interface, declare an <code>Animal</code> variable named <code>dog</code> instantiated as a <code>Dog</code> (no constructor args):
          <br><input type="text" class="fillblank lg" data-answer="Animal dog = new Dog();" placeholder="Animal ..." style="margin-top:6px">
          <button class="btn small" onclick="checkFill(this)">Check</button></div>
        <div class="fb">Answer: <code>Animal dog = new Dog();</code> — the <b>variable type</b> is the interface (<code>Animal</code>), the <b>object</b> is a concrete class (<code>Dog</code>). This matches your quiz. It's the same is-a idea from L5: a <code>Dog</code> is an <code>Animal</code>.</div>
      </div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Which line is <b>illegal</b>?</div>
        <button class="opt" data-i="0"><code>Point p = new CartesianPoint(3.0, 1.0);</code></button>
        <button class="opt" data-i="1"><code>p = new PolarPoint(8.2, 2.45);</code></button>
        <button class="opt" data-i="2"><code>p = new Point(2.0, 8.0);</code></button>
        <div class="fb">Slide 12 — you <b>can't instantiate an interface</b>. <code>new Point(...)</code> fails because <code>Point</code> is just a contract; only concrete classes like <code>CartesianPoint</code>/<code>PolarPoint</code> can be <code>new</code>'d. But a <code>Point</code>-typed variable can point to either of them.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>One <code>Point</code> variable can be reassigned from a <code>CartesianPoint</code> to a <code>PolarPoint</code>, because both implement <code>Point</code>.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. The variable's type is the interface; any implementing class is a valid value. That's polymorphism in action.</div>
      </div>
    </div>
    <div class="card">
      <h3>Two implementations, same contract</h3>
      <p class="muted"><code>CartesianPoint</code> stores <code>_x,_y</code>; <code>PolarPoint</code> stores <code>_theta,_r</code>. Both satisfy <code>Point</code> — <code>getX()</code> just computes differently:</p>
      <div class="two">
<pre><span class="cm">// CartesianPoint</span>
<span class="kw">public</span> <span class="ty">double</span> <span class="fn">getX</span>() {
    <span class="kw">return</span> _x;
}</pre>
<pre><span class="cm">// PolarPoint</span>
<span class="kw">public</span> <span class="ty">double</span> <span class="fn">getX</span>() {
    <span class="kw">return</span> _r * Math.cos(_theta);
}</pre>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>The <code>Triangle</code> class stores its corners as <code>Point</code> (the interface). Why is that powerful?</div>
        <button class="opt" data-i="0"><code>Triangle</code> works with any kind of <code>Point</code> without knowing or caring which — it only uses the methods <code>Point</code> promises.</button>
        <button class="opt" data-i="1">It forces every point to be Cartesian.</button>
        <button class="opt" data-i="2">It makes the triangle immutable.</button>
        <div class="fb">"Programming to an interface" (slide 17): <code>Triangle</code> depends on the <code>Point</code> contract, so you can mix <code>CartesianPoint</code> and <code>PolarPoint</code> corners freely.</div>
      </div>
    </div>
  </section>

  <section class="topic" id="l6-adts">
    <h2>Lesson 6 · Abstract Data Types (ADTs)</h2>
    <div class="concept">An <b>ADT</b> is the idea of defining and reasoning about a data type by its <b>behavior, not its implementation</b>. In Java, an <b>interface is the mechanism</b> for expressing an ADT — all behavior, no implementation. A class that implements the interface is a <b>concrete implementation</b>, and one ADT may have many implementations (which can differ in performance/memory).</div>
    <div class="card">
      <h3>Fill in — the core definition</h3>
      <p>Interfaces/ADTs separate the abstract
        <input type="text" class="fillblank sm" data-answer="behavior" placeholder="?"> of the data type from its concrete
        <input type="text" class="fillblank" data-answer="implementation" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>behavior</b> and <b>implementation</b> (slide 6/15) — exactly your quiz. The interface is the <i>behavior</i> contract; each class is a concrete <i>implementation</i>.</div>
    </div>
    <div class="card">
      <h3>The car analogy (slide 13)</h3>
      <p class="muted">A <code>CarInt</code> interface promises <code>steer()</code>, <code>brake()</code>, <code>accelerate()</code>. <code>HondaAccord</code> and <code>FordMustang</code> implement it differently under the hood.</p>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What's the takeaway of the car analogy?</div>
        <button class="opt" data-i="0">All cars have identical engines.</button>
        <button class="opt" data-i="1">Because every car exposes the same interface, a driver can switch cars without re-learning to drive — the implementation can change while the behavior stays the same.</button>
        <button class="opt" data-i="2">Interfaces make cars faster.</button>
        <div class="fb">The interface is the steering wheel/pedals a driver relies on; swapping the concrete car (implementation) doesn't change how you use it.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span><b>Barbara Liskov</b> — "the mother of ADTs" — won the Turing Award (2009) for her work in programming language and system design.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 18). Much of the rest of this course is about defining and implementing ADTs — the core data structures of CS.</div>
      </div>
    </div>
  </section>

  <section class="topic" id="l6-junit">
    <h2>Lesson 6 · Unit Testing with JUnit</h2>
    <div class="concept"><b>Unit testing</b> — checking the <b>smallest</b> parts of your code (a single method or class) to be sure they behave as expected. Testing small pieces early (instead of waiting for the whole app) catches mistakes sooner, simplifies debugging, and builds confidence the code works inside the larger system.</div>
    <div class="card">
      <h3>Fill in — the definition</h3>
      <p>Unit tests check the behavior of the
        <input type="text" class="fillblank sm" data-answer="smallest" placeholder="?"> parts of your code, like a single
        <input type="text" class="fillblank sm" data-answer="method" placeholder="?"> or
        <input type="text" class="fillblank sm" data-answer="class" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all three</button>
      <div class="fb">Answers: <b>smallest</b>, <b>method</b>, <b>class</b> (slide 20) — matches your quiz.</div>
    </div>
    <div class="card">
      <h3>JUnit structure</h3>
      <p class="muted">From <code>twoInterfaces/PointTest.java</code>:</p>
<pre><span class="kw">public class</span> <span class="ty">PointTest</span> {
    <span class="kw">private</span> Point p;                  <span class="cm">// test field</span>

    <span class="nm">@BeforeEach</span>
    <span class="kw">public void</span> <span class="fn">setup</span>() {           <span class="cm">// runs before EVERY test</span>
        p = <span class="kw">new</span> <span class="fn">CartesianPoint</span>(1.0, 2.0);
    }

    <span class="nm">@Test</span>
    <span class="kw">public void</span> <span class="fn">testGetX</span>() {         <span class="cm">// one test case</span>
        assertEquals(1.0, p.getX(), 0.001);
    }
}</pre>
      <table class="match" id="match-junit">
        <tr><td class="match-term"><code>@BeforeEach</code></td><td><select class="match-def"><option value="">— choose —</option><option value="be">Runs the marked method before every test (used to set up fields fresh)</option><option value="t">Marks a method as a single test case</option></select></td></tr>
        <tr><td class="match-term"><code>@Test</code></td><td><select class="match-def"><option value="">— choose —</option><option value="be">Runs the marked method before every test (used to set up fields fresh)</option><option value="t">Marks a method as a single test case</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-junit','fb-match-junit',['be','t'])">Check</button>
      <div class="fb" id="fb-match-junit"></div>
    </div>
    <div class="card">
      <h3>Write the assertion</h3>
      <p>Using a <code>dog</code> variable, verify that <code>Dog</code>'s <code>getAge()</code> returns 5. Write the assertion:</p>
      <input type="text" class="fillblank lg" data-answer="assertEquals(5, dog.getAge());" placeholder="assert...">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Answer: <code>assertEquals(5, dog.getAge());</code> — the pattern is <code>assertEquals(expected, actual)</code>, so the value you expect (5) comes first, then the call that produces the actual value. Matches your quiz.</div>
    </div>
    <div class="card">
      <h3>Match each assertion to what it verifies</h3>
      <table class="match" id="match-assert">
        <tr><td class="match-term"><code>assertEquals(exp, act)</code></td><td><select class="match-def"><option value="">— choose —</option><option value="eq">expected equals actual (use a delta for doubles)</option><option value="tr">a boolean expression is true</option><option value="nn">an object is not null</option><option value="ar">two arrays have the same elements in the same order</option></select></td></tr>
        <tr><td class="match-term"><code>assertTrue(expr)</code></td><td><select class="match-def"><option value="">— choose —</option><option value="eq">expected equals actual (use a delta for doubles)</option><option value="tr">a boolean expression is true</option><option value="nn">an object is not null</option><option value="ar">two arrays have the same elements in the same order</option></select></td></tr>
        <tr><td class="match-term"><code>assertNotNull(obj)</code></td><td><select class="match-def"><option value="">— choose —</option><option value="eq">expected equals actual (use a delta for doubles)</option><option value="tr">a boolean expression is true</option><option value="nn">an object is not null</option><option value="ar">two arrays have the same elements in the same order</option></select></td></tr>
        <tr><td class="match-term"><code>assertArrayEquals(exp, act)</code></td><td><select class="match-def"><option value="">— choose —</option><option value="eq">expected equals actual (use a delta for doubles)</option><option value="tr">a boolean expression is true</option><option value="nn">an object is not null</option><option value="ar">two arrays have the same elements in the same order</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-assert','fb-match-assert',['eq','tr','nn','ar'])">Check</button>
      <div class="fb" id="fb-match-assert"></div>
      <div class="q" data-tf="T" style="margin-top:16px">
        <div class="prompt"><span class="tag">T / F</span>For comparing objects, <code>==</code> checks the <b>heap address</b>, so to compare object <i>contents</i> you should inspect their values (or use a proper <code>.equals()</code>), and for doubles use the optional delta like <code>assertEquals(1.0, p.getX(), 0.001)</code>.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 24). <code>==</code> on objects compares references (addresses), not contents — the same floating-point/epsilon idea from earlier lessons, now applied to test assertions.</div>
      </div>
    </div>
  </section>
</main>`;
