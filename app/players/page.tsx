"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trophy,
  Search,
  Users,
  Target,
  Heart,
  Shield,
  AlertTriangle,
  Square,
  ChevronRight,
  ArrowLeft,
  Plus,
  UserPlus,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";

// Player data by year with comprehensive stats
const playerDataByYear = {
  "2025": [
    {
      id: "tomi",
      name: "Tomi",
      avatar: "👤",
      position: "Forward",
      stats: {
        goals: 9,
        assists: 6,
        cleanSheets: 1,
        yellowCards: 2,
        redCards: 1,
        gamesPlayed: 15,
      },
      totalPoints: 42,
      rank: 1,
    },
    {
      id: "kunle",
      name: "Kunle",
      avatar: "👤",
      position: "Midfielder",
      stats: {
        goals: 7,
        assists: 8,
        cleanSheets: 2,
        yellowCards: 3,
        redCards: 0,
        gamesPlayed: 16,
      },
      totalPoints: 38,
      rank: 2,
    },
    {
      id: "mayowa",
      name: "Mayowa",
      avatar: "👤",
      position: "Midfielder",
      stats: {
        goals: 5,
        assists: 5,
        cleanSheets: 0,
        yellowCards: 1,
        redCards: 0,
        gamesPlayed: 14,
      },
      totalPoints: 28,
      rank: 3,
    },
    {
      id: "gbaja",
      name: "Gbaja",
      avatar: "👤",
      position: "Forward",
      stats: {
        goals: 6,
        assists: 2,
        cleanSheets: 0,
        yellowCards: 3,
        redCards: 0,
        gamesPlayed: 13,
      },
      totalPoints: 25,
      rank: 4,
    },
    {
      id: "ajegs",
      name: "Ajegs",
      avatar: "👤",
      position: "Goalkeeper",
      stats: {
        goals: 0,
        assists: 1,
        cleanSheets: 7,
        yellowCards: 1,
        redCards: 0,
        gamesPlayed: 16,
      },
      totalPoints: 23,
      rank: 5,
    },
    {
      id: "segun",
      name: "Segun",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 2,
        assists: 3,
        cleanSheets: 5,
        yellowCards: 2,
        redCards: 0,
        gamesPlayed: 15,
      },
      totalPoints: 22,
      rank: 6,
    },
    {
      id: "tobi",
      name: "Tobi",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 1,
        assists: 2,
        cleanSheets: 4,
        yellowCards: 1,
        redCards: 0,
        gamesPlayed: 12,
      },
      totalPoints: 18,
      rank: 7,
    },
    {
      id: "debo",
      name: "Debo",
      avatar: "👤",
      position: "Midfielder",
      stats: {
        goals: 3,
        assists: 1,
        cleanSheets: 1,
        yellowCards: 5,
        redCards: 1,
        gamesPlayed: 14,
      },
      totalPoints: 15,
      rank: 8,
    },
    {
      id: "uzo",
      name: "Uzo",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 1,
        assists: 0,
        cleanSheets: 2,
        yellowCards: 4,
        redCards: 2,
        gamesPlayed: 11,
      },
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
      stats: {
        goals: 8,
        assists: 7,
        cleanSheets: 3,
        yellowCards: 4,
        redCards: 0,
        gamesPlayed: 19,
      },
      totalPoints: 39,
      rank: 3,
    },
    {
      id: "mayowa",
      name: "Mayowa",
      avatar: "👤",
      position: "Midfielder",
      stats: {
        goals: 6,
        assists: 6,
        cleanSheets: 2,
        yellowCards: 2,
        redCards: 0,
        gamesPlayed: 16,
      },
      totalPoints: 32,
      rank: 4,
    },
    {
      id: "ajegs",
      name: "Ajegs",
      avatar: "👤",
      position: "Goalkeeper",
      stats: {
        goals: 1,
        assists: 0,
        cleanSheets: 9,
        yellowCards: 0,
        redCards: 0,
        gamesPlayed: 18,
      },
      totalPoints: 28,
      rank: 5,
    },
    {
      id: "segun",
      name: "Segun",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 3,
        assists: 4,
        cleanSheets: 6,
        yellowCards: 3,
        redCards: 0,
        gamesPlayed: 17,
      },
      totalPoints: 27,
      rank: 6,
    },
    {
      id: "tobi",
      name: "Tobi",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 2,
        assists: 1,
        cleanSheets: 5,
        yellowCards: 1,
        redCards: 0,
        gamesPlayed: 15,
      },
      totalPoints: 21,
      rank: 7,
    },
    {
      id: "debo",
      name: "Debo",
      avatar: "👤",
      position: "Midfielder",
      stats: {
        goals: 4,
        assists: 2,
        cleanSheets: 0,
        yellowCards: 6,
        redCards: 2,
        gamesPlayed: 16,
      },
      totalPoints: 18,
      rank: 8,
    },
    {
      id: "uzo",
      name: "Uzo",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 0,
        assists: 1,
        cleanSheets: 3,
        yellowCards: 5,
        redCards: 1,
        gamesPlayed: 13,
      },
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
      stats: {
        goals: 7,
        assists: 8,
        cleanSheets: 1,
        yellowCards: 1,
        redCards: 0,
        gamesPlayed: 18,
      },
      totalPoints: 38,
      rank: 3,
    },
    {
      id: "gbaja",
      name: "Gbaja",
      avatar: "👤",
      position: "Forward",
      stats: {
        goals: 9,
        assists: 1,
        cleanSheets: 0,
        yellowCards: 3,
        redCards: 0,
        gamesPlayed: 16,
      },
      totalPoints: 31,
      rank: 4,
    },
    {
      id: "segun",
      name: "Segun",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 1,
        assists: 2,
        cleanSheets: 8,
        yellowCards: 1,
        redCards: 0,
        gamesPlayed: 19,
      },
      totalPoints: 27,
      rank: 5,
    },
    {
      id: "ajegs",
      name: "Ajegs",
      avatar: "👤",
      position: "Goalkeeper",
      stats: {
        goals: 0,
        assists: 0,
        cleanSheets: 8,
        yellowCards: 2,
        redCards: 0,
        gamesPlayed: 17,
      },
      totalPoints: 22,
      rank: 6,
    },
    {
      id: "tobi",
      name: "Tobi",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 0,
        assists: 3,
        cleanSheets: 6,
        yellowCards: 0,
        redCards: 0,
        gamesPlayed: 14,
      },
      totalPoints: 21,
      rank: 7,
    },
    {
      id: "debo",
      name: "Debo",
      avatar: "👤",
      position: "Midfielder",
      stats: {
        goals: 2,
        assists: 3,
        cleanSheets: 2,
        yellowCards: 7,
        redCards: 0,
        gamesPlayed: 17,
      },
      totalPoints: 18,
      rank: 8,
    },
    {
      id: "uzo",
      name: "Uzo",
      avatar: "👤",
      position: "Defender",
      stats: {
        goals: 2,
        assists: 0,
        cleanSheets: 4,
        yellowCards: 6,
        redCards: 3,
        gamesPlayed: 15,
      },
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

const positions = ["All Positions", "Forward", "Midfielder", "Defender", "Goalkeeper"];

const getPositionIcon = (position: string) => {
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

const getPositionColor = (position: string) => {
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

const getRankIcon = (rank: number) => {
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

function PlayerCard({ player, isAllTime = false }: { player: any; isAllTime?: boolean }) {
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
                {isAllTime && (
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
        {isAllTime && player.seasonsPlayed > 1 && (
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

// Add Player Drawer Component
function AddPlayerDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerImage, setPlayerImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.");
        return;
      }

      setPlayerImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPlayerImage(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById("imageUpload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim() || !playerPosition) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would make an API call here
      const formData = new FormData();
      formData.append("name", playerName.trim());
      formData.append("position", playerPosition);
      if (playerImage) {
        formData.append("image", playerImage);
      }

      console.log("Adding new player:", {
        name: playerName.trim(),
        position: playerPosition,
        image: playerImage ? playerImage.name : null,
      });

      // Reset form
      setPlayerName("");
      setPlayerPosition("");
      setPlayerImage(null);
      setImagePreview(null);
      // Reset file input
      const fileInput = document.getElementById("imageUpload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      setIsOpen(false);

      // Show success message (in a real app, you might use a toast notification)
      alert(`Player "${playerName}" has been added successfully!`);
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-blue-500/25">
          <UserPlus className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex max-h-[90vh] flex-col">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex-shrink-0 pb-2">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <UserPlus className="h-5 w-5 text-blue-500" />
              Add New Player
            </DrawerTitle>
            <DrawerDescription>Add a new player to the Astro league</DrawerDescription>
          </DrawerHeader>

          {/* Scrollable Form Content */}
          <div
            className="flex-1 overflow-y-scroll px-4 pb-4"
            style={{ maxHeight: "calc(90vh - 140px)" }}
          >
            <form className="space-y-4 pb-6">
              {/* Player Name */}
              <div className="space-y-2">
                <Label htmlFor="playerName">Player Name *</Label>
                <Input
                  id="playerName"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter player name"
                  className="border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Position Selection */}
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Select value={playerPosition} onValueChange={setPlayerPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        <div className="flex items-center gap-2">
                          <span>{getPositionIcon(position)}</span>
                          {position}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="imageUpload">Player Image</Label>
                <div className="space-y-3">
                  {/* Upload Area */}
                  <div className="relative">
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-blue-400 hover:bg-blue-50"
                    >
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium text-blue-600">Click to upload</span> or drag
                        and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative inline-block">
                      <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-gray-200">
                        <img
                          src={imagePreview}
                          alt="Player preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview */}
              {playerName && playerPosition && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-medium text-gray-900">Preview</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Player preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">👤</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{playerName}</p>
                      <div
                        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium ${getPositionColor(playerPosition)}`}
                      >
                        <span>{getPositionIcon(playerPosition)}</span>
                        {playerPosition}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Extra spacing for better scroll experience */}
              <div className="h-4"></div>
            </form>
          </div>

          {/* Sticky Submit Button */}
          <div className="sticky bottom-0 mt-auto border-t border-gray-200 bg-white p-4">
            <Button
              type="submit"
              disabled={!playerName.trim() || !playerPosition || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:from-blue-600 hover:to-indigo-700"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Adding Player...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Player to League
                </>
              )}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function PlayersPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All Positions");

  // Get current year's data or all-time aggregated data
  const currentPlayersData = useMemo(() => {
    if (selectedYear === "All Time") {
      return calculateAllTimeStats();
    }
    return playerDataByYear[selectedYear as keyof typeof playerDataByYear] || [];
  }, [selectedYear]);

  const filteredPlayers = useMemo(() => {
    return currentPlayersData.filter((player) => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPosition =
        selectedPosition === "All Positions" || player.position === selectedPosition;
      return matchesSearch && matchesPosition;
    });
  }, [currentPlayersData, searchQuery, selectedPosition]);

  const isAllTimeView = selectedYear === "All Time";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header with Logo and Year Selector */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo and Back Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Trophy className="h-7 w-7 text-green-500" />
              <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-2xl font-extrabold text-transparent">
                Astro Stats
              </h1>
            </Link>
          </div>

          {/* Year Selector */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px] border-gray-300 bg-white shadow-sm">
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
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            {isAllTimeView ? (
              <Trophy className="h-8 w-8 text-amber-500" />
            ) : (
              <Users className="h-8 w-8 text-green-500" />
            )}
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-extrabold text-transparent">
              {isAllTimeView ? "All-Time Records" : "All Players"}
            </h1>
          </div>
          <p className="text-gray-600">
            {isAllTimeView
              ? `Career statistics aggregated across all seasons (${Object.keys(playerDataByYear).length} seasons total)`
              : `Browse all ${currentPlayersData.length} players in the Astro league for ${selectedYear}`}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search players by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-gray-300 bg-white pl-10 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* Position Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Position:</span>
            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger className="w-[160px] border-gray-300 bg-white shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    <div className="flex items-center gap-2">
                      <span>{getPositionIcon(position)}</span>
                      {position}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredPlayers.length === currentPlayersData.length
              ? `Showing all ${filteredPlayers.length} ${isAllTimeView ? "career records" : "players"}`
              : `Showing ${filteredPlayers.length} of ${currentPlayersData.length} ${isAllTimeView ? "career records" : "players"}`}
            {searchQuery && (
              <span className="ml-1">
                matching "<span className="font-medium text-gray-900">{searchQuery}</span>"
              </span>
            )}
            {selectedPosition !== "All Positions" && (
              <span className="ml-1">
                in <span className="font-medium text-gray-900">{selectedPosition}</span>
              </span>
            )}
            {isAllTimeView && (
              <span className="ml-1 font-medium text-amber-600">• All-Time View</span>
            )}
          </p>

          {(searchQuery || selectedPosition !== "All Positions") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedPosition("All Positions");
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Players Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPlayers.map((player, index) => (
              <div
                key={player.id}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                }}
              >
                <PlayerCard player={player} isAllTime={isAllTimeView} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 rounded-full bg-gray-100 p-6">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No players found</h3>
            <p className="max-w-md text-center text-gray-600">
              {searchQuery
                ? `No players match "${searchQuery}". Try adjusting your search.`
                : `No players found for the selected position "${selectedPosition}".`}
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setSelectedPosition("All Positions");
              }}
              className="mt-4 text-green-600 hover:text-green-700"
            >
              Clear filters
            </Button>
          </div>
        )}
      </main>

      {/* Add Player Drawer */}
      <AddPlayerDrawer />
    </div>
  );
}
