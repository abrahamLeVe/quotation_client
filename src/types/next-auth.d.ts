import { Quotation } from "@/models/quotation.model";
import "next-auth";

declare module "next-auth" {
  interface Session {
    jwt: string;
    user: {
      accessToken: string;
      email: string;
      exp: number;
      iat: number;
      jti: string;
      name: string;
      picture: string;
      sub: string;
      userId: number;
      quotations: Quotation[];
    };
  }

  interface User {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: string;
      updatedAt: string;
      quotations: Quotation[];
    };
  }
}
