export const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN || "";
export const SENDER_EMAIL = process.env.SENDER_EMAIL || "";
export const RECIVER_EMAIL = process.env.RECIVER_EMAIL || "";
export const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "";

export const ENV = process.env.ENV || "";
export const ADMIN_GITHUB_EMAIL = process.env.ADMIN_GITHUB_EMAIL || "";

export const getGithubId = () => {
  return ENV === "PROD"
    ? process.env.GITHUB_ID || ""
    : process.env.LOCAL_GITHUB_ID || "";
};
export const getGithubSecret = () => {
  return ENV === "PROD"
    ? process.env.GITHUB_SECRET || ""
    : process.env.LOCAL_GITHUB_SECRET || "";
};

export const NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY || "";

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const MONGO_URI = process.env.MONGO_URI || "";
