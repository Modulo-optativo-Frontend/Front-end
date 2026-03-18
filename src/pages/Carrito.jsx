import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../components/layout/SiteFooter.jsx";
import { Button } from "../components/ui/Button.jsx";
import { apiFetch } from "../lib/api.js";
import { clearAuth, getAuthToken } from "../lib/auth.js";

function formatPrice(precioProducto) {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(precioProducto || 0);
}

export function Carrito() {
	const navigate = useNavigate();
	const authToken = getAuthToken();

	const [itemsCarrito, setItemsCarrito] = useState([]);
	const [loadingCarrito, setLoadingCarrito] = useState(true);
	const [errorCarrito, setErrorCarrito] = useState("");

	const totalCarrito = useMemo(() => {
		return itemsCarrito.reduce((totalActual, itemCarrito) => {
			const precioProducto = itemCarrito?.producto?.precio || 0;
			const cantidadProducto = itemCarrito?.cantidad || 0;
			return totalActual + precioProducto * cantidadProducto;
		}, 0);
	}, [itemsCarrito]);

	useEffect(() => {
		if (!authToken) {
			setLoadingCarrito(false);
			return;
		}

		async function cargarCarrito() {
			setLoadingCarrito(true);
			setErrorCarrito("");

			try {
				const response = await apiFetch("/api/carrito", { token: authToken });
				setItemsCarrito(response.items || []);
			} catch (error) {
				setErrorCarrito(error.message || "No se pudo cargar el carrito");
			} finally {
				setLoadingCarrito(false);
			}
		}

		cargarCarrito();
	}, [authToken]);

	async function handleQuitarItem(productoId) {
		if (!authToken) {
			return;
		}

		setErrorCarrito("");

		try {
			const response = await apiFetch(`/api/carrito/items/${productoId}`, {
				method: "DELETE",
				token: authToken,
			});
			setItemsCarrito(response.items || []);
		} catch (error) {
			setErrorCarrito(error.message || "No se pudo quitar el producto");
		}
	}

	async function handleVaciarCarrito() {
		if (!authToken) {
			return;
		}

		setErrorCarrito("");

		try {
			const response = await apiFetch("/api/carrito", {
				method: "DELETE",
				token: authToken,
			});
			setItemsCarrito(response.items || []);
		} catch (error) {
			setErrorCarrito(error.message || "No se pudo vaciar el carrito");
		}
	}

	function handleLogout() {
		clearAuth();
		navigate("/");
	}

	if (!authToken) {
		return (
			<div className="flex min-h-screen flex-col bg-white">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
					<h1 className="text-3xl font-semibold text-black">Carrito</h1>
					<p className="mt-3 text-sm text-(--color-gray)">
						Necesitas iniciar sesión para ver tu carrito.
					</p>
					<Link
						to="/login"
						className="mt-4 inline-block text-sm text-(--color-blue)">
						Ir a login
					</Link>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (loadingCarrito) {
		return (
			<div className="flex min-h-screen flex-col bg-white">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
					<p className="text-sm text-(--color-gray)">Cargando carrito...</p>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (errorCarrito) {
		return (
			<div className="flex min-h-screen flex-col bg-white">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
					<p className="text-sm text-(--color-error)">{errorCarrito}</p>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (itemsCarrito.length === 0) {
		return (
			<div className="flex min-h-screen flex-col bg-white">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
					<h1 className="text-3xl font-semibold text-black">Carrito</h1>
					<p className="mt-3 text-sm text-(--color-gray)">
						No tienes productos en el carrito.
					</p>
				</main>
				<SiteFooter />
			</div>
		);
	}

	function irAlCheckout() {
		if (!authToken) {
			navigate("/login");
			return;
		}
		navigate("/checkout");
	}
	return (
		<div className="flex min-h-screen flex-col bg-white">
			<SiteHeader
				authToken={authToken}
				onLogout={handleLogout}
			/>

			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-semibold text-black">Carrito</h1>
					<Button
						variant="secondary"
						onClick={handleVaciarCarrito}>
						Vaciar carrito
					</Button>
				</div>

				<div className="mt-8 space-y-4">
					{itemsCarrito.map((itemCarrito) => {
						const productoCarrito = itemCarrito.producto || {};
						const productoId = productoCarrito._id || itemCarrito.producto;
						const cantidadProducto = itemCarrito.cantidad || 0;

						return (
							<div
								key={String(productoId)}
								className="flex items-center justify-between rounded-xl border border-(--color-border) p-4">
								<div>
									<p className="text-sm font-semibold text-black">
										{productoCarrito.nombre || "Producto"}
									</p>
									<p className="text-xs text-(--color-gray)">
										Cantidad: {cantidadProducto}
									</p>
								</div>
								<div className="flex items-center gap-3">
									<p className="text-sm font-semibold text-black">
										{formatPrice(
											(productoCarrito.precio || 0) * cantidadProducto,
										)}
									</p>
									<Button
										variant="secondary"
										onClick={() => handleQuitarItem(productoId)}>
										Quitar
									</Button>
								</div>
							</div>
						);
					})}
				</div>

				<div className="mt-8 flex justify-end">
					<p className="text-lg font-semibold text-black">
						Total: {formatPrice(totalCarrito)}
					</p>
				</div>

				<Button
					onClick={irAlCheckout}
					variant="primary"
					children={"Completar pedido"}
				/>
			</main>

			<SiteFooter />
		</div>
	);
}
