// Troy Brunette
// SD230 - Web Programming - Project 2 - Rock Paper Scissors
// 11/09/2024

/**
 * Player class for the game Rock Paper Scissors
 *
 * Wins property for future use and enhancement
 *
 * @property {string} name - The player's name
 *
 * @property {object} playerChoice - The player's choice
 *
 * @property {number} wins - The number of times the player has won
 *
 */
class Player {
    constructor(name) {
        this.name = name;
        this.playerChoice = null;
        this.wins = 0;
    }

    selectChoice(choice) {
        this.playerChoice = choice;
    }

    getChoice() {
        return this.playerChoice;
    }

    defeats() {
        return this.playerChoice["defeats"];
    }

    // For potential future use
    getWins() {
        return this.wins;
    }

    addWin() {
        this.wins++;
    }

    resetScore() {
        this.wins = 0;
    }
}

/**
 * Object for the choices in Rock Paper Scissors
 * Example use:
 * let choice = choices["rock"];
 * if (choice["defeats"].includes("scissors")) ...
 *
 */
const choices = {
    rock: { name: "rock", defeats: ["scissors"] },
    paper: { name: "paper", defeats: ["rock"] },
    scissors: { name: "scissors", defeats: ["paper"] },
};

// Create the player and computer objects
const player = new Player("Player");
const computer = new Player("Computer");

// Elements for the game UI
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const display = document.getElementById("display");
const hands = document.querySelectorAll(
    ".hand-rock-regular, .hand-scissors-regular, .hand-paper-regular"
);
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

// Game Sounds
const winSound = new Audio("./sounds/victory.mp3"); // Replace with the actual path to your sound file
const loseSound = new Audio("./sounds/lose.mp3"); // Replace with the actual path to your sound file
const bloopSound = new Audio("./sounds/count-bloop.mp3"); // Replace with the actual path to your sound file
const countdownSound = new Audio("./sounds/count-bloop.mp3"); // Replace with the actual path to your sound file
const selectSound = new Audio("./sounds/select.mp3"); // Replace with the actual path to your sound file
const hoverSound = new Audio("./sounds/hover.mp3"); // Replace with the actual path to your sound file

/**
 * Display the results of the game and play the correct Game Sound
 *
 * @param {string} result - The result of the game
 *
 * @param {string} playerChoice - The player's choice
 *
 * @param {string} computerChoice - The computer's choice
 */
function updateUI(result, playerChoice, computerChoice) {
    removeSelectedHands();
    if (result === "tie") {
        display.textContent = "It's a tie!";
        bloopSound.play();
    } else if (result === "player") {
        display.textContent = "Player wins! =)";
        player.addWin();
        winSound.play();
    } else {
        display.textContent = "You Lose! =(";
        computer.addWin();
        loseSound.play();
    }

    playerScore.textContent = `Player: ${player.wins}`;
    computerScore.textContent = `Computer: ${computer.wins}`;
}

/**
 * Get the winner of the game
 *
 * @param {object} playerChoice
 *
 * @param {object} computerChoice
 *
 * @returns {string} result - The result of the game
 */
function getWinner(playerChoice, computerChoice) {
    if (!playerChoice || !computerChoice) {
        console.error("Invalid choices");
        return;
    }
    // Check if player wins, loses, or ties, use alert for now
    if (playerChoice.defeats.includes(computerChoice.name)) {
        return "player";
    } else if (computerChoice.defeats.includes(playerChoice.name)) {
        return "computer";
    } else {
        return "tie";
    }
}

/**
 * Helper function to remove selected class from all hands
 */
function removeSelectedHands() {
    hands.forEach((hand) =>
        hand.classList.remove("selected", "computer-selected")
    );
    display.textContent = "";
}

/**
 * Select a random choice for the computer
 *
 * @returns {object} choice - The computer's random choice
 */
function getComputerChoice() {
    let random = Math.floor(Math.random() * 3);
    let choice;
    if (random === 0) {
        choice = choices.rock;
    } else if (random === 1) {
        choice = choices.paper;
    } else {
        choice = choices.scissors;
    }
    return choice;
}

/**
 * Play the game
 *
 * Uses setTimeout for a countdown before the game starts
 *
 */
function playGame() {
    const countdownWords = ["Rock", "Paper", "Scissors"];
    countdownWords.forEach((word, index) => {
        setTimeout(() => {
            disableHandSelection();
            display.textContent = word;
            countdownSound.play();
        }, index * 1000);
    });

    setTimeout(() => {
        display.textContent = "";
        const playerChoice = player.getChoice();
        const computerChoice = getComputerChoice();
        computer.selectChoice(computerChoice);

        // Check for valid selections
        if (!playerChoice || !computerChoice) {
            console.error("Invalid choices");
            return;
        }

        console.log(`Player chose: ${playerChoice.name}`);
        console.log(`Computer chose: ${computerChoice.name}`);

        const result = getWinner(playerChoice, computerChoice);
        updateUI(result, playerChoice, computerChoice);

        enableHandEventListeners();
        // enableHandSelection(true); // Re-enable hand selection for the next round
    }, countdownWords.length * 1000);
}

/**
 * Enables user to select a hand and play the game
 * Adds event listeners for click and hover sounds
 */
function enableHandEventListeners() {
    hands.forEach((hand) => {
        hand.addEventListener("click", handleHandClickEvent);
        hand.addEventListener("mouseover", playHoverSound);
    });
}

/**
 * Disables and removes event listeners for hand selection and mouse hover sounds
 */
function disableHandSelection() {
    hands.forEach((hand) => {
        hand.removeEventListener("click", handleHandClickEvent);
        hand.removeEventListener("mouseover", playHoverSound);
    });
}

/**
 * Play the hover sound when the mouser hovers over a hand
 */
function playHoverSound() {
    hoverSound.play();
}

/**
 * Add the "selected" class to the current hand selected, set player's choice, and play the game
 *
 * @param {event} event - The hand selected by the player
 */
function handleHandClickEvent(event) {
    const hand = event.currentTarget;
    removeSelectedHands();
    // Add selected class to the hand for styling
    hand.classList.add("selected");
    // Get the player's choice from the data attribute from the hand selected
    const playerChoice = hand.getAttribute("data-choice");
    if (choices[playerChoice]) {
        player.selectChoice(choices[playerChoice]);
        selectSound.play();
        setTimeout(playGame, 1000);
    } else {
        console.error("Invalid choice");
    }
}

/**
 * Reset the game to the starting state.
 */
function resetGame() {
    // Disable hand selection and remove click event listeners
    disableHandSelection();
    removeSelectedHands();

    // Reset player and computer scores
    player.resetScore();
    computer.resetScore();

    playerScore.textContent = `Player: ${player.wins}`;
    computerScore.textContent = `Computer: ${computer.wins}`;
    display.textContent = "Game Reset! Press Start to play again! =)";
    startButton.disabled = false;
    startButton.textContent = "Start Game";
    startButton.hidden = false;
    resetButton.hidden = true;
}

/**
 * Start the game and enable hand selection
 * Hide the start button and shows the reset button
 */
function startGame() {
    enableHandEventListeners();
    startButton.disabled = true;
    startButton.textContent = "Game Started";
    startButton.hidden = true;
    resetButton.hidden = false;
    display.textContent = "Choose a hand!";
}

// Main Event Listener for the start and reset buttons
document.addEventListener("DOMContentLoaded", () => {
    resetButton.hidden = true;
    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
});
