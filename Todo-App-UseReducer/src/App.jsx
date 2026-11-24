import React, { useReducer, useEffect } from 'react'
import axios from 'axios'

import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Reducer, { initialState } from './reducers/Reducer.jsx'

import './App.css'

const API_URL = "https://6b05b43edb01cf463608f738.mockapi.io/api/todos"

const App = () => {

  const [todos, dispatch] = useReducer(Reducer, initialState)

  useEffect(() => {

    axios.get(API_URL)
      .then((response) => {

        console.log("GET DATA:", response.data)

        dispatch({
          type: "SET_TODOS",
          payload: response.data
        })

      })
      .catch((error) => {
        console.log("GET ERROR:", error)
      })

  }, [])


  

  const addTodo = async (name, desc) => {

    const newTodo = {
      todoName: name,
      todoDesc: desc,
      status: "Not Completed"
    }

    try {

      const response = await axios.post(API_URL, newTodo)

      dispatch({
        type: "ADD_TODO",
        payload: response.data
      })

    }
    catch (error) {
      console.log("POST ERROR:", error)
    }
  }


  const updateTodo = async (id, name, desc) => {

    try {

      const response = await axios.put(`${API_URL}/${id}`, {
        todoName: name,
        todoDesc: desc
      })

      dispatch({
        type: "UPDATE_TODO",
        payload: {
          id,
          name: response.data.todoName,
          desc: response.data.todoDesc
        }
      })

    }
    catch (error) {
      console.log("PUT ERROR:", error)
    }
  }


  const updateTodoStatus = async (status, id) => {

    try {

      const response = await axios.put(`${API_URL}/${id}`, {
        status: status
      })

      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: response.data.status,
          id
        }
      })

    }
    catch (error) {
      console.log("STATUS ERROR:", error)
    }
  }


  const deleteTodo = async (id) => {

    try {

      await axios.delete(`${API_URL}/${id}`)

      dispatch({
        type: "DELETE_TODO",
        payload: id
      })

    }
    catch (error) {
      console.log("DELETE ERROR:", error)
    }
  }


  return (
    <div className='container'>

      <h1 className='app-title'>The To-Do Suite✧</h1>

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
