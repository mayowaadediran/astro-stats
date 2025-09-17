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
  ArrowLeft,
  Calendar,
  Target,
  TrendingUp,
  Shield,
  AlertTriangle,
  Award,
  ChevronRight,
  Users,
  Plus,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";

// Test data for gameweeks
const gameweekData = {
  "33": {
    number: 33,
    date: "10/08/25",
    events: [
      { type: "goal", player: "Tomi", count: 6, icon: "⚽" },
      { type: "assist", player: "Kunle", count: 3, icon: "🎯" },
      { type: "clean_sheet", player: "Ajegs", count: 2, icon: "🧤" },
      { type: "yellow", player: "Debo", count: 1, icon: "🟨" },
      { type: "red", player: "Uzo", count: 1, icon: "🟥" },
    ],
    mvp: { player: "Tomi", reason: "6 goals", total: 6 },
    detailedEvents: {
      goal: [
        { player: "Tomi", count: 6, time: "15', 32', 45', 67', 78', 89'" },
        { player: "Kunle", count: 2, time: "23', 56'" },
        { player: "Mayowa", count: 1, time: "71'" },
      ],
      assist: [
        { player: "Kunle", count: 3, time: "15', 45', 78'" },
        { player: "Tomi", count: 1, time: "23'" },
        { player: "Debo", count: 1, time: "67'" },
      ],
      clean_sheet: [
        { player: "Ajegs", count: 2, time: "Full time (2 games)" },
        { player: "Segun", count: 1, time: "Full time" },
      ],
      yellow: [
        { player: "Debo", count: 1, time: "34'" },
        { player: "Mayowa", count: 1, time: "67'" },
        { player: "Uzo", count: 1, time: "82'" },
      ],
      red: [{ player: "Uzo", count: 1, time: "85'" }],
    },
  },
  "32": {
    number: 32,
    date: "03/08/25",
    events: [
      { type: "goal", player: "Kunle", count: 4, icon: "⚽" },
      { type: "assist", player: "Tomi", count: 2, icon: "🎯" },
      { type: "clean_sheet", player: "Segun", count: 1, icon: "🧤" },
      { type: "yellow", player: "Mayowa", count: 2, icon: "🟨" },
    ],
    mvp: { player: "Kunle", reason: "4 goals", total: 4 },
    detailedEvents: {
      goal: [
        { player: "Kunle", count: 4, time: "12', 28', 55', 73'" },
        { player: "Tomi", count: 1, time: "41'" },
      ],
      assist: [
        { player: "Tomi", count: 2, time: "12', 55'" },
        { player: "Mayowa", count: 1, time: "28'" },
      ],
      clean_sheet: [{ player: "Segun", count: 1, time: "Full time" }],
      yellow: [
        { player: "Mayowa", count: 2, time: "34', 67'" },
        { player: "Debo", count: 1, time: "78'" },
      ],
    },
  },
  "31": {
    number: 31,
    date: "27/07/25",
    events: [
      { type: "goal", player: "Gbaja", count: 3, icon: "⚽" },
      { type: "assist", player: "Mayowa", count: 2, icon: "🎯" },
      { type: "clean_sheet", player: "Tobi", count: 1, icon: "🧤" },
      { type: "yellow", player: "Uzo", count: 1, icon: "🟨" },
    ],
    mvp: { player: "Gbaja", reason: "3 goals", total: 3 },
    detailedEvents: {
      goal: [
        { player: "Gbaja", count: 3, time: "19', 44', 68'" },
        { player: "Kunle", count: 1, time: "52'" },
      ],
      assist: [
        { player: "Mayowa", count: 2, time: "19', 68'" },
        { player: "Tomi", count: 1, time: "44'" },
      ],
      clean_sheet: [{ player: "Tobi", count: 1, time: "Full time" }],
      yellow: [
        { player: "Uzo", count: 1, time: "61'" },
        { player: "Debo", count: 1, time: "83'" },
      ],
    },
  },
};

const gameweekNumbers = Object.keys(gameweekData)
  .map(Number)
  .sort((a, b) => b - a);

// Players data for the add stat form
const playersData = ["Tomi", "Kunle", "Gbaja", "Debo", "Uzo", "Ajegs", "Segun", "Mayowa", "Tobi"];

const eventTypes = [
  { value: "goal", label: "Goal", icon: "⚽", color: "from-green-500 to-emerald-600" },
  { value: "assist", label: "Assist", icon: "🎯", color: "from-blue-500 to-cyan-600" },
  {
    value: "clean_sheet",
    label: "Clean Sheet",
    icon: "🧤",
    color: "from-purple-500 to-violet-600",
  },
  { value: "yellow", label: "Yellow Card", icon: "🟨", color: "from-yellow-500 to-amber-600" },
  { value: "red", label: "Red Card", icon: "🟥", color: "from-red-500 to-rose-600" },
  { value: "own_goal", label: "Own Goal", icon: "⚽", color: "from-gray-500 to-slate-600" },
];

function EventItem({ event, gameweekData }: { event: any; gameweekData: any }) {
  const getEventColor = (type: string) => {
    switch (type) {
      case "goal":
        return "from-green-500 to-emerald-600";
      case "assist":
        return "from-blue-500 to-cyan-600";
      case "clean_sheet":
        return "from-purple-500 to-violet-600";
      case "yellow":
        return "from-yellow-500 to-amber-600";
      case "red":
        return "from-red-500 to-rose-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  const getEventTitle = (type: string) => {
    switch (type) {
      case "goal":
        return "Goals";
      case "assist":
        return "Assists";
      case "clean_sheet":
        return "Clean Sheets";
      case "yellow":
        return "Yellow Cards";
      case "red":
        return "Red Cards";
      default:
        return type.replace("_", " ");
    }
  };

  const detailedEvents = gameweekData.detailedEvents?.[event.type] || [];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="group flex cursor-pointer items-center justify-between rounded-lg bg-white/80 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${getEventColor(event.type)} text-white shadow-lg`}
            >
              <span className="text-lg">{event.icon}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{event.player}</p>
              <p className="text-sm capitalize text-gray-600">{event.type.replace("_", " ")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-2xl font-bold text-transparent">
              {event.count}
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-600" />
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <span className="text-2xl">{event.icon}</span>
              {getEventTitle(event.type)} - Gameweek {gameweekData.number}
            </DrawerTitle>
            <DrawerDescription>
              Detailed breakdown of all {getEventTitle(event.type).toLowerCase()} for this gameweek
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[50vh] space-y-4 overflow-y-scroll px-4 pb-4">
            {detailedEvents.length > 0 ? (
              detailedEvents.map((detail: any, index: number) => (
                <div
                  key={`${detail.player}-${index}`}
                  className="group flex items-center justify-between rounded-lg bg-gray-50/50 p-4 transition-all duration-200 hover:bg-gray-100/50"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.5s ease-out forwards",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-sm font-medium">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{detail.player}</p>
                      <p className="text-sm text-gray-600">{detail.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-xl font-bold text-transparent">
                      {detail.count}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="text-gray-600">No detailed data available for this event type.</p>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function MVPBadge({ mvp }: { mvp: any }) {
  return (
    <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-amber-800">
          <Award className="h-5 w-5" />
          MVP of the Week
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-amber-900">{mvp.player}</p>
              <p className="text-sm text-amber-700">{mvp.reason}</p>
            </div>
          </div>
          <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-3xl font-bold text-transparent">
            {mvp.total}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function AddStatDrawer({ currentGameweek }: { currentGameweek: any }) {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [eventCount, setEventCount] = useState("1");
  const [eventTime, setEventTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlayer || !selectedEventType) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setSelectedPlayer("");
    setSelectedEventType("");
    setEventCount("1");
    setEventTime("");
    setIsSubmitting(false);

    // In a real app, this would update the data and close the drawer
    console.log("Stat added:", {
      player: selectedPlayer,
      gameweek: currentGameweek.number,
      eventType: selectedEventType,
      count: eventCount,
      time: eventTime,
    });
  };

  const selectedEvent = eventTypes.find((event) => event.value === selectedEventType);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-green-500/25">
          <Plus className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex max-h-[90vh] flex-col">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex-shrink-0 pb-2">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-5 w-5 text-green-500" />
              Add Stat - Gameweek {currentGameweek.number}
            </DrawerTitle>
            <DrawerDescription>
              Add a new stat entry for a player in gameweek {currentGameweek.number}
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
                <Label htmlFor="player">Player</Label>
                <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a player" />
                  </SelectTrigger>
                  <SelectContent>
                    {playersData.map((player) => (
                      <SelectItem key={player} value={player}>
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          {player}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Event Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((event) => (
                      <SelectItem key={event.value} value={event.value}>
                        <div className="flex items-center gap-2">
                          <span>{event.icon}</span>
                          {event.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Event Count */}
              <div className="space-y-2">
                <Label htmlFor="count">Count</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="10"
                  value={eventCount}
                  onChange={(e) => setEventCount(e.target.value)}
                  placeholder="Number of events"
                />
              </div>

              {/* Event Time (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="time">Time (Optional)</Label>
                <Input
                  id="time"
                  type="text"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="e.g., 15', 32', 45'"
                />
              </div>

              {/* Preview */}
              {selectedPlayer && selectedEventType && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-medium text-gray-900">Preview</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedEvent && (
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${selectedEvent.color} text-white shadow-sm`}
                        >
                          <span className="text-sm">{selectedEvent.icon}</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{selectedPlayer}</p>
                        <p className="text-sm text-gray-600">
                          {selectedEvent?.label} {eventTime && `• ${eventTime}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-green-600">{eventCount}</span>
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
              disabled={!selectedPlayer || !selectedEventType || isSubmitting}
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
                  Add Stat to GW {currentGameweek.number}
                </>
              )}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function GameweeksPage() {
  const [selectedGameweek, setSelectedGameweek] = useState("33");
  const currentGameweek = gameweekData[selectedGameweek as keyof typeof gameweekData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Back Button and Logo */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
            </div>

            {/* Gameweek Selector */}
            <Select value={selectedGameweek} onValueChange={setSelectedGameweek}>
              <SelectTrigger className="w-[140px] border-gray-300 bg-white shadow-sm">
                <SelectValue placeholder="Select gameweek" />
              </SelectTrigger>
              <SelectContent>
                {gameweekNumbers.map((week) => (
                  <SelectItem key={week} value={week.toString()}>
                    Gameweek {week}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Gameweek Header */}
        <div className="mb-8 text-center">
          <h2 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-extrabold text-transparent">
            Gameweek {currentGameweek.number}
          </h2>
          <p className="mt-2 text-lg text-gray-600">{currentGameweek.date}</p>
        </div>

        {/* MVP Section */}
        <div className="mb-8">
          <MVPBadge mvp={currentGameweek.mvp} />
        </div>

        {/* Events Section */}
        <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Calendar className="h-5 w-5" />
              Week Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentGameweek.events.map((event, index) => (
                <div
                  key={`${event.type}-${event.player}-${index}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.5s ease-out forwards",
                  }}
                >
                  <EventItem event={event} gameweekData={currentGameweek} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Summary */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white/80 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-600">
              {currentGameweek.events
                .filter((e) => e.type === "goal")
                .reduce((sum, e) => sum + e.count, 0)}
            </div>
            <div className="text-sm text-gray-600">Goals</div>
          </div>
          <div className="rounded-xl bg-white/80 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-600">
              {currentGameweek.events
                .filter((e) => e.type === "assist")
                .reduce((sum, e) => sum + e.count, 0)}
            </div>
            <div className="text-sm text-gray-600">Assists</div>
          </div>
          <div className="rounded-xl bg-white/80 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-purple-600">
              {currentGameweek.events
                .filter((e) => e.type === "clean_sheet")
                .reduce((sum, e) => sum + e.count, 0)}
            </div>
            <div className="text-sm text-gray-600">Clean Sheets</div>
          </div>
          <div className="rounded-xl bg-white/80 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {currentGameweek.events
                .filter((e) => e.type === "yellow")
                .reduce((sum, e) => sum + e.count, 0)}
            </div>
            <div className="text-sm text-gray-600">Yellow Cards</div>
          </div>
        </div>
      </main>

      {/* Add Stat Drawer */}
      <AddStatDrawer currentGameweek={currentGameweek} />
    </div>
  );
}
