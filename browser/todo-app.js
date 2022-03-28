const todos = [{
    text: 'Order cat food',
    completed: true
 
},{
   text: 'Clean kitchen',
   completed: false

},{
   text: 'Buy food',
   completed: true

},{
   text: 'Do work',
   completed: false

},{
   text: 'Exercise',
   completed: true

}

] 
//console.log("Hello Bro", todos[4])
//const p = document.querySelector('h1')
//console.log (p)
let count = 0
let index = 0
let taskRemaining
todos.forEach(function (todo) {
   
   if (todo.completed === true){
      count = count + 1
      console.log("Complete",todo.completed)
   }
   
   index = index + 1
})
console.log("Count is:", count, "Index is:", index)
const p = document.createElement('tasksRemaining')
taskRemaining = index - count
p.textContent = `You have ${taskRemaining} tasks remaining`
document.querySelector('body').appendChild(p)
document.write("<br>")
console.log("Remaining Tasks:", taskRemaining)
document.querySelector('body').appendChild(p)


todos.forEach(function (todo,index) {
   

   
  const p = document.createElement('text')
  document.write("<br>")
  const ps = document.createElement('status')
  
  p.textContent = todo.text
  ps.textContent = "Your Status is" + " " + todo.completed
  document.write("<br>")
  document.querySelector('body').appendChild(p)
  document.write("<br>")
  

  document.querySelector('body').appendChild(ps)
  console.log (p)

  

  

})
