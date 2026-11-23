import React, { useReducer } from 'react'

const EditReducer = (state, action) => {

  switch (action.type) {

    case "START_EDIT":
      return {
        isEditing: true,
        editName: action.payload.todoName,
        editDesc: action.payload.todoDesc
      }

    case "SET_NAME":
      return {
        ...state,
        editName: action.payload
      }

    case "SET_DESC":
      return {
        ...state,
        editDesc: action.payload
      }

    case "CANCEL_EDIT":
      return {
        ...state,
        isEditing: false,
        editName: action.payload.todoName,
        editDesc: action.payload.todoDesc
      }

    case "STOP_EDIT":
      return {
        ...state,
        isEditing: false
      }

    default:
      return state
  }
}

const TodoCard = ({
  todo,
  updateTodo,
  updateTodoStatus,
  deleteTodo
}) => {

  const initialState = {
    isEditing: false,
    editName: todo.todoName,
    editDesc: todo.todoDesc
  }

  const [state, dispatch] = useReducer(
    EditReducer,
    initialState
  )

  const handleUpdate = () => {

    updateTodo(
      todo.id,
      state.editName,
      state.editDesc
    )

    dispatch({
      type: "STOP_EDIT"
    })
  }

  const handleCancel = () => {

    dispatch({
      type: "CANCEL_EDIT",
      payload: {
        todoName: todo.todoName,
        todoDesc: todo.todoDesc
      }
    })
  }

  return (
    <div className='todo-card'>

      {state.isEditing ? (

        <div className='edit-section'>

          <input
            type="text"
            placeholder="Todo Name"
            value={state.editName}
            onChange={(e) =>
              dispatch({
                type: "SET_NAME",
                payload: e.target.value
              })
            }
          />

          <textarea
            placeholder="Todo Description"
            value={state.editDesc}
            onChange={(e) =>
              dispatch({
                type: "SET_DESC",
                payload: e.target.value
              })
            }
          />

          <div className='btn-container'>

            <button
              className='save-btn'
              onClick={handleUpdate}
            >
              Save
            </button>

            <button
              className='cancel-btn'
              onClick={handleCancel}
            >
              Cancel
            </button>

          </div>

        </div>

      ) : (

        <>

          <div className='card-heading'>

            <span className='card-label'>MY TASK</span>

          </div>

          <h3>
            {todo.todoName || "Untitled Task"}
          </h3>

          <p>
            {todo.todoDesc || "No description added"}
          </p>

          <div className='status-row'>

            <label>Status:</label>

            <select
              className={`status-select ${
                todo.status === "Completed"
                  ? "completed"
                  : "not-completed"
              }`}
              value={todo.status}
              onChange={(e) =>
                updateTodoStatus(e.target.value, todo.id)
              }
            >

              <option value="Not Completed">
                Not Completed
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          <div className='btn-container'>

            <button
              className='edit-btn'
              onClick={() =>
                dispatch({
                  type: "START_EDIT",
                  payload: {
                    todoName: todo.todoName,
                    todoDesc: todo.todoDesc
                  }
                })
              }
            >
              Edit
            </button>

            <button
              className='delete-btn'
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>

          </div>

        </>

      )}

    </div>
  )
}

export default TodoCard
