const addBookBtn = document.querySelector(".add-book");
const readBtn = document.querySelector(".read-status");
const deleteBtn = document.querySelector(".delete-book");
const popupForm = document.querySelector(".popup");
const submitBtn = document.querySelector(".submit");
const overlay = document.querySelector(".overlay");


const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

addBookBtn.addEventListener("click", () => {
  if (popupForm.style.display === "none") {
    popupForm.style.display = "block";
    overlay.style.display = "block";
  }
  else {
    popupForm.style.display = "none";
    overlay.style.display = "none";
  }
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createBooks();
});

function createBooks() {
  const title = document.querySelector(".book-title").value;
  const author = document.querySelector(".book-author").value;
  const pages = document.querySelector(".num-pages").value;
  const read = document.querySelector("#readBook").checked;
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  popupForm.style.display = "none";
  overlay.style.display = "none";
}
