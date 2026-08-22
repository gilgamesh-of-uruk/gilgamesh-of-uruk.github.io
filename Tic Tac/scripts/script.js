const items = document.querySelectorAll(".item");
const output = document.querySelector(".output");
const winnerOutput = document.querySelector(".winner-output");
const button = document.querySelector("button");
let player = true;
let counter = 0;



button.addEventListener("click", () => {
    startGame();
})

function startGame() {
    player = true;
    counter = 0;
    winnerOutput.textContent = "";
    output.textContent = "";
    items.forEach(item => {
        item.querySelector("p").textContent = "";
        item.classList.remove("marked"); // if the class does not exist, nothing happens as per the docs.
        if (item.querySelector("hr") !== null) {
            item.removeChild(item.querySelector("hr"));
        }
    })
    button.classList.add("hidden");

}

function endGame(itemText) {
    winnerOutput.textContent = "Player with " + itemText + " Wins!";
    counter = 9;
    button.classList.remove("hidden");
    items.forEach(item => { item.classList.add("marked") });
}

function addHr(index1, index2, index3, items, classList) {
    const hr = document.createElement("hr");
    classList.forEach(elem => { hr.classList.add(elem) });
    items[index1].appendChild(hr);
    items[index2].appendChild(hr.cloneNode());
    items[index3].appendChild(hr.cloneNode());
}

function checkGameEnd() {
    const itemsArray = Array.from(items);
    const row = 3;
    const col = 3;

    for (let i = 0; i < itemsArray.length; ++i) {
        const itemText = itemsArray[i].querySelector("p").textContent;
        if (itemText === "X" || itemText === "O") {
            const currentRow = Math.floor((i / row));
            const currentCol = i % row;

            let nextRow = (currentRow + 1) % row;
            let nextNextRow = (currentRow + 2) % row;

            if (itemsArray[nextRow * row + currentCol].querySelector("p").textContent === itemText &&
                itemsArray[nextNextRow * row + currentCol].querySelector("p").textContent === itemText) {

                addHr(currentRow * row + currentCol, nextRow * row + currentCol, nextNextRow * row + currentCol, itemsArray, ["vert"]);
                endGame(itemText);
                return;
            }


            let nextCol = (i + 1) % col;
            let nextNextCol = (i + 2) % col;

            if (itemsArray[currentRow * row + nextCol].querySelector("p").textContent === itemText &&
                itemsArray[currentRow * row + nextNextCol].querySelector("p").textContent === itemText) {

                addHr(currentRow * row + currentCol, currentRow * row + nextCol, currentRow * row + nextNextCol, itemsArray, []);
                endGame(itemText);
                return;
            }

            if (i % 2 === 0) {

                if (itemsArray[0].querySelector("p").textContent === itemText &&
                    itemsArray[4].querySelector("p").textContent === itemText &&
                    itemsArray[8].querySelector("p").textContent === itemText) {

                    addHr(0, 4, 8, itemsArray, ["diag"]);
                    endGame(itemText);
                    return;
                }

                else if (itemsArray[2].querySelector("p").textContent === itemText &&
                    itemsArray[6].querySelector("p").textContent === itemText &&
                    itemsArray[6].querySelector("p").textContent === itemText
                ) {
                    addHr(2, 4, 6, itemsArray, ["diag", "inverted"]);
                    endGame(itemText);
                    return;
                }
            }

        }


    }
}

items.forEach((item) => {
    item.addEventListener("click", (e) => {
        const visited = item.classList.contains("marked");
        if (!visited && (counter !== 9)) {
            const p = item.querySelector("p");

            p.textContent = player ? "X" : "O";
            player = !player;
            item.classList.add("marked");
            checkGameEnd();
            counter++;
            if (counter >= 9) {
                output.textContent = "No more moves";
            }
        }

    })
})