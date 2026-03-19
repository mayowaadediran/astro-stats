import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getRankIcon } from "../../../lib/playerUtils";

interface StatCardProps {
  title: string;
  icon: string;
  data: Array<{ rank: number; name: string; value: number; avatar: string }>;
  onClick?: () => void;
}

export function StatCard({ title, icon, data, onClick }: StatCardProps) {
  return (
    <div onClick={onClick} className={`group w-full ${onClick ? "cursor-pointer" : ""}`}>
      <Card className="w-full overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CardHeader className="relative pb-3">
          <CardTitle className="flex items-center justify-between text-base font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl">{icon}</span>
              {title}
            </div>
            {onClick && (
              <ChevronRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-green-600" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative pt-0">
          <div className="space-y-4">
            {data.map((player, index) => (
              <div
                key={`${title}-${player.rank}`}
                className="group/item flex items-center justify-between transition-all duration-200 hover:pl-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-lg transition-transform duration-200 group-hover/item:scale-110">
                    {getRankIcon(player.rank)}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 transition-all duration-200 group-hover/item:from-green-200 group-hover/item:to-emerald-200">
                    <span className="text-sm">{player.avatar}</span>
                  </div>
                  <Link
                    href={`/players/${player.name.toLowerCase()}`}
                    className="cursor-pointer font-medium text-gray-900 transition-colors hover:text-green-600"
                  >
                    {player.name}
                  </Link>
                </div>
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-xl font-bold text-transparent">
                  {player.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
