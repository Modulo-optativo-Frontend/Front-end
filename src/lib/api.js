import { getAuthToken } from "./auth";
const apiUrlFromEnv = import.meta.env.VITE_API_URL
	? import.meta.env.VITE_API_URL.replace(/\/$/, "")
	: "http://localhost:3000";

export const API_URL_BASE = import.meta.env.DEV ? "" : apiUrlFromEnv;

export async function apiFetch(ruta, informacion) {
	// Si no me pasan informacion, creo un objeto vacío
	if (!informacion) {
		informacion = {};
	}

	// Método por defecto
	let method = "GET";
	if (informacion.method) {
		method = informacion.method;
	}

	// Body opcional
	let body = null;
	if (informacion.body) {
		body = JSON.stringify(informacion.body);
	}

	// Headers básicos
	let cabeceras = {
		"Content-Type": "application/json",
	};

	// Si vienen headers extra, los añado
	if (informacion.headers) {
		for (let key in informacion.headers) {
			cabeceras[key] = informacion.headers[key];
		}
	}
	// Si hay token, añado Authorization
	// Si auth=true, leo token del localStorage (authTok) automáticamente
	if (informacion.auth) {
		const t = getAuthToken();
		if (t) cabeceras["Authorization"] = "Bearer " + t;
	}

	// Compatibilidad: si alguien pasa token manualmente, también funciona
	if (informacion.token) {
		cabeceras["Authorization"] = "Bearer " + informacion.token;
	}

	// Hago la petición
	const response = await fetch(API_URL_BASE + ruta, {
		method: method,
		headers: cabeceras,
		body: body,
	});

	// Intento convertir la respuesta a JSON
	let data;
	try {
		data = await response.json();
	} catch (error) {
		data = {
			message: "Respuesta inválida del servidor" + error.message,
		};
	}

	// Si la respuesta no es correcta (status 200-299)
	if (!response.ok) {
		let message = "Error de servidor";

		if (data && data.message) {
			message = data.message;
		}

		throw new Error(message);
	}

	return data;
}
