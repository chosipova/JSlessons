'use strict';

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 50000);
      console.log(money);
    } while (isNaN(money) || money == '' || money == null);
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
  percentDiposite: 0,
  moneyDiposite: 0,
  mission: 500000,
  period: 3,
  asking: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome,
        cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'фриланс');
      }
      while (!isNaN(itemIncome) || itemIncome == '' || itemIncome == null);

      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      }
      while (isNaN(cashIncome) || cashIncome == '' || cashIncome == null);
      appData.income[itemIncome] = cashIncome;
    };

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 1);
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let keyExpenses,
      valueExpenses;
    for (let i = 0; i < 2; i++) {
      do {
        keyExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?');
      }
      while (!isNaN(keyExpenses) || keyExpenses == '' || keyExpenses == null);
      do {
        valueExpenses = prompt('Во сколько это обойдется?');
      } while (isNaN(valueExpenses) || valueExpenses == '' || valueExpenses == null);
      appData.expenses[keyExpenses] = valueExpenses;
    } // добавляем свойства для expenses

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
  },

  getInfoDeposite: function () {
    if (appData.deposite) {
      do {
        appData.percentDiposite = prompt('Какой годовой процент?', 10);
      }
      while (isNaN(appData.percentDiposite) || appData.percentDiposite == '' || appData.percentDiposite == null);
      do {
        appData.moneyDiposite = prompt('Какая сумма заложена?', 10000);
      }
      while (isNaN(appData.percentDiposite) || appData.percentDiposite == '' || appData.percentDiposite == null);
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();

console.log('Наша программа включает в себя данные:');
info();
console.log(getexpensesAndIncome());

function info() {
  for (let key in appData) {
    console.log(appData[key]);
  }
};

function getexpensesAndIncome() {
  let expensesAndIncome = '';
  for (let key in appData.expenses) {
    expensesAndIncome += capitlizeString(String(key)) + ', ';
  }
  for (let key in appData.income) {
    expensesAndIncome += capitlizeString(String(key));
  }
  return (expensesAndIncome);
};

function capitlizeString(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

//console.log(typeof (Object.keys(appData.income)), Object.keys(appData.expenses));

// appData.getInfoDeposite();
// console.log(appData.percentDiposite, appData.moneyDiposite, appData.calcSavedMoney());