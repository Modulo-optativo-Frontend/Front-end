import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { getAuthToken } from "../lib/auth.js";

function Home() {
	const [productos, setProductos] = useState([]);
	const [productosError, setProductosError] = useState("");
	const [isLoadingProductos, setIsLoadingProductos] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [cartError, setCartError] = useState("");
	const [isCartLoading, setIsCartLoading] = useState(false);
	const token = getAuthToken();

	const cartCount = useMemo(
		() => cartItems.reduce((acc, item) => acc + item.cantidad, 0),
		[cartItems]
	);

	const cartTotal = useMemo(
		() =>
			cartItems.reduce((acc, item) => {
				const precio = item?.producto?.precio || 0;
				return acc + precio * item.cantidad;
			}, 0),
		[cartItems]
	);

	const formatPrice = (value) =>
		new Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
		}).format(value || 0);

	const loadProductos = async () => {
		setIsLoadingProductos(true);
		setProductosError("");
		try {
			const response = await apiFetch("/api/productos");
			setProductos(response.data || []);
		} catch (err) {
			setProductosError(err.message || "No se pudieron cargar productos");
		} finally {
			setIsLoadingProductos(false);
		}
	};

	const loadCart = async () => {
		if (!token) return;
		setIsCartLoading(true);
		setCartError("");
		try {
			const response = await apiFetch("/api/carrito", { token });
			setCartItems(response.items || []);
		} catch (err) {
			setCartError(err.message || "No se pudo cargar el carrito");
		} finally {
			setIsCartLoading(false);
		}
	};

	const handleAddToCart = async (productoId) => {
		if (!token) {
			setCartError("Inicia sesión para añadir productos al carrito");
			return;
		}
		setCartError("");
		try {
			const response = await apiFetch("/api/carrito/items", {
				method: "POST",
				body: { productoId },
				token,
			});
			setCartItems(response.items || []);
		} catch (err) {
			setCartError(err.message || "No se pudo añadir el producto");
		}
	};

	const handleRemoveFromCart = async (productoId) => {
		if (!token) {
			setCartError("Inicia sesión para modificar el carrito");
			return;
		}
		setCartError("");
		try {
			const response = await apiFetch(`/api/carrito/items/${productoId}`, {
				method: "DELETE",
				token,
			});
			setCartItems(response.items || []);
		} catch (err) {
			setCartError(err.message || "No se pudo quitar el producto");
		}
	};

	const handleClearCart = async () => {
		if (!token) {
			setCartError("Inicia sesión para modificar el carrito");
			return;
		}
		setCartError("");
		try {
			const response = await apiFetch("/api/carrito", {
				method: "DELETE",
				token,
			});
			setCartItems(response.items || []);
		} catch (err) {
			setCartError(err.message || "No se pudo vaciar el carrito");
		}
	};

	useEffect(() => {
		loadProductos();
	}, []);

	useEffect(() => {
		loadCart();
	}, [token]);

	return (
		<div
			className="min-h-screen text-slate-900"
			style={{ backgroundColor: "var(--color-white)" }}>
			{/* NAVBAR */}
			<header
				className="backdrop-blur-md"
				style={{
					borderBottom: "1px solid var(--color-border)",
					backgroundColor: "rgba(245, 245, 247, 0.8)",
				}}>
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					<Link
						to="/"
						className="flex items-center gap-2">
						<div
							className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
							style={{
								backgroundColor: "var(--color-black)",
								color: "var(--color-white)",
							}}>
							SL
						</div>
						<span
							className="text-sm font-semibold uppercase"
							style={{ letterSpacing: "0.2rem", color: "var(--color-black)" }}>
							SilverLine
						</span>
					</Link>

					<nav
						className="hidden md:flex items-center gap-6 text-sm"
						style={{ color: "var(--color-gray)" }}>
						<a
							href="#macs"
							className="transition-colors hover:opacity-80"
							style={{ color: "var(--color-gray-dark)" }}>
							MacBooks
						</a>
						<a
							href="#why"
							className="transition-colors hover:opacity-80"
							style={{ color: "var(--color-gray-dark)" }}>
							Por qué SilverLine
						</a>
					</nav>

					<div className="flex items-center gap-3 text-sm">
						<a
							href="#carrito"
							className="relative rounded-full text-xs transition-colors hover:opacity-80"
							style={{
								padding: "8px 14px",
								border: "1px solid var(--color-border)",
								color: "var(--color-gray-dark)",
							}}>
							Carrito
							<span
								className="absolute -top-2 -right-2 rounded-full text-[10px] font-semibold"
								style={{
									minWidth: "20px",
									height: "20px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: "var(--color-black)",
									color: "var(--color-white)",
								}}>
								{cartCount}
							</span>
						</a>
						<Link
							to="/login"
							className="transition-colors hover:opacity-80"
							style={{ color: "var(--color-gray-dark)" }}>
							Iniciar sesión
						</Link>
						<Link
							to="/registro"
							className="px-4 py-2 rounded-full text-sm transition-colors hover:opacity-90"
							style={{
								backgroundColor: "var(--color-blue)",
								color: "var(--color-white)",
							}}>
							Crear cuenta
						</Link>
					</div>
				</div>
			</header>

			<main>
				{/* HERO */}
				<section style={{ borderBottom: "1px solid var(--color-border)" }}>
					<div className="max-w-6xl mx-auto px-4 py-12">
						<div className="max-w-2xl">
							<p
								className="text-xs font-medium uppercase mb-2"
								style={{ letterSpacing: "0.22em", color: "var(--color-blue)" }}>
								REFURBISHED MACBOOK STORE
							</p>
							<h1
								className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
								style={{ color: "var(--color-black)" }}>
								MacBooks reacondicionados. Listos para crear.
							</h1>
							<p
								className="text-sm md:text-base mb-6"
								style={{ color: "var(--color-gray)" }}>
								Certificado. Conectar y crear.
							</p>
							<div className="flex flex-wrap gap-3">
								<a
									href="#macs"
									className="rounded-full text-sm transition-colors hover:opacity-90"
									style={{
										padding: "10px 20px",
										backgroundColor: "var(--color-blue)",
										color: "var(--color-white)",
									}}>
									Ver MacBooks disponibles
								</a>
								<button
									className="rounded-full text-sm transition-colors hover:opacity-80"
									style={{
										padding: "10px 20px",
										border: "1px solid var(--color-border)",
										color: "var(--color-black)",
									}}>
									Cómo revisamos cada equipo
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* GRID MACS */}
				<section
					id="macs"
					style={{ borderBottom: "1px solid var(--color-border)" }}>
					<div className="max-w-6xl mx-auto px-4 py-12">
						<div className="flex items-center justify-between mb-6">
							<h2
								className="text-sm font-semibold uppercase"
								style={{
									letterSpacing: "0.22em",
									color: "var(--color-gray-dark)",
								}}>
								En tendencia esta semana
							</h2>
							<p
								className="text-xs"
								style={{ color: "var(--color-gray)" }}>
								Mostrando 4 modelos
							</p>
						</div>

						{isLoadingProductos ? (
							<p
								className="text-sm"
								style={{ color: "var(--color-gray)" }}>
								Cargando productos...
							</p>
						) : productosError ? (
							<p
								className="text-sm"
								style={{ color: "var(--color-error)" }}>
								{productosError}
							</p>
						) : productos.length === 0 ? (
							<p
								className="text-sm"
								style={{ color: "var(--color-gray)" }}>
								No hay productos disponibles ahora mismo.
							</p>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								{productos.map((producto) => {
									const detalle = [
										producto.modelo,
										producto.almacenamientoGb
											? `${producto.almacenamientoGb} GB`
											: null,
										producto.memoriaRamGb
											? `${producto.memoriaRamGb} GB RAM`
											: null,
									]
										.filter(Boolean)
										.join(" · ");

									const tag = producto.condicion
										? `Condición ${producto.condicion}`
										: producto.enStock
											? "Disponible"
											: "Sin stock";

									return (
										<div
											key={producto._id}
											className="group rounded-2xl transition-all p-4 flex flex-col gap-4 hover:shadow-lg"
											style={{
												border: "1px solid var(--color-border)",
												backgroundColor: "rgba(255, 255, 255, 0.6)",
											}}>
											<div
												className="rounded-xl relative overflow-hidden"
												style={{
													aspectRatio: "4/3",
													backgroundColor: "var(--color-gray-light)",
												}}>
												<span
													className="absolute top-3 left-3 rounded-full"
													style={{
														fontSize: "11px",
														padding: "4px 8px",
														backgroundColor: "rgba(255, 255, 255, 0.9)",
														border: "1px solid var(--color-border)",
														color: "var(--color-black)",
													}}>
													{tag}
												</span>
											</div>
											<div className="flex flex-col gap-2">
												<h3
													className="text-sm font-medium"
													style={{ color: "var(--color-black)" }}>
													{producto.nombre}
												</h3>
												<p
													className="text-xs"
													style={{ color: "var(--color-gray)" }}>
													{detalle || producto.descripcion || "Especificaciones disponibles"}
												</p>
												<div className="flex items-center justify-between mt-2">
													<span
														className="text-sm font-semibold"
														style={{ color: "var(--color-black)" }}>
														{formatPrice(producto.precio)}
													</span>
													<button
														disabled={!producto.enStock}
														onClick={() => handleAddToCart(producto._id)}
														className="text-xs rounded-full transition-colors hover:opacity-90 disabled:opacity-60"
														style={{
															padding: "6px 12px",
															backgroundColor: "var(--color-blue)",
															color: "var(--color-white)",
														}}>
														Añadir al carrito
													</button>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</section>

				{/* CARRITO */}
				<section
					id="carrito"
					style={{ borderBottom: "1px solid var(--color-border)" }}>
					<div className="max-w-6xl mx-auto px-4 py-12">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
							<div>
								<h2
									className="text-sm font-semibold uppercase"
									style={{
										letterSpacing: "0.22em",
										color: "var(--color-gray-dark)",
									}}>
									Tu carrito
								</h2>
								<p
									className="text-xs"
									style={{ color: "var(--color-gray)" }}>
									{token
										? `${cartCount} artículos en tu carrito`
										: "Inicia sesión para guardar tus productos"}
								</p>
							</div>
							{token ? (
								<button
									onClick={handleClearCart}
									disabled={cartItems.length === 0}
									className="text-xs rounded-full transition-colors hover:opacity-90 disabled:opacity-60"
									style={{
										padding: "8px 16px",
										border: "1px solid var(--color-border)",
										color: "var(--color-gray-dark)",
									}}>
									Vaciar carrito
								</button>
							) : (
								<Link
									to="/login"
									className="text-xs rounded-full transition-colors hover:opacity-90"
									style={{
										padding: "8px 16px",
										backgroundColor: "var(--color-blue)",
										color: "var(--color-white)",
									}}>
									Iniciar sesión
								</Link>
							)}
						</div>

						{cartError ? (
							<p
								className="text-sm mb-4"
								style={{ color: "var(--color-error)" }}>
								{cartError}
							</p>
						) : null}

						{isCartLoading ? (
							<p
								className="text-sm"
								style={{ color: "var(--color-gray)" }}>
								Cargando carrito...
							</p>
						) : !token ? (
							<p
								className="text-sm"
								style={{ color: "var(--color-gray)" }}>
								Accede con tu cuenta para sincronizar tu carrito con el servidor.
							</p>
						) : cartItems.length === 0 ? (
							<p
								className="text-sm"
								style={{ color: "var(--color-gray)" }}>
								Aún no has añadido productos.
							</p>
						) : (
							<div
								className="rounded-2xl p-6"
								style={{
									border: "1px solid var(--color-border)",
									backgroundColor: "rgba(255, 255, 255, 0.6)",
								}}>
								<div className="space-y-4">
									{cartItems.map((item) => (
										<div
											key={item.producto?._id || item.producto}
											className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
											<div>
												<p
													className="text-sm font-medium"
													style={{ color: "var(--color-black)" }}>
													{item.producto?.nombre || "Producto"}
												</p>
												<p
													className="text-xs"
													style={{ color: "var(--color-gray)" }}>
													{item.producto?.modelo || "Modelo no disponible"}
												</p>
											</div>
											<div className="flex items-center gap-4">
												<span
													className="text-xs"
													style={{ color: "var(--color-gray-dark)" }}>
													Cantidad: {item.cantidad}
												</span>
												<span
													className="text-sm font-semibold"
													style={{ color: "var(--color-black)" }}>
													{formatPrice(
														(item.producto?.precio || 0) * item.cantidad
													)}
												</span>
												<button
													onClick={() =>
														handleRemoveFromCart(
															item.producto?._id || item.producto
														)
													}
													className="text-xs rounded-full transition-colors hover:opacity-90"
													style={{
														padding: "6px 12px",
														border: "1px solid var(--color-border)",
														color: "var(--color-gray-dark)",
													}}>
													Quitar
												</button>
											</div>
										</div>
									))}
								</div>
								<div
									className="mt-6 pt-4 flex items-center justify-between"
									style={{ borderTop: "1px solid var(--color-border)" }}>
									<span
										className="text-sm"
										style={{ color: "var(--color-gray)" }}>
										Total
									</span>
									<span
										className="text-lg font-semibold"
										style={{ color: "var(--color-black)" }}>
										{formatPrice(cartTotal)}
									</span>
								</div>
							</div>
						)}
					</div>
				</section>

				{/* WHY SILVERLINE */}
				<section
					id="why"
					style={{ borderBottom: "1px solid var(--color-border)" }}>
					<div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h2
								className="text-sm font-semibold uppercase mb-3"
								style={{
									letterSpacing: "0.22em",
									color: "var(--color-gray-dark)",
								}}>
								Por qué SilverLine
							</h2>
							<p
								className="text-sm"
								style={{ color: "var(--color-gray)" }}>
								Una experiencia cercana al producto nuevo, con precios realmente
								ajustados y garantía.
							</p>
						</div>
						<div
							className="space-y-4 text-sm"
							style={{ color: "var(--color-gray)" }}>
							<p>
								<span
									className="font-medium"
									style={{ color: "var(--color-black)" }}>
									Revisión completa
								</span>{" "}
								de hardware, puertos, teclado, pantalla y batería en cada
								equipo.
							</p>
							<p>
								<span
									className="font-medium"
									style={{ color: "var(--color-black)" }}>
									Configuración limpia
								</span>{" "}
								con la última versión compatible de macOS listo para usar.
							</p>
						</div>
						<div
							className="space-y-4 text-sm"
							style={{ color: "var(--color-gray)" }}>
							<p>
								<span
									className="font-medium"
									style={{ color: "var(--color-black)" }}>
									Garantía incluida
								</span>{" "}
								y opción de ampliarla si quieres más tranquilidad.
							</p>
							<p>
								<span
									className="font-medium"
									style={{ color: "var(--color-black)" }}>
									Envío rápido y seguro
								</span>{" "}
								con embalaje reforzado y seguimiento.
							</p>
						</div>
					</div>
				</section>
			</main>

			{/* FOOTER */}
			<footer style={{ borderTop: "1px solid var(--color-border)" }}>
				<div
					className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
					style={{ color: "var(--color-gray)" }}>
					<p>
						© {new Date().getFullYear()} SilverLine. MacBooks reacondicionados.
					</p>
					<div className="flex gap-4">
						<a
							href="#"
							className="hover:opacity-70 transition-opacity"
							style={{ color: "var(--color-gray-dark)" }}>
							Privacidad
						</a>
						<a
							href="#"
							className="hover:opacity-70 transition-opacity"
							style={{ color: "var(--color-gray-dark)" }}>
							Términos
						</a>
						<a
							href="#"
							className="hover:opacity-70 transition-opacity"
							style={{ color: "var(--color-gray-dark)" }}>
							Contacto
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Home;
