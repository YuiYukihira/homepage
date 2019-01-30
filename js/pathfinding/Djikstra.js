function Djikstra(map) {
  let start = map.end;
  start.setDistance(0);
  start.setPred(null);
  const frontier = new PriorityQueue((a, b) => a.getDistance > b.getDistance);
  frontier.push(start);
  while (!frontier.isEmpty()) {
    var currentCell = frontier.pop();
    if (currentCell == map.start) {
      break;
    }
    for (n of currentCell.getNeighbours()) {
      if (
        n[0] >= 0 &&
        n[1] >= 0 &&
        n[0] < map.contents.length &&
        n[1] < map.contents[0].length
      ) {
        let neighbour = map.contents[n[0]][n[1]];
        if (
          neighbour.getPathfindingColor() == "white" &&
          neighbour.value != "#"
        ) {
          new_cost =
            currentCell.getDistance() + map.getCost(currentCell, neighbour);
          if (
            neighbour.getDistance() == null ||
            new_cost < neighbour.getDistance()
          ) {
            neighbour.setPathfindingColor("grey");
            neighbour.setDistance(new_cost);
            frontier.push(neighbour);
            neighbour.setPred(currentCell);
          }
        }
      }
    }
    currentCell.setPathfindingColor("black");
  }
}
