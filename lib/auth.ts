import {
  ADMIN_GITHUB_EMAIL,
  getGithubId,
  getGithubSecret,
  NEXTAUTH_SECRET,
} from "@/constants/Constants";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: getGithubId(),
      clientSecret: getGithubSecret(),
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedEmails = ADMIN_GITHUB_EMAIL.split(",").map((email) =>
        email.trim().toLowerCase()
      );

      if (!user.email || !allowedEmails.includes(user.email.toLowerCase())) {
        console.warn("Blocked sign-in attempt by:", user.email);
        return false;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: NEXTAUTH_SECRET,
};
