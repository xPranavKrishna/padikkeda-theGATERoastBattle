"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ranked } from "@/lib/score";
import { PHASES, topicsOf, TOTAL } from "@/lib/data";

const WEIGHTS = {
  "Computer Networks": { marks: "~8–10 Marks", tag: "Core Systems 🌐" },
  "C & Data Structures": { marks: "~8–10 Marks", tag: "Programming 💻" },
  "Algorithms": { marks: "~7–9 Marks", tag: "Problem Solving ⚡" },
  "Digital Logic": { marks: "~4–6 Marks", tag: "Hardware 🔌" },
  "Operating Systems": { marks: "~8–10 Marks", tag: "Core Systems ⚙️" },
  "Databases": { marks: "~7–9 Marks", tag: "Data Architecture 🗄️" },
  "Computer Organization (COA)": { marks: "~6–8 Marks", tag: "Architecture 🖥️" },
  "Theory of Computation": { marks: "~7–9 Marks", tag: "Theoretical CS 🧠" },
  "Compiler Design": { marks: "~4–5 Marks", tag: "Language Systems 📝" },
  "Maths & Discrete": { marks: "~15 Marks (High Yield 🔥)", tag: "High Yield Math 📐" },
};

export default function Syllabus() {
  const { user, users } = useAuth();
  const rank = ranked(users);
  const me = user ? rank.find((u) => u.id === user.uid) : null;
  const [filter, setFilter] = useState("all");

  const nonRevPhases = PHASES.filter((p) => !p[4]);

  return (
    <>
      <div className="row">
        <div>
          <h1>📚 Public Syllabus Arena</h1>
          <p className="mu">
            Home-il <b>"Concept"</b> tick cheythaal topic auto-complete aakum. Total: <b>{TOTAL} Topics</b>. Ellavarudeyum progress live aanu.
          </p>
        </div>
        {me && (
          <div className="chip ok" style={{ fontSize: "0.95rem", padding: "6px 16px" }}>
            Ninte Syllabus: <b>{me.pct}% ({me.topics}/{TOTAL})</b>
          </div>
        )}
      </div>

      <div className="grid" style={{ marginTop: 18 }}>
        {nonRevPhases.map((p, i) => {
          const info = WEIGHTS[p[0]] || { marks: "~6–8 Marks", tag: "CS Subject" };
          const t = topicsOf(i);

          // Find leader for this subject
          const leaders = rank
            .map((u) => ({
              name: u.name,
              id: u.id,
              completed: t.filter((_, d) => u.topics?.[`${i}-${d}`]).length,
            }))
            .sort((a, b) => b.completed - a.completed);

          return (
            <div className="card" key={i}>
              <div className="row" style={{ alignItems: "flex-start" }}>
                <div>
                  <span className="pill" style={{ fontSize: "0.72rem", marginBottom: 4 }}>
                    {info.tag}
                  </span>
                  <h3>{p[0]}</h3>
                </div>
                <span className="pill warn" style={{ fontSize: "0.78rem" }}>
                  {info.marks}
                </span>
              </div>

              <small className="mu" style={{ display: "block", margin: "4px 0 10px" }}>
                📅 {p[1]} to {p[2]} ({t.length} days)
              </small>

              {/* Progress bars for squad */}
              <div style={{ margin: "12px 0" }}>
                {rank.map((u) => {
                  const n = t.filter((_, d) => u.topics?.[`${i}-${d}`]).length;
                  const pct = Math.round((n / t.length) * 100);
                  const isMe = u.id === user?.uid;
                  return (
                    <div key={u.id} style={{ margin: "8px 0" }}>
                      <div className="row" style={{ fontSize: "0.84rem" }}>
                        <span>
                          <b>{u.name}</b>
                          {isMe ? " (Nee)" : ""}
                        </span>
                        <span className={pct > 0 ? "pos" : "mu"}>
                          {n}/{t.length} ({pct}%)
                        </span>
                      </div>
                      <div className="bar">
                        <i style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {leaders[0] && leaders[0].completed > 0 && (
                <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "6px 10px", borderRadius: 10, border: "1px solid var(--line)", marginTop: 8 }}>
                  <small className="mu">
                    👑 <b>Subject Leader:</b> {leaders[0].id === user?.uid ? "Nee" : leaders[0].name} ({leaders[0].completed}/{t.length} topics)
                  </small>
                </div>
              )}

              {/* Expandable topic list */}
              <details style={{ marginTop: 12 }}>
                <summary className="mu">View all {t.length} Topics & Daily Breakdown</summary>
                <ul style={{ paddingLeft: 18, margin: "8px 0 4px", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {t.map((topicName, dayIdx) => {
                    const isDoneByMe = me?.topics?.[`${i}-${dayIdx}`];
                    return (
                      <li key={dayIdx} style={{ margin: "6px 0", color: isDoneByMe ? "var(--g)" : "var(--tx)" }}>
                        <span>{isDoneByMe ? "✅ " : "⚪ "}</span>
                        {topicName}
                      </li>
                    );
                  })}
                </ul>
              </details>
            </div>
          );
        })}
      </div>
    </>
  );
}
