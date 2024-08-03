import { NextResponse } from "next/server";
import { ratelimiter } from "./lib/rate-limiter";

export async function middleware(req: any) {
  const ip = req.ip ?? "127.0.0.1";
  try {
    const { success } = await ratelimiter.limit(ip);
    if (!success) {
      return new NextResponse("Estás haciendo solicitudes demasiado rápido.", {
        status: 429,
      });
    }
  } catch (error) {
    return new NextResponse(
      "Lo sentimos, algo salió mal al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
      { status: 500 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/chat/:path*"],
};
