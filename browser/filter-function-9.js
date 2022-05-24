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
let parsing 


const uncheckBoxes = function (todos){

    document.getElementById("first-check-box").checked = false;

}


const printTodos = function (todos){
    const todosjSON = localStorage.getItem('todos')
    console.log ("todosjson are:", todosjSON)
    parsing = JSON.parse(todosjSON)
    console.log ("parsingjson are:", parsing)
    
    
    parsing.forEach( function(todo){
        console.log ("parsingJson Completed are:", todo.completed)
        console.log ("Hello my todo is:", todo)
        console.log ("My Status is:",todo.completed)
        if (todo.completed === true) {
            trueCount = trueCount + 1
        }

    
        
    })

    document.querySelector('#tasks-remaining').innerHTML = ''
    const mytasks = document.createElement('h1')
    taskRemaining = todos.length - trueCount
    //taskRemaining = Math.abs(taskRemaining)
    mytasks.textContent = `You have ${taskRemaining} tasks remaining`
    document.querySelector('#tasks-remaining').appendChild(mytasks)
    console.log("True Count is:", trueCount)
     console.log("Length of array is:", todos.length)
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
            todoText =  document.createElement('a')
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
                   newSummary(todo.id)
                   
               })
               todoText.textContent = todo.text
               todoText.setAttribute('href',`/edit.html#${todo.id}`)
               noteEL.appendChild(todoText)
               removeButton.textContent = 'x'
               noteEL.appendChild(removeButton)
               removeButton.addEventListener('click', function(){
                   removeNote(todo.id)    
                   savedTodos(todos)
                   renderNotes(todos, filters)
                   newSummary(todo.id)
               })
               //return noteEL

        }else if (value == false) {
           console.log ("Value is false")
           crossbox.setAttribute('type', 'checkbox')
           crossbox.checked = todo.completed
           noteEL.appendChild(crossbox)
           crossbox.addEventListener('change', function (){
               toggleTodo(todo.id)
               savedTodos(todos)
               renderNotes(todos, filters)
               newSummary(todo.id)
           })
           todoText.textContent = todo.text
           todoText.setAttribute('href',`/edit.html#${todo.id}`)
           noteEL.appendChild(todoText)
           removeButton.textContent = 'x'
           noteEL.appendChild(removeButton)
           removeButton.addEventListener('click', function(){
               removeNote(todo.id)
               savedTodos(todos)
               renderNotes(todos, filters)
               newSummary(todo.id)
           })
           //return noteEL

        }else if (value == true && todo.completed === false) {
           console.log ("Value is true and todo.completed is false")
           crossbox.setAttribute('type', 'checkbox')
           crossbox.checked = todo.completed
           noteEL.appendChild(crossbox)
           crossbox.addEventListener('change', function (){
               toggleTodo(todo.id)
               savedTodos(todos)
               renderNotes(todos, filters)
               newSummary(todo.id)
           })
           todoText.textContent = todo.text
           todoText.setAttribute('href',`/edit.html#${todo.id}`)
           noteEL.appendChild(todoText)
           removeButton.textContent = 'x'
           noteEL.appendChild(removeButton)
           removeButton.addEventListener('click', function(){
               removeNote(todo.id)
               savedTodos(todos)
               renderNotes(todos, filters)
               newSummary(todo.id)
           })
           //return noteEL


        }


     //count = count - falseCount
     console.log("Count is:", count)
 
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





const newSummary = function (id){
let newCount = 0
let newParse 
const todos_jSON = localStorage.getItem('todos')
    newParse = JSON.parse(todos_jSON)
    console.log ("New Summary ID is:", id)
    console.log ("New Summary My name is Hasssan")

    if (newParse.length === 0) {
        console.log ("New Summary My I am null")
        document.querySelector('#tasks-remaining').innerHTML = ''
        const mytasks = document.createElement('h1')
        taskRemaining = 0
        mytasks.textContent = `You have ${taskRemaining} tasks remaining`
        document.querySelector('#tasks-remaining').appendChild(mytasks)

     }

    const toda = todos.find(function (todo){
        console.log ("New Summary Todo and ID is:", todo, id)
        
        console.log ("New Summary Todo completed:", todo.completed)
        
        if ( todo.completed === true ){
            console.log ("New Summary if block")
            newCount = newCount + 1

        } else {
            console.log ("New Summary Else Block")
        }



        const todos_jSON = localStorage.getItem('todos')
        newParse = JSON.parse(todos_jSON)
       
        //let newjSON = localStorage.getItem('todos')
        console.log ("New Summary parse length is", newParse.length)

        document.querySelector('#tasks-remaining').innerHTML = ''
        const mytasks = document.createElement('h1')
        taskRemaining = newParse.length - newCount
        //taskRemaining = todos.length - newCount
        //taskRemaining = Math.abs(taskRemaining)
        mytasks.textContent = `You have ${taskRemaining} tasks remaining`
        document.querySelector('#tasks-remaining').appendChild(mytasks)
        console.log("New Summary Count is:", newCount)
        console.log("New Summary Length of array in is:", todos.length)

        //return toda.id === id
    })
    

}


const timestamp = moment().valueOf()
console.log ("Timestamp is:", timestamp)

const newTodo = function (){


    document.querySelector('#new-todo').addEventListener('submit', function(e){

        e.preventDefault()
        const idd = uuidv4()
        todos.push({
          id: idd,
          text: e.target.elements.text.value,
          completed: false,
          createdAt: timestamp,
          updatedAt: timestamp


        })
        savedTodos(todos)
        console.log("My UUID is:", idd)
        //location.assign(`/edit.html#${idd}`)
        renderNotes(todos,filters)
        newSummary(todos.id)
      
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



const initializeTodos = function (todos){

    const myjSON = localStorage.getItem('todos')
    if (myjSON === null) {
        console.log ("Initialize Storage")
        localStorage.setItem('todos', '[]')
     }

    

}


