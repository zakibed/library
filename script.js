const libraryElement = document.querySelector('#library-container');
const bookForm = document.querySelector('#book-form');
const newBookBtn = document.querySelector('#new-book-btn');
const removeFormBtn = document.querySelector('#book-form > i');
const root = document.querySelector(':root');
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme i');
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

    changeStatus(statusElement, statusIcon) {
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

        statusElement.removeChild(statusElement.lastChild);
        statusElement.append(this.status);
        statusIcon.className = this.getStatusIcon();
    }

    displayInLibrary() {
        const container = document.createElement('div');
        const cover = document.createElement('div');
        const info = document.createElement('div');
        const titleElement = document.createElement('p');
        const authorElement = document.createElement('p');
        const pagesElement = document.createElement('p');
        const deleteBtn = document.createElement('button');
        const deleteBtnIcon = document.createElement('i');
        const statusElement = document.createElement('button');
        const statusIcon = document.createElement('i');

        container.className = 'book-container';
        cover.className = 'book-cover';
        info.className = 'book-info';
        titleElement.className = 'title';
        authorElement.className = 'author';
        pagesElement.className = 'pages';
        deleteBtn.className = 'delete-btn';
        deleteBtnIcon.className = 'fa-solid fa-trash';
        statusElement.className = 'status';
        statusIcon.className = this.getStatusIcon();

        libraryElement.append(container);
        container.append(cover, info);
        cover.append(titleElement, authorElement);
        info.append(deleteBtn, statusElement, pagesElement);
        deleteBtn.append(deleteBtnIcon);
        statusElement.append(statusIcon);

        container.dataset.title = this.title;

        statusElement.append(this.status);
        cover.style.background = this.coverColor;
        cover.style.color = this.textColor;
        pagesElement.textContent = this.pages;
        titleElement.textContent = this.title;
        authorElement.textContent = this.author;

        deleteBtn.addEventListener('click', () =>
            document.querySelector(`[data-title="${this.title}"]`).remove()
        );

        statusElement.addEventListener('click', () =>
            this.changeStatus(statusElement, statusIcon)
        );
    }
}

function toggleForm(visibility, isDisabled) {
    bookForm.reset();
    bookForm.style.display = visibility;

    document.querySelectorAll('body > *:not(#book-form)').forEach((el) => {
        el.classList.toggle('disabled');
    });

    document.querySelectorAll('button:not(#submit-book-btn)').forEach((btn) => {
        btn.disabled = isDisabled;
    });
}

function toggleTheme() {
    root.className = themeToggle.checked ? 'dark' : 'light';
    themeIcon.id = 'theme-active';

    themeIcon.addEventListener('transitionend', () => {
        themeIcon.removeAttribute('id');
    });

    setTimeout(() => {
        themeIcon.className = themeToggle.checked
            ? 'fa-solid fa-moon'
            : 'fa-solid fa-sun';
    }, 200);
}

function addBookToLibrary(e) {
    const title = document.querySelector('#new-title').value;
    const author = document.querySelector('#new-author').value;
    const pages = document.querySelector('#new-pages').value;
    const status = document.querySelector('#new-status').value;
    const coverColor = document.querySelector('#new-cover-color').value;
    const textColor = document.querySelector('#new-text-color').value;
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
    toggleForm('none', false);
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

root.className = 'dark';

newBookBtn.addEventListener('click', () => toggleForm('block', true));
bookForm.addEventListener('submit', addBookToLibrary);
removeFormBtn.addEventListener('click', () => toggleForm('none', false));
themeToggle.addEventListener('change', toggleTheme);
