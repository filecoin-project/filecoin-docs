// Renders GitBook blocks in local HonKit previews. The page itself is in
// _layouts and assets.
//
// HonKit's own tag support can't be used: it drops blocks nested in other
// blocks, needs commas between attributes, fails on unknown tags, and reuses
// `code` for every fenced block. So page:before parses the tags, renders each
// block to HTML and leaves a placeholder; page swaps the HTML back in after
// Markdown has run.
const path = require("path").posix;
const hljs = require("highlight.js");
const katex = require("katex");

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/* ---------- Parsing ---------- */

const CODE =
  /(?:^|(?<=\n))[ \t]*(`{3,}|~{3,})[^\n]*\n(?:[\s\S]*?\n)?[ \t]*\1[`~]*[ \t]*(?=\n|$)|\{%-?\s*raw\s*-?%\}[\s\S]*?\{%-?\s*endraw\s*-?%\}|(?<!`)(`+)(?!`)(?:(?!\n[ \t]*\n)[\s\S])*?[^`]\2(?!`)/g;
const TAG =
  /\{%-?\s*([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^%"']|%(?!\}))*?)\s*-?%\}|<(\/?)(details|summary)(\s[^>]*)?>/g;
const SELF_CLOSING = new Set(["embed", "file"]);
const NATIVE = new Set(
  (
    "if elif elseif else endif for endfor asyncEach endeach asyncAll endall set endset include import from " +
    "extends block endblock macro endmacro call endcall filter endfilter switch case default endswitch " +
    "verbatim endverbatim html endhtml markdown endmarkdown asciidoc endasciidoc markup endmarkup"
  ).split(" ")
);

function parseAttrs(raw) {
  const attrs = {};
  for (const [, key, dq, sq, bare] of raw.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s,"']+))/g)) {
    attrs[key] = dq ?? sq ?? bare;
  }
  return attrs;
}

// Source -> flat tokens: {text}, {code}, {open, attrs}, {close}
function tokenize(src) {
  const tokens = [];
  const ifs = [];
  const text = (s) => {
    s = s.replace(/\{%[^\n]*?%\}/g, (t) => t.replace(/[“”]/g, '"'));
    let last = 0;
    for (const m of s.matchAll(TAG)) {
      tokens.push({ text: s.slice(last, m.index) });
      last = m.index + m[0].length;
      const [whole, name, raw, slash, html, htmlAttrs] = m;
      if (html) tokens.push(slash ? { close: html } : { open: html, attrs: { open: /\bopen\b/.test(htmlAttrs || "") } });
      else if (name === "if") {
        // Only visitor conditions are GitBook's; leave others to HonKit.
        ifs.push(/\bvisitor\b/.test(raw));
        tokens.push(ifs[ifs.length - 1] ? { open: "if", attrs: { condition: raw.trim() } } : { text: whole });
      } else if (/^(else|elif|elseif)$/.test(name) && ifs[ifs.length - 1]) {
        tokens.push({ close: "if" }, { open: "if", attrs: { condition: `${name} ${raw.trim()}`.trim() } });
      } else if (name === "endif") tokens.push(ifs.pop() ? { close: "if" } : { text: whole });
      else if (NATIVE.has(name)) tokens.push({ text: whole });
      else if (name.startsWith("end")) tokens.push({ close: name.slice(3) });
      else tokens.push({ open: name, attrs: parseAttrs(raw) });
    }
    tokens.push({ text: s.slice(last) });
  };
  let last = 0;
  for (const m of src.matchAll(CODE)) {
    text(src.slice(last, m.index));
    tokens.push({ code: m[0] });
    last = m.index + m[0].length;
  }
  text(src.slice(last));
  return tokens;
}

// Tokens -> tree. Unclosed blocks hold nothing; stray end tags are dropped.
function parse(src) {
  const root = { children: [] };
  const stack = [root];
  for (const token of tokenize(src)) {
    const top = stack[stack.length - 1];
    if (token.open) {
      const node = { name: token.open, attrs: token.attrs, children: [] };
      top.children.push(node);
      stack.push(node);
    } else if (token.close) {
      let i = stack.length - 1;
      while (i > 0 && stack[i].name !== token.close) i--;
      if (i > 0) while (stack.length > i) unwind(stack, stack.length - 1 === i);
    } else top.children.push(token);
  }
  while (stack.length > 1) unwind(stack, false);
  return root;
}
function unwind(stack, closed) {
  const node = stack.pop();
  if (closed) return;
  // No end tag: give its content back to the parent.
  node.unclosed = !SELF_CLOSING.has(node.name);
  stack[stack.length - 1].children.push(...node.children);
  node.children = [];
}

/* ---------- Rendering ---------- */

const dedent = (body) => {
  const lines = body.replace(/^(?:[ \t]*\n)+/, "").replace(/\s+$/, "").split("\n");
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length);
  const n = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(n)).join("\n");
};

const fill = (html, stash) =>
  html
    .replace(/<p>\s*(gbblock\d+x)\s*<\/p>/g, "$1")
    .replace(/gb(?:block|inline)(\d+)x/g, (token, i) => (i in stash ? stash[i] : token));

function plainText(text, hold) {
  return text
    .replace(/\$\$([\s\S]+?)\$\$/g, (whole, tex, at) => {
      const before = text.slice(0, at).match(/[^\n]*$/)[0];
      const after = text.slice(at + whole.length).match(/^[^\n]*/)[0];
      const displayMode = !before.trim() && !after.trim();
      const html = katex
        .renderToString(tex.trim(), { output: "mathml", displayMode, throwOnError: false })
        .replace(/<annotation[\s\S]*?<\/annotation>/g, "");
      return displayMode ? `\n${before}${hold("block", `<div class="gb-math">${html}</div>`)}\n` : hold("inline", html);
    })
    .replace(
      /^([ \t]*(?:[-*+]|\d+\.)[ \t]+)\[([ xX])\][ \t]+/gm,
      (_, bullet, box) => `${bullet}<input type="checkbox" class="gb-task" disabled${box === " " ? "" : " checked"}> `
    );
}

// Children -> Markdown with placeholders for blocks.
async function toMarkdown(children, env, nested) {
  let out = "";
  for (const child of children) {
    if (child.text !== undefined) out += plainText(child.text, env.hold);
    else if (child.code !== undefined) out += nested ? child.code.replace(/\{%-?\s*(end)?raw\s*-?%\}/g, "") : child.code;
    else {
      const token = env.hold("block", await renderNode(child, env));
      const ownLine = out.match(/(?:^|\n)([ \t]*)$/);
      // Blank lines keep the block out of neighbouring paragraphs; the indent
      // keeps it inside its list item.
      out = ownLine ? `${out.slice(0, out.length - ownLine[1].length)}\n${ownLine[1]}${token}\n\n` : `${out}${token}\n\n`;
    }
  }
  // Two blank lines in a row would end the surrounding list.
  return out
    .replace(/\n(?:[ \t]*\n){2,}([ \t]*gbblock\d+x)/g, "\n\n$1")
    .replace(/(gbblock\d+x)[ \t]*\n(?:[ \t]*\n)+/g, "$1\n\n");
}

async function body(children, env) {
  const text = dedent(await toMarkdown(children, env, true));
  return text ? fill(await env.book.renderBlock("markdown", text), env.stash) : "";
}

async function items(node, name, env) {
  return Promise.all(
    node.children.filter((c) => c.name === name).map(async (c) => ({ attrs: c.attrs, html: await body(c.children, env) }))
  );
}

const youtubeId = (url) =>
  (url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/) || [])[1];

const fileName = (url) => {
  try {
    return decodeURIComponent(url.split(/[?#]/)[0].split("/").pop()) || url;
  } catch {
    return url;
  }
};

// GitBook shows the title of the linked page.
function pageTitle(url, env) {
  if (/^[a-z]+:/i.test(url)) return undefined;
  let target = path.normalize(path.join(path.dirname(env.page.path), url.split("#")[0]));
  if (!/\.md$/.test(target)) target = path.join(target, "README.md");
  const article = env.book.summary && env.book.summary.getArticleByPath(target);
  return article && article.title;
}

const HINT_ICONS = { info: "i", warning: "!", danger: "!", success: "✓" };

const BLOCKS = {
  async hint({ attrs, children }, env) {
    const style = attrs.style in HINT_ICONS ? attrs.style : "info";
    return `<div class="hint hint-${style}"><div class="hint-icon">${HINT_ICONS[style]}</div><div class="hint-content">${await body(children, env)}</div></div>`;
  },
  async tabs(node, env) {
    const tabs = await items(node, "tab", env);
    const active = (i) => (i === 0 ? " active" : "");
    const header = tabs.map((t, i) => `<button class="tab${active(i)}" role="tab" aria-selected="${i === 0}">${esc(t.attrs.title || `Tab ${i + 1}`)}</button>`);
    const panes = tabs.map((t, i) => `<div class="tab-content${active(i)}" role="tabpanel">${t.html}</div>`);
    return `<div class="tabs-container"><div class="tabs-header" role="tablist">${header.join("")}</div><div class="tabs-body">${panes.join("")}</div></div>`;
  },
  async code({ attrs, children }, env) {
    const cls = ["gb-code", attrs.overflow === "wrap" && "gb-wrap", attrs.lineNumbers === "true" && "gb-lines"];
    const title = attrs.title ? `<div class="gb-code-title">${esc(attrs.title)}</div>` : "";
    return `<div class="${cls.filter(Boolean).join(" ")}">${title}${await body(children, env)}</div>`;
  },
  async embed({ attrs, children }, env) {
    const url = attrs.url || "";
    const id = youtubeId(url);
    const main = id
      ? `<iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`
      : `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a>`;
    const caption = await body(children, env);
    return `<div class="embed-container ${id ? "youtube" : "generic"}">${main}${caption && `<div class="embed-caption">${caption}</div>`}</div>`;
  },
  async file({ attrs, children }, env) {
    const src = attrs.src || "";
    return `<div class="gb-card"><a href="${esc(src)}" download>📎 ${esc(fileName(src))}</a>${await body(children, env)}</div>`;
  },
  async "content-ref"({ attrs, children }, env) {
    const url = attrs.url || "";
    const title = pageTitle(url, env);
    const html = await body(children, env);
    const link = !title && /<a /.test(html) ? html : `<a href="${esc(url)}">${esc(title || url)}</a>`;
    return `<div class="gb-card gb-ref">${link}</div>`;
  },
  async prompt({ attrs, children }, env) {
    const open = attrs.defaultExpanded ? " open" : "";
    return `<details class="gb-prompt"${open}><summary>${esc(attrs.description || "Prompt")}</summary>${await body(children, env)}</details>`;
  },
  async details({ attrs, children }, env) {
    const summary = children.find((c) => c.name === "summary");
    const rest = children.filter((c) => c !== summary);
    const title = summary ? (await body(summary.children, env)).replace(/^<p>([\s\S]*)<\/p>\s*$/, "$1") : "Details";
    return `<details class="gb-details"${attrs.open ? " open" : ""}><summary>${title}</summary>${await body(rest, env)}</details>`;
  },
  async stepper(node, env) {
    const steps = (await items(node, "step", env)).map(
      (s, i) => `<div class="gb-step"><div class="gb-step-num">${i + 1}</div><div class="gb-body">${s.html}</div></div>`
    );
    return `<div class="gb-stepper">${steps.join("")}</div>`;
  },
  async columns(node, env) {
    const columns = (await items(node, "column", env)).map(({ attrs, html }) => {
      const width = /^[\d.]+(%|px)$/.test(attrs.width || "") ? ` style="flex: 0 1 ${attrs.width}"` : "";
      return `<div class="gb-column gb-body"${width}>${html}</div>`;
    });
    return `<div class="gb-columns">${columns.join("")}</div>`;
  },
  async updates(node, env) {
    const updates = (await items(node, "update", env)).map(({ attrs, html }) => {
      const tags = (attrs.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
      const pills = tags.map((t) => `<span class="gb-tag">${esc(t)}</span>`).join("");
      return `<div class="gb-update"><div class="gb-update-meta"><time>${esc(attrs.date)}</time>${pills}</div><div class="gb-body">${html}</div></div>`;
    });
    return `<div class="gb-updates">${updates.join("")}</div>`;
  },
  async if({ attrs, children }, env) {
    return `<div class="gb-if"><div class="gb-label">Shown only if <code>${esc(attrs.condition)}</code></div>${await body(children, env)}</div>`;
  },
};

async function renderNode(node, env) {
  if (node.unclosed) return `<div class="gb-warning">Missing end tag: ${esc(node.name)}</div>`;
  if (BLOCKS[node.name]) return BLOCKS[node.name](node, env);
  return `<div class="gb-warning">Not supported in local preview: ${esc(node.name)} block</div>${await body(node.children, env)}`;
}

/* ---------- Plugin ---------- */

const stashes = new Map();

module.exports = {
  book: { assets: "./assets", css: ["theme.css"], js: ["theme.js"] },
  blocks: {
    // HonKit calls this for every code element, inline ones included.
    code: function ({ body, kwargs = {} }) {
      const language = (kwargs.language || "").replace(/^(console|shell-session)$/, "shell");
      if (!hljs.getLanguage(language)) return { body, html: false };
      return { body: hljs.highlight(body, { language, ignoreIllegals: true }).value, html: true };
    },
  },
  hooks: {
    "page:before": async function (page) {
      const stash = [];
      stashes.set(page.path, stash);
      const hold = (kind, html) => `gb${kind}${stash.push(html) - 1}x`;
      const env = { book: this, page, stash, hold };
      page.content = await toMarkdown(parse(page.content.replace(/\r\n?/g, "\n")).children, env, false);
      return page;
    },
    page: function (page) {
      page.content = fill(page.content, stashes.get(page.path) || []);
      return page;
    },
  },
};
