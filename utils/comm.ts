// utils/comm.ts
export const encode = (s?: string) => encodeURIComponent(s || "");

export function buildWhatsAppUrl(phone: string, opts?: { name?: string; sku?: string; extra?: string }) {
  const { name, sku, extra } = opts || {};
  let msg = "Hello 👋, I'm interested in a product from GRYP.FIT.";
  if (name) msg += ` Product: ${name}`;
  if (sku) msg += ` (SKU: ${sku})`;
  if (extra) msg += ` ${extra}`;
  msg += " Please share price, availability & lead time.";
  return `https://wa.me/${phone}?text=${encode(msg)}`;
}
