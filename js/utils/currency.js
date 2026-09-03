/**
 * LarHub Currency Utilities
 */
const randFormatter = new Intl.NumberFormat(
  "en-ZA",
  {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }
);

export function formatCurrency(value) {
  if (!Number.isFinite(value)) {
    return "";
  }

  return randFormatter.format(value);
}

export function formatPropertyPrice(
  value,
  period
) {
  const price = formatCurrency(value);

  if (!price) {
    return "";
  }

  if (period === "month") {
    return `${price} / month`;
  }

  return price;
}
