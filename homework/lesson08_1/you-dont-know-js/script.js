'use strict';

let books = document.querySelectorAll('.books'),
  book = document.querySelectorAll('.book');

console.log(books, book);

books[0].insertBefore(book[1], book[0]);
books[0].insertBefore(book[2], null);
books[0].insertBefore(book[4], book[3]);


let bg = document.querySelector('body');

bg.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');

book[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

let elem = document.querySelector('.adv');
elem.parentNode.removeChild(elem);

let ulBook = book[0].querySelector('ul'),
  liBook = book[0].querySelectorAll('li');

ulBook.insertBefore(liBook[6], liBook[4]);
ulBook.insertBefore(liBook[8], liBook[4]);

let ulBook1 = book[5].querySelector('ul'),
  liBook1 = book[5].querySelectorAll('li');

ulBook1.insertBefore(liBook1[9], liBook1[2]);
ulBook1.insertBefore(liBook1[5], liBook1[8]);
ulBook1.insertBefore(liBook1[2], liBook1[6]);

let newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
book[2].querySelector('ul').appendChild(newElem);

let ulBook2 = book[2].querySelector('ul'),
  liBook2 = book[2].querySelectorAll('li');

ulBook2.insertBefore(liBook2[10], liBook2[9]);


//document.querySelector('.adv').removeChild();

//console.log(book[4].querySelector('h2').textContent);