'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'es6-promise';
import 'web-animations-js';

import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import dataImgChange from './modules/dataImgChange';
import calcValue from './modules/calcValue';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//таймер

countTimer();

//меню

toggleMenu();

//popup

togglePopup();

//табы

tabs();

//слайдер

slider();

//смена изображения

dataImgChange();

//валидация

calcValue();

//калькулятор

calc();

//send-ajax=form

sendForm(document.getElementById('form1'));
sendForm(document.getElementById('form2'));
sendForm(document.getElementById('form3'));