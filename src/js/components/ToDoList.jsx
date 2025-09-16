import React, {useEffect, useState} from "react";
import { ensureUser, addTodo, deleteTodo } from "../../services/todoservices";
import { getUserTodos, deleteUserAndTodos } from "../../services/userservices";
const ToDoList = () => {
  const [inputText, setInputText] = useState("");
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const miUsuario = "testuser123";

  useEffect(() => {
    inicializar();

  }, []);

  const inicializar = async () => {
    setLoading(true);
    setError(null);
    try {
      await ensureUser(miUsuario);                
      const tareas = await getUserTodos(miUsuario); 
      setToDos(tareas);                             
    } catch (err) {
      console.error("Hubo un error en la inicialización:", err);
      setError(err.message || "No se pudieron cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const handleAdd = async () => {
    const texto = inputText.trim();
    if (texto === "") return;

    setLoading(true);
    setError(null);
    try {
      await addTodo(miUsuario, texto);                 
      const tareas = await getUserTodos(miUsuario);    
      setToDos(tareas);
      setInputText("");
    } catch (err) {
      console.error("Error al añadir tarea:", err);
      setError(err.message || "No se pudo añadir la tarea");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTodo(id);                            
      const tareas = await getUserTodos(miUsuario);    
      setToDos(tareas);
    } catch (err) {
      console.error("Error al borrar tarea:", err);
      setError(err.message || "No se pudo borrar la tarea");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteUserAndTodos(miUsuario);  
      await ensureUser(miUsuario);          
      setToDos([]);                         
    } catch (err) {
      console.error("Error al limpiar todas las tareas:", err);
      setError(err.message || "No se pudo limpiar la lista");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-secondary">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm mt-4 mx-auto" style={{ maxWidth: "600px", width: "100%" }}>
            <ul className="list-group list-group-flush">

              <li className="list-group-item p-0">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 rounded-0"
                    placeholder="What do we have to accomplish today?"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAdd}
                    disabled={loading}
                  >
                    Add Task
                  </button>
                </div>
                {loading && <div className="p-2 small text-muted">Syncing…</div>}
                {error && <div className="p-2 small text-danger">{error}</div>}
              </li>

              {toDos.map((todo) => (
                <li
                  key={todo.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {todo.text}
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-secondary"
                    onClick={() => handleDelete(todo.id)}
                    disabled={loading}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>

            <div className="card-footer d-flex justify-content-between align-items-center text-muted small">
              <span>
                {toDos.length === 0
                  ? "No tasks left"
                  : `${toDos.length} item${toDos.length > 1 ? "s" : ""} left`}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleClearAll}
                disabled={loading}
                title="Borrar todas las tareas del servidor"
              >
                Clear all
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;