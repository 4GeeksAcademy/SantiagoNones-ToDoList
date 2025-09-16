import React from "react";

import rigoImage from "../../img/rigo-baby.jpg";
import ToDoList from "./ToDoList";
import './index.css';


const Home = () => {
	return (
		<div className="container d-flex flex-column align-items-center">
			<h1 className="todo-title"> todos</h1>
			<ToDoList/>
		</div>
	);
};

export default Home;