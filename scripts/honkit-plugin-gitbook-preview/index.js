// Renders GitBook blocks in local HonKit previews. The page itself is in
// _layouts and assets.
//
// HonKit's own tag support can't be used: it drops blocks nested in other
// blocks, needs commas between attributes, fails on unknown tags, and reuses
// `code` for every fenced block. So page:before parses the tags, renders each
// block to HTML and leaves a placeholder; page swaps the HTML back in after
// Markdown has run.
const fs = require("fs");
const { execFileSync } = require("child_process");
const path = require("path").posix;
const katex = require("katex");
// HonKit's own modules, so heading IDs come out as HonKit makes them.
const fromHonkit = { paths: [require.resolve("honkit")] };
const slugid = require(require.resolve("github-slugid", fromHonkit));
const cheerio = require(require.resolve("cheerio", fromHonkit));

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
        .renderToString(tex.trim(), { displayMode, throwOnError: false })
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

function fileSize(src, env) {
  if (/^[a-z]+:/i.test(src)) return "";
  try {
    const { size } = fs.statSync(env.book.resolve(path.join(path.dirname(env.page.path), decodeURIComponent(src))));
    return size < 1e3 ? `${size}B` : size < 1e6 ? `${Math.round(size / 1e3)}KB` : `${Math.round(size / 1e6)}MB`;
  } catch {
    return "";
  }
}

// GitBook shows the title of the linked page.
function pageTitle(url, env) {
  if (/^[a-z]+:/i.test(url)) return undefined;
  let target = path.normalize(path.join(path.dirname(env.page.path), url.split("#")[0]));
  if (!/\.md$/.test(target)) target = path.join(target, "README.md");
  const article = env.book.summary && env.book.summary.getArticleByPath(target);
  return article && article.title;
}

const icon = (shapes) =>
  `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes}</svg>`;
// GitBook icons are Font Awesome Pro. This uses the free set, as close as it
// gets to the "regular" style of docs.filecoin.io, or nothing.
const FA = path.dirname(require.resolve("@fortawesome/fontawesome-free/package.json"));
const faIcons = {};
function faIcon(name) {
  if (!/^[a-z0-9-]+$/.test(name || "")) return "";
  if (faIcons[name] === undefined) {
    const files = ["regular", "solid", "brands"].map((style) => path.join(FA, "svgs", style, `${name}.svg`));
    const file = files.find((f) => fs.existsSync(f));
    faIcons[name] = file ? fs.readFileSync(file, "utf8").trim().replace("<svg", '<svg class="gb-icon" aria-hidden="true"') : "";
  }
  return faIcons[name];
}

const FA_STYLES = /^fa-(solid|regular|light|thin|duotone|brands|sharp.*)$/;
function addIcons(html, pageIcon) {
  return html
    .replace(/<i class="([^"]*)"[^>]*>[^<]*<\/i>/g, (whole, classes) => {
      const name = classes.split(/\s+/).find((c) => c.startsWith("fa-") && !FA_STYLES.test(c));
      return (name && faIcon(name.slice(3))) || whole;
    })
    .replace(/<(?:a|button)\b[^>]*\bdata-icon="([^"]*)"[^>]*>/g, (tag, name) => tag + faIcon(name))
    .replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/, (whole, attrs, title) => (pageIcon ? `<h1${attrs}>${pageIcon}<span>${title}</span></h1>` : whole));
}

// HonKit gives repeated headings the same ID, so outline and anchor links
// land on the first one. Number the repeats as GitBook does: "setup",
// "setup-1", "setup-2". The first keeps the ID HonKit adds later.
function uniqueHeadingIds(html) {
  const seen = new Map();
  return html.replace(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/g, (whole, level, attrs, inner) => {
    const own = attrs.match(/\sid="([^"]*)"/);
    const id = own ? own[1] : slugid(cheerio.load(inner, null, false).text());
    const n = seen.get(id) || 0;
    seen.set(id, n + 1);
    return own || !n ? whole : `<h${level}${attrs} id="${id}-${n}">${inner}</h${level}>`;
  });
}

// Path -> icon from the front matter, for the title and the sidebar.
function pageIcons(book) {
  const icons = {};
  book.summary.walk(({ path: file }) => {
    if (!file) return;
    try {
      const matter = fs.readFileSync(book.resolve(file), "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const icon = matter && matter[1].match(/^icon:\s*["']?([\w-]+)/m);
      if (icon && faIcon(icon[1])) icons[file] = faIcon(icon[1]);
    } catch {
      // Not a file in the repository.
    }
  });
  return icons;
}

const ICONS = {
  file: icon('<path d="M9 1.5H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8zM9 1.5v4h4"/>'),
  download: icon('<path d="M8 1.5v9M4.5 7 8 10.5 11.5 7M2 11v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2"/>'),
  open: icon('<path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9M9.5 1.5h5v5M14.5 1.5 7.5 8.5"/>'),
  copy: icon('<rect x="5.5" y="1.5" width="8.5" height="9.5" rx="1"/><path d="M10.5 13.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1"/>'),
  prompt: icon('<rect x="1" y="2" width="14" height="12" rx="1.5"/><path d="m4 5.5 2.5 2.5L4 10.5M8 10.5h4"/>'),
};
const HINT_ICONS = {
  info: icon('<circle cx="8" cy="8" r="7"/><path d="M6.7 7.3h1.5v3.5M6.5 10.9h3.2M8 4.9v.1"/>'),
  success: icon('<circle cx="8" cy="8" r="7"/><path d="m5.2 8.2 2 2 3.6-4"/>'),
  warning: icon('<circle cx="8" cy="8" r="7"/><path d="M8 4.4v4.2M8 11.2v.1"/>'),
  danger: icon('<path d="M8 1.8 15 14H1z"/><path d="M8 6.2v3.4M8 11.8v.1"/>'),
};

const DATES = {
  full: { year: "numeric", month: "long", day: "numeric" },
  short: { year: "numeric", month: "short", day: "numeric" },
  numeric: { year: "numeric", month: "numeric", day: "numeric" },
};

const BLOCKS = {
  async hint({ attrs, children }, env) {
    const style = attrs.style in HINT_ICONS ? attrs.style : "info";
    return `<div class="hint hint-${style}"><div class="hint-icon">${faIcon(attrs.icon) || HINT_ICONS[style]}</div><div class="hint-content">${await body(children, env)}</div></div>`;
  },
  async tabs(node, env) {
    const tabs = await items(node, "tab", env);
    const active = (i) => (i === 0 ? " active" : "");
    const header = tabs.map((t, i) => `<button class="tab${active(i)}" role="tab" aria-selected="${i === 0}">${faIcon(t.attrs.icon)}${esc(t.attrs.title || `Tab ${i + 1}`)}</button>`);
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
    const [, host, rest] = url.match(/^\w+:\/\/(?:www\.)?([^/?#]+)\/?(.*)/) || [null, "", url];
    const main = id
      ? `<iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`
      : `<a class="gb-ref" href="${esc(url)}" target="_blank" rel="noopener"><span><small>${esc(host)}</small>${esc(rest || host)}</span></a>`;
    const caption = await body(children, env);
    return `<div class="embed-container${id ? " youtube" : ""}">${main}${caption && `<div class="caption">${caption}</div>`}</div>`;
  },
  async file({ attrs, children }, env) {
    const src = attrs.src || "";
    const name = fileName(src);
    const info = [path.extname(name).slice(1).toUpperCase(), fileSize(src, env)].filter(Boolean).join(" · ");
    const caption = await body(children, env);
    return (
      `<div class="gb-file"><div class="gb-file-card"><span class="gb-file-icon">${ICONS.file}</span>` +
      `<div class="gb-file-name"><a href="${esc(src)}" target="_blank" rel="noopener">${esc(name)}</a><small>${info}</small></div>` +
      `<a class="gb-button" href="${esc(src)}" download>${ICONS.download}Download</a>` +
      `<a class="gb-button" href="${esc(src)}" target="_blank" rel="noopener">${ICONS.open}Open</a></div>` +
      `${caption && `<div class="caption">${caption}</div>`}</div>`
    );
  },
  async "content-ref"({ attrs, children }, env) {
    const url = attrs.url || "";
    const label = (await body(children, env)).replace(/<[^>]+>/g, "").trim();
    return `<a class="gb-ref" href="${esc(url)}"><span>${esc(pageTitle(url, env) || "") || label || esc(url)}</span></a>`;
  },
  async prompt({ attrs, children }, env) {
    const open = attrs.defaultExpanded ? " open" : "";
    // Prompts are shown as written.
    const text = dedent(children.map((c) => c.text ?? c.code ?? "").join(""));
    const prompt = text.replace(/^(`{3,}|~{3,})[^\n]*\n([\s\S]*?)\n?\1$/, "$2");
    const copy = `<button class="gb-button" data-copy>${ICONS.copy}Copy prompt</button>`;
    return `<details class="gb-prompt"${open}><summary>${faIcon(attrs.icon) || ICONS.prompt}<span>${esc(attrs.description || "Prompt")}</span>${copy}</summary><pre>${esc(prompt)}</pre></details>`;
  },
  async details({ attrs, children }, env) {
    const summary = children.find((c) => c.name === "summary");
    const rest = children.filter((c) => c !== summary);
    const title = summary ? (await body(summary.children, env)).replace(/^<p>([\s\S]*)<\/p>\s*$/, "$1") : "Details";
    return `<details class="gb-details"${attrs.open ? " open" : ""}><summary>${title}</summary><div class="gb-body">${await body(rest, env)}</div></details>`;
  },
  async stepper(node, env) {
    const steps = (await items(node, "step", env)).map(
      (s, i) => `<div class="gb-step"><div class="gb-step-num">${i + 1}</div><div class="gb-body">${s.html}</div></div>`
    );
    return `<div class="gb-stepper">${steps.join("")}</div>`;
  },
  async columns(node, env) {
    const columns = (await items(node, "column", env)).map(({ attrs, html }) => {
      // GitBook snaps columns to a 12-part grid.
      const percent = /^[\d.]+%$/.test(attrs.width || "") ? parseFloat(attrs.width) : 50;
      return { html, span: Math.min(11, Math.max(1, Math.round((percent * 12) / 100))), sized: Boolean(attrs.width) };
    });
    // Columns without a width share what is left.
    const free = columns.filter((c) => !c.sized);
    const left = 12 - columns.reduce((sum, c) => sum + (c.sized ? c.span : 0), 0);
    const span = (c) => (c.sized ? c.span : Math.max(1, Math.round(left / free.length)));
    return `<div class="gb-columns">${columns
      .map((c) => `<div class="gb-column gb-body" style="--span: ${span(c)}">${c.html}</div>`)
      .join("")}</div>`;
  },
  async updates(node, env) {
    const updates = (await items(node, "update", env)).map(({ attrs, html }) => {
      const tags = (attrs.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
      const pills = tags.map((t) => `<span class="gb-tag">${esc(t[0].toUpperCase() + t.slice(1))}</span>`).join("");
      const date = new Date(`${attrs.date}T00:00Z`);
      const style = DATES[node.attrs.format] || DATES.full;
      const shown = isNaN(date) ? attrs.date : date.toLocaleDateString("en-US", { ...style, timeZone: "UTC" });
      return `<div class="gb-update"><div class="gb-update-meta"><time>${esc(shown)}</time>${pills && `<div class="gb-tags">${pills}</div>`}</div><div class="gb-body">${html}</div></div>`;
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

/* ---------- Code highlighting ---------- */

// Shiki with CSS variables, as GitBook does. Colours are in theme.css.
let shiki;
async function highlight(code, language) {
  shiki ??= import("shiki");
  const { bundledLanguages, codeToTokensBase, createCssVariablesTheme } = await shiki;
  if (!(language in bundledLanguages)) return undefined;
  if (!highlight.theme) {
    const theme = (highlight.theme = createCssVariablesTheme());
    const rule = (name, scope) => ({ scope, settings: { foreground: `var(--shiki-token-${name})` } });
    theme.tokenColors.push(
      // Shell flags, pipes and quotes, coloured as on docs.filecoin.io.
      rule("constant", ["constant.other.option"]),
      rule("punctuation", ["keyword.operator.pipe", "keyword.operator.redirect", "keyword.operator.logical.shell", "punctuation.definition.string"])
    );
  }
  const lines = await codeToTokensBase(code.replace(/\n$/, ""), { lang: language, theme: highlight.theme });
  return lines
    .map((line) => {
      const tokens = line.map(({ content, color }) =>
        !color || color === "var(--shiki-foreground)" ? esc(content) : `<span style="color:${color}">${esc(content)}</span>`
      );
      return `<span class="line">${tokens.join("")}</span>`;
    })
    .join("\n");
}

/* ---------- Plugin ---------- */

const FONTS = {
  "inter.woff2": "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  "inter-italic.woff2": "@fontsource-variable/inter/files/inter-latin-wght-italic.woff2",
  "plex-mono.woff2": "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
  "plex-mono-bold.woff2": "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff2",
};

// Path -> date of the last commit that changed it. Commits without parents are
// skipped: in a shallow clone they list every file, whenever it changed.
function lastUpdated(root) {
  const dates = {};
  let log;
  try {
    const args = ["-c", "core.quotePath=false", "log", "--format=%x00%cI %p", "--name-only", "--relative", "--", "*.md"];
    log = execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return dates;
  }
  for (const commit of log.split("\0").slice(1)) {
    const [head, ...files] = commit.split("\n");
    const [date, parent] = head.split(" ");
    if (parent) for (const file of files) if (file) dates[file] ??= date;
  }
  return dates;
}

const stashes = new Map();

module.exports = {
  book: { assets: "./assets", css: ["theme.css"], js: ["theme.js"] },
  blocks: {
    // HonKit calls this for every code element, inline ones included.
    code: async function ({ body, kwargs = {} }) {
      const html = kwargs.language && (await highlight(body, kwargs.language.toLowerCase()));
      return html ? { body: html, html: true } : { body, html: false };
    },
  },
  hooks: {
    init: function () {
      this.config.set("pluginsConfig.gitbook-preview.updated", lastUpdated(this.resolve("")));
      this.config.set("pluginsConfig.gitbook-preview.icons", pageIcons(this));
    },
    "finish:before": function () {
      const dir = path.join(this.output.root(), "gitbook/fonts");
      fs.mkdirSync(dir, { recursive: true });
      for (const name in FONTS) fs.copyFileSync(require.resolve(FONTS[name]), path.join(dir, name));
      const katexDir = path.join(this.output.root(), "gitbook/katex");
      fs.cpSync(path.dirname(require.resolve("katex/dist/katex.min.css")), katexDir, {
        recursive: true,
        filter: (src) => /dist$|fonts$|katex\.min\.css$|\.woff2$/.test(src),
      });
    },
    "page:before": async function (page) {
      const stash = [];
      stashes.set(page.path, stash);
      const hold = (kind, html) => `gb${kind}${stash.push(html) - 1}x`;
      const env = { book: this, page, stash, hold };
      page.content = await toMarkdown(parse(page.content.replace(/\r\n?/g, "\n")).children, env, false);
      return page;
    },
    page: function (page) {
      const icons = this.config.get("pluginsConfig.gitbook-preview.icons", {});
      page.content = uniqueHeadingIds(addIcons(fill(page.content, stashes.get(page.path) || []), icons[page.path]));
      return page;
    },
  },
};
