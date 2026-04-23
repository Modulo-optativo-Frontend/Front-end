import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../components/layout/SiteFooter.jsx";
import { Button } from "../components/ui/Button.jsx";
import { FeedbackMessage } from "../components/ui/FeedBackMessage.jsx";
import { Link } from "../components/ui/Link.jsx";
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

	// Cámbialo a:
	const [msg] = useState("[!] DEBES-INICIAR-SESION........ LOGIN-REQUIRED");
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
			<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="flex-1 p-4">
					<div className="border border-(--color-border) p-4">
						<p className="text-xs font-bold uppercase">
							000100 CART-ACCESS-DIVISION
						</p>
						<div className="my-2 border-t border-dashed border-(--color-border)" />
						<p className="text-xs font-bold uppercase">{msg}</p>
						<div className="my-2 border-t border-dashed border-(--color-border)" />
						<Link
							to="/login"
							variant="text"
							className="text-xs">
							[&gt;] IR-A-LOGIN
						</Link>
					</div>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (loadingCarrito) {
		return (
			<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="flex-1 p-4">
					<div className="border border-(--color-border) p-4">
						<p className="text-xs font-bold uppercase">
							000100 CART-LOADING-DIVISION
						</p>
						<div className="my-2 border-t border-dashed border-(--color-border)" />
						<p className="text-xs uppercase">
							[ ] LOADING CART-RECORDS.................................
						</p>
					</div>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (errorCarrito) {
		return (
			<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="flex-1 p-4">
					<div className="border border-(--color-border) p-4">
						<p className="text-xs font-bold uppercase">
							000100 CART-EXCEPTION-DIVISION
						</p>
						<div className="my-2 border-t border-dashed border-(--color-border)" />
						<FeedbackMessage
							message={errorCarrito}
							successMatch="__no_match__"
							className="text-xs"
						/>
					</div>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (itemsCarrito.length === 0) {
		return (
			<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="flex-1 p-4">
					<div className="border border-(--color-border) p-4">
						<p className="text-xs font-bold uppercase">
							000100 CART-DATA-DIVISION
						</p>
						<div className="my-2 border-t border-dashed border-(--color-border)" />
						<p className="text-xs uppercase">
							[--] CART-EMPTY........... 0 ITEMS FOUND
						</p>
					</div>
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
		<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
			<SiteHeader
				authToken={authToken}
				onLogout={handleLogout}
			/>

			<main className="flex-1 p-4">
				{/* IDENTIFICATION */}
				<div className="border border-(--color-border) p-2">
					<p className="text-xs font-bold uppercase">
						000100 CART-IDENTIFICATION-DIVISION
					</p>
					<p className="text-xs font-bold uppercase">
						000200 MODULE: SHOPPING-CART-MANAGER..... ITEMS:{" "}
						{itemsCarrito.length}
					</p>
				</div>

				{/* ACTIONS HEADER */}
				<div className="-mt-px border border-(--color-border) flex items-center justify-between px-4 py-2">
					<p className="text-xs font-bold uppercase">
						000300 CART-ITEMS-SECTION
					</p>
					<Button
						variant="secondary"
						onClick={handleVaciarCarrito}>
						[X] VACIAR-CARRITO
					</Button>
				</div>

				{/* ITEMS */}
				<div className="-mt-px border border-(--color-border)">
					{/* TABLE HEADER */}
					<div className="flex border-b border-(--color-border) bg-(--color-black) text-(--color-white)">
						<div className="flex-1 px-4 py-2 text-xs font-bold uppercase">
							NOMBRE-PRODUCTO
						</div>
						<div className="w-20 border-l border-(--color-white) px-4 py-2 text-xs font-bold uppercase">
							QTY
						</div>
						<div className="w-32 border-l border-(--color-white) px-4 py-2 text-right text-xs font-bold uppercase">
							IMPORTE
						</div>
						<div className="w-24 border-l border-(--color-white) px-4 py-2 text-xs font-bold uppercase">
							ACT
						</div>
					</div>
					{itemsCarrito.map((itemCarrito) => {
						const productoCarrito = itemCarrito.producto || {};
						const productoId = productoCarrito._id || itemCarrito.producto;
						const cantidadProducto = itemCarrito.cantidad || 0;

						return (
							<div
								key={String(productoId)}
								className="flex items-center border-b border-dashed border-(--color-border)">
								<div className="flex-1 px-4 py-3">
									<p className="text-xs font-bold uppercase">
										{productoCarrito.nombre || "PRODUCTO"}
									</p>
								</div>
								<div className="w-20 border-l border-(--color-border) px-4 py-3">
									<p className="text-xs font-bold">{cantidadProducto}</p>
								</div>
								<div className="w-32 border-l border-(--color-border) px-4 py-3 text-right">
									<p className="text-xs font-bold">
										{formatPrice(
											(productoCarrito.precio || 0) * cantidadProducto,
										)}
									</p>
								</div>
								<div className="w-24 border-l border-(--color-border) px-4 py-3">
									<Button
										variant="secondary"
										onClick={() => handleQuitarItem(productoId)}>
										[-] QUITAR
									</Button>
								</div>
							</div>
						);
					})}
				</div>

				{/* TOTAL */}
				<div className="-mt-px border border-(--color-border) flex items-center justify-between px-4 py-3">
					<p className="text-xs font-bold uppercase">
						000400 TOTAL-AMOUNT-SECTION
					</p>
					<p className="text-xl font-bold">{formatPrice(totalCarrito)}</p>
				</div>

				{/* CHECKOUT */}
				<div className="-mt-px border border-(--color-border) px-4 py-3">
					<Button
						onClick={irAlCheckout}
						className="w-full">
						[&gt;] COMPLETAR-PEDIDO
					</Button>
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
