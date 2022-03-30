const todos = [{
    text: 'Order cat food',
    completed: true
 
}, {
   text: 'Clean kitchen',
   completed: false

}, {
   text: 'Buy food',
   completed: false

}, {
   text: 'Do work',
   completed: false

}, {
   text: 'Exercise',
   completed: true

}]

//console.log(todos[0].text)
const filters = {

    searchText: ''
}

const renderNotes = function (todos, filters){
  const filteredNotes = todos.filter(function(todo) {
     
      return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  })
     
  


  
     console.log(filteredNotes)
     document.querySelector('#my-todos').innerHTML = ''
     let count = 0
     let index = 0
     let taskRemaining
     filteredNotes.forEach(function(todo){

        if (todo.completed === true){
            count = count + 1
     
         }
         
     index = index + 1
     console.log("Text is:", todo.text)
     const noteEL = document.createElement('p')
     noteEL.textContent = todo.text
     document.querySelector('#my-todos').appendChild(noteEL)

 
    })

    document.querySelector('#tasks-remaining').innerHTML = ''
    console.log("Count is:", count, "Index is:", index)
    const mytasks = document.createElement('h1')
    taskRemaining = index - count
    mytasks.textContent = `You have ${taskRemaining} tasks remaining`
    document.querySelector('#tasks-remaining').appendChild(mytasks)
    //document.write("<br>")
    console.log("Remaining Tasks:", taskRemaining)
    //document.querySelector('body').appendChild(p)

}



//let tasksLeft = function (mytodos){

//mytodos.forEach(function (todo) {
   
//    if (todo.completed === true){
//       count = count + 1

    //}
    
    //index = index + 1
 //})
 //console.log("Count is:", count, "Index is:", index)
 //const p = document.createElement('tasksRemaining')
 //taskRemaining = index - count
 //p.textContent = `You have ${taskRemaining} tasks remaining`
 //document.querySelector('body').appendChild(p)
 //document.write("<br>")
 //console.log("Remaining Tasks:", taskRemaining)
 //document.querySelector('body').appendChild(p)
//}


//tasksLeft(todos)
renderNotes(todos, filters)


document.querySelector('#search-text').addEventListener('input', function (e) {
  filters.searchText = e.target.value
  renderNotes(todos, filters)
 
})