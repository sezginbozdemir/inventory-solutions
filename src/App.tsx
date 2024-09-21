import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";

const App: React.FC = () => {
	const counter = useSelector((state: RootState) => state.counter);


	const dispatch = useDispatch();

	return (
		<div>
		 <h1>Counter: {counter}</h1>
		 <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
		 <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
		</div>
	);
};

export default App;
