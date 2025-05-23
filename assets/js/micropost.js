/* Microposts – fetch & render */
(async function () {
  /* ----- configuration -------------------------------------------------- */
  const LIMIT = 30;                 // how many memos to display
  const PAGE_SIZE = 30;                 // fetch size per request
  const API_BASE = 'https://memos.jinjunliu.com/api/v1/memos';
  const FILE_BASE = 'https://memos.jinjunliu.com/file/';
  const MEMO_LINK = 'https://memos.jinjunliu.com/';

  /* ----- helpers --------------------------------------------------------- */
  marked.setOptions({ gfm: true, breaks: true, headerIds: false, mangle: false });

  const escape = s =>
    s.replace(/[&<>\"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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

      const res = await fetch(url, { headers: { Accept: 'application/json' } });
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
    const memos = await fetchMemos();
    const memoMap = Object.fromEntries(memos.map(m => [m.name, m]));

    container.innerHTML = memos.map(m => {
      /* -------- body markdown & memo embeds -------- */
      let raw = (m.content || '').replace(
        /!\[\[(memos\/[A-Za-z0-9]+)\]\]/g,
        (_, ref) => {
          const inner = memoMap[ref]
            ? marked.parse(memoMap[ref].content || '')
            : `<a href="${MEMO_LINK}${ref}">${ref}</a>`;
          return `<blockquote class="memo-embed">${inner}</blockquote>`;
        });
      const body = marked.parse(raw);

      /* -------- images -------- */
      const imageFigures = (m.resources || [])
        .filter(r => r.type?.startsWith('image/'))
        .map(imgHTML)
        .join('');
      const gallery = imageFigures
        ? `<div class="micropost-gallery">${imageFigures}</div>`
        : '';

      /* -------- timestamp -------- */
      const ts = m.createdTs
        ? new Date(m.createdTs * 1000)
        : new Date(m.createTime || m.displayTime || Date.now());

      return /* html */`
<section class="micropost">
  <div class="micropost-meta">
    <time datetime="${ts.toISOString()}">
      ${ts.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
    </time>
  </div>
  <div class="micropost-body">
    ${body}
    ${gallery}
  </div>
</section>`;
    }).join('');

  } catch (err) {
    console.error('Micropost error:', err);
    container.innerHTML = '<p>Failed to load microposts.</p>';
  }

})();

/* ------------------------------------------------------------------ */
/*   Lightweight image lightbox                                       */
document.addEventListener('click', e => {
  const img = e.target.closest('.micropost-gallery img');
  if (!img) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `<img src="${img.src}" alt="">`;
  overlay.addEventListener('click', () => overlay.remove());
  document.body.appendChild(overlay);
});
/* ------------------------------------------------------------------ */
