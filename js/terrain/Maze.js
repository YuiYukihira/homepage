class Maze {
  constructor() {
    this.contents = [];
    this.start = null;
    this.end = null;
  }

  initContents(desiredRes) {
    for (let i = 0; i < desiredRes; i++) {
      this.contents.push([]);
      for (let j = 0; j < desiredRes; j++) {
        if (i == 0 || i == desiredRes - 1 || j == 0 || j == desiredRes - 1) {
          let cell = new Cell("#");
          cell.setPos(i, j);
          this.contents[i].push(cell);
        } else {
          let cell = new Cell(" ");
          cell.setPos(i, j);
          this.contents[i].push(cell);
        }
      }
    }
  }

  generator([x1, x2], [y1, y2], desiredRes) {
    let width = x2 - x1;
    let height = y2 - y1;
    if (width >= height) {
      // vertical bisection
      if (x2 - x1 > 3) {
        let bisection = Math.ceil((x1 + x2) / 2);
        let max = y2 - 1;
        let min = y1 + 1;
        let randomPassage = Math.floor(Math.random() * (max - min + 1)) + min;
        let first = false;
        let second = false;
        if (this.contents[y2][bisection].value == " ") {
          randomPassage = max;
          first = true;
        }
        if (this.contents[y1][bisection].value == " ") {
          randomPassage = min;
          second = true;
        }
        for (let i = y1 + 1; i < y2; i++) {
          if (first && second) {
            if (i == max || i == min) {
              continue;
            }
          } else if (i == randomPassage) {
            continue;
          }
          this.contents[i][bisection].value = "#";
        }
        this.generator([x1, bisection], [y1, y2], desiredRes);
        this.generator([bisection, x2], [y1, y2], desiredRes);
      }
    } else {
      // horizontal bisection
      if (y2 - y1 > 3) {
        let bisection = Math.ceil((y1 + y2) / 2);
        let max = x2 - 1;
        let min = x1 + 1;
        let randomPassage = Math.floor(Math.random() * (max - min + 1)) + min;
        let first = false;
        let second = false;
        if (this.contents[bisection][x2].value == " ") {
          randomPassage = max;
          first = true;
        }
        if (this.contents[bisection][x1].value == " ") {
          randomPassage = min;
          second = true;
        }
        for (let i = x1 + 1; i < x2; i++) {
          if (first && second) {
            if (i == max || i == min) {
              continue;
            }
          } else if (i == randomPassage) {
            continue;
          }
          this.contents[bisection][i].value = "#";
        }
        this.render();
        this.generator([x1, x2], [y1, bisection], desiredRes);
        this.generator([x1, x2], [bisection, y2], desiredRes);
      }
    }
  }

  render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    let numRows = this.contents.length;
    let numCols = this.contents[0].length;
    let cellWidth = WIDTH / numCols;
    let cellHeight = HEIGHT / numRows;
    let cellLength = cellWidth > cellHeight ? cellHeight : cellWidth;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let cell = this.contents[row][col];
        ctx.fillStyle = cell.getColor();
        let rectX = col * cellLength;
        let rectY = row * cellLength;
        ctx.fillRect(rectX, rectY, cellLength, cellLength);
      }
    }
  }

  getEmptySlots() {
    let emptySlots = [];
    for (let row = 0; row < this.contents.length; row++) {
      for (let col = 0; col < this.contents[0].length; col++) {
        if (this.contents[row][col].value == " ") {
          emptySlots.push(this.contents[row][col]);
        }
      }
    }
    return emptySlots;
  }

  initPoints() {
    let emptySlots = this.getEmptySlots();
    if (emptySlots.length > 1) {
      this.start = emptySlots[0];
      this.end = emptySlots[emptySlots.length - 1];
      this.start.value = "S";
      this.end.value = "E";
    }
  }

  getCost(p1, p2) {
    let xChange = p1.column - p2.column;
    let yChange = p1.row - p2.row;
    return Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
  }

  traverse(currentCell) {
    currentCell.value = "P";
    this.render();
  }

  clearSolution() {
    for (let row of this.contents) {
      for (let element of row) {
        if (element.value == "P") {
          element.value = " ";
        }
      }
    }
  }
}
