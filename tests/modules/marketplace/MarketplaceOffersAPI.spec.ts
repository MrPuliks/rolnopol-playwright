import { test, expect } from "@playwright/test";
import type { GetOffersResponse } from "../../../src/api/marketplace/types/Marketplace.api.types.js";
import { ExistingUsers } from "../../../resources/Users.js";
import { AuthenticationApi } from "../../../src/api/authentication/Authentication.requests.js";
import { MarketplaceApi } from "../../../src/api/marketplace/Marketplace.requests.js";
import { SimpleOffersApi } from "../../../resources/Offers.js";

let marketplaceApi: MarketplaceApi;

test.describe("Marketplace API", () => {
  test.beforeEach(async ({ request }) => {
    const authenticationApi = new AuthenticationApi(request, ExistingUsers.demo);
    const token = await authenticationApi.getUserAccessToken();

    marketplaceApi = new MarketplaceApi(request, token);
  });

  test("GET Get all marketplace offers", async ({}) => {
    const response = await marketplaceApi.getOffers();

    expect.soft(response.status(), "Incorrect response status").toBe(200);

    const body = (await response.json()) as GetOffersResponse;

    console.log(body);
    expect.soft(body.success, "Body is missing").toBeTruthy();
  });

  test("POST Create new marketplace offer", async ({}) => {
    const response = await marketplaceApi.createOffer(SimpleOffersApi.sellAnimal);

    expect.soft(response.status(), "Incorrect response status").toBe(200);

    const body = (await response.json()) as GetOffersResponse;
    console.log(body);
    expect.soft(body.success, "Body is missing").toBeTruthy();
    expect.soft(body.data.offers[0]?.sellerId, "Incorrect seller ID").toBe(1);
    expect.soft(body.data.offers[0]?.status, "Incorrect status").toBe("active");
    expect.soft(body.data.offers[0]?.price, "Incorrect price").toBe(1500);
  });
});
