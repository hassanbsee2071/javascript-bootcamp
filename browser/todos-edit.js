//const titleElement = document.querySelector('#todo-title')
const bodyElement = document.querySelector('#todo-body')
const removeElement = document.querySelector('#remove-todo')

const todoId = location.hash.substring(1)
const todoss = getSavedTodos()
const todoo = todoss.find(function (todoo){
    return todoo.id === todoId
})
if (todoo === undefined) {

    location.assign('/index.html')
}

//titleElement.value = todoo.completed
bodyElement.value = todoo.text



bodyElement.addEventListener('input', function (e){
    console.log ("Hy My complete value is:", todoo.completed)
    console.log ("Hy My text value is:", todoo.text)
    console.log ("Hy My target value is:", e.target.value)
    todoo.text = e.target.value
    console.log ("Hy My Saved Todos are:", todoss) 
    savedTodos(todoss)

    
 })
 
 removeElement.addEventListener('click', function (e){
    console.log ("Hy My remove element is called:")
    removeNotee(todoo.id) 
    savedTodos(todoss)
    location.assign('/index.html')
    
 })
 

 const removeNotee = function (id){
    console.log ("Hy My I am inside notee:")
    const todoIndex = todoss.findIndex(function (todo){

        return todo.id === id
    })
    if (todoIndex > -1 ){
        todoss.splice(todoIndex, 1)
        console.log ("My ID is:", id)
        console.log ("My todoIndex is:", todoIndex)
    }

}