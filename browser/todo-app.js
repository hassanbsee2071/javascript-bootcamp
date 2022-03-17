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

//const p = document.querySelector('h1')
//console.log (p)

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

  

  //console.log(todo, index)

})
