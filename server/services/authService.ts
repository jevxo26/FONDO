// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noop = async (..._args: any[]) => ({} as any);

export const AuthService = {
  registerUser: noop,
  loginUser: async (_email: string, _password: string) => ({
    user: {},
    token: "",
    refreshToken: "",
  }),
  forgotPassword: async (_email: string) => ({ message: "" }),
  resetPassword: async (_token: string, _newPassword: string) => ({
    message: "",
  }),
  refreshToken: async (_refreshToken: string) => ({
    token: "",
    refreshToken: "",
  }),
  logoutUser: noop,
  getMe: async (_userId: number) => ({ id: 1, email: "" }),
};
