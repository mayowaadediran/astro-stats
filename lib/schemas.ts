import { z } from "zod";
import type { EventType } from "@/types/domain";

export const eventTypeSchema = z.enum([
  "goal",
  "assist",
  "clean_sheet",
  "yellow",
  "red",
  "og",
]) as unknown as z.ZodType<EventType>;

export const playerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(100),
  position: z.string().min(1).max(50).nullable().optional(),
});

export const gameweekSchema = z.object({
  id: z.string().uuid().optional(),
  number: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
});

export const eventSchema = z.object({
  id: z.string().uuid().optional(),
  gameweek_id: z.string().uuid(),
  player_id: z.string().uuid().nullable().optional(),
  type: eventTypeSchema,
  count: z.number().int().positive().default(1),
});

export type PlayerInput = z.infer<typeof playerSchema>;
export type GameweekInput = z.infer<typeof gameweekSchema>;
export type EventInput = z.infer<typeof eventSchema>;

/**
 * Batch payloads for admin operations
 */
export const createGameweekPayload = gameweekSchema;
export const createEventsPayload = z.array(eventSchema).min(1);
