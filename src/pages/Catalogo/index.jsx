import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { ProductGrid } from "../../components/product/ProductGrid.jsx";
import { FeedbackMessage } from "../../components/ui/FeedBackMessage.jsx";
import { apiFetch } from "../../lib/api.js";
import { clearAuth, getAuthToken } from "../../lib/auth.js";

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

		const producto = productos.find((p) => p._id === productoId);
		if (!producto?.enStock) return;

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
		<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
			<SiteHeader
				authToken={authToken}
				onLogout={handleLogout}
			/>

			<main className="flex-1 p-4">
				{/* 000100 CATALOG-IDENTIFICATION */}
				<div className="border border-(--color-border) p-2">
					<p className="text-xs font-bold uppercase">
						000100 CATALOG-IDENTIFICATION-DIVISION
					</p>
					<p className="text-xs font-bold uppercase">
						000200 MODULE: FULL-PRODUCT-CATALOG........... STATUS: ACTIVE
					</p>
				</div>

				{/* 000300 STATUS MSG */}
				{mensajeCarrito ? (
					<div className="-mt-px border border-(--color-border) px-4 py-3">
						<FeedbackMessage
							message={mensajeCarrito}
							className="text-xs"
						/>
					</div>
				) : null}

				{loadingProductos ? (
					<div className="-mt-px border border-(--color-border) px-4 py-3">
						<p className="text-xs uppercase">
							[ ] LOADING CATALOG-RECORDS.................................
						</p>
					</div>
				) : null}

				{!loadingProductos && errorProductos ? (
					<div className="-mt-px border border-(--color-border) px-4 py-3">
						<FeedbackMessage
							message={errorProductos}
							successMatch="__no_match__"
							className="text-xs"
						/>
					</div>
				) : null}

				{!loadingProductos && !errorProductos && productos.length === 0 ? (
					<div className="-mt-px border border-(--color-border) px-4 py-3">
						<p className="text-xs uppercase">[--] NO-RECORDS-FOUND</p>
					</div>
				) : null}

				{!loadingProductos && !errorProductos && productos.length > 0 ? (
					<div className="-mt-px">
						<div className="border border-(--color-border) -mt-px px-4 py-2">
							<p className="text-xs font-bold uppercase">
								000400 PRODUCT-GRID-SECTION.......... RECORDS:{" "}
								{productos.length}
							</p>
						</div>
						<div className="-mt-px">
							<ProductGrid
								productos={productos}
								onAddToCart={handleAddToCart}
							/>
						</div>
					</div>
				) : null}
			</main>

			<SiteFooter />
		</div>
	);
}
