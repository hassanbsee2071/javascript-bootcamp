let todos = getSavedTodos()
let value 


//console.log(todos[0].text)
const filters = {

    searchText: ''
}


renderNotes(todos, filters)
filtering()
checkbox()
newTodo()

