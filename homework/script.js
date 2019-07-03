let money = +prompt('Ваш месячный доход?');
//console.log(money);
let mission = +prompt('Ваша цель?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').split(', ');
//console.log(addExpenses);
let deposit = prompt('Есть ли у вас депозит в банке?').localeCompare('да') === 0 ? true : false;
//console.log(deposit);

//console.log('money:', typeof (money));
//console.log('addExpenses:', typeof (addExpenses));
//console.log('deposit:', typeof (deposit));

let showTypeof = function (item) {
  console.log(item, typeof item);
}

showTypeof(money);
showTypeof(addExpenses);
showTypeof(deposit);

let monthlyExpense1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let sum1 = +prompt('Во сколько это обойдется?');
let monthlyExpense2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let sum2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - sum1 - sum2;
//console.log(budgetMonth);

//console.log('Количество месяцев для достижения цели:', Math.ceil(mission / budgetMonth)); //окрегуление в большую сторону

let budgetDay = budgetMonth / 30;
//console.log('Накоплений в день:', Math.floor(budgetDay)); //округление в меньшую сторонупше 

function getStatusIncome() {
  if (budgetDay >= 800) {
    return ('Высокий уровень дохода');
  } else if (budgetDay >= 300 && budgetDay < 800) {
    return ('Средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 300) {
    return ('Низкий уровень дохода');
  } else {
    return ('Что то пошло не так');
  };
}

console.log('getStatusIncome() :', getStatusIncome());



function getExpensesMonth(sum1, sum2) {
  return sum1 + sum2;
}

let accumulatedMonth = function getAccumulatedMonth(money, callback) {
  return money - callback;
}

console.log(accumulatedMonth(money, getExpensesMonth(sum1, sum2)));

function getTargetMonth(mission, callback) {
  return Math.floor(mission / callback)
}

console.log(getTargetMonth(mission, accumulatedMonth(money, getExpensesMonth(sum1, sum2))))