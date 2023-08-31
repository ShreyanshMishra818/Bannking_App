'use strict';

//BANKIST APP

// Data
const account1 = {
  owner: 'Shreyansh Mishra',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-05-27T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-US', // de-DE
};

const account2 = {
  owner: 'Kanika Sharma',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-07-13T18:49:59.371Z',
    '2023-07-18T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Pranshu Jaiswal',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-07-13T18:49:59.371Z',
    '2023-07-18T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-UK',
};

const account4 = {
  owner: 'Manav Rajaput Bhargava',
  movements: [430, 1000, 700, 50, 90, -90, 10, 200],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-07-13T18:49:59.371Z',
    '2023-07-18T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//Display Date
const displayDates = function (date, locale) {
  const timeBetween = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = timeBetween(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
//Display Balance
const displayMovements = function (acc, sort = false) {
  const mov = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  containerMovements.innerHTML = '';
  mov.forEach(function (val, i) {
    const dates = new Date(acc.movementsDates[i]);
    const displayDate = displayDates(dates, accounts.locale);
    const type = val > 0 ? 'deposit' : 'withdrawal';
    const html = `        
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${val}₹</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//To display User Name
const userName = function (account) {
  account.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
//To display total balace
const displayBalance = function (account) {
  account.currBalance = account.movements.reduce(
    (accu, curr) => accu + curr,
    0
  );
  labelBalance.textContent = `${account.currBalance}₹`;
};
//Display summary
const displaySummaryrupee = function (account) {
  const valurOut = account.movements
    .filter(filt => filt < 0)
    .reduce((accu, val) => accu + val, 0);

  const valueIn = account.movements
    .filter(filt => filt > 0)
    .reduce((accu, val) => accu + val, 0);

  const intrest = account.movements
    .filter(filt => filt > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((acc, dep) => acc + dep, 0)
    .toFixed(2);

  labelSumOut.textContent = `${Math.abs(valurOut)}₹`;
  labelSumIn.textContent = `${valueIn}₹`;
  labelSumInterest.textContent = `${intrest}₹`;
};
//Calling UI display functions
const displayUI = function (account) {
  displayMovements(account);
  displayBalance(account);
  displaySummaryrupee(account);
};

// To calculate total money in bank
const totalMoneyInBank = accounts
  .map(mov => mov.movements)
  .flat()
  .reduce((accu, mov) => accu + mov);

let currUser, timer;
//Displaying Logout Timer
const startLogoutTimer = function () {
  let time = 600;
  const tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearTimeout(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Login to get started`;
    }
    time--;
  };
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};
//Login
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currUser = accounts.find(acc => acc.userName === inputLoginUsername.value);
  if (currUser?.pin === +inputLoginPin.value) {
    //Display Name
    labelWelcome.textContent = `Welcome, ${currUser.owner.split(' ')[0]}`;
    //Display Today Date
    const options = {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long',
    };
    const date = new Date();
    const internationalizing = new Intl.DateTimeFormat(
      currUser.locale,
      options
    ).format(date);
    labelDate.textContent = internationalizing;
    //Displaying timeout
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    //Display UI
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    displayUI(currUser);
  }
});
//To Tranfer the money
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const transferUser = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (
    transferAmount > 0 &&
    transferUser &&
    currUser.currBalance >= transferAmount &&
    transferUser.userName !== currUser.userName
  ) {
    currUser.movements.push(-transferAmount);
    //to add movements of date
    currUser.movementsDates.push(new Date().toISOString());

    transferUser.movements.push(transferAmount);
    transferUser.movementsDates.push(new Date().toISOString());
    clearInterval(timer);
    timer = startLogoutTimer();
    displayUI(currUser);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});
//To loan money
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  setTimeout(function () {
    if (amount > 0 && currUser.movements.some(acc => acc >= 0.1 * amount)) {
      currUser.movements.push(amount);
      currUser.movementsDates.push(new Date().toISOString());
      displayUI(currUser);
      clearInterval(timer);
      timer = startLogoutTimer();
    }
  }, 1000);
  inputLoanAmount.value = '';
});
//To sort the payments
let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(accounts, !sorted);
  sorted = !sorted;
});
//To delete an account
btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    currUser.userName === inputCloseUsername.value &&
    currUser.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(acc => acc.userName === currUser.userName);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

//Calling UserName Creation
userName(accounts);

//Rough Work

// const withdrawal = function (movements) {
//   return movements.filter(mov => mov < 0);
// };
// console.log(withdrawal(movements));

// const arr = [];
// for (const mov of movements) if (mov < 0) arr.push(mov);
// console.log(arr);
// const accu = movements.reduce(function (acc, curr, i, arr) {
//   console.log(`Current iteration ${i}: ${acc}`);
//   return acc + curr;
// }, 10);
// let sum = 0;
// for (const i of movements) {
//   sum += i;
// }
// console.log(accu);
// console.log(sum);
// const lowest = movements.reduce(function (acc, curr, i, arr) {
//   return acc < curr ? acc : curr;
// }, movements[0]);
// console.log(lowest);

// const calcAverageHumanAge = function (arr) {
//   let j;
//   return (
//     arr
//       .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//       .filter(filt => filt > 18)
//       .reduce(function (accu, arr, i) {
//         j = i + 1;
//         return accu + arr;
//       }, 0) / j
//   );
// };
// console.log(
//   calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]),
//   calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
// );
// const movements = [2430, 1000, -700, 50, -90];
// movements.sort(
//   (a, b) => a - b
//   if (a > b) {
//     return 1;
//   }
//   if (b > a) {
//     return -1;
//   }
// );
// console.log(movements);

// const from = Array.from({ length: 100 }, () =>
//   Math.trunc(Math.random() * 6 + 1)
// );
// console.log(from);
// const arr= new Array(7);
// console.log(arr);
// arr.fill(0,3,5);
// console.log(arr);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('₹', ''))
//   );
//   console.log(movementsUI);
// });
// Array Methods Practice
// const deposit = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000);

// const deposits = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((accu, mov) => (mov >= 1000 ? ++accu : accu), 0);
// console.log(deposits);

// const reduceSummaryBank = accounts
//   .flatMap(mov => mov.movements)
//   .reduce(
//     (acc, mov) => {
//       mov > 0 ? (acc.deposit += mov) : (acc.withdrawal += mov);
//       return acc;
//     },
//     { deposit: 0, withdrawal: 0 }
//   );
// console.log(reduceSummaryBank);
// const convertTitleCase = function (title) {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const ans = title
//     .toLowerCase()
//     .split(' ')
//     .map(acc =>
//       exceptions.includes(acc) ? acc : acc[0].toUpperCase() + acc.slice(1)
//     )
//     .join(' ');
//   return ans;
// };
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));
// 1.
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum);

// // 2.
// // const numDeposits1000 = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov >= 1000).length;

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000);

// // Prefixed ++ oeprator
// let a = 10;
// console.log(++a);
// console.log(a);

// // 3.
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits, withdrawals);

// // 4.
// // this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitzalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
//     .join(' ');

//   return capitzalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK*/
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// dogs.forEach(elem => {
//   elem.reommendedFood = elem.weight ** 0.75 * 28;
//   if (elem.owners.includes('Sarah')) {
//     if (
//       elem.curFood > 0.9 * elem.reommendedFood &&
//       elem.curFood < elem.reommendedFood * 1.1
//     ) {
//       console.log('Normal Diet');
//     } else {
//       console.log('Abnormal');
//     }
//   }
// });
// console.log(0.1 + 0.2);
// console.log(1 / 10);
// console.log(3 / 10);
// console.log(Number.parseInt('23x'));
// console.log(Number.parseFloat('23.5xxx'));
// console.log(Number.isNaN(+'23x'));
// const now = Date();
// console.log(now);
// console.log(new Date(17, 6));
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));
//console.log(new Date(2037, 10, 19, 20, 5));

//onsole.log(timeBetween(new Date(2037, 3, 14), new Date(2037, 3, 24)));
// const kanika = [
//   509, 899, 444, 1130, 193, 129, 290, 2203, 119, 150, 3376, 2890, 910, 2782,
//   220, 183, 181, 374, 35, 199, 205, 281, 390, 260, 199, 176, 299, 748,
// ];
// console.log(kanika);
// const arr = kanika.reduce((accu, mov) => accu + mov, 0);
// console.log(arr);
// const num = 333388394.335;
// const options = {
//   style: 'currency',
//   currency: 'EUR',
// };
// console.log(new Intl.NumberFormat('en-US', options).format(num));
// console.log(new Intl.NumberFormat('ar-SY', options).format(num));
// console.log(new Intl.NumberFormat('de-DE', options).format(num));
// const ingredients = ['olive', 'spinac'];
// const timer = setTimeout(
//   (ing1, ing2) => console.log('Callback has been registerd'),
//   3000,
//   ...ingredients
// );
// console.log('waiting...');
// if (ingredients.includes('spinach')) clearTimeout(timer);
// setInterval(() => {
//   const now = new Date();
//   const second = now.getSeconds();
//   const min = now.getMinutes();
//   const hour = now.getHours();
//   console.log(`${hour}hh:${min}mm:${second}ss`);
// }, 1000);
