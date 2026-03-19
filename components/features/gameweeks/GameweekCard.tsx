import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import { Gameweek, GameweekEvent } from "@/lib/gameweekData";

interface GameweekCardProps {
  gameweek: Gameweek;
  onEventClick: (event: GameweekEvent, gameweek: Gameweek) => void;
}

export function GameweekCard({ gameweek, onEventClick }: GameweekCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 transition-opacity duration-300 hover:opacity-100" />
      <CardHeader className="relative pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Gameweek {gameweek.week}</h3>
              <p className="text-sm text-gray-600">{gameweek.date}</p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative pt-0">
        <div className="space-y-3">
          {gameweek.events.map((event, index) => (
            <div
              key={event.type}
              onClick={() => onEventClick(event, gameweek)}
              className="group flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-200 hover:border-green-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:shadow-md"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideIn 0.5s ease-out forwards",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">
                  {event.icon}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 transition-colors group-hover:text-green-700">
                    {event.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {event.count} {event.count === 1 ? "contribution" : "contributions"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-xl font-bold text-transparent">
                  {event.count}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-green-600" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
