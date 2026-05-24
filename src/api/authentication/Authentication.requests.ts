import type { APIRequestContext } from "@playwright/test";
import type { LoginRequest, LoginResponse } from "./types/Authentication.api.types.js";
import { AuthenticationApiEndpoints } from "./Authentication.endpoints.js";
import type { UserCredentials } from "../../pages/authentication/types/UserCredentials.types.js";

export class AuthenticationApi {
  constructor(
    private request: APIRequestContext,
    private user: UserCredentials
  ) {}

  async getUserAccessToken(): Promise<string> {
    const payload: LoginRequest = {
      email: this.user.email,
      password: this.user.password,
    };

    const response = await this.request.post(AuthenticationApiEndpoints.POST_LOGIN, {
      data: payload,
    });

    const body = (await response.json()) as LoginResponse;

    return body.data.token;
  }
}
