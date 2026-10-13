import { catchPlan, ymd } from "@/lib/score";

export default function Backlog({ me, onDone }) {
  const today = ymd();
  const plan = catchPlan(me.backlog, today);
  const now = plan.filter((x) => x.on === today);
  const later = plan.filter((x) => x.on !== today);

  if (!plan.length) {
    return (
      <div className="card">
        <h3>🔁 Smart Catch-Up Box</h3>
        <p className="pos" style={{ fontWeight: 600 }}>
          Backlog zero! Full syllabus on track. Ee discipline continue cheyyu 👏
        </p>
      </div>
    );
  }

  return (
    <div className="card catch">
      <div className="row">
        <div>
          <h3>🔁 Smart Catch-Up Box</h3>
          <small className="mu">Auto-rescheduled overdue topics (oldest first)</small>
        </div>
        <span className="pill neg">{plan.length} pending</span>
      </div>

      <p className="mu" style={{ fontSize: "0.88rem", margin: "8px 0 12px" }}>
        Skip cheytha topics timetable-il ninnu auto-reschedule cheythu. Oro topic theerthaal{" "}
        <b className="pos">+6 pts</b>, pending aayi irunnaal <b className="neg">−2 pts/day</b>.
      </p>

      {now.map((b) => (
        <div className="citem" key={b.id}>
          <div>
            <b style={{ fontSize: "0.95rem" }}>{b.topic}</b>
            <small>
              {b.phase} · Scheduled {b.date} · <b>{b.age} day{b.age > 1 ? "s" : ""} overdue</b>{" "}
              {b.age >= 5 ? "💀" : b.age >= 3 ? "🚨" : "⏳"}
            </small>
          </div>
          <button type="button" onClick={() => onDone(b.id)} style={{ padding: "8px 14px" }}>
            Done +6
          </button>
        </div>
      ))}

      {later.length > 0 && (
        <details style={{ marginTop: 10 }}>
          <summary className="mu">Upcoming catch-up schedule ({later.length} more topics)</summary>
          {later.map((b) => (
            <div className="citem dim" key={b.id}>
              <div>
                <b>{b.topic}</b>
                <small>{b.phase}</small>
              </div>
              <span className="pill">{b.on}</span>
            </div>
          ))}
        </details>
      )}
    </div>
  );
}
