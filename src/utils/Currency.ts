export const formatCurrency = (
  number: number,
  locale: string,
  currency: string
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  return formatter.format(number);
};

// Example usage:
/*
const formattedUSDollar = formatCurrency(1234.56, 'en-US', 'USD');
console.log(formattedUSDollar); // Output: "$1,234.56"

const formattedPounds = formatCurrency(1234.56, 'en-GB', 'GBP');
console.log(formattedPounds); // Output: "£1,234.56"

const formattedRupee = formatCurrency(1234.56, 'en-IN', 'INR');
console.log(formattedRupee); // Output: "₹1,234.56"

const formattedEuro = formatCurrency(1234.56, 'en-DE', 'EUR');
console.log(formattedEuro); // Output: "€1.234,56"
*/
