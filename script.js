// Select elements
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Game variables
let currentPlayer = "X";
let gameState = Array(9).fill(null); // Tracks the state of the board
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Update game status message
function updateStatus(message) {
  statusDisplay.textContent = message;
}

// Check for a winner or a draw
function checkGameStatus() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      isGameActive = false;
      updateStatus(`Player ${currentPlayer} wins!`);
      return;
    }
  }

  if (!gameState.includes(null)) {
    isGameActive = false;
    updateStatus("It's a draw!");
  }
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute("data-index");

  if (!isGameActive || gameState[cellIndex]) {
    return;
  }

  // Update game state
  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check game status
  checkGameStatus();

  // Switch players if the game is still active
  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Player ${currentPlayer}'s turn`);
  }
}

// Reset the game
function resetGame() {
  currentPlayer = "X";
  gameState.fill(null);
  isGameActive = true;
  updateStatus(`Player X's turn`);
  cells.forEach((cell) => (cell.textContent = ""));
}

// Event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
