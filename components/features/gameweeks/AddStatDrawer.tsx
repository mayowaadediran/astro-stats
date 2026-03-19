import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Target } from "lucide-react";
import { playerDataByYear } from "@/lib/playerData";

export function AddStatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedGameweek, setSelectedGameweek] = useState("");
  const [selectedStatType, setSelectedStatType] = useState("");
  const [statValue, setStatValue] = useState("");

  // Get current players (using 2025 data as default)
  const currentPlayers = playerDataByYear["2025"];
  const statTypes = [
    { value: "goals", label: "Goals", icon: "⚽" },
    { value: "assists", label: "Assists", icon: "🎯" },
    { value: "cleanSheets", label: "Clean Sheets", icon: "🧤" },
    { value: "yellowCards", label: "Yellow Cards", icon: "🟨" },
    { value: "redCards", label: "Red Cards", icon: "🟥" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlayer || !selectedGameweek || !selectedStatType || !statValue) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Adding stat:", {
        player: selectedPlayer,
        gameweek: selectedGameweek,
        statType: selectedStatType,
        value: parseInt(statValue),
      });

      // Reset form
      setSelectedPlayer("");
      setSelectedGameweek("");
      setSelectedStatType("");
      setStatValue("");
      setIsOpen(false);

      // Show success message (in a real app, you might use a toast notification)
      alert("Stat added successfully!");
    } catch (error) {
      console.error("Error adding stat:", error);
      alert("Failed to add stat. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-green-500/25">
          <Plus className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex max-h-[90vh] flex-col">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex-shrink-0 pb-2">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <Target className="h-5 w-5 text-green-500" />
              Add Game Stat
            </DrawerTitle>
            <DrawerDescription>
              Record a player's performance for a specific gameweek
            </DrawerDescription>
          </DrawerHeader>

          {/* Scrollable Form Content */}
          <div
            className="flex-1 overflow-y-scroll px-4 pb-4"
            style={{ maxHeight: "calc(90vh - 140px)" }}
          >
            <form className="space-y-4 pb-6">
              {/* Player Selection */}
              <div className="space-y-2">
                <Label htmlFor="player">Player *</Label>
                <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentPlayers.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        <div className="flex items-center gap-2">
                          <span>{player.avatar}</span>
                          {player.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Gameweek Selection */}
              <div className="space-y-2">
                <Label htmlFor="gameweek">Gameweek *</Label>
                <Select value={selectedGameweek} onValueChange={setSelectedGameweek}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gameweek" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 1)
                      .reverse()
                      .map((week) => (
                        <SelectItem key={week} value={week.toString()}>
                          Gameweek {week}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stat Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="statType">Stat Type *</Label>
                <Select value={selectedStatType} onValueChange={setSelectedStatType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stat type" />
                  </SelectTrigger>
                  <SelectContent>
                    {statTypes.map((stat) => (
                      <SelectItem key={stat.value} value={stat.value}>
                        <div className="flex items-center gap-2">
                          <span>{stat.icon}</span>
                          {stat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stat Value */}
              <div className="space-y-2">
                <Label htmlFor="statValue">Value *</Label>
                <Input
                  id="statValue"
                  type="number"
                  min="0"
                  max="10"
                  value={statValue}
                  onChange={(e) => setStatValue(e.target.value)}
                  placeholder="Enter stat value (e.g., 2)"
                  className="border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Preview */}
              {selectedPlayer && selectedGameweek && selectedStatType && statValue && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-medium text-gray-900">Preview</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100">
                      <span>
                        {currentPlayers.find((p) => p.id === selectedPlayer)?.avatar || "👤"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {currentPlayers.find((p) => p.id === selectedPlayer)?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {statTypes.find((s) => s.value === selectedStatType)?.icon} {statValue}{" "}
                        {statTypes.find((s) => s.value === selectedStatType)?.label} in Gameweek{" "}
                        {selectedGameweek}
                      </p>
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
              disabled={
                !selectedPlayer ||
                !selectedGameweek ||
                !selectedStatType ||
                !statValue ||
                isSubmitting
              }
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:from-green-600 hover:to-emerald-700"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Adding Stat...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stat
                </>
              )}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
