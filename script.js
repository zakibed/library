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

function appendElement(element, parent, className) {
    element.className = className;
    parent.appendChild(element);
}

function showStatus(icon, prop) {
    if (prop === 'Not read') icon.className = 'fa-solid fa-circle-exclamation';
    if (prop === 'Reading') icon.className = 'fa-solid fa-spinner';
    if (prop === 'Finished') icon.className = 'fa-solid fa-circle-check';
}

// function deleteBook() {
//     document.querySelector(`data-book-index-${this.className[this.className.length - 1]}`).remove();
//     console.log(this.className);
// }

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

    console.log(myLibrary);

    event.preventDefault();
}

function displayBooks() {
    document.querySelectorAll('#library-container *').forEach((book) => book.remove());

    for (let i in myLibrary) {
        const bookContainer = document.createElement('div');
        const bookCover = document.createElement('div');
        const bookInfo = document.createElement('div');

        appendElement(bookContainer, libraryEl, 'book-container');
        appendElement(bookCover, bookContainer, 'book-cover');
        appendElement(bookInfo, bookContainer, 'book-info');

        bookContainer.dataset.bookIndex = i;

        const statusIcon = document.createElement('i');
        bookInfo.appendChild(statusIcon);

        // const bookSettings = document.createElement('button');
        // appendElement(bookSettings, bookInfo, `settings-btn-${i}`);
        // appendElement(document.createElement('i'), bookSettings, 'fa-solid fa-list');

        const deleteBtn = document.createElement('button');
        appendElement(deleteBtn, bookInfo, `delete-btn-${i}`);
        appendElement(document.createElement('i'), deleteBtn, 'fa-solid fa-trash');

        for (prop in myLibrary[i]) {
            const info = document.createElement('p');

            info.dataset.bookProperty = prop;
            info.textContent = myLibrary[i][prop];

            if (prop === 'status') {
                bookInfo.appendChild(info);
            } else if (prop === 'pages') {
                bookInfo.appendChild(info);

                const settings = document.createElement('div');
                appendElement(settings, bookInfo, 'settings');
            } else if (prop === 'coverColor') {
                document.querySelector(`[data-book-index='${i}'] .book-cover`).style.background =
                    myLibrary[i][prop];
            } else if (prop === 'textColor') {
                document.querySelector(`[data-book-index='${i}'] .book-cover`).style.color =
                    myLibrary[i][prop];
            } else {
                bookCover.appendChild(info);
            }

            showStatus(statusIcon, myLibrary[i][prop]);
        }

        document.querySelector(`.delete-btn-${i}`).addEventListener('click', function () {
            document.querySelector(`[data-book-index='${i}']`).remove();
            myLibrary.splice(i, 1);
        });
    }
}

addBookBtn.addEventListener('click', () => toggleForm('block', 'blur(2px)', true));
bookForm.addEventListener('submit', addBookToLibrary);
