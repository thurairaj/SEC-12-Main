import {useEffect, useState} from "react";

function Users() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchUsers() {
			console.log("Fetching users");
			const response = await fetch('https://jsonplaceholder.typicode.com/users');
			const data = await response.json();
			setUsers(data)
		}

		fetchUsers();
	}, []);

	return (
		<ul>
			{
				users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))
			}
		</ul>
	)
}


export default Users;
