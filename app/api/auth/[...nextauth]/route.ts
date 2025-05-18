import {
  ADMIN_GITHUB_EMAIL,
  getGithubId,
  getGithubSecret,
  NEXTAUTH_SECRET,
} from "@/constants/Constants";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
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

      if (!user.email || !allowedEmails.includes(user.email)) {
        console.warn("Blocked sign-in attempt by:", user.email);
        return false; // ❌ Prevent login
      }

      return true; // ✅ Allow login
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
