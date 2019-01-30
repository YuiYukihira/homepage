class ParticleDesposition {
  constructor(cycles, desiredRes, numSources) {
    this.contents = [];
    this.contents = initContents(desiredRes);
    this.cycle = 0;
    this.maxCycles = cycles;
    this.sources = this.createSources(numSources);
    this._currentSource = null;
  }

  createSources(numSources) {
    sources = [];
    for (let i = 0; i < numSources; i++) {
      let xpos = randInt(0, this.contents[0].length);
      let ypos = randInt(0, this.contents.length);
      sources.push(this.contents[xpos][ypos]);
    }
    return sources;
  }

  initContents(desiredRes) {
    for (let i = 0; i < desiredRes[0]; i++) {
      this.contents.push([]);
      for (let j = 0; j < desiredRes[1]; j++) {
        let cell = new Cell("#");
        cell.setPos(i, j);
        cell.setHeight(0);
        this.contents[i].push(cell);
      }
    }
  }

  generate() {
    this.cycle = 0;
    this._generate();
  }
  _generate() {
    if (this.cycle < this.maxCycles) {
      sourceIndex = randInt(0, this.sources.length - 1);
      this._currentSource = this.sources[source];
      requestAnimationFrame(this._findSettleSpot);
      finalCell = this._currentSource;
      finalCell.height++;
      this.cycle++;
    }
  }
  _findSettleSpot() {
    for (neighbourPos of cell.getNeighbours()) {
      neighbour = this.contents[neighbourPos[0]][neighbourPos[1]];
      if (neighbour.height < this._currentSource.height) {
        this._currentSource = neighbour;
        this.render();
        requestAnimationFrame(this._findSettleSpot);
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
  clearSolution() {
    for (row = 0; row < this.contents.length; row++) {
      for (col = 0; col < this.contents[0].length; row++) {
        this.contents[row][col].pred = null;
      }
    }
  }

  getCost(p1, p2) {
    let xChange = p1.column - p2.column;
    let yChange = p1.row - p2.row;
    let zChange = p1.height - p2.height;
    return Math.sqrt(
      Math.pow(xChange, 2) + Math.pow(yChange, 2) + Math.pow(zChange, 2)
    );
  }

  traverse(currentCell) {
    currentCell.value = "P";
    this.render();
  }
}
