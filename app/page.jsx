"use client";
import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc, setDoc, deleteField } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { ranked, ymd } from "@/lib/score";
import { roast, EMERGENCY_PILLS } from "@/lib/roast";
import { todayTopic, gaToday, addDays, diff, START, PLAN_DAYS } from "@/lib/data";
import { playChime } from "@/lib/sound";
import Ring from "@/components/Ring";
import TaskCard from "@/components/TaskCard";
import DangerMeter from "@/components/DangerMeter";
import YesterdayReport from "@/components/YesterdayReport";
import Backlog from "@/components/Backlog";
import Timer from "@/components/Timer";
import FastTrack from "@/components/FastTrack";
import DuelArena from "@/components/DuelArena";
import WallOfShame from "@/components/WallOfShame";
import { waShareText } from "@/lib/roast";

function Personal({ uid }) {
  const ref = doc(db, "users", uid, "private", "personal");
  const [items, setItems] = useState([]);
  const [t, setT] = useState("");

  useEffect(() => {
    getDoc(ref).then((s) => s.exists() && setItems(s.data().items || [])).catch(() => {});
  }, [uid]);

  const save = (n) => {
    setItems(n);
    setDoc(ref, { items: n }).catch(() => {});
  };

  return (
    <div className="card">
      <div className="row">
        <h3>🔒 Personal Tasks</h3>
        <small className="mu">Private to-do list (not counted in score)</small>
      </div>
      {items.length === 0 && (
        <p className="mu" style={{ fontSize: "0.88rem", margin: "10px 0" }}>
          No personal tasks yet. Add one below (e.g. "Review Dijkstra proof", "Watch CN lecture 4").
        </p>
      )}
      {items.map((x, i) => (
        <div
          key={i}
          className={"task " + (x.d ? "done" : "")}
          onClick={() => save(items.map((y, j) => (j === i ? { ...y, d: !y.d } : y)))}
        >
          <input type="checkbox" readOnly checked={!!x.d} style={{ width: 18 }} />
          <span>{x.t}</span>
          <button
            type="button"
            className="ghost"
            style={{ marginLeft: "auto", padding: "2px 8px", fontSize: "0.75rem" }}
            onClick={(e) => {
              e.stopPropagation();
              save(items.filter((_, j) => j !== i));
            }}
          >
            ✕
          </button>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (t.trim()) {
            save([...items, { t: t.trim(), d: false }]);
            setT("");
          }
        }}
        style={{ marginTop: 10 }}
      >
        <input
          placeholder="Type a personal task & hit Enter..."
          value={t}
          onChange={(e) => setT(e.target.value)}
        />
      </form>
    </div>
  );
}

function ErrorLog({ uid }) {
  const ref = doc(db, "users", uid, "private", "recall");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    getDoc(ref).then((s) => s.exists() && setNote(s.data().note || "")).catch(() => {});
  }, [uid]);

  const saveNote = async () => {
    try {
      await setDoc(ref, { note }, { merge: true });
      setSaved("Saved ✅");
      setTimeout(() => setSaved(""), 2500);
    } catch (e) {}
  };

  return (
    <div className="card recall-box">
      <div className="row">
        <h3>📝 Active Recall & Error Log Notes</h3>
        <span className="pill mu">Private Scratchpad</span>
      </div>
      <p className="mu" style={{ fontSize: "0.88rem", margin: "6px 0 10px" }}>
        Close your books and write down today's tricky formulas, edge cases, and mistakes from memory:
      </p>
      <textarea
        className="recall-input"
        rows={4}
        placeholder="e.g. CRC generator degree mistake, Dijkstra does not support negative edges, Hamming code parity bit positions..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="row" style={{ marginTop: 8 }}>
        <button type="button" onClick={saveNote} style={{ padding: "8px 16px", fontSize: "0.88rem" }}>
          Save Error Log
        </button>
        {saved && <span className="pos" style={{ fontWeight: 600 }}>{saved}</span>}
      </div>
    </div>
  );
}

function GateCountdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date("2027-02-06T09:00:00+05:30").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="gate-ticker">
      <span className="ticker-label">⏳ GATE CSE 2027 Countdown:</span>
      <div className="ticker-digits">
        <span>{time.d}d</span>
        <span>{time.h}h</span>
        <span>{time.m}m</span>
        <span>{time.s}s</span>
      </div>
      <span className="ticker-quote">· IIT Bombay cutoff waits for no one! 🚀</span>
    </div>
  );
}

const greet = () => {
  const h = new Date().getHours();
  return h < 5
    ? "Rathri aayi, pakshe GATE urangunnilla 🌙"
    : h < 12
    ? "Suprabhaatham! Innathe mission thudangaam 🌅"
    : h < 17
    ? "Uchakku shesham mayakkam venda ☀️"
    : h < 21
    ? "Sandhya aayi, innathe quota theerthoo? 🌇"
    : "Raathri aayi — baaki task theerkku 🌙";
};

export default function Home() {
  const { user, users } = useAuth();
  const today = ymd();
  const ts = todayTopic(today);
  const rank = ranked(users);
  const me = user ? rank.find((u) => u.id === user.uid) : null;
  const [lines, setLines] = useState([]);
  const [pillIdx, setPillIdx] = useState(0);
  const [tab, setTab] = useState("mission"); // "mission", "battle", "recap", "all"

  useEffect(() => {
    if (me) setLines(roast(me, rank));
  }, [users.length, me?.today, me?.missed, me?.backlog.length, rank[0]?.id]);

  if (!user || !me) {
    return (
      <div style={{ textAlign: "center", padding: "14vh 0" }}>
        <span style={{ fontSize: "2.8rem" }} className="logo-flame">🔥</span>
        <h2>Loading your mission...</h2>
        <p className="mu">Gladiator telemetry sync cheyyunnu.</p>
      </div>
    );
  }

  const d = me.days?.[today] || {};
  const ref = doc(db, "users", user.uid);
  const dayNo = Math.max(1, diff(today, START) + 1);

  const tog = async (k) => {
    try {
      const willBeDone = !d[k];
      if (willBeDone) playChime();
      await updateDoc(ref, { [`days.${today}.${k}`]: willBeDone });
      if (k === "c" && ts) {
        await updateDoc(ref, { [`topics.${ts.id}`]: d.c ? deleteField() : true });
      }
    } catch (e) {
      console.error("Toggle task error:", e);
    }
  };

  const pyq = (n) => {
    if (n > 0) playChime();
    updateDoc(ref, { [`days.${today}.p`]: Math.max(0, (d.p || 0) + n) }).catch((e) =>
      console.error("PYQ update error:", e)
    );
  };

  const catchDone = (id) => {
    playChime();
    updateDoc(ref, { [`topics.${id}`]: true, [`days.${today}.b`]: (d.b || 0) + 1 }).catch((e) =>
      console.error("Catch-up update error:", e)
    );
  };

  const advanceDone = async (advanceTopic) => {
    try {
      playChime();
      const currentAdv = d.adv || 0;
      await updateDoc(ref, {
        [`topics.${advanceTopic.id}`]: true,
        [`days.${today}.adv`]: currentAdv + 1,
      });
    } catch (e) {
      console.error("Advance topic error:", e);
    }
  };

  const advanceUndo = async (advanceTopic) => {
    try {
      const currentAdv = d.adv || 0;
      await updateDoc(ref, {
        [`topics.${advanceTopic.id}`]: deleteField(),
        [`days.${today}.adv`]: Math.max(0, currentAdv - 1),
      });
    } catch (e) {
      console.error("Advance undo error:", e);
    }
  };

  const isTodayComplete = !!(d.c && d.q && d.g && d.r) || me.today >= 30;
  const isTodayCoveredInAdvance = !!(ts && me.topics?.[ts.id] && !d.c);

  const nextPill = () => {
    setPillIdx((prev) => (prev + 1) % EMERGENCY_PILLS.length);
  };

  const speakRoast = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const text = lines[0] || EMERGENCY_PILLS[pillIdx];
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.0;
      window.speechSynthesis.speak(u);
    }
  };

  const myRankIdx = rank.findIndex((u) => u.id === me.id);

  const TASKS = [
    [
      "c",
      "🧠",
      "Learn Concept",
      "80 min",
      10,
      ts ? ts.topic : "Free revision day",
      ["Padikkathe ariyaam ennu parayaruthu... 😏", "Brain-il kayari! 🧠"],
    ],
    [
      "q",
      "✍️",
      "Solve Questions",
      "45 min",
      10,
      "Basic problems first, then topic GATE PYQs.",
      ["Lecture kandal mathram pora, solve cheyyu!", "Questions kollaam, kai thazhunnilla ✍️"],
    ],
    [
      "g",
      "🎯",
      "General Aptitude",
      "20 min",
      5,
      gaToday(today),
      ["20 min mathram, madi vendaa.", "GA done, easy 5 points 🎯"],
    ],
    [
      "r",
      "🔁",
      "Recall + Error Log",
      "10 min",
      5,
      "Close books and write down formulas from memory.",
      ["Marakkunnathin munpe ezhuthu!", "Active recall = brain gym 💪"],
    ],
  ];

  return (
    <>
      <GateCountdown />

      {/* Hero Header - Clean & Friendly */}
      <section className="hero">
        <div>
          <small className="mu">
            Day {dayNo} / {PLAN_DAYS} · {today}
          </small>
          <h1>{greet()}</h1>
          <p className="mu" style={{ fontSize: "0.95rem" }}>
            Hey <b>{me.name}</b>, nee Rank <b>#{myRankIdx + 1}</b> aanu ({rank.length} squad members).
          </p>
        </div>

        <div className="chips">
          <span className="chip ok">🔥 {me.streak}d streak</span>
          <span className="chip">⭐ {me.score} pts</span>
          <span className="chip">📚 {me.pct}% syllabus</span>
          {me.daysAhead > 0 && (
            <span
              className="chip"
              style={{
                background: "rgba(56, 189, 248, 0.15)",
                borderColor: "rgba(56, 189, 248, 0.4)",
                color: "var(--b)",
                fontWeight: 700,
              }}
            >
              ⚡ +{me.daysAhead}d buffer ({me.bufferHours}h)
            </span>
          )}
        </div>
      </section>

      {/* Dynamic Roast Banner */}
      <div className="card roast">
        <div className="row">
          <h3 style={{ margin: 0, color: "var(--o)" }}>Innathe Roast 🌶️</h3>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              type="button"
              className="ghost"
              style={{ padding: "4px 12px", fontSize: "0.82rem" }}
              onClick={speakRoast}
            >
              🔊 Kelkkeda!
            </button>
            <button
              type="button"
              className="ghost"
              style={{ padding: "4px 12px", fontSize: "0.82rem" }}
              onClick={nextPill}
            >
              Adiyanthira Thallu 💊
            </button>
          </div>
        </div>

        {lines.length > 0 && <p style={{ margin: "8px 0" }}>{lines[0]}</p>}

        <div className="pill-quote">
          <small className="warn">
            💡 <b>Reality Check:</b> {EMERGENCY_PILLS[pillIdx]}
          </small>
        </div>
      </div>

      {/* Beginner-Friendly View Switcher */}
      <div className="view-switcher" role="tablist">
        <button
          type="button"
          className={tab === "mission" ? "active" : "ghost"}
          onClick={() => setTab("mission")}
        >
          🎯 Today's Mission (Study)
        </button>
        <button
          type="button"
          className={tab === "battle" ? "active" : "ghost"}
          onClick={() => setTab("battle")}
        >
          ⚔️ Battle & Rival ({rank.length > 1 ? rank.length - 1 : 0} Rivals)
        </button>
        <button
          type="button"
          className={tab === "recap" ? "active" : "ghost"}
          onClick={() => setTab("recap")}
        >
          📝 Recap & Notes
        </button>
        <button
          type="button"
          className={tab === "all" ? "active" : "ghost"}
          onClick={() => setTab("all")}
        >
          👁️ Full View
        </button>
      </div>

      {/* TAB 1: Today's Mission (Clean & Beginner Friendly Study Hub) */}
      {(tab === "mission" || tab === "all") && (
        <div style={{ marginBottom: tab === "all" ? 0 : 20 }}>
          {/* Daily Mission Card */}
          <div className="card mission">
            <div className="row">
              <div>
                <h2>Innathe Mission</h2>
                <p className="topic">
                  📌 {ts ? `${ts.phase} · ${ts.topic}` : "Timetable theernnu · Free revision"}
                </p>
              </div>
              <Ring value={me.today} max={40} label={me.today} sub="/40 pts" />
            </div>

            {isTodayCoveredInAdvance && (
              <div
                style={{
                  background: "rgba(56, 189, 248, 0.1)",
                  border: "1px solid var(--b)",
                  borderRadius: 12,
                  padding: "8px 14px",
                  margin: "12px 0",
                }}
              >
                <small style={{ color: "var(--b)", fontWeight: 700 }}>
                  ⚡ Ee topic munnitte divasam advance aayi theerthathaanu! Buffer Day active aanu — streak & score 100% safe aanu.
                </small>
              </div>
            )}

            <div className="tasks">
              {TASKS.map(([k, icon, title, time, p, desc, fun]) => (
                <TaskCard
                  key={k}
                  icon={icon}
                  title={title}
                  time={time}
                  pts={p}
                  desc={desc}
                  done={!!d[k] || (k === "c" && !!me.topics?.[ts?.id])}
                  fun={fun}
                  onClick={() => tog(k)}
                />
              ))}
            </div>

            <div className="pyq">
              <span>
                📝 GATE PYQs Solved Today: <b>{d.p || 0}</b> <small className="mu">(+2 pts each)</small>
              </span>
              <span>
                <button type="button" className="ghost" onClick={() => pyq(-1)}>
                  −
                </button>{" "}
                <button type="button" onClick={() => pyq(1)}>
                  +1
                </button>
              </span>
            </div>

            <small className="mu">
              💡 Complete all 4 tasks today for a <b>+10 bonus</b>! Zero activity days get a −15 penalty.
            </small>
          </div>

          {/* Fast-Track / Overdrive Card (Ahead of Schedule & Buffer Banking) */}
          <FastTrack
            me={me}
            today={today}
            onAdvanceDone={advanceDone}
            onAdvanceUndo={advanceUndo}
            isTodayComplete={isTodayComplete}
          />

          {/* Focus Timer */}
          <Timer onCompleteTask={tog} />

          {/* Catch-Up Overdue Topics */}
          <Backlog me={me} onDone={catchDone} />

          {/* Next 3 Days Lookahead */}
          <div className="card">
            <h3>👀 Coming Up (Next 3 Days)</h3>
            <div className="strip">
              {[1, 2, 3].map((i) => {
                const t = todayTopic(addDays(today, i));
                return (
                  <div key={i}>
                    <small className="mu">{addDays(today, i)}</small>
                    <p>{t ? t.topic : "—"}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Battle & Rival (Roast Arena & Standings) */}
      {(tab === "battle" || tab === "all") && (
        <div style={{ marginBottom: tab === "all" ? 0 : 20 }}>
          <DangerMeter me={me} />

          <DuelArena me={me} others={rank.filter((u) => u.id !== user.uid)} />

          <WallOfShame rank={rank} today={today} />

          {/* Public Battle Board */}
          <div className="card">
            <div className="row">
              <div>
                <h3>Battle Board ⚔️</h3>
                <small className="mu">Public live task telemetry for all squad fighters</small>
              </div>
              <span className="pill pos">{rank.length} fighters</span>
            </div>

            <div style={{ marginTop: 10 }}>
              {rank.map((u, i) => {
                const uTodayTasks = u.days?.[today] || {};
                const isMe = u.id === user.uid;
                return (
                  <div key={u.id} className={`battle-item ${isMe ? "is-me" : ""}`}>
                    <div className="row">
                      <b>
                        {["🥇", "🥈", "🥉"][i] || `${i + 1}.`} {u.name}
                        {isMe ? " (Nee)" : ""}
                      </b>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <b className="pos">{u.score} pts</b>
                        {!isMe && (
                          <button
                            type="button"
                            className="ghost"
                            style={{
                              padding: "2px 8px",
                              fontSize: "0.74rem",
                              borderColor: "rgba(244, 63, 94, 0.4)",
                            }}
                            onClick={() => {
                              const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                                waShareText(me, u)
                              )}`;
                              window.open(url, "_blank");
                            }}
                          >
                            Roast 📲
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="bar">
                      <i style={{ width: `${u.pct}%` }} />
                    </div>

                    <div className="row mu" style={{ fontSize: "0.8rem" }}>
                      <span>
                        Syllabus {u.pct}% · Today +{u.today} · Pending {u.backlog.length}
                        {u.daysAhead > 0 && (
                          <span style={{ color: "var(--b)", marginLeft: 6, fontWeight: 700 }}>
                            · ⚡ +{u.daysAhead}d buffer
                          </span>
                        )}
                      </span>
                      <span className="task-indicators">
                        <span className={uTodayTasks.c ? "pos" : "mu"}>{uTodayTasks.c ? "🧠✓" : "🧠✕"}</span>
                        <span className={uTodayTasks.q ? "pos" : "mu"}>{uTodayTasks.q ? "✍️✓" : "✍️✕"}</span>
                        <span className={uTodayTasks.g ? "pos" : "mu"}>{uTodayTasks.g ? "🎯✓" : "🎯✕"}</span>
                        <span className={uTodayTasks.r ? "pos" : "mu"}>{uTodayTasks.r ? "🔁✓" : "🔁✕"}</span>
                      </span>
                    </div>

                    {!isMe && u.today === 0 && <small className="neg"> · Innu onnum padichilla 😴</small>}
                    {!isMe && u.today > me.today && <small className="pos"> · Ninne kaal munnil 😏</small>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Recap & Notes (Audit, Memory Recall & Scratchpads) */}
      {(tab === "recap" || tab === "all") && (
        <div style={{ marginBottom: tab === "all" ? 0 : 20 }}>
          <YesterdayReport me={me} rank={rank} />

          <ErrorLog uid={user.uid} />

          <Personal uid={user.uid} />
        </div>
      )}
    </>
  );
}
