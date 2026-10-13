"use client";
import { useAuth } from "@/context/AuthContext";
import { ranked } from "@/lib/score";

export default function Leaderboard() {
  const { user, users } = useAuth();
  const rank = ranked(users);
  const me = user ? rank.find((u) => u.id === user.uid) : null;
  const avgToday = rank.length ? Math.round(rank.reduce((s, u) => s + u.today, 0) / rank.length) : 0;
  const totalZeroDays = rank.reduce((s, u) => s + u.missed, 0);

  const getBadges = (u, i) => {
    const b = [];
    if (i === 0) b.push({ label: "👑 Topper", cls: "pos" });
    if (u.streak >= 3) b.push({ label: `🔥 ${u.streak}d`, cls: "warn" });
    if (u.today === 0) b.push({ label: "🦆 Duck (0 Today)", cls: "neg" });
    if (u.procrast >= 70) b.push({ label: "💀 ICU", cls: "neg" });
    if (u.missed === 0 && u.score > 20) b.push({ label: "🛡️ Zero-Deficit", cls: "pos" });
    return b;
  };

  // Olympic order: Silver (2nd) - Gold (1st) - Bronze (3rd)
  const podiumList = [];
  if (rank.length >= 3) {
    podiumList.push({ u: rank[1], place: 2, icon: "🥈", cls: "rank-2" });
    podiumList.push({ u: rank[0], place: 1, icon: "🥇", cls: "rank-1" });
    podiumList.push({ u: rank[2], place: 3, icon: "🥉", cls: "rank-3" });
  } else if (rank.length === 2) {
    podiumList.push({ u: rank[0], place: 1, icon: "🥇", cls: "rank-1" });
    podiumList.push({ u: rank[1], place: 2, icon: "🥈", cls: "rank-2" });
  }

  return (
    <>
      <div className="row">
        <div>
          <h1>🏆 Battle Arena Leaderboard</h1>
          <p className="mu">Public battle board. Real-time overtake alerts on sync.</p>
        </div>
        {me && rank[0] && me.id !== rank[0].id && (
          <span className="pill warn" style={{ fontSize: "0.88rem" }}>
            ⚔️ Gap with #1: <b>{rank[0].score - me.score} pts</b>
          </span>
        )}
      </div>

      {/* Olympic Podium */}
      {podiumList.length > 0 && (
        <div className="podium-grid">
          {podiumList.map(({ u, place, icon, cls }) => (
            <div
              key={u.id}
              className={`podium-card ${cls} ${u.id === user?.uid ? "is-me" : ""}`}
            >
              <div className="podium-crown">{icon}</div>
              <span className="pill" style={{ fontSize: "0.75rem", marginBottom: 6 }}>
                Rank #{place}
              </span>
              <b className="podium-name">
                {u.name}
                {u.id === user?.uid ? " (Nee)" : ""}
              </b>
              <div className="podium-score">{u.score} pts</div>
              <small className="mu" style={{ display: "block", marginTop: 4 }}>
                Today: <b>+{u.today}</b> · 🔥 {u.streak}d · 📚 {u.pct}%
              </small>
            </div>
          ))}
        </div>
      )}

      {/* Squad Status Overview */}
      <div className="card squad-status">
        <div className="row">
          <div>
            <h3>👥 Squad Health Telemetry</h3>
            <small className="mu">Collective performance & discipline audit</small>
          </div>
          <span className={`pill ${avgToday < 10 ? "neg" : "pos"}`}>
            {avgToday < 10 ? "💀 Sinking Squad" : "🔥 Active Battle"}
          </span>
        </div>

        <div className="stats3" style={{ margin: "14px 0 10px" }}>
          <div>
            <b>{rank.length}</b>
            <small>Gladiators</small>
          </div>
          <div>
            <b className={avgToday < 10 ? "neg" : "pos"}>{avgToday} pts</b>
            <small>Squad Today Avg</small>
          </div>
          <div>
            <b className="neg">{totalZeroDays}</b>
            <small>Total Zero Days</small>
          </div>
        </div>

        <p className={avgToday < 10 ? "neg" : "pos"} style={{ margin: 0, fontSize: "0.92rem" }}>
          {avgToday < 8
            ? "🌶️ Team motham kidannu urangunnu! GATE 2027-il aarum crack cheyyilla ennaano theerumaanam?"
            : "💪 Squad-il chila aalukal active aanu. Baakiyullavar koodi madi maattedaa!"}
        </p>
      </div>

      {/* Detailed Standings Table */}
      <div className="card">
        <h3>📋 Full Gladiator Standings</h3>
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Gladiator</th>
                <th>Score</th>
                <th>Today</th>
                <th>🔥 Streak</th>
                <th>Zero Days</th>
                <th>Syllabus</th>
                <th>Badges</th>
              </tr>
            </thead>
            <tbody>
              {rank.map((u, i) => {
                const badges = getBadges(u, i);
                const isMe = u.id === user?.uid;
                return (
                  <tr key={u.id} className={isMe ? "my-row" : ""}>
                    <td>
                      <b style={{ fontFamily: "Outfit, sans-serif" }}>
                        {["🥇", "🥈", "🥉"][i] || i + 1}
                      </b>
                    </td>
                    <td>
                      <b>{u.name}</b>
                      {isMe && (
                        <span className="pill pos" style={{ marginLeft: 6, fontSize: "0.72rem" }}>
                          Nee
                        </span>
                      )}
                    </td>
                    <td>
                      <b className="pos" style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.05rem" }}>
                        {u.score}
                      </b>
                    </td>
                    <td className={u.today === 0 ? "neg" : "pos"}>
                      <b>{u.today === 0 ? "0 🦆" : `+${u.today}`}</b>
                    </td>
                    <td>{u.streak}d</td>
                    <td className={u.missed ? "neg" : ""}>{u.missed}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="bar" style={{ width: 60, height: 6, margin: 0 }}>
                          <i style={{ width: `${u.pct}%` }} />
                        </div>
                        <small>{u.pct}%</small>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {badges.map((b, bi) => (
                          <span
                            key={bi}
                            className={`pill ${b.cls}`}
                            style={{ fontSize: "0.7rem", padding: "1px 6px" }}
                          >
                            {b.label}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rules of War Card */}
      <div className="card roast">
        <h4 style={{ color: "var(--o)", margin: "0 0 6px" }}>⚔️ Rules of War</h4>
        <p className="pos" style={{ margin: "4px 0", fontSize: "0.88rem" }}>
          ✅ +10 Concept · +10 Questions · +5 GA · +5 Recall · +2 per GATE PYQ · +6 per Catch-up topic · +10 Full-Day Bonus · +2 per Streak day.
        </p>
        <p className="neg" style={{ margin: "4px 0", fontSize: "0.88rem" }}>
          💀 −15 per Zero-Day (joined date to yesterday) · ⏳ −2 per pending skipped topic.
        </p>
      </div>
    </>
  );
}
