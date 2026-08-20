
const showAddBookForm = document.querySelector(".add-book");
const closeForm = document.querySelector(".close-form");
const blurBg = document.querySelector(".blured-bg");
const form = document.querySelector("form");
const addNewBook = document.querySelector(".add-new-book");
const bookCards = document.querySelector(".cards");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const bookPages = document.querySelector("#book-pages");
    const bookTitle = document.querySelector("#book-title");
    const bookAuthor = document.querySelector("#book-author");
    const bookRead = document.querySelector("#book-read");
    console.log(bookRead.checked);
    addCard(String(bookTitle.value), Number(bookPages.value), String(bookAuthor.value), Boolean(bookRead.checked));
    closeForm.click();

})

closeForm.addEventListener("click", () => {
    blurBg.classList.add("hidden");
});

showAddBookForm.addEventListener("click", () => {
    blurBg.classList.remove("hidden");

})

function addCard(title, pages, author, wasNotRead) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("col-con");

    card.innerHTML = `<div class="card-title">${title}</div>
        <div class="card-author">${author}</div>
        <div class="card-pages">${pages}</div>
        <button class="card-read ${wasNotRead ? "read" : ""}">Read</button>
        <button class="card-del">Delete</button>`;

    const readBtn = card.querySelector(".card-read");
    readBtn.addEventListener("click", (e) => {

        readBtn.classList.toggle("read");

    });

    card.querySelector(".card-del").addEventListener("click", () => {
        bookCards.removeChild(card);
    })

    bookCards.appendChild(card);
}