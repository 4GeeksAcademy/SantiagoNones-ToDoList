import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const trimmedUser = userInput.trim();
    if (trimmedUser !== "") {
      onLoginSuccess(trimmedUser);
    } else {
      setError("El nombre de usuario no puede estar vacío.");
    }
  };

  return (
    <div className="row justify-content-center w-100"> 
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 text-center">
        <h1 className="mb-4">Crea o carga tu lista de tareas</h1>
        <div className="input-group mb-3"> 
          <input
            type="text"
            className="form-control"
            placeholder="Escribe tu nombre de usuario"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <button className="btn btn-secondary" onClick={handleSubmit}>
            Empezar
          </button>
        </div>
        {error && <div className="p-2 small text-danger">{error}</div>}
      </div>
    </div>
  );
};

export default Login;