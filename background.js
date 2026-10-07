import { CHANNELS, buildUtmUrl } from "./utm.js";

const MENU_ROOT = "utm-root";

function createMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ROOT,
      title: "Copy link with UTM for…",
      contexts: ["page", "link"],
    });
    for (const c of CHANNELS) {
      chrome.contextMenus.create({
        id: `utm-${c.id}`,
        parentId: MENU_ROOT,
        title: c.label,
        contexts: ["page", "link"],
      });
    }
  });
}

chrome.runtime.onInstalled.addListener(createMenus);
chrome.runtime.onStartup.addListener(createMenus);

async function copyToClipboard(text) {
  const existing = await chrome.runtime.getContexts({ contextTypes: ["OFFSCREEN_DOCUMENT"] });
  if (!existing.length) {
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["CLIPBOARD"],
      justification: "Write the tagged link to the clipboard",
    });
  }
  await chrome.runtime.sendMessage({ target: "offscreen", text });
}

let badgeTimer;
function flashBadge(text, color) {
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text });
  clearTimeout(badgeTimer);
  badgeTimer = setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1800);
}

async function copyFor(rawUrl, channelId) {
  const { initials = "", campaign = "" } = await chrome.storage.sync.get(["initials", "campaign"]);
  const tagged = buildUtmUrl(rawUrl, channelId, { initials, campaign });
  if (!tagged) return flashBadge("!", "#c0392b");
  await copyToClipboard(tagged);
  await chrome.storage.sync.set({ lastChannel: channelId });
  flashBadge("✓", "#2e7d32");
}

chrome.contextMenus.onClicked.addListener((info) => {
  const channelId = String(info.menuItemId).replace(/^utm-/, "");
  copyFor(info.linkUrl || info.pageUrl, channelId);
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "copy-last") return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const { lastChannel = "whatsapp" } = await chrome.storage.sync.get("lastChannel");
  if (tab?.url) copyFor(tab.url, lastChannel);
});
