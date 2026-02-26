import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../components/layout/SiteFooter.jsx";
import { ProductGrid } from "../components/product/ProductGrid.jsx";
import { apiFetch } from "../lib/api.js";
import { clearAuth, getAuthToken } from "../lib/auth.js";

export function Catalogo() {
	const navigate = useNavigate();
	const [productos, setProductos] = useState([]);
	const [loadingProductos, setLoadingProductos] = useState(true);
	const [errorProductos, setErrorProductos] = useState("");
	const [mensajeCarrito, setMensajeCarrito] = useState("");

	const authToken = getAuthToken();

	useEffect(() => {
		async function cargarProductos() {
			setLoadingProductos(true);
			setErrorProductos("");

			try {
				const response = await apiFetch("/api/productos");
				setProductos(response.data || []);
			} catch (error) {
				setErrorProductos(error.message || "No se pudieron cargar productos");
			} finally {
				setLoadingProductos(false);
			}
		}

		cargarProductos();
	}, []);

	async function handleAddToCart(productoId) {
		if (!authToken) {
			navigate("/login");
			return;
		}

		setMensajeCarrito("");

		try {
			await apiFetch("/api/carrito/items", {
				method: "POST",
				body: { productoId },
				token: authToken,
			});
			setMensajeCarrito("Producto añadido al carrito");
		} catch (error) {
			setMensajeCarrito(error.message || "No se pudo añadir el producto");
		}
	}

	function handleLogout() {
		clearAuth();
		navigate("/catalogo");
	}

	return (
		<div className="flex min-h-screen flex-col bg-white">
			<SiteHeader authToken={authToken} onLogout={handleLogout} />

			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
				<h1 className="text-3xl font-semibold text-black">Catálogo completo</h1>
				<p className="mt-2 text-sm text-(--color-gray)">Todos los equipos disponibles.</p>

				{mensajeCarrito ? (
					<p className="mt-4 text-sm text-(--color-gray-dark)">{mensajeCarrito}</p>
				) : null}

				{loadingProductos ? (
					<p className="mt-8 text-sm text-(--color-gray)">Cargando productos...</p>
				) : null}

				{!loadingProductos && errorProductos ? (
					<p className="mt-8 text-sm text-(--color-error)">{errorProductos}</p>
				) : null}

				{!loadingProductos && !errorProductos && productos.length === 0 ? (
					<p className="mt-8 text-sm text-(--color-gray)">No hay productos disponibles.</p>
				) : null}

				{!loadingProductos && !errorProductos && productos.length > 0 ? (
					<div className="mt-8">
						<ProductGrid productos={productos} onAddToCart={handleAddToCart} />
					</div>
				) : null}
			</main>

			<SiteFooter />
		</div>
	);
}
