function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
class Cell {
  constructor(cellType) {
    this.value = cellType;
    this.row = null;
    this.col = null;
    this.distance = null;
    this.pred = null;
    this.pathingColor = "white";
    this.height = null;
  }

  getColor() {
    if (this.value == "#") {
      return "#000000";
    } else if (this.value == " ") {
      return "#FFFFFF";
    } else if (this.value == "S") {
      return "#008000";
    } else if (this.value == "E") {
      return "#FF0000";
    } else if (this.value == "P") {
      return "#800080";
    } else {
      return "#FFF00";
    }
  }
  setPos(row, col) {
    this.row = row;
    this.col = col;
  }
  getNeighbours() {
    row = this.row;
    col = this.col;
    return [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1]
    ];
  }
  setDistance(distance) {
    this.distance = distance;
  }
  getDistance() {
    return this.distance;
  }
  setPathfindingColor(color) {
    this.pathingColor = color;
  }
  getPathfindingColor() {
    return this.pathingColor;
  }
  setPred(pred) {
    this.pred = pred;
  }
  getPred() {
    return this.pred;
  }
  setHeight(height) {
    this.height = height;
  }
  getHeight() {
    return this.height;
  }
}
