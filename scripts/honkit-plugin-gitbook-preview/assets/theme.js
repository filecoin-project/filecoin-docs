(function () {
  // Fetched only on pages that contain a diagram.
  var MERMAID = "https://cdn.jsdelivr.net/npm/mermaid@11.12.2/dist/mermaid.esm.min.mjs";
  var root = document.documentElement;
  var content = document.querySelector(".content");
  var all = function (selector, from) {
    return Array.from((from || document).querySelectorAll(selector));
  };
  var el = function (tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  /* Header and sidebar */
  var themes = all("[data-theme-value]");
  var setTheme = function (value) {
    var dark = value === "system" ? matchMedia("(prefers-color-scheme: dark)").matches : value === "dark";
    root.dataset.theme = dark ? "dark" : "light";
    themes.forEach(function (button) {
      button.setAttribute("aria-pressed", button.dataset.themeValue === value);
    });
  };
  var saved;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {}
  setTheme(saved === "dark" || saved === "system" ? saved : "light");
  themes.forEach(function (button) {
    button.onclick = function () {
      setTheme(button.dataset.themeValue);
      try {
        localStorage.setItem("theme", button.dataset.themeValue);
      } catch (e) {}
    };
  });
  document.querySelector(".menu-toggle").onclick = function () {
    document.body.classList.toggle("nav-open");
  };
  all(".nav-toggle").forEach(function (button) {
    button.onclick = function () {
      button.closest("li").classList.toggle("open");
    };
  });
  var active = document.querySelector(".sidebar .active");
  if (active) {
    var sidebar = document.querySelector(".sidebar nav");
    var offset = active.getBoundingClientRect().top - sidebar.getBoundingClientRect().top;
    if (offset > sidebar.clientHeight - 80) sidebar.scrollTop = offset - sidebar.clientHeight / 2;

    var crumb = document.querySelector(".breadcrumb");
    var parents = [];
    for (var li = active.parentElement.closest("li"); li; li = li.parentElement.closest("li")) {
      parents.unshift(li.querySelector(".nav-row").firstElementChild.cloneNode(true));
    }
    var heading = active.closest(".sidebar nav > ul").previousElementSibling;
    if (heading && heading.matches(".nav-heading")) {
      var section = el("a", "", heading.textContent);
      section.href = heading.nextElementSibling.querySelector("a").href;
      parents.unshift(section);
    }
    parents.forEach(function (node) {
      crumb.appendChild(el("span")).appendChild(node);
    });
  }

  /* Footer: the sidebar and theme switch stay above it */
  var footer = document.querySelector(".site-footer");
  var fitFooter = function () {
    root.style.setProperty("--footer", Math.max(0, root.clientHeight - footer.getBoundingClientRect().top) + "px");
  };
  addEventListener("scroll", fitFooter, { passive: true });
  addEventListener("resize", fitFooter);
  new ResizeObserver(fitFooter).observe(document.body);

  /* Last updated */
  all(".last-updated time").forEach(function (time) {
    var date = new Date(time.dateTime);
    var days = (Date.now() - date) / 864e5;
    var units = [["year", 365], ["month", 30], ["day", 1], ["hour", 1 / 24], ["minute", 1 / 1440]];
    var unit =
      units.find(function (u) {
        return days >= u[1];
      }) || units[4];
    time.title = date.toLocaleString();
    time.textContent = new Intl.RelativeTimeFormat("en").format(-Math.floor(days / unit[1]), unit[0]);
  });

  /* Page description, below the title */
  var h1 = content.querySelector("h1");
  if (h1 && content.dataset.description) h1.after(el("p", "description", content.dataset.description));

  /* Cards */
  all('table[data-view="cards"]', content).forEach(function (table) {
    var columns = all("thead th", table);
    var grid = el("div", "cards" + (table.dataset.cardSize === "large" ? " large" : ""));
    all("tbody tr", table).forEach(function (row) {
      var card = el("div", "card");
      var body = el("div", "card-body");
      Array.from(row.cells).forEach(function (cell, i) {
        var column = columns[i] || el("th");
        var link = cell.querySelector("a");
        if (column.hasAttribute("data-card-cover")) {
          var image = cell.querySelector("img") || el("img");
          if (link) image.src = link.href;
          image.className = "card-cover";
          if (image.src) card.prepend(image);
        } else if (column.hasAttribute("data-card-target")) {
          if (!link) return;
          var overlay = el("a", "card-link");
          overlay.href = link.href;
          if (link.target) overlay.target = link.target;
          overlay.setAttribute("aria-label", row.cells[0].textContent.trim());
          card.append(overlay);
        } else if (!column.hasAttribute("data-hidden") && cell.innerHTML.trim()) {
          var part = el("div");
          part.append.apply(part, Array.from(cell.childNodes));
          body.append(part);
        }
      });
      card.append(body);
      grid.append(card);
    });
    table.replaceWith(grid);
  });
  all("table", content).forEach(function (table) {
    var wrap = el("div", "table-wrap");
    table.style.minWidth = (table.rows[0] ? table.rows[0].cells.length : 1) * 110 + "px";
    table.replaceWith(wrap);
    wrap.append(table);
  });

  /* Tabs */
  all(".tabs-container").forEach(function (container) {
    var tabs = Array.from(container.firstElementChild.children);
    var panes = Array.from(container.lastElementChild.children);
    tabs.forEach(function (tab, i) {
      tab.onclick = function () {
        tabs.forEach(function (t, j) {
          t.classList.toggle("active", i === j);
          t.setAttribute("aria-selected", i === j);
          panes[j].classList.toggle("active", i === j);
        });
      };
    });
  });

  /* Mermaid */
  var diagrams = all("pre > code.lang-mermaid");
  if (diagrams.length) {
    import(MERMAID)
      .then(function (m) {
        m.default.initialize({ startOnLoad: false, theme: root.dataset.theme === "dark" ? "dark" : "default" });
        // One at a time; a bad diagram leaves its source visible.
        return diagrams.reduce(function (done, code, i) {
          return done
            .then(function () {
              return m.default.render("gb-mermaid-" + i, code.textContent);
            })
            .then(function (result) {
              var div = el("div", "gb-mermaid");
              div.innerHTML = result.svg;
              code.closest(".code-wrap").replaceWith(div);
            })
            .catch(function (err) {
              console.warn("Mermaid diagram not rendered:", err);
            });
        }, Promise.resolve());
      })
      .catch(function (err) {
        console.warn("Mermaid could not be loaded:", err);
      });
  }

  /* Code blocks */
  all(".gb-lines pre > code:not(:has(.line))").forEach(function (code) {
    var lines = code.textContent.replace(/\n$/, "").split("\n");
    code.textContent = "";
    lines.forEach(function (line, i) {
      code.append(el("span", "line", line), i < lines.length - 1 ? "\n" : "");
    });
  });
  var copyText = function (button, text) {
    var label = button.lastChild;
    var before = label.textContent;
    navigator.clipboard.writeText(text.replace(/\n$/, "")).then(function () {
      label.textContent = "Copied";
      setTimeout(function () {
        label.textContent = before;
      }, 1500);
    });
  };
  all("[data-copy]", content).forEach(function (button) {
    button.onclick = function (event) {
      event.preventDefault();
      copyText(button, button.closest("details").querySelector("pre").textContent);
    };
  });
  all("pre:not(.gb-prompt > pre)", content).forEach(function (pre) {
    var wrap = el("div", "code-wrap");
    var copy = el("button", "gb-button copy", "Copy");
    pre.replaceWith(wrap);
    wrap.append(pre, copy);
    copy.onclick = function () {
      copyText(copy, pre.textContent);
    };
  });

  /* Footnotes: GitBook shows them as annotations on the text before them */
  all('sup > a[href^="#fn_"]', content).forEach(function (ref) {
    var note = document.getElementById(ref.getAttribute("href").slice(1));
    var sup = ref.parentElement;
    var target = sup.previousSibling;
    if (!note || !target) return;
    if (target.nodeType === 3) {
      target = target.splitText(target.length - target.data.match(/\S*\s*$/)[0].length);
    }
    var term = el("dfn", "annotation");
    var popup = el("span", "annotation-note");
    Array.from(note.childNodes).forEach(function (node) {
      if (node.nodeType === 1 && (node.matches("sup") || node.matches('[href^="#reffn_"]'))) return;
      popup.append(node.cloneNode(true));
    });
    popup.normalize();
    if (popup.firstChild) popup.firstChild.textContent = popup.firstChild.textContent.replace(/^\s*\.\s*/, "");
    target.replaceWith(term);
    term.append(target, popup);
    term.tabIndex = 0;
    sup.remove();
    note.remove();
  });

  /* On this page */
  var headings = all("h2[id], h3[id], h4[id]", content).filter(function (h) {
    return !h.closest(".tab-content:not(.active)");
  });
  var toc = document.querySelector(".toc");
  if (headings.length) {
    var title = el("div", "toc-title", "On this page");
    title.insertAdjacentHTML(
      "afterbegin",
      '<svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M1 2h.5M1 6h.5M1 10h.5M4 2h7M4 6h7M4 10h7"/></svg>'
    );
    toc.append(title);
    var top = Math.min.apply(
      null,
      headings.map(function (h) {
        return +h.tagName[1];
      })
    );
    var links = headings.map(function (h) {
      var link = el("a", +h.tagName[1] === top ? "" : "sub", h.textContent.trim());
      link.href = "#" + h.id;
      toc.append(link);
      return link;
    });
    var update = function () {
      var current = 0;
      headings.forEach(function (h, i) {
        if (h.getBoundingClientRect().top < 120) current = i;
      });
      // The last sections may be too short to reach the top.
      if (scrollY > 0 && scrollY + innerHeight >= root.scrollHeight - 2) current = headings.length - 1;
      links.forEach(function (link, i) {
        link.classList.toggle("current", i === current);
      });
    };
    addEventListener("scroll", update, { passive: true });
    update();
  }
})();
