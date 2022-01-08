let myLibrary = [];

function NewBook (title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}

NewBook.prototype.info = function () {
    if (this.read) {
        readCheck = 'I have read this book'
    } else {
        readCheck = 'I have not read this book yet'
    }
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${readCheck}.`;
}

function addToLibrary(usersBook) {
    addShelf();
    const shelf = document.querySelector('.row:last-child');
    const libraryShelf = shelf.querySelector('.books');
    let currentLength = libraryShelf.querySelectorAll('.book').length;
    let deleteLine = document.createElement('div');
    deleteLine.textContent = 'X';;
    deleteLine.classList.add('delete');
    deleteLine.addEventListener('click', removeBook);
    let titleLine = document.createElement('div');
    titleLine.classList.add('spinetitle');
    let byLine = document.createElement('div');
    let authorLine = document.createElement('div');
    let pageCountLine = document.createElement('div');
    let readLine = document.createElement('div');
    titleLine.textContent = usersBook.title;
    byLine.textContent = 'By';
    authorLine.textContent = usersBook.author;
    pageCountLine.textContent = `Pages: ${usersBook.pageCount}`;
    pageCountLine.classList.add('pages')
    if (usersBook.read){
        readLine.textContent = 'read';
    } else{
        readLine.textContent = 'not yet read';
    }
    let newLines = [deleteLine,titleLine,byLine,authorLine,pageCountLine,readLine];

    let newBook = document.createElement('div');
    newBook.classList.add(`b${currentLength}`);
    newBook.classList.add(`book`);
    let height = Math.random();
    if (height > 0.70) {
        newBook.classList.add('large');
    } else if (height < 0.20) {
        newBook.classList.add('medium');
    } else {
        newBook.classList.add('small');
    }
    let newBookTitle = document.createElement('div');
    newBookTitle.textContent = usersBook.title;
    let titleContainer = document.createElement('div');
    titleContainer.classList.add('bookspine');
    titleContainer.appendChild(newBookTitle);
    titleContainer.addEventListener('click', openBook);
    let newBookInfo = document.createElement('ul');
    newBookInfo.classList.add(`full`);
    newLines.map(line => newBookInfo.appendChild(line));
    newBook.appendChild(titleContainer);
    newBook.appendChild(newBookInfo);
    libraryShelf.appendChild(newBook);
}

function removeBook (e) {
    const libraryShelf = document.querySelector('.books');
    let currentLength = libraryShelf.querySelectorAll('.book').length;
    let spacer = document.createElement('div');
    spacer.classList.add('spacer');
    let book = e.target.parentElement.parentElement;
    let position = book.classList[0].substring(1);
    myLibrary.splice(position,1);
    let currentLibrary = Array.from(libraryShelf.querySelectorAll('.book'));
    currentLibrary.splice(position,1);
    libraryShelf.innerHTML = '';
    libraryShelf.appendChild(spacer);
    currentLibrary.forEach(book => {
        book.classList.remove(`b${currentLength}`);
        book.classList.add(`b${currentLibrary.indexOf(book)}`)
        libraryShelf.appendChild(book);
    })
}

function parseInput() {
    toggleAddHidden();
    let title;
    let author;
    let pageCount;
    let read = false;
    const newBookForm = document.querySelector('.newbook');
    const bookInfo = newBookForm.querySelectorAll('input')
    bookInfo.forEach(attribute => {
        switch (attribute.id) {
            case 'title':
                title = attribute.value;
                break;
            case 'author':
                author = attribute.value;
                break;
            case 'pagecount':
                pageCount = attribute.value;
                break;
            case 'read':
                if (attribute.checked) {
                    read = true;
                }
                attribute.checked = false;
                break;
        }
        attribute.value = '';
    })
    const usersBook = new NewBook(title, author, pageCount, read)
    myLibrary.push(usersBook)
    console.log(myLibrary)
    addToLibrary(usersBook)
}

function toggleAddHidden() {
    let submit = document.querySelector('.submit')
    let noSubmit = document.querySelector('.nosubmit')
    submit.classList.toggle('hidden')
    noSubmit.classList.toggle('hidden')
}

function openBook(e) {
    let selectedBook;
    if (e.target.classList.contains('bookspine')){
        selectedBook = e.target.parentElement;
    } else {
        selectedBook = e.target.parentElement.parentElement;
    }
    if (selectedBook.querySelector('ul').classList.contains('open')) {
        selectedBook.querySelector('ul').classList.toggle('open')
    } else {
    let books = document.querySelectorAll('.full');
    books.forEach(book => {
        book.classList.remove('open')
    })
    selectedBook.querySelector('ul').classList.toggle('open')
    }
}

function addShelf () {
    let shelves = Array.from(document.querySelectorAll('.row'));
    let numberOfBooks = shelves[shelves.length - 1].querySelectorAll('.book').length;
    let numberOfShelves = shelves.length;
    if (numberOfBooks === 10) {
        let newShelf = document.querySelector(`.r0`).cloneNode(true);
        newShelf.classList.remove('r0');
        newShelf.classList.add(`r${numberOfShelves}`)
        let spacer = document.createElement('div');
        spacer.classList.add('spacer');
        newShelf.querySelector('.books').innerHTML = '';
        newShelf.querySelector('.books').appendChild(spacer);
        let library = document.querySelector('.library')
        library.appendChild(newShelf);
    } else {
        return;
    }
}


const submitbutton = document.querySelector('.addbook');
submitbutton.addEventListener('click', parseInput);
const toggleAdd = document.querySelectorAll('.toggle')
toggleAdd.forEach(toggle => {toggle.addEventListener('click', toggleAddHidden)})

// const theHobbit = new NewBook('The Hobbit', 'J.R.R. Tolkien', '295', true);
// console.log(theHobbit.info());