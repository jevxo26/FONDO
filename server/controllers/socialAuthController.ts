// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noop = async (..._args: any[]) => ({}) as any;

export const SocialAuthController = {
  loginWithGoogle: noop,
  loginWithFacebook: noop,
};
