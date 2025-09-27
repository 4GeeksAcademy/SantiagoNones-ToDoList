import React, { useState } from "react";
import Login from "./Login";
import ToDoList from "./ToDoList";
import './index.css';

const Home = () => {
    const [username, setUsername] = useState(null);

    const handleLoginSuccess = (user) => {
        setUsername(user);
    };

    return (

        <div className="container d-flex flex-column align-items-center mt-5"> 
            <h1 className="todo-title mb-4">todos</h1> 

            {!username ? (
            
                <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
    
                <ToDoList username={username} />
            )}
        </div>
    );
};

export default Home;