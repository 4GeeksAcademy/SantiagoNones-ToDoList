const DEFAULT_API = "https://playground.4geeks.com/todo";

function adaptTodosToUI(apiTodos) {
  return (apiTodos || []).map(t => ({ id: t.id, text: t.label }));
}

export async function createUser(username, apiBase = DEFAULT_API) {
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("El nombre de usuario debe ser un string no vacío.");
  }

  const url = `${apiBase}/users/${encodeURIComponent(username.trim())}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([]),
  });

  const raw = await resp.clone().text();
  console.log("[createUser] status:", resp.status, "body:", raw);

  if (resp.ok) return { ok: true, status: resp.status };

  const alreadyExists =
    (resp.status === 400 || resp.status === 409) &&
    (/exists/i.test(raw) || /already/i.test(raw));

  if (alreadyExists) return { ok: true, status: resp.status };

  throw new Error(`createUser failed ${resp.status}: ${raw}`);
}

export async function getUserTodos(username, apiBase = DEFAULT_API) {
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("El nombre de usuario debe ser un string no vacío.");
  }

  const url = `${apiBase}/users/${encodeURIComponent(username.trim())}`;
  const resp = await fetch(url);

  const raw = await resp.clone().text();
  console.log("[getUserTodos] status:", resp.status, "body:", raw);

  if (!resp.ok) throw new Error(`getUserTodos failed ${resp.status}: ${raw}`);

  const data = await resp.json();
  return adaptTodosToUI(data.todos || []);
}


export async function deleteUserAndTodos(username, apiBase = DEFAULT_API) {
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("El nombre de usuario debe ser un string no vacío.");
  }

  const url = `${apiBase}/users/${encodeURIComponent(username.trim())}`;
  const resp = await fetch(url, { method: "DELETE" });

  const raw = await resp.clone().text();
  const ok = resp.ok;
  console.log("[deleteUserAndTodos] status:", resp.status, "body:", raw);

  if (!ok) throw new Error(`deleteUserAndTodos failed ${resp.status}: ${raw}`);
}