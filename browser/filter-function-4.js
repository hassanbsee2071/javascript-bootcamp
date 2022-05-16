console.log ("UUID is:", uuidv4())

const getSavedTodos = function (){
    const todosjSON = localStorage.getItem('todos')
    if (todosjSON !== null) {
        return JSON.parse(todosjSON)
     }else {
         return []
     }

}

const savedTodos = function (todos){

    localStorage.setItem('todos', JSON.stringify(todos))

}


let noteEL
let filteredNotes
let count=0
let taskRemaining
let crossbox
let todoText
let removeButton
let boxCount=0
let trueCount=0
let mix


const uncheckBoxes = function (todos){

    document.getElementById("first-check-box").checked = false;

}


const printTodos = function (todos){

    todos.forEach( function(todo){
        console.log ("Hello my todo is:", todo)
        console.log ("My Status is:",todo.completed)
        if (todo.completed === true) {
            trueCount = trueCount + 1
        }

    
        
    })


}
const renderNotes = function (todos, filters, value){
        filteredNotes = todos.filter(
          function(todo){
          return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
                        }
                                     )
        
         console.log("Value of value is: ", value)
         document.querySelector('#my-todos').innerHTML = ''

         console.log("Filtered Notes are:", filteredNotes)
         generateTodoDOMDisplay(filteredNotes) 
         taskSummary()

}

const generateTodoDOMDisplay = function (filteredNotes) {

    filteredNotes.forEach( function(todo){
        console.log ("My new todo is:", todo)
        document.querySelector('#my-todos').appendChild(generateTodoDOM(todo))
    
        
    })



}
const generateTodoDOM = function (todo){
   
            noteEL = document.createElement('div')
            crossbox = document.createElement('input')
            todoText =  document.createElement('span')
            removeButton = document.createElement('button')
            
        console.log("Todo inside for each is:", todo)
        if (todo.completed === true ){
              console.log("I goes into if where count is present")
              count = count + 1
 
         }
        
        if (value == null) {
     
               console.log ("I am undefined")
               crossbox.setAttribute('type', 'checkbox')
               crossbox.checked = todo.completed
               noteEL.appendChild(crossbox)
               crossbox.addEventListener('change', function (){
                   toggleTodo(todo.id)
                   savedTodos(todos)
                   renderNotes(todos, filters)
               })
               todoText.textContent = todo.text
               noteEL.appendChild(todoText)
               removeButton.textContent = 'x'
               noteEL.appendChild(removeButton)
               removeButton.addEventListener('click', function(){
                   removeNote(todo.id)
                   savedTodos(todos)
                   renderNotes(todos, filters)
               })
               //return noteEL

        }else if (value == false) {
           console.log ("Value is false")
           crossbox.setAttribute('type', 'checkbox')
           noteEL.appendChild(crossbox)
           console.log ("Todo Text in false value", todo.text)
           todoText.textContent = todo.text
           noteEL.appendChild(todoText)
           removeButton.textContent = 'x'
           noteEL.appendChild(removeButton)
           //return noteEL
           removeButton.addEventListener('click', function(){
            removeNote(todo.id)
            savedTodos(todos)
            renderNotes(todos, filters)
        })            



        }else if (value == true && todo.completed === false) {
           console.log ("Value is true and todo.completed is false")
           crossbox.setAttribute('type', 'checkbox')
           noteEL.appendChild(crossbox)
           
           todoText.textContent = todo.text
           noteEL.appendChild(todoText)
           removeButton.textContent = 'x'
           noteEL.appendChild(removeButton)
           removeButton.addEventListener('click', function(){
            removeNote(todo.id)
            savedTodos(todos)
            renderNotes(todos, filters)
        })         //return noteEL

        }


     //count = count - falseCount
     console.log("Count is:", count)
     console.log("True Count is:", trueCount)
     console.log("Length of array is:", todos.length)
     return noteEL
                           
    
 

  

}
const removeNote = function (id){
    const todoIndex = todos.findIndex(function (todo){

        return todo.id === id
    })
    if (todoIndex > -1 ){
        todos.splice(todoIndex, 1)
        console.log ("My ID is:", id)
        console.log ("My todoIndex is:", todoIndex)
    }

}

const toggleTodo = function (id){
     
      const todo = todos.find (function (todo){
          return todo.id === id
      })

      if (todo !== undefined){
         todo.completed = !todo.completed
      }
}

const taskSummary = function () {

        
        document.querySelector('#tasks-remaining').innerHTML = ''
        const mytasks = document.createElement('h1')
        taskRemaining = todos.length - trueCount
        mytasks.textContent = `You have ${taskRemaining} tasks remaining`
        document.querySelector('#tasks-remaining').appendChild(mytasks)
        


}


const newTodo = function (){


    document.querySelector('#new-todo').addEventListener('submit', function(e){

        e.preventDefault()
        todos.push({
          id: uuidv4(),
          text: e.target.elements.text.value,
          completed: false
        })
        savedTodos(todos)
        renderNotes(todos,filters)
      
      })

}

const filtering = function (){

    document.querySelector('#search-text').addEventListener('input', function (e) {
        document.getElementById("first-check-box").checked = false;
       filters.searchText = e.target.value
       renderNotes(todos, filters)
      
     })


     
}

const checkbox = function (){


    document.querySelector('#first-check-box').addEventListener('change', function (e){
      
        value = e.target.checked 
        console.log ("Event is e", e)
        console.log ("target checked is: ", e.target.checked )
        boxCount = boxCount + 1
        console.log ("Box Count is:", boxCount)
        renderNotes(todos, filters, value, boxCount)
        
     })


}