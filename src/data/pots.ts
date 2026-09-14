export type Pot = {
  brand: string;
  plan: string;
  category: "Streaming" | "Travel" | "Shopping" | "News & Media" | "AI Tools" | "Digital Security";
  perkValue: string;
  deposit: string;
};

export const pots: Pot[] = [
  { brand: "Netflix Premium", plan: "Monthly plan", category: "Streaming", perkValue: "£227.88", deposit: "£4,500" },
  { brand: "Airbnb", plan: "Travel credit", category: "Travel", perkValue: "£50", deposit: "£1,000" },
  { brand: "Amazon", plan: "Gift card", category: "Shopping", perkValue: "£50", deposit: "£1,000" },
  { brand: "Waitrose", plan: "Gift card", category: "Shopping", perkValue: "£227.88", deposit: "£4,500" },
  { brand: "Financial Times", plan: "Standard, annual", category: "News & Media", perkValue: "£369", deposit: "£7,500" },
  { brand: "ChatGPT Plus", plan: "Monthly plan", category: "AI Tools", perkValue: "£227.88", deposit: "£4,500" },
  { brand: "NordVPN", plan: "Basic, 1-year plan", category: "Digital Security", perkValue: "£42.99", deposit: "£1,000" },
  { brand: "Mandarin Oriental", plan: "Stay credit", category: "Travel", perkValue: "£50", deposit: "£1,000" },
];

export const categories = [
  "All",
  "Streaming",
  "Travel",
  "Shopping",
  "News & Media",
  "AI Tools",
  "Digital Security",
] as const;
