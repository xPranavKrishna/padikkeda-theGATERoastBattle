# പഠിക്കെടാ 🔥 Padikkeda
### The GATE CSE 2027 Roast Battle (made by a lazy man, for lazy men)

> "Naale padikkaam." — Every GATE aspirant, 400 days in a row.

Hi. I am lazy. My friend is lazy. We both want to crack GATE 2027.  
So I built a website that **roasts us in Manglish when we don't study**, and **cheers for us when we do**.  
That's it. That's the whole idea. 😌

Everyone's progress is **public**. If your friend studies and you don't, the site will make sure you feel it. 🌶️

---

## 🤔 What is this thing?

A battle-driven study tracker where you and your friends compete head-to-head:

- **1-on-1 Clash & Comparison Matrix:** Direct side-by-side fighter stats (Nee vs Rival), animated **Tug-of-War** effort dominance bar, and 1-click **WhatsApp Roast Missiles 📲**.
- **Hall of Glory vs Wall of Shame:** Public daily crowning of **Innathe Mass Raja 👑**, **Innathe Tharavu 🦆** (Duck of the Day for slacking), and **ICU Patient 🚨**.
- **Scientific Focus & Active Recall Timer:** 25-min Pomodoro, 80-min Deep Dive, and 10-min Active Recall Blitz with pause roasts and instant task auto-check.
- **GATE 2027 Ticking Urgency Clock:** Live countdown to exam day with reality checks on IIT cutoff scores.
- **Leaderboard with Top 3 Podium:** 🥇 Gold, 🥈 Silver, 🥉 Bronze pedestals, squad health overview, and gladiator badges.
- **Audio Chimes & Overtake Buzzer:** Web Audio API sound effects for task completions and real-time rank drops.
- **Savage Roast Engine:** Roast lines triggered by individual slacking, team slacking, topper complacency, and direct point gaps.
- **Adiyanthira Thallu 💊:** Emergency reality check pills with browser text-to-speech (*"🔊 Kelkkeda!"*).
- **Day-by-Day Timetable:** 132-day syllabus (Oct 13, 2026 to Feb 21, 2027) covering all CSE subjects, General Aptitude, and PYQ mock cycles.
- **Fast-Track Overdrive & Time Buffer Bank:** Finish tomorrow's topic today to bank buffer days (+24h cushion), expand your revision window, and finish the syllabus earlier!
- **Subject Marks Weightage on Syllabus:** See estimated marks (~15 Marks for Maths, ~8-10 Marks for CN/OS) and subject leaders.

---

## 🎮 How the game works

**Points (the good stuff):**

| Do this | Get this |
|---|---|
| Finish today's concept | **+10** |
| Solve questions | **+10** |
| 20 min GA | **+5** |
| Recall + error log | **+5** |
| Each GATE PYQ you solve | **+2** |
| Finish a skipped (catch-up) topic | **+6** 🔁 |
| Finish an advance (fast-track) topic early | **+10** ⚡ |
| Each buffer day banked ahead | **+5 bonus** 🛡️ |
| Finish ALL 4 tasks in a day | **+10 bonus** 🎁 |
| Each day in your streak | **+2** 🔥 |

**Points (the pain):**

| Do this | Get this |
|---|---|
| A whole day with ZERO tasks | **−15** 💀 |
| Each skipped topic still pending | **−2** ⏳ |

Zero days are counted from the day you joined (or Oct 13, 2026, whichever is later) up to yesterday.  
**Time Buffer Protection:** If you have banked buffer days from fast-tracking topics ahead, your buffer shield absorbs missed days so you don't receive unfair zero-day penalties!

---

## ⚡ Fast-Track vs Catch-Up: Symmetrical Schedulers

Padikkeda uses a symmetrical game engine for both lazy days and hyper-productive days:

### 1. 🔁 The Procrastinator: Smart Catch-Up Box
- When you miss a day, incomplete topics automatically pile up into the **Catch-Up Box** (oldest first).
- Pending topics leak **−2 pts/day** and raise your **Procrastination Danger Index**.
- You can clear individual overdue topics anytime for **+6 pts** each to reset your ICU risk!

### 2. ⚡ The Speedrunner: Fast-Track Overdrive & Buffer Bank
- When today's work is finished (or if you want to push ahead), you can **Unlock Tomorrow's Topic**.
- **Time Expansion Logic:** If you complete tomorrow's topic today:
  - You bank **+1 Buffer Day (+24 Hours of Time Cushion)**.
  - Your effective study pace increases to **2.0x Velocity**.
  - Your projected syllabus finish date moves **1 day earlier**.
  - Your final Mock & Revision window expands from 36 days to **37+ days**.
  - **Time Shield Safety Net:** If you take a rest tomorrow, your timetable, streak, and score are **100% protected** because tomorrow's topic was already completed in advance!

---

## 😈 Skipped topics, danger meter, yesterday's report

Lazy people skip topics. The site knows. 👀

- **Daily mission boxes:** Every day displays that day's exact topic from the timetable in 4 interactive cards: Learn (80 min), Solve (45 min), GA (20 min), Recall + error log (10 min).
- **Fast-Track Card:** Appears right after your daily mission, showing banked cushion hours, speed velocity, and next upcoming topic.
- **Catch-up box:** Displays rescheduled overdue topics with view toggles for today's quota or the entire backlog, with 1-click **Done +6** buttons.
- **Danger meter (0 to 100):** Goes SPEEDRUNNER ⚡ (if ahead) → SAFE 😎 → WARNING 😬 → DANGER 🚨 → CRITICAL 💀. Displays **Marks at Risk** and has an emergency wake-up buzzer.
- **Yesterday's report:** Shows yesterday's points, task checkboxes, verdict roast, plus **Yesterday's MVP** vs **Yesterday's Tharavu 🦆**.
- **Coming up:** 3-day lookahead so nobody can say "I didn't know".

---

## 📱 Pages

| Page | What happens there |
|---|---|
| `/login` | Sign up / sign in / forgot password with email verification gate. |
| `/` **Battle** | Ticking countdown, greeting, today's roast + audio, 1-on-1 Duel Clash, Wall of Shame, mission boxes, focus timer, error log scratchpad, PYQ counter, catch-up box, danger meter, public battle board with live task indicators, and private personal tasks. |
| `/leaderboard` | Top 3 Podium (🥇, 🥈, 🥉), Squad health status, point gaps with #1, zero-days, syllabus %, and gladiator badges. |
| `/syllabus` | Subject-wise progress for everyone with GATE marks weightages (~15 marks Maths, ~8-10 marks CN, etc.) and Subject Leaders. |
| `/tips` | 8 scientific study protocols (Active Recall, Spaced Repetition, Pomodoro, Feynman, Interleaving, Error Log, Sleep, PYQs), Interactive Feynman Mental Model Tester, and reality check roasts. |
| `/profile` | Change your display name, review stats, reset password, sign out. |

---

## 🧰 Tech used (for the nerds)

Next.js 16 (App Router) · React 19 · Firebase Auth + Cloud Firestore (real-time listeners) · GSAP micro-animations · Three.js 3D ambient particle starfield · Web Audio API sound synthesis · Vanilla CSS dark theme.

---

## 🛠️ Setup (follow in order, don't skip, lazy man)

### Step 0: Check Node
Open a terminal and type:
```bash
node -v
```
You need **20.9 or higher**. If not, install it from nodejs.org.

### Step 1: Install
Open a terminal inside this folder and run:
```bash
npm install
```

### Step 2: Make a Firebase project (free, 5 minutes)
1. Go to https://console.firebase.google.com and click **Add project**. Turn Analytics off.
2. Click the **`</>` Web icon**, give it any name, click **Register app**.
3. You will see a `firebaseConfig` block with your keys.
4. Left menu → **Build → Authentication → Get started → Email/Password → Enable → Save**.
5. Left menu → **Build → Firestore Database → Create database** in production mode.
6. In Firestore, open the **Rules** tab, paste everything from `firestore.rules`, and click **Publish**.

### Step 3: Add your keys
1. Copy `.env.example` and rename to **`.env.local`**.
2. Fill it with your Firebase values:
```env
NEXT_PUBLIC_FB_API_KEY=your apiKey
NEXT_PUBLIC_FB_AUTH_DOMAIN=your authDomain
NEXT_PUBLIC_FB_PROJECT_ID=your projectId
NEXT_PUBLIC_FB_APP_ID=your appId
```

### Step 4: Run it
```bash
npm run dev
```
Open **http://localhost:3000**. Sign up, click the verify link in your email, then click **"Verify aayi ✅"**.

---

## 🌍 Put it online (so your friend can join)

Deploy on Vercel (free):

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "padikkeda"
   git branch -M main
   git remote add origin https://github.com/YOURNAME/padikkeda.git
   git push -u origin main
   ```
2. Go to https://vercel.com, sign in with GitHub, and import the repo.
3. Add the 4 `NEXT_PUBLIC_FB_...` environment variables in Vercel settings.
4. Click **Deploy**.
5. ⚠️ **Critical:** In Firebase console → Authentication → **Settings → Authorized domains → Add domain** → add your `something.vercel.app`.
6. Send the link to your friend(s). The war begins! ⚔️

---

## ✏️ Want to customize stuff?

| I want to change... | Open this file |
|---|---|
| Timetable topics, dates, and GA schedule | `lib/data.js` |
| Scoring rules, danger thresholds, catch-up math | `lib/score.js` |
| Savage roasts, duel quotes, WhatsApp messages | `lib/roast.js` |
| Web Audio chimes, buzzers, and fanfares | `lib/sound.js` |
| 1-on-1 Duel Clash & Tug of War | `components/DuelArena.jsx` |
| Hall of Glory & Wall of Shame | `components/WallOfShame.jsx` |
| Pomodoro & Active Recall Focus Timer | `components/Timer.jsx` |
| Scientific study tips & Feynman tester | `app/tips/page.jsx` |
| Podium & Leaderboard standings | `app/leaderboard/page.jsx` |
| Subject weightages & syllabus bars | `app/syllabus/page.jsx` |
| Colours, animations, and dark mode | `app/globals.css` |
| Main Battle Dashboard layout | `app/page.jsx` |
| 3D background starfield & torus knot | `components/Bg3D.jsx` |
| Security rules | `firestore.rules` |

---

## 🧠 Lazy man's FAQ

**Can my friends see my personal tasks and error logs?**  
No. Those are stored in your private Firestore subcollection (`/users/{uid}/private`). Only your battle score and syllabus progress are public.

**Can I cheat by ticking everything?**  
Yes. Nobody is stopping you. But GATE 2027 is in the exam hall, bro. 😐

**Who gets roasted?**  
Everyone. If you're last, you get roasted. If you're first but the team is weak, you get roasted. If everyone slacks, everyone gets roasted.

**Is it really free?**  
Firebase free tier + Vercel free tier is more than enough for you and your study squad.

---

## 🏁 Final words

Setting this site up took effort. Now **use** it.  
Open it every morning, tick your tasks, beat your friends, and send them roasts on WhatsApp when they sleep.

*Padikkeda mone... GATE kaathirikkunnu.* 🔥📚
