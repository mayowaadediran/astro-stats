"use client";

import { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";

// Test data based on PRD sample
const testData = {
  goals: [
    { rank: 1, name: "Tomi", value: 9, avatar: "👤" },
    { rank: 2, name: "Kunle", value: 7, avatar: "👤" },
    { rank: 3, name: "Gbaja", value: 6, avatar: "👤" },
  ],
  assists: [
    { rank: 1, name: "Kunle", value: 3, avatar: "👤" },
    { rank: 2, name: "Tomi", value: 2, avatar: "👤" },
    { rank: 3, name: "Mayowa", value: 2, avatar: "👤" },
  ],
  goalsAssists: [
    { rank: 1, name: "Tomi", value: 11, avatar: "👤" },
    { rank: 2, name: "Kunle", value: 10, avatar: "👤" },
    { rank: 3, name: "Gbaja", value: 7, avatar: "👤" },
  ],
  cleanSheets: [
    { rank: 1, name: "Ajegs", value: 2, avatar: "👤" },
    { rank: 2, name: "Segun", value: 1, avatar: "👤" },
    { rank: 3, name: "Tobi", value: 1, avatar: "👤" },
  ],
  yellowCards: [
    { rank: 1, name: "Debo", value: 3, avatar: "👤" },
    { rank: 2, name: "Mayowa", value: 2, avatar: "👤" },
    { rank: 3, name: "Uzo", value: 2, avatar: "👤" },
  ],
  redCards: [
    { rank: 1, name: "Uzo", value: 1, avatar: "👤" },
    { rank: 2, name: "Gbaja", value: 1, avatar: "👤" },
    { rank: 3, name: "-", value: 0, avatar: "👤" },
  ],
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
          <div>
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-extrabold text-transparent">
              Top Stats
            </h1>
          </div>
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

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Goals" icon="⚽" data={testData.goals} />
          <StatCard title="Assists" icon="🎯" data={testData.assists} />
          <StatCard title="Goals + Assists" icon="📊" data={testData.goalsAssists} />
          <StatCard title="Clean Sheets" icon="🧤" data={testData.cleanSheets} />
          <StatCard title="Yellow Cards" icon="🟨" data={testData.yellowCards} />
          <StatCard title="Red Cards" icon="🟥" data={testData.redCards} />
        </div>
      </main>
    </div>
  );
}
