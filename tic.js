const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
	"[data-winning-message-text]"
);
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
	circleTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
		cell.removeEventListener("click", handleClick);
		cell.addEventListener("click", handleClick, { once: true });
	});
	setBoardHoverClass();
	winningMessageElement.classList.remove("show");
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = "Draw!";
	} else {
		winningMessageTextElement.innerText = `${
			circleTurn ? "O's" : "X's"
		} Wins!`;
	}
	winningMessageElement.classList.add("show");
}

function isDraw() {
	return [...cellElements].every((cell) => {
		return (
			cell.classList.contains(X_CLASS) ||
			cell.classList.contains(CIRCLE_CLASS)
		);
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

// const gameboard = document.getElementById("gameboard");
// const boxes = Array.from(document.getElementsByClassName("box"));
// const restartBtn = document.getElementById("restartBtn");
// const playText = document.getElementById("playText");
// const spaces = [null, null, null, null, null, null, null, null, null];
// const O_TEXT = "O";
// const X_TEXT = "X";
// let currentPlayer = O_TEXT;

// const drawBoard = () => {
// 	boxes.forEach((box, index) => {
// 		box.addEventListener("click", boxClicked);
// 	});
// 	restat
// };

// function boxClicked(e) {
// 	const id = e.target.id;
// 	if (!spaces[id]) {
// 		spaces[id] = currentPlayer;
// 		e.target.innerText = currentPlayer;
// 		if (hasPlayerWon(currentPlayer)) {
// 			playText.innerHTML = `${currentPlayer} wins!!`;
// 			return;
// 		}

// 		currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;

// 		// spaces.forEach((space, index) => {
// 		// 	spaces[index] = null;
// 		// });
// 		// boxes.forEach((box) => {
// 		// 	box.innerText = "";
// 		// });
// 		// playText.innerHTML = `Let's Play!!`;

// 		// currentPlayer = O_TEXT;
// 	}
// }

// const hasPlayerWon = (player) => {
// 	//from top left, check across, down, and diagonal
// 	if (spaces[0] === player) {
// 		if (spaces[1] === player && spaces[2] === player) {
// 			console.log(`${player} wins up top`);

// 			return true;
// 		}
// 		if (spaces[3] === player && spaces[6] === player) {
// 			console.log(`${player} wins on the left`);
// 			return true;
// 		}
// 		if (spaces[4] === player && spaces[8] === player) {
// 			console.log(`${player} wins on the diagonal`);
// 			return true;
// 		}
// 	}
// 	//from bottom check up and across
// 	if (spaces[8] === player) {
// 		if (spaces[2] === player && spaces[5] === player) {
// 			console.log(`${player} wins on the right`);
// 			return true;
// 		}
// 		if (spaces[7] === player && spaces[6] === player) {
// 			console.log(`${player} wins on the bottom`);
// 			return true;
// 		}
// 	}
// 	//from middle check middle vertical and middle horizontal
// 	if (spaces[4] === player) {
// 		if (spaces[3] === player && spaces[5] === player) {
// 			console.log(`${player} wins on the middle horizontal`);
// 			return true;
// 		}
// 		if (spaces[1] === player && spaces[7] === player) {
// 			console.log(`${player} wins on the middle vertical`);
// 			return true;
// 		}
// 	}

// 	//from top across
// 	if (spaces[2] === player) {
// 		if (spaces[4] === player && spaces[6] === player) {
// 			console.log(`${player} wins on the middle horizontal`);
// 			return true;
// 		}
// 	}
// };

// restartBtn.addEventListener(
// 	"click", restat
// );

// function restat() {
// 	spaces.forEach((space, index) => {
// 		spaces[index] = null;
// 	});
// 	boxes.forEach((box) => {
// 		box.innerText = "";
// 	});
// 	playText.innerHTML = `Let's Play!!`;

// 	currentPlayer = O_TEXT;
// }

// drawBoard();
