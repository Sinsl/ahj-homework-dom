import Goblin from "./Goblin";
export default class GameField {
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
