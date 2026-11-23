import React, { useReducer } from 'react'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Reducer, { initialState } from './reducers/Reducer.jsx'
import './App.css'

const App = () => {

  const [todos, dispatch] = useReducer(Reducer, initialState)

  // Add Todo

  const addTodo = (name, desc) => {

    const newTodo = {
      id: Date.now(),
      todoName: name,
      todoDesc: desc,
      status: "Not Completed"
    }

    dispatch({
      type: "ADD_TODO",
      payload: newTodo
    })
  }

  // Update Todo

  const updateTodo = (id, name, desc) => {

    dispatch({
      type: "UPDATE_TODO",
      payload: {
        id,
        name,
        desc
      }
    })
  }

  // Update Status

  const updateTodoStatus = (status, id) => {

    dispatch({
      type: "UPDATE_STATUS",
      payload: {
        status,
        id
      }
    })
  }

  // Delete Todo
  
  const deleteTodo = (id) => {

    dispatch({
      type: "DELETE_TODO",
      payload: id
    })
  }

  return (
    <div className='container'>

      <h1 className='app-title'> The To-Do Suite✧ </h1>

      <Header addTodo={addTodo} />

      <Main
        todos={todos}
        updateTodo={updateTodo}
        updateTodoStatus={updateTodoStatus}
        deleteTodo={deleteTodo}
      />

    </div>
  )
}

export default App
