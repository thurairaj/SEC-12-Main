import TodoForm from '../components/TodoForm';
import FilterBar from '../components/Filterbar';
import TodoStats from '../components/TodoStats';
import TodoList from '../components/TodoList';
import './Dashboard.css';

function DashboardPage({stats,
       editingTodo,
       onSubmit,
       onCancelEdit,
       filters,
       onFilterChange,
       onClearCompleted,
       todos,
       onToggle,
       onDelete,
       onEdit,
   }) {
	return (
		<>
			<TodoStats stats={stats} />

			<div className="layout-grid">
				<div className="left-column">
					<TodoForm
						onSubmit={onSubmit}
						editingTodo={editingTodo}
						onCancelEdit={onCancelEdit}
					/>

					<FilterBar
						filters={filters}
						onChange={onFilterChange}
						onClearCompleted={onClearCompleted}
					/>
				</div>

				<div className="right-column">
					<TodoList
						todos={todos}
						onToggle={onToggle}
						onDelete={onDelete}
						onEdit={onEdit}
					/>
				</div>
			</div>
		</>
	);
}

export default DashboardPage;
