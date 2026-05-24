/** User credentials for login and register.
 * Parameter `displayName` is required only for registering new User.
 */
export type UserCredentials = {
  email: string;
  password: string;
  displayName?: string;
};
