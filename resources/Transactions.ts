import type { Transaction } from "../src/pages/financialTracking/types/Transactions.types.js";

export const SimpleTransactions = {
  addFunds: {
    type: "income",
    amount: 500.0,
    category: "crops",
    cardNumber: "1234 1234 1234 1234 1234",
    cvv: "123",
    description: "Sold corn",
  },
  removeFunds: {
    type: "expense",
    amount: 300.0,
    category: "equipment",
    description: "New plow",
  },
} satisfies Record<string, Transaction>;
