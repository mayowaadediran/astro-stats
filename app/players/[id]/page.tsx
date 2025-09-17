"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
  Shield,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Test data for players
const playerData = {
  tomi: {
    id: "tomi",
    name: "Tomi",
    position: "Forward",
    avatar: "👤",
    totalStats: {
      goals: 9,
      assists: 2,
      cleanSheets: 0,
      yellowCards: 1,
      redCards: 0,
    },
    gameweekStats: [
      { gameweek: 31, goals: 1, assists: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
      { gameweek: 32, goals: 2, assists: 1, cleanSheets: 0, yellowCards: 0, redCards: 0 },
      { gameweek: 33, goals: 6, assists: 1, cleanSheets: 0, yellowCards: 1, redCards: 0 },
    ],
  },
  kunle: {
    id: "kunle",
    name: "Kunle",
    position: "Midfielder",
    avatar: "👤",
    totalStats: {
      goals: 7,
      assists: 3,
      cleanSheets: 0,
      yellowCards: 0,
      redCards: 0,
    },
    gameweekStats: [
      { gameweek: 31, goals: 2, assists: 1, cleanSheets: 0, yellowCards: 0, redCards: 0 },
      { gameweek: 32, goals: 4, assists: 1, cleanSheets: 0, yellowCards: 0, redCards: 0 },
      { gameweek: 33, goals: 1, assists: 1, cleanSheets: 0, yellowCards: 0, redCards: 0 },
    ],
  },
  ajegs: {
    id: "ajegs",
    name: "Ajegs",
    position: "Goalkeeper",
    avatar: "👤",
    totalStats: {
      goals: 0,
      assists: 0,
      cleanSheets: 2,
      yellowCards: 0,
      redCards: 0,
    },
    gameweekStats: [
      { gameweek: 31, goals: 0, assists: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 },
      { gameweek: 32, goals: 0, assists: 0, cleanSheets: 1, yellowCards: 0, redCards: 0 },
      { gameweek: 33, goals: 0, assists: 0, cleanSheets: 1, yellowCards: 0, redCards: 0 },
    ],
  },
};

function StatCard({
  title,
  value,
  icon,
  color,
  trend,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}) {
  return (
    <Card className="group border-0 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}
            >
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${trend >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              <TrendingUp className={`h-4 w-4 ${trend < 0 ? "rotate-180" : ""}`} />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PlayerPage({ params }: { params: { id: string } }) {
  const player = playerData[params.id as keyof typeof playerData];

  if (!player) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <Card className="border-0 bg-white/90 p-8 shadow-lg backdrop-blur-md">
          <CardContent className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">Player Not Found</h1>
            <p className="mb-6 text-gray-600">The player you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalGA = player.totalStats.goals + player.totalStats.assists;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Back Button and Player Info */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100">
                  <span className="text-xl">{player.avatar}</span>
                </div>
                <div>
                  <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-xl font-bold text-transparent">
                    {player.name}
                  </h1>
                  <p className="text-sm text-gray-600">{player.position}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Player Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Goals"
            value={player.totalStats.goals}
            icon={<Target className="h-6 w-6" />}
            color="from-green-500 to-emerald-600"
            trend={15}
          />
          <StatCard
            title="Assists"
            value={player.totalStats.assists}
            icon={<TrendingUp className="h-6 w-6" />}
            color="from-blue-500 to-cyan-600"
            trend={8}
          />
          <StatCard
            title="Goals + Assists"
            value={totalGA}
            icon={<Trophy className="h-6 w-6" />}
            color="from-purple-500 to-violet-600"
            trend={12}
          />
          <StatCard
            title="Clean Sheets"
            value={player.totalStats.cleanSheets}
            icon={<Shield className="h-6 w-6" />}
            color="from-indigo-500 to-blue-600"
            trend={-5}
          />
        </div>

        {/* Recent Gameweeks */}
        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Calendar className="h-5 w-5" />
              Recent Gameweeks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {player.gameweekStats
                .slice()
                .reverse()
                .map((week, index) => (
                  <div
                    key={week.gameweek}
                    className="group flex items-center justify-between rounded-lg bg-gray-50/50 p-4 transition-all duration-200 hover:bg-gray-100/50"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.5s ease-out forwards",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 font-bold text-white">
                        {week.gameweek}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Gameweek {week.gameweek}</p>
                        <p className="text-sm text-gray-600">
                          {week.goals} goals, {week.assists} assists
                          {week.cleanSheets > 0 &&
                            `, ${week.cleanSheets} clean sheet${week.cleanSheets > 1 ? "s" : ""}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent">
                        {week.goals + week.assists}
                      </p>
                      <p className="text-sm text-gray-600">Total G/A</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
