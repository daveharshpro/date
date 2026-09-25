# Date Journey - A Developer's Interactive Date Proposal ❤️

A beautiful, highly interactive, romantic single-page web app built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React. Designed to feel like a developer personally built a cute surprise webpage for his girlfriend to ask her out on a date!

![Date Journey Banner](https://img.shields.io/badge/Made%20With-Love%20%26%20Code-ff4d6d?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)

---

## ✨ Features & Story Flow

- **Screen 1 — Welcome**: Minimal romantic landing with a glowing card and animated background floating hearts.
- **Screen 2 — Developer Intro**: Playful dev-themed introduction featuring a character-by-character typewriter code window (`date_proposal.js`).
- **Screen 3 — The Build Sequence**: Fake build & deployment logs with animated progress indicators (`Initializing Date.exe...`, `Checking compatibility... 100%`, `Preparing courage...`).
- **Screen 4 — Why You?**: Interactive glassmorphic cards revealing reasons why she is special, animated into view with smooth staggered motion.
- **Screen 5 — The Date Proposal**: The main emotional moment. Features the **famous runaway "NO" button** that dodges mouse/touch inputs while escalating the size and glow of the "YES" button!
- **Celebration State**: Multicolor confetti explosion, floating heart fountain, and Web Audio API celebratory fanfare.
- **Final Ticket Screen**: Displays an official date ticket with customizable date, location, food, and vibes, plus a **Replay** button.
- **Developer Easter Eggs**:
  - Interactive terminal modal (accessible via header icon or pressing `~` on keyboard). Try typing `npm run date` or `git status`!
  - Footer developer jokes (`Built with ❤️, JavaScript & questionable confidence.`).

---

## 🛠️ Quick Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 How to Personalize (30-Second Setup!)

All customizable text, names, reasons, and date details are centralized in a single configuration file:

📁 **`src/config/dateConfig.js`**

Simply open `src/config/dateConfig.js` and modify the fields:

```javascript
export const dateConfig = {
  // Names
  girlName: "Alex",
  guyName: "Dev",

  // Screen 1 - Welcome
  welcomeTitle: "Hey ❤️",
  openingMessage: "I made something for you...",

  // Screen 5 - Proposal
  dateQuestion: "Will you go on a date with me? ❤️",

  // Final Ticket Details
  dateLocation: "Secret for now 👀",
  dateActivity: "Dinner + good conversations + cozy vibes",
  dateFood: "Definitely delicious food 🍕🍷",
  dateVibes: "Immaculate ✨",
  dateDateTime: "Coming real soon 🗓️",
  finalMessage: "Can't wait to spend some time with you. ❤️"
};
```

---

## 🚀 Deployment Instructions

### Deploying to Vercel (Recommended - 1 Click)

1. Push your repository to GitHub.
2. Go to [Vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will automatically be detected as **Vite**.
5. Click **"Deploy"**!

Alternatively, using the Vercel CLI:
```bash
npx vercel
```

### Deploying to Netlify

1. Drag and drop your `dist` folder to Netlify Drop, or connect your Git repository.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploying to GitHub Pages

1. In `vite.config.js`, set `base: '/repository-name/'`.
2. Run `npm run build`.
3. Deploy the contents of the `dist` folder to your `gh-pages` branch.

---

## ⚙️ Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism & Micro-animations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Confetti**: canvas-confetti
- **Audio**: Web Audio API (Synthesized in-browser sound effects with zero external MP3 assets)

---

Crafted with ❤️ and code!
# date
