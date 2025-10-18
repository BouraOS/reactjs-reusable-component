function formatTime(date: Date | string, format: string = "HH:mm:ss"): string {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }

  const hours: string = String(parsedDate.getHours()).padStart(2, "0");
  const minutes: string = String(parsedDate.getMinutes()).padStart(2, "0");
  const seconds: string = String(parsedDate.getSeconds()).padStart(2, "0");

  return format
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

export { formatTime };

export function convertMinutesToTime(minutes: number): {
  days: number;
  hours: number;
  minutes: number;
} {
  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const remainingMinutes = minutes % 60;

  return {
    days,
    hours,
    minutes: remainingMinutes,
  };
}

export function formatMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60); // Calcul du nombre d'heures
  const remainingMinutes = minutes % 60; // Calcul des minutes restantes
  return `${hours}h ${remainingMinutes}m`;
}
