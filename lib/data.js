// Your day-by-day timetable. [phase name, start, end, topics (1 per day, last repeats), "rev" flag]
export const START = "2026-10-13";
export const PLAN_END = "2027-02-21";
export const PHASES = [
  ["Computer Networks","2026-10-13","2026-10-26",["Network fundamentals, network architecture, why layering is needed","OSI and TCP/IP models, protocols, services, encapsulation and decapsulation","Circuit switching, packet switching, virtual circuits, datagrams","Transmission, propagation, processing and queuing delay; throughput, bandwidth and RTT","Data-link layer, framing, error detection, parity, checksum and CRC","CRC numericals and error-detection PYQs; revise Oct 13-17","Medium Access Control: channel allocation, random access and collision handling","Ethernet, MAC addressing, switching concepts and Ethernet operation","Routing fundamentals, routing tables, distance-vector routing","Link-state routing, shortest paths and routing algorithm questions","IPv4 addressing, subnetting, CIDR notation","IPv4 fragmentation, Network Address Translation (NAT)","TCP flow control, congestion control, socket API","DNS, HTTP, complete CN revision and a timed CN PYQ set"]],
  ["C & Data Structures","2026-10-27","2026-11-08",["C basics, data types, operators, expressions and type conversion","Conditional statements, loops, output-tracing questions","Functions, scope, storage basics and parameter passing","Pointers, arrays and pointer arithmetic","Strings, multidimensional arrays, structures and unions","Recursion, recursive calls, tracing and recurrence intuition","Time complexity basics; arrays and searching","Linked lists: singly, doubly, circular; operations and complexity","Stacks, queues, circular queues and applications","Trees, binary trees and tree traversals","Binary search trees, insertion, deletion and complexity","Binary heaps, heap operations and priority queues","Graph representation, BFS/DFS basics, C + DS PYQs and revision"]],
  ["Algorithms","2026-11-09","2026-11-16",["Asymptotic notation, worst-case time and space complexity","Searching, binary search, sorting fundamentals","Merge sort, quicksort, heapsort and complexity comparisons","Hashing, collision handling and expected performance basics","Divide-and-conquer and recurrence-based complexity","Greedy algorithms, activity selection and minimum spanning trees","Dynamic programming, overlapping subproblems and optimal substructure","Graph traversals, shortest paths, algorithm PYQs and revision"]],
  ["Digital Logic","2026-11-17","2026-11-21",["Number systems, binary arithmetic, complements and signed numbers","Boolean algebra, logic gates and algebraic minimization","Karnaugh maps, tabular minimization method","Combinational circuits: arithmetic circuits, multiplexers, decoders","Sequential circuits, flip-flops, counters and fixed/floating-point representation; PYQs"]],
  ["Operating Systems","2026-11-22","2026-11-30",["OS fundamentals, system calls, processes and process states","Threads, inter-process communication and process relationships","CPU scheduling: FCFS, SJF, SRTF, priority, round robin","Synchronization, critical sections, semaphores and classic problems","Deadlocks: conditions, prevention, avoidance and detection","Memory management, paging, segmentation and address translation","Virtual memory, page replacement and thrashing","File systems, file allocation, directories and I/O scheduling","OS numericals, PYQs, error analysis and complete subject revision"]],
  ["Databases","2026-12-01","2026-12-09",["ER model, entities, relationships, keys and ER-to-relational mapping","Relational model, relational algebra and relational calculus","SQL: SELECT, joins, nested queries, grouping and aggregation","Integrity constraints, functional dependencies and keys","Normalization, 1NF, 2NF, 3NF and BCNF","File organization, indexing fundamentals and index structures","B-trees and B+ trees, insertion/search and index questions","Transactions, schedules, serializability and recoverability","Concurrency control, locking, deadlocks, DBMS PYQs and revision"]],
  ["Computer Organization (COA)","2026-12-10","2026-12-17",["Instruction sets, instruction formats and addressing modes","ALU, arithmetic operations and number representation","Hardwired and microprogrammed control units","Memory hierarchy, locality, cache fundamentals and performance","Cache mapping, tag/index/offset calculations and cache numericals","Memory interfacing, I/O interface, interrupts and DMA","Instruction pipelining, speedup and pipeline hazards","COA PYQs, weak areas and complete revision"]],
  ["Theory of Computation","2026-12-18","2026-12-25",["Alphabets, strings, languages, regular expressions","Finite automata, DFA, NFA and conversion between them","Regular languages, closure properties and pumping lemma","Context-free grammars, derivations, parse trees and ambiguity","Push-down automata and context-free languages","CFG/PDA relationships, language properties and PYQ practice","Turing machines, decidability and undecidability","TOC revision, mixed automata and language questions"]],
  ["Compiler Design","2026-12-26","2026-12-30",["Lexical analysis, tokens, patterns and lexical errors","Parsing, FIRST/FOLLOW, LL(1) and LR parsing fundamentals","Syntax-directed translation, runtime environments and intermediate code generation","Local optimization, common subexpression elimination, constant propagation and liveness","Compiler PYQs, data-flow analysis revision and weak topics"]],
  ["Maths & Discrete","2026-12-31","2027-01-16",["Propositional logic, logical equivalence and truth tables","First-order logic, predicates and quantifiers","Sets, relations, functions, equivalence relations and partial orders","Lattices, monoids, groups and their basic properties","Graphs, connectivity, paths, cycles and graph properties","Matching, colouring and graph-related PYQs","Counting principles, permutations and combinations","Recurrence relations and generating functions","Linear algebra: matrices, determinants and systems of equations","Eigenvalues, eigenvectors and LU decomposition","Calculus: limits, continuity, differentiability and maxima/minima","Mean value theorem and integration","Probability fundamentals, conditional probability and Bayes' theorem","Random variables, expectation and variance","Binomial, Poisson, uniform, normal and exponential distributions","Mean, median, mode, standard deviation and statistics PYQs","Mathematics mixed test, corrections and formula revision"]],
  ["Revision + PYQs","2027-01-17","2027-01-31",["CN: layering, switching and performance numericals","CN: CRC, MAC, Ethernet, routing and IPv4","CN: TCP, DNS, HTTP and a timed CN test","C programming and recursion: output tracing and pointers","Data Structures: trees, heaps, stacks, queues and graphs","Algorithms: sorting, complexity, greedy, DP and graph algorithms","Digital Logic: Boolean algebra, K-maps and circuits","OS: scheduling, synchronization, deadlocks and memory","DBMS: SQL, normalization, indexing and transactions","COA: cache, memory hierarchy, addressing and pipelining","TOC: automata, regular languages, CFG/PDA and Turing machines","Compiler Design: parsing, intermediate code and optimization","Discrete Mathematics: logic, relations, graphs and combinatorics","Linear Algebra, Calculus, Probability and Statistics","Full CS mixed test, error analysis and unfinished-topic audit"],"rev"],
  ["Mocks + final prep","2027-02-01","2027-02-21",["Full-length mock 1, timed under exam conditions","Analyze every mistake; revise the two weakest subjects","Full-length mock 2","Mock analysis, formulas and important PYQs","Light revision, GA practice and sleep properly","Short mixed test and revision","Revise weak topics; avoid heavy new learning","Full-length mock or timed subject-mix test","Analyze mock; revise recurring mistakes","Targeted revision: CN, OS, DBMS and Algorithms","Targeted revision: COA, Digital Logic, TOC and Compiler","Mathematics, GA, formulas and light PYQs","Final mock or mixed test","Revision only if the exam is still ahead","Mock, analysis, weak-topic revision cycle","Mock, analysis, weak-topic revision cycle","Mock, analysis, weak-topic revision cycle","Mock, analysis, weak-topic revision cycle","Mock, analysis, weak-topic revision cycle","Light revision and rest","Light revision and rest. Calm mind, sleep well."],"rev"],
];
export const REV_FROM = PHASES.findIndex((p) => p[4]);
export const diff = (a, b) => Math.round((new Date(a + "T12:00:00Z") - new Date(b + "T12:00:00Z")) / 864e5);
export const addDays = (d, n) => new Date(new Date(d + "T12:00:00Z").getTime() + n * 864e5).toISOString().slice(0, 10);
export const phaseDays = (p) => diff(p[2], p[1]) + 1;
export const topicsOf = (i) => { const p = PHASES[i]; return Array.from({ length: phaseDays(p) }, (_, d) => p[3][Math.min(d, p[3].length - 1)]); };
export const ALL_DAYS = PHASES.flatMap((p, i) => (i >= REV_FROM ? [] : topicsOf(i).map((t, d) => ({ id: `${i}-${d}`, date: addDays(p[1], d), topic: t, phase: p[0] }))));
export const TOTAL = ALL_DAYS.length;
export const PLAN_DAYS = diff(PLAN_END, START) + 1;
export function todayTopic(date) {
  const i = PHASES.findIndex((p) => date >= p[1] && date <= p[2]);
  if (i < 0) return null;
  const d = diff(date, PHASES[i][1]);
  return { id: `${i}-${d}`, phase: PHASES[i][0], topic: topicsOf(i)[d], rev: i >= REV_FROM };
}
export const GA = [["2026-10-13","Tenses, articles, adjectives, prepositions, parts of speech"],["2026-10-20","Conjunctions, subject-verb agreement, vocabulary, idioms"],["2026-10-27","Reading comprehension and narrative sequencing"],["2026-11-03","Ratios, percentages, powers, exponents and logarithms"],["2026-11-10","Series, permutations and combinations"],["2026-11-17","Mensuration, geometry and elementary statistics"],["2026-11-24","Elementary probability and numerical estimation"],["2026-12-01","Data interpretation: tables, bar graphs, pie charts"],["2026-12-08","Other graphs, 2D/3D plots, maps and tables"],["2026-12-15","Logic: deduction, induction and analogy"],["2026-12-22","Numerical relations and reasoning"],["2026-12-29","Spatial: translation, rotation, scaling, mirroring"],["2027-01-05","Assembling shapes, paper folding, cutting, patterns"],["2027-01-12","Mixed GA PYQs across all four sections"],["2027-01-19","Timed GA sets; review accuracy and speed"],["2027-01-26","Mixed GA practice and error correction"],["2027-02-01","GA revision, 10-20 min"]];
export const gaToday = (d) => [...GA].reverse().find((g) => d >= g[0])?.[1] || "GA practice";

// Core syllabus phase ends Jan 16, 2027 before Revision & Mocks begin
export const CORE_END = "2027-01-16";

// Find the next upcoming uncompleted topic chronologically
export function getNextAvailableTopic(today, doneTopics = {}) {
  return ALL_DAYS.find((x) => x.date > today && !doneTopics[x.id]) || null;
}

// Find all upcoming topics that were completed ahead of time
export function getAllAheadTopics(today, doneTopics = {}) {
  return ALL_DAYS.filter((x) => x.date > today && doneTopics[x.id]);
}

// Full mathematical calculations for ahead-of-schedule time expansion
export function getAheadCalculations(today, doneTopics = {}) {
  const ahead = ALL_DAYS.filter((x) => x.date > today && doneTopics[x.id]);
  const daysAhead = ahead.length;
  const bufferHours = daysAhead * 24;
  const projectedCoreEnd = addDays(CORE_END, -daysAhead);
  const projectedPlanEnd = addDays(PLAN_END, -daysAhead);
  // Standard revision phase is 36 days (Jan 17 to Feb 21)
  const baseRevisionDays = diff(PLAN_END, CORE_END);
  const totalRevisionDays = baseRevisionDays + daysAhead;

  return {
    ahead,
    daysAhead,
    bufferHours,
    projectedCoreEnd,
    projectedPlanEnd,
    baseRevisionDays,
    totalRevisionDays,
  };
}
