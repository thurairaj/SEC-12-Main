function Header() {
	const name = "Michael";
	const dayGreetings = (new Date()).getHours() < 12 ? "morning" : "evening" ;

	return <header>
		<h1>Task Board</h1>
		<h2>Hello, {name}. Good {dayGreetings} </h2>
	</header>
}

export default Header;
