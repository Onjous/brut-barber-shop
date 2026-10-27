import type { OpeningHours } from "@/content/types";

/**
 * Logika demonstracyjnego kalendarza. Działa wyłącznie w przeglądarce
 * i niczego nie zapisuje. Zajętość terminów jest generowana deterministycznie,
 * żeby siatka godzin wyglądała realistycznie i nie „skakała” między renderami.
 * Przy integracji z prawdziwym systemem (np. Booksy) ten moduł zastępuje
 * zapytanie do API dostawcy.
 */

const WEEKDAYS_SHORT = ["nd", "pn", "wt", "śr", "czw", "pt", "sob"];
const SLOT_STEP_MINUTES = 30;

export type BookingDay = {
  key: string;
  weekday: string;
  label: string;
  closed: boolean;
};

export type TimeSlot = {
  time: string;
  available: boolean;
};

export function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function hoursFor(date: Date, hours: OpeningHours[]) {
  return hours.find((h) => h.days.includes(date.getDay()));
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Kolejne dni, począwszy od jutra względem `todayKey`. */
export function getUpcomingDays(
  todayKey: string,
  count: number,
  hours: OpeningHours[],
): BookingDay[] {
  const start = fromDateKey(todayKey);
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i + 1);
    const day = hoursFor(date, hours);
    return {
      key: toDateKey(date),
      weekday: WEEKDAYS_SHORT[date.getDay()],
      label: `${date.getDate()}.${String(date.getMonth() + 1).padStart(2, "0")}`,
      closed: !day?.open || !day?.close,
    };
  });
}

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export function getTimeSlots(
  dateKey: string,
  duration: number,
  hours: OpeningHours[],
  seed: string,
): TimeSlot[] {
  const day = hoursFor(fromDateKey(dateKey), hours);
  if (!day?.open || !day?.close) return [];

  const open = toMinutes(day.open);
  const close = toMinutes(day.close);
  const slots: TimeSlot[] = [];
  for (let t = open; t + duration <= close; t += SLOT_STEP_MINUTES) {
    const time = toTime(t);
    slots.push({ time, available: hash(`${dateKey}|${seed}|${time}`) > 0.38 });
  }
  return slots;
}

export function formatLongDate(dateKey: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(fromDateKey(dateKey));
}
