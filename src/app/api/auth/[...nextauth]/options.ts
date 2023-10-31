import { NextAuthOptions } from "next-auth";
import { loginUser } from "@/app/services/auth.service";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "tucorreo@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const data = {
            identifier: credentials?.email,
            password: credentials?.password,
          };
          const res = await loginUser(data);

          console.log("loginUserNextAuth: ", res);

          if (res.jwt) {
            const user = {
              token: res.jwt,
              email: res.user.email,
            };
            return user as any;
          }
        } catch (e) {
          console.log("errorNextAuth: ", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
