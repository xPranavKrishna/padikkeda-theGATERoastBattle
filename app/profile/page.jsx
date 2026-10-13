"use client";
import { useEffect, useState } from "react";
import { signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { ranked } from "@/lib/score";

export default function Profile() {
  const { user, users } = useAuth();
  const all = ranked(users);
  const me = user ? all.find((u) => u.id === user.uid) : null;
  const [name, setName] = useState(me?.name || "");
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (me?.name && !name) setName(me.name);
  }, [me?.name]);

  if (!user || !me) return null;

  return (
    <>
      <div className="row">
        <div>
          <h1>👤 Gladiator Profile & Settings</h1>
          <p className="mu">Manage your fighter credentials and review battle telemetry.</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="card" style={{ marginTop: 14 }}>
        <h3>Gladiator Details</h3>
        <p className="mu" style={{ fontSize: "0.88rem" }}>
          Registered Email: <b>{user.email}</b>
        </p>

        <div style={{ maxWidth: 420, marginTop: 12 }}>
          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--mu)", display: "block", marginBottom: 4 }}>
            Change Display Name (Leaderboard-il kaanikkunnathu)
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ninte Peru"
          />
          <div className="row" style={{ marginTop: 8 }}>
            <button
              type="button"
              disabled={saving}
              onClick={async () => {
                if (!name.trim()) return;
                setSaving(true);
                try {
                  await updateDoc(doc(db, "users", user.uid), { name: name.trim() });
                  await updateProfile(user, { displayName: name.trim() });
                  setMsg("Peru maatti saved! ✅");
                  setTimeout(() => setMsg(""), 3000);
                } catch (e) {
                  console.error("Save profile error:", e);
                  setMsg("Save cheyyaan patti illa.");
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving ? "Saving... ⏳" : "Save Peru ✅"}
            </button>
            {msg && <span className="pos" style={{ fontWeight: 600 }}>{msg}</span>}
          </div>
        </div>
      </div>

      {/* Telemetry Stats Grid */}
      <div className="card">
        <h3>📊 Battle Telemetry</h3>
        <div className="grid" style={{ marginTop: 12 }}>
          <div style={{ background: "var(--card2)", padding: 14, borderRadius: 14, border: "1px solid var(--line)" }}>
            <small className="mu">Current Arena Rank</small>
            <h2 style={{ color: "var(--o)", marginTop: 4 }}>#{all.indexOf(me) + 1}</h2>
          </div>
          <div style={{ background: "var(--card2)", padding: 14, borderRadius: 14, border: "1px solid var(--line)" }}>
            <small className="mu">Total Score</small>
            <h2 style={{ color: "var(--g)", marginTop: 4 }}>{me.score} pts</h2>
          </div>
          <div style={{ background: "var(--card2)", padding: 14, borderRadius: 14, border: "1px solid var(--line)" }}>
            <small className="mu">Active Streak</small>
            <h2 style={{ color: "var(--o)", marginTop: 4 }}>🔥 {me.streak} days</h2>
          </div>
          <div style={{ background: "var(--card2)", padding: 14, borderRadius: 14, border: "1px solid var(--line)" }}>
            <small className="mu">Zero Days (Slacking Penalty)</small>
            <h2 className={me.missed ? "neg" : "pos"} style={{ marginTop: 4 }}>
              {me.missed} days
            </h2>
          </div>
          <div style={{ background: "var(--card2)", padding: 14, borderRadius: 14, border: "1px solid var(--line)" }}>
            <small className="mu">Syllabus Covered</small>
            <h2 style={{ color: "var(--b)", marginTop: 4 }}>{me.pct}%</h2>
          </div>
          <div style={{ background: "var(--card2)", padding: 14, borderRadius: 14, border: "1px solid var(--line)" }}>
            <small className="mu">Enlisted Date</small>
            <h2 style={{ fontSize: "1.2rem", marginTop: 4 }}>{me.joined}</h2>
          </div>
        </div>
      </div>

      {/* Account Security & Sign Out */}
      <div className="card">
        <h3>🛡️ Account Security</h3>
        <p className="mu" style={{ fontSize: "0.88rem" }}>
          Need to update your password or sign out of this browser?
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          <button
            type="button"
            className="ghost"
            onClick={async () => {
              try {
                await sendPasswordResetEmail(auth, user.email);
                alert("Password reset mail inbox/spam-il ayachu 📬");
              } catch (e) {
                alert("Error sending reset email");
              }
            }}
          >
            Send Password Reset Email 📧
          </button>
          <button
            type="button"
            className="ghost"
            style={{ borderColor: "rgba(244, 63, 94, 0.4)", color: "var(--r)" }}
            onClick={() => signOut(auth)}
          >
            Sign Out 🚪
          </button>
        </div>
      </div>
    </>
  );
}
