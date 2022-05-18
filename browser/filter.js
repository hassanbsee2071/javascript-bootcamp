let todos = getSavedTodos()
let value 


//console.log(todos[0].text)
const filters = {

    searchText: ''
}

//document.querySelector('#first-check-box').addEventListener('DOMContentLoaded', function (e){
      
 //   e.target.checked = false

    
 //})


initializeTodos()
uncheckBoxes()
printTodos(todos)
renderNotes(todos, filters)
filtering()
checkbox()
newTodo()

