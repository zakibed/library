let myLibrary = [];

const libraryEl = document.querySelector('#library-container');
const bookForm = document.querySelector('#book-form');
const addBookBtn = document.querySelector('#add-book-btn');
const submitFormBtn = document.querySelector('#form-submit-btn');

function showStatus(icon, prop) {
    if (prop === 'Not read') icon.className = 'fa-solid fa-circle-exclamation';
    if (prop === 'Reading...') icon.className = 'fa-solid fa-spinner';
    if (prop === 'Finished') icon.className = 'fa-solid fa-circle-check';
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {}

function displayBookForm() {
    bookForm.style.display = 'block';
    document.querySelector('header').style.filter = 'blur(10px)';
    document.querySelector('hr').style.filter = 'blur(10px)';
    document.querySelector('#books-header').style.filter = 'blur(10px)';
    libraryEl.style.filter = 'blur(10px)';

    addBookBtn.disabled = true;
}

function displayBook() {
    for (let i in myLibrary) {
        const bookContainer = document.createElement('div');

        bookContainer.className = 'book-container';
        bookContainer.dataset.bookIndex = i;
        libraryEl.appendChild(bookContainer);

        const bookCover = document.createElement('div');

        bookCover.className = 'book-cover';
        bookContainer.appendChild(bookCover);

        const bookInfo = document.createElement('div');

        bookInfo.className = 'book-info';
        bookContainer.appendChild(bookInfo);

        const icon = document.createElement('i');
        bookInfo.appendChild(icon);

        for (prop in myLibrary[i]) {
            const info = document.createElement('p');

            info.dataset.bookProperty = prop;
            info.textContent = myLibrary[i][prop];

            prop === 'title' || prop === 'author'
                ? bookCover.appendChild(info)
                : bookInfo.appendChild(info);

            showStatus(icon, myLibrary[i][prop]);
        }
    }
}

const theHobbit = new Book(
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    1178,
    'Finished'
);
myLibrary.push(theHobbit);

const mobyDick = new Book('Moby Dick', 'Herman Melville', 427, 'Reading...');
myLibrary.push(mobyDick);

addBookBtn.addEventListener('click', displayBookForm);

displayBook();
