// Shared config + URL builder. Edit CHANNELS to change what gets written to the URL.
export const CHANNELS = [
  { id: "whatsapp", label: "WhatsApp", source: "whatsapp", medium: "social" },
  { id: "facebook", label: "Facebook", source: "facebook", medium: "social" },
  { id: "instagram", label: "Instagram", source: "instagram", medium: "social" },
  { id: "x", label: "X", source: "x", medium: "social" },
  { id: "youtube", label: "YouTube", source: "youtube", medium: "social" },
];

export function slugify(text, max = 50) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max)
    .replace(/-+$/, "");
}

function campaignFromUrl(url) {
  const last = url.pathname.split("/").filter(Boolean).pop() || "";
  return slugify(last.replace(/\.[a-z0-9]+$/i, "")) || slugify(url.hostname);
}

// Returns the tagged URL string, or null if the URL can't be tagged.
export function buildUtmUrl(rawUrl, channelId, { campaign, initials } = {}) {
  const channel = CHANNELS.find((c) => c.id === channelId);
  if (!channel) return null;
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  for (const key of [...url.searchParams.keys()]) {
    if (key.toLowerCase().startsWith("utm_")) url.searchParams.delete(key);
  }
  url.searchParams.set("utm_source", channel.source);
  url.searchParams.set("utm_medium", channel.medium);
  url.searchParams.set("utm_campaign", slugify(campaign || "") || campaignFromUrl(url));
  const content = slugify(initials || "");
  if (content) url.searchParams.set("utm_content", content);
  return url.toString();
}
