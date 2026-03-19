import { describe, it, expect } from "vitest";
import { aggregateLeaderboards, pickGameweekMVP, type RawEvent } from "@/lib/aggregation";

describe("aggregateLeaderboards", () => {
  it("aggregates goals/assists and computes total_ga", () => {
    const raw: RawEvent[] = [
      { player_id: "p1", player_name: "Tomi", type: "goal", count: 2 },
      { player_id: "p1", player_name: "Tomi", type: "assist", count: 1 },
      { player_id: "p2", player_name: "Kunle", type: "goal", count: 1 },
      { player_id: "p2", player_name: "Kunle", type: "clean_sheet", count: 1 },
    ];

    const totals = aggregateLeaderboards(raw);
    const tomi = totals.find((t) => t.player_id === "p1")!;
    const kunle = totals.find((t) => t.player_id === "p2")!;

    expect(tomi.goals).toBe(2);
    expect(tomi.assists).toBe(1);
    expect(tomi.total_ga).toBe(3);
    expect(kunle.clean_sheets).toBe(1);
  });
});

describe("pickGameweekMVP", () => {
  it("picks highest total_ga, tie-break with clean sheets, then fewer cards", () => {
    const totals = [
      {
        player_id: "a",
        name: "A",
        goals: 1,
        assists: 1,
        total_ga: 2,
        clean_sheets: 0,
        yellows: 1,
        reds: 0,
        position: null,
      },
      {
        player_id: "b",
        name: "B",
        goals: 2,
        assists: 0,
        total_ga: 2,
        clean_sheets: 1,
        yellows: 2,
        reds: 0,
        position: null,
      },
      {
        player_id: "c",
        name: "C",
        goals: 1,
        assists: 0,
        total_ga: 1,
        clean_sheets: 2,
        yellows: 0,
        reds: 0,
        position: null,
      },
    ];
    const mvp = pickGameweekMVP(totals)!;
    expect(mvp.player_id).toBe("b");
  });
});
