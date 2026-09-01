# Ten Before Work — install on Android

## Upload these to a GitHub repo

    index.html
    manifest.webmanifest
    sw.js
    icons/            (three .png files)

Upload the **contents** of this folder, not the folder itself — `index.html`
must sit at the repo root or GitHub Pages will serve it one level down.

Repo → Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
Wait a minute, then Pages shows you the URL.

## Install on the phone

Open that URL **in Chrome** (Chrome is what turns a PWA into a real installed
app on stock Android). Let it finish loading, then three-dot menu → **Install
app**. It lands in your app drawer as "Ten".

If the menu only offers "Add to Home screen", reload once and try again — the
manifest is occasionally missed on a first visit.

Then test it: aeroplane mode on, launch from the drawer. It should open full
screen with no address bar. That confirms the cache took.

## Moving your history later

The home screen has **Export history** and **Import history**.

Export writes a small JSON file to your downloads. Import merges a file back in
— it does not overwrite, so importing an old export never loses newer days.
Where a date exists on both sides it keeps the longer session.

You need this when you change device or switch to the sideloaded APK, because a
Chrome-installed app and a sideloaded APK are separate storage sandboxes.
Nothing crosses between them automatically.

Worth exporting occasionally regardless. Clearing Chrome's site data for the
domain will wipe the log.

## Updating the app

Replace `index.html` in the repo, and **bump `CACHE` in `sw.js`** (v1 → v2).
Without that bump the service worker keeps serving the cached copy and you will
not see your change. The app picks it up on the second launch after the change.
