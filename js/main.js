let myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.bookStatus = function(el){
    if (el.classList.contains("status")) {
      if (el.innerHTML === "read") {
        el.innerHTML = "unread"
      } else {
        el.innerHTML = "read"
      }
    }
}


function addBookToLibrary(book) {
    // do stuff here
    let form = document.getElementById('book-form');
    let read = '';
    if (form.status.checked) {
        read = 'read';
    } else {
        read = 'unread';
    }
    if (form.title.value != '' && form.author.value != '' && form.pages.value != '') {
        const newBook = new Book(form.title.value, form.author.value, form.pages.value, read);
        myLibrary.push(newBook);
        render();
        formHide();
    }
}

function render() {
    document.getElementById('table').innerHTML = ''
    for (let i = 0; i < myLibrary.length; i++) {
        let current_table = document.getElementById('table').innerHTML;
        let newBook = `<tr>\n<td>${myLibrary[i].name}</td>\n<td>${myLibrary[i].author}</td>\n<td>${myLibrary[i].pages}</td>\n<td class="status">${myLibrary[i].read}</td> <td><a onclick="removeBook(${i})" class="waves-effect waves-light btn-small">Delete<i class="material-icons left">delete</i></a></td>
      </tr>`;
        document.getElementById('table').innerHTML = current_table + newBook;
    }
}

function removeBook(num) {
    myLibrary.splice(num, 1);
    render();
}

function formSubmit() {
    let form = document.getElementById('book-form')
    form.style.opacity = '0';
    form.style.display = 'block';
    form.style.height = 'auto';
    setTimeout(() => {
        form.style.opacity = '100';
    }, 50);
}

function formHide() {
    let form = document.getElementById('book-form')
    form.style.opacity = '0';
    form.style.height = '0';
    setTimeout(() => {
        form.style.display = 'none';
    }, 350);
}

document.querySelector("#table").addEventListener("click", (e) => {
  const newBook = new Book(name, author, pages, status)
  newBook.bookStatus(e.target)
})