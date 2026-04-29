class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.id = crypto.randomUUID();
    }
}

let library = [
  new Book('To Kill a Mockingbird', 'Harper Lee', 400, 'done'),
  new Book('The Lord of the Rings', 'JRR Tolkien', 345, 'done'),
  new Book('Pride and Prejudice', 'Jane Austen', 345, 'done'),
];


function addBookToLibrary(title, author, pages, status) {
    library.push(new Book(title, author, pages, status));
    console.log(library);
}

addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 455)

const bookContainer = document.querySelector('.js-book-container');


function displayBook(library) {
    let bookCollection = '';

    for (const book of library) {
        const firstLetter = book.title[0].toUpperCase();
        bookCollection += `
            <div class="book-item" data-id="${book.id}">
                <div class="book-icon">${firstLetter}</div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>
                <span>${book.pages}</span>
                <span data-status="${book.status}">${book.status}</span>
                <button class="remove-button"
                    data-id="${book.id}">Remove</button>
            </div>
        `;
    }
    return bookCollection;
}

function render() {
  bookContainer.innerHTML = displayBook(library);
}

render();

const dialog = document.querySelector('dialog')

const openModal = document.querySelector('.open-modal');
openModal.addEventListener('click', () => {
    dialog.showModal();
})

const closeModal = document.querySelector('.close');
closeModal.addEventListener('click', () => {
    dialog.close();
})

dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})

//get input value from form inside dialog
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    addBookToLibrary(
        formData.get('title'), 
        formData.get('author'), 
        Number(formData.get('pages')), 
        formData.get('status')
    );
    render();
    form.reset();
    dialog.close();
});

//delete a book button associate with specific book object - using event delegation 
bookContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
        const id = e.target.dataset.id;
        library = library.filter(book => book.id !== id);
        render();
    }
});

