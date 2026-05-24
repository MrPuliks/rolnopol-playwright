import type { UserCredentials } from "../src/pages/authentication/types/UserCredentials.types.js";

/** Preexisting users test data. */
export const ExistingUsers = {
  demo: {
    email: "demo@example.com",
    password: "demo123",
  },

  test: {
    email: "test@example.com",
    password: "brownPass123",
  },

  developer: {
    email: "developer@example.com",
    password: "dev123456",
  },
} satisfies Record<string, UserCredentials>;

/** Incorrect users test data. */
export const IncorrectUsers = {
  incorrectEmail: {
    email: "demo",
    password: "demo123",
  },

  incorrectPassword: {
    email: "demo@example.com",
    password: "brownPass123",
  },
} satisfies Record<string, UserCredentials>;
