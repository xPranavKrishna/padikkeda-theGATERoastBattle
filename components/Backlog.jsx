"use client";
import { useState } from "react";
import { catchPlan, ymd } from "@/lib/score";

export default function Backlog({ me, onDone }) {
  const today = ymd();
  const plan = catchPlan(me.backlog, today);
  const now = plan.filter((x) => x.on === today);
  const later = plan.filter((x) => x.on !== today);
  const [viewAll, setViewAll] = useState(false);

  if (!plan.length) {
    return (
      <div className="card">
        <div className="row">
          <h3>🔁 Smart Catch-Up Box</h3>
          <span className="pill pos">0 Backlog</span>
        </div>
        <p className="pos" style={{ fontWeight: 600, margin: "6px 0 0" }}>
          Backlog zero! Full syllabus on track. Ee discipline continue cheyyu 👏
        </p>
      </div>
    );
  }

  const displayedList = viewAll || now.length === 0 ? plan : now;

  return (
    <div className="card catch">
      <div className="row">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h3 style={{ margin: 0 }}>🔁 Smart Catch-Up Box</h3>
            <span className="pill neg">{plan.length} overdue</span>
          </div>
          <small className="mu" style={{ display: "block", marginTop: 4 }}>
            Auto-rescheduled backlog · Oldest skipped topics prioritized first
          </small>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            className={!viewAll && now.length > 0 ? "ghost active-filter" : "ghost"}
            style={{ padding: "4px 12px", fontSize: "0.8rem" }}
            onClick={() => setViewAll(false)}
          >
            Today's Quota ({now.length})
          </button>
          <button
            type="button"
            className={viewAll || now.length === 0 ? "ghost active-filter" : "ghost"}
            style={{ padding: "4px 12px", fontSize: "0.8rem" }}
            onClick={() => setViewAll(true)}
          >
            All Backlog ({plan.length})
          </button>
        </div>
      </div>

      {/* Procrastination Impact Telemetry */}
      <div className="stats3" style={{ margin: "12px 0 10px" }}>
        <div>
          <b className="neg">−{plan.length * 2} pts</b>
          <small>Pending penalty leak</small>
        </div>
        <div>
          <b className="pos">+{plan.length * 6} pts</b>
          <small>Recoverable score</small>
        </div>
        <div>
          <b className="warn">{plan.length > 5 ? "💀 Heavy" : "⏳ Moderate"}</b>
          <small>Backlog load</small>
        </div>
      </div>

      <p className="mu" style={{ fontSize: "0.86rem", margin: "4px 0 12px" }}>
        Skip cheytha topics timetable-il ninnu auto-reschedule aayathaanu. Oro topic theerthaal{" "}
        <b className="pos">+6 pts</b> kitti Procrastination index thazhum!
      </p>

      {/* Tasks List */}
      <div className="backlog-items-container" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {displayedList.map((b) => (
          <div className="citem" key={b.id} style={{ margin: 0 }}>
            <div>
              <b style={{ fontSize: "0.93rem" }}>{b.topic}</b>
              <small>
                {b.phase} · Scheduled {b.date} ·{" "}
                <b className={b.age >= 5 ? "neg" : b.age >= 3 ? "warn" : "mu"}>
                  {b.age} day{b.age > 1 ? "s" : ""} overdue
                </b>{" "}
                {b.age >= 5 ? "💀 Critical" : b.age >= 3 ? "🚨 High" : "⏳"}
              </small>
            </div>
            <button
              type="button"
              onClick={() => onDone(b.id)}
              style={{ padding: "7px 14px", fontSize: "0.85rem", whiteSpace: "nowrap" }}
            >
              Done +6
            </button>
          </div>
        ))}
      </div>

      {!viewAll && later.length > 0 && (
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <button
            type="button"
            className="ghost"
            style={{ fontSize: "0.82rem", padding: "4px 14px" }}
            onClick={() => setViewAll(true)}
          >
            Show remaining {later.length} backlog topic{later.length > 1 ? "s" : ""} ▾
          </button>
        </div>
      )}
    </div>
  );
}

