"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Users } from "lucide-react";

// Layout components
import { TopNavigation, PageLayout, PageContent, PageHeader } from "@/components/layout";

// Feature components
import { PlayerCard, PlayerSearchAndFilter, AddPlayerDrawer } from "@/components/features/players";
import { playerDataByYear } from "@/lib/playerData";
import { calculateAllTimeStats } from "@/lib/playerUtils";

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

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedPosition("All Positions");
  };

  const showClearFilters = Boolean(searchQuery || selectedPosition !== "All Positions");

  return (
    <PageLayout>
      <TopNavigation
        title="Astro Stats"
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        showBackButton={true}
        backHref="/"
      />

      <PageContent>
        <PageHeader
          title={isAllTimeView ? "All-Time Records" : "All Players"}
          description={
            isAllTimeView
              ? `Career statistics aggregated across all seasons (${Object.keys(playerDataByYear).length} seasons total)`
              : `Browse all ${currentPlayersData.length} players in the Astro league for ${selectedYear}`
          }
          icon={
            isAllTimeView ? (
              <Trophy className="h-8 w-8 text-amber-500" />
            ) : (
              <Users className="h-8 w-8 text-green-500" />
            )
          }
        />

        {/* Search and Filter Controls */}
        <PlayerSearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPosition={selectedPosition}
          onPositionChange={setSelectedPosition}
          onClearFilters={handleClearFilters}
          showClearFilters={showClearFilters}
        />

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

          {showClearFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
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
              onClick={handleClearFilters}
              className="mt-4 text-green-600 hover:text-green-700"
            >
              Clear filters
            </Button>
          </div>
        )}
      </PageContent>

      {/* Add Player Drawer */}
      <AddPlayerDrawer />
    </PageLayout>
  );
}
