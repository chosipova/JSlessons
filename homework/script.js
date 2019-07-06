'use strict';

let money,
  start = function () {
    money = prompt('Ваш месячный доход?', 50000);
    console.log(money);
    while (isNaN(money) || money == '' || money == null) {
      money = prompt('Ваш месячный доход?');
      console.log(money);
    }
  };

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposite: false,
  mission: 500000,
  period: 3,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 1);
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let keyExpenses,
      valueExpenses;
    for (let i = 0; i < 2; i++) {
      keyExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?');
      valueExpenses = prompt('Во сколько это обойдется?');
      while (isNaN(valueExpenses) || valueExpenses == '' || valueExpenses == null) {
        valueExpenses = prompt('Во сколько это обойдется?');
      }
      appData.expenses[keyExpenses] = valueExpenses
    }; // добавляем свойства для expenses

    //console.log(appData.expenses);

    appData.getExpensesMonth();

    console.log('Расходы за месяц: ', appData.expensesMonth);

    appData.getBudget();

    //console.log(appData.budgetDay, appData.budgetMonth);

    let targetMonth = appData.getTargetMonth();

    function targetMonthResult() {
      if (targetMonth < 0) {
        console.log('Цель не будет достигнута');
      } else {
        console.log("Цель будет достигнута за:", targetMonth, "месяцев (а)");
      }
    };

    targetMonthResult();

    console.log(appData.getStatusIncome());
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return Math.floor(appData.mission / appData.budgetMonth)
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 800) {
      return ('Высокий уровень дохода');
    } else if (appData.budgetDay >= 300 && appData.budgetDay < 800) {
      return ('Средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 300) {
      return ('Низкий уровень дохода');
    } else if (appData.budgetDay < 0) {
      return ('Что то пошло не так');
    };
  }
};

appData.asking();

console.log('Наша программа включает в себя данные:');
info();

function info() {
  for (let key in appData) {
    console.log(appData[key]);
  }
};