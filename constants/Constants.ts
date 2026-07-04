// ------------------------------
// SERVER-SIDE ENV VARIABLES
// (These will never be exposed to the browser)
// ------------------------------

export const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN ?? "";
export const SENDER_EMAIL = process.env.SENDER_EMAIL ?? "";
export const RECIVER_EMAIL = process.env.RECIVER_EMAIL ?? "";

export const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET ?? "";

export const ENV = process.env.ENV ?? "";
export const ADMIN_GITHUB_EMAIL = process.env.ADMIN_GITHUB_EMAIL ?? "";

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? "";
export const MONGO_URI = process.env.MONGO_URI ?? "";

// ------------------------------
// GITHUB OAUTH CONFIG (Server-side)
// ------------------------------

export const getGithubId = () => {
  return ENV === "PROD"
    ? process.env.GITHUB_ID ?? ""
    : process.env.LOCAL_GITHUB_ID ?? "";
};

export const getGithubSecret = () => {
  return ENV === "PROD"
    ? process.env.GITHUB_SECRET ?? ""
    : process.env.LOCAL_GITHUB_SECRET ?? "";
};

// ------------------------------
// CLIENT-SAFE ENV VARIABLES
// ⚠ MUST be returned through functions
// So they load at runtime (not at build time)
// ------------------------------

export const getCaptchaPublicKey = () =>
  process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY ?? "";
