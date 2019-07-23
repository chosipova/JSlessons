window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  //таймер
  const countTimer = (deadline) => {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }

    function updateClock() {
      let timer = getTimeRemaining();
      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      } else {
        if (timer.hours < 10) {
          timerHours.textContent = '0' + timer.hours;
        } else {
          timerHours.textContent = timer.hours;
        }
        if (timer.minutes < 10) {
          timerMinutes.textContent = '0' + timer.minutes;
        } else {
          timerMinutes.textContent = timer.minutes;
        }
        if (timer.seconds < 10) {
          timerSeconds.textContent = '0' + timer.seconds;
        } else {
          timerSeconds.textContent = timer.seconds;
        }
      }

      // if (timer.timeRemaining > 0) {
      //   setTimeout(updateClock, 1000);
      // }
      let intervalId = setInterval(() => {
        if (timer.timeRemaining > 0) {
          updateClock();
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    }

    updateClock();
  }

  countTimer('7 30 2019');

  //меню

  const toggleMenu = () => {
    const menu = document.querySelector('menu'),
      body = document.querySelector('body');

    const addMenu = () => {
      menu.classList.add('active-menu');
    };

    const removeMenu = () => {
      menu.classList.remove('active-menu');
    };

    body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.menu')) {
        addMenu();
      } else if (!target.closest('menu')) {
        removeMenu();
      } else if (target.closest('ul>li')) {
        removeMenu();
      } else if (target.classList.contains('close-btn')) {
        removeMenu();
      }

    })

  };

  toggleMenu();

  //popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      availWidth = screen.availWidth;

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (availWidth > 420) {
          popupContent.animate([{
              top: '-50%'
            },
            {
              top: '10%'
            }
          ], 1000);
        };
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }




    })
  };

  togglePopup();

  //табы

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target !== null) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });

      }
    })
  };

  tabs();
})