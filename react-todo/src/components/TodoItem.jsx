import './TodoItem.css'
import { formatDate } from '../utils/helpers.js';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
	return (
		<article className={`todo-card ${todo.completed ? 'completed' : ''}`}>
			<div className="todo-main">
				<div className="todo-top-row">
					<label className="checkbox-wrap">
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => onToggle(todo.id)}
						/>
						<span></span>
					</label>

					<div className="todo-content">
						<div className="todo-title-row">
							<h3>{todo.title}</h3>
							<span className={`badge badge-${todo.priority}`}>{todo.priority}</span>
						</div>

						{todo.description && <p>{todo.description}</p>}

						<div className="meta-row">
							<span className="tag">{todo.category}</span>
							{todo.dueDate && <span>Due: {todo.dueDate}</span>}
							<span>Created: {formatDate(todo.createdAt)}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="todo-actions">
				<button className="btn btn-secondary" onClick={() => onEdit(todo)}>
					Edit
				</button>
				<button className="btn btn-danger" onClick={() => onDelete(todo.id)}>
					Delete
				</button>
			</div>
		</article>
	);
}

export default TodoItem;
