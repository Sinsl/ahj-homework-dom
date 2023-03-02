import getData from "./data";

export default class TableFirst {
  constructor() {
    this.table = document.querySelector(".table-1");
    this.sortCounter = 0;
    this.tbody = this.table.querySelector("tbody");
    this.arrowUp = null;
    this.arrowDown = null;
    this.arrKeys = [];
    this.arrHeaderCell = Array.from(this.table.querySelectorAll("th"));
    this.init();
  }

  init() {
    this.arrHeaderCell.forEach((item) => this.arrKeys.push(item.textContent));
    this.arrowUp = document.createElement("span");
    this.arrowUp.classList.add("arrow");
    this.arrowUp.innerHTML = "&#8593;";
    this.arrowDown = document.createElement("span");
    this.arrowDown.classList.add("arrow");
    this.arrowDown.innerHTML = "&#8595;";
  }

  createTable() {
    const data = getData();
    const arrElem = [];
    data.forEach((item) => {
      const rowTable = document.createElement("tr");
      rowTable.dataset.id = item.id;
      rowTable.dataset.title = item.title;
      rowTable.dataset.year = item.year;
      rowTable.dataset.imdb = item.imdb;
      rowTable.insertAdjacentHTML(
        "beforeend",
        `<td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>`
      );
      arrElem.push(rowTable);
      this.drawTable(arrElem);
    });
  }

  drawTable(arrElem) {
    arrElem.forEach((item) => this.tbody.append(item));
  }

  clearTable() {
    const arrElem = Array.from(this.tbody.children);
    arrElem.forEach((item) => item.remove());
    const span = this.table.querySelector("span.arrow");
    if (span) {
      span.remove();
    }
  }

  sortRow() {
    const arrElem = Array.from(this.tbody.children);
    this.clearTable();
    let idx = this.sortCounter / 2;
    if (this.sortCounter % 2) {
      idx = Math.floor(idx);
      const attr = this.arrKeys[idx];
      if (attr === "title") {
        arrElem.sort((a, b) => {
          if (a.dataset[attr] > b.dataset[attr]) {
            return -1;
          }
          if (a.dataset[attr] < b.dataset[attr]) {
            return 1;
          }
          return 0;
        });
      } else {
        arrElem.sort((a, b) => b.dataset[attr] - a.dataset[attr]);
      }
      this.arrHeaderCell[idx].append(this.arrowUp);
    } else {
      const attr = this.arrKeys[idx];
      if (attr === "title") {
        arrElem.sort((a, b) => {
          if (a.dataset[attr] < b.dataset[attr]) {
            return -1;
          }
          if (a.dataset[attr] > b.dataset[attr]) {
            return 1;
          }
          return 0;
        });
      } else {
        arrElem.sort((a, b) => a.dataset[attr] - b.dataset[attr]);
      }
      this.arrHeaderCell[idx].append(this.arrowDown);
    }
    this.drawTable(arrElem);
    this.sortCounter === 7 ? (this.sortCounter = 0) : this.sortCounter++;
  }
}
