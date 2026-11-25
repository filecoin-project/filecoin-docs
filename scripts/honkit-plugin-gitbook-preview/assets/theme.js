(function () {
  // Fetched only on pages that contain a diagram.
  var MERMAID = "https://cdn.jsdelivr.net/npm/mermaid@12.3.0/dist/mermaid.esm.min.mjs";
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
  document.querySelector(".theme-toggle").onclick = function () {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch (e) {}
  };
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
    var sidebar = document.querySelector(".sidebar");
    var offset = active.getBoundingClientRect().top - sidebar.getBoundingClientRect().top;
    if (offset > sidebar.clientHeight - 80) sidebar.scrollTop = offset - sidebar.clientHeight / 2;

    var crumb = document.querySelector(".breadcrumb");
    var parents = [];
    for (var li = active.parentElement.closest("li"); li; li = li.parentElement.closest("li")) {
      parents.unshift(li.querySelector(".nav-row").firstElementChild.cloneNode(true));
    }
    var heading = active.closest(".sidebar nav > ul").previousElementSibling;
    if (heading && heading.matches(".nav-heading")) parents.unshift(el("span", "", heading.textContent));
    parents.forEach(function (node) {
      crumb.appendChild(el("span")).appendChild(node);
    });
  }

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
  all(".gb-lines pre > code").forEach(function (code) {
    var lines = code.textContent.replace(/\n$/, "").split("\n");
    code.textContent = "";
    lines.forEach(function (line, i) {
      code.append(el("span", "gb-line", line), i < lines.length - 1 ? "\n" : "");
    });
  });
  all("pre", content).forEach(function (pre) {
    var wrap = el("div", "code-wrap");
    var copy = el("button", "copy", "Copy");
    pre.replaceWith(wrap);
    wrap.append(pre, copy);
    copy.onclick = function () {
      navigator.clipboard.writeText(pre.textContent.replace(/\n$/, "")).then(function () {
        copy.textContent = "Copied";
        setTimeout(function () {
          copy.textContent = "Copy";
        }, 1500);
      });
    };
  });

  /* On this page */
  var headings = all("h2[id], h3[id], h4[id]", content).filter(function (h) {
    return !h.closest(".tab-content:not(.active)");
  });
  var toc = document.querySelector(".toc");
  if (headings.length) {
    toc.append(el("div", "toc-title", "On this page"));
    var links = headings.map(function (h) {
      var link = el("a", h.tagName === "H2" ? "" : "sub", h.textContent.trim());
      link.href = "#" + h.id;
      toc.append(link);
      return link;
    });
    var update = function () {
      var current = 0;
      headings.forEach(function (h, i) {
        if (h.getBoundingClientRect().top < 120) current = i;
      });
      links.forEach(function (link, i) {
        link.classList.toggle("current", i === current);
      });
    };
    addEventListener("scroll", update, { passive: true });
    update();
  }
})();
