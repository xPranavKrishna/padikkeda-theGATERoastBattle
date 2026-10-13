export default function Ring({ value, max, size = 132, label, sub }) {
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  const p = Math.min(1, Math.max(0, value / max));
  const id = "rg_" + size;

  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <filter id={`glow_${size}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#101924"
          strokeWidth="10"
        />

        {/* Progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - p)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}
          filter={p > 0 ? `url(#glow_${size})` : "none"}
        />
      </svg>

      <div className="ring-in">
        <b style={{ color: p >= 1 ? "var(--g)" : "#fff" }}>{label}</b>
        <small>{sub}</small>
      </div>
    </div>
  );
}
