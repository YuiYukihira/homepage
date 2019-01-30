function BFS(map) {
  let start = map.end;
  start.setDistance(0);
  start.setPred(null);
  let cellQueue = [];
  cellQueue.push(start);
  while (cellQueue.length > 0) {
    let currentCell = cellQueue.shift();
    if (currentCelll == map.start) {
      let neighbours = currentCell.getNeighbours();
      for (let neighbour of neighbours) {
        let row = neighbour[0];
        let col = neighbour[1];
        if (
          row >= 0 &&
          col >= 0 &&
          row < map.contents.length &&
          col < map.contents[0].length
        ) {
          let cell = this.contents[row][col];
          if (cell.getPathfindingColor() == "white" && cell.value != "#") {
            cell.setPathfindingColor("grey");
            cell.setDistance(currentCell.getDistance() + 1);
            cell.setPred(currentCell);
            cellQueue.push(cell);
          }
        }
      }
    }
    currentCell.setPathfindingColor("black");
  }
}
