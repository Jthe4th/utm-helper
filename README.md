# UTM Link Copier

A small browser extension for Chrome, Brave and Edge that copies a page's link with tracking codes (UTM codes) already added, so you can see in your analytics which channel each visit came from. One click, nothing to fill in.

Works for: **WhatsApp, Facebook, Instagram, X and YouTube.**

---

## Install (about 2 minutes)

You need Google Chrome, Brave or Microsoft Edge. No coding required. The steps are the same in all three; only the address you type in step 4 differs.

1. **Download the extension.**
   Go to https://github.com/Jthe4th/utm-helper, click the green **Code** button, then **Download ZIP**.
2. **Unzip it.**
   Find the downloaded `utm-helper-main.zip` (usually in Downloads) and double-click it. You'll get a folder called `utm-helper-main`.
3. **Move the folder somewhere permanent**, such as Documents.
   Your browser reads the extension from this folder, so don't delete or move it afterward.
4. **Open your browser's extensions page.**
   Type the address for your browser in the address bar and press Enter:
   - Chrome: `chrome://extensions`
   - **Brave: `brave://extensions`**
   - Edge: `edge://extensions`
5. **Turn on Developer mode.**
   It's a switch in the top-right corner of the page (in Edge it's in the left sidebar). This is normal for extensions that aren't in a browser's web store.
6. **Click "Load unpacked"** (top-left), choose the `utm-helper-main` folder, and click **Select**.
7. **Pin it** so it's easy to reach: click the puzzle-piece icon in the browser's toolbar, then the pin next to **UTM Link Copier**.

You should now see a white link symbol on a dark green square in your toolbar.

---

## How to use it

### Option 1: the toolbar icon
1. Open the article you want to share.
2. Click the **UTM Link Copier** icon.
3. Click the channel you're sharing to (WhatsApp, Facebook, Instagram, X or YouTube).
4. The link is now copied. Paste it wherever you need it, such as WhatsApp, a social post, or a URL shortener.

### Option 2: right-click
Right-click anywhere on a page, or right-click **any link** (for example on a section page listing several articles), and choose **Copy link with UTM for...**, then pick a channel. A green check mark appears on the icon when it's copied.

### Option 3: keyboard shortcut
Press **Alt + Shift + U** to copy the current page for the channel you used last.
To change the shortcut, go to `chrome://extensions/shortcuts` (Brave: `brave://extensions/shortcuts`).

---

## What gets added to the link

For example, sharing to WhatsApp turns this:

```
https://example.org/articles/faith-in-action
```

into this:

```
https://example.org/articles/faith-in-action?utm_source=whatsapp&utm_medium=social&utm_campaign=faith-in-action
```

- **utm_source** is the channel you picked.
- **utm_medium** is always `social`.
- **utm_campaign** is the article's name, taken from its web address.
- Any old UTM codes already on the link are replaced, so nothing doubles up.

### Options (optional)
Click **Options** at the bottom of the popup:
- **Campaign name:** type your own name (for example `october-issue`) to use the same campaign for several articles. Leave it blank to use each article's own name. **If you set one, clear it when you're done**, or it will be used on every link.
- **Your initials:** adds your initials to the link, so you can tell who shared it.

---

## Updating

When there's a new version:
1. Download the ZIP again from the GitHub page (steps 1 and 2 above).
2. Replace the contents of your old folder with the new files.
3. Go to your browser's extensions page (see step 4) and click the circular **reload** arrow on the UTM Link Copier card.

You can check which version you have at the bottom-right of the popup.

---

## Troubleshooting

- **"This page can't be tagged"**: the extension only works on normal web pages (addresses starting with `http` or `https`), not on the browser's own pages (like the extensions page).
- **The extension disappeared or shows an error**: the folder was probably moved or deleted. Put it back, or repeat the install steps.
- **Nothing happens when I click a channel**: reload the page you're on and try again.

Questions or problems? [Open an issue](https://github.com/Jthe4th/utm-helper/issues) on GitHub.
