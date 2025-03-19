import { routes } from "@/config/routes";
import { db } from "@/db";
import { accounts, users } from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import { login } from "./services/login.service";

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string | undefined;
  }
}

const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  pages: {
    signIn: routes.login,
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return await login({
          email: credentials.email as string,
          password: credentials.password as string,
        });
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export { authConfig };
