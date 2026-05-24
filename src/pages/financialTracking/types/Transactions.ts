export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "general"
  | "equipment"
  | "livestock"
  | "crops"
  | "maintainance"
  | "transfer"
  | "system";

export type Transaction = {
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  cardNumber?: string;
  cvv?: string;
  description: string;
};
