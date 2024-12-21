const addBookBtn = document.querySelector(".add-book");
const readBtn = document.querySelector(".read-status");
const deleteBtn = document.querySelector(".delete-book");
const form = document.querySelector(".form");


const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {

}

