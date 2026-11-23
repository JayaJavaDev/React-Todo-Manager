export const initialState = []

const Reducer = (state, action) => {

  switch (action.type) {

    case "ADD_TODO":
      return [...state, action.payload]

    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              todoName: action.payload.name,
              todoDesc: action.payload.desc
            }
          : todo
      )

    case "UPDATE_STATUS":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              status: action.payload.status
            }
          : todo
      )

    case "DELETE_TODO":
      return state.filter(
        (todo) => todo.id !== action.payload
      )

    default:
      return state
  }
}

export default Reducer
