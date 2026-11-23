import React, { useReducer } from 'react'

const initialState = {
  todoName: "",
  todoDesc: ""
}

const HeaderReducer = (state, action) => {

  switch (action.type) {

    case "SET_NAME":
      return {
        ...state,
        todoName: action.payload
      }

    case "SET_DESC":
      return {
        ...state,
        todoDesc: action.payload
      }

    case "RESET":
      return initialState

    default:
      return state
  }
}

const Header = ({ addTodo }) => {

  const [state, dispatch] = useReducer(
    HeaderReducer,
    initialState
  )

  const handleSubmit = (e) => {

    e.preventDefault()

    addTodo(state.todoName, state.todoDesc)

    dispatch({
      type: "RESET"
    })
  }

  return (
    <form className='header' onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Todo Name"
        value={state.todoName}
        onChange={(e) =>
          dispatch({
            type: "SET_NAME",
            payload: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Todo Description"
        value={state.todoDesc}
        onChange={(e) =>
          dispatch({
            type: "SET_DESC",
            payload: e.target.value
          })
        }
      />

      <button type="submit" className='add-btn'>
        + Add Todo
      </button>

    </form>
  )
}

export default Header
