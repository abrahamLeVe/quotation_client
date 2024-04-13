import { type MetadataRoute } from "next";
import { CLIENT_URL } from "@/utilities/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${CLIENT_URL}/sitemap.xml`,
  };
}
