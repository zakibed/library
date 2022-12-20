let myLibrary = [];

const libraryEl = document.querySelector('#library-container');
const bookForm = document.querySelector('#book-form');
const addBookBtn = document.querySelector('#add-book-btn');
const submitFormBtn = document.querySelector('#form-submit-btn');

const FotR = new Book(
    'The Fellowship of the Ring',
    'J.R.R. Tolkien',
    423,
    'Finished'
);

const theTwoTowers = new Book(
    'The Two Towers',
    'J.R.R. Tolkien',
    352,
    'Reading...'
);

const theReturnOfTheKing = new Book(
    'The Return of the King',
    'J.R.R. Tolkien',
    416,
    'Not read'
);

myLibrary.push(FotR);
myLibrary.push(theTwoTowers);
myLibrary.push(theReturnOfTheKing);

displayBooks();

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function showStatus(icon, prop) {
    if (prop === 'Not read') icon.className = 'fa-solid fa-circle-exclamation';
    if (prop === 'Reading...') icon.className = 'fa-solid fa-spinner';
    if (prop === 'Finished') icon.className = 'fa-solid fa-circle-check';
}

function toggleForm(visibility, blur, disabled) {
    bookForm.style.display = visibility;
    document.querySelector('header').style.filter = blur;
    document.querySelector('hr').style.filter = blur;
    document.querySelector('#books-header').style.filter = blur;
    libraryEl.style.filter = blur;

    addBookBtn.disabled = disabled;
}

function addBookToLibrary(event) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').value;

    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);

    toggleForm('none', 'blur(0px)', false);
    bookForm.reset();

    displayBooks();

    console.log(myLibrary);

    event.preventDefault();
}

function displayBooks() {
    document
        .querySelectorAll('#library-container *')
        .forEach((book) => book.remove());

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

addBookBtn.addEventListener('click', toggleForm('block', 'blur(3px)', true));
bookForm.addEventListener('submit', addBookToLibrary);
