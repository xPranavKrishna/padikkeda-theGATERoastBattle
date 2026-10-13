"use client";
import { pts, yesterday } from "@/lib/score";
import { todayTopic, START } from "@/lib/data";
import { verdict } from "@/lib/roast";
import { useMemo } from "react";

const ITEMS = [
  ["c", "🧠 Concept"],
  ["q", "✍️ Questions"],
  ["g", "🎯 GA"],
  ["r", "🔁 Recall"],
];

export default function YesterdayReport({ me, rank }) {
  const y = yesterday();
  const d = me.days?.[y] || {};
  const p = pts(d);
  const t = todayTopic(y);
  const v = useMemo(() => verdict(p), [p]);

  if (y < START) {
    return (
      <div className="card">
        <h3>📋 Yesterday's Audit Report</h3>
        <p className="mu">
          Innu aanu Day 1. Report naale muthal varum — innu thanne start cheyyu, aadyathe divasam thanne nashtappedutharuthu!
        </p>
      </div>
    );
  }

  const topicDone = t && me.topics?.[t.id];

  // Head-to-head yesterday summary
  const yesterdayScores = rank
    .map((u) => ({
      id: u.id,
      name: u.name,
      points: pts(u.days?.[y] || {}),
    }))
    .sort((a, b) => b.points - a.points);

  const mvp = yesterdayScores[0];
  const duck = yesterdayScores.length > 1 ? yesterdayScores[yesterdayScores.length - 1] : null;

  return (
    <div className="card report">
      <div className="row">
        <div>
          <h3>📋 Yesterday's Audit Report</h3>
          <small className="mu">Date: {y}</small>
        </div>
        <b
          className={p ? "pos" : "neg"}
          style={{ fontSize: "1.25rem", fontFamily: "Outfit, sans-serif" }}
        >
          {p ? `+${p}` : "−15"} pts
        </b>
      </div>

      <div className="chips">
        {ITEMS.map(([k, l]) => (
          <span key={k} className={"chip " + (d[k] ? "ok" : "bad")}>
            {d[k] ? "✅" : "❌"} {l}
          </span>
        ))}
        <span className="chip">📝 {d.p || 0} PYQs</span>
        {d.b ? <span className="chip ok">🔁 {d.b} catch-up</span> : null}
      </div>

      {t && !t.rev && (
        <p className="mu" style={{ fontSize: "0.9rem" }}>
          Yesterday's topic: <b>{t.topic}</b> —{" "}
          {topicDone ? (
            <span className="pos">completed ✔</span>
          ) : (
            <span className="neg">skipped, moved to catch-up box ⏳</span>
          )}
        </p>
      )}

      <p className={p ? "pos" : "neg"} style={{ fontSize: "0.92rem", fontWeight: 600 }}>
        🌶️ {v}
      </p>

      {/* Yesterday's Match Results */}
      {rank.length > 1 && mvp && (
        <div
          className="row"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid var(--line)",
            marginTop: 8,
          }}
        >
          <small>
            👑 <b>Yesterday's MVP:</b> {mvp.id === me.id ? "Nee (Mass!)" : mvp.name} (+{mvp.points} pts)
          </small>
          {duck && duck.points === 0 && (
            <small className="neg">
              🦆 <b>Tharavu:</b> {duck.id === me.id ? "Nee (Madi!)" : duck.name} (0 pts 💀)
            </small>
          )}
        </div>
      )}

      <div className="chips" style={{ marginTop: 10 }}>
        <small className="mu" style={{ alignSelf: "center", marginRight: 6 }}>
          Squad yesterday:
        </small>
        {yesterdayScores.map((u) => (
          <span key={u.id} className={"chip " + (u.points ? "" : "bad")}>
            {u.id === me.id ? "Nee" : u.name}: {u.points ? `+${u.points}` : "0 (💀)"}
          </span>
        ))}
      </div>
    </div>
  );
}
