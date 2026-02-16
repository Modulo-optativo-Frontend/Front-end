import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { getAuthToken } from "../lib/auth.js";
import { getProductoImageUrl } from "../lib/media.js";

function DetalleProducto() {
	const { id } = useParams();
	const token = getAuthToken();

	const [producto, setProducto] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [cartMessage, setCartMessage] = useState("");

	const formatPrice = (value) =>
		new Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
		}).format(value || 0);

	const loadProducto = async () => {
		setIsLoading(true);
		setError("");

		try {
			const response = await apiFetch(`/api/productos/${id}`);
			setProducto(response.data || null);
		} catch (err) {
			setError(err.message || "No se pudo cargar el detalle del producto");
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddToCart = async () => {
		if (!producto?._id) return;
		if (!token) {
			setCartMessage("Inicia sesión para añadir este producto al carrito");
			return;
		}

		setCartMessage("");
		try {
			await apiFetch("/api/carrito/items", {
				method: "POST",
				body: { productoId: producto._id },
				token,
			});
			setCartMessage("Producto añadido al carrito");
		} catch (err) {
			setCartMessage(err.message || "No se pudo añadir el producto");
		}
	};

	useEffect(() => {
		loadProducto();
	}, [id]);

	if (isLoading) {
		return (
			<div className="min-h-screen px-4 py-10 sl-page" style={{ backgroundColor: "var(--color-white)" }}>
				<p style={{ color: "var(--color-gray)" }}>Cargando detalle del producto...</p>
			</div>
		);
	}

	if (error || !producto) {
		return (
			<div className="min-h-screen px-4 py-10 sl-page" style={{ backgroundColor: "var(--color-white)" }}>
				<p style={{ color: "var(--color-error)" }}>{error || "Producto no encontrado"}</p>
				<Link to="/" className="inline-block mt-4" style={{ color: "var(--color-blue)" }}>
					Volver al catálogo
				</Link>
			</div>
		);
	}

	const urlImagenProducto = getProductoImageUrl(producto);

	return (
		<div className="min-h-screen sl-page" style={{ backgroundColor: "var(--color-white)" }}>
			<div className="max-w-4xl mx-auto px-4 py-10">
				<Link to="/" className="text-sm" style={{ color: "var(--color-blue)" }}>
					← Volver al catálogo
				</Link>

				<div
					className="mt-6 rounded-2xl p-6 md:p-8 glass-panel"
					style={{ border: "1px solid var(--color-border)", backgroundColor: "#fff" }}>
					<div className="flex flex-col md:flex-row gap-8">
						<div className="md:w-1/2">
							<div
								className="rounded-2xl relative overflow-hidden"
								style={{ aspectRatio: "4/3", backgroundColor: "var(--color-gray-light)" }}>
								{urlImagenProducto ? (
									<img
										src={urlImagenProducto}
										alt={producto.nombre}
										className="absolute inset-0 h-full w-full object-cover"
									/>
								) : null}
							</div>
						</div>

						<div className="md:w-1/2">
							<p className="text-xs uppercase" style={{ letterSpacing: "0.16em", color: "var(--color-gray)" }}>
								{producto.codigoSku}
							</p>
							<h1 className="text-3xl font-semibold mt-2" style={{ color: "var(--color-black)" }}>
								{producto.nombre}
							</h1>
							<p className="text-sm mt-3" style={{ color: "var(--color-gray-dark)" }}>
								{producto.descripcion || "Sin descripción disponible"}
							</p>
							<p className="text-2xl font-semibold mt-4" style={{ color: "var(--color-black)" }}>
								{formatPrice(producto.precio)}
							</p>

							<div className="mt-6 grid grid-cols-2 gap-3 text-sm">
								<p style={{ color: "var(--color-gray)" }}>Modelo: <strong style={{ color: "var(--color-black)" }}>{producto.modelo || "-"}</strong></p>
								<p style={{ color: "var(--color-gray)" }}>Año: <strong style={{ color: "var(--color-black)" }}>{producto.anio || "-"}</strong></p>
								<p style={{ color: "var(--color-gray)" }}>Chip: <strong style={{ color: "var(--color-black)" }}>{producto.chip || "-"}</strong></p>
								<p style={{ color: "var(--color-gray)" }}>RAM: <strong style={{ color: "var(--color-black)" }}>{producto.memoriaRamGb ? `${producto.memoriaRamGb} GB` : "-"}</strong></p>
								<p style={{ color: "var(--color-gray)" }}>SSD: <strong style={{ color: "var(--color-black)" }}>{producto.almacenamientoGb ? `${producto.almacenamientoGb} GB` : "-"}</strong></p>
								<p style={{ color: "var(--color-gray)" }}>Condición: <strong style={{ color: "var(--color-black)" }}>{producto.condicion || "-"}</strong></p>
							</div>

							<button
								type="button"
								disabled={!producto.enStock}
								onClick={handleAddToCart}
								className="mt-8 rounded-full text-sm disabled:opacity-60 primary-btn"
								style={{
									padding: "10px 16px",
									backgroundColor: "var(--color-blue)",
									color: "var(--color-white)",
								}}>
								{producto.enStock ? "Añadir al carrito" : "Producto sin stock"}
							</button>

							{cartMessage ? (
								<p className="text-xs mt-3" style={{ color: cartMessage.includes("añadido") ? "#0a7f39" : "var(--color-error)" }}>
									{cartMessage}
								</p>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetalleProducto;
