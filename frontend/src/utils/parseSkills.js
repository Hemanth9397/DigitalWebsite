// utils/parseSkills.js

const specialCases = {
  js: "JavaScript",
  javascript: "JavaScript",
  html: "HTML",
  css: "CSS",
  nodejs: "Node.js",
  reactjs: "React",
  mongodb: "MongoDB",
  sql: "SQL",
  uiux: "UI/UX",
  api: "API",
};

function toTitleCase(word) {
  return word.length <= 2
    ? word.toUpperCase()
    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function normalizeWord(word) {
  // Handle camelCase to space
  let cleaned = word.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Replace - and _ with space
  cleaned = cleaned.replace(/[-_]/g, ' ');
  return cleaned.toLowerCase().trim();
}

function formatSkill(rawSkill) {
  const normalized = normalizeWord(rawSkill);
  const key = normalized.replace(/\s/g, '');
  if (specialCases[key]) return specialCases[key];

  // Convert to Title Case
  return normalized
    .split(' ')
    .map(toTitleCase)
    .join(' ');
}

export function parseSkills(input) {
  if (Array.isArray(input)) return input.map(formatSkill).filter(Boolean);

  if (typeof input === "string") {
    return input
      .split(",")
      .map((s) => formatSkill(s.trim()))
      .filter(Boolean);
  }

  return []; // fallback for null/undefined/invalid inputs
}

