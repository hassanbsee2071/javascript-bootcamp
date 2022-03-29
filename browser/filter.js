const todos = [{
    text: 'Order cat food',
    completed: true
 
}, {
   text: 'Clean kitchen',
   completed: false

}, {
   text: 'Buy food',
   completed: true

}, {
   text: 'Do work',
   completed: false

}, {
   text: 'Exercise',
   completed: true

}]

//console.log(todos[0].text)
const filters = {

    searchText: 'Order'
}

const renderNotes = function (todos, filters){
  const filteredNotes = todos.filter(function(todo,index) {
      //console.log("Index is:" , index)
      return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  })
console.log(filteredNotes)

  filteredNotes.forEach(function(todo){
     console.log("Text is:", todo.text)
  })

}




renderNotes(todos, filters)