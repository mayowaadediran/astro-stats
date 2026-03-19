// Mock gameweek data structure (keyed by year, like playerDataByYear)
export type PlayerContribution = {
  playerId: string;
  playerName: string;
  avatar: string;
  count: number;
};

export type GameweekEvent = {
  type: string;
  count: number;
  icon: string;
  players: string[]; // Keep for backward compatibility
  contributions?: PlayerContribution[];
};

export type Gameweek = {
  week: number;
  date: string;
  events: GameweekEvent[];
};

export type GameweekByYear = Record<string, Gameweek[]>;

export const gameweekDataByYear: GameweekByYear = {
  "2024": [
    {
      week: 16,
      date: "Dec 15, 2024",
      events: [
        {
          type: "Goals",
          count: 12,
          icon: "⚽",
          players: [
            "Tomi (3)",
            "Kunle (2)",
            "Gbaja (2)",
            "Mayowa (2)",
            "Segun (1)",
            "Debo (1)",
            "Tobi (1)",
          ],
          contributions: [
            { playerId: "tomi", playerName: "Tomi", avatar: "👤", count: 3 },
            { playerId: "kunle", playerName: "Kunle", avatar: "👤", count: 2 },
            { playerId: "gbaja", playerName: "Gbaja", avatar: "👤", count: 2 },
            { playerId: "mayowa", playerName: "Mayowa", avatar: "👤", count: 2 },
            { playerId: "segun", playerName: "Segun", avatar: "👤", count: 1 },
            { playerId: "debo", playerName: "Debo", avatar: "👤", count: 1 },
            { playerId: "tobi", playerName: "Tobi", avatar: "👤", count: 1 },
          ],
        },
        {
          type: "Assists",
          count: 8,
          icon: "🎯",
          players: ["Kunle (2)", "Mayowa (2)", "Ajegs (1)", "Segun (1)", "Tomi (1)", "Gbaja (1)"],
          contributions: [
            { playerId: "kunle", playerName: "Kunle", avatar: "👤", count: 2 },
            { playerId: "mayowa", playerName: "Mayowa", avatar: "👤", count: 2 },
            { playerId: "ajegs", playerName: "Ajegs", avatar: "👤", count: 1 },
            { playerId: "segun", playerName: "Segun", avatar: "👤", count: 1 },
            { playerId: "tomi", playerName: "Tomi", avatar: "👤", count: 1 },
            { playerId: "gbaja", playerName: "Gbaja", avatar: "👤", count: 1 },
          ],
        },
        {
          type: "Clean Sheets",
          count: 3,
          icon: "🧤",
          players: ["Ajegs", "Segun", "Tobi"],
          contributions: [
            { playerId: "ajegs", playerName: "Ajegs", avatar: "👤", count: 1 },
            { playerId: "segun", playerName: "Segun", avatar: "👤", count: 1 },
            { playerId: "tobi", playerName: "Tobi", avatar: "👤", count: 1 },
          ],
        },
        {
          type: "Yellow Cards",
          count: 5,
          icon: "🟨",
          players: ["Debo (2)", "Uzo (1)", "Tomi (1)", "Kunle (1)"],
          contributions: [
            { playerId: "debo", playerName: "Debo", avatar: "👤", count: 2 },
            { playerId: "uzo", playerName: "Uzo", avatar: "👤", count: 1 },
            { playerId: "tomi", playerName: "Tomi", avatar: "👤", count: 1 },
            { playerId: "kunle", playerName: "Kunle", avatar: "👤", count: 1 },
          ],
        },
        {
          type: "Red Cards",
          count: 1,
          icon: "🟥",
          players: ["Uzo"],
          contributions: [{ playerId: "uzo", playerName: "Uzo", avatar: "👤", count: 1 }],
        },
      ],
    },
    {
      week: 15,
      date: "Dec 8, 2024",
      events: [
        {
          type: "Goals",
          count: 9,
          icon: "⚽",
          players: ["Tomi (2)", "Mayowa (2)", "Kunle (2)", "Gbaja (1)", "Debo (1)", "Segun (1)"],
        },
        {
          type: "Assists",
          count: 6,
          icon: "🎯",
          players: ["Kunle (2)", "Tomi (1)", "Mayowa (1)", "Segun (1)", "Tobi (1)"],
        },
        { type: "Clean Sheets", count: 2, icon: "🧤", players: ["Ajegs", "Segun"] },
        {
          type: "Yellow Cards",
          count: 3,
          icon: "🟨",
          players: ["Gbaja (1)", "Debo (1)", "Uzo (1)"],
        },
        { type: "Red Cards", count: 0, icon: "🟥", players: [] },
      ],
    },
    {
      week: 14,
      date: "Dec 1, 2024",
      events: [
        {
          type: "Goals",
          count: 11,
          icon: "⚽",
          players: ["Gbaja (3)", "Tomi (2)", "Kunle (2)", "Mayowa (1)", "Debo (2)", "Segun (1)"],
        },
        {
          type: "Assists",
          count: 7,
          icon: "🎯",
          players: ["Kunle (3)", "Mayowa (2)", "Tomi (1)", "Ajegs (1)"],
        },
        { type: "Clean Sheets", count: 4, icon: "🧤", players: ["Ajegs", "Segun", "Tobi", "Uzo"] },
        {
          type: "Yellow Cards",
          count: 4,
          icon: "🟨",
          players: ["Debo (2)", "Tomi (1)", "Gbaja (1)"],
        },
        { type: "Red Cards", count: 2, icon: "🟥", players: ["Debo", "Uzo"] },
      ],
    },
    {
      week: 13,
      date: "Nov 24, 2024",
      events: [
        {
          type: "Goals",
          count: 8,
          icon: "⚽",
          players: ["Kunle (2)", "Tomi (2)", "Gbaja (1)", "Mayowa (1)", "Segun (1)", "Tobi (1)"],
        },
        {
          type: "Assists",
          count: 5,
          icon: "🎯",
          players: ["Mayowa (2)", "Kunle (1)", "Tomi (1)", "Segun (1)"],
        },
        { type: "Clean Sheets", count: 1, icon: "🧤", players: ["Ajegs"] },
        {
          type: "Yellow Cards",
          count: 6,
          icon: "🟨",
          players: ["Debo (2)", "Uzo (2)", "Kunle (1)", "Gbaja (1)"],
        },
        { type: "Red Cards", count: 0, icon: "🟥", players: [] },
      ],
    },
  ],
};
