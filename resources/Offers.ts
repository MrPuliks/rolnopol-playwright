import type { CreateOfferRequest } from "../src/api/marketplace/types/Marketplace.api.types.js";

export const SimpleOffersApi = {
  sellAnimal: {
    itemType: "animal",
    itemId: 2,
    price: 1500,
    description: "For sale",
  },
} satisfies Record<string, CreateOfferRequest>;
