import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [
      // Update to your production domain after Vercel deploy
      "https://loro.vercel.app/sitemap.xml",
    ],
  };
}




