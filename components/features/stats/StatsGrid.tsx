import { StatCard } from "./StatCard";

interface StatsGridProps {
  leaderboards: {
    goals: any[];
    assists: any[];
    goalsAssists: any[];
    cleanSheets: any[];
    yellowCards: any[];
    redCards: any[];
  };
  onEventClick: (title: string, icon: string, data: any[]) => void;
}

export function StatsGrid({ leaderboards, onEventClick }: StatsGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Goals"
        icon="⚽"
        data={leaderboards.goals.slice(0, 3)}
        onClick={() => onEventClick("Goals", "⚽", leaderboards.goals)}
      />
      <StatCard
        title="Assists"
        icon="🎯"
        data={leaderboards.assists.slice(0, 3)}
        onClick={() => onEventClick("Assists", "🎯", leaderboards.assists)}
      />
      <StatCard
        title="Goals + Assists"
        icon="📊"
        data={leaderboards.goalsAssists.slice(0, 3)}
        onClick={() => onEventClick("Goals + Assists", "📊", leaderboards.goalsAssists)}
      />
      <StatCard
        title="Clean Sheets"
        icon="🧤"
        data={leaderboards.cleanSheets.slice(0, 3)}
        onClick={() => onEventClick("Clean Sheets", "🧤", leaderboards.cleanSheets)}
      />
      <StatCard
        title="Yellow Cards"
        icon="🟨"
        data={leaderboards.yellowCards.slice(0, 3)}
        onClick={() => onEventClick("Yellow Cards", "🟨", leaderboards.yellowCards)}
      />
      <StatCard
        title="Red Cards"
        icon="🟥"
        data={leaderboards.redCards.slice(0, 3)}
        onClick={() => onEventClick("Red Cards", "🟥", leaderboards.redCards)}
      />
    </div>
  );
}
