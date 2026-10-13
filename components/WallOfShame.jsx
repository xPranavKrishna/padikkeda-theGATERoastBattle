"use client";

export default function WallOfShame({ rank, today }) {
  if (rank.length <= 1) return null;

  // Find daily leader
  const dailySorted = [...rank].sort((a, b) => b.today - a.today);
  const topper = dailySorted[0];

  // Find daily slacker (duck)
  const slackers = dailySorted.filter((u) => u.today === 0);
  const worstSlacker = slackers.length ? slackers[slackers.length - 1] : dailySorted[dailySorted.length - 1];

  // Find most in danger
  const dangerSorted = [...rank].sort((a, b) => b.procrast - a.procrast);
  const mostInDanger = dangerSorted[0];

  return (
    <div className="card wall-card">
      <div className="row">
        <div>
          <h3>🏛️ Hall of Glory vs Wall of Shame</h3>
          <small className="mu">Daily public roll of honor & lazy man callout</small>
        </div>
        <span className="pill mu">Public Roll</span>
      </div>

      <div className="wall-grid">
        {/* Glory Card */}
        <div className="wall-item glory-item">
          <div className="wall-badge">👑 Innathe Mass Raja</div>
          <b style={{ fontSize: "1.15rem", display: "block" }}>{topper.name}</b>
          <div className="pos" style={{ fontSize: "1.3rem", fontWeight: 800, margin: "2px 0" }}>
            +{topper.today} pts today
          </div>
          <small className="mu">
            Total: {topper.score} pts · 🔥 {topper.streak}d streak
          </small>
          <p className="wall-desc pos">"Consistency aanu King! Baakiyullavar nokki nilkkunnu."</p>
        </div>

        {/* Slacker Duck of the Day */}
        <div className="wall-item shame-item">
          <div className="wall-badge duck-badge">🦆 Innathe Tharavu (Duck)</div>
          <b style={{ fontSize: "1.15rem", display: "block" }}>{worstSlacker.name}</b>
          <div className="neg" style={{ fontSize: "1.3rem", fontWeight: 800, margin: "2px 0" }}>
            {worstSlacker.today === 0 ? "0 pts today (💀)" : `+${worstSlacker.today} pts`}
          </div>
          <small className="mu">
            {worstSlacker.missed} zero days · ⏳ {worstSlacker.backlog.length} pending
          </small>
          <p className="wall-desc neg">
            {worstSlacker.today === 0
              ? '"Phone vekkilla, padikkilla, pakshe GATE 2027 AIR 1 venam ennu aashikkunnu."'
              : '"Alpam padichu, pakshe madi pinnil thanne undu."'}
          </p>
        </div>

        {/* ICU Patient */}
        {mostInDanger && mostInDanger.procrast >= 45 && (
          <div className="wall-item icu-item">
            <div className="wall-badge icu-badge">🚨 ICU Patient of the Squad</div>
            <b style={{ fontSize: "1.15rem", display: "block" }}>{mostInDanger.name}</b>
            <div className="neg" style={{ fontSize: "1.3rem", fontWeight: 800, margin: "2px 0" }}>
              Danger: {mostInDanger.procrast}/100
            </div>
            <small className="mu">
              {mostInDanger.backlog.length} skipped topics · −{mostInDanger.penalty} penalty
            </small>
            <p className="wall-desc neg">
              "GATE ICU bed-il aanu! Innu catch-up cheythillenkil ventilator venam."
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
