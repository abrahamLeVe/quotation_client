import { NextRequest, NextResponse } from "next/server";

import withAuth from "next-auth/middleware";
import { ratelimiter } from "./lib/rate-limiter";

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";

  try {
    const { success } = await ratelimiter.limit(ip);

    if (!success)
      return new NextResponse("Estás escribiendo mensajes demasiado rápido.");
  } catch (error) {
    return new NextResponse(
      "Lo sentimos, algo salió al procesar su mensaje. Por favor, inténtelo de nuevo más tarde."
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/checkout/:path*", "/api/message/:path*"],
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
