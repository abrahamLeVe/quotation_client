import { Avatar } from "@/models/auth.model";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      email: string;
      avatar: Avatar;
      name: string;
    };
  }
}
