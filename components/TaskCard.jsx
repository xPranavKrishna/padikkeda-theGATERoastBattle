"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function TaskCard({ icon, title, time, pts, desc, done, onClick, fun }) {
  const ref = useRef();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (done) {
      gsap.fromTo(
        ref.current,
        { scale: 0.93, rotate: -0.5 },
        { scale: 1, rotate: 0, duration: 0.45, ease: "back.out(2.5)" }
      );
    }
  }, [done]);

  return (
    <button
      ref={ref}
      type="button"
      className={"tcard " + (done ? "done" : "")}
      onClick={onClick}
      aria-pressed={done}
    >
      <div className="row" style={{ alignItems: "flex-start" }}>
        <span className="ticon">{icon}</span>
        <span className="badge" style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
          {done ? "✓ COMPLETED" : `+${pts} pts`}
        </span>
      </div>

      <h4>
        {title} <small>({time})</small>
      </h4>
      <p>{desc}</p>
      <em>{done ? fun[1] : fun[0]}</em>
    </button>
  );
}
