import './Filterbar.css'

function FilterBar({ filters, onChange, onClearCompleted }) {
	function handleChange(event) {
		const { name, value } = event.target;
		onChange(name, value);
	}

	return (
		<section className="panel filter-panel">
			<div className="panel-head">
				<h2>Search & Filters</h2>
			</div>

			<div className="filter-grid">
				<div className="field">
					<label htmlFor="search">Search</label>
					<input
						id="search"
						name="search"
						value={filters.search}
						onChange={handleChange}
						placeholder="Search title or description"
					/>
				</div>

				<div className="field">
					<label htmlFor="status">Status</label>
					<select id="status" name="status" value={filters.status} onChange={handleChange}>
						<option value="all">All</option>
						<option value="active">Active</option>
						<option value="completed">Completed</option>
					</select>
				</div>

				<div className="field">
					<label htmlFor="priority">Priority</label>
					<select id="priority" name="priority" value={filters.priority} onChange={handleChange}>
						<option value="all">All</option>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>

				<div className="field">
					<label htmlFor="sortBy">Sort By</label>
					<select id="sortBy" name="sortBy" value={filters.sortBy} onChange={handleChange}>
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
						<option value="alphabetical">Alphabetical</option>
						<option value="priority">Priority</option>
					</select>
				</div>
			</div>

			<div className="filter-actions">
				<button className="btn btn-danger" onClick={onClearCompleted}>
					Clear Completed
				</button>
			</div>
		</section>
	);
}

export default FilterBar;
