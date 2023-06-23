const myLibrary = [];

class Book {
    constructor(title, author, pages, status, coverColor, textColor) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.coverColor = coverColor;
        this.textColor = textColor;
    }

    addToLibrary() {
        myLibrary.push(this);
        Display.updateLibrary();
    }

    removeFromLibrary() {
        myLibrary.splice(myLibrary.indexOf(this), 1);
        Display.updateLibrary();
    }

    switchStatus() {
        switch (this.status) {
            case 'Not Read':
                this.status = 'Reading';
                break;
            case 'Reading':
                this.status = 'Finished';
                break;
            default:
                this.status = 'Not Read';
                break;
        }

        Display.updateLibrary();
    }
}

class Display {
    static createBook(book) {
        const element = document.createElement('div');
        element.dataset.index = myLibrary.indexOf(book);
        element.classList.add('book');

        const cover = document.createElement('div');
        cover.style.backgroundColor = book.coverColor;
        cover.style.color = book.textColor;
        cover.classList.add('book-cover');
        element.appendChild(cover);

        const title = document.createElement('p');
        title.textContent = book.title;
        title.classList.add('book-title');
        cover.appendChild(title);

        const author = document.createElement('p');
        author.textContent = book.author;
        author.classList.add('book-author');
        cover.appendChild(author);

        const info = document.createElement('div');
        info.className = 'book-info';
        element.appendChild(info);

        const statusBtn = document.createElement('button');
        statusBtn.classList.add('btn-book-status');
        info.appendChild(statusBtn);

        const statusIcon = document.createElement('i');
        statusBtn.appendChild(statusIcon);
        statusBtn.appendChild(document.createTextNode(book.status));

        if (book.status === 'Finished') {
            statusIcon.classList.add('fa-solid', 'fa-circle-check');
        } else if (book.status === 'Reading') {
            statusIcon.classList.add('fa-solid', 'fa-book-open-reader');
        } else {
            statusIcon.classList.add('fa-solid', 'fa-circle-exclamation');
        }

        const pages = document.createElement('p');
        pages.textContent = book.pages;
        pages.classList.add('book-pages');
        info.appendChild(pages);

        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add('btn-delete-book');
        info.appendChild(deleteBookBtn);

        const deleteBookIcon = document.createElement('i');
        deleteBookIcon.classList.add('fa-solid', 'fa-trash-can');
        deleteBookBtn.appendChild(deleteBookIcon);

        deleteBookBtn.addEventListener('click', () => book.removeFromLibrary());
        statusBtn.addEventListener('click', () => book.switchStatus());

        return element;
    }

    static updateLibrary() {
        const library = document.querySelector('.library');

        library.textContent = '';
        myLibrary.forEach((book) => library.appendChild(this.createBook(book)));
    }

    static toggleModal(modal, toggle) {
        modal.style.display = toggle ? 'flex' : 'none';

        document
            .querySelectorAll(`body > *:not(.${modal.classList[0]})`)
            .forEach((el) => {
                el.classList.toggle('blur');
            });
        document
            .querySelectorAll(`button:not(.${modal.classList[0]} button)`)
            .forEach((btn) => {
                btn.disabled = toggle;
            });

        modal.reset();
    }

    static toggleTheme() {
        const root = document.querySelector(':root');
        const icon = document.querySelector('.theme i');

        root.className = this.checked ? 'light' : '';
        icon.className = this.checked ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

const addBookBtn = document.querySelector('.btn-add-book');
const addBookModal = document.querySelector('.modal-add-book');
const removeModalBtn = document.querySelector('.btn-remove-modal');
const themeToggle = document.querySelector('#theme-toggle');
const sampleBooks = [
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
        'Not Read',
        'darkslateblue',
        'gold'
    )
];

function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.querySelector('#add-book-title').value;
    const author = document.querySelector('#add-book-author').value;
    const pages = document.querySelector('#add-book-pages').value;
    const status = document.querySelector('#add-book-status').value;
    const coverColor = document.querySelector('#add-book-cover-color').value;
    const textColor = document.querySelector('#add-book-text-color').value;
    const book = new Book(title, author, pages, status, coverColor, textColor);

    book.addToLibrary();
    Display.updateLibrary();
    Display.toggleModal(addBookModal, false);
}

sampleBooks.forEach((book) => book.addToLibrary());

addBookModal.addEventListener('submit', addBookToLibrary);
addBookBtn.addEventListener('click', () =>
    Display.toggleModal(addBookModal, true)
);
removeModalBtn.addEventListener('click', () =>
    Display.toggleModal(addBookModal, false)
);
themeToggle.addEventListener('change', Display.toggleTheme);
