import { getAuthToken } from "./auth";

// ─────────────────────────────────────────────
// CONFIGURACIÓN: URL base del servidor
// En desarrollo (npm run dev) Vite hace de proxy, así que la URL es ""
// En producción se usa la variable de entorno VITE_API_URL
// ─────────────────────────────────────────────
const esModoDesarrollo = import.meta.env.DEV;
const urlEnVariableDeEntorno =
	import.meta.env.VITE_API_URL || "http://localhost:3000";
const SERVIDOR_URL = esModoDesarrollo
	? ""
	: urlEnVariableDeEntorno.replace(/\/$/, "");

export const API_URL_BASE = SERVIDOR_URL;

// ─────────────────────────────────────────────
// apiFetch — función para llamar al servidor
//
// Uso básico:
//   apiFetch("/api/productos")
//
// Con opciones:
//   apiFetch("/api/carrito/items", {
//     method: "POST",          — GET por defecto
//     body: { productoId },    — datos que envías
//     token: authToken,        — token JWT si la ruta requiere login
//   })
// ─────────────────────────────────────────────
export async function apiFetch(ruta, opciones = {}) {
	// ── PASO 1: Preparar las cabeceras de la petición ──────────────────
	const cabeceras = {
		"Content-Type": "application/json", // siempre enviamos JSON
	};

	// Si el componente pasa el token directamente, lo añadimos
	if (opciones.token) {
		cabeceras["Authorization"] = "Bearer " + opciones.token;
	}

	// Si el componente pasa auth:true, leemos el token del localStorage
	if (opciones.auth) {
		const tokenGuardado = getAuthToken();
		if (tokenGuardado) {
			cabeceras["Authorization"] = "Bearer " + tokenGuardado;
		}
	}

	// Si el componente pasa cabeceras extra, las mezclamos
	if (opciones.headers) {
		Object.assign(cabeceras, opciones.headers);
	}

	// ── PASO 2: Hacer la petición HTTP ─────────────────────────────────
	const respuesta = await fetch(SERVIDOR_URL + ruta, {
		method: opciones.method || "GET",
		headers: cabeceras,
		body: opciones.body ? JSON.stringify(opciones.body) : null,
	});

	// ── PASO 3: Leer la respuesta como JSON ────────────────────────────
	let datos;
	try {
		datos = await respuesta.json();
	} catch {
		// El servidor no devolvió JSON válido
		datos = { message: "El servidor devolvió una respuesta inválida" };
	}

	// ── PASO 4: Si el servidor devolvió un error, lanzarlo ─────────────
	// Los status 200-299 son éxito, cualquier otro es error
	if (!respuesta.ok) {
		const error = new Error(datos?.message || "Error de servidor");
		error.status = respuesta.status; // número del error: 401, 403, 404, 500...
		throw error;
	}

	// ── PASO 5: Devolver los datos al componente que llamó ─────────────
	return datos;
}
