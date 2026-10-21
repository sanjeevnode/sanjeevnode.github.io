import {
  ADMIN_GITHUB_EMAIL,
  getGithubId,
  getGithubSecret,
  NEXTAUTH_SECRET,
} from "@/constants/Constants";
import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: getGithubId(),
      clientSecret: getGithubSecret(),
      // GitHub now sends `iss` on the OAuth callback (RFC 9207); openid-client rejects it
      // unless the provider declares the same issuer.
      issuer: "https://github.com/login/oauth",
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

// Server actions are publicly invokable endpoints - every mutation must check this.
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  const allowed = ADMIN_GITHUB_EMAIL.split(",").map((e) => e.trim().toLowerCase());
  if (!email || !allowed.includes(email)) {
    throw new Error("Unauthorized");
  }
}
