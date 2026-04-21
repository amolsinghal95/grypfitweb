export const SITE_URL = "https://www.gryp.fit";
export const SITE_NAME = "GRYP.FIT";
export const BUSINESS_NAME = "GRYP.FIT by Singhal Industries";
export const DEFAULT_OG_IMAGE = "/images/aboutusimage.png";
export const BUSINESS_PHONE = "+91-8449291260";
export const BUSINESS_EMAIL = "business@gryp.fit";
export const BUSINESS_ADDRESS = {
  streetAddress: "Mohkampur Phase 1",
  addressLocality: "Meerut",
  addressRegion: "Uttar Pradesh",
  postalCode: "250103",
  addressCountry: "IN",
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
}
