// src/js/todoservices.js
import { createUser } from "./userservices";

const DEFAULT_API = "https://playground.4geeks.com/todo";


export async function ensureUser(username, apiBase = DEFAULT_API) {
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("Username inválido en ensureUser.");
  }
  return createUser(username, apiBase);
}

export async function addTodo(username, label, apiBase = DEFAULT_API) {
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("Username inválido en addTodo.");
  }
  const texto = String(label ?? "").trim();
  if (texto === "") throw new Error("La etiqueta de la tarea no puede estar vacía.");

  const url = `${apiBase}/todos/${encodeURIComponent(username.trim())}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: texto, is_done: false })
  });

  const raw = await resp.clone().text();
  console.log("[addTodo] status:", resp.status, "body:", raw);

  if (!resp.ok) throw new Error(`addTodo failed ${resp.status}: ${raw}`);

  const data = await resp.json();
  return { id: data.id, text: data.label };
}


export async function deleteTodo(todoId, apiBase = DEFAULT_API) {
  if (todoId === null || todoId === undefined || String(todoId).trim() === "") {
    throw new Error("ID inválido en deleteTodo.");
  }

  const url = `${apiBase}/todos/${encodeURIComponent(todoId)}`;
  const resp = await fetch(url, { method: "DELETE" });

  const raw = await resp.clone().text();
  console.log("[deleteTodo] status:", resp.status, "body:", raw);

  if (!resp.ok) throw new Error(`deleteTodo failed ${resp.status}: ${raw}`);
}