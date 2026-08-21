export function nepalTimeToUTC(value: string) {
  return new Date(`${value}:00+05:45`);
}
export function utcToNepalInput(date: Date | string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(date))
    .replace(",", "")
    .replace(" ", "T");
}

export function formatNepalDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-NP", {
    timeZone: "Asia/Kathmandu",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function DateOnly(date: Date | string) {
  return new Intl.DateTimeFormat("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function TimeOnly(date: Date | string) {
  return new Intl.DateTimeFormat("en-NP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
