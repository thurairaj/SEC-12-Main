import './AnalyticsPage.css';

function AnalyticsPage({ todos }) {
	const categories = todos.reduce((acc, todo) => {
		acc[todo.category] = (acc[todo.category] || 0) + 1;
		return acc;
	}, {});

	const priorities = todos.reduce((acc, todo) => {
		acc[todo.priority] = (acc[todo.priority] || 0) + 1;
		return acc;
	}, { low: 0, medium: 0, high: 0 });

	return (
		<div className="analytics-grid">
			<section className="panel">
				<div className="panel-head">
					<h2>Tasks by Category</h2>
				</div>
				<div className="analytics-list">
					{Object.keys(categories).length === 0 ? (
						<p className="muted-text">No category data yet.</p>
					) : (
						Object.entries(categories).map(([category, count]) => (
							<div key={category} className="analytics-row">
								<span>{category}</span>
								<strong>{count}</strong>
							</div>
						))
					)}
				</div>
			</section>

			<section className="panel">
				<div className="panel-head">
					<h2>Tasks by Priority</h2>
				</div>
				<div className="analytics-list">
					{Object.entries(priorities).map(([priority, count]) => (
						<div key={priority} className="analytics-row">
							<span className={`badge badge-${priority}`}>{priority}</span>
							<strong>{count}</strong>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

export default AnalyticsPage;
