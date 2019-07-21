'use strict';

//Добрый день (утро, вечер, ночь в зависимости от времени суток)
//Сегодня: Понедельник
//Текущее время: 12: 05: 15 PM
//До нового года осталось 175 дней

function info() {

  let date = new Date(),
    days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayWeek = date.getUTCDay(),
    time = date.toLocaleTimeString('en'),
    dateNewYear = new Date('01.01.2020'),
    dayNewYear = Math.floor((dateNewYear - date) / 1000 / 60 / 60 / 24),
    hours = date.getHours();

  function creatP(text) {
    let p = document.createElement('p');
    p.innerHTML = text;
    document.body.appendChild(p);
  }

  function dayTime() {

    if (hours >= 22 && hours < 4) {
      console.log('Доброй ночи!');
      creatP('Доброй ночи!');
    } else if (hours >= 4 && hours < 10) {
      console.log('Доброе утро!');
      creatP('Доброе утро!');
    } else if (hours >= 10 && hours < 15) {
      console.log('Добрый день!');
      creatP('Добрый день!');
    } else {
      console.log('Добрый вечер!');
      creatP('Добрый вечер!');
    }

  }
  dayTime();
  creatP(`Текущее время: ${time}`);
  creatP(`Сегодня: ${days[dayWeek]}`);
  creatP(`До нового года осталось ${dayNewYear} дней`);

}

info();