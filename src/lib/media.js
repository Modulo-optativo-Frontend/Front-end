import { API_URL_BASE } from "./api.js";

const RUTA_IMAGEN_POR_DEFECTO = "/images/macbooks/macbook_M(2-4).webp";

function obtenerRutaFallback(producto) {
	const modeloProducto = String(producto?.modelo || "").toLowerCase();
	const chipProducto = String(producto?.chip || "").toLowerCase();
	const anioProducto = Number(producto?.anio || 0);

	if (modeloProducto === "air") {
		if (chipProducto.includes("intel")) return "/images/macbooks/macbook-air-2018.webp";
		if (chipProducto === "m1") return "/images/macbooks/m1.webp";
		return "/images/macbooks/macbook_M(2-4).webp";
	}

	if (modeloProducto.includes("pro 14")) return "/images/macbooks/mbpro14inch.webp";
	if (modeloProducto.includes("pro 16")) return "/images/macbooks/mbpro16_.webp";
	if (modeloProducto.includes("pro 13") && anioProducto && anioProducto <= 2020) {
		return "/images/macbooks/mbp_2018-2020.webp";
	}
	if (modeloProducto.includes("pro")) return "/images/macbooks/mbp_2021_2023.webp";

	return RUTA_IMAGEN_POR_DEFECTO;
}

export function getProductoImageUrl(producto) {
	const rutaImagenProducto = producto?.imagenes?.[0] || obtenerRutaFallback(producto);

	if (!rutaImagenProducto || typeof rutaImagenProducto !== "string") {
		return `${API_URL_BASE}${RUTA_IMAGEN_POR_DEFECTO}`;
	}

	if (/^https?:\/\//i.test(rutaImagenProducto)) return rutaImagenProducto;
	if (rutaImagenProducto.startsWith("//")) return `https:${rutaImagenProducto}`;

	const rutaNormalizada = rutaImagenProducto.startsWith("/")
		? rutaImagenProducto
		: `/${rutaImagenProducto}`;

	return `${API_URL_BASE}${rutaNormalizada}`;
}
