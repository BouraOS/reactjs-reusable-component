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

export const groupBy = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};