'use strict';

function DomElement(text) {
  this.selector = '.' || '#';
  this.height = 0;
  this.width = 0;
  this.bg = 'black';
  this.fontSize = 0;
  this.create = function (selector) {
    if (selector === '.') {
      console.log('1');
      var div = document.createElement('div');
      div.innerHTML = text;
      div.style.height = this.height + 'px';
      div.style.width = this.width + 'px';
      div.style.backgroundColor = this.bg;
      div.style.fontSize = this.fontSize + 'px';
      document.body.appendChild(div);
    } else if (selector === '#') {
      console.log('0');
      var p = document.createElement('p');
      p.innerHTML = text;
      p.innerHTML = text;
      p.style.height = this.height + 'px';
      p.style.width = this.width + 'px';
      p.style.backgroundColor = this.bg;
      p.style.fontSize = this.fontSize + 'px';
      document.body.appendChild(p);
    };
  };
};

let domElem1 = new DomElement('я изучаю js');
domElem1.width = 250;
domElem1.height = 50;
domElem1.bg = 'yellow';
domElem1.fontSize = 45;

domElem1.create('#');