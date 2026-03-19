import type { EventType, PlayerTotals } from "@/types/domain";

export type TotalsCounter = Record<
  string,
  {
    name: string;
    position?: string | null;
    goals: number;
    assists: number;
    total_ga: number;
    clean_sheets: number;
    yellows: number;
    reds: number;
  }
>;

export type RawEvent = {
  player_id?: string | null;
  player_name?: string | null;
  type: EventType;
  count: number;
  position?: string | null;
};

/**
 * Aggregate raw events into per-player totals.
 */
export function aggregateLeaderboards(raw: RawEvent[]): PlayerTotals[] {
  const totals: TotalsCounter = {};

  for (const ev of raw) {
    if (!ev.player_id || !ev.player_name) continue; // skip OGs if no player
    if (!totals[ev.player_id]) {
      totals[ev.player_id] = {
        name: ev.player_name,
        position: ev.position ?? null,
        goals: 0,
        assists: 0,
        total_ga: 0,
        clean_sheets: 0,
        yellows: 0,
        reds: 0,
      };
    }

    const t = totals[ev.player_id];
    switch (ev.type) {
      case "goal":
        t.goals += ev.count;
        break;
      case "assist":
        t.assists += ev.count;
        break;
      case "clean_sheet":
        t.clean_sheets += ev.count;
        break;
      case "yellow":
        t.yellows += ev.count;
        break;
      case "red":
        t.reds += ev.count;
        break;
      default:
        break;
    }
  }

  const list: PlayerTotals[] = Object.entries(totals).map(([player_id, t]) => ({
    player_id,
    name: t.name,
    position: t.position ?? null,
    goals: t.goals,
    assists: t.assists,
    total_ga: t.goals + t.assists,
    clean_sheets: t.clean_sheets,
    yellows: t.yellows,
    reds: t.reds,
  }));

  return list;
}

/**
 * Pick MVP for a gameweek: highest goals+assists; tie-break by clean sheets, then fewer cards.
 */
export function pickGameweekMVP(totals: PlayerTotals | PlayerTotals[]): PlayerTotals | null {
  const arr = Array.isArray(totals) ? totals : [totals];
  if (arr.length === 0) return null;

  return [...arr].sort((a, b) => {
    const aScore = a.total_ga;
    const bScore = b.total_ga;
    if (bScore !== aScore) return bScore - aScore;
    if (b.clean_sheets !== a.clean_sheets) return b.clean_sheets - a.clean_sheets;
    const aCards = a.yellows + a.reds * 2;
    const bCards = b.yellows + b.reds * 2;
    return aCards - bCards; // fewer cards wins
  })[0];
}
