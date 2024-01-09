import { loginUser } from "@/app/services/auth.service";
import { getUserFromApi, providerFetch } from "@/lib/api";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/utilities/urls";
import { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { OAuthUserConfig } from "next-auth/providers/oauth";

const credentialsProviderConfig = {
  name: "Credentials",
  credentials: {
    email: {
      label: "email",
      type: "email",
    },
    password: { label: "Password", type: "password" },
  },
  async authorize(
    credentials: Record<"email" | "password", string> | undefined,
    req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
  ) {
    try {
      const data = {
        identifier: credentials!.email,
        password: credentials!.password,
      };
      const user = await loginUser(data);
      if (user?.jwt) {
        return user as any;
      }
    } catch (e) {
      console.log("errorNextAuth: ", e);
      return null;
    }
  },
};

const googleProviderConfig = {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  authorization: {
    params: {},
  },
  checks: ["none"],
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider(credentialsProviderConfig),
    GoogleProvider(googleProviderConfig as OAuthUserConfig<any>),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      try {
        if (account?.access_token) {
          const data = await providerFetch(
            account?.provider,
            account?.access_token
          );
          const { jwt } = data;
          const userData = await getUserFromApi(jwt);
          token.accessToken = jwt;
          token.userId = userData?.id;
          token.name = userData?.username;
          token.picture = userData?.avatar?.url;
        } else if (user?.jwt) {
          const userData = await getUserFromApi(user.jwt);
          token.accessToken = user.jwt;
          token.userId = userData?.id;
          token.name = userData?.username;
          token.email = userData?.email;
          token.picture = userData?.avatar?.url;
        }
      } catch (error) {
        console.error("Error processing JWT:", error);
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
};
