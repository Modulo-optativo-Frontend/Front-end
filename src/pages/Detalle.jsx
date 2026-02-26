import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../components/layout/SiteFooter.jsx";
import { Button } from "../components/ui/Button.jsx";
import { apiFetch } from "../lib/api.js";
import { clearAuth, getAuthToken } from "../lib/auth.js";
import { getProductoImageUrl } from "../lib/media.js";

export function Detalle() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [productoDetalle, setProductoDetalle] = useState(null);
	const [loadingProducto, setLoadingProducto] = useState(true);
	const [errorProducto, setErrorProducto] = useState("");
	const [mensajeCarrito, setMensajeCarrito] = useState("");

	const authToken = getAuthToken();

	useEffect(() => {
		async function cargarDetalleProducto() {
			setLoadingProducto(true);
			setErrorProducto("");

			try {
				const response = await apiFetch(`/api/productos/${id}`);
				setProductoDetalle(response.data || null);
			} catch (error) {
				setErrorProducto(error.message || "No se pudo cargar el producto");
			} finally {
				setLoadingProducto(false);
			}
		}

		cargarDetalleProducto();
	}, [id]);

	async function handleAddToCart() {
		if (!authToken) {
			navigate("/login");
			return;
		}

		if (!productoDetalle?._id) {
			setMensajeCarrito("Producto inválido");
			return;
		}

		setMensajeCarrito("");

		try {
			await apiFetch("/api/carrito/items", {
				method: "POST",
				body: { productoId: productoDetalle._id },
				token: authToken,
			});
			setMensajeCarrito("Producto añadido al carrito");
		} catch (error) {
			setMensajeCarrito(error.message || "No se pudo añadir el producto");
		}
	}

	function handleLogout() {
		clearAuth();
		navigate("/");
	}

	if (loadingProducto) {
		return (
			<div className="flex min-h-screen flex-col bg-white">
				<SiteHeader authToken={authToken} onLogout={handleLogout} />
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
					<p className="text-sm text-(--color-gray)">Cargando producto...</p>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (errorProducto || !productoDetalle) {
		return (
			<div className="flex min-h-screen flex-col bg-white">
				<SiteHeader authToken={authToken} onLogout={handleLogout} />
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
					<p className="text-sm text-(--color-error)">
						{errorProducto || "Producto no encontrado"}
					</p>
					<Link to="/catalogo" className="mt-4 inline-block text-sm text-(--color-blue)">
						Volver al catálogo
					</Link>
				</main>
				<SiteFooter />
			</div>
		);
	}

	const imagenProducto = getProductoImageUrl(productoDetalle);

	return (
		<div className="flex min-h-screen flex-col bg-white">
			<SiteHeader authToken={authToken} onLogout={handleLogout} />

			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
				<Link to="/catalogo" className="text-sm text-(--color-blue)">
					← Volver
				</Link>

				<div className="mt-6 grid gap-8 rounded-2xl border border-(--color-border) bg-white p-6 md:grid-cols-2">
					<div className="relative overflow-hidden rounded-xl bg-(--color-gray-light)" style={{ aspectRatio: "4/3" }}>
						{imagenProducto ? (
							<img
								src={imagenProducto}
								alt={productoDetalle.nombre}
								className="absolute inset-0 h-full w-full object-cover"
							/>
						) : null}
					</div>

					<div>
						<h1 className="text-3xl font-semibold text-black">
							{productoDetalle.nombre}
						</h1>
						<p className="mt-2 text-sm text-(--color-gray)">
							{productoDetalle.descripcion || "Sin descripción"}
						</p>
						<p className="mt-4 text-sm text-(--color-gray-dark)">
							Modelo: {productoDetalle.modelo || "-"}
						</p>
						<p className="mt-1 text-sm text-(--color-gray-dark)">
							Precio: {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(productoDetalle.precio || 0)}
						</p>

						<Button
							onClick={handleAddToCart}
							disabled={!productoDetalle.enStock}
							className="mt-6">
							{productoDetalle.enStock ? "Añadir al carrito" : "Sin stock"}
						</Button>

						{mensajeCarrito ? (
							<p className="mt-3 text-sm text-(--color-gray-dark)">{mensajeCarrito}</p>
						) : null}
					</div>
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
