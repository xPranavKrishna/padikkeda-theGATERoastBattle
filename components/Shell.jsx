"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { sendEmailVerification, reload, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { ranked } from "@/lib/score";
import { playBuzzer, playChime } from "@/lib/sound";
import Bg3D from "./Bg3D";

const NAV = [
  ["/", "⚔️ Battle"],
  ["/leaderboard", "🏆 Leaderboard"],
  ["/syllabus", "📚 Syllabus"],
  ["/resources", "📖 Resources"],
  ["/tips", "🧠 Tips"],
  ["/profile", "👤 Profile"],
];

export default function Shell({ children }) {
  const { user, loading, users } = useAuth();
  const path = usePathname();
  const r = useRouter();
  const main = useRef();
  const navRef = useRef();
  const [toast, setToast] = useState("");
  const [checkingVerify, setCheckingVerify] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  // Center active nav link into view on mobile swipeable ribbon
  useEffect(() => {
    if (navRef.current) {
      const activeEl = navRef.current.querySelector(".nav-link.on");
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [path]);

  const verified = !!user?.emailVerified;
  const ready = users.length > 0;
  const rank = ranked(users);
  const pos = user ? rank.findIndex((u) => u.id === user.uid) : -1;

  useEffect(() => {
    if (loading) return;
    if (!user && path !== "/login") r.replace("/login");
    if (verified && path === "/login") r.replace("/");
  }, [user, loading, path, verified, r]);

  useEffect(() => {
    if (main.current?.children.length) {
      gsap.fromTo(
        main.current.children,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [path, user, loading, ready]);

  // Real-time Overtake alert on every page
  useEffect(() => {
    if (!verified || pos < 0 || !user) return;
    const k = "rank_" + user.uid;
    const prev = Number(localStorage.getItem(k));
    localStorage.setItem(k, String(pos + 1));

    if (prev && pos + 1 > prev && rank[pos - 1]) {
      playBuzzer();
      setToast(`🚨 ${rank[pos - 1].name} ninne overtake cheythu! Rank dropped to #${pos + 1}. Madi maatteda!`);
      const t = setTimeout(() => setToast(""), 8000);
      return () => clearTimeout(t);
    }
  }, [pos, verified, user]);

  return (
    <>
      <Bg3D />

      {user && verified && (
        <header className="nav-shell">
          <div className="nav-top">
            <Link href="/" className="logo">
              <span className="logo-flame">🔥</span>
              <span>പഠിക്കെടാ</span>
            </Link>

            {pos >= 0 && (
              <div className="chips" style={{ margin: 0 }}>
                <span className="chip navchip" title="Active Streak & Daily Score">
                  🔥 {rank[pos].streak}d · ⭐ {rank[pos].today} pts
                  {rank[pos].backlog.length ? ` · ⏳ ${rank[pos].backlog.length}` : ""}
                </span>
              </div>
            )}
          </div>

          <nav ref={navRef} className="nav-links" aria-label="Main Navigation">
            {NAV.map(([h, t]) => (
              <Link key={h} href={h} className={`nav-link ${path === h ? "on" : ""}`}>
                {t}
              </Link>
            ))}
          </nav>
        </header>
      )}

      <main ref={main} className="wrap">
        {loading ? (
          <div style={{ textAlign: "center", padding: "18vh 0" }}>
            <span style={{ fontSize: "3rem" }} className="logo-flame">🔥</span>
            <h2 style={{ marginTop: 12 }}>Loading Arena...</h2>
            <p className="mu">Gladiator stats sync cheyyunnu. Madi pidichirikkalle!</p>
          </div>
        ) : user && !verified ? (
          <div className="card" style={{ maxWidth: 520, margin: "10vh auto", textAlign: "center", padding: 30 }}>
            <span style={{ fontSize: "3.2rem", display: "block", marginBottom: 10 }}>📧</span>
            <h2>Mail Verify Cheyyeda!</h2>
            <p className="mu" style={{ margin: "12px 0 20px", fontSize: "0.95rem" }}>
              We sent a verification link to <b>{user.email}</b>.<br />
              Spam/Promotions folder-um nokku. Link click cheythaal mathrame war room thurakkoo!
            </p>

            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={async () => {
                  setCheckingVerify(true);
                  await reload(user);
                  if (user.emailVerified) {
                    try {
                      const { doc, setDoc } = await import("firebase/firestore");
                      const { db } = await import("@/lib/firebase");
                      const { ymd } = await import("@/lib/score");
                      await setDoc(
                        doc(db, "users", user.uid),
                        {
                          name: user.displayName || user.email.split("@")[0],
                          joined: ymd(),
                          days: {},
                          topics: {},
                          verified: true,
                        },
                        { merge: true }
                      );
                    } catch (e) {
                      console.error("Firestore user creation error:", e);
                    }
                    playChime();
                    location.reload();
                  } else {
                    playBuzzer();
                    setResendStatus("Innum verify aayilla! Mail-il vanna link click cheyyu (spam folder-um nokku).");
                  }
                  setCheckingVerify(false);
                }}
                disabled={checkingVerify}
              >
                {checkingVerify ? "Checking... ⏳" : "Verify aayi ✅"}
              </button>

              <button
                className="ghost"
                onClick={async () => {
                  try {
                    await sendEmailVerification(user);
                    setResendStatus("Puthiya mail ayachu! Inbox nokku 📬");
                  } catch (e) {
                    setResendStatus("Wait cheyyu, kurachu kazhinju try cheyyu.");
                  }
                }}
              >
                Resend Mail 📩
              </button>

              <button className="ghost" onClick={() => signOut(auth)}>
                Sign Out 🚪
              </button>
            </div>

            {resendStatus && (
              <p className="warn" style={{ marginTop: 14, fontSize: "0.85rem", fontWeight: 600 }}>
                {resendStatus}
              </p>
            )}
          </div>
        ) : !user && path !== "/login" ? null : (
          children
        )}
      </main>

      {toast && (
        <div className="toast" onClick={() => setToast("")} role="alert">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>{toast}</span>
            <span style={{ opacity: 0.7, fontSize: "0.8rem", marginLeft: "auto" }}>✕</span>
          </div>
        </div>
      )}
    </>
  );
}
