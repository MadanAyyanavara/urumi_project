const API_BASE = "http://localhost:8080";

export async function fetchStores() {
  const res = await fetch(`${API_BASE}/stores`);
  return res.json();
}

export async function createStore(id: string, type: string, description: string) {
  const res = await fetch(`${API_BASE}/stores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, type, description })
  });
  return res.json();
}

export async function deleteStore(id: string) {
  const res = await fetch(`${API_BASE}/stores/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to terminate store");
  }
}
