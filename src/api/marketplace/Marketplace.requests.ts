import type { APIRequestContext, APIResponse } from "@playwright/test";
import { MarketplaceAPIEndpoints } from "./Marketplace.endpoints.js";
import type { CreateOfferRequest } from "./types/Marketplace.api.types.js";

export class MarketplaceApi {
  constructor(
    private request: APIRequestContext,
    private token: string
  ) {}

  async getOffers(): Promise<APIResponse> {
    return this.request.get(MarketplaceAPIEndpoints.GET_OFFERS, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async createOffer(payload: CreateOfferRequest): Promise<APIResponse> {
    return this.request.post(MarketplaceAPIEndpoints.POST_OFFERS, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: payload,
    });
  }
}
