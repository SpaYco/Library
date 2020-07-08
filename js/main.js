const myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.bookStatus = function updateStat() {
  if (this.read === 'read') {
    this.read = 'unread';
  } else {
    this.read = 'read';
  }
};

function render() {
  document.getElementById('table').innerHTML = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    const currentTable = document.getElementById('table').innerHTML;
    const newBook = `<tr>\n<td>${myLibrary[i].name}</td>\n<td>${myLibrary[i].author}</td>\n<td>${myLibrary[i].pages}</td>\n<td class="status book${i}">${myLibrary[i].read}</td> <td><a onclick="removeBook(${i})" class="waves-effect waves-light btn-small red darken-3">Delete<i class="material-icons left">delete</i></a></td>
      </tr>`;
    document.getElementById('table').innerHTML = currentTable + newBook;
  }
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function formHide() {
  const form = document.getElementById('book-form');
  form.style.opacity = '0';
  form.style.height = '0';
  setTimeout(() => {
    form.style.display = 'none';
  }, 350);
}

/* eslint-disable */
function addBookToLibrary(book) {
/* eslint-enable */
  const form = document.getElementById('book-form');
  let read = '';
  if (form.status.checked) {
    read = 'read';
  } else {
    read = 'unread';
  }
  if (form.title.value !== '' && form.author.value !== '' && form.pages.value !== '') {
    const newBook = new Book(form.title.value, form.author.value, form.pages.value, read);
    myLibrary.push(newBook);
    render();
    formHide();
    document.querySelector('#book-form').reset();
    /* eslint-disable */
    M.toast({
    /* eslint-enable */
      html: 'Added!',
    });
  }
}

/* eslint-disable */
function importLocal() {
/* eslint-enable */
  JSON.parse(localStorage.getItem('library')).forEach(element => {
    myLibrary.push(element);
  });
  myLibrary.forEach(element => {
    element.bookStatus = function updateStat() {
      if (this.read === 'read') {
        this.read = 'unread';
      } else {
        this.read = 'read';
      }
    };
  });
}

/* eslint-disable */
function removeBook(num) {
/* eslint-enable */
  myLibrary.splice(num, 1);
/* eslint-disable */
  M.toast({
 /* eslint-enable */
    html: 'Deleted!',
  });
  render();
}

/* eslint-disable */
function formSubmit() {
/* eslint-enable */
  const form = document.getElementById('book-form');
  form.style.opacity = '0';
  form.style.display = 'block';
  form.style.height = 'auto';
  setTimeout(() => {
    form.style.opacity = '100';
  }, 50);
}

document.querySelector('#table').addEventListener('click', (e) => {
  if (e.target.classList.contains('status')) {
    const book = e.target.classList.item(1).split('').splice(4).join('');
    myLibrary[book].bookStatus();
  }
  render();
});