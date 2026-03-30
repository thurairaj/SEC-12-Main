function UseCard({name, role, children}) {
	return <div>
		<h3>{name}</h3>
		<p>Role: {role}</p>
		{children}
	</div>
}

export default UseCard;
