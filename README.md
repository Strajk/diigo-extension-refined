# "Diigo Browser Extension" Refined

### Backstory

I've experimented with copious amount of browser extensions for annotating&bookmarking web pages, and I've ended up with Diigo:

* [Liner](https://getliner.com/en) – extension quite nice, but lacking the outline view. App UI is too fluffy, I prefer more dense & minimalistic
* [Highly Highlighter](https://highly.co/) – abandoned in 2018
* [Hypothes.is](https://web.hypothes.is/) – actually quite like for pure annotation, but lacking bookmarking (probably by design)
* [Memex](https://worldbrain.io/) – it's still in rapid development and changing too often. Their full-text search was a killer feature, which they sadly abandoned.
* [Diigo](https://www.diigo.com/) – not sexy, almost boring, but working well. Their biggest selling point is they exist for 10 years, have paying customers and hopefully not going to disappear anytime soon - that's good enough for at this point `¯\_(ツ)_/¯`

Still, I'm using it all the time, and couldn't resist tweaking it a bit to my taste.

### Changes

> Changes highlighted by `<@STRAJK>` and `</@STRAJK>` comments in the code

- Improved logic for showing "mini search/highlight popup" (when `Upon text selection, show mini search/highlight popup` is enabled)
- Enabled submitting the bookmarking form by "cmd + enter"
- Replaced `diigo.com/search` with `google.com/search` as the default search action
  - I'm sorry, but the original diigo.com/search is just horrible.
  - Diigo extension shows personalized results also directly in Google Search results, so there's no reason to not use the official Google Search.
- Close "mini search/highlight popup" on ESC
- "mini search/highlight popup" move 10px more down https://cln.sh/JnC5uV
- "mini search/highlight popup" auto-hide after 3 seconds

### Workflow

- Download the extension from Chrome Web Store and unpack it to `./extension`
  - Not automated, as the extension is not being updated (at 2022-12-06, last update was August 18, 2021)
- Run `./scripts/beautify.mjs` to beautify the code
- Commit to git with the version number as commit message
- Apply my changes and commit them separately
- Load to Chrome in developer mode, don't wanna publish this to Chrome Web Store

### (Hopefully not) Legal

I'm not the author of the extension itself - the Diigo team is. But sadly, it's not open-source, so I can't offer my changes back to the original.
I just downloaded the extension from Google Chrome Web Store, unpacked it, unbundled it, formatted it, and made some changes.


### My notes

- `bookmark-window.html`
  - showing logic in diigolet.js
- `popup.html`
  - browser action popup
- `popup-savebookmark.html`
  - seems unused
- `popup2.html`
  - seems unused
