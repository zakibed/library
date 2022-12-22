let myLibrary = [];

const libraryEl = document.querySelector('#library-container');
const bookForm = document.querySelector('#book-form');
const addBookBtn = document.querySelector('#add-book-btn');
const submitFormBtn = document.querySelector('#form-submit-btn');

const FotR = new Book(
    'The Fellowship of the Ring',
    'J.R.R. Tolkien',
    423,
    'Finished',
    'brown',
    'gold'
);
const theTwoTowers = new Book(
    'The Two Towers',
    'J.R.R. Tolkien',
    352,
    'Reading',
    'darkolivegreen',
    'gold'
);
const theReturnOfTheKing = new Book(
    'The Return of the King',
    'J.R.R. Tolkien',
    416,
    'Not read',
    'mediumvioletred',
    'gold'
);

myLibrary.push(FotR);
myLibrary.push(theTwoTowers);
myLibrary.push(theReturnOfTheKing);

displayBooks();

function Book(title, author, pages, status, coverColor, textColor) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.pages = pages;
    this.coverColor = coverColor;
    this.textColor = textColor;
}

Book.prototype.changeStatus = function () {
    this.status =
        this.status === 'Not read'
            ? 'Reading'
            : this.status === 'Reading'
            ? 'Finished'
            : 'Not read';
};

function appendElement(element, parent, className) {
    element.className = className;
    parent.appendChild(element);
}

function showStatus(status) {
    return status === 'Not read'
        ? 'fa-solid fa-circle-exclamation'
        : status === 'Reading'
        ? 'fa-solid fa-spinner'
        : 'fa-solid fa-circle-check';
}

function toggleForm(visibility, blur, disabled) {
    bookForm.style.display = visibility;

    document
        .querySelectorAll('body *:not(#book-form, #book-form *)')
        .forEach((n) => (n.style.filter = blur));

    document
        .querySelectorAll('button:not(#form-submit-btn)')
        .forEach((btn) => (btn.disabled = disabled));
}

function addBookToLibrary(event) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').value;

    const coverColor = document.querySelector('#cover-color').value;
    const textColor = document.querySelector('#text-color').value;

    const newBook = new Book(title, author, pages, status, coverColor, textColor);

    myLibrary.push(newBook);

    toggleForm('none', 'blur(0px)', false);
    bookForm.reset();

    displayBooks();

    event.preventDefault();
}

function displayBooks() {
    document.querySelectorAll('#library-container *').forEach((book) => book.remove());

    for (let i in myLibrary) {
        const bookContainer = document.createElement('div');
        const bookCover = document.createElement('div');
        const bookInfo = document.createElement('div');
        const statusIcon = document.createElement('i');

        appendElement(bookContainer, libraryEl, 'book-container');
        appendElement(bookCover, bookContainer, 'book-cover');
        appendElement(bookInfo, bookContainer, 'book-info');

        bookContainer.dataset.bookIndex = i;

        const deleteBtn = document.createElement('button');
        appendElement(deleteBtn, bookInfo, `delete-btn-${i}`);
        appendElement(document.createElement('i'), deleteBtn, 'fa-solid fa-trash');

        for (prop in myLibrary[i]) {
            const info = document.createElement('p');

            info.dataset.bookProperty = prop;
            info.textContent = myLibrary[i][prop];

            if (prop === 'status') {
                const statusBtn = document.createElement('button');
                statusBtn.dataset.bookProperty = prop;
                statusBtn.textContent = myLibrary[i][prop];

                bookInfo.appendChild(statusBtn);
                statusBtn.appendChild(statusIcon);
            } else if (prop === 'coverColor') {
                document.querySelector(`[data-book-index='${i}'] .book-cover`).style.background =
                    myLibrary[i][prop];
            } else if (prop === 'textColor') {
                document.querySelector(`[data-book-index='${i}'] .book-cover`).style.color =
                    myLibrary[i][prop];
            } else if (prop === 'pages') {
                bookInfo.appendChild(info);
            } else if (prop === 'title' || prop === 'author') {
                bookCover.appendChild(info);
            }
        }

        statusIcon.className = showStatus(myLibrary[i].status);

        document.querySelector(`.delete-btn-${i}`).addEventListener('click', function () {
            document.querySelector(`[data-book-index='${i}']`).remove();
            myLibrary.splice(i, 1);
        });

        document
            .querySelector(`[data-book-index='${i}'] [data-book-property='status']`)
            .addEventListener('click', function () {
                myLibrary[i].changeStatus();
                this.textContent = myLibrary[i].status;
                appendElement(document.createElement('i'), this, showStatus(myLibrary[i].status));
            });
    }
}

addBookBtn.addEventListener('click', () => toggleForm('block', 'blur(2px)', true));
bookForm.addEventListener('submit', addBookToLibrary);
