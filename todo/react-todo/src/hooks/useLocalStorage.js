import {useEffect, useState} from "react";
/*
	state =>
 */


export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		try {
			const stored = localStorage.getItem(key);
			return stored ? JSON.parse(stored) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	}, [key, value]);

	return [value, setValue];


}
