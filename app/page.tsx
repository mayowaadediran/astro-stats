import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, Target, Shield, AlertTriangle } from "lucide-react";

// Test data based on PRD sample
const testData = {
  goals: [
    { rank: 1, name: "Tomi", value: 9, avatar: "👤" },
    { rank: 2, name: "Kunle", value: 7, avatar: "👤" },
    { rank: 3, name: "Gbaja", value: 6, avatar: "👤" },
    { rank: 4, name: "Debo", value: 5, avatar: "👤" },
    { rank: 5, name: "Uzo", value: 5, avatar: "👤" },
  ],
  assists: [
    { rank: 1, name: "Kunle", value: 3, avatar: "👤" },
    { rank: 2, name: "Tomi", value: 2, avatar: "👤" },
    { rank: 3, name: "Mayowa", value: 2, avatar: "👤" },
    { rank: 4, name: "Gbaja", value: 1, avatar: "👤" },
    { rank: 5, name: "Debo", value: 1, avatar: "👤" },
  ],
  cleanSheets: [
    { rank: 1, name: "Ajegs", value: 2, avatar: "👤" },
    { rank: 2, name: "TBD", value: 0, avatar: "👤" },
  ],
};

function LeaderboardItem({
  rank,
  name,
  value,
  avatar,
}: {
  rank: number;
  name: string;
  value: number;
  avatar: string;
}) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-white";
      case 2:
        return "bg-gray-400 text-white";
      case 3:
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankColor(
            rank
          )}`}
        >
          {rank}
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
          {avatar}
        </div>
        <span className="font-medium text-gray-900">{name}</span>
      </div>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-green-500" />
              <h1 className="text-xl font-bold text-gray-900">League Stats</h1>
            </div>
            <button className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
              <span className="text-2xl">+</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="assists">Assists</TabsTrigger>
            <TabsTrigger value="ga">G/A</TabsTrigger>
            <TabsTrigger value="clean-sheets">Clean Sheets</TabsTrigger>
          </TabsList>

          {/* Goals Tab */}
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">LEADERBOARDS</CardTitle>
                <CardDescription>Top scorers in the league</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {testData.goals.map((player) => (
                    <LeaderboardItem key={player.name} {...player} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assists Tab */}
          <TabsContent value="assists">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">LEADERBOARDS</CardTitle>
                <CardDescription>Top assist providers in the league</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {testData.assists.map((player) => (
                    <LeaderboardItem key={player.name} {...player} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* G/A Tab */}
          <TabsContent value="ga">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">LEADERBOARDS</CardTitle>
                <CardDescription>Top goal contributors (Goals + Assists)</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {testData.goals.map((player) => {
                    const assists =
                      testData.assists.find((a) => a.name === player.name)?.value || 0;
                    return (
                      <LeaderboardItem
                        key={player.name}
                        rank={player.rank}
                        name={player.name}
                        value={player.value + assists}
                        avatar={player.avatar}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clean Sheets Tab */}
          <TabsContent value="clean-sheets">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">LEADERBOARDS</CardTitle>
                <CardDescription>Goalkeepers and defenders with clean sheets</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {testData.cleanSheets.map((player) => (
                    <LeaderboardItem key={player.name} {...player} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Gameweek Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>GAMEWEEK 33</CardTitle>
            <CardDescription>10/08/25</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Tomi</span>
                <span className="ml-auto font-bold text-lg">6</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Kunle</span>
                <span className="ml-auto font-bold text-lg">3</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Ajegs</span>
                <span className="ml-auto font-bold text-lg">2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
