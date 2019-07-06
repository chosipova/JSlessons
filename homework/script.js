let money,
  //console.log(money);
  mission = +prompt('Ваша цель?', 1000000),
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 1).split(', '),
  //console.log(addExpenses);
  //let deposit = prompt('Есть ли у вас депозит в банке?').localeCompare('да') === 0 ? true : false;
  deposit = confirm('Есть ли у вас депозит в банке?');
//console.log(deposit);

//console.log('money:', typeof (money));
//console.log('addExpenses:', typeof (addExpenses));
//console.log('deposit:', typeof (deposit));

let start = function () {
  money = prompt('Ваш месячный доход?', 50000);
  console.log(money);
  while (isNaN(money) || money == '' || money == null) {
    money = prompt('Ваш месячный доход?');
    console.log(money);
  }
};

start();

let showTypeof = function (item) {
  console.log(item, typeof item);
}

showTypeof(money);
showTypeof(addExpenses);
showTypeof(deposit);

//let monthlyExpense1 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
//let sum1 = +prompt('Во сколько это обойдется?');
//let monthlyExpense2 = prompt('Какие обязательные ежемесячные расходы у вас есть?');
//let sum2 = +prompt('Во сколько это обойдется?');

//let budgetMonth = money - sum1 - sum2;
//console.log(budgetMonth);

//console.log('Количество месяцев для достижения цели:', Math.ceil(mission / budgetMonth)); //окрегуление в большую сторону

//let budgetDay = budgetMonth / 30;
//console.log('Накоплений в день:', Math.floor(budgetDay)); //округление в меньшую сторонупше 

let monthlyExpense1,
  monthlyExpense2;

function expensesMonth() {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      monthlyExpense1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'кредит');
    } else if (i == 1) {
      monthlyExpense2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'машина');
    }
    let expense = prompt('Во сколько это обойдется?');
    while (isNaN(expense) || expense == '' || expense == null) {
      expense = prompt('Во сколько это обойдется?');
    }
    sum += expense;
  }
  return sum;
}

let expensesAmount = expensesMonth();

let accumulatedMonth = function getAccumulatedMonth(money, expenses) {
  return money - expenses;
}

console.log("Ваш доход:", accumulatedMonth(money, expensesAmount));

function getTargetMonth(mission, callback) {
  return Math.floor(mission / callback)
}

let targetMonth = getTargetMonth(mission, accumulatedMonth(money, expensesAmount));

function targetMonthResult() {
  if (targetMonth < 0) {
    console.log('Цель не будет достигнута');
  } else {
    console.log("Цель будет достигнута за:", targetMonth, "месяцев (а)");
  }
};

targetMonthResult();

let budgetDay = money - expensesAmount;

function getStatusIncome() {
  if (budgetDay >= 800) {
    return ('Высокий уровень дохода');
  } else if (budgetDay >= 300 && budgetDay < 800) {
    return ('Средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 300) {
    return ('Низкий уровень дохода');
  } else if (budgetDay < 0) {
    return ('Что то пошло не так');
  };
}

console.log('getStatusIncome() :', getStatusIncome());