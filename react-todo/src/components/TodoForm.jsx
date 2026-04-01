import {useEffect, useRef, useState} from "react";


function TodoForm({ onSubmit, onCancelEdit}) {
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

	})

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
	}

	return (
		<section>
			<div>
				<h2> Create Task</h2>
			</div>
		</section>
	)
}
