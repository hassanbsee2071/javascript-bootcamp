let myAccount = {
  Name: 'Syed Muhammad Hassan',
  Income: 900,
  Expense: 100

}

let addExpense = function (account, expense){

account.Expense = account.Expense + expense

}

let addIncome = function (account, income){

    account.Income = account.Income + income
 
 }


 let accountSummary = function (account){

    let balance = account.Income - account.Expense

    return `Your balance is ${balance}. Income is $${account.Income} and Expense is $${account.Expense}`
 }

 let accountReset = function (account){

    account.Income = 0
    account.Expense = 0

 }

 
console.log(accountSummary(myAccount))
addIncome(myAccount, 100)
console.log(accountSummary(myAccount))
addExpense(myAccount, 50)
console.log(accountSummary(myAccount))
accountReset(myAccount)
console.log(accountSummary(myAccount))