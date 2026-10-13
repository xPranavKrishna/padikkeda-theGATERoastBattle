import { START, TOTAL, ALL_DAYS, REV_FROM, diff, addDays, getAheadCalculations } from "./data";
export const ymd = (d = new Date()) => { const o = new Date(d.getTime() - d.getTimezoneOffset() * 6e4); return o.toISOString().slice(0, 10); };
export const yesterday = () => ymd(new Date(Date.now() - 864e5));
// +10 concept, +10 questions, +5 GA, +5 recall, +2/PYQ, +6/catch-up topic, +10 full-day, +2/streak day, +10/advance topic
// -15 per zero day, -2 per pending (skipped) topic
export const pts = (x = {}) =>
  (x.c ? 10 : 0) +
  (x.q ? 10 : 0) +
  (x.g ? 5 : 0) +
  (x.r ? 5 : 0) +
  (x.p || 0) * 2 +
  (x.b || 0) * 6 +
  (x.adv || 0) * 10 +
  (x.c && x.q && x.g && x.r ? 10 : 0);

export const LEVELS = [
  [20, "SAFE", "😎", "pos", "Ellaam kayyil. Ithu thanne continue cheyyu."],
  [45, "WARNING", "😬", "warn", "Backlog valarunnu. Innu thanne catch-up slot theerkku."],
  [70, "DANGER", "🚨", "neg", "Ninte GATE dream ICU-il aanu. Innu catch-up cheythillenkil pani kittum."],
  [101, "CRITICAL", "💀", "neg", "Procrastination at peak. Phone vechittu, ippo thanne oru topic theerkku!"],
];

export const level = (p, daysAhead = 0) => {
  if (daysAhead > 0 && p === 0) {
    return [0, "SPEEDRUNNER", "⚡", "pos", `Paced ${daysAhead}d ahead! You have banked ${daysAhead * 24}h of time buffer.`];
  }
  return LEVELS.find((l) => p < l[0]) || LEVELS[LEVELS.length - 1];
};

export function stats(u) {
  const days = u.days || {}, today = ymd(), done = u.topics || {};
  let earned = 0, missed = 0, streak = 0;
  Object.values(days).forEach((x) => (earned += pts(x)));
  const start = u.joined > START ? u.joined : START;

  // Ahead calculations (buffer bank & early finish)
  const aheadCalcs = getAheadCalculations(today, done);
  const { ahead, daysAhead, bufferHours, projectedCoreEnd, projectedPlanEnd, totalRevisionDays } = aheadCalcs;

  // Check missed days; a past day is covered if it has activity OR if its scheduled topic was completed
  for (let d = new Date(start + "T12:00"); ymd(d) < today; d.setDate(d.getDate() + 1)) {
    const k = ymd(d);
    const tForDate = ALL_DAYS.find((x) => x.date === k);
    if (!pts(days[k]) && !(tForDate && done[tForDate.id])) missed++;
  }

  for (let d = new Date(), n = 0; n < 400; n++, d.setDate(d.getDate() - 1)) {
    const k = ymd(d);
    if (pts(days[k])) streak++;
    else if (k !== today) break;
  }

  const backlog = ALL_DAYS.filter((x) => x.date >= start && x.date < today && !done[x.id]).map((x) => ({ ...x, age: diff(today, x.date) }));

  // Banked buffer days protect against zero-day penalty & procrastination
  const effectiveMissed = Math.max(0, missed - daysAhead);
  const rawProcrast = backlog.length * 7 + (backlog[0] ? Math.min(backlog[0].age, 15) * 2 : 0) + effectiveMissed * 5 - (backlog.length === 0 ? daysAhead * 15 : 0);
  const procrast = Math.max(0, Math.min(100, rawProcrast));

  const penalty = effectiveMissed * 15 + backlog.length * 2;
  const topics = Object.keys(done).filter((k) => +k.split("-")[0] < REV_FROM).length;
  const aheadBonus = daysAhead * 5;
  const score = earned - penalty + streak * 2 + aheadBonus;

  return {
    ...u,
    earned,
    missed: effectiveMissed,
    rawMissed: missed,
    streak,
    backlog,
    ahead,
    daysAhead,
    bufferHours,
    projectedCoreEnd,
    projectedPlanEnd,
    totalRevisionDays,
    aheadBonus,
    procrast,
    penalty,
    topics,
    today: pts(days[today]),
    pct: Math.round((topics / TOTAL) * 100),
    score,
  };
}

export const ranked = (users) => users.map(stats).sort((a, b) => b.score - a.score);

// auto re-arrangement: spread skipped topics (oldest first) over the next days
export function catchPlan(backlog, today) {
  const per = backlog.length > 10 ? 3 : backlog.length > 5 ? 2 : 1;
  return backlog.map((b, i) => ({ ...b, on: addDays(today, Math.floor(i / per)) }));
}

