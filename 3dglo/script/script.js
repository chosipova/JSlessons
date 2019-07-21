window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  //таймер
  function countTimer(deadline) {
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

  countTimer('22 july 2019');
})