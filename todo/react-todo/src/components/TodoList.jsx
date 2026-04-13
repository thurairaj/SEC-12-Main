import './TodoList.css'
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
	if (todos.length === 0) {
		return (
			<section className="panel empty-state">
				<h2>No tasks found</h2>
				<p>Try adding a new task or adjusting your filters.</p>
			</section>
		);
	}

	return (
		<section className="todo-list">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</section>
	);
}

export default TodoList;
