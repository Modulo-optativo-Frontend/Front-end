import { API_URL_BASE } from "./api.js";

const RUTA_IMAGEN_POR_DEFECTO = "/images/macbooks/macbook_M(2-4).webp";

function obtenerRutaFallback(producto) {
	const modelo = String(producto?.modelo || "").toLowerCase();
	const chip = String(producto?.chip || "").toLowerCase();
	const anio = Number(producto?.anio || 0);

	if (modelo === "air") {
		if (chip.includes("intel")) return "/images/macbooks/macbook-air-2018.webp";
		if (chip === "m1") return "/images/macbooks/m1.webp";
		return "/images/macbooks/macbook_M(2-4).webp";
	}

	if (modelo.includes("pro 14")) return "/images/macbooks/mbpro14inch.webp";
	if (modelo.includes("pro 16")) return "/images/macbooks/mbpro16_.webp";
	if (modelo.includes("pro 13") && anio && anio <= 2020) {
		return "/images/macbooks/mbp_2018-2020.webp";
	}
	if (modelo.includes("pro")) return "/images/macbooks/mbp_2021_2023.webp";

	return RUTA_IMAGEN_POR_DEFECTO;
}

export function getProductoImageUrl(producto) {
	const rutaImagen = producto?.imagenes?.[0] || obtenerRutaFallback(producto);
	if (!rutaImagen || typeof rutaImagen !== "string") {
		return `${API_URL_BASE}${RUTA_IMAGEN_POR_DEFECTO}`;
	}

	if (/^https?:\/\//i.test(rutaImagen)) return rutaImagen;
	if (rutaImagen.startsWith("//")) return `https:${rutaImagen}`;

	const rutaNormalizada = rutaImagen.startsWith("/")
		? rutaImagen
		: `/${rutaImagen}`;
	return `${API_URL_BASE}${rutaNormalizada}`;
}
