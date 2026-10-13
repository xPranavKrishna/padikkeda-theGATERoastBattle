"use client";
import { level } from "@/lib/score";
import { playBuzzer } from "@/lib/sound";

export default function DangerMeter({ me }) {
  const [, name, emoji, tone, msg] = level(me.procrast, me.daysAhead);
  const marksAtRisk = Math.min(65, me.backlog.length * 1.2 + me.missed * 1.8).toFixed(1);

  return (
    <div className={"card danger " + tone}>
      <div className="row">
        <div>
          <h3>🚨 Procrastination Danger Meter</h3>
          <small className="mu">ICU vital stats & marks at risk</small>
        </div>
        <span className={"pill " + tone + (me.procrast >= 45 ? " pulse" : "")}>
          {emoji} {name}
          {me.daysAhead > 0 && ` (+${me.daysAhead}d Buffer)`}
        </span>
      </div>

      <div className="gauge">
        <u style={{ left: `${me.procrast}%` }} />
      </div>

      <div className="row mu" style={{ fontSize: "0.86rem" }}>
        <span>Procrastination Index</span>
        <b className={tone} style={{ fontSize: "1.05rem" }}>
          {me.procrast} / 100
        </b>
      </div>

      <p className={tone} style={{ margin: "8px 0 12px", fontSize: "0.92rem", lineHeight: 1.45 }}>
        <b>{msg}</b>
      </p>

      <div className="stats3">
        <div>
          <b className="pos">+{me.earned}</b>
          <small>Learning pts</small>
        </div>
        <div>
          <b className="neg">−{me.penalty}</b>
          <small>Penalty pts</small>
        </div>
        <div>
          <b className={me.backlog.length ? "warn" : "pos"}>{me.backlog.length}</b>
          <small>Topics pending</small>
        </div>
      </div>

      <div className="regret-box">
        <div className="row">
          <small className="neg" style={{ fontSize: "0.85rem" }}>
            ⚠️ <b>GATE Marks at Risk: ~{marksAtRisk} Marks</b>
          </small>
          <button
            type="button"
            className="ghost"
            style={{ padding: "3px 10px", fontSize: "0.78rem", borderColor: "rgba(244, 63, 94, 0.4)" }}
            onClick={() => playBuzzer()}
          >
            Wake-up Buzzer 🚨
          </button>
        </div>
        <small className="mu" style={{ display: "block", marginTop: 4 }}>
          Zero days: {me.missed} × −15 pts · Pending topics: {me.backlog.length} × −2 pts
        </small>
      </div>
    </div>
  );
}
