const P = (a) => a[Math.floor(Math.random() * a.length)];

export function roast(me, rank) {
  const n = rank.length, pos = rank.findIndex((u) => u.id === me.id), lead = rank[0], last = rank[n - 1];
  const others = rank.filter((u) => u.id !== me.id);
  const avg = rank.reduce((s, u) => s + u.today, 0) / n;
  const out = [];

  // 1. Group / Team slacking roast
  if (n > 1 && avg < 8) {
    out.push(P([
      "എല്ലാവരും കൂടി ഇന്ന് ഒന്നും പഠിച്ചില്ല 😭 ഈ ടീം 'നാളെ തുടങ്ങാം' Fans Association ആണ്!",
      "Ellaarum koodi kidannurangunnu... GATE ninakku vendi wait cheyyilla. പഠിക്കെടാ!",
      "Group Procrastination Society! Team-il aarkkum padikkaan thalparyam illa. GATE exam hall-il karayaan ulla plan aano? 💀"
    ]));
  }

  // 2. Leader in a slacking team roast
  if (n > 1 && pos === 0 && avg < 15) {
    out.push(P([
      "Nee onnaam sthaanathu aanu, pakshe ee team motham nokkiyaal bhayankara thazhe aanu. Kurudanmaarude naattil kannulla raajaavu! 👑",
      "Rank 1 aanu, pakshe score kandittu kuthira alla tharavu thanne aanu! Koottukaarude madi karanam nee jeyichu ennu karutharuthu 😏"
    ]));
  } else if (pos === 0 && n > 1) {
    out.push(P([
      "Onnaam sthaanam 👑 Ini overtake cheyyum munpe nee urangaruthu, മോനേ! Friends kazhuthil kathi vechittu varunnu.",
      "Mass lead! Pakshe consistency aanu pradhaanam. Oru divasam urangiyaal pinnilullavar thaazhe idum ⚔️"
    ]));
  }

  // 3. One friend is studying well while you are slacking
  const topOther = others.length ? [...others].sort((a, b) => b.today - a.today)[0] : null;
  if (topOther && topOther.today >= 20 && me.today === 0) {
    out.push(P([
      `👀 ${topOther.name} innu ${topOther.today} points vaari eduthu munnerunnu! Nee ivide reels kandu vayil nokki irikkunnu 📱💀`,
      `Alamb aakkaruthu! ${topOther.name} study mode-il aanu, nee 'Tharavu' (Duck) mode-il. Naanam aavunnille da? 🦆`
    ]));
  } else if (topOther && topOther.today > me.today && me.today > 0) {
    out.push(`${topOther.name} innu ninne kaal ${topOther.today - me.today} points munnil aanu. Speed kootteda! 🏎️`);
  }

  // 4. Trailing behind leader
  if (pos > 0 && lead) {
    const gap = lead.score - me.score;
    out.push(P([
      `${lead.name} ninte ${gap} point munnil aanu! Nee ippo kaanunnathu fan blade pole thirinju nilkkunnu 🌀`,
      `Rank #${pos + 1}. ${lead.name}-ne overtake cheyyan innu nee full effort idanam. Atho surrender aayo? 🏳️`
    ]));
  }

  // 5. Personal performance today
  if (me.today === 0) {
    out.push(P([
      "Innu oru task polum cheythilla 🦆 'Mood illa' ennu parayunna mood thanne aanu GATE failure-nte root cause.",
      "മടി മാറ്റി വയ്ക്കെടാ! Phone adutthu ninnu maatti 25 min Pomodoro thudangu — innu 0 points vechu kidannaal naale regret kaanum.",
      "Innu zero points! GATE hall-il chennu 'ഞാൻ നാളെ പഠിക്കും' ennu OMR sheet-il karuppikkaan pattilla, mone."
    ]));
  } else if (me.today < 30) {
    out.push("Paathi vazhiyil nirthi pokaruthu da — baaki task koodi theerkku, full-day +10 bonus kittum 🎯");
  } else {
    out.push(P([
      "Innathe full performance! 💪 Ippol nee GATE-nte mukhathu nokki chirikkunnu. Mass!",
      "Superb consistency! Pakshe naale-yum ithu repeat cheyyanam — GATE 2027 marakkaruthu 👑"
    ]));
  }

  // 6. Backlog pressure
  if (me.backlog.length >= 4) {
    out.push(`${me.backlog.length} topics pending aanu 👻 Backlog ninte pinnil nizhal pole nadakkunnu. Catch-up box theerthillenkil pani paalum.`);
  }

  // 7. Zero day regret
  if (me.missed >= 2) {
    out.push(`${me.missed} divasam zero aayi poyi (−${me.missed * 15} penalty). Ee kanakku ninte future-inte tear gas aanu 😭`);
  }

  // 8. Streak praise
  if (me.streak >= 3) {
    out.push(`🔥 ${me.streak}-day streak! Ithu thakartharuthu — momentum is everything.`);
  }

  // 9. Last place roast
  if (n > 1 && last.id === me.id) {
    out.push("Ninakku aanu avasaanatthe sthaanam 🦆 Friends ninte mukhathu nokki chirikkunnu! Prathikaaram padikkunnathil aanu, thudangeda!");
  }

  return out;
}

export function verdict(p) {
  if (p === 0) return P([
    "Jeevanode illa! Oru task polum illa — −15 💀. Innu athu thirich edukku.",
    "Yesterday = Big Zero 🦆. GATE ninte kaathu irikkilla, mone.",
    "Kumbhakarnan yesterday! −15 penalty thalakku meethe nilkkunnu."
  ]);
  if (p < 30) return "Paathi mathram. Innu athinte baaki koodi cheyyu — full day bonus miss aayi 😒";
  if (p < 50) return "Okay-okay, nalla progress. Innu koodi oru step munnottu! 🎯";
  return P([
    "Mass yesterday! 🔥 Ithu repeat cheythaal IIT Bombay CSE confirm.",
    "Super effort yesterday! Record thakarthu, innum ithu thanne venam 👑"
  ]);
}

export const EMERGENCY_PILLS = [
  "GATE CSE-il 1 mark thettiyaal 1000 rank thazhottu pokum, mone! Ippo thanne oru question solve cheyyu! ✍️",
  "Ninte friend innu padikkunnu. Nee reels scroll cheyyunnu. 2027-il aaru chirikkum ennu aalochikku! 📱💀",
  "IIT CSE M.Tech package kandittundo? 30+ LPA! Athu veno atho 3 LPA service company-il jeevitham theerkkano? 💼🔥",
  "Madi maatteda... 'Naale padikkaam' ennu paranju 2 varsham poyi. Innu start cheythaal mathrame rekshayullu! ⏰",
  "Active Recall cheyyu: notes nokkathe formulas ezhuthu. Brain gym thudangaan time aayi! 🧠",
  "Algorithms and CN numericals kandal pedi aano? Solve cheythu cheythu pediye tholpikkeda! 🛡️"
];

export function duelRoast(me, opp) {
  if (!opp) return "Friend-ine invite cheyyu! Battle thudangaan oru rival venam ⚔️";
  const diffToday = me.today - opp.today;
  const diffTotal = me.score - opp.score;

  if (me.today === 0 && opp.today === 0) {
    return P([
      `Randu perkum innu 0 points! Kumbhakarnan-maarude sangamam 🦆 Randu perum thammil thammil nokki urangiyaal GATE dream ICU-il aakum!`,
      `Dual Tharavukal! ${me.name} & ${opp.name} innu oru task polum thottilla. Friendship-il padikkathe irikkaan agreement undo? 😂`
    ]);
  }
  if (diffToday >= 20) {
    return `🔥 Innu nee ${me.today} points eduthu ${opp.name}-ine thara pattiyaakki! ${opp.name} ivide Reels kandu vayil nokki irikkunnu 📱💀`;
  }
  if (diffToday <= -20) {
    return `🚨 ${opp.name} innu ${opp.today} points vaari eduthu ninne flat aakki! 2027-il ${opp.name} IIT-il pokumpol nee railway station-il send-off kodukkaano plan? 😭`;
  }
  if (diffToday > 0) {
    return `Innu nee +${diffToday} points lead cheyyunnu. Pakshe relax aavaruthu, ${opp.name} thottu pinnil thanne undu! 🏃`;
  }
  if (diffToday < 0) {
    return `${opp.name} innu ninne kaal +${Math.abs(diffToday)} points munnil aanu! Oru Pomodoro thudangi innu thanne overtake cheyyeda!`;
  }
  if (diffTotal > 0) {
    return `Overall score-il nee ${diffTotal} points lead cheyyunnu. Pakshe innu rande perkum same points aanu — competition murugunnu! ⚔️`;
  }
  return `Overall score-il ${opp.name} ${Math.abs(diffTotal)} points munnil aanu. ${opp.name}-ne thaazhe idaan innu baaki tasks theerkku!`;
}

export function waShareText(me, opp) {
  if (!opp) return `⚔️ Padikkeda GATE Battle:\nNjan innu ${me.today} points eduthu! Score: ${me.score}. Nee evideyaada? Vaa battle cheyyaam! 🔥 https://padikkeda.vercel.app`;
  const r = duelRoast(me, opp);
  return `⚔️ *Padikkeda GATE 2027 Roast Battle* ⚔️\n\n👤 *${me.name}*: ${me.score} pts (Innu: ${me.today} pts, 🔥 ${me.streak}d)\n👤 *${opp.name}*: ${opp.score} pts (Innu: ${opp.today} pts, 🔥 ${opp.streak}d)\n\n🌶️ *Roast:* ${r}\n\nPadikkeda mone, GATE 2027 kaathirikkunnu! 🔥📚`;
}

