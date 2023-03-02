// TODO: write code here
import GameField from "./Game/GameField";
import TableFirst from "./taskTable/TableFirst";
import TableSecond from "./taskTable/TableSecond";

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
