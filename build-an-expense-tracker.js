const myAccount = {
  Name: 'Syed Muhammad Hassan',
  Expense: [],
  Income: [],
  addExpense: function (description, amount){
    this.Expense.push({
     description: description,
     amount: amount
     }) 
  },

  addIncome: function (description, amount){
   this.Income.push({
    description: description,
    amount: amount
    }) 
 },
  getAccountSummary: function () {
   let totalExpense = 0
   let totalIncome = 0
   let balance = 0
      this.Expense.forEach(function (wholeElement,index){
      totalExpense = totalExpense + wholeElement.amount
   })

   this.Income.forEach(function (wholeElementOfArrayIncome,index){
      totalIncome = totalIncome + wholeElementOfArrayIncome.amount
   })

   balance = totalIncome - totalExpense

   return `${this.Name} has $${totalIncome} in income and $${totalExpense} in expenses. So remaining balance in account is $${balance}`
 

  }
}
myAccount.addIncome ('pay', 50)
myAccount.addIncome ('project-1', 10)
myAccount.addIncome ('project-2', 10)
myAccount.addIncome ('project-3', 30)
myAccount.addIncome ('project-3', 30)

myAccount.addExpense('coffee', 10)
myAccount.addExpense('Tea', 10)
myAccount.addExpense('Lunch', 25)
myAccount.addExpense('Dinner', 25)
myAccount.addExpense('Certifications', 25)
myAccount.addExpense('Tuning', 5)
myAccount.addExpense('HairCut', 5)
console.log(myAccount.getAccountSummary())