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

  //слайдер

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dots = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      dot,
      interval;

    const addDots = () => {
      let dotItem = document.createElement('li');
      dotItem.classList.add('dot');
      for (let i = 0; i < slide.length; i++) {
        dots.appendChild(dotItem.cloneNode(true));
      }
      dot = document.querySelectorAll('.dot');
      dot[0].classList.add('dot-active');
    };

    addDots();

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 1000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault(); //чтобы убрать заглушки?

      let target = event.target;
      while (!target.matches('.portfolio-btn, .dot')) {
        return;
      };

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      };

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      };
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      };

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);
  };

  slider();

  const dataImgChange = () => {
    const command = document.querySelector('#command');

    let img;

    command.addEventListener('mouseover', (event) => {
      if (event.target.matches('.command__photo')) {
        img = event.target.src;
        event.target.src = event.target.dataset.img;
      }
    });

    command.addEventListener('mouseout', (event) => {
      if (event.target.matches('.command__photo')) {
        event.target.dataset.img = event.target.src;
        event.target.src = img;
      }
    });
  };

  dataImgChange();

  const calcValue = () => {
    const calcBlock = document.querySelector('.calc-block');

    calcBlock.addEventListener('input', (event) => {
      if (event.target.matches('.calc-item')) {
        event.target.value = event.target.value.replace(/\D/, '');
      }
    });
  };
  calcValue();

})