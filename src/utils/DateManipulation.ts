function formatDate(
  date: Date | string,
  format: string = "YYYY-MM-DD"
): string {
  // Parse the input into a Date object
  const parsedDate = new Date(date);

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }

  // Extract components from the Date object
  const year: string = String(parsedDate.getFullYear());
  const month: string = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day: string = String(parsedDate.getDate()).padStart(2, "0");

  // Replace the placeholders in the format string with actual date values
  return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
}

// Example Usage:
/*
  const formattedDate1 = formatDate(new Date(), "DD/MM/YYYY");
  const formattedDate2 = formatDate(new Date(), "YYYY-MM-DD");
  const formattedDate3 = formatDate(new Date(), "DD-MM-YYYY");
  const formattedDate4 = formatDate("2024-10-21");

  console.log(formattedDate1); // Outputs: "21/10/2024"
  console.log(formattedDate2); // Outputs: "2024-10-21"
  console.log(formattedDate3); // Outputs: "21-10-2024"
  console.log(formattedDate4); // Outputs: "2024-10-21"
*/

export { formatDate };
