"use client";
import { useState } from "react";
import { getNextAvailableTopic } from "@/lib/data";

export default function FastTrack({ me, today, onAdvanceDone, onAdvanceUndo, isTodayComplete }) {
  const [open, setOpen] = useState(false);
  const nextTopic = getNextAvailableTopic(today, me.topics || {});
  const daysAhead = me.daysAhead || 0;
  const bufferHours = me.bufferHours || 0;
  const aheadList = me.ahead || [];

  // Active if user has banked buffer days, today's work is done, or user opened it
  const isExpanded = open || daysAhead > 0;

  return (
    <div className={`card fasttrack-card ${daysAhead > 0 ? "active-overdrive" : ""}`}>
      <div className="row">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, color: "var(--b)" }}>⚡ Fast-Track / Overdrive Mode</h3>
            {daysAhead > 0 ? (
              <span className="pill pos" style={{ fontSize: "0.78rem" }}>
                🛡️ +{daysAhead}d Buffer Shield Active
              </span>
            ) : isTodayComplete ? (
              <span className="pill warn" style={{ fontSize: "0.78rem" }}>
                🎉 Today Complete · Ready to Advance
              </span>
            ) : (
              <span className="pill mu" style={{ fontSize: "0.78rem" }}>
                Optional Speedrun
              </span>
            )}
          </div>
          <small className="mu" style={{ display: "block", marginTop: 4 }}>
            Bank extra days early, pull your syllabus completion date forward & expand revision time
          </small>
        </div>

        <button
          type="button"
          className="ghost"
          style={{ padding: "6px 14px", fontSize: "0.82rem" }}
          onClick={() => setOpen(!isExpanded)}
        >
          {isExpanded ? "Collapse ▴" : "⚡ Unlock Next Day ▾"}
        </button>
      </div>

      {!isExpanded && !isTodayComplete && (
        <div style={{ marginTop: 10 }}>
          <p className="mu" style={{ fontSize: "0.88rem", margin: "6px 0" }}>
            Innathe tasks kazhinjittundo? Ee option vechu naalathe topic innu thanne padichu{" "}
            <b>+1 Buffer Day</b> bank cheyyaam. Exam-nu munpe syllabus vegam theerum! ⏩
          </p>
        </div>
      )}

      {isExpanded && (
        <div style={{ marginTop: 14 }}>
          {/* Buffer Mathematics & Telemetry Grid */}
          <div className="fasttrack-grid">
            <div className="ft-metric">
              <span className="ft-label">🛡️ Buffer Bank</span>
              <b className="ft-val pos">+{daysAhead} Days</b>
              <small className="mu">{bufferHours}h time shield against breaks</small>
            </div>
            <div className="ft-metric">
              <span className="ft-label">⏩ Velocity</span>
              <b className="ft-val warn">
                {daysAhead > 0 ? `${daysAhead + 1}.0x` : "1.0x"}
              </b>
              <small className="mu">
                {daysAhead > 0 ? `${daysAhead + 1} days worth studied` : "Standard pace"}
              </small>
            </div>
            <div className="ft-metric">
              <span className="ft-label">📅 Core Syllabus Finish</span>
              <b className="ft-val" style={{ color: "var(--b)" }}>
                {me.projectedCoreEnd || "2027-01-16"}
              </b>
              <small className="mu">
                {daysAhead > 0 ? `Pulled ${daysAhead}d earlier!` : "Target date"}
              </small>
            </div>
            <div className="ft-metric">
              <span className="ft-label">🏖️ Mocks & Revision</span>
              <b className="ft-val pos">
                {me.totalRevisionDays || 36} Days
              </b>
              <small className="mu">
                +{daysAhead} extra cushion days before GATE
              </small>
            </div>
          </div>

          {/* Time Expansion Reality Banner */}
          <div className="time-expansion-banner">
            <small style={{ color: "var(--tx-dim)", lineHeight: 1.5, display: "block" }}>
              💡 <b>Time Expansion Logic:</b> When you complete tomorrow's topic today, you bank a{" "}
              <b>+24 Hour Buffer Shield</b>. If you take a rest tomorrow, your timetable, zero-days, and streak are{" "}
              <b>100% protected</b> by your banked buffer!
            </small>
          </div>

          {/* Unlocked Next Day's Mission */}
          {nextTopic ? (
            <div className="overdrive-topic-box">
              <div className="row">
                <span className="pill" style={{ background: "rgba(56, 189, 248, 0.15)", borderColor: "var(--b)", color: "var(--b)" }}>
                  🗓️ Scheduled for: {nextTopic.date} · {nextTopic.phase}
                </span>
                <span className="pos" style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                  Reward: +10 pts & +1 Buffer Day 🛡️
                </span>
              </div>

              <div style={{ margin: "10px 0" }}>
                <b style={{ fontSize: "1.05rem", color: "#fff", display: "block" }}>
                  {nextTopic.topic}
                </b>
                <small className="mu" style={{ display: "block", marginTop: 4 }}>
                  Padichu theerthu enkil thazhe click cheyyu. Timetable auto-fast-track aakum.
                </small>
              </div>

              <div className="row" style={{ marginTop: 12 }}>
                <button
                  type="button"
                  style={{
                    background: "linear-gradient(135deg, #0284c7, #0369a1)",
                    color: "#fff",
                    padding: "9px 18px",
                    fontWeight: 700,
                  }}
                  onClick={() => onAdvanceDone(nextTopic)}
                >
                  ⚡ Complete Advance Day (+10 pts)
                </button>
                <small className="mu">
                  Pulls syllabus target 1 day earlier immediately.
                </small>
              </div>
            </div>
          ) : (
            <div className="card" style={{ background: "rgba(16, 185, 129, 0.08)", borderColor: "var(--g)" }}>
              <p className="pos" style={{ margin: 0, fontWeight: 700 }}>
                🏆 Full Timetable Completed Ahead of Schedule! You are fully ahead of the entire syllabus.
              </p>
            </div>
          )}

          {/* Banked Advance Topics List */}
          {aheadList.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ fontSize: "0.92rem", color: "var(--b)", margin: "0 0 8px" }}>
                📦 Banked Buffer Days ({aheadList.length} topic{aheadList.length > 1 ? "s" : ""} completed ahead)
              </h4>
              <div className="banked-list">
                {aheadList.map((item) => (
                  <div key={item.id} className="banked-item">
                    <div>
                      <b style={{ fontSize: "0.9rem" }}>{item.topic}</b>
                      <small className="mu" style={{ display: "block" }}>
                        {item.phase} · Scheduled for {item.date}
                      </small>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="pill pos" style={{ fontSize: "0.74rem" }}>
                        Banked ✅ (+24h)
                      </span>
                      <button
                        type="button"
                        className="ghost"
                        style={{ padding: "2px 8px", fontSize: "0.72rem" }}
                        title="Undo advance completion"
                        onClick={() => onAdvanceUndo(item)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
