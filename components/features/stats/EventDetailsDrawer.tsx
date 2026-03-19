import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Medal } from "lucide-react";
import Link from "next/link";
import { getPositionIcon, getPositionColor, getRankIcon } from "../../../lib/playerUtils";

interface EventDetailsDrawerProps {
  title: string;
  icon: string;
  data: any[];
  isOpen: boolean;
  onClose: () => void;
  selectedYear: string;
}

export function EventDetailsDrawer({
  title,
  icon,
  data,
  isOpen,
  onClose,
  selectedYear,
}: EventDetailsDrawerProps) {
  const getEventDescription = (title: string, selectedYear: string) => {
    const isAllTime = selectedYear === "All Time";
    const yearText = isAllTime ? "across all seasons" : `in ${selectedYear}`;

    switch (title) {
      case "Goals":
        return `Complete ranking of all players by goals scored ${yearText}`;
      case "Assists":
        return `Complete ranking of all players by assists provided ${yearText}`;
      case "Goals + Assists":
        return `Complete ranking of all players by combined goals and assists ${yearText}`;
      case "Clean Sheets":
        return `Complete ranking of all players by clean sheets kept ${yearText}`;
      case "Yellow Cards":
        return `Complete ranking of all players by yellow cards received ${yearText}`;
      case "Red Cards":
        return `Complete ranking of all players by red cards received ${yearText}`;
      default:
        return `Complete player rankings ${yearText}`;
    }
  };

  // Filter out players with 0 values for most categories (except cards which might be meaningful)
  const filteredData = data.filter((player) => {
    if (title.includes("Cards")) {
      return true; // Show all players for cards, including 0s
    }
    return player.value > 0; // Only show players with contributions for other stats
  });

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="flex max-h-[85vh] flex-col">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader className="flex-shrink-0 pb-4">
            <DrawerTitle className="flex items-center gap-2 text-2xl">
              <span className="text-2xl">{icon}</span>
              {title} - Complete Rankings
            </DrawerTitle>
            <DrawerDescription className="text-base">
              {getEventDescription(title, selectedYear)}
            </DrawerDescription>
          </DrawerHeader>

          {/* Scrollable Content */}
          <div
            className="flex-1 overflow-y-scroll px-4 pb-4"
            style={{ maxHeight: "calc(85vh - 120px)" }}
          >
            <div className="space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((player, index) => (
                  <div
                    key={`${title}-${player.id || player.name}-${player.rank}`}
                    className="group flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animation: "fadeInUp 0.4s ease-out forwards",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="flex w-12 items-center justify-center">
                        <span className="text-xl font-bold transition-transform duration-200 group-hover:scale-110">
                          {getRankIcon(player.rank)}
                        </span>
                      </div>

                      {/* Player Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 transition-all duration-200 group-hover:from-green-200 group-hover:to-emerald-200">
                        <span className="text-lg">{player.avatar}</span>
                      </div>

                      {/* Player Info */}
                      <div className="flex flex-col">
                        <Link
                          href={`/players/${player.id || player.name.toLowerCase()}`}
                          className="font-semibold text-gray-900 transition-colors hover:text-green-600"
                        >
                          {player.name}
                        </Link>
                        {player.position && (
                          <div
                            className={`inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium ${getPositionColor(player.position)}`}
                          >
                            <span>{getPositionIcon(player.position)}</span>
                            {player.position}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Value */}
                    <div className="text-right">
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent">
                        {player.value}
                      </span>
                      <div className="text-xs text-gray-500">
                        {title.includes("Cards")
                          ? title.includes("Yellow")
                            ? "yellows"
                            : "reds"
                          : title.toLowerCase()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Medal className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No Data Available</h3>
                  <p className="text-gray-600">
                    No players have recorded any {title.toLowerCase()}{" "}
                    {selectedYear === "All Time" ? "across all seasons" : `in ${selectedYear}`}.
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
