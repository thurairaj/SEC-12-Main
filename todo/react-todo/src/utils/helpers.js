export function generateId() {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleString();
}
