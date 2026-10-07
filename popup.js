import { CHANNELS, buildUtmUrl } from "./utm.js";

const channelsEl = document.getElementById("channels");
const resultEl = document.getElementById("result");
const campaignEl = document.getElementById("campaign");
const initialsEl = document.getElementById("initials");

chrome.storage.sync.get(["campaign", "initials"]).then(({ campaign = "", initials = "" }) => {
  campaignEl.value = campaign;
  initialsEl.value = initials;
});
for (const el of [campaignEl, initialsEl]) {
  el.addEventListener("change", () =>
    chrome.storage.sync.set({ campaign: campaignEl.value.trim(), initials: initialsEl.value.trim() })
  );
}

for (const c of CHANNELS) {
  const btn = document.createElement("button");
  btn.textContent = c.label;
  btn.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const tagged = buildUtmUrl(tab?.url, c.id, {
      campaign: campaignEl.value,
      initials: initialsEl.value,
    });
    resultEl.classList.toggle("err", !tagged);
    if (!tagged) {
      resultEl.textContent = "This page can't be tagged (not a web page).";
      return;
    }
    await navigator.clipboard.writeText(tagged);
    chrome.storage.sync.set({ lastChannel: c.id });
    document.querySelectorAll("button.done").forEach((b) => b.classList.remove("done"));
    btn.classList.add("done");
    resultEl.textContent = `Copied: ${tagged}`;
  });
  channelsEl.appendChild(btn);
}

document.getElementById("version").textContent = `v${chrome.runtime.getManifest().version}`;
