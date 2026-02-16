// Base URL de la API (permite configurar con Vite env y evita doble /).
export const API_URL_BASE =
	import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

export async function apiFetch(path, options = {}) {
	// Soporta método, body y token opcional para Authorization.
	const {
		method = "GET",
		body,
		token,
		headers: cabecerasExtra = {},
	} = options;

	const cabeceras = {
		"Content-Type": "application/json",
		...cabecerasExtra,
	};

	if (token) {
		cabeceras.Authorization = `Bearer ${token}`;
	}

	// Llama a la API y parsea JSON (o reporta error legible).
	const response = await fetch(`${API_URL_BASE}${path}`, {
		method,
		headers: cabeceras,
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
