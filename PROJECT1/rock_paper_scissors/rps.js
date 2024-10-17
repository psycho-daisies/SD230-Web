// Troy Brunette
// SD230 - Web Programming - Project 1 - Rock Paper Scissors
// 10/15/2024

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

    getChoiceToString() {
        return this.playerChoice["name"];
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

/**
 * Main game loop to play Rock Paper Scissors
 *
 * Uses alert for now to display the winner
 *
 * Future Enhancements:
 * - Add a button to start the game
 * - Add a button or pictures to select the players choice
 * - Display the results on the page instead of using alert
 *
 * @returns {void}
 *
 */
function main() {
    let message = "Welcome to Rock Paper Scissors! \n Please choose Rock, Paper, or Scissors.";
    alert(message);
    while (true) {
        let player = new Player("Player");
        let computer = new Player("Computer");
        player.selectChoice(getPlayerChoice());
        computer.selectChoice(getComputerChoice());
        console.log("Player chooses " + player.getChoiceToString() + "!");
        console.log("Computer chooses " + computer.getChoiceToString() + "!");
        console.log("Player choice can defeat " + player.defeats() + "!");
        console.log("Computer choice can defeat " + computer.defeats() + "!");

        // Check if player wins, loses, or ties, use alert for now
        if (player.defeats().includes(computer.getChoiceToString())) {
            alert("Player wins!");
        } else if (computer.defeats().includes(player.getChoiceToString())) {
            alert("You lose, and the Computer wins! =(");
        } else if (
            player.getChoiceToString() === computer.getChoiceToString()
        ) {
            alert("It's a tie!");
        }
    }
}

/**
 * Get the player's choice and check if it is valid
 *
 * @returns {object} choice
 *
 */
function getPlayerChoice() {
    let input = prompt("Enter rock, paper, or scissors: ");

    if (choices[input] === undefined) {
        alert("Invalid choice");
        return getPlayerChoice();
    } else {
        return choices[input];
    }
}

/**
 * Select a random choice for the computer
 *
 * @returns {object} choice
 *
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

// Call the main function to play the game
// Will eventually add a button to start the game
main();
