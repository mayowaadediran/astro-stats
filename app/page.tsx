"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Calendar,
  Trophy,
  Plus,
  Target,
  TrendingUp,
  Shield,
  AlertTriangle,
  Zap,
  Users,
} from "lucide-react";
import Link from "next/link";

// Import the same player data structure from the players page
const playerDataByYear = {
  "2025": [
    {
      id: "tomi",
      name: "Tomi",
      avatar: "👤",
      position: "Forward",
      stats: { goals: 9, assists: 6, cleanSheets: 1, yellowCards: 2, redCards: 1, gamesPlayed: 15 },
      totalPoints: 42,
      rank: 1,
    },
    {
      id: "kunle",
      name: "Kunle",
      avatar: "👤",
      position: "Midfielder",
      stats: { goals: 7, assists: 8, cleanSheets: 2, yellowCards: 3, redCards: 0, gamesPlayed: 16 },
      totalPoints: 38,
      rank: 2,
    },
    {
      id: "mayowa",
      name: "Mayowa",
      avatar: "👤",
      position: "Midfielder",
      stats: { goals: 5, assists: 5, cleanSheets: 0, yellowCards: 1, redCards: 0, gamesPlayed: 14 },
      totalPoints: 28,
      rank: 3,
    },
    {
      id: "gbaja",
      name: "Gbaja",
      avatar: "👤",
      position: "Forward",
      stats: { goals: 6, assists: 2, cleanSheets: 0, yellowCards: 3, redCards: 0, gamesPlayed: 13 },
      totalPoints: 25,
      rank: 4,
    },
    {
      id: "ajegs",
      name: "Ajegs",
      avatar: "👤",
      position: "Goalkeeper",
      stats: { goals: 0, assists: 1, cleanSheets: 7, yellowCards: 1, redCards: 0, gamesPlayed: 16 },
      totalPoints: 23,
      rank: 5,
    },
    {
      id: "segun",
      name: "Segun",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 2, assists: 3, cleanSheets: 5, yellowCards: 2, redCards: 0, gamesPlayed: 15 },
      totalPoints: 22,
      rank: 6,
    },
    {
      id: "tobi",
      name: "Tobi",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 1, assists: 2, cleanSheets: 4, yellowCards: 1, redCards: 0, gamesPlayed: 12 },
      totalPoints: 18,
      rank: 7,
    },
    {
      id: "debo",
      name: "Debo",
      avatar: "👤",
      position: "Midfielder",
      stats: { goals: 3, assists: 1, cleanSheets: 1, yellowCards: 5, redCards: 1, gamesPlayed: 14 },
      totalPoints: 15,
      rank: 8,
    },
    {
      id: "uzo",
      name: "Uzo",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 1, assists: 0, cleanSheets: 2, yellowCards: 4, redCards: 2, gamesPlayed: 11 },
      totalPoints: 8,
      rank: 9,
    },
  ],
  "2024": [
    {
      id: "tomi",
      name: "Tomi",
      avatar: "👤",
      position: "Forward",
      stats: {
        goals: 12,
        assists: 4,
        cleanSheets: 0,
        yellowCards: 3,
        redCards: 0,
        gamesPlayed: 18,
      },
      totalPoints: 48,
      rank: 1,
    },
    {
      id: "gbaja",
      name: "Gbaja",
      avatar: "👤",
      position: "Forward",
      stats: {
        goals: 10,
        assists: 3,
        cleanSheets: 1,
        yellowCards: 2,
        redCards: 1,
        gamesPlayed: 17,
      },
      totalPoints: 41,
      rank: 2,
    },
    {
      id: "kunle",
      name: "Kunle",
      avatar: "👤",
      position: "Midfielder",
      stats: { goals: 8, assists: 7, cleanSheets: 3, yellowCards: 4, redCards: 0, gamesPlayed: 19 },
      totalPoints: 39,
      rank: 3,
    },
    {
      id: "mayowa",
      name: "Mayowa",
      avatar: "👤",
      position: "Midfielder",
      stats: { goals: 6, assists: 6, cleanSheets: 2, yellowCards: 2, redCards: 0, gamesPlayed: 16 },
      totalPoints: 32,
      rank: 4,
    },
    {
      id: "ajegs",
      name: "Ajegs",
      avatar: "👤",
      position: "Goalkeeper",
      stats: { goals: 1, assists: 0, cleanSheets: 9, yellowCards: 0, redCards: 0, gamesPlayed: 18 },
      totalPoints: 28,
      rank: 5,
    },
    {
      id: "segun",
      name: "Segun",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 3, assists: 4, cleanSheets: 6, yellowCards: 3, redCards: 0, gamesPlayed: 17 },
      totalPoints: 27,
      rank: 6,
    },
    {
      id: "tobi",
      name: "Tobi",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 2, assists: 1, cleanSheets: 5, yellowCards: 1, redCards: 0, gamesPlayed: 15 },
      totalPoints: 21,
      rank: 7,
    },
    {
      id: "debo",
      name: "Debo",
      avatar: "👤",
      position: "Midfielder",
      stats: { goals: 4, assists: 2, cleanSheets: 0, yellowCards: 6, redCards: 2, gamesPlayed: 16 },
      totalPoints: 18,
      rank: 8,
    },
    {
      id: "uzo",
      name: "Uzo",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 0, assists: 1, cleanSheets: 3, yellowCards: 5, redCards: 1, gamesPlayed: 13 },
      totalPoints: 9,
      rank: 9,
    },
  ],
  "2023": [
    {
      id: "kunle",
      name: "Kunle",
      avatar: "👤",
      position: "Midfielder",
      stats: {
        goals: 11,
        assists: 9,
        cleanSheets: 1,
        yellowCards: 2,
        redCards: 0,
        gamesPlayed: 20,
      },
      totalPoints: 51,
      rank: 1,
    },
    {
      id: "tomi",
      name: "Tomi",
      avatar: "👤",
      position: "Forward",
      stats: {
        goals: 14,
        assists: 2,
        cleanSheets: 0,
        yellowCards: 4,
        redCards: 1,
        gamesPlayed: 19,
      },
      totalPoints: 48,
      rank: 2,
    },
    {
      id: "mayowa",
      name: "Mayowa",
      avatar: "👤",
      position: "Midfielder",
      stats: { goals: 7, assists: 8, cleanSheets: 1, yellowCards: 1, redCards: 0, gamesPlayed: 18 },
      totalPoints: 38,
      rank: 3,
    },
    {
      id: "gbaja",
      name: "Gbaja",
      avatar: "👤",
      position: "Forward",
      stats: { goals: 9, assists: 1, cleanSheets: 0, yellowCards: 3, redCards: 0, gamesPlayed: 16 },
      totalPoints: 31,
      rank: 4,
    },
    {
      id: "segun",
      name: "Segun",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 1, assists: 2, cleanSheets: 8, yellowCards: 1, redCards: 0, gamesPlayed: 19 },
      totalPoints: 27,
      rank: 5,
    },
    {
      id: "ajegs",
      name: "Ajegs",
      avatar: "👤",
      position: "Goalkeeper",
      stats: { goals: 0, assists: 0, cleanSheets: 8, yellowCards: 2, redCards: 0, gamesPlayed: 17 },
      totalPoints: 22,
      rank: 6,
    },
    {
      id: "tobi",
      name: "Tobi",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 0, assists: 3, cleanSheets: 6, yellowCards: 0, redCards: 0, gamesPlayed: 14 },
      totalPoints: 21,
      rank: 7,
    },
    {
      id: "debo",
      name: "Debo",
      avatar: "👤",
      position: "Midfielder",
      stats: { goals: 2, assists: 3, cleanSheets: 2, yellowCards: 7, redCards: 0, gamesPlayed: 17 },
      totalPoints: 18,
      rank: 8,
    },
    {
      id: "uzo",
      name: "Uzo",
      avatar: "👤",
      position: "Defender",
      stats: { goals: 2, assists: 0, cleanSheets: 4, yellowCards: 6, redCards: 3, gamesPlayed: 15 },
      totalPoints: 14,
      rank: 9,
    },
  ],
};

// Calculate all-time aggregated stats
const calculateAllTimeStats = () => {
  const allTimeStats: { [key: string]: any } = {};

  // Get all unique players across all years
  const allPlayers = new Set<string>();
  Object.values(playerDataByYear).forEach((yearData) => {
    yearData.forEach((player) => allPlayers.add(player.id));
  });

  // Aggregate stats for each player
  Array.from(allPlayers).forEach((playerId) => {
    let totalStats = {
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      yellowCards: 0,
      redCards: 0,
      gamesPlayed: 0,
    };
    let playerInfo: any = null;

    // Collect data from all years for this player
    Object.values(playerDataByYear).forEach((players) => {
      const playerData = players.find((p) => p.id === playerId);
      if (playerData) {
        totalStats.goals += playerData.stats.goals;
        totalStats.assists += playerData.stats.assists;
        totalStats.cleanSheets += playerData.stats.cleanSheets;
        totalStats.yellowCards += playerData.stats.yellowCards;
        totalStats.redCards += playerData.stats.redCards;
        totalStats.gamesPlayed += playerData.stats.gamesPlayed;

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
    };
  });

  return Object.values(allTimeStats);
};

// Generate leaderboard data from player stats
const generateLeaderboards = (year: string) => {
  let players;

  if (year === "All Time") {
    players = calculateAllTimeStats();
  } else {
    players = playerDataByYear[year as keyof typeof playerDataByYear] || [];
  }

  const createLeaderboard = (statKey: keyof (typeof players)[0]["stats"], limit = 3) => {
    return players
      .sort((a, b) => b.stats[statKey] - a.stats[statKey])
      .slice(0, limit)
      .map((player, index) => ({
        rank: index + 1,
        name: player.name,
        value: player.stats[statKey],
        avatar: player.avatar,
      }));
  };

  return {
    goals: createLeaderboard("goals"),
    assists: createLeaderboard("assists"),
    goalsAssists: players
      .sort((a, b) => b.stats.goals + b.stats.assists - (a.stats.goals + a.stats.assists))
      .slice(0, 3)
      .map((player, index) => ({
        rank: index + 1,
        name: player.name,
        value: player.stats.goals + player.stats.assists,
        avatar: player.avatar,
      })),
    cleanSheets: createLeaderboard("cleanSheets"),
    yellowCards: createLeaderboard("yellowCards"),
    redCards: createLeaderboard("redCards"),
  };
};

function StatCard({
  title,
  icon,
  data,
}: {
  title: string;
  icon: string;
  data: Array<{ rank: number; name: string; value: number; avatar: string }>;
}) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank.toString();
    }
  };

  return (
    <Card className="group w-full overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <CardHeader className="relative pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-700">
          <span className="text-xl">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative pt-0">
        <div className="space-y-4">
          {data.map((player, index) => (
            <div
              key={`${title}-${player.rank}`}
              className="group/item flex items-center justify-between transition-all duration-200 hover:pl-2"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-lg transition-transform duration-200 group-hover/item:scale-110">
                  {getRankIcon(player.rank)}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 transition-all duration-200 group-hover/item:from-green-200 group-hover/item:to-emerald-200">
                  <span className="text-sm">{player.avatar}</span>
                </div>
                <Link
                  href={`/players/${player.name.toLowerCase()}`}
                  className="cursor-pointer font-medium text-gray-900 transition-colors hover:text-green-600"
                >
                  {player.name}
                </Link>
              </div>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-xl font-bold text-transparent">
                {player.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2025");

  // Generate leaderboards for the selected year
  const leaderboards = useMemo(() => {
    return generateLeaderboards(selectedYear);
  }, [selectedYear]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header with Logo and Year Selector */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-xl font-bold text-transparent">
                Astro Stats
              </h1>
            </div>

            {/* Year Selector */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px] border-gray-300 bg-white shadow-sm">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Time">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-3 w-3 text-amber-500" />
                    All Time
                  </div>
                </SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Stats Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/players">
              <Button
                variant="outline"
                size="default"
                className="flex items-center gap-2 border-gray-200 bg-white shadow-sm transition-colors hover:border-green-300 hover:bg-gray-50 hover:text-green-700"
              >
                <Users className="h-4 w-4" />
                All Players
              </Button>
            </Link>
            <Link href="/gameweeks">
              <Button
                variant="outline"
                size="default"
                className="flex items-center gap-2 border-gray-200 bg-white shadow-sm hover:bg-gray-50"
              >
                <Calendar className="h-4 w-4" />
                Game week stats
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-extrabold text-transparent">
            Top Stats
          </h1>
          <p className="mt-1 text-sm text-gray-600">League standings for {selectedYear}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Goals" icon="⚽" data={leaderboards.goals} />
          <StatCard title="Assists" icon="🎯" data={leaderboards.assists} />
          <StatCard title="Goals + Assists" icon="📊" data={leaderboards.goalsAssists} />
          <StatCard title="Clean Sheets" icon="🧤" data={leaderboards.cleanSheets} />
          <StatCard title="Yellow Cards" icon="🟨" data={leaderboards.yellowCards} />
          <StatCard title="Red Cards" icon="🟥" data={leaderboards.redCards} />
        </div>
      </main>
    </div>
  );
}
