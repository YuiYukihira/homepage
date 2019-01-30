var canvas = document.getElementById("mazeCanvas");
var ctx = canvas.getContext("2d");
// const WIDTH  = $(window).width();
// const HEIGHT = $(window).height();
const WIDTH = 600;
const HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

var solveTerrain = null;

let generateType = document.getElementById("generateDrop");
let generateBtn = document.getElementById("generateButton");
let sizeInput = document.getElementById("sizeInput");
let solveType = document.getElementById("solveDrop");
let solveBtn = document.getElementById("solveBtn");
let clearBtn = document.getElementById("clearBtn");

function generate() {
  let selectedOption = generateType.options[generateType.selectedIndex].value;
  switch (selectedOption) {
    case "maze":
      solveTerrain = new Maze();
      solveTerrain.initContents(sizeInput.value);
      solveTerrain.generator(
        [0, sizeInput.value - 1],
        [0, sizeInput.value - 1],
        sizeInput.value
      );
      solveTerrain.initPoints();
      solveTerrain.render();
      break;
    case "particle":
      solveTerrain = new ParticleDesposition(100, sizeInput.value, 4);
      solveTerrain.generate();
      break;
  }
}

function clear() {
  solveTerrain.clearSolution();
  solveTerrain.render();
}

function solve() {
  switch (solveType.options[solveType.selectedIndex].value) {
    case "djikstra":
      djikstra(solveTerrain);
      break;
  }
  currentCell = SolveTerrain.start.getPred();
  function animate() {
    if (currentCell != solveTerrain.end) {
      solveTerrain.traverse(currentCell);
      currentCell = currentCell.getPred();
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

generateBtn.addEventListener("click", generate);
clearBtn.addEventListener("click", clear);

//document.body.style.background = "url(" + canvas.toDataURL() + ")";
