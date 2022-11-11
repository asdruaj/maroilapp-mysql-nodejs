window.addEventListener("load", () => {
  if (localStorage.getItem("mode") == "light") {
    document.body.classList.toggle("light-theme-variables");
  }
});

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.remove("no-sidebar");
  sideMenu.classList.add("sidebar-visible");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("sidebar-visible");
  sideMenu.classList.add("no-sidebar");
});

class DataTable {
  element;
  headers;
  items;
  copyItems;
  selected;
  selectedId;
  pagination;
  numberOfEntries;
  headerButtons;

  constructor(selector, headerButtons) {
    this.element = document.querySelector(selector);

    this.headers = [];
    this.items = [];
    this.pagination = {
      total: 0,
      noItemsPerPage: 0,
      noPages: 0,
      actual: 0,
      pointer: 0,
      diff: 0,
      lastPageBeforeDots: 0,
      noButtonsBeforeDots: 4,
    };

    this.selected = [];
    this.numberOfEntries = 6;
    this.headerButtons = headerButtons;
  }

  parse() {
    const headers = [...this.element.querySelector("thead tr").children];
    const trs = [...this.element.querySelector("tbody").children];

    headers.forEach((element) => {
      this.headers.push(element.textContent);
    });

    trs.forEach((tr) => {
      const cells = [...tr.children];

      const item = {
        values: [],
      };

      cells.forEach((cell) => {
        if (cell.children.length > 0) {
          const statusElement = [...cell.children][0];
          const status = statusElement.getAttribute("class");

          if (status != null) {
            item.values.push(`<span class='${status}'>${status}</span>`);
          }
        } else {
          item.values.push(cell.textContent);
        }
      });

      this.items.push(item);
    });

    console.log(this.items);

    this.makeTable();
  }

  makeTable() {
    this.copyItems = [...this.items];

    this.initPagination(this.items.length, this.numberOfEntries);

    const container = document.createElement("div");
    container.id = "datatable";
    this.element.innerHTML = "";
    this.element.replaceWith(container);
    this.element = container;

    this.createHTML();
    this.renderHeaders();
    this.renderRows();
    this.renderPagesButtons();
    this.renderHeaderButtons();
    this.renderSearch();
  }

  initPagination(total, entries) {
    this.pagination.total = total;
    this.pagination.noItemsPerPage = entries;
    this.pagination.noPages = Math.ceil(
      this.pagination.total / this.pagination.noItemsPerPage
    );
    this.pagination.actual = 1;
    this.pagination.pointer = 0;
    this.pagination.diff =
      this.pagination.noItemsPerPage -
      (this.pagination.total % this.pagination.noItemsPerPage);
  }

  createHTML() {
    this.element.innerHTML = `
      <div class ="datatable-container">
        <div class="header-tools">
          <div class ="tools">
            <ul class="header-buttons-container">
            </ul>
          </div>
          <div class="search">
            <input type="text" class="search-input">
          </div>
        </div>
        <table class="datatable" id="datatable">
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <div class="footer-tools">
          <div class="list-items">
          </div>

          <div class="pages">
          </div>
        </div>
      </div>
      `;
  }

  renderHeaders() {
    this.element.querySelector("thead tr").innerHTML = "";

    this.headers.forEach((header) => {
      this.element.querySelector("thead tr").innerHTML += `<th>${header}</th>`;
    });
  }
  renderRows() {
    this.element.querySelector("tbody").innerHTML = "";

    let i = 0;
    const { pointer, total } = this.pagination;
    const limit = this.pagination.actual * this.pagination.noItemsPerPage;

    for (i = pointer; i < limit; i++) {
      if (i == total) break;

      const { values } = this.copyItems[i];
      const checked = this.isChecked(values[0]);
      let data = "";

      data += `<td class="table-checkbox">
                    <input type="checkbox" id="checkbox${
                      values[0]
                    }" class="datatable-checkbox" data-id="${
        values[0]
      }" name="id[${values[0].trim()}]" value="${values[0].trim()}" ${
        checked ? "checked" : ""
      } </>
        </td><td><form method="get" action="/reports/edit/${Number(
          values[0]
        )}"><button class="bEdit" type="submit"><i class="material-icons edit">edit</i></button></form></td>`;

      values.forEach((cell) => {
        data += `<td><label for="checkbox${values[0]}">${cell}</label></td>`;
      });
      this.element.querySelector(
        "tbody"
      ).innerHTML += `<tr class="row">${data}</tr>`;

      // listener para el checkbox
      document.querySelectorAll(".datatable-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("click", (e) => {
          const element = e.target;
          const id = element.getAttribute("data-id");
          if (element.checked) {
            const item = this.getItem(id);
            this.selected.push(item);
          } else {
            this.removeSelected(id);
          }

          this.selectedId = this.selected.map((a) => a.values[0]);
          console.log(this.selectedId);
        });
      });
    }
  }
  isChecked(id) {
    const items = this.selected;
    let res = false;

    if (items.length === 0) return false;

    items.forEach((item) => {
      if (item.values[0] === id) res = true;
    });

    return res;
  }

  getItem(id) {
    const res = this.items.filter((item) => item.values[0] == id);
    if (res.length == 0) return null;
    return res[0];
  }
  removeSelected(id) {
    const res = this.selected.filter((item) => item.values[0] !== id);
    this.selected = [...res];
  }

  renderPagesButtons() {
    const pagesContainer = this.element.querySelector(".pages");
    let pages = "";

    const buttonsToShow = this.pagination.noButtonsBeforeDots;
    const actualIndex = this.pagination.actual;

    let inferiorLimit = Math.max(actualIndex - 2, 1);
    let superiorLimit = Math.min(actualIndex + 2, this.pagination.noPages);
    const missingButtons = buttonsToShow - (superiorLimit - inferiorLimit);

    if (Math.max(inferiorLimit - missingButtons, 0)) {
      inferiorLimit = inferiorLimit - missingButtons;
    } else if (
      Math.min(superiorLimit + missingButtons, this.pagination.noPages) !==
      this.pagination.noPages
    ) {
      superiorLimit = superiorLimit + missingButtons;
    }

    if (superiorLimit < this.pagination.noPages - 2) {
      pages += this.getIteratedButtons(inferiorLimit, superiorLimit);
      pages += `<li>...</li>`;
      pages += this.getIteratedButtons(
        this.pagination.noPages - 1,
        this.pagination.noPages
      );
    } else {
      pages += this.getIteratedButtons(inferiorLimit, this.pagination.noPages);
    }

    pagesContainer.innerHTML = `<ul>${pages}</ul>`;

    this.element.querySelectorAll(".pages li button").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.pagination.actual = parseInt(e.target.getAttribute("data-page"));
        this.pagination.pointer =
          this.pagination.actual * this.pagination.noItemsPerPage -
          this.pagination.noItemsPerPage;
        this.renderRows();
        this.renderPagesButtons();
      });
    });
  }

  getIteratedButtons(start, end) {
    let res = "";
    for (let i = start; i <= end; i++) {
      if (i == this.pagination.actual) {
        res += `<li><span class="active">${i}</span></li>`;
      } else {
        res += `<li><button data-page="${i}">${i}</button></li>`;
      }
    }
    return res;
  }
  renderHeaderButtons() {
    let html = "";
    const buttonsContainer = this.element.querySelector(
      ".header-buttons-container"
    );
    const headerButtons = this.headerButtons;

    headerButtons.forEach((button) => {
      html += `<form id="${button.id}-form"><li> <button id="${button.id}" type="submit"><i class="material-icons">${button.icon}</i></button></li></form>`;
    });

    buttonsContainer.innerHTML = html;
    document.getElementById("bAdd").setAttribute("type", "button");
    headerButtons.forEach((button) => {
      document
        .querySelector("#" + button.id)
        .addEventListener("click", button.action);
    });
  }
  renderSearch() {
    this.element
      .querySelector(".search-input")
      .addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();

        if (query == "") {
          this.copyItems = [...this.items];
          this.initPagination(this.copyItems.length, this.numberOfEntries);
          this.renderRows();
          this.renderPagesButtons();
          return;
        }
        this.search(query);

        this.initPagination(this.copyItems.length, this.numberOfEntries);
        this.renderRows();
        this.renderPagesButtons();
      });
  }
  search(query) {
    let res = [];

    this.copyItems = [...this.items];

    for (let i = 0; i < this.copyItems.length; i++) {
      const { id, values } = this.copyItems[i];
      const row = values;

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];

        if (cell.toLowerCase().indexOf(query) >= 0) {
          res.push(this.copyItems[i]);
          break;
        }
      }
    }

    this.copyItems = [...res];
  }
}
