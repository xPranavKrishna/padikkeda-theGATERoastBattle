"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, envMissing } from "@/lib/firebase";

export default function Login() {
  const [mode, setMode] = useState("in"); // "in", "up", "reset"
  const [f, setF] = useState({ name: "", email: "", pw: "" });
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "neg" });
  const [loading, setLoading] = useState(false);

  const s = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function go(e) {
    e.preventDefault();
    setMsg({ text: "", type: "neg" });
    setLoading(true);

    try {
      if (mode === "up") {
        if (!f.name.trim()) throw new Error("Peru ezhutheda! Ninte display name enthannu?");
        // 1. Create Auth user
        const { user } = await createUserWithEmailAndPassword(auth, f.email.trim(), f.pw);
        await updateProfile(user, { displayName: f.name.trim() });
        // 2. Send verification email
        // NOTE: We do NOT write to Firestore 'users' yet!
        // Account will only be created on the leaderboard once the email is confirmed.
        await sendEmailVerification(user);
        setMsg({
          text: "Verification email sent to " + f.email.trim() + " 📬 Link click cheythaal mathram account activate aaku!",
          type: "pos",
        });
      } else if (mode === "in") {
        await signInWithEmailAndPassword(auth, f.email.trim(), f.pw);
      } else {
        await sendPasswordResetEmail(auth, f.email.trim());
        setMsg({ text: "Password reset mail sent! Inbox & spam folder check cheyyu 📬", type: "pos" });
      }
    } catch (err) {
      let friendly = err.message || "Something went wrong";
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        friendly = "Email or Password thetti! Check cheythu adikkeda 🤨";
      } else if (err.code === "auth/email-already-in-use") {
        friendly = "Ee email vechu account undu. Sign in cheyyu!";
      } else if (err.code === "auth/weak-password") {
        friendly = "Password too short! Min 6 characters venam.";
      } else if (err.code === "auth/invalid-email") {
        friendly = "Email format correct alla, mone!";
      }
      setMsg({ text: friendly, type: "neg" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 440, margin: "7vh auto 12vh", padding: "0 16px" }}>
      {/* Brand Header - Beginner Friendly & Clean */}
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: "2.5rem" }} className="logo-flame">🔥</span>
          <h1 style={{ fontSize: "2.4rem", margin: 0, letterSpacing: "-0.02em" }}>പഠിക്കെടാ</h1>
        </div>
        <p className="mu" style={{ fontSize: "0.95rem", margin: "4px auto 0", lineHeight: 1.5 }}>
          GATE CSE 2027 Study Tracker & Friendly Roast Battle.  
          <br />
          <span style={{ color: "var(--tx-dim)", fontSize: "0.88rem" }}>
            Study consistently with your friends and stay accountable.
          </span>
        </p>
      </div>

      {/* Main Card */}
      <div className="card" style={{ padding: 28, borderRadius: 24 }}>
        {/* Simple Tab Switcher */}
        <div
          style={{
            display: "flex",
            background: "#080d14",
            padding: 4,
            borderRadius: 14,
            border: "1px solid var(--line)",
            marginBottom: 20,
          }}
        >
          <button
            type="button"
            className="ghost"
            style={{
              flex: 1,
              borderRadius: 10,
              padding: "9px 12px",
              fontSize: "0.9rem",
              background: mode === "in" ? "var(--g)" : "transparent",
              color: mode === "in" ? "#03140d" : "var(--mu)",
              border: 0,
              fontWeight: 700,
            }}
            onClick={() => { setMode("in"); setMsg({ text: "", type: "neg" }); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className="ghost"
            style={{
              flex: 1,
              borderRadius: 10,
              padding: "9px 12px",
              fontSize: "0.9rem",
              background: mode === "up" ? "var(--o)" : "transparent",
              color: mode === "up" ? "#1f1000" : "var(--mu)",
              border: 0,
              fontWeight: 700,
            }}
            onClick={() => { setMode("up"); setMsg({ text: "", type: "neg" }); }}
          >
            Create Account
          </button>
        </div>

        {mode === "reset" && (
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ margin: "0 0 4px" }}>🔑 Reset Password</h3>
            <p className="mu" style={{ fontSize: "0.86rem", margin: 0 }}>
              Enter your registered email. We will send you a password reset link.
            </p>
          </div>
        )}

        <form onSubmit={go}>
          {mode === "up" && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--tx)", display: "block", marginBottom: 4 }}>
                Your Name (Display Name)
              </label>
              <input
                placeholder="e.g. Pranav"
                value={f.name}
                onChange={s("name")}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--tx)", display: "block", marginBottom: 4 }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. you@example.com"
              value={f.email}
              onChange={s("email")}
              required
              autoComplete="email"
            />
          </div>

          {mode !== "reset" && (
            <div style={{ marginBottom: 16 }}>
              <div className="row" style={{ marginBottom: 4 }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--tx)" }}>
                  Password
                </label>
                <button
                  type="button"
                  className="ghost"
                  style={{ padding: "2px 8px", fontSize: "0.75rem", border: 0, color: "var(--mu)" }}
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPw ? "text" : "password"}
                placeholder="At least 6 characters"
                value={f.pw}
                onChange={s("pw")}
                required
                minLength={6}
                autoComplete={mode === "up" ? "new-password" : "current-password"}
              />
            </div>
          )}

          {mode === "up" && (
            <p className="mu" style={{ fontSize: "0.8rem", margin: "-6px 0 14px", lineHeight: 1.4 }}>
              🔒 <b>Email Confirmation Required:</b> Your account will be added to the squad leaderboard only after you confirm your email link.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 18px",
              fontSize: "0.96rem",
              background: mode === "up" ? "linear-gradient(135deg, #f59e0b, #d97706)" : "linear-gradient(135deg, #10b981, #059669)",
              color: mode === "up" ? "#1f1000" : "#03140d",
            }}
          >
            {loading ? "Please wait... ⏳" : mode === "in" ? "Sign In 🔥" : mode === "up" ? "Create Account & Send Verification 📬" : "Send Reset Link 📧"}
          </button>
        </form>

        {envMissing && (
          <p className="neg" style={{ marginTop: 12, fontSize: "0.85rem" }}>
            ⚠️ <b>.env.local missing!</b> Add Firebase keys in .env.local and restart.
          </p>
        )}

        {msg.text && (
          <div
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 12,
              background: msg.type === "pos" ? "rgba(16, 185, 129, 0.12)" : "rgba(244, 63, 94, 0.12)",
              border: `1px solid ${msg.type === "pos" ? "rgba(16, 185, 129, 0.35)" : "rgba(244, 63, 94, 0.35)"}`,
            }}
          >
            <p className={msg.type} style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600 }}>
              {msg.type === "pos" ? "✅ " : "⚠️ "} {msg.text}
            </p>
          </div>
        )}

        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--line)", textAlign: "center", fontSize: "0.86rem" }}>
          {mode === "reset" ? (
            <a
              href="#"
              style={{ color: "var(--g)", textDecoration: "none", fontWeight: 600 }}
              onClick={(e) => { e.preventDefault(); setMode("in"); setMsg({ text: "", type: "neg" }); }}
            >
              ← Back to Sign In
            </a>
          ) : (
            <a
              href="#"
              style={{ color: "var(--mu)", textDecoration: "none" }}
              onClick={(e) => { e.preventDefault(); setMode("reset"); setMsg({ text: "", type: "neg" }); }}
            >
              Forgot your password?
            </a>
          )}
        </div>
      </div>

      {/* Friendly, beginner-friendly simple 3-step guide */}
      <div style={{ marginTop: 20, textAlign: "center", color: "var(--mu)", fontSize: "0.84rem" }}>
        <span>1. Sign up</span> · <span>2. Click email link</span> · <span>3. Start daily mission!</span>
      </div>
    </div>
  );
}
