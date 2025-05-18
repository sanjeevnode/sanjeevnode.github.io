import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedEmails = (process.env.ADMIN_GITHUB_EMAIL || "")
        .split(",")
        .map((email) => email.trim().toLowerCase());

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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
