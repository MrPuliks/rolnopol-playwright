export type CreateOfferRequest = {
  itemType: "field" | "animal";
  itemId: number;
  price: number;
  description: string;
};

export type CreateOfferResponse = {
  id: number;
  itemType: string;
  itemId: number;
  price: number;
  description: string;
};

export type Offer = {
  id: number;
  sellerId: number;
  itemType: "field" | "animal";
  itemId: number;
  price: number;
  description: string;
  status: "active" | "sold" | "cancelled";
  createdAt: string;
  updatedAt: string;
  sellerLabel: string;
};

export type GetOffersResponse = {
  success: boolean;
  data: {
    offers: Offer[];
    total: number;
  };
};
