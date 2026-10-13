"use client";
import { useState } from "react";
import { duelRoast, waShareText } from "@/lib/roast";
import { playBuzzer, playChime } from "@/lib/sound";

export default function DuelArena({ me, others }) {
  const [selectedId, setSelectedId] = useState(others[0]?.id || "");
  const [copied, setCopied] = useState(false);

  if (!others.length) {
    return (
      <div className="card duel-card" style={{ textAlign: "center", padding: "28px 20px" }}>
        <span style={{ fontSize: "2.4rem", display: "block", marginBottom: 8 }}>⚔️</span>
        <h3>🥊 1-on-1 Head-to-Head Clash Arena</h3>
        <p className="mu" style={{ maxWidth: 440, margin: "6px auto 14px", fontSize: "0.92rem" }}>
          Koottukaar aarum innum arena-il join cheythilla! Share your site link with your study buddy so the war can start.
        </p>
        <button
          type="button"
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.origin);
              playChime();
              setCopied(true);
              setTimeout(() => setCopied(false), 2500);
            }
          }}
        >
          {copied ? "Link Copied! 📋" : "Copy Invite Link 🔗"}
        </button>
      </div>
    );
  }

  const opp = others.find((u) => u.id === selectedId) || others[0];
  const roast = duelRoast(me, opp);
  const waText = waShareText(me, opp);

  // Tug of war calculation
  const totalToday = (me.today || 0) + (opp.today || 0);
  const myPct = totalToday > 0 ? Math.round(((me.today || 0) / totalToday) * 100) : 50;
  const oppPct = 100 - myPct;

  const copyRoast = () => {
    navigator.clipboard.writeText(waText);
    setCopied(true);
    playChime();
    setTimeout(() => setCopied(false), 3000);
  };

  const openWhatsApp = () => {
    playBuzzer();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="card duel-card">
      <div className="row">
        <div>
          <h3>🥊 1-on-1 Clash Arena</h3>
          <small className="mu">Head-to-head stats & WhatsApp roast missiles</small>
        </div>
        {others.length > 1 && (
          <select
            className="rival-select"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            aria-label="Select Rival"
          >
            {others.map((u) => (
              <option key={u.id} value={u.id}>
                vs {u.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Fighters Header */}
      <div className="fighters-grid">
        <div className="fighter me-side">
          <span className="pill pos" style={{ fontSize: "0.75rem", marginBottom: 4 }}>
            🛡️ Gladiator (Nee)
          </span>
          <h4>{me.name}</h4>
          <b className="fighter-score pos">{me.score} pts</b>
          <div className="fighter-stat">
            Today: <b>+{me.today}</b> · 🔥 {me.streak}d streak
          </div>
        </div>

        <div className="vs-badge">VS</div>

        <div className="fighter opp-side">
          <span className="pill warn" style={{ fontSize: "0.75rem", marginBottom: 4 }}>
            ⚔️ Rival Fighter
          </span>
          <h4>{opp.name}</h4>
          <b className="fighter-score warn">{opp.score} pts</b>
          <div className="fighter-stat">
            Today: <b>+{opp.today}</b> · 🔥 {opp.streak}d streak
          </div>
        </div>
      </div>

      {/* Tug of war bar */}
      <div style={{ margin: "16px 0 8px" }}>
        <div className="row mu" style={{ fontSize: "0.82rem", marginBottom: 5 }}>
          <span>
            Ninte Share: <b className="pos">{myPct}%</b>
          </span>
          <span style={{ fontWeight: 700, color: "var(--tx)" }}>⚡ Today's Effort Dominance</span>
          <span>
            {opp.name}: <b className="warn">{oppPct}%</b>
          </span>
        </div>
        <div className="tug-bar">
          <i className="tug-me" style={{ width: `${myPct}%` }} />
          <i className="tug-opp" style={{ width: `${oppPct}%` }} />
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="matrix-table-wrap">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Nee</th>
              <th>{opp.name}</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Innathe Points</td>
              <td className={me.today >= opp.today ? "pos" : "neg"}>
                <b>+{me.today}</b>
              </td>
              <td className={opp.today >= me.today ? "pos" : "neg"}>
                <b>+{opp.today}</b>
              </td>
              <td>
                {me.today > opp.today ? "Nee Leads 🔥" : me.today < opp.today ? `${opp.name} Leads 🚨` : "Equal 🤝"}
              </td>
            </tr>
            <tr>
              <td>Total Score</td>
              <td className={me.score >= opp.score ? "pos" : "neg"}>
                <b>{me.score}</b>
              </td>
              <td className={opp.score >= me.score ? "pos" : "neg"}>
                <b>{opp.score}</b>
              </td>
              <td>
                {me.score > opp.score ? `+${me.score - opp.score} pts` : `−${opp.score - me.score} pts`}
              </td>
            </tr>
            <tr>
              <td>🔥 Streak</td>
              <td>{me.streak} days</td>
              <td>{opp.streak} days</td>
              <td>{me.streak >= opp.streak ? "Nee Ahead" : `${opp.name} Ahead`}</td>
            </tr>
            <tr>
              <td>Zero Days (Shame)</td>
              <td className={me.missed ? "neg" : "pos"}>{me.missed} days</td>
              <td className={opp.missed ? "neg" : "pos"}>{opp.missed} days</td>
              <td>{me.missed < opp.missed ? "Less Lazy 👏" : me.missed > opp.missed ? "More Lazy 🦆" : "Equal"}</td>
            </tr>
            <tr>
              <td>Syllabus Finished</td>
              <td>{me.pct}% ({me.topics})</td>
              <td>{opp.pct}% ({opp.topics})</td>
              <td>{me.pct >= opp.pct ? "Ahead 📚" : "Behind ⏳"}</td>
            </tr>
            <tr>
              <td>Danger Level</td>
              <td className={me.procrast < 45 ? "pos" : "neg"}>{me.procrast}/100</td>
              <td className={opp.procrast < 45 ? "pos" : "neg"}>{opp.procrast}/100</td>
              <td>{me.procrast <= opp.procrast ? "Safer 😎" : "Higher Risk 💀"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Duel Roast & Actions */}
      <div className="duel-roast-box">
        <p className="neg" style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.5 }}>
          🌶️ <b>Duel Reality Check:</b> {roast}
        </p>
        <div className="row" style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={openWhatsApp}
            style={{
              background: "#25D366",
              color: "#03170b",
              fontWeight: 800,
              boxShadow: "0 4px 16px rgba(37, 211, 102, 0.35)",
            }}
          >
            WhatsApp-il Roast Ayakku 📲
          </button>
          <button type="button" className="ghost" onClick={copyRoast}>
            {copied ? "Copied! ✅" : "Copy Roast 📋"}
          </button>
        </div>
      </div>
    </div>
  );
}
