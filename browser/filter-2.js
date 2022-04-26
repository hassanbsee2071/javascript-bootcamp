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

let value 


//console.log(todos[0].text)
const filters = {

    searchText: ''
}
let noteEL
const renderNotes = function (todos, filters, value){
    const filteredNotes = todos.filter(function(todo) {
          return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
      })
        
         console.log("Value of value is: ", value)
         document.querySelector('#my-todos').innerHTML = ''
         let count = 0
         let index = 0
         let taskRemaining
         filteredNotes.forEach(function(todo){

            if (todo.completed === true){
                count = count + 1
     
             }
            
            if (value == null) {
         
                   console.log ("I am undefined")
                   noteEL = document.createElement('p')
                   noteEL.textContent = todo.text
                   document.querySelector('#my-todos').appendChild(noteEL)
            }else if (value == false) {
               console.log ("Value is false")
               noteEL = document.createElement('p')
               noteEL.textContent = todo.text
               document.querySelector('#my-todos').appendChild(noteEL)                  

            }else if (value == true && todo.completed === false) {

               console.log ("Value is true and todo.completed is false")
               noteEL = document.createElement('p')
               noteEL.textContent = todo.text
               document.querySelector('#my-todos').appendChild(noteEL)   
            }






         index = index + 1
        })






        //#################################################################//
        document.querySelector('#tasks-remaining').innerHTML = ''
        const mytasks = document.createElement('h1')
        taskRemaining = index - count
        mytasks.textContent = `You have ${taskRemaining} tasks remaining`
        document.querySelector('#tasks-remaining').appendChild(mytasks)
        
       //##################################################################//

}




renderNotes(todos, filters)

document.querySelector('#search-text').addEventListener('input', function (e) {
   document.getElementById("first-check-box").checked = false;
  filters.searchText = e.target.value
  renderNotes(todos, filters)
 
})

document.querySelector('#first-check-box').addEventListener('change', function (e){
   
   value = e.target.checked 
   console.log ("target checked is: ", e.target.checked )
   renderNotes(todos, filters, value)
})