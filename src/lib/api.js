// Base URL de la API (permite configurar con Vite env y evita doble /).
const API_BASE_URL =
	import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

export async function apiFetch(path, options = {}) {
	// Soporta método, body y token opcional para Authorization.
	const {
		method = "GET",
		body,
		token,
		headers: customHeaders = {},
	} = options;

	const headers = {
		"Content-Type": "application/json",
		...customHeaders,
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	// Llama a la API y parsea JSON (o reporta error legible).
	const response = await fetch(`${API_BASE_URL}${path}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	const data = await response
		.json()
		.catch(() => ({ message: "Respuesta inválida del servidor" }));

	if (!response.ok) {
		const message = data?.message || "Error de servidor";
		throw new Error(message);
	}

	return data;
}
