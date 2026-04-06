export const ACTIONS = {
	ADD_TODO: 'ADD_TODO',
	UPDATE_TODO: 'UPDATE_TODO',
	DELETE_TODO: 'DELETE_TODO',
	TOGGLE_TODO: 'TOGGLE_TODO',
	CLEAR_COMPLETED: 'CLEAR_COMPLETED',
	SET_TODO: 'SET_TODO',
}

export default function useToDoReducer(state, action) {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [action.payload,...state];
		case ACTIONS.UPDATE_TODO:
			return state.map((todo) =>
				todo.id === action.payload.id ? {...todo,  ...action.payload.updates } : todo
			)
		case ACTIONS.DELETE_TODO:
			return state.filter((todo) => todo.id !== action.payload.id)
		case ACTIONS.TOGGLE_TODO:
			return state.map((todo) =>
				todo.id === action.payload.id ? {...todo, completed: !todo.completed} : todo
			)
		case ACTIONS.CLEAR_COMPLETED:
			return state.filter((todo) => !todo.completed)
		case ACTIONS.SET_TODO:
			return action.payload;

		default:
			return state;
	}
}
