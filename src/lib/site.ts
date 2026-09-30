const configuredUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-three-puce-77.vercel.app");
if (configuredUrl.protocol !== "https:" || configuredUrl.username || configuredUrl.password) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a public HTTPS URL without credentials.");
}

export const siteUrl = new URL(configuredUrl.origin);
