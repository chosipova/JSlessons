let money = 30300;
let income = 'frilans';
let addExpenses ='300, 7000, 4000';
let deposit = false;
let mission = 120000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);

console.log('Период', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay;
budgetDay = money / 30;
console.log('доход в день:', budgetDay, 'отстаток:', money % 30);

