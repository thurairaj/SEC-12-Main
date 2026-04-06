import {useEffect, useRef, useState} from "react";
import './TodoForm.css'


function TodoForm({ onSubmit, editingTodo, onCancelEdit}) {
	const initialForm = {
		title: '',
		description: '',
		priority: '',
		category: 'General',
		dueDate: ''
	}

	const [form, setForm] = useState(initialForm)
	const titleRef = useRef(null)

	useEffect(() => {
		titleRef.current.focus()
	}, []);

	useEffect(() => {
		if(editingTodo) {
			setForm({
				title: editingTodo.title || '',
				description: editingTodo.description|| '',
				priority: editingTodo.priority|| 'medium',
				category: editingTodo.category|| 'General',
				dueDate: editingTodo.dueDate|| '',
			});
			titleRef.current.focus()
		} else {
			setForm(initialForm)
		}
	}, [editingTodo])

	function handleChange(event) {
		const { name , value } = event.target;
		setForm((prev) => ({...prev, [name]: value}));
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (!form.title.trim()) return;
		onSubmit({
			title: form.title,
			description: form.description.trim(),
			priority: form.priority,
			category: form.category.trim() || 'General',
			dueDate: form.dueDate
		});

		if (!editingTodo) {
			setForm(initialForm);
			titleRef.current.focus();
		}
	}

	return (
		<section className={"panel form-panel"}>
			<div className="panel-head">
				<h2> {editingTodo ? 'Edit Task': 'Create Task'}</h2>
			</div>
			<form className={"todo-form"} onSubmit={handleSubmit}>
				<div className={"field"}>
					<label htmlFor="title">Title</label>
					<input ref={titleRef}
					       onChange={handleChange}
					       value={form.title}
					       id={"title"}
					       name={"title"}
					/>
				</div>
				<div className={"field"}>
					<label htmlFor="description">Description</label>
					<textarea rows={4}
					          onChange={handleChange}
					          value={form.description}
					          id={"description"}
					          name={"description"}
					/>
				</div>
				<div className={"field"}>
					<label htmlFor="priority">Priority</label>
					<input
						onChange={handleChange}
						value={form.priority}
						id={"priority"}
						name={"priority"}
					/>
				</div>
				<div className={"field"}>
					<label htmlFor="category">Category</label>
					<input
						onChange={handleChange}
						value={form.category}
						id={"category"}
						name={"category"}
					/>
				</div>
				<div className={"field"}>
					<label htmlFor="dueDate">Due Date</label>
					<input
						onChange={handleChange}
						value={form.dueDate}
						id={"dueDate"}
						name={"dueDate"}
					/>
				</div>

				<div className={"form-actions"}>
					<button type="submit" >{editingTodo ? 'Update Task': 'Add Task'}</button>
					{editingTodo && <button type="button" onClick={onCancelEdit}>{'Cancel Edit'}</button>}
				</div>
			</form>
		</section>
	)
}

export default TodoForm;
