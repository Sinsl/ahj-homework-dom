/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "img/2dbd01ce16c0fa83cb67.png";
;// CONCATENATED MODULE: ./src/js/Game/Goblin.js

class Goblin {
  constructor() {
    this.element = document.createElement("img");
    this.element.classList.add("goblin");
    this.element.src = goblin_namespaceObject;
  }
}
;// CONCATENATED MODULE: ./src/js/Game/GameField.js

class GameField {
  constructor() {
    this.field = document.querySelector(".game-field");
    this.size = 4;
    this.arrCell = [];
    this.goblin = new Goblin();
    this.prevPosition = null;
  }
  createCell() {
    const cell = document.createElement("li");
    cell.classList.add("game-field_cell");
    return cell;
  }
  renderingField() {
    for (let i = 0; i < Math.pow(this.size, 2); i++) {
      const li = this.createCell();
      this.arrCell.push(li);
      this.field.append(li);
    }
  }
  generateIndex() {
    let index = -1;
    const max = Math.pow(this.size, 2);
    do {
      index = Math.floor(Math.random() * max);
    } while (index === this.prevPosition);
    return index;
  }
  removeGoblin() {
    if (this.prevPosition) {
      const goblin = this.arrCell[this.prevPosition].querySelector("img");
      goblin.remove();
    }
  }
  addGoblin() {
    const index = this.generateIndex();
    this.arrCell[index].append(this.goblin.element);
    this.prevPosition = index;
  }
}
;// CONCATENATED MODULE: ./src/js/taskTable/data.js
/* eslint-disable prettier/prettier */
function getData() {
  return [{
    "id": 26,
    "title": "Побег из Шоушенка",
    "imdb": 9.30,
    "year": 1994
  }, {
    "id": 25,
    "title": "Крёстный отец",
    "imdb": 9.20,
    "year": 1972
  }, {
    "id": 27,
    "title": "Крёстный отец 2",
    "imdb": 9.00,
    "year": 1974
  }, {
    "id": 1047,
    "title": "Тёмный рыцарь",
    "imdb": 9.00,
    "year": 2008
  }, {
    "id": 223,
    "title": "Криминальное чтиво",
    "imdb": 8.90,
    "year": 1994
  }];
}
;// CONCATENATED MODULE: ./src/js/taskTable/TableFirst.js

class TableFirst {
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
    this.arrHeaderCell.forEach(item => this.arrKeys.push(item.textContent));
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
    data.forEach(item => {
      const rowTable = document.createElement("tr");
      rowTable.dataset.id = item.id;
      rowTable.dataset.title = item.title;
      rowTable.dataset.year = item.year;
      rowTable.dataset.imdb = item.imdb;
      rowTable.insertAdjacentHTML("beforeend", `<td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>`);
      arrElem.push(rowTable);
      this.drawTable(arrElem);
    });
  }
  drawTable(arrElem) {
    arrElem.forEach(item => this.tbody.append(item));
  }
  clearTable() {
    const arrElem = Array.from(this.tbody.children);
    arrElem.forEach(item => item.remove());
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
    this.sortCounter === 7 ? this.sortCounter = 0 : this.sortCounter++;
  }
}
;// CONCATENATED MODULE: ./src/js/taskTable/TableSecond.js

class TableSecond {
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
    this.arrHeaderCell.forEach(item => this.arrKeys.push(item.textContent));
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
    data.forEach(item => {
      const rowTable = document.createElement("tr");
      rowTable.insertAdjacentHTML("beforeend", `<td>${item.id}</td>
        <td>${item.title}</td>
        <td>(${item.year})</td>
        <td>imdb: ${item.imdb.toFixed(2)}</td>`);
      arrElem.push(rowTable);
    });
    arrElem.forEach(item => this.tbody.append(item));
  }
  clearTable() {
    const arrElem = Array.from(this.tbody.children);
    arrElem.forEach(item => item.remove());
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
    this.sortCounter === 7 ? this.sortCounter = 0 : this.sortCounter++;
  }
}
;// CONCATENATED MODULE: ./src/js/app.js
// TODO: write code here



const gameField = new GameField();
gameField.renderingField();
gameField.addGoblin();
setInterval(() => {
  gameField.removeGoblin();
  gameField.addGoblin();
}, 2000);
const table1 = new TableFirst();
table1.createTable();
setInterval(() => {
  table1.sortRow();
}, 3000);
const table2 = new TableSecond();
table2.createTable();
setInterval(() => {
  table2.sortRow();
}, 3000);
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;