// Personalization Configuration for Date Journey
// Edit the values below to personalize the website!

export const dateConfig = {
  // Names
  girlName: "Alex",
  guyName: "Dev",

  // Screen 1 - Welcome
  welcomeTitle: "Hey",
  openingMessage: "I made something for you...",
  openButtonText: "Open it",

  // Screen 2 - Developer Intro
  introSubtext1: "I could have just texted you...",
  introSubtext2: "But where's the fun in that?",
  introConclusion: "So I decided to build something instead.",
  codeSnippet: `const girl = "The most special person";

const plan = {
    location: "Somewhere nice",
    company: "You + Me",
    purpose: "A date"
};

if (girl === "you") {
    console.log("Perfect plan detected");
}`,

  // Screen 3 - The Build Sequence
  buildSteps: [
    { text: "Initializing Date.exe...", icon: "Terminal" },
    { text: "Finding perfect person...", success: true, detail: "Person found: YOU" },
    { text: "Checking compatibility...", success: true, detail: "100% Match!" },
    { text: "Preparing courage...", progress: 87 },
    { text: "Generating confidence...", progress: 100 },
    { text: "Deploying question...", icon: "Rocket" }
  ],

  // Screen 4 - Why You? Cards
  reasonsTitle: "A few (of many) reasons why...",
  reasons: [
    {
      id: 1,
      icon: "Heart",
      title: "Your Smile",
      desc: "It literally brightens my worst debugging sessions and makes my day 10x better."
    },
    {
      id: 2,
      icon: "Eye",
      title: "Your Eyes",
      desc: "The cutest pair of eyes that can make my heart skip a beat with just one glance."
    },
    {
      id: 3,
      icon: "Sparkles",
      title: "Ordinary Moments",
      desc: "The way you have a magic touch to make even simple coffee chats feel like an adventure."
    },
    {
      id: 4,
      icon: "Smile",
      title: "How Happy You Make Me",
      desc: "I find myself smiling at my screen every single time your notification pops up."
    },
    {
      id: 5,
      icon: "Gift",
      title: "Simply... You.",
      desc: "Because you're genuinely the most amazing, gorgeous, and thoughtful person."
    }
  ],

  // Screen 5 - The Date Proposal
  proposalLeadIn: [
    "Okay...",
    "I've spent enough time writing code.",
    "Here's the real question."
  ],
  dateQuestion: "Will you go on a date with me?",
  yesButtonText: "YES",
  noButtonText: "NO",

  // Playful NO button response states
  noButtonPhrases: [
    "Are you sure?",
    "Really sure?",
    "Think again...",
    "Wait, look at the YES button!",
    "Nice try, fast fingers!",
    "You can't escape romance!",
    "Error 404: 'No' option unavailable!"
  ],

  // YES celebration texts
  celebrationTitle: "YAY!",
  celebrationSubtext: "I knew you'd say yes.",
  celebrationBadge: "Date officially unlocked",

  // Final Screen - Date Ticket Details
  dateCardTitle: "It's a date!",
  coupleText: "You + Me",
  dateLocation: "Somewhere special (Secret for now)",
  dateActivity: "Dinner + good conversations + cozy vibes",
  dateFood: "Definitely delicious food",
  dateVibes: "Immaculate",
  dateDateTime: "Coming real soon",
  finalMessage: "Can't wait to spend some time with you.",

  // Developer Easter Eggs
  footerCredit: "Built with code, passion & confidence.",
  notFoundJoke: "404: Special person not found. Just kidding, you're right here."
};
