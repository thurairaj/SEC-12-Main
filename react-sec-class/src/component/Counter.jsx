import {useState} from "react";

function Counter() {
	const [count, setCount ] = useState(0)
	const [name, setName ] = useState("")
	const [age, setAge] = useState(0)

	let onClick = () => {
		setCount((prev) => prev + 1)
		console.log(count);
	}

	let onChange = (e) => setName(e.target.value)

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={onClick}>increment</button><br/>
			Name: <input type={"text"} value={name} onChange={onChange}/>


			<p>Hello, {name}</p>
			<p>Age: {age}</p>
		</div>
	)
}

export default Counter;
