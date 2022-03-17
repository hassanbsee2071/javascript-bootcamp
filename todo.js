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


const newTodos = [{
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



const deleteNote = function (array, todosText) {
       const index = array.findIndex(function (todo, item) {
   
                   //console.log(todo) =  console.log(todos[item])  
                   //console.log(todos[0].text)
     
        
       return todo.text === todosText
       })
  console.log(`index is ${index}`)
  if (index > -1 ){
      console.log(`Match ${todosText} is Found. So deleting it`)
      console.log(`Before deleting todos are:`)
      console.log(todos)
      todos.splice(index, 1)
  }

}

deleteNote(todos, 'Buy food')
console.log(`After deleting todos are:`)
console.log(todos)


// ********************************************************************************** //
console.log('')
console.log('From Here there is new logic that implement similar functionality')



const similarFunctionality = function (new_array, new_todoText) {
   new_array.forEach(function (todo,index){
   //console.log('Hello')
   //console.log(todo)
   //console.log(`Index is ${index} and todo is ${todo.text} and todo status is ${todo.completed}`)
   stat = todo.text === new_todoText
   //console.log(stat)
   if (stat === true) {
    console.log(`Match ${new_todoText} is Found. So deleting it`)
    console.log(`Before deleting todos are:`)
    console.log(newTodos)
    newTodos.splice(index, 1)

}

})
//console.log('Hello')
//console.log(stat)


}

similarFunctionality(newTodos, 'Buy food')
console.log(`After deleting todos are:`)
console.log(newTodos)
