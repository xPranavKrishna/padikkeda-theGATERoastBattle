"use client";
import { useState, useMemo } from "react";
import {
  SUBJECT_RESOURCES,
  RECOMMENDED_ORDER,
  MOCK_TESTS,
  NOTES_VAULT,
  CREDITS,
} from "@/lib/resourcesData";

const CATEGORIES = [
  { id: "all", label: "🌟 All Resources" },
  { id: "systems", label: "⚙️ Core Systems (OS, COA, CN, CD)" },
  { id: "programming", label: "💻 Programming & Algo (C, DS, Algo)" },
  { id: "theory", label: "🧠 Theory & Logic (TOC, DL)" },
  { id: "math", label: "📐 Math & GA (~30 Marks)" },
  { id: "mocks", label: "📝 Full Mocks (1987–2024)" },
  { id: "notes", label: "📓 Notes Vault" },
];

export default function ResourcesPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();

  // Filter subjects based on active tab and search query
  const filteredSubjects = useMemo(() => {
    return SUBJECT_RESOURCES.filter((sub) => {
      // Category filter
      if (activeCat === "systems" && sub.category !== "systems") return false;
      if (activeCat === "programming" && sub.category !== "programming") return false;
      if (activeCat === "theory" && sub.category !== "theory" && sub.id !== "dl") return false;
      if (activeCat === "math" && sub.category !== "math" && sub.category !== "aptitude") return false;
      if (activeCat === "mocks" || activeCat === "notes") return false;

      // Search filter
      if (!q) return true;
      const inName = sub.name.toLowerCase().includes(q);
      const inBooks = sub.textbooks?.some(
        (b) => b.name.toLowerCase().includes(q) || b.chapters.toLowerCase().includes(q)
      );
      const inVideos = sub.youtube?.some(
        (v) => v.title.toLowerCase().includes(q) || v.channel?.toLowerCase().includes(q)
      );
      const inSubsections = sub.subsections?.some(
        (s) =>
          s.sub.toLowerCase().includes(q) ||
          s.textbooks.toLowerCase().includes(q) ||
          s.youtube?.some((y) => y.title.toLowerCase().includes(q))
      );
      return inName || inBooks || inVideos || inSubsections;
    });
  }, [activeCat, q]);

  // Filter mock tests
  const showMocks = activeCat === "all" || activeCat === "mocks";
  const filteredMocks = useMemo(() => {
    if (!showMocks) return [];
    if (!q) return MOCK_TESTS;
    return MOCK_TESTS.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.title.toLowerCase().includes(q)),
    })).filter((cat) => cat.items.length > 0);
  }, [showMocks, q]);

  // Filter notes
  const showNotes = activeCat === "all" || activeCat === "notes";
  const filteredNotes = useMemo(() => {
    if (!showNotes) return [];
    if (!q) return NOTES_VAULT;
    return NOTES_VAULT.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.desc.toLowerCase().includes(q) ||
        n.badge.toLowerCase().includes(q)
    );
  }, [showNotes, q]);

  return (
    <>
      {/* Header */}
      <div className="row" style={{ alignItems: "flex-start" }}>
        <div>
          <h1>📖 GATE CSE Free Resource Vault</h1>
          <p className="mu" style={{ maxWidth: 700, fontSize: "0.95rem" }}>
            Curated with care by <b>GATE Toppers (AIR 13 Anjali & AIR 151 Omi Kakadiya)</b>. Standard textbooks with exact relevant chapters, YouTube playlists, NPTEL courses, notes, and free tests.
          </p>
        </div>
        <a
          href="https://github.com/GATEOverflow/GO-PDFs/releases/tag/gatecse-2025"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button type="button" style={{ padding: "9px 16px", fontSize: "0.88rem" }}>
            📥 All-Years PYQs PDF (1987–2024)
          </button>
        </a>
      </div>

      {/* Recommended Study Sequence Ribbon */}
      <div className="card" style={{ padding: "14px 18px", margin: "14px 0" }}>
        <div className="row" style={{ marginBottom: 6 }}>
          <small className="pos" style={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            🎯 Topper Recommended Study Order (AIR 151 & AIR 13)
          </small>
          <small className="mu">Sequenced to build core foundations first</small>
        </div>
        <div className="order-ribbon">
          {RECOMMENDED_ORDER.map((item, idx) => (
            <div key={item} className="order-item">
              <b>{idx + 1}.</b> {item} {idx < RECOMMENDED_ORDER.length - 1 ? "→" : "🏁"}
            </div>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="resource-search-wrap">
        <span className="resource-search-icon">🔍</span>
        <input
          className="resource-search-input"
          placeholder="Search by subject, textbook (e.g. Silberschatz, Hamacher, CLRS, Morris Mano), or mock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="button"
            className="ghost"
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              padding: "4px 10px",
              fontSize: "0.78rem",
            }}
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="view-switcher" style={{ margin: "10px 0 20px" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={activeCat === cat.id ? "active" : "ghost"}
            onClick={() => setActiveCat(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* SUBJECT CARDS */}
      {filteredSubjects.length > 0 && (
        <div className="grid" style={{ marginBottom: 26 }}>
          {filteredSubjects.map((sub) => (
            <div className="card" key={sub.id} style={{ padding: 22 }}>
              {/* Card Title & Badges */}
              <div className="row" style={{ alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "1.6rem" }}>{sub.icon}</span>
                    <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{sub.name}</h3>
                  </div>
                </div>
                <span className="pill warn" style={{ fontSize: "0.78rem" }}>
                  {sub.weightage}
                </span>
              </div>

              {/* Standard Textbooks & Chapters */}
              {sub.textbooks && sub.textbooks.length > 0 && (
                <div style={{ margin: "12px 0" }}>
                  <small className="mu" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.74rem", letterSpacing: "0.05em" }}>
                    📚 Standard Textbook & Chapters:
                  </small>
                  {sub.textbooks.map((tb, i) => (
                    <div className="chapter-box" key={i}>
                      <b style={{ color: "var(--tx)", fontSize: "0.9rem", display: "block" }}>{tb.name}</b>
                      <small style={{ color: "var(--o)", display: "block", marginTop: 4, lineHeight: 1.4 }}>
                        📖 <b>Relevant Chapters:</b> {tb.chapters}
                      </small>
                    </div>
                  ))}
                </div>
              )}

              {/* Multi-section Handling for Engineering Mathematics */}
              {sub.subsections && (
                <div style={{ margin: "12px 0" }}>
                  {sub.subsections.map((sec, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid var(--line)",
                        borderRadius: 14,
                        padding: 12,
                        margin: "10px 0",
                      }}
                    >
                      <b style={{ color: "var(--g)", fontSize: "0.95rem" }}>{sec.sub}</b>
                      <div className="chapter-box" style={{ margin: "6px 0 10px" }}>
                        <small style={{ color: "var(--o)" }}>
                          📖 <b>Standard Book:</b> {sec.textbooks}
                        </small>
                      </div>

                      <small className="mu" style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
                        🎥 Curated Lectures:
                      </small>
                      {sec.youtube?.map((y, yi) => (
                        <a
                          key={yi}
                          href={y.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-item-link"
                        >
                          <span>{y.title}</span>
                          <span>↗</span>
                        </a>
                      ))}

                      {sec.nptel && (
                        <a
                          href={sec.nptel}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-item-link"
                          style={{ borderColor: "rgba(56, 189, 248, 0.3)" }}
                        >
                          <span>🎓 NPTEL Course Video Series</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Top YouTube Playlists */}
              {sub.youtube && sub.youtube.length > 0 && (
                <div style={{ margin: "12px 0" }}>
                  <small className="mu" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.74rem", letterSpacing: "0.05em" }}>
                    🎥 Video Playlists:
                  </small>
                  {sub.youtube.map((v, i) => (
                    <a
                      key={i}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-item-link"
                    >
                      <div>
                        <span>{v.title}</span>
                        {v.channel && <small style={{ display: "block" }}>{v.channel}</small>}
                      </div>
                      <span style={{ color: "var(--g)" }}>↗</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Revision & PYQ Solutions */}
              {sub.revisionPyq && sub.revisionPyq.length > 0 && (
                <div style={{ margin: "10px 0" }}>
                  <small className="mu" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.74rem", letterSpacing: "0.05em" }}>
                    🔁 Revision & PYQ Solutions:
                  </small>
                  {sub.revisionPyq.map((v, i) => (
                    <a
                      key={i}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-item-link"
                    >
                      <span>{v.title}</span>
                      <span style={{ color: "var(--g)" }}>↗</span>
                    </a>
                  ))}
                </div>
              )}

              {/* NPTEL Courses */}
              {sub.nptel && sub.nptel.length > 0 && (
                <div style={{ margin: "10px 0" }}>
                  <small className="mu" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.74rem", letterSpacing: "0.05em" }}>
                    🎓 NPTEL / University Lectures:
                  </small>
                  {sub.nptel.map((v, i) => (
                    <a
                      key={i}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-item-link"
                      style={{ borderColor: "rgba(56, 189, 248, 0.25)" }}
                    >
                      <span>{v.title}</span>
                      <span style={{ color: "var(--b)" }}>↗</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Free Tests */}
              {sub.freeTests && sub.freeTests.length > 0 && (
                <details style={{ marginTop: 12 }}>
                  <summary className="mu" style={{ fontSize: "0.88rem" }}>
                    📝 Free Topic Tests on GATEOverflow ({sub.freeTests.length} tests)
                  </summary>
                  <div style={{ marginTop: 6 }}>
                    {sub.freeTests.map((t, i) => (
                      <a
                        key={i}
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-item-link"
                      >
                        <span>{t.title}</span>
                        <span style={{ color: "var(--o)" }}>Start Test ↗</span>
                      </a>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      )}

      {/* FULL-LENGTH MOCKS & EXAMS */}
      {showMocks && filteredMocks.length > 0 && (
        <div style={{ margin: "24px 0" }}>
          <div className="row">
            <div>
              <h2>📝 Free Mock Tests & Original GATE Papers</h2>
              <p className="mu" style={{ fontSize: "0.9rem" }}>
                Practice full 3-hour exam conditions on GATEOverflow with instant scoring & percentile.
              </p>
            </div>
            <span className="pill pos">100% Free & Interactive</span>
          </div>

          <div className="grid" style={{ marginTop: 14 }}>
            {filteredMocks.map((section, idx) => (
              <div className="card" key={idx} style={{ padding: 20 }}>
                <h3 style={{ color: "var(--o)", margin: "0 0 10px" }}>{section.category}</h3>
                {section.items.map((mock, i) => (
                  <a
                    key={i}
                    href={mock.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-item-link"
                  >
                    <span>{mock.title}</span>
                    <span style={{ color: "var(--g)" }}>Launch Mock ↗</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTES VAULT */}
      {showNotes && filteredNotes.length > 0 && (
        <div style={{ margin: "24px 0" }}>
          <div className="row">
            <div>
              <h2>📓 Topper Handwritten Notes Vault</h2>
              <p className="mu" style={{ fontSize: "0.9rem" }}>
                Formula sheets, chapter summaries, and handwritten notebooks from top GATE rankers.
              </p>
            </div>
          </div>

          <div className="grid" style={{ marginTop: 14 }}>
            {filteredNotes.map((note, idx) => (
              <div className="card" key={idx} style={{ padding: 20 }}>
                <div className="row" style={{ alignItems: "flex-start", marginBottom: 6 }}>
                  <h4 style={{ margin: 0, fontSize: "1.05rem", color: "#fff" }}>{note.title}</h4>
                  <span className="pill" style={{ fontSize: "0.72rem" }}>
                    {note.badge}
                  </span>
                </div>
                <p className="mu" style={{ fontSize: "0.88rem", margin: "6px 0 14px", lineHeight: 1.45 }}>
                  {note.desc}
                </p>
                <a
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button type="button" className="ghost" style={{ width: "100%", padding: "8px 14px" }}>
                    Open Notes ↗
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Credits Section */}
      <div className="card" style={{ padding: 22, marginTop: 30, borderColor: "rgba(16, 185, 129, 0.25)" }}>
        <h3 style={{ color: "var(--g)", margin: "0 0 4px" }}>🤝 Resource Curators & Acknowledgements</h3>
        <p className="mu" style={{ fontSize: "0.88rem", margin: "4px 0 14px" }}>
          These resources were generously compiled and shared by GATE top rankers to help students prepare completely free:
        </p>
        <div className="grid">
          {CREDITS.map((c, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: 14,
              }}
            >
              <b style={{ color: "#fff", fontSize: "1rem", display: "block" }}>{c.name}</b>
              <span className="pill pos" style={{ fontSize: "0.72rem", margin: "4px 0" }}>
                {c.title}
              </span>
              <p className="mu" style={{ fontSize: "0.84rem", margin: "6px 0 10px" }}>
                {c.desc}
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {c.links.map((l, li) => (
                  <a
                    key={li}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.78rem", color: "var(--g)", textDecoration: "none", fontWeight: 600 }}
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
