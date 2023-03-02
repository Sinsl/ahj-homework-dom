import getData from "./data";

export default class TableSecond {
  constructor() {
    this.table = document.querySelector(".table-2");
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
    let data = JSON.parse(localStorage.getItem("films"));
    if (!data) {
      data = getData();
      localStorage.films = JSON.stringify(data);
    }
    this.drawTable(data);
  }

  drawTable(data) {
    const arrElem = [];
    data.forEach((item) => {
      const rowTable = document.createElement("tr");
      rowTable.insertAdjacentHTML(
        "beforeend",
        `<td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>`
      );
      arrElem.push(rowTable);
    });
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
    const arrElem = JSON.parse(localStorage.films);
    this.clearTable();
    let idx = this.sortCounter / 2;
    if (this.sortCounter % 2) {
      idx = Math.floor(idx);
      const attr = this.arrKeys[idx];
      if (attr === "title") {
        arrElem.sort((a, b) => {
          if (a[attr] > b[attr]) {
            return -1;
          }
          if (a[attr] < b[attr]) {
            return 1;
          }
          return 0;
        });
      } else {
        arrElem.sort((a, b) => b[attr] - a[attr]);
      }
      this.arrHeaderCell[idx].append(this.arrowUp);
    } else {
      const attr = this.arrKeys[idx];
      if (attr === "title") {
        arrElem.sort((a, b) => {
          if (a[attr] < b[attr]) {
            return -1;
          }
          if (a[attr] > b[attr]) {
            return 1;
          }
          return 0;
        });
      } else {
        arrElem.sort((a, b) => a[attr] - b[attr]);
      }
      this.arrHeaderCell[idx].append(this.arrowDown);
    }
    this.drawTable(arrElem);
    this.sortCounter === 7 ? (this.sortCounter = 0) : this.sortCounter++;
  }
}
