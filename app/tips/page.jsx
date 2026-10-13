"use client";
import { useState } from "react";

const TIPS = [
  {
    title: "🧠 Active Recall (Testing Effect)",
    icon: "⚡",
    science: "Cognitive psychology shows passive re-reading has ~10% retention. Self-testing forces synaptic retrieval pathways, boosting long-term memory to >80%.",
    howTo: "Concept video kandu kazhinjaal udane book/slides close cheyyu. Blank paper-il definitions, state diagrams, formulas ezhuthu.",
    roast: "Video kandittu thala aattiyathu 'padikkal' alla, cinema kaanal aanu! Notes nokkathe oru formula ezhuthan paranjaal mukham karukkum 😏",
  },
  {
    title: "📈 Spaced Repetition (Ebbinghaus Forgetting Curve)",
    icon: "⏳",
    science: "Memories decay exponentially within 48 hours without reinforcement. Reviewing at spaced intervals (Day 1 → Day 3 → Day 7 → Day 21) flattens the decay curve permanently.",
    howTo: "Catch-up box-il ulla topics revise cheyyu. Weekends-il 2-week old topics-il ninnu 5 PYQs vechu solve cheyyuka.",
    roast: "Oru thavana padichittu 'njan kingu' ennu karuthiyavan GATE hall-il 'Dijkstra negative edge edukkumo ariyilla' ennu paranj karayum 💀",
  },
  {
    title: "🍅 Pomodoro Sprint (Ultradian Focus)",
    icon: "🎯",
    science: "Human prefrontal cortex can sustain deep analytical problem solving for 25–45 minutes before attention drift and cognitive fatigue set in.",
    howTo: "25 min deep work, 5 min rest. Phone flight mode-il iduka. Home page-il ulla Focus Timer use cheyyu.",
    roast: "'5 min Reels break' eduthittu 1 hr kazhinju 'Time poyallo' ennu parayan naanam aavunnille? Phone vere room-il vekkeda! 📱🔥",
  },
  {
    title: "🔀 Interleaving (Context Switching Resilience)",
    icon: "🔀",
    science: "Blocked practice (doing only CN for 2 weeks) creates illusion of mastery. Mixing subjects forces the brain to discriminate between problem archetypes.",
    howTo: "Innathe session-il: CN protocol numericals + Discrete Maths counting problems mix cheythu solve cheyyu.",
    roast: "Oru subject thanne pidichirikkunnathu easy aayathu kondaanu. GATE exam paper-il Q1 Algo, Q2 DBMS, Q3 TOC aayirikkoom. Kuzhangi povaruthu!",
  },
  {
    title: "🗣️ Feynman Technique (Mental Model Audit)",
    icon: "💡",
    science: "If you cannot explain a concept using simple non-jargon vocabulary, your conceptual mental model has critical representation gaps.",
    howTo: "Topic oru 10-vayassukaaranu manasilaakunna pole paranju nokku (e.g. TCP Handshake = Two people agreeing on phone).",
    roast: "'Enikku ariyaam, pakshe explain cheyyaan pattilla' ennu paranjaal athinte artham 'enikku ariyilla' ennaanu, mone! 😂",
  },
  {
    title: "📓 Forensic Error Log",
    icon: "🔬",
    science: "Errors are high-potency learning events only if categorized by causal failure mode (concept gap vs calculation vs misreading question).",
    howTo: "Every wrong PYQ notebook-il label cheyyu: (1) Concept miss (2) Silly mistake (3) Time pressure. Sunday revise cheyyu.",
    roast: "Same mistake 3 thavana repeat cheythaal ath mistake alla, ninte bad habit aanu. Negative mark −0.33 vangi rank thazhottu pokum 📉",
  },
  {
    title: "💤 Memory Consolidation (Deep Sleep)",
    icon: "🌙",
    science: "Hippocampal sharp-wave ripples replay and transfer daily learned patterns into the neocortex exclusively during deep slow-wave sleep.",
    howTo: "Night 7–8 hours sleep mandatory. Exam-nte munpe all-nighter valichaal brain processing speed 40% drop aakum.",
    roast: "Raathri 3 mani vare reels kandittu 'enikku concentration illa' ennu paranj karayunno? Urakkam illenkil brain save aakkilla!",
  },
  {
    title: "🎯 PYQs First (Direct Pattern Alignment)",
    icon: "🏆",
    science: "GATE repeats conceptual patterns, not verbatim questions. Solving 15 years PYQs reveals IIT professor trap archetypes.",
    howTo: "Theory theernna udane subject-wise previous 10-year GATE questions solve cheythu accuracy test cheyyu.",
    roast: "100 hours lecture video kandittu 1 PYQ polum cheyyathavan GATE hall-il questions kandu bhedhippovum. Dhairyam venam solve cheyyaan!",
  },
];

export default function Tips() {
  const [feynmanText, setFeynmanText] = useState("");
  const [verdict, setVerdict] = useState("");

  const checkExplanation = () => {
    const trimmed = feynmanText.trim();
    if (!trimmed) return;
    if (trimmed.length < 35) {
      setVerdict({
        type: "neg",
        text: "Too short! Oru 10-vayassukaaranu ithil ninnu onnum manasilaavila. Kooduthal details add cheyyu! 😒",
      });
    } else if (trimmed.length < 80) {
      setVerdict({
        type: "warn",
        text: "Not bad! Pakshe oru real-world analogy koodi add cheythaal mental model 100% solid aakum 💡",
      });
    } else {
      setVerdict({
        type: "pos",
        text: "Mass mental model! Simplified, clear and conceptual. Ithu pole revise cheythaal GATE easy aanu 🧠✨",
      });
    }
  };

  return (
    <>
      <div className="row">
        <div>
          <h1>🧠 Scientific Study Protocols</h1>
          <p className="mu">
            Cognitive psychology techniques to crack GATE CSE 2027 with high retention and savage reality checks.
          </p>
        </div>
      </div>

      {/* Interactive Feynman Test Sandbox */}
      <div className="card mission" style={{ marginTop: 14 }}>
        <div className="row">
          <div>
            <h3>🗣️ Interactive Feynman Mental Model Tester</h3>
            <small className="mu">Explain today's topic in simple words without technical jargon</small>
          </div>
          <span className="pill pos">Active Learning</span>
        </div>

        <p className="mu" style={{ fontSize: "0.88rem", margin: "8px 0 10px" }}>
          Innu padicha topic (e.g. TCP Handshake, Two Phase Locking, Pipelining Hazards) oru 10-vayassukaaranu explain cheyyunna pole type cheythu nokku:
        </p>

        <textarea
          className="recall-input"
          rows={3}
          placeholder="e.g. TCP handshake is like calling someone: First I say 'Can you hear me?', then they say 'Yes I can, can you hear me?', then I say 'Yes, let's talk'..."
          value={feynmanText}
          onChange={(e) => setFeynmanText(e.target.value)}
        />

        <div className="row" style={{ marginTop: 10 }}>
          <button type="button" onClick={checkExplanation}>
            Audit My Mental Model 🚀
          </button>
          <small className="mu">
            {feynmanText.length} characters typed
          </small>
        </div>

        {verdict && (
          <div
            style={{
              marginTop: 12,
              padding: "10px 14px",
              borderRadius: 12,
              background:
                verdict.type === "pos"
                  ? "rgba(16, 185, 129, 0.1)"
                  : verdict.type === "warn"
                  ? "rgba(245, 158, 11, 0.1)"
                  : "rgba(244, 63, 94, 0.1)",
              border: `1px solid ${
                verdict.type === "pos"
                  ? "rgba(16, 185, 129, 0.3)"
                  : verdict.type === "warn"
                  ? "rgba(245, 158, 11, 0.3)"
                  : "rgba(244, 63, 94, 0.3)"
              }`,
            }}
          >
            <p className={verdict.type} style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem" }}>
              {verdict.text}
            </p>
          </div>
        )}
      </div>

      {/* 8 Protocols Grid */}
      <div className="grid" style={{ marginTop: 18 }}>
        {TIPS.map((t) => (
          <div className="card tip-card" key={t.title}>
            <div className="row" style={{ alignItems: "flex-start" }}>
              <h3>{t.title}</h3>
              <span style={{ fontSize: "1.4rem" }}>{t.icon}</span>
            </div>

            <p className="science-text">
              🔬 <b>The Cognitive Science:</b> {t.science}
            </p>
            <p className="howto-text">
              📌 <b>How to Execute:</b> {t.howTo}
            </p>
            <p className="neg roast-text">
              🌶️ <b>Reality Check:</b> {t.roast}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
