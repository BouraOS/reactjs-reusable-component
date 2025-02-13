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
