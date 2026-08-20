
let str = "(5)*(2-1)";


const input = document.querySelector("#input");
const output = document.querySelector(".output");
const btn = document.querySelector(".evaluate");
const container = document.querySelector(".btn-container");
const btnText = ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "AC", "CE", ".", "="];
const prevLog = document.querySelector(".prev-log");
let j = 0;

let operators =
{
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
}


function isNum(char) {
    return char !== ' ' && (char >= 0 && char <= 9);
}
let error = message => console.log(message);
function advance() {
    if (str.length > 0) str = str.slice(1);
}
function consume(char) {
    if (str.length > 0 && str[0] === char)
        advance();
    else {
        error(`consumeing ${char} failed`);
    }
}

function ignoreSpaces() {
    let i = 0;
    while (str.length > i && str[i] === ' ') ++i;
    str = str.slice(i);
}
function parseNumber() {
    let i = 0, start = 0, num = 0, sign = 1;

    if (str[i] === '+') ++start;
    else if (str[i] === '-') {
        ++start;
        sign = -1;
    }
    i = start;
    if (!isNum(str[start]) && str[start] !== ".") {
        error("Expected a number!");
        return;
    }
    while ((str.length - i) > 0 && isNum(str[i])) {
        num *= 10;
        num += Number(str[i]);
        ++i;
    }

    if (str.length > i && str[i] === '.') ++i

    let part = 0, power = 10;
    while ((str.length - i) > 0 && isNum(str[i])) {
        num += str[i] / power;
        power *= 10;
        ++i;
    }
    str = str.slice(i);
    return num * sign;
}



function createRowBtns() {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.gap = "0.5rem";
    for (let i = 0; i < 4; ++i) {

        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.style.width = "2rem";
        btn.style.height = "2rem";
        btn.style.textAlign = "center";

        btn.textContent = btnText[j++];

        btn.addEventListener("click", (e) => {
            console.log(e.target.textContent);
            if (e.target.textContent === "=") {
                str = input.value;
                const log = document.createElement("p");
                log.textContent = str;
                prevLog.appendChild(log);
                input.value = expr2();
            }
            else if (e.target.textContent === "AC") {
                input.value = "0";
            }
            else if (e.target.textContent === "CE") {
                prevLog.textContent = "";
                input.value = "0";
            }
            else {
                if (input.value === "0") input.value = "";
                input.value += e.target.textContent;
            }
        });

        div.appendChild(btn);
    }
    container.appendChild(div);
}

for (let i = 0; i < 4; ++i) {
    createRowBtns();
}

function expr2() {
    while (str.length > 0) {
        ignoreSpaces();
        let num = parsePlus();
        ignoreSpaces();
        while (str[0] in operators) {
            let c = str[0];
            advance();
            ignoreSpaces();
            if (c === '+' || c === "-") {
                if (c === "+") num += parseMul2()
                else num -= parseMul2();
            }
            else if (c === "*") num *= parse3()
            else num /= parse3();
            ignoreSpaces();
        }
        return num
    }
    function parsePlus() {
        let num = parseMul();
        ignoreSpaces();
        while (str[0] === "+" || str[0] === "-") {
            let c = str[0];
            advance();
            ignoreSpaces();
            if (c === "+") num += parseMul();
            else num -= parseMul();
        }
        return num;
    }
    function parseMul() {
        let num = parse3();
        ignoreSpaces();
        while (str[0] === "*" || str[0] === "/") {
            let c = str[0];
            advance();
            ignoreSpaces();
            if (c === "*") num *= parse3();
            else num /= parse3();
        }
        return num
    }
    function parse3() {
        if (str[0] == '(') {
            advance()
            ignoreSpaces();
            let num = expr2();
            consume(")");
            return num;
        }
        else return parseNumber()
    }
}