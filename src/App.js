import React from 'react'
import './App.css';

function App() {

  const [todos, setToDos] = React.useState([])
  const [todo, setToDo] = React.useState("")
  const [toDoEditing, setToDoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")

  React.useEffect(() => {
    const  temp = localStorage.getItem("todos")
    const loadedToDos = JSON.parse(temp)
    if(loadedToDos) {
      setToDos(loadedToDos)
    }
    }, [])

  React.useEffect(() => {
  const  temp = JSON.stringify(todos)
  localStorage.setItem("todos", temp)
  }, [todos])

  function handleSubmit (e) {
    e.preventDefault();
    const newToDo = {
      id: new Date().getTime(),
      text: todo, 
      completed: false,
    }

    setToDos([...todos].concat(newToDo))
    setToDo("")

  }

  function deleteToDo(id) {
    const updatedToDos = [...todos].filter((todo) => todo.id !== id);
    setToDos(updatedToDos);
  }

  function toggleComplete(id) {
    const updatedToDos = [...todos].map((todo) => {
     if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo
  })

  setToDos(updatedToDos);
  }

  function editToDo(id) {
    const updatedToDos = [...todos].map((todo) => {
if (todo.id === id) {
  todo.text = editingText
}
return todo
    })
    setToDos(updatedToDos);
    setToDoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">

<h1>To Do List</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setToDo(e.target.value)} value={todo}/>
        <button type="submit">Add </button>
      </form>

<div className="list">

    {todos.map((todo) => <div key={todo.id}>

    <input type="checkbox"
 onChange={() => toggleComplete(todo.id)}
checked={todo.completed} />
    
    {toDoEditing === todo.id ? 
    ( <input type="text" onChange={(e) => setEditingText(e.target.value)} value ={editingText}/>
    ) : (<div>{todo.text}</div>)}

      

     {toDoEditing === todo.id ?
       (<button onClick={() => editToDo(todo.id)}>Submit</button>) : 
       (<button onClick={() => setToDoEditing(todo.id)}>Edit</button>)}

      <button onClick={() => deleteToDo(todo.id)}>Remove</button>
      


     
      </div>)}

      </div>

    </div>
  );
}

export default App;
