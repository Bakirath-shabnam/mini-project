const boxes = document.querySelectorAll('.box');
const turnDisplay = document.getElementById('turn');
const playAgainButton = document.getElementById('play-again');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const winningConditionText = document.querySelector('.winning-condition');
const winnerMessage = document.getElementById('winner-message');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;
const winningScore = 5;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(index) {
    // Preventing a click on an already filled box or after winning
    if (board[index] !== '' || checkWin()) return;

    board[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;

    // Check if the current player has won
    if (checkWin()) {
        highlightWinningCombination();
        // Update the score
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXDisplay.innerText = scoreX;
            checkOverallWinner('X');
        } else {
            scoreO++;
            scoreODisplay.innerText = scoreO;
            checkOverallWinner('O');
        }
    }

    // Check for a tie
    if (board.every(box => box !== '') && !checkWin()) {
        endGame("It's a Tie!");
    }

    // Switch turns
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.innerText = `${currentPlayer}'s Turn`; // Updated turn display
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

function highlightWinningCombination() {
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            boxes[a].classList.add('winner');
            boxes[b].classList.add('winner');
            boxes[c].classList.add('winner');
        }
    });
}

function checkOverallWinner(player) {
    if (scoreX >= winningScore) {
        endGame(`X Wins the Game!`);
    } else if (scoreO >= winningScore) {
        endGame(`O Wins the Game!`);
    } else {
        // Show the play again button if there's a win but not an overall winner
        playAgainButton.style.display = 'block';
    }
}

function endGame(message) {
    // Hide the game board and display the winner message
    document.getElementById('game-board').style.display = 'none';
    winnerMessage.innerText = message;
    winnerMessage.style.display = 'block';
    playAgainButton.style.display = 'block'; // Show play again button

    // Hide score board and turn display
    document.querySelector('.score-board').style.display = 'none';
    turnDisplay.style.display = 'none';
    winningConditionText.style.display = 'none';
}

function resetGame() {
    // Reset the board and UI elements
    board = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('winner');
    });
    currentPlayer = 'X';
    turnDisplay.innerText = `${currentPlayer}'s Turn`; // Updated turn display
    winningConditionText.innerText = 'First to score 5 wins'; // Updated winning condition message

    // Show game board again
    document.getElementById('game-board').style.display = 'grid';
    winnerMessage.style.display = 'none';
    playAgainButton.style.display = 'none'; // Hide play again button initially

    // Show score board and turn display again
    document.querySelector('.score-board').style.display = 'flex';
    turnDisplay.style.display = 'block';
    winningConditionText.style.display = 'block';
}

// Attach event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleClick(index));
});

// Attach event listener for the Play Again button
playAgainButton.addEventListener('click', () => {
    // Check if the score is at the winning score to reset the scores
    if (scoreX >= winningScore || scoreO >= winningScore) {
        scoreX = 0; // Reset score for player X
        scoreO = 0; // Reset score for player O
        scoreXDisplay.innerText = scoreX; // Update score display
        scoreODisplay.innerText = scoreO; // Update score display
    }
    resetGame(); // Reset the game board and UI elements
    winnerMessage.style.display = 'none'; // Hide winner message when resetting the game
});

// Initialize the game on load
resetGame();
