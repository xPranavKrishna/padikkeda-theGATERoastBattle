"use client";
import { useState, useEffect, useRef } from "react";
import { playChime, playBuzzer, playSuccessFanfare } from "@/lib/sound";

const MODES = [
  { id: "pomo", label: "🍅 Pomodoro", mins: 25, desc: "25 min uninterrupted hyper-focus sprint", taskKey: "q" },
  { id: "concept", label: "🧠 Concept", mins: 80, desc: "80 min deep dive into today's syllabus topic", taskKey: "c" },
  { id: "recall", label: "🔁 Recall", mins: 10, desc: "10 min closed-book retrieval & error audit", taskKey: "r" },
];

export default function Timer({ onCompleteTask }) {
  const [modeIdx, setModeIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(MODES[0].mins * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pauseRoast, setPauseRoast] = useState("");
  const totalSeconds = MODES[modeIdx].mins * 60;
  const intervalRef = useRef(null);

  useEffect(() => {
    setIsRunning(false);
    setSecondsLeft(MODES[modeIdx].mins * 60);
    setPauseRoast("");
  }, [modeIdx]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playSuccessFanfare();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggle = () => {
    if (isRunning) {
      setIsRunning(false);
      playBuzzer();
      const roasts = [
        "Enthaada 10 minute polum irikkan kazhiyille? Madi maatteda! 😒",
        "Phone thottaal pinne Reels-il theerum. Focus kalayaruthu! 📱💀",
        "Break edukkan enthaada cheythe? Oru numerical polum theernnilla!",
        "GATE exam hall-il pause button illa mone! Thudangiyaal theerkkanam.",
        "Focus break cheythathu kandu IIT Bombay professor karayunnu 😭",
      ];
      setPauseRoast(roasts[Math.floor(Math.random() * roasts.length)]);
    } else {
      setIsRunning(true);
      setPauseRoast("");
      playChime();
    }
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(MODES[modeIdx].mins * 60);
    setPauseRoast("");
  };

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const pct = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100);

  return (
    <div className="card timer-card">
      <div className="row">
        <div>
          <h3>⏱️ Battle Focus Timer</h3>
          <small className="mu">Ultradian focus cycle & deep work consolidation</small>
        </div>
        <span className={`pill ${isRunning ? "pos pulse" : "mu"}`}>
          {isRunning ? "⚡ In Deep Focus" : "⏸️ Session Paused"}
        </span>
      </div>

      <div className="timer-modes">
        {MODES.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className={`timer-tab ${modeIdx === i ? "active" : "ghost"}`}
            onClick={() => setModeIdx(i)}
          >
            {m.label} ({m.mins}m)
          </button>
        ))}
      </div>

      <div className="timer-display">
        <div className="timer-num">{format(secondsLeft)}</div>
        <div className="bar timer-bar">
          <i
            style={{
              width: `${pct}%`,
              background: isRunning
                ? "linear-gradient(90deg, #8b5cf6, #38bdf8)"
                : "linear-gradient(90deg, #64748b, #94a3b8)",
            }}
          />
        </div>
        <small className="mu">
          {MODES[modeIdx].desc} • <b>{pct}% finished</b>
        </small>
      </div>

      {pauseRoast && (
        <div
          style={{
            background: "rgba(244, 63, 94, 0.1)",
            border: "1px solid rgba(244, 63, 94, 0.3)",
            borderRadius: 12,
            padding: "8px 12px",
            marginTop: 8,
          }}
        >
          <p className="neg timer-roast" style={{ margin: 0, fontSize: "0.88rem" }}>
            🌶️ <b>Reality Slap:</b> {pauseRoast}
          </p>
        </div>
      )}

      {secondsLeft === 0 && (
        <div className="timer-finished">
          <p className="pos" style={{ margin: "0 0 10px", fontSize: "0.95rem" }}>
            <b>🎉 Mass! Focus session completed! Synaptic memory consolidated.</b>
          </p>
          {onCompleteTask && (
            <button
              type="button"
              onClick={() => {
                onCompleteTask(MODES[modeIdx].taskKey);
                reset();
              }}
              style={{ padding: "8px 18px", fontSize: "0.9rem" }}
            >
              Tick Matching Mission Task Now ✅
            </button>
          )}
        </div>
      )}

      <div className="row" style={{ marginTop: 14 }}>
        <button
          type="button"
          onClick={toggle}
          style={{
            flex: 1,
            background: isRunning
              ? "rgba(255, 255, 255, 0.08)"
              : "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            color: "#fff",
            border: isRunning ? "1px solid var(--line)" : 0,
            padding: "11px 18px",
          }}
        >
          {isRunning ? "Pause Session ⏸️" : "Start Focus Session 🔥"}
        </button>
        <button type="button" className="ghost" onClick={reset} style={{ padding: "11px 16px" }}>
          Reset 🔄
        </button>
      </div>
    </div>
  );
}
