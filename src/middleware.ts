import withAuth from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/checkout/:path*"],
};

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
});
