export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(value: number) {
  return `${value}\u00a0zł`;
}

export function formatDuration(minutes: number) {
  return `${minutes}\u00a0min`;
}

/** Dwucyfrowy numer porządkowy, np. 1 → "01". */
export function pad(index: number) {
  return String(index).padStart(2, "0");
}
