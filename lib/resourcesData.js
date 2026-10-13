// GATE CSE Curated Free Resources
// Curated by Anjali (GATE AIR 13), Omi Kakadiya (AIR 151, IIT Bombay), and Nikhil Dhama (AIR 8)

export const RECOMMENDED_ORDER = [
  "Discrete Mathematics",
  "Engineering Mathematics",
  "General Aptitude",
  "C Programming",
  "Data Structures",
  "Algorithms",
  "Digital Logic",
  "Operating Systems",
  "Computer Organization (COA)",
  "Theory of Computation",
  "Compiler Design",
  "Databases (DBMS)",
  "Computer Networks",
];

export const SUBJECT_RESOURCES = [
  {
    id: "os",
    name: "Operating Systems",
    icon: "⚙️",
    category: "systems",
    weightage: "~8–10 Marks",
    youtube: [
      { title: "Gate Smashers Complete OS Playlist", url: "https://youtube.com/playlist?list=PLG9aCp4uE-s17rFjWM8KchGlffXgOzzVP", channel: "Gate Smashers" },
      { title: "Amit Khurana Complete OS", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD", channel: "Amit Khurana" },
      { title: "Neso Academy Operating Systems", url: "https://www.youtube.com/watch?v=AAJGYm-cGl4&list=PLOG_8OlGMp71fqkHNSB5hIW9lgTQDH2Ks", channel: "Neso Academy" },
    ],
    revisionPyq: [
      { title: "Go Classes OS PYQs & Solutions", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHixlIaarIXGPy-eggJQMxd_" },
    ],
    nptel: [
      { title: "NPTEL OS by Prof. Sorav Bansal (IIT Delhi)", url: "https://www.youtube.com/watch?v=aCJ3YgoolHQ&list=PLDW872573QAb4bj0URobvQTD41IV6gRkx" },
      { title: "NPTEL OS by Prof. P.K. Biswas (IIT KGP)", url: "https://youtube.com/playlist?list=PLyqSpQzTE6M9SYI5RqwFYtFYab94gJpWk" },
      { title: "NPTEL OS Video Series", url: "https://www.youtube.com/watch?v=z3Nw5o9dS7Q&list=PLsylUObW5M3CAGT6OdubyH6FztKfJCcFB" },
    ],
    textbooks: [
      {
        name: "Operating System Concepts by Avi Silberschatz, Greg Gagne, Peter Baer Galvin (9E/10E)",
        chapters: "Ch 2.1–2.5, 3, 4.1–4.3, 4.6, 5.1–5.3, 6.1–6.10, 7, 8.1–8.6, 9.1–9.6, 9.9, 10, 11.1–11.5, 12.1–12.6",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO 2017 OS Test 1", url: "https://gateoverflow.in/exam/32/go2017-os-1" },
      { title: "GO 2017 OS Test 2", url: "https://gateoverflow.in/exam/32/go2017-os-2" },
      { title: "GO 2017 OS Test 3", url: "https://gateoverflow.in/exam/32/go2017-os-3" },
      { title: "GATE 2020 OS Previous Test", url: "https://gateoverflow.in/exam/148/operating-systems-gate2020-previous-gate-2" },
    ],
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture (COA)",
    icon: "🖥️",
    category: "systems",
    weightage: "~6–8 Marks",
    youtube: [
      { title: "Gate Smashers Complete COA Playlist", url: "https://youtube.com/playlist?list=PLG9aCp4uE-s0xddCBjwMDnEVyc523WbA2", channel: "Gate Smashers" },
      { title: "Vishvadeep Gothi COA Complete", url: "https://www.youtube.com/watch?v=yrRpPEXkAgg&list=PLIPZ2_p3RNHjMdZR3GYQ2KZio0NKczrik", channel: "Vishvadeep Gothi" },
      { title: "Amit Khurana COA Live Series", url: "https://www.youtube.com/live/nGLphtUUlxM", channel: "Amit Khurana" },
    ],
    revisionPyq: [
      { title: "Gate Smashers COA PYQs and Numericals", url: "https://youtube.com/playlist?list=PLG9aCp4uE-s2qCKKu2XD3zDK-NFEvE91n" },
    ],
    nptel: [
      { title: "NPTEL COA by Prof. Indranil Sengupta (IIT KGP)", url: "https://youtube.com/playlist?list=PLgHucKw979AvcnTpPNZMZyORdL5HvTr9m" },
      { title: "NPTEL Computer Architecture (IIT Guwahati)", url: "https://youtube.com/playlist?list=PL2F82ECDF8BB71B0C" },
    ],
    textbooks: [
      {
        name: "Computer Organisation by Carl Hamacher",
        chapters: "Ch 1.6, 2.1–2.5, 2.9, 2.10, 4.1–4.2, 4.4–4.6, 5.1–5.2, 5.4–5.8, 5.9.1, 6.1–6.4, 6.7.1, 7, 8.1–8.5, 8.8",
      },
      {
        name: "Computer Organization & Design (Hardware/Software Interface) by Patterson & Hennessy (5E)",
        chapters: "Ch 1, 2, 4.1–4.9, 4.14, 5.1–5.10",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO Computer Architecture Test 1", url: "https://gateoverflow.in/exam/46/computer-architecture" },
      { title: "GO Computer Architecture Test 2", url: "https://gateoverflow.in/exam/83/computer-architecture-2" },
      { title: "COA Previous GATE Test 1", url: "https://gateoverflow.in/exam/153/co-and-architecture-gate2020-previous-gate-1" },
      { title: "COA Previous GATE Test 2", url: "https://gateoverflow.in/exam/154/co-and-architecture-gate2020-previous-gate-2" },
      { title: "COA Previous GATE Test 3", url: "https://gateoverflow.in/exam/168/co-and-architecture-gate2020-previous-gate-3" },
      { title: "COA Previous GATE Test 4", url: "https://gateoverflow.in/exam/169/co-and-architecture-gate2020-previous-gate-4" },
    ],
  },
  {
    id: "cn",
    name: "Computer Networks (CN)",
    icon: "🌐",
    category: "systems",
    weightage: "~8–10 Marks",
    youtube: [
      { title: "Ravindrababu Ravula / Go Classes CN Playlist", url: "https://youtube.com/playlist?list=PLC36xJgs4dxHT-TxTy3U1slr5RaBJGaLd", channel: "Ravindrababu Ravula" },
      { title: "Knowledge Gate Computer Networks", url: "https://www.youtube.com/watch?v=3SbtNuK5YZ8&list=PLOG_8OlGMp73hMyn-WX1M2Q4ON98DmaRq", channel: "Knowledge Gate" },
      { title: "Jim Kurose (Author Videos)", url: "https://www.youtube.com/@JimKurose/videos", channel: "Prof. Jim Kurose" },
    ],
    revisionPyq: [
      { title: "Go Classes CN PYQs & Revision", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHim3NUSNOb7ffyhaE5MSkmE" },
    ],
    nptel: [
      { title: "NPTEL Data Communication by Prof. Sujoy Ghosh (IIT KGP)", url: "https://youtube.com/playlist?list=PLbRMhDVUMngf-peFloB7kyiA40EptH1up" },
      { title: "NPTEL Computer Networks (IIT Bombay)", url: "https://www.youtube.com/playlist?list=PL-bZp8Qhr-SaCXZb_CXcDq9UcvfrTcnHw" },
    ],
    textbooks: [
      {
        name: "Data Communications and Networking by Behrouz A. Forouzan (5E)",
        chapters: "Ch 1.1–1.3, 2, 3.6, 8–10, 11.1–2, 12, 13.1–13.2, 17.1, 18–19.2, 20–21.2, 23–24.3, 25.1–25.2, 26",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO Computer Networks Test 1", url: "https://gateoverflow.in/exam/49/computer-networks" },
      { title: "CN Previous GATE Test 1", url: "https://gateoverflow.in/exam/143/computer-networks-gate2020-previous-gate-1" },
      { title: "CN Previous GATE Test 2", url: "https://gateoverflow.in/exam/144/computer-networks-gate2020-previous-gate-2" },
    ],
  },
  {
    id: "cd",
    name: "Compiler Design (CD)",
    icon: "📝",
    category: "systems",
    weightage: "~4–5 Marks",
    youtube: [
      { title: "Gate Smashers Compiler Design Playlist", url: "https://youtube.com/playlist?list=PLEbnTDJUr_IcPtUXFy2b1sGRPsLFMghhS", channel: "Gate Smashers" },
      { title: "Go Classes Complete CD Course", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHj8kDhh1OCIzEha8qhzfe1f", channel: "Go Classes" },
      { title: "Ravindrababu Ravula Compiler Design", url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxGCgQEpXPlP80EMo0kgsJCo", channel: "Ravindrababu Ravula" },
    ],
    revisionPyq: [
      { title: "Go Classes CD Revision and PYQs", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHjy3eH_qRImIs5dVUTpr9ga" },
    ],
    nptel: [
      { title: "NPTEL Compiler Design (IIT KGP)", url: "https://youtube.com/playlist?list=PL54i8TI-dREaHgsBFNalWnz-bC9CZkOBb" },
      { title: "Compilers Course by Prof. Alex Aiken (Stanford Online)", url: "https://www.edx.org/learn/computer-science/stanford-university-compilers" },
    ],
    textbooks: [
      {
        name: "Compilers: Principles, Techniques, & Tools (Dragon Book) by Aho, Lam, Sethi, Ullman",
        chapters: "Lexical analysis, Syntax analysis, SDT, Intermediate code generation, Code optimization",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO 2019 Compiler Parsing Test", url: "https://gateoverflow.in/exam/139/go2019-compiler1-parsing" },
      { title: "GO Compiler Design Subject Test", url: "https://gateoverflow.in/exam/47/compiler-design" },
      { title: "CD Previous GATE Test 1", url: "https://gateoverflow.in/exam/151/compilers-gate2020-previous-gate-1" },
      { title: "CD Previous GATE Test 2", url: "https://gateoverflow.in/exam/152/compilers-gate2020-previous-gate-2" },
      { title: "CD Previous GATE Test 3", url: "https://gateoverflow.in/exam/167/compilers-gate2020-previous-gate-3" },
    ],
  },
  {
    id: "toc",
    name: "Theory of Computation (TOC)",
    icon: "🧠",
    category: "theory",
    weightage: "~7–9 Marks",
    youtube: [
      { title: "Ravindrababu Ravula TOC Playlist", url: "https://youtube.com/playlist?list=PLC36xJgs4dxGvebewU4z2CZYo-8nB93E7", channel: "Ravindrababu Ravula" },
      { title: "Knowledge Gate Theory of Computation", url: "https://www.youtube.com/watch?v=YjcAqvRuPuA&list=PLEBuowGoCtr3FmooUpB616CIwkKZMJc8v", channel: "Knowledge Gate" },
    ],
    revisionPyq: [
      { title: "Go Classes TOC PYQs & Revision", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHhXeEdbXsi34ePvUjL8I-Q9" },
    ],
    nptel: [
      { title: "NPTEL Theory of Computation (IIT KGP)", url: "https://youtube.com/playlist?list=PLbRMhDVUMngcwWkzVTm_kFH6JW4JCtAUM" },
    ],
    textbooks: [
      {
        name: "An Introduction to Formal Languages and Automata by Peter Linz (6E)",
        chapters: "Ch 1.2, 1.3, 2–12, Appendix-A",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO TOC Subject Test 1", url: "https://gateoverflow.in/exam/48/theory-of-computation" },
      { title: "GO TOC Subject Test 2", url: "https://gateoverflow.in/exam/84/theory-of-computation-test-2" },
      { title: "TOC Previous GATE Test 1", url: "https://gateoverflow.in/exam/86/theory-of-computation-previous-gate-1" },
      { title: "TOC Previous GATE Test 2", url: "https://gateoverflow.in/exam/149/theory-of-computation-gate2020-previous-gate-1" },
      { title: "TOC Previous GATE Test 3", url: "https://gateoverflow.in/exam/150/theory-of-computation-gate2020-previous-gate-2" },
      { title: "TOC Previous GATE Test 4", url: "https://gateoverflow.in/exam/170/theory-of-computation-gate2020-previous-gate-3" },
      { title: "TOC Previous GATE Test 5", url: "https://gateoverflow.in/exam/171/theory-of-computation-gate2020-previous-gate-4" },
    ],
  },
  {
    id: "c",
    name: "C Programming",
    icon: "💻",
    category: "programming",
    weightage: "~4–6 Marks",
    youtube: [
      { title: "Saurabh Shukla C Language Course", url: "https://youtube.com/playlist?list=PLbE3-5DBkMUkATaUFgDIpBDbfnym0qvsQ", channel: "MySirG" },
      { title: "Ravindrababu Ravula C Programming", url: "https://www.youtube.com/playlist?list=PLC36xJgs4dxG-IqARhc23jYTDMYt7yvZP", channel: "Ravindrababu Ravula" },
      { title: "Neso Academy C Programming", url: "https://www.youtube.com/watch?v=3sL6kaSE658&list=PLOG_8OlGMp73lsUhx_1i6nnS0RPgetrbG", channel: "Neso Academy" },
      { title: "Gate Smashers C Programming", url: "https://www.youtube.com/watch?v=veySA5wUKPU&list=PLnPUHuqVn2sdx2Iu15UoXB7IVuh_5darM", channel: "Gate Smashers" },
    ],
    revisionPyq: [],
    nptel: [
      { title: "NPTEL Problem Solving through C (IIT KGP)", url: "https://youtube.com/playlist?list=PLEAYkSg4uSQ2k6GwNhpgSHodGT8wfvgwu" },
    ],
    textbooks: [
      {
        name: "The C Programming Language by Brian Kernighan & Dennis Ritchie (2E)",
        chapters: "Ch 1–8",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO 2017 Programming Test 1", url: "https://gateoverflow.in/exam/39/go2017-programming-1" },
      { title: "GO Programming Test 2", url: "https://gateoverflow.in/exam/80/go_programming-test-2" },
      { title: "C Programming Previous GATE Test 1", url: "https://gateoverflow.in/exam/181/programming-gate2020-previous-gate-1" },
      { title: "C Programming Previous GATE Test 2", url: "https://gateoverflow.in/exam/182/programming-gate2020-previous-gate-2" },
    ],
  },
  {
    id: "ds",
    name: "Data Structures",
    icon: "🌲",
    category: "programming",
    weightage: "~6–8 Marks",
    youtube: [
      { title: "Abdul Bari Data Structures Playlist", url: "https://youtube.com/playlist?list=PLIC0AxWOdm5BvHpI_AtPqqjoADnSqcYgp", channel: "Abdul Bari" },
      { title: "Jenny's Lectures Data Structures", url: "https://www.youtube.com/playlist?list=PLEVDNf7p-wYyh712BgmW9UGrAc88bl3OF", channel: "Jenny's Lectures" },
      { title: "Gate Smashers Data Structures", url: "https://www.youtube.com/watch?v=8tPqBc8_BHE&list=PLnUtjh6tj7_-x3sAOri4sLq8egYlZ5fmL", channel: "Gate Smashers" },
      { title: "Knowledge Gate Data Structures", url: "https://www.youtube.com/watch?v=SgIpsDcoslo&list=PLG9aCp4uE-s269TRW1zCAy9MiiTUxgyKU", channel: "Knowledge Gate" },
    ],
    revisionPyq: [
      { title: "Gate Smashers DS Revision & PYQs", url: "https://youtube.com/playlist?list=PLG9aCp4uE-s3Rs4AjzG0VcXQCggmOJJ6W" },
    ],
    nptel: [
      { title: "NPTEL Data Structures and Algorithms (IIT KGP)", url: "https://youtube.com/playlist?list=PLBF3763AF2E1C572F" },
    ],
    textbooks: [
      {
        name: "Data Structures and Algorithms Made Easy by Narasimha Karumanchi",
        chapters: "Arrays, Linked Lists, Stacks, Queues, Trees, Priority Queues & Heaps, Graphs",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO Data Structures Set 2", url: "https://gateoverflow.in/exam/52/data-structure-set-2" },
      { title: "DS Previous GATE Test 1", url: "https://gateoverflow.in/exam/177/data-structures-gate2020-previous-gate-1" },
      { title: "DS Previous GATE Test 2", url: "https://gateoverflow.in/exam/178/data-structures-gate2020-previous-gate-2" },
      { title: "DS Previous GATE Test 3", url: "https://gateoverflow.in/exam/179/data-structures-gate2020-previous-gate-3" },
      { title: "DS Previous GATE Test 4", url: "https://gateoverflow.in/exam/180/data-structures-gate2020-previous-gate-4" },
    ],
  },
  {
    id: "algo",
    name: "Algorithms",
    icon: "⚡",
    category: "programming",
    weightage: "~7–9 Marks",
    youtube: [
      { title: "Abdul Bari Algorithms Playlist", url: "https://youtube.com/playlist?list=PLAXnLdrLnQpRcveZTtD644gM9uzYqJCwr", channel: "Abdul Bari" },
      { title: "Ravindrababu Ravula Algorithms", url: "https://www.youtube.com/watch?v=dBe1EnUpBaA&list=PLC36xJgs4dxFCQVvjMrrjcY3XrcMm2GHy", channel: "Ravindrababu Ravula" },
      { title: "Gate Smashers Algorithms", url: "https://www.youtube.com/watch?v=u1r1bm6fKhw&list=PLnPUHuqVn2sfYjthUZyeC5XIizPbZR-Vq", channel: "Gate Smashers" },
    ],
    revisionPyq: [
      { title: "Go Classes Algorithms PYQs", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHjUCHdJp-_soSSmhgmO4i0T" },
    ],
    nptel: [
      { title: "NPTEL Design and Analysis of Algorithms", url: "https://youtube.com/playlist?list=PL7DC83C6B3312DF1E" },
    ],
    textbooks: [
      {
        name: "Introduction to Algorithms (CLRS 3E)",
        chapters: "Ch 1–4, 6–9, 10, 11.1–11.4, 12.1–21.3, 15, 16.1–16.3, 17, 21–25.2",
      },
      {
        name: "Algorithm Design by Jon Kleinberg and Éva Tardos",
        chapters: "Ch 1–6",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO 2017 Algorithms Test 1", url: "https://gateoverflow.in/exam/37/go2017-algorithms-1" },
      { title: "GO Algorithm Test 2", url: "https://gateoverflow.in/exam/82/algorithm-test-2" },
      { title: "Algorithms Previous GATE Test 1", url: "https://gateoverflow.in/exam/66/algorithms-previous-gate-1" },
      { title: "Algorithms Previous GATE Test 2", url: "https://gateoverflow.in/exam/145/algorithms-gate2020-previous-gate-1" },
      { title: "Algorithms Previous GATE Test 3", url: "https://gateoverflow.in/exam/146/algorithms-gate2020-previous-gate-2" },
    ],
  },
  {
    id: "dl",
    name: "Digital Logic",
    icon: "🔌",
    category: "systems",
    weightage: "~4–6 Marks",
    youtube: [
      { title: "Neso Academy Digital Logic Playlist", url: "https://youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm", channel: "Neso Academy" },
      { title: "Gate Smashers Digital Logic", url: "https://www.youtube.com/playlist?list=PLR7krO3VHssS2rKksstCXwB5B13CXcQqd", channel: "Gate Smashers" },
      { title: "Knowledge Gate Digital Electronics", url: "https://www.youtube.com/watch?v=fHLYtpGhlX0&list=PLC36xJgs4dxEErKQZ7xFxat8oh4OepU34", channel: "Knowledge Gate" },
    ],
    revisionPyq: [
      { title: "Digital Logic Marathon & Revision Solutions", url: "https://www.youtube.com/live/h-SDoV0_pwQ" },
    ],
    nptel: [
      { title: "NPTEL Digital Circuits & Systems", url: "https://youtube.com/playlist?list=PL803563859BF7ED8C" },
    ],
    textbooks: [
      {
        name: "Digital Logic and Computer Design by M. Morris Mano",
        chapters: "Ch 1.1–1.8, 2.1–2.7, 3–7",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO 2017 Digital Test 1", url: "https://gateoverflow.in/exam/33/go2017-digital-1" },
      { title: "GO Digital Design Set 2", url: "https://gateoverflow.in/exam/51/digital-design-set-2" },
      { title: "DL Previous GATE Test 1", url: "https://gateoverflow.in/exam/157/digital-logic-gate2020-previous-gate-1" },
      { title: "DL Previous GATE Test 2", url: "https://gateoverflow.in/exam/158/digital-logic-gate2020-previous-gate-2" },
      { title: "DL Previous GATE Test 3", url: "https://gateoverflow.in/exam/174/digital-logic-gate2020-previous-gate-3" },
      { title: "DL Previous GATE Test 4", url: "https://gateoverflow.in/exam/175/digital-logic-gate2020-previous-gate-4" },
    ],
  },
  {
    id: "dbms",
    name: "Databases (DBMS)",
    icon: "🗄️",
    category: "systems",
    weightage: "~7–9 Marks",
    youtube: [
      { title: "Gate Smashers DBMS Playlist", url: "https://youtube.com/playlist?list=PLG9aCp4uE-s0bu-I8fgDXXhVLO4qVROGy", channel: "Gate Smashers" },
      { title: "Amit Khurana Complete DBMS Course", url: "https://www.youtube.com/playlist?list=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV", channel: "Amit Khurana" },
      { title: "Knowledge Gate DBMS Lectures", url: "https://www.youtube.com/watch?v=M5CTQnyGZCg&list=PLnUtjh6tj7_9ktfjywKLEOj_Fm68mQ5aR", channel: "Knowledge Gate" },
    ],
    revisionPyq: [
      { title: "Go Classes DBMS Revision & PYQs", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHh3otU-TnAK-GkqrvvOO33C" },
    ],
    nptel: [
      { title: "NPTEL Database Design by Prof. D. Janakiram (IIT Madras)", url: "https://youtube.com/playlist?list=PL-wVMhlYPDDkRQ0XrQ8IuslSiAWPpSfuJ" },
    ],
    textbooks: [
      {
        name: "Fundamentals of Database Systems by Ramez Elmasri & Shamkant Navathe (7E)",
        chapters: "Ch 1.3–1.6, 2.1–2.3, 3, 5–8, 9.1, 14.1–14.5, 14.6–14.7 (overview), 15.1–15.4, 16.1–16.7, 17.1–17.6, 20.1–20.5, 21.1–21.4, 21.7",
      },
      {
        name: "Database System Concepts by Silberschatz, Korth, Sudarshan",
        chapters: "Relational model, SQL, Normalization, Indexing, Transactions & Concurrency",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO Database Systems Test 1", url: "https://gateoverflow.in/exam/50/database-systems" },
      { title: "GO DBMS Subject Test 2", url: "https://gateoverflow.in/exam/85/dbms-subject-test-2" },
      { title: "DBMS Previous GATE Test 1", url: "https://gateoverflow.in/exam/155/databases-gate2020-previous-gate-1" },
      { title: "DBMS Previous GATE Test 2", url: "https://gateoverflow.in/exam/156/databases-gate2020-previous-gate-2" },
      { title: "DBMS Previous GATE Test 3", url: "https://gateoverflow.in/exam/172/databases-gate2020-previous-gate-3" },
      { title: "DBMS Previous GATE Test 4", url: "https://gateoverflow.in/exam/173/databases-gate2020-previous-gate-4" },
    ],
  },
  {
    id: "math",
    name: "Engineering Mathematics",
    icon: "📐",
    category: "math",
    weightage: "~15 Marks (High Yield 🔥)",
    subsections: [
      {
        sub: "Discrete Mathematics",
        textbooks: "Kenneth H. Rosen (Ch 1, 2, 4–8, 11.1–11.3) / Susanna S. Epp (Ch 1, 2.1–2.3, 3, 5.1, 5.5–5.7, 6–10)",
        youtube: [
          { title: "Go Classes Propositional Logic", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHillKxh1_iFeZhy9MftHeWW" },
          { title: "Go Classes Combinatorics", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHgm_UqwqckMxM68HS4BkjYY" },
          { title: "Go Classes Recurrence Relations", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHhhTH0o1JBMgscMUvxs4E_4" },
          { title: "Go Classes Group Theory", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHhXves0XVa8d5O6F4rUi3KR" },
          { title: "Go Classes Graph Theory", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHjQoj0k-BlI9zXE0QKdl-lI" },
          { title: "Go Classes Set Theory", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHjHnhdkPWFAlcizVQJ8w4TX" },
        ],
        nptel: "https://youtube.com/playlist?list=PLgMDNELGJ1Ca7hpEIYtWvMXKcTx88OD2O",
        revision: "https://youtube.com/playlist?list=PL3eEXnCBViH-WZfR3PRFfYs7WjUgcBlAZ",
      },
      {
        sub: "Linear Algebra",
        textbooks: "Gilbert Strang / Stephen Boyd",
        youtube: [
          { title: "Go Classes Linear Algebra Course", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHhGLQ1ZT37KLpBMAD90CM4_" },
          { title: "3Blue1Brown Essence of Linear Algebra (Intuition)", url: "https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
        ],
        nptel: "https://youtube.com/playlist?list=PLFW6lRTa1g80fZ1giRbqbe_XdXPdkkyqY",
        revision: "https://www.youtube.com/live/7vdSWFVKzZg",
      },
      {
        sub: "Probability & Statistics",
        textbooks: "Introduction to Probability Models by Sheldon M. Ross / probabilitycourse.com",
        youtube: [
          { title: "Probability for GATE CSE Playlist", url: "https://youtube.com/playlist?list=PLhLZ_zxDsyOIKbQfKFM05BLYRhUZ7JP-M" },
          { title: "Go Classes Probability", url: "https://www.youtube.com/playlist?list=PLQtV9njJ9uymo0SRigEcNEL8JIimQ5zLg" },
        ],
        nptel: "https://youtube.com/playlist?list=PLyqSpQzTE6M_JcleDbrVyPnE0PixKs2JE",
        revision: "https://youtu.be/_nuQwy9DGmw",
      },
      {
        sub: "Calculus",
        textbooks: "Khan Academy Calculus 1 / Thomas Calculus",
        youtube: [
          { title: "Khan Academy Calculus Course", url: "https://www.khanacademy.org/math/calculus-1" },
          { title: "Go Classes Calculus Solutions", url: "https://youtube.com/playlist?list=PLIPZ2_p3RNHi3R5H_NDKCB3aGvtLYlLrz" },
        ],
        nptel: "https://youtube.com/playlist?list=PLEAYkSg4uSQ0q9CDkHkJGdUTQOgH1DLDj",
        revision: "https://youtube.com/playlist?list=PLIPZ2_p3RNHi3R5H_NDKCB3aGvtLYlLrz",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025",
    freeTests: [
      { title: "GO Weekly Quiz 5: Propositional Logic", url: "https://gateoverflow.in/exam/601/go-classes-2025-weekly-quiz-5-propositional-logic" },
      { title: "GO Weekly Quiz 8: Set Theory", url: "https://gateoverflow.in/exam/605/go-classes-2025-weekly-quiz-8-set-theory" },
      { title: "GO Weekly Quiz 4: Linear Algebra", url: "https://gateoverflow.in/exam/600/go-classes-2025-weekly-quiz-4-linear-algebra" },
      { title: "GO Weekly Quiz 6: Conditional Probability", url: "https://gateoverflow.in/exam/623/go-classes-cs-da-2025-weekly-quiz-6-conditional-probability" },
      { title: "GO Weekly Quiz 21: Calculus", url: "https://gateoverflow.in/exam/659/go-classes-2025-weekly-quiz-21-calculus" },
    ],
  },
  {
    id: "ga",
    name: "General Aptitude",
    icon: "🎯",
    category: "aptitude",
    weightage: "~15 Marks",
    youtube: [
      { title: "Aptitude Short Notes & Topics Guide", url: "https://youtu.be/IADuDzccEOI", channel: "Topper Guidance" },
    ],
    revisionPyq: [],
    nptel: [],
    textbooks: [
      {
        name: "GATEOverflow Aptitude Curated Question Bank",
        chapters: "Verbal, Numerical Computation, Analytical Logic, Spatial Aptitude",
      },
    ],
    pyqPdf: "https://github.com/GATEOverflow/GO-PDFs/releases/tag/aptitude",
    freeTests: [
      { title: "GO Monthly Quiz 1: General Aptitude", url: "https://gateoverflow.in/exam/610/go-classes-2025-monthly-quiz-1-general-aptitude" },
      { title: "GO Monthly Quiz 2: General Aptitude", url: "https://gateoverflow.in/exam/631/go-classes-cs-da-2025-monthly-quiz-2-general-aptitude" },
      { title: "GO Monthly Quiz 3: General Aptitude", url: "https://gateoverflow.in/exam/660/go-classes-cs-da-2025-monthly-quiz-3-general-aptitude" },
      { title: "GO 2017 Aptitude Test 1", url: "https://gateoverflow.in/exam/36/go2017-aptitude-1" },
      { title: "General Aptitude Set 2", url: "https://gateoverflow.in/exam/64/general-aptitude-set-2" },
    ],
  },
];

export const MOCK_TESTS = [
  {
    category: "Full-Length Mocks",
    items: [
      { title: "GATEOverflow Mock Test 1", url: "https://gateoverflow.in/exam/70/go-17-mock-1" },
      { title: "GATEOverflow Mock Test 2", url: "https://gateoverflow.in/exam/73/go-17-mock-2" },
      { title: "GATEOverflow Mock Test 3", url: "https://gateoverflow.in/exam/74/go-17-mock-3" },
      { title: "GATEOverflow Mock Test 4", url: "https://gateoverflow.in/exam/79/go-18-mock-4" },
      { title: "Ruturaj Mock Test 1", url: "https://gateoverflow.in/exam/126/test-by-ruturaj-mock-1" },
      { title: "Applied Course 2019 Mock 1", url: "https://gateoverflow.in/exam/136/applied-course-2019-mock1" },
    ],
  },
  {
    category: "Previous Years GATE as Online Timed Mocks",
    items: [
      { title: "GATE CSE 2024 (Set 1)", url: "https://gateoverflow.in/exam/594/gate-cse-2024-set-1-original-paper" },
      { title: "GATE CSE 2024 (Set 2)", url: "https://gateoverflow.in/exam/595/gate-cse-2024-set-2-original-paper" },
      { title: "GATE CSE 2023", url: "https://gateoverflow.in/exam/430/gate-cse-2023-original-paper" },
      { title: "GATE CSE 2022", url: "https://gateoverflow.in/exam/298/gate-cse-2022" },
      { title: "GATE CSE 2021 (Set 1)", url: "https://gateoverflow.in/exam/263/gate-2021" },
      { title: "GATE CSE 2021 (Set 2)", url: "https://gateoverflow.in/exam/264/gate-cse-2021-set-2" },
      { title: "GATE CSE 2020", url: "https://gateoverflow.in/exam/218/gate-cse-2020" },
      { title: "GATE CSE 2019", url: "https://gateoverflow.in/exam/141/gate2019" },
      { title: "GATE CSE 2018", url: "https://gateoverflow.in/exam/88/gate2018" },
      { title: "GATE CSE 2017 (Set 1)", url: "https://gateoverflow.in/exam/76/gate-2017-set-1" },
      { title: "GATE CSE 2017 (Set 2)", url: "https://gateoverflow.in/exam/75/gate-2017-set-2" },
      { title: "GATE CSE 2016 (Set 1)", url: "https://gateoverflow.in/exam/8/gate-2016-1" },
      { title: "GATE CSE 2016 (Set 2)", url: "https://gateoverflow.in/exam/9/gate-2016-2" },
      { title: "GATE CSE 2015 (Set 1)", url: "https://gateoverflow.in/exam/10/gate-2015-1" },
      { title: "GATE CSE 2015 (Set 2)", url: "https://gateoverflow.in/exam/11/gate-2015-2" },
    ],
  },
];

export const NOTES_VAULT = [
  {
    title: "Standard Textbook Chapter Notes (Drive Vault)",
    desc: "Complete notes extracted directly from standard foreign author textbooks.",
    url: "https://drive.google.com/drive/folders/1oGCYictHLqXE1skdkJ8PnaefBnLrRXwG",
    badge: "Google Drive",
  },
  {
    title: "Topper Comprehensive Notes Doc by Omi Kakadiya (AIR 151)",
    desc: "Detailed topicwise notes and links compiled by Omi Kakadiya (IIT Bombay).",
    url: "https://docs.google.com/document/d/1HgU1sGOb-mz_SBv-QYSMkNR79lf5zbfOiUlF14-I08c/edit?tab=t.0",
    badge: "Google Docs",
  },
  {
    title: "Ankur Gupta Handwritten Notes Repository",
    desc: "Renowned handwritten notes across all GATE CSE subjects by Ankur Gupta.",
    url: "https://github.com/baquer/GATE-and-CSE-Resources-for-Students/tree/master/AnkurGuptaNotes",
    badge: "GitHub Repo",
  },
  {
    title: "Priyanshuu GATE CSE Complete Notes",
    desc: "Clean markdown and PDF notes repository for quick formula revisions.",
    url: "https://github.com/Priyanshuu-2109/GATE-CSE-notes",
    badge: "GitHub Repo",
  },
  {
    title: "GateCSE by JS Community Portal",
    desc: "Interactive topic discussion and revision portal maintained by GATE aspirants.",
    url: "https://gatecsebyjs.github.io/",
    badge: "Community Site",
  },
  {
    title: "Short Notes & High-Yield Questions Video",
    desc: "Strategy and high-frequency formula compilation by AIR 13 Anjali.",
    url: "https://youtu.be/9HAxjug36wA",
    badge: "YouTube Video",
  },
];

export const CREDITS = [
  {
    name: "Anjali",
    title: "GATE CSE AIR 13",
    desc: "Curated comprehensive playlist solutions, textbook mapping, and test links.",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/anjali-chauhan24/" },
      { label: "YouTube", url: "https://www.youtube.com/@anjc24" },
    ],
  },
  {
    name: "Omi Kakadiya",
    title: "GATE CSE AIR 151 (IIT Bombay)",
    desc: "Curated NPTEL collections, notes vaults, and recommended subject sequence.",
    links: [
      { label: "YouTube", url: "https://www.youtube.com/@omi_iitb" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/omi-kakadiya-bbb17b208/" },
    ],
  },
  {
    name: "Nikhil Dhama",
    title: "GATE CSE AIR 8 (GATE 2021)",
    desc: "Meticulously audited and documented exact relevant chapter ranges for standard textbooks.",
    links: [],
  },
  {
    name: "GATEOverflow Team",
    title: "Free Testing & PYQ Initiative",
    desc: "Host of all free previous years exams, test series, and free community PDFs.",
    links: [{ label: "GATEOverflow", url: "https://gateoverflow.in" }],
  },
];
