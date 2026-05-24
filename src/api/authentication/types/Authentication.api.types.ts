export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  data: {
    token: string;
    id: number;
    displayedName: string;
    userId: string;
    email: string;
    expiration: object;
  };
};
