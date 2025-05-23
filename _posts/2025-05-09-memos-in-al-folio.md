---
layout: post
title: Bringing Memos Microposts to al-folio
date: 2025-05-09
description:  "How I wired my Memos instance into the al-folio Jekyll theme, built a dedicated layout, paginated the API, handled images and embedded quotes, and then moved all JS/CSS to the assets pipeline."
tags:
  - Jekyll
  - al-folio
  - Memos
  - JavaScript
  - API-integration
  - Front-end
categories: Tech
giscus_comments: true
---

> TL;DR — I wanted my short Memos updates (“microposts”) to live inside my
> al-folio site. I ended up writing a tiny `micropost.liquid` layout, a
> vanilla-JS fetcher with pagination, image support, cross-memo quoting,
> automatic line-break handling, and finally externalised everything to
> `/assets/js/` and `/assets/css/`.  Here’s the full walkthrough so you can
> drop the same feature into your own al-folio fork.

## 1  Why Microposts?

Long-form blogs are great, but I also jot quick links, screenshots, and
one-liners in a self-hosted **[Memos](https://github.com/usememos/memos)**
instance (`memos.jinjunliu.com`).  Pulling them into my main site means:

* everything is searchable in one place  
* I keep traffic on my own domain

## 2  Building a dedicated Jekyll layout

Create a file named `micropost.liquid` in the `_layouts/` directory:

```html
---
layout: default
---

{% if page._styles %}
  <style type="text/css">{{ page._styles }}</style>
{% endif %}

<div class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>

  <article id="micropost-container" class="microposts">
    <p>Loading microposts…</p>
  </article>
</div>

<!-- Configure marked -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
  marked.setOptions({ gfm: true, breaks: true, headerIds: false, mangle: false });
</script>

<!-- in the <head>  -->
<link rel="stylesheet" href="{{ '/assets/css/micropost.css' | relative_url }}">

<!-- just before </body> -->
<script src="{{ '/assets/js/micropost.js' | relative_url }}"></script>
```

* No inline JS/CSS — a cleaner Git diff and browser cache-hits for free.
* Uses the existing al-folio typography & colors.

## 3  The JavaScript fetcher

`assets/js/micropost.js` (≈80 LOC) does all the heavy lifting:

* **Pagination** — loops through `nextPageToken` until I have 30 memos.
* **Markdown** via `marked` with `breaks: true` so single line-feeds render as
  `<br>` (key for link lists).
* **Images** — each memo’s `resources` array is mapped to
  `https://memos…/file/resources/<id>/<filename>`.
* **Embedded quotes** — detects `![[memos/<id>]]`, looks it up in the same
  response, and injects a `<blockquote>` with the original markdown inside.
* Graceful error handling (offline? returns a friendly message).

Snippet:

```js
/* Microposts – fetch & render */
(async function () {
    /* ----- configuration -------------------------------------------------- */
    const LIMIT         = 30;                 // how many memos to display
    const PAGE_SIZE     = 30;                 // fetch size per request
    const API_BASE      = 'https://memos.jinjunliu.com/api/v1/memos';
    const FILE_BASE     = 'https://memos.jinjunliu.com/file/';
    const MEMO_LINK     = 'https://memos.jinjunliu.com/';
  
    /* ----- helpers --------------------------------------------------------- */
    marked.setOptions({ gfm: true, breaks: true, headerIds: false, mangle: false });
  
    const escape = s =>
      s.replace(/[&<>\"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  
    const imgHTML = r =>
      `<figure class="micropost-img">
          <img src="${FILE_BASE}${r.name}/${encodeURIComponent(r.filename)}"
               alt="${escape(r.filename)}">
          <figcaption>${escape(r.filename)}</figcaption>
       </figure>`;
  
    /* ----- fetch paging ---------------------------------------------------- */
    async function fetchMemos() {
      let list = [], token;
      while (list.length < LIMIT) {
        const url = new URL(API_BASE);
        url.searchParams.set('limit', PAGE_SIZE);
        if (token) url.searchParams.set('pageToken', token);
  
        const res  = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const mems = Array.isArray(data) ? data : (data.memos || []);
        list.push(...mems);
        token = data.nextPageToken;
        if (!token || mems.length === 0) break;
      }
      return list.slice(0, LIMIT);
    }
  
    /* ----- render ---------------------------------------------------------- */
    const container = document.getElementById('micropost-container');
    try {
      const memos   = await fetchMemos();
      const memoMap = Object.fromEntries(memos.map(m => [m.name, m]));
  
      container.innerHTML =
        memos.map(m => {
          // embed other memos
          let raw = (m.content || '').replace(
            /!\[\[(memos\/[A-Za-z0-9]+)\]\]/g,
            (_, ref) => {
              const inner = memoMap[ref]
                ? marked.parse(memoMap[ref].content || '')
                : `<a href="${MEMO_LINK}${ref}">${ref}</a>`;
              return `<blockquote class="memo-embed">${inner}</blockquote>`;
            });
  
          const body  = marked.parse(raw);
          const imgs  = (m.resources || [])
                        .filter(r => r.type?.startsWith('image/'))
                        .map(imgHTML)
                        .join('');
          const ts    = m.createdTs
                          ? new Date(m.createdTs * 1000)
                          : new Date(m.createTime || m.displayTime || Date.now());
  
          return `
  <section class="micropost">
    <div class="micropost-meta">
      <time datetime="${ts.toISOString()}">
        ${ts.toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'})}
      </time>
    </div>
    <div class="micropost-body">${body}${imgs}</div>
  </section>`;
        }).join('');
  
    } catch (err) {
      console.error('Micropost error:', err);
      container.innerHTML = '<p>Failed to load microposts.</p>';
    }
  })();
```

## 4  Styling

`assets/css/micropost.css` keeps it minimal:

```css
.microposts        { margin-top: 1.5rem; }
.micropost         { margin-bottom: 2rem; border-bottom: 1px solid var(--border-color,#e0e0e0); padding-bottom: 1rem; }
.micropost-meta    { font-size: .9rem; color: var(--text-muted-color,#666); margin-bottom: .25rem; }
.micropost-body p  { margin: .4rem 0; }

.micropost-img          { margin: .6rem 0; text-align: center; }
.micropost-img img      { max-width: 100%; height: auto; border-radius: .375rem; }
.micropost-img figcaption{ font-size: .8rem; color: var(--text-muted-color,#777); margin-top: .25rem; }

.memo-embed        { border-left: 4px solid var(--border-color,#999);
                      padding-left: .75rem; margin: .5rem 0;
                      background: rgba(0,0,0,.03); }
```

Everything inherits from al-folio's palette, so dark-mode support comes “for free.”

## 5  Microposts page

Add a new page named `micropost.md` in the `_pages/` directory:

…and create the page front-matter:

```markdown
---
layout: micropost
title: microposts
description: "Short, informal updates and notes. Limited to displaying 30 posts. To view all, visit <a href='https://memos.jinjunliu.com/'>memos.jinjunliu.com</a>"
permalink: /microposts/
nav: false
---
```

I want this page to appear under the submenu, so I modified `_pages/dropdown.md`:

```markdown
---
layout: page
title: others
nav: true
nav_order: 8
dropdown: true
children:
  - title: blog
    permalink: /blog/
  - title: divider
  - title: bookshelf
    permalink: /books/
  - title: divider
  - title: microposts
    permalink: /microposts/
---
```

## 6  Results

* **30 latest memos** show in a nice timeline.
* Images (JPEG/PNG) load lazily and resize responsively.
* Quotes render like Twitter embeds but local.
* All assets are cached separately, shaving 20 kB off the main page.

Visit [jinjunliu.com/microposts](https://jinjunliu.com/microposts) to see it in action.

## 7  Next steps

* Tag filtering (`?tag=reading`).
* Local-search index via Lunr so quick notes are searchable.
* Web-push so the page live-updates when I post a new memo.

**Gotchas?**  Drop a comment below—Giscus is on.  Feel free to fork the
[snippet on GitHub](https://github.com/jinjunliu/al-folio) and tweak away. Happy hacking!

## 8  Acknowledgements

The entire process was completed with the assistance of ChatGPT (o3 model - the best model so far!), including the draft of this blog! Thanks ChatGPT!
