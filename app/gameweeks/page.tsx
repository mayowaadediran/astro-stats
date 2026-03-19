"use client";

import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";

// Layout components
import { TopNavigation, PageLayout, PageContent, PageHeader } from "@/components/layout";

// Feature components
import { GameweekCard, GameweekEventDrawer, AddStatDrawer } from "@/components/features/gameweeks";
import { gameweekDataByYear, GameweekEvent, Gameweek } from "@/lib/gameweekData";

export default function GameweeksPage() {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedEvent, setSelectedEvent] = useState<{
    event: GameweekEvent;
    gameweek: Gameweek;
  } | null>(null);

  const handleEventClick = (event: GameweekEvent, gameweek: Gameweek) => {
    setSelectedEvent({ event, gameweek });
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  // Filter gameweeks by selected year (fallback to showing all if data has no year)
  const filteredGameweeks = useMemo(() => {
    if (selectedYear === "All Time") {
      // Flatten all years
      return Object.values(gameweekDataByYear).flat();
    }
    return gameweekDataByYear[selectedYear] || [];
  }, [selectedYear]);

  return (
    <PageLayout>
      <TopNavigation
        title="Astro Stats"
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        showBackButton
        backHref="/"
      />

      <PageContent>
        <PageHeader
          title="Game Week Stats"
          description="Track player performance across all gameweeks"
          icon={<Calendar className="h-8 w-8 text-green-500" />}
        />

        {/* Gameweeks Grid */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredGameweeks.map((gameweek, index) => (
            <div
              key={gameweek.week}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
              }}
            >
              <GameweekCard gameweek={gameweek} onEventClick={handleEventClick} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGameweeks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 rounded-full bg-gray-100 p-6">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No gameweeks yet</h3>
            <p className="text-center text-gray-600">
              Gameweek statistics will appear here as the season progresses.
            </p>
          </div>
        )}
      </PageContent>

      {/* Event Details Drawer */}
      {selectedEvent && (
        <GameweekEventDrawer
          event={selectedEvent.event}
          gameweek={selectedEvent.gameweek}
          isOpen={!!selectedEvent}
          onClose={closeEventDetails}
        />
      )}

      {/* Add Stat Drawer */}
      <AddStatDrawer />
    </PageLayout>
  );
}
