export function sortByProperty<T>(
  array: T[],
  property: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[property];
    const bValue = b[property];

    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return direction === "asc" ? 1 : -1;
    }

    return 0;
  });
}

export function removeDuplicates<T>(items: T[]): T[] {
  const uniqueItems = new Set<T>(items);
  return Array.from(uniqueItems);
}
