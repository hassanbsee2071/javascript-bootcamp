document.querySelector('#first-check-box').addEventListener('change', function (e){
    alpha = e.target.checked 
    console.log ("target checked is: ", e.target.checked )
    
    todos.forEach(function(todo){  
       
       if (todo.completed === true && e.target.checked === true){
          document.querySelector('#my-todos').innerHTML = ''
          console.log ("Completed Todo is: ", todo.completed)
          console.log ("Todo text is:", todo.text)
          
          noteEL = document.createElement('p')
          noteEL.textContent = todo.text
          document.querySelector('#my-todos').appendChild(noteEL)
          
          
 
       } else {
 
          renderNotes(todos, filters)
       }
    
 
 
   })
 
 })