class Book {
    
    constructor (_title, _author, _pageCount, _read) {
        this.title = _title;
        this.author = _author;
        this.pageCount = _pageCount;
        this.read = _read;
        this.height = Math.random().toFixed(2);
    }

    get info () {
        if (this.read) {
            readCheck = 'I have read this book'
        } else {
            readCheck = 'I have not read this book yet'
        }
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${readCheck}.`;
    }

    changeReadStatus () {
        this.read = !this.read;
        library.changeReadStatus(this.title, this.author);
    }

}


//module for libarary
const library = (() => {
    const booksInLibrary = [];

    // add book
    const addBook = (book) => {
        booksInLibrary.push(book);
        addBookHTML(book);
    }

    const addBookHTML = (book) => {
        displayHandler.addShelf();
        const shelf = document.querySelector('.row:last-child');
        const libraryShelf = shelf.querySelector('.books');
        const currentLength = booksInLibrary.length - 1;

        const deleteLine = document.createElement('div');
        deleteLine.textContent = 'X';;
        deleteLine.classList.add('delete');
        deleteLine.addEventListener('click', library.removeBook);

        const titleLine = document.createElement('div');
        titleLine.classList.add('spinetitle');
        titleLine.textContent = book.title;

        const byLine = document.createElement('div');
        byLine.textContent = 'By';

        const authorLine = document.createElement('div');
        authorLine.textContent = book.author;

        const pageCountLine = document.createElement('div');
        pageCountLine.textContent = `Pages: ${book.pageCount}`;
        pageCountLine.classList.add('pages')

        const readLine = document.createElement('div');
        readLine.classList.add('read')
        if (book.read){
            readLine.textContent = 'has been read';
        } else{
            readLine.textContent = 'not yet read';
        }
        readLine.addEventListener('click', () => {book.changeReadStatus()});
        
        const newLines = [deleteLine, titleLine, byLine, authorLine, pageCountLine, readLine];
    
        const newBook = document.createElement('div');
        newBook.classList.add(`b${currentLength}`);
        newBook.classList.add(`book`);

        
        if (book.height > 0.70) {
            newBook.classList.add('large');
        } else if (book.height < 0.20) {
            newBook.classList.add('medium');
        } else {
            newBook.classList.add('small');
        }

        let newBookTitle = document.createElement('div');
        newBookTitle.textContent = book.title;

        let titleContainer = document.createElement('div');
        titleContainer.classList.add('bookspine');
        titleContainer.appendChild(newBookTitle);
        titleContainer.addEventListener('click', displayHandler.openBook);

        let newBookInfo = document.createElement('ul');
        newBookInfo.classList.add(`full`);
        newLines.map(line => newBookInfo.appendChild(line));
        newBook.appendChild(titleContainer);
        newBook.appendChild(newBookInfo);

        libraryShelf.appendChild(newBook);
    }
    
    // remove book
    const removeBook = (e) => {
        const book = e.target.parentElement.parentElement;
        const position = book.classList[0].substring(1);
        booksInLibrary.splice(position,1);
        const spacer = document.createElement('div');
        spacer.classList.add('spacer');
        const newShelf = document.querySelector(`.r0`).cloneNode(true);
        booksOnShelf = newShelf.querySelector('.books');
        booksOnShelf.innerHTML = '';
        booksOnShelf.appendChild(spacer);
        const library = document.querySelector('.library');
        library.innerHTML = '';
        library.appendChild(newShelf)
        booksInLibrary.forEach(book => addBookHTML(book));
    }

    const changeReadStatus = (title, author) => {
        const index = booksInLibrary.indexOf(booksInLibrary.find(element => {
            if(element.title === title && element.author === author) {
                return true;
            }
        }))
        let booktoChange = document.querySelector(`.b${index}`)
        let readStatus = booktoChange.querySelector('.read')
        if (readStatus.textContent === 'has been read') {
            readStatus.textContent = 'not yet read';
        } else {
            readStatus.textContent = 'has been read';
        }
    }

    const getLibrary = () => {
        const arrayToReturn = booksInLibrary.map(({title, author, pageCount, read}) => ({title, author, pageCount, read}))
        return arrayToReturn;
    }

    return {addBook, removeBook, changeReadStatus, getLibrary};
})();

//module for new book input
const newBook = (() => {

    // parse input as constructor
    const input = () => {
        toggleHidden();
        let title;
        let author;
        let pageCount;
        let read = false;
        const newBookForm = document.querySelector('.newbook');
        const bookInfo = newBookForm.querySelectorAll('input');
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
        const book = new Book(title, author, pageCount, read);
        library.addBook(book);
    }

    // toggle hidden
    const toggleHidden = () => {
        const submit = document.querySelector('.submit');
        const noSubmit = document.querySelector('.nosubmit');
        submit.classList.toggle('hidden');
        noSubmit.classList.toggle('hidden');
    }

    return {input, toggleHidden};
})();

//display handler module
const displayHandler = (() => {

    // add inital conditions
    const init = () => {
        const submitbutton = document.querySelector('.addbook');
        submitbutton.addEventListener('click', newBook.input);

        const toggleAdd = document.querySelectorAll('.toggle');
        toggleAdd.forEach(toggle => {toggle.addEventListener('click', newBook.toggleHidden)});
    }


    // open book
    const openBook = (e) => {
        const selectedBook = e.currentTarget.parentElement;
        if (selectedBook.querySelector('ul').classList.contains('open')) {
            selectedBook.querySelector('ul').classList.toggle('open')
        } else {
        const books = document.querySelectorAll('.full');
        books.forEach(book => {
            book.classList.remove('open')
        })
        selectedBook.querySelector('ul').classList.toggle('open')
        }
    }

    // add shelf
    const addShelf = () => {
        const shelves = Array.from(document.querySelectorAll('.row'));
        const numberOfBooks = shelves[shelves.length - 1].querySelectorAll('.book').length;
        const numberOfShelves = shelves.length;
        if (numberOfBooks === 10) {
            const newShelf = document.querySelector(`.r0`).cloneNode(true);
            newShelf.classList.remove('r0');
            newShelf.classList.add(`r${numberOfShelves}`)
            const spacer = document.createElement('div');
            spacer.classList.add('spacer');
            newShelf.querySelector('.books').innerHTML = '';
            newShelf.querySelector('.books').appendChild(spacer);
            const library = document.querySelector('.library')
            library.appendChild(newShelf);
        } else {
            return;
        }
    }

    return {init, openBook, addShelf}
})();

displayHandler.init()