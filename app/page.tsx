"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import Link from "next/link";

// Layout components
import { TopNavigation, PageLayout, PageContent, PageHeader } from "@/components/layout";

// Feature components
import { StatsGrid, EventDetailsDrawer } from "@/components/features/stats";
import { generateLeaderboards } from "@/lib/playerUtils";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    icon: string;
    data: any[];
  } | null>(null);

  // Generate leaderboards for the selected year
  const leaderboards = useMemo(() => {
    return generateLeaderboards(selectedYear);
  }, [selectedYear]);

  const handleEventClick = (title: string, icon: string, data: any[]) => {
    setSelectedEvent({ title, icon, data });
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <PageLayout>
      <TopNavigation
        title="Astro Stats"
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <PageContent>
        <div className="mb-8 flex items-center gap-2">
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

        <PageHeader title="Top Stats" description={`League standings for ${selectedYear}`} />
        <StatsGrid leaderboards={leaderboards} onEventClick={handleEventClick} />
      </PageContent>

      {/* Event Details Drawer */}
      {selectedEvent && (
        <EventDetailsDrawer
          title={selectedEvent.title}
          icon={selectedEvent.icon}
          data={selectedEvent.data}
          isOpen={!!selectedEvent}
          onClose={closeEventDetails}
          selectedYear={selectedYear}
        />
      )}
    </PageLayout>
  );
}
