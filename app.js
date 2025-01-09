// Starting DOM Elements
const addBookBtn = document.querySelector('.add-book');
const readBtn = document.querySelector('.read-status');
const deleteBtn = document.querySelector('.delete-book');
const popupForm = document.querySelector('.popup');
const submitBtn = document.querySelector('.submit');
const overlay = document.querySelector('.overlay');

// Array to hold Books
const myLibrary = [];

// Book Constructor to create new Book Objects
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const defaultBooks = [
  new Book('The Hobbit', 'J.R.R Tolkien', 295, true),
  new Book('Fahrenheit 451', 'Ray Bradbury', 158, false),
  new Book('The Shining', 'Stephen King', 447, false),
];

defaultBooks.forEach((book) => {
  myLibrary.push(book);
});

// Local Storage Functions
function saveToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadFromLocalStorage() {
  const library = JSON.parse(localStorage.getItem('myLibrary'));
  if (library) {
    myLibrary.length = 0; // Clears the existing array
    library.forEach((book) => {
      myLibrary.push(book); // Then repopulates it with the saved data
    });
  }
}

loadFromLocalStorage();
displayBooks();

addBookBtn.addEventListener('click', () => {
  if (popupForm.style.display === 'none') {
    popupForm.style.display = 'block';
    overlay.style.display = 'block';
  } else {
    popupForm.style.display = 'none';
    overlay.style.display = 'none';
  }
  // If the user clicks outside the form, it will close
  document.body.addEventListener('click', (event) => {
    if (event.target === overlay) {
      popupForm.style.display = 'none';
      overlay.style.display = 'none';
    }
  });
});

// Submits the form and creates, displays, and saves the book
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  createBooks();
  displayBooks();
  saveToLocalStorage();
});

function createBooks() {
  const title = document.querySelector('.book-title').value;
  const author = document.querySelector('.book-author').value;
  const pages = document.querySelector('.num-pages').value;
  const read = document.querySelector('#readBook').checked;

  if (title === '' || author === '' || pages === '') {
    // If any fields are empty, it will alert the user otherwise it will create the book
    alert('Please fill out all fields');
  } else {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    popupForm.style.display = 'none';
    overlay.style.display = 'none';
  }
}

// Displays the books in the library
function displayBooks() {
  const bookContainer = document.querySelector('.books-container');
  bookContainer.textContent = '';

  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const readSection = document.createElement('div');
    const readStatus = document.createElement('button');
    const deleteSection = document.createElement('div');
    const deleteBtn = document.createElement('button');

    bookCard.classList.add('book');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');
    readSection.classList.add('read');
    readStatus.classList.add('read-status');
    deleteSection.classList.add('delete');
    deleteBtn.classList.add('delete-book');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    readStatus.textContent = book.read ? 'Read' : 'Not Read';
    readStatus.classList.add(book.read ? 'read' : 'not-read');
    deleteBtn.textContent = 'Delete';

    bookContainer.appendChild(bookCard);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readSection);
    readSection.appendChild(readStatus);
    bookCard.appendChild(deleteSection);
    deleteSection.appendChild(deleteBtn);

    // If the user clicks the read status button, it will change the read status
    readStatus.addEventListener('click', () => {
      if (!book.read) {
        // If the book is not read originally, clicking the button will change it to read
        book.read = true;
        readStatus.textContent = 'Read';
        readStatus.classList.replace('not-read', 'read');
      } else {
        // If the book is read originally, clicking the button will change it to not read
        book.read = false;
        readStatus.textContent = 'Not Read';
        readStatus.classList.replace('read', 'not-read');
      }
    });

    deleteBtn.addEventListener('click', () => {
      const index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
      displayBooks();
      saveToLocalStorage();
    });
  });
}
