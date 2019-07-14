'use strict';

let start = document.getElementById('start'),
  reset = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  targetAmount = document.querySelector('.target-amount'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  incomeItems = document.querySelectorAll('.income-items'),
  additionalIncomeItems = document.querySelectorAll('.additional_income-item');
//targetAmount = document.querySelector('target-amount'),
// depositAmount = document.querySelector('deposit-amount'),
// depositPercent = document.querySelector('deposit-percent'),

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposite: false,
  percentDiposite: 0,
  moneyDiposite: 0,
  start: function () {
    console.log(this);
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.disableInpus();
    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function (event) {
      appData.incomePeriodValueChange();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    })
  },

  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },

  // getStatusIncome: function () {
  //   if (appData.budgetDay >= 800) {
  //     return ('Высокий уровень дохода');
  //   } else if (appData.budgetDay >= 300 && appData.budgetDay < 800) {
  //     return ('Средний уровень дохода');
  //   } else if (appData.budgetDay >= 0 && appData.budgetDay < 300) {
  //     return ('Низкий уровень дохода');
  //   } else if (appData.budgetDay < 0) {
  //     return ('Что то пошло не так');
  //   };
  // },

  // getInfoDeposite: function () {
  //   if (appData.deposite) {
  //     do {
  //       appData.percentDiposite = prompt('Какой годовой процент?', 10);
  //     }
  //     while (isNaN(appData.percentDiposite) || appData.percentDiposite == '' || appData.percentDiposite == null);
  //     do {
  //       appData.moneyDiposite = prompt('Какая сумма заложена?', 10000);
  //     }
  //     while (isNaN(appData.percentDiposite) || appData.percentDiposite == '' || appData.percentDiposite == null);
  //   }
  // },

  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },

  periodChange: function () {
    periodAmount.textContent = periodSelect.value;
  },

  incomePeriodValueChange: function () {
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    //console.log(incomePeriodValue.value);
  },

  disableInpus: function () {
    let inputs = document.querySelector('.data').querySelectorAll('input');
    inputs.forEach(function (item) {
      if (item.type === 'text') {
        item.setAttribute('readonly', 'readonly');
        //onsole.log(item);
      }
    });
    start.style.display = 'none';
    reset.style.display = 'block';
  },
  enableInputs: function () {
    let inputs = document.querySelector('.data').querySelectorAll('input');
    inputs.forEach(function (item) {
      if (item.type === 'text') {
        item.removeAttribute('readonly', 'readonly');
        //onsole.log(item);
      }
    });
  },
  disableBtn: function (input) {
    start.disabled = input.value === '';
  },

  reset: function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposite = false;
    this.percentDiposite = 0;
    this.moneyDiposite = 0;
    periodSelect.value = 0;
    periodAmount.textContent = 1;
    additionalIncomeItem.value = '';
    budgetDayValue.value = '';
    budgetMonthValue.value = '';
    expensesMonthValue.value = '';
    additionalIncomeValue.value = '';
    additionalExpensesValue.value = '';
    incomePeriodValue.value = '';
    targetMonthValue.value = '';

    incomeTitle.value = '';
    expensesTitle.value = '';
    additionalExpenses.value = '';
    additionalExpensesItem.value = '';
    targetAmount.value = '';
    salaryAmount.value = '';

    additionalIncomeItems.forEach(function (item) {
      item.value = '';
    });

    expensesItems.forEach(function (item) {
      item.querySelector('.expenses-title').value = '';
      item.querySelector('.expenses-amount').value = ''
    });

    incomeItems.forEach(function (item) {
      item.querySelector('.income-title').value = '';
      item.querySelector('.income-amount').value = ''
    });

    for (var i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
    }

    for (var i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
    }

    this.enableInputs();
    reset.style.display = 'none';
    start.style.display = 'block';
  }
};

salaryAmount.addEventListener('input', appData.disableBtn.bind(appData), false);
appData.disableBtn(salaryAmount);


start.addEventListener('click', appData.start.bind(appData));
reset.addEventListener('click', appData.reset.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('change', appData.periodChange.bind(appData));