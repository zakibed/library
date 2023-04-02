const libraryEl = document.querySelector('#library-container');
const form = document.querySelector('#book-form');
const addBookBtn = document.querySelector('#add-book-btn');
const removeFormBtn = document.querySelector('#book-form > i');
const root = document.querySelector(':root');
const theme = document.querySelector(`input[type='checkbox']`);
const themeBtn = document.querySelector('#theme i');
const myLibrary = [];

class Book {
    constructor(title, author, pages, status, coverColor, textColor) {
        this.title = title;
        this.author = author;
        this.title = title;
        this.author = author;
        this.status = status;
        this.pages = pages;
        this.coverColor = coverColor;
        this.textColor = textColor;
    }

    changeStatus() {
        switch (this.status) {
            case 'Finished':
                this.status = 'Not read';
                break;
            case 'Reading':
                this.status = 'Finished';
                break;
            default:
                this.status = 'Reading';
        }
    }

    getStatusIcon() {
        switch (this.status) {
            case 'Finished':
                return 'fa-solid fa-circle-check';
            case 'Reading':
                return 'fa-solid fa-spinner';
            default:
                return 'fa-solid fa-circle-exclamation';
        }
    }

    displayInLibrary() {
        const bookContainer = document.createElement('div');
        const bookCover = document.createElement('div');
        const bookInfo = document.createElement('div');
        const deleteBookBtn = document.createElement('button');
        const deleteBookIcon = document.createElement('i');
        const bookStatus = document.createElement('button');
        const bookStatusIcon = document.createElement('i');
        const bookPages = document.createElement('p');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');

        bookContainer.className = 'book-container';
        bookCover.className = 'book-cover';
        bookInfo.className = 'book-info';
        deleteBookBtn.className = 'delete-btn';
        deleteBookIcon.className = 'fa-solid fa-trash';
        bookStatus.className = 'status';
        bookStatusIcon.className = this.getStatusIcon();
        bookPages.className = 'pages';
        bookTitle.className = 'title';
        bookAuthor.className = 'author';

        libraryEl.append(bookContainer);
        bookContainer.append(bookCover);
        bookContainer.append(bookInfo);
        bookInfo.append(deleteBookBtn);
        deleteBookBtn.append(deleteBookIcon);
        bookInfo.append(bookStatus);
        bookStatus.append(bookStatusIcon);
        bookInfo.append(bookPages);
        bookCover.append(bookTitle);
        bookCover.append(bookAuthor);

        bookContainer.dataset.index = myLibrary.indexOf(this);
        bookContainer.dataset.title = this.title;

        bookStatus.append(this.status);
        bookCover.style.background = this.coverColor;
        bookCover.style.color = this.textColor;
        bookPages.textContent = this.pages;
        bookTitle.textContent = this.title;
        bookAuthor.textContent = this.author;
    }
}

myLibrary.push(
    new Book(
        'The Fellowship of the Ring',
        'J.R.R. Tolkien',
        423,
        'Finished',
        'brown',
        'gold'
    ),
    new Book(
        'The Two Towers',
        'J.R.R. Tolkien',
        352,
        'Reading',
        'darkolivegreen',
        'gold'
    ),
    new Book(
        'The Return of the King',
        'J.R.R. Tolkien',
        416,
        'Not read',
        'darkslateblue',
        'gold'
    )
);

myLibrary.forEach((book) => {
    book.displayInLibrary();
});

function toggleForm(visibility, blur, disabled) {
    form.style.display = visibility;

    document.querySelectorAll('body > *:not(#book-form)').forEach((el) => {
        el.style.filter = blur;
    });

    document.querySelectorAll('button:not(#submit-book-btn)').forEach((btn) => {
        btn.disabled = disabled;
    });

    form.reset();
}

function addBookToLibrary(e) {
    const title = document.querySelector('#new-title').value;
    const author = document.querySelector('#new-author').value;
    const pages = document.querySelector('#new-pages').value;
    const status = document.querySelector('#new-status').value;
    const coverColor = document.querySelector('#cover-color').value;
    const textColor = document.querySelector('#text-color').value;
    const newBook = new Book(
        title,
        author,
        pages,
        status,
        coverColor,
        textColor
    );

    myLibrary.push(newBook);
    newBook.displayInLibrary();
    e.preventDefault();
    toggleForm('none', 'blur(0px)', false);
}

root.className = 'dark';

addBookBtn.addEventListener('click', () => {
    toggleForm('block', 'blur(2px)', true);
});

removeFormBtn.addEventListener('click', () => {
    toggleForm('none', 'blur(0px)', false);
});

form.addEventListener('submit', addBookToLibrary);

theme.addEventListener('change', () => {
    root.className = theme.checked ? 'dark' : 'light';
});

themeBtn.addEventListener('click', function () {
    this.id = 'clicked';
    setTimeout(() => {
        this.className =
            this.className === 'fa-solid fa-moon'
                ? 'fa-solid fa-sun'
                : 'fa-solid fa-moon';
    }, 200);
});

themeBtn.addEventListener('transitionend', function () {
    this.removeAttribute('id');
});
