const volumeElement = document.getElementById("volume-icon");
const mutedVolumeElement = "./images/volume-mute-white-icon.png";
const unmutedVolumeElement = "./images/volume-full-white-icon.png";
const cells = document.querySelectorAll(".grid-cell-symbol");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector(".restartButton");
const scribbleSound = new Audio("./sounds/scribble.mp3");
const restartSound = new Audio("./sounds/restart.mp3");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let isMuted = true;
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

intializeGame();

function intializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  scribbleSound.play();
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
  restartSound.play();
}

volumeElement.addEventListener("click", () => {
  isMuted = !isMuted;
  volumeElement.src = isMuted ? mutedVolumeElement : unmutedVolumeElement;
  if (isMuted) {
    scribbleSound.muted = true;
    restartSound.muted = true;
  }
  if (!isMuted) {
    scribbleSound.muted = false;
    restartSound.muted = false;
  }
});
