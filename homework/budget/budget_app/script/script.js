'use strict';

const start = document.getElementById('start'),
  reset = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1];
let additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.querySelector('#deposit-check'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

function appData() {
  this.budget = 0,
    this.budgetDay = 0,
    this.budgetMonth = 0,
    this.income = {},
    this.incomeMonth = 0,
    this.addIncome = [],
    this.expenses = {},
    this.addExpenses = [],
    this.expensesMonth = 0,
    this.deposite = false,
    this.percentDiposite = 0,
    this.moneyDiposite = 0,
    this.start = function () {
      console.log(this);
      this.budget = +salaryAmount.value;
      this.expensesMonth = this.get('.expenses-items', '.expenses-title', '.expenses-amount', this.expenses, this.expensesMonth);
      this.incomeMonth = this.get('.income-items', '.income-title', '.income-amount', this.income, this.incomeMonth);
      this.getAddExpenses();
      this.getAddIncome();
      this.getInfoDeposite();
      this.getBudget();
      this.disableInpus();
      this.showResult();
    },
    this.showResult = function () {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('change', (event) => {
        this.incomePeriodValueChange();
      });
    },
    //добавляем блоки при нажатии на  +
    this.addBlock = function (name, title, amount, plus) {
      let items = document.querySelectorAll(name);
      let cloneItem = items[0].cloneNode(true);
      cloneItem.querySelector(title).value = '';
      cloneItem.querySelector(amount).value = '';
      items[0].parentNode.insertBefore(cloneItem, plus);
      items = document.querySelectorAll(name);
      if (items.length === 3) {
        plus.style.display = 'none';
      }
    },
    //получаем расходы и доходы, считаем месячный результат
    this.get = function (name, title, amount, obj, monthValue) {
      let items = document.querySelectorAll(name);
      items.forEach((item) => {
        let elem = item.querySelector(title).value;
        let cash = item.querySelector(amount).value;
        if (elem !== '' && cash !== '') {
          obj[elem] = cash;
          console.log(obj);
        }
      });
      for (let key in obj) {
        monthValue += +obj[key];
      }
      return monthValue;
    },
    this.getAddExpenses = function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
          this.addExpenses.push(item);
        }
      })
    },
    this.getAddIncome = function () {
      additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          this.addIncome.push(itemValue);
        }
      })
    },

    this.getBudget = function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDiposite * this.percentDiposite);
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    this.getTargetMonth = function () {
      return targetAmount.value / this.budgetMonth;
    },

    this.getInfoDeposite = function () {
      if (this.deposite) {
        this.percentDiposite = depositPercent.value;
        this.moneyDiposite = depositAmount.value;
      }
    },

    this.calcPeriod = function () {
      return this.budgetMonth * periodSelect.value;
    },

    this.periodChange = function () {
      periodAmount.textContent = periodSelect.value;
    },

    this.incomePeriodValueChange = function () {
      incomePeriodValue.value = this.budgetMonth * periodSelect.value;
      //console.log(incomePeriodValue.value);
    },

    this.disableInpus = function () {
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
    this.enableInputs = function () {
      let inputs = document.querySelector('.data').querySelectorAll('input');
      inputs.forEach(function (item) {
        if (item.type === 'text') {
          item.removeAttribute('readonly', 'readonly');
          //onsole.log(item);
        }
      });
    },
    this.disableBtn = function (input) {
      start.disabled = input.value === '';
    },

    this.reset = function () {
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
      depositAmount.value = '';
      depositPercent.value = '';

      incomeTitle.value = '';
      expensesTitle.value = '';
      additionalExpenses.value = '';
      additionalExpensesItem.value = '';
      targetAmount.value = '';
      salaryAmount.value = '';

      additionalIncomeItems.forEach((item) => {
        item.value = '';
      });

      expensesItems.forEach((item) => {
        item.querySelector('.expenses-title').value = '';
        item.querySelector('.expenses-amount').value = ''
      });

      incomeItems.forEach((item) => {
        item.querySelector('.income-title').value = '';
        item.querySelector('.income-amount').value = ''
      });

      for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
      }

      for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
      }

      this.enableInputs();
      reset.style.display = 'none';
      start.style.display = 'block';
    },

    this.eventsListeners = function () {

      start.addEventListener('click', this.start.bind(this));

      reset.addEventListener('click', this.reset.bind(this));

      salaryAmount.addEventListener('input', this.disableBtn.bind(this), false);
      this.disableBtn(salaryAmount);

      expensesPlus.addEventListener('click', () => {
        this.addBlock('.expenses-items', '.expenses-title', '.expenses-amount', expensesPlus);
      });

      incomePlus.addEventListener('click', () => {
        this.addBlock('.income-items', '.income-title', '.income-amount', incomePlus);
      });

      periodSelect.addEventListener('change', this.periodChange.bind(this));

      depositCheck.addEventListener('change', () => {
        if (depositCheck.checked) {
          depositBank.style.display = 'inline-block';
          depositAmount.style.display = 'inline-block';
          appData1.deposite = true;
          depositBank.addEventListener('change', function () {
            const selectIndex = this.options[this.selectedIndex].value;
            console.log(selectIndex);
            if (selectIndex === 'other') {
              depositPercent.style.display = 'inline-block';
              depositPercent.value = '';
            } else {
              depositPercent.style.display = 'none';
              depositPercent.value = selectIndex;
            }
          });
        } else {
          depositBank.style.display = 'none';
          depositAmount.style.display = 'none';
          appData1.deposite = false;
          depositAmount.value = '';
          depositPercent.value = '';
        }
      })

    }
};

let appData1 = new appData();

appData1.eventsListeners();