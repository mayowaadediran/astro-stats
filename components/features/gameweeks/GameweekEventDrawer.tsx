import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { GameweekEvent, Gameweek } from "@/lib/gameweekData";
import { getPositionIcon, getPositionColor } from "@/lib/playerUtils";
import { playerDataByYear } from "@/lib/playerData";

interface GameweekEventDrawerProps {
  event: GameweekEvent | null;
  gameweek: Gameweek | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GameweekEventDrawer({
  event,
  gameweek,
  isOpen,
  onClose,
}: GameweekEventDrawerProps) {
  if (!event || !gameweek) return null;

  // Helper function to parse contributions from either structured data or bracket format
  const getContributions = (event: GameweekEvent) => {
    if (event.contributions && event.contributions.length > 0) {
      return event.contributions;
    }

    // Fallback: parse from bracket format in players array
    return event.players
      .map((playerString, index) => {
        const match = playerString.match(/^(.+?)\s*\((\d+)\)$/);
        if (match) {
          const [, name, count] = match;
          return {
            playerId: name.toLowerCase().replace(/\s+/g, ""),
            playerName: name.trim(),
            avatar: "👤",
            count: parseInt(count, 10),
          };
        }

        // Handle players without brackets (e.g., clean sheets)
        return {
          playerId: playerString.toLowerCase().replace(/\s+/g, ""),
          playerName: playerString.trim(),
          avatar: "👤",
          count: 1,
        };
      })
      .filter((contribution) => contribution.count > 0);
  };

  const contributions = getContributions(event);

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="flex max-h-[85vh] flex-col">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader className="flex-shrink-0 pb-4">
            <DrawerTitle className="flex items-center gap-2 text-2xl">
              <span className="text-2xl">{event.icon}</span>
              {event.type} - Gameweek {gameweek.week}
            </DrawerTitle>
            <DrawerDescription className="text-base">
              Player contributions for {event.type.toLowerCase()} in Gameweek {gameweek.week} (
              {gameweek.date})
            </DrawerDescription>
          </DrawerHeader>

          {/* Scrollable Content */}
          <div
            className="flex-1 overflow-y-scroll px-4 pb-4"
            style={{ maxHeight: "calc(85vh - 120px)" }}
          >
            <div className="space-y-3">
              {contributions && contributions.length > 0 ? (
                contributions
                  .sort((a, b) => b.count - a.count) // Sort by contribution count (highest first)
                  .map((contribution, index) => {
                    // Get player position from playerDataByYear
                    const playerData = playerDataByYear["2025"]?.find(
                      (p) => p.id === contribution.playerId
                    );
                    const position = playerData?.position;

                    return (
                      <div
                        key={`${event.type}-${contribution.playerId}-${index}`}
                        className="group flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
                        style={{
                          animationDelay: `${index * 30}ms`,
                          animation: "fadeInUp 0.4s ease-out forwards",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          {/* Rank Badge */}
                          <div className="flex w-8 items-center justify-center">
                            <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                          </div>

                          {/* Player Avatar */}
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 transition-all duration-200 group-hover:from-green-200 group-hover:to-emerald-200">
                            <span className="text-lg">{contribution.avatar}</span>
                          </div>

                          {/* Player Info */}
                          <div className="flex flex-col">
                            <Link
                              href={`/players/${contribution.playerId}`}
                              className="font-semibold text-gray-900 transition-colors hover:text-green-600"
                            >
                              {contribution.playerName}
                            </Link>
                            <div className="flex items-center gap-2">
                              {position && (
                                <div
                                  className={`inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium ${getPositionColor(position)}`}
                                >
                                  <span>{getPositionIcon(position)}</span>
                                  {position}
                                </div>
                              )}
                              <span className="text-xs text-gray-500">
                                Gameweek {gameweek.week}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Contribution Count and Icon */}
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent">
                              {contribution.count}
                            </span>
                            <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
                              {event.icon}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {contribution.count === 1
                              ? event.type.slice(0, -1).toLowerCase() // Remove 's' for singular
                              : event.type.toLowerCase()}
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No Contributions</h3>
                  <p className="text-gray-600">
                    No players recorded any {event.type.toLowerCase()} in Gameweek {gameweek.week}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
