/** Parse value from UI ("2137,00") to number ("2137.00")  */
export function parseMoneyToNumber(value: string): number {
  return Number(value.replace(",", "."));
}

/** Parse money from number to string. Inputs accept both ',' and '.' so replace is not required. */
export function parseMoneyToString(value: number): string {
  return String(value);
}

/** Remove currency ROL from UI value. */
export function removeCurrency(value: string): string {
  return value.replace(/\sROL$/, "");
}
