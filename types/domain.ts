/**
 * Domain types shared across client and server.
 */

export type EventType = "goal" | "assist" | "clean_sheet" | "yellow" | "red" | "og";

export type Position = "Forward" | "Midfielder" | "Defender" | "Goalkeeper" | string;

export interface Player {
  id: string;
  name: string;
  position?: Position | null;
  created_at?: string;
}

export interface Gameweek {
  id?: string;
  number: number;
  date: string; // ISO date
  created_at?: string;
}

export interface Event {
  id?: string;
  gameweek_id: string;
  player_id?: string | null; // nullable for OG
  type: EventType;
  count: number; // > 0
  created_by?: string | null;
  created_at?: string;
}

export interface PlayerTotals {
  player_id: string;
  name: string;
  position?: Position | null;
  goals: number;
  assists: number;
  total_ga: number; // goals + assists
  clean_sheets: number;
  yellows: number;
  reds: number;
}

export interface GameweekBreakdownItem {
  gameweek_number: number;
  date: string;
  player_id?: string | null;
  player_name?: string | null;
  type: EventType;
  count: number;
}
