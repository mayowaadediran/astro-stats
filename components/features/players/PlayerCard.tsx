import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Heart, Shield, AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getPositionIcon, getPositionColor, getRankIcon } from "../../../lib/playerUtils";
import { Player } from "../../../lib/playerData";

interface PlayerCardProps {
  player: Player & {
    seasonsPlayed?: number;
    seasons?: string[];
    rank: number;
  };
  isAllTime?: boolean;
}

export function PlayerCard({ player, isAllTime = false }: PlayerCardProps) {
  return (
    <Card className="group overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 transition-all duration-200 group-hover:from-green-200 group-hover:to-emerald-200">
              <span className="text-lg">{player.avatar}</span>
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 transition-colors group-hover:text-green-600">
                {player.name}
              </CardTitle>
              <div className="flex flex-col gap-1">
                <div
                  className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium ${getPositionColor(player.position)}`}
                >
                  <span>{getPositionIcon(player.position)}</span>
                  {player.position}
                </div>
                {isAllTime && player.seasonsPlayed && player.seasons && (
                  <div className="text-xs text-gray-500">
                    {player.seasonsPlayed} season{player.seasonsPlayed !== 1 ? "s" : ""} •{" "}
                    {player.seasons.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold transition-transform duration-200 group-hover:scale-110">
              {getRankIcon(player.rank)}
            </div>
            <div className="text-xs text-gray-600">{isAllTime ? "All-Time" : "Rank"}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative pt-0">
        {/* Stats Grid */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-600">Goals:</span>
            <span className="font-bold text-green-600">{player.stats.goals}</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">Assists:</span>
            <span className="font-bold text-blue-600">{player.stats.assists}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-gray-600">Clean:</span>
            <span className="font-bold text-emerald-600">{player.stats.cleanSheets}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-gray-600">Cards:</span>
            <div className="flex gap-1">
              <span className="font-bold text-yellow-600">{player.stats.yellowCards}</span>
              <span className="text-gray-400">/</span>
              <span className="font-bold text-red-600">{player.stats.redCards}</span>
            </div>
          </div>
        </div>

        {/* Total Points & Games */}
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-3">
          <div>
            <p className="text-xs text-gray-600">Total Points</p>
            <p className="text-xl font-bold text-gray-900">{player.totalPoints}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Games Played</p>
            <p className="text-lg font-semibold text-gray-700">{player.stats.gamesPlayed}</p>
          </div>
        </div>

        {/* Average per season for all-time view */}
        {isAllTime && player.seasonsPlayed && player.seasonsPlayed > 1 && (
          <div className="mt-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
            <p className="mb-1 text-xs font-medium text-blue-700">Season Averages</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-600">
              <div>Goals: {(player.stats.goals / player.seasonsPlayed).toFixed(1)}</div>
              <div>Assists: {(player.stats.assists / player.seasonsPlayed).toFixed(1)}</div>
              <div>Points: {(player.totalPoints / player.seasonsPlayed).toFixed(0)}</div>
              <div>Games: {(player.stats.gamesPlayed / player.seasonsPlayed).toFixed(0)}</div>
            </div>
          </div>
        )}

        {/* View Profile Link */}
        <Link href={`/players/${player.id}`}>
          <Button
            variant="ghost"
            className="mt-3 w-full justify-between text-green-600 hover:bg-green-50 hover:text-green-700"
          >
            View Profile
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
