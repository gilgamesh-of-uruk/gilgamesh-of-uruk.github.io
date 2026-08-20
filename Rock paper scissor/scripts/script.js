
function reset() {
    document.querySelector(".round-played").textContent = `Current round: ${currRound}`;
    output.textContent = "";
    errorLog.textContent = "";
    computer.textContent = "";
    roundInfo.textContent = "";
}

let yscore = 0;
let cscore = 0;

let roundCount = 1;
let currRound = 1;

const output = document.querySelector(".output");
const humanChoice = document.querySelector("select");
const btn = document.querySelector(".one");
const errorLog = document.querySelector(".error-log");
const computer = document.querySelector(".computer");
const roundInfo = document.querySelector(".round-info");




function setOutput(message) {
    output.textContent = message;
}
function setError(message) {

    const err = document.createElement("p");
    err.style.color = "red";
    err.style.fontWeight = "bold";
    err.textContent = `Error: ${message}`;
    errorLog.appendChild(err);
}

function setComputerChoice(computerChoice) {
    const span = document.createElement("span");
    const m = document.createElement("span");

    m.textContent = "Computer chose ";
    span.style.color = "green";
    span.textContent = computerChoice;

    computer.appendChild(m);
    computer.appendChild(span);
}

function setRoundInfo(message) {
    roundInfo.textContent = message;
}

function getCurrentScore() {
    const message = `Score: computer ${cscore} \t \t You  ${yscore}`;
    return (message);
}


function playRound() {
    reset();
    const userChoice = getHumanChoice(), computerChoice = getRandomChoice();
    switch (userChoice) {
        case "rock":
            if (computerChoice === "paper") {
                cscore++;
                setComputerChoice("paper");
                setRoundInfo("You lost this round. " + getCurrentScore());
            }
            else if (computerChoice === "rock") {
                setComputerChoice("rock"); setRoundInfo("A tie round. " + getCurrentScore());
            }
            else if (computerChoice === "scissor") {
                ++yscore;
                setComputerChoice("scissor"); setRoundInfo("You win this round. " + getCurrentScore());
            }
            else {
                setError(`Invalid Computer Choice: ${computerChoice}`);
            }
            break;

        case "paper":
            if (computerChoice === "scissor") {
                cscore++;
                setComputerChoice("scissor");
                setRoundInfo("You lost this round. " + getCurrentScore());
            }
            else if (computerChoice === "paper") {
                setComputerChoice("paper"); setRoundInfo("A tie round. " + getCurrentScore());
            }
            else if (computerChoice === "rock") {
                ++yscore;
                setComputerChoice("rock"); setRoundInfo("You win this round. " + getCurrentScore());
            }
            else {
                setError(`Invalid Computer Choice: ${computerChoice}`);
            }
            break;

        case "scissor":
            if (computerChoice === "rock") {
                cscore++;
                setComputerChoice("rock");
                setRoundInfo("You lost this round. " + getCurrentScore());
            }
            else if (computerChoice === "scissor") {
                setComputerChoice("scissor");
                setRoundInfo("A tie round. " + getCurrentScore());
            }
            else if (computerChoice === "paper") {
                ++yscore;
                setComputerChoice("paper");
                setRoundInfo("You win this round. " + getCurrentScore());
            }
            else {
                setError(`Invalid Computer Choice: ${computerChoice}`);
            }

            break;
        default:
            setError("Unknown choice");
            break;
    }
}
function getRandomChoice() {
    const choices = ["rock", "paper", "scissor"]

    const index = Math.floor(Math.random() * 3);
    const option = choices[index];
    if (option == undefined) {
        console.log(`index = ${index}`);
    }
    return option;
}

function getHumanChoice() {
    const val = humanChoice.value;
    if (val === "") {
        setError("You have not selected a choice yet\n");
    }
    return val;
}



btn.addEventListener("click", () => {
    roundCount = Number(document.querySelector("#roundCount").value);
    if (roundCount === "" || roundCount === null || isNaN(roundCount)) {
        roundCount = 1;
    }
    playRound();

    if (errorLog.textContent === "") {
        if (currRound == roundCount) {
            if (yscore > cscore) {
                setOutput("You have won the game!");
            }
            else if (yscore === cscore) {
                setOutput("You have tied the game!");
            }
            else {
                setOutput("You lost!");
            }

            yscore = 0;
            cscore = 0;
            currRound = 1;
            roundCount = 1;
            document.querySelector("#roundCount").reset();
            document.querySelector(".round-played").textContent = "";

        }

        else {
            currRound++;
        }

    }

});