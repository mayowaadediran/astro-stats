import { playerDataByYear, Player, Position } from "./playerData";

export const getPositionIcon = (position: Position) => {
  switch (position) {
    case "Forward":
      return "⚡";
    case "Midfielder":
      return "🎯";
    case "Defender":
      return "🛡️";
    case "Goalkeeper":
      return "🥅";
    default:
      return "👤";
  }
};

export const getPositionColor = (position: Position) => {
  switch (position) {
    case "Forward":
      return "from-red-100 to-red-200 text-red-700";
    case "Midfielder":
      return "from-blue-100 to-blue-200 text-blue-700";
    case "Defender":
      return "from-green-100 to-green-200 text-green-700";
    case "Goalkeeper":
      return "from-purple-100 to-purple-200 text-purple-700";
    default:
      return "from-gray-100 to-gray-200 text-gray-700";
  }
};

export const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return `#${rank}`;
  }
};

// Calculate all-time aggregated stats
export const calculateAllTimeStats = () => {
  const allTimeStats: { [key: string]: any } = {};

  // Get all unique players across all years
  const allPlayers = new Set<string>();
  Object.values(playerDataByYear).forEach((yearData) => {
    yearData.forEach((player) => allPlayers.add(player.id));
  });

  // Aggregate stats for each player
  Array.from(allPlayers).forEach((playerId) => {
    const playerSeasons: string[] = [];
    let totalStats = {
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      yellowCards: 0,
      redCards: 0,
      gamesPlayed: 0,
    };
    let totalPoints = 0;
    let playerInfo: any = null;

    // Collect data from all years for this player
    Object.entries(playerDataByYear).forEach(([year, players]) => {
      const playerData = players.find((p) => p.id === playerId);
      if (playerData) {
        playerSeasons.push(year);
        totalStats.goals += playerData.stats.goals;
        totalStats.assists += playerData.stats.assists;
        totalStats.cleanSheets += playerData.stats.cleanSheets;
        totalStats.yellowCards += playerData.stats.yellowCards;
        totalStats.redCards += playerData.stats.redCards;
        totalStats.gamesPlayed += playerData.stats.gamesPlayed;
        totalPoints += playerData.totalPoints;

        if (!playerInfo) {
          playerInfo = {
            id: playerData.id,
            name: playerData.name,
            avatar: playerData.avatar,
            position: playerData.position,
          };
        }
      }
    });

    allTimeStats[playerId] = {
      ...playerInfo,
      stats: totalStats,
      totalPoints,
      seasonsPlayed: playerSeasons.length,
      seasons: playerSeasons,
      rank: 0, // Will be calculated after sorting
    };
  });

  // Sort by total points and assign ranks
  const sortedPlayers = Object.values(allTimeStats)
    .sort((a: any, b: any) => b.totalPoints - a.totalPoints)
    .map((player: any, index) => ({
      ...player,
      rank: index + 1,
    }));

  return sortedPlayers;
};

// Generate leaderboard data from player stats
export const generateLeaderboards = (year: string) => {
  let players;

  if (year === "All Time") {
    players = calculateAllTimeStats();
  } else {
    players = playerDataByYear[year as keyof typeof playerDataByYear] || [];
  }

  const createLeaderboard = (statKey: keyof Player["stats"], limit?: number) => {
    const sorted = players
      .sort((a, b) => b.stats[statKey] - a.stats[statKey])
      .map((player, index) => ({
        rank: index + 1,
        name: player.name,
        value: player.stats[statKey],
        avatar: player.avatar,
        id: player.id,
        position: player.position,
      }));

    return limit ? sorted.slice(0, limit) : sorted;
  };

  return {
    goals: createLeaderboard("goals"),
    assists: createLeaderboard("assists"),
    goalsAssists: players
      .sort((a, b) => b.stats.goals + b.stats.assists - (a.stats.goals + a.stats.assists))
      .map((player, index) => ({
        rank: index + 1,
        name: player.name,
        value: player.stats.goals + player.stats.assists,
        avatar: player.avatar,
        id: player.id,
        position: player.position,
      })),
    cleanSheets: createLeaderboard("cleanSheets"),
    yellowCards: createLeaderboard("yellowCards"),
    redCards: createLeaderboard("redCards"),
  };
};
