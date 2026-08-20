const width = 400;
const height = 400;
let grid = null;
const body = document.querySelector("body");

function createGrid() {
    grid = document.createElement("div")
    grid.classList.add("container");
    grid.classList.add("col");
    body.appendChild(grid);
}


function createRow(cols) {
    const div = document.createElement("div");
    const colWidth = Math.floor(width / cols);
    div.classList.add("row");
    for (let i = 0; i < cols; ++i) {
        const rowDiv = document.createElement("div");
        rowDiv.style.backgroundColor = "red";
        rowDiv.style.width = `${colWidth}px`;
        rowDiv.style.height = `${colWidth}px`;
        rowDiv.style.border = "1px solid black";
        rowDiv.style.opacity = "1";
        rowDiv.style.boxSizing = "border-box";
        div.appendChild(rowDiv);

        rowDiv.addEventListener("mouseover", (event) => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            event.target.style.backgroundColor = `rgb(${r} ${g} ${b})`
        });

        rowDiv.addEventListener("click", (event) => {
            let currVal = Number(event.target.style.opacity);
            if (currVal > 0) {
                currVal -= 0.1;
                event.target.style.opacity = currVal >= 0 ? `${currVal}` : `0`;
            }
        });
    }

    grid.appendChild(div);
}
function buildRows(rows) {
    const cols = rows;
    for (let i = 0; i < rows; ++i) {
        createRow(cols);
    }
}


createGrid();
buildRows(16);

const btn = document.querySelector(".change-grid");
btn.addEventListener("click", () => {
    const input = document.querySelector("#grid-size");
    const val = input.value;
    if (val < 16 || val > 100) {
        alert("Value of a grid size must be between 16 and 100");
        input.reset();
    }
    else if (val === "" || val === null) {
        alert("Input a valid number");
    }
    else {
        body.removeChild(grid);
        createGrid();
        buildRows(val);
    }

});