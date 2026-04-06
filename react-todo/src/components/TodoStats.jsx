import './TodoStats.css'

function TodoStats({ stats }) {
	return (
		<section className="stats-grid">
			<div className="stat-card">
				<span>Total</span>
				<strong>{stats.total}</strong>
			</div>
			<div className="stat-card">
				<span>Completed</span>
				<strong>{stats.completed}</strong>
			</div>
			<div className="stat-card">
				<span>Active</span>
				<strong>{stats.active}</strong>
			</div>
			<div className="stat-card">
				<span>High Priority</span>
				<strong>{stats.highPriority}</strong>
			</div>
		</section>
	);
}

export default TodoStats;
