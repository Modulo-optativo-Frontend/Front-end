import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { clearAuth, getAuthToken } from "../lib/auth.js";
import { getProductoImageUrl } from "../lib/media.js";

function Home() {
	// Estado principal: catálogo, carrito y feedback de red.
	const [productos, setProductos] = useState([]);
	const [productosError, setProductosError] = useState("");
	const [isLoadingProductos, setIsLoadingProductos] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [cartError, setCartError] = useState("");
	const [cartMessage, setCartMessage] = useState("");
	const [isCartLoading, setIsCartLoading] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const token = getAuthToken();
	const navigate = useNavigate();

	// Totales derivados del carrito (cantidad total y precio total).
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

	// Formatea precios en euros para UI.
	const formatPrice = (value) =>
		new Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
		}).format(value || 0);

	const productosDestacados = productos.slice(0, 5);
	const heroImageUrl = getProductoImageUrl(productos[0] || {});

	const loadProductos = async () => {
		// Carga catálogo de productos desde la API.
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
		// Carga el carrito del usuario autenticado.
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
		// Añade una unidad al carrito del producto indicado.
		if (!token) {
			setCartError("Inicia sesión para añadir productos al carrito");
			setCartMessage("Necesitas iniciar sesión para poder añadir productos.");
			return;
		}
		setCartError("");
		setCartMessage("");
		try {
			const response = await apiFetch("/api/carrito/items", {
				method: "POST",
				body: { productoId },
				token,
			});
			setCartItems(response.items || []);
			setCartMessage("Producto añadido al carrito.");
			setIsCartOpen(true);
		} catch (err) {
			setCartError(err.message || "No se pudo añadir el producto");
			setCartMessage(err.message || "No se pudo añadir el producto.");
		}
	};

	const handleRemoveFromCart = async (productoId) => {
		// Quita una unidad del carrito.
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
		// Vacía el carrito completo.
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
		// Cargar catálogo al montar.
		loadProductos();
	}, []);

	useEffect(() => {
		// Recargar carrito cuando cambia el token (login/logout).
		loadCart();
	}, [token]);

	const toggleCart = () => {
		// Abre/cierra el desplegable del carrito.
		setIsCartOpen((prev) => !prev);
	};

	const closeCart = () => {
		// Cierra el desplegable del carrito.
		setIsCartOpen(false);
	};

	const handleLogout = () => {
		clearAuth();
		setCartItems([]);
		setCartMessage("");
		setCartError("");
		setIsCartOpen(false);
		navigate("/");
	};

	return (
		<div
			className="min-h-screen text-slate-900 sl-page"
			style={{ backgroundColor: "var(--color-white)" }}>
			{/* NAVBAR */}
			<header
				className="backdrop-blur-md sl-header"
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
						<Link
							to="/catalogo"
							className="transition-colors hover:opacity-80"
							style={{ color: "var(--color-gray-dark)" }}>
							Catálogo
						</Link>
					</nav>

					<div className="flex items-center gap-3 text-sm relative">
						<button
							type="button"
							onClick={toggleCart}
							className="relative rounded-full text-xs transition-colors hover:opacity-80"
							style={{
								padding: "0.5rem 0.875rem",
								border: "1px solid var(--color-border)",
								color: "var(--color-gray-dark)",
								backgroundColor: "transparent",
							}}
							aria-haspopup="dialog"
							aria-expanded={isCartOpen}>
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
						</button>
							{isCartOpen ? (
								<div
									role="dialog"
									aria-label="Carrito de compra"
									className="absolute right-0 top-12 w-[20rem] rounded-2xl shadow-xl p-4 z-[100]"
									style={{
										border: "1px solid var(--color-border)",
										backgroundColor: "rgba(255, 255, 255, 0.98)",
								}}>
								<div className="flex items-center justify-between mb-3">
									<p
										className="text-xs font-semibold uppercase"
										style={{
											letterSpacing: "0.2em",
											color: "var(--color-gray-dark)",
										}}>
										Tu carrito
									</p>
									<button
										type="button"
										onClick={closeCart}
										className="text-xs transition-colors hover:opacity-70"
										style={{ color: "var(--color-gray)" }}>
										Cerrar
									</button>
								</div>

								{cartError ? (
									<p
										className="text-xs mb-2"
										style={{ color: "var(--color-error)" }}>
										{cartError}
									</p>
								) : null}

								{isCartLoading ? (
									<p
										className="text-xs"
										style={{ color: "var(--color-gray)" }}>
										Cargando carrito...
									</p>
								) : !token ? (
									<div className="text-xs" style={{ color: "var(--color-gray)" }}>
										<p>Inicia sesión para guardar tu carrito.</p>
										<Link
											to="/login"
											onClick={closeCart}
											className="inline-flex mt-3 rounded-full text-xs transition-colors hover:opacity-90"
											style={{
												padding: "0.375rem 0.75rem",
												backgroundColor: "var(--color-blue)",
												color: "var(--color-white)",
											}}>
											Iniciar sesión
										</Link>
									</div>
								) : cartItems.length === 0 ? (
									<p
										className="text-xs"
										style={{ color: "var(--color-gray)" }}>
										Aún no has añadido productos.
									</p>
								) : (
									<div className="space-y-3">
										{cartItems.map((item) => (
											<div
												key={item.producto?._id || item.producto}
												className="flex items-start justify-between gap-3">
												<div>
													<p
														className="text-xs font-medium"
														style={{ color: "var(--color-black)" }}>
														{item.producto?.nombre || "Producto"}
													</p>
													<p
														className="text-[11px]"
														style={{ color: "var(--color-gray)" }}>
														{item.producto?.modelo || "Modelo no disponible"}
													</p>
													<p
														className="text-[11px]"
														style={{ color: "var(--color-gray-dark)" }}>
														Cantidad: {item.cantidad}
													</p>
												</div>
												<div className="text-right">
													<p
														className="text-xs font-semibold"
														style={{ color: "var(--color-black)" }}>
														{formatPrice(
															(item.producto?.precio || 0) * item.cantidad
														)}
													</p>
													<button
														type="button"
														onClick={() =>
															handleRemoveFromCart(
																item.producto?._id || item.producto
															)
														}
														className="mt-2 text-[11px] rounded-full transition-colors hover:opacity-90"
														style={{
																padding: "0.25rem 0.625rem",
															border: "1px solid var(--color-border)",
															color: "var(--color-gray-dark)",
														}}>
														Quitar
													</button>
												</div>
											</div>
										))}
										<div
											className="pt-3 flex items-center justify-between"
											style={{ borderTop: "1px solid var(--color-border)" }}>
											<span
												className="text-xs"
												style={{ color: "var(--color-gray)" }}>
												Total
											</span>
											<span
												className="text-sm font-semibold"
												style={{ color: "var(--color-black)" }}>
												{formatPrice(cartTotal)}
											</span>
										</div>
										<button
											type="button"
											onClick={handleClearCart}
											className="w-full text-xs rounded-full transition-colors hover:opacity-90"
											style={{
												padding: "0.375rem 0.75rem",
												border: "1px solid var(--color-border)",
												color: "var(--color-gray-dark)",
											}}>
											Vaciar carrito
										</button>
									</div>
								)}
							</div>
						) : null}
						{token ? (
							<button
								type="button"
								onClick={handleLogout}
								className="px-4 py-2 rounded-full text-sm transition-colors hover:opacity-90 secondary-btn"
								style={{ padding: "0.5rem 0.95rem" }}>
								Logout
							</button>
						) : (
							<>
								<Link
									to="/login"
									className="transition-colors hover:opacity-80"
									style={{ color: "var(--color-gray-dark)" }}>
									Iniciar sesión
								</Link>
								<Link
									to="/registro"
									className="px-4 py-2 rounded-full text-sm transition-colors hover:opacity-90 primary-btn"
									style={{
										padding: "0.5rem 0.95rem",
										backgroundColor: "var(--color-blue)",
										color: "var(--color-white)",
									}}>
									Crear cuenta
								</Link>
							</>
						)}
					</div>
				</div>
			</header>

			<main>
				{/* HERO */}
				<section style={{ borderBottom: "1px solid var(--color-border)" }}>
					<div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
						<div className="max-w-2xl">
							<p
								className="text-xs font-medium uppercase mb-2"
								style={{ letterSpacing: "0.22em", color: "var(--color-blue)" }}>
								REFURBISHED MACBOOK STORE
							</p>
							<h1
								className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 hero-title"
								style={{ color: "var(--color-black)" }}>
								MacBooks reacondicionados. Listos para crear.
							</h1>
							<p
								className="text-sm md:text-base mb-6 hero-subtitle"
								style={{ color: "var(--color-gray)" }}>
								Certificado. Conectar y crear.
							</p>
							<div className="flex flex-wrap gap-3">
								<Link
									to="/catalogo"
									className="rounded-full text-sm transition-colors hover:opacity-90 primary-btn"
									style={{
										padding: "0.625rem 1.25rem",
										backgroundColor: "var(--color-blue)",
										color: "var(--color-white)",
									}}>
									Ir al catálogo completo
								</Link>
								<button
									className="rounded-full text-sm transition-colors hover:opacity-80 secondary-btn"
									style={{
										padding: "0.625rem 1.25rem",
										border: "1px solid var(--color-border)",
										color: "var(--color-black)",
									}}>
									Cómo revisamos cada equipo
								</button>
							</div>
						</div>
						<div className="product-card p-3 md:p-4">
							<div
								className="rounded-2xl relative overflow-hidden"
								style={{
									aspectRatio: "16/10",
									backgroundColor: "var(--color-gray-light)",
								}}>
								<img
									src={heroImageUrl}
									alt="MacBook destacado de SilverLine"
									className="absolute inset-0 h-full w-full object-cover"
								/>
								<div
									className="absolute inset-0"
									style={{
										background:
											"linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.35) 100%)",
									}}
								/>
								<div className="absolute left-4 bottom-4 text-white">
									<p className="text-xs uppercase tracking-[0.2em] opacity-90 bauhaus-chip inline-block px-2 py-1">Destacado</p>
									<p className="text-lg font-semibold mt-2">MacBook reacondicionado premium</p>
								</div>
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
								Mostrando {productosDestacados.length} modelos
							</p>
						</div>

						{cartMessage ? (
							<p
								className="text-sm mb-4"
								style={{
									color: cartMessage.includes("añadido")
										? "#0a7f39"
										: "var(--color-error)",
								}}>
								{cartMessage}
							</p>
						) : null}

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
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 trend-grid">
								{productosDestacados.map((producto) => {
									const urlImagenProducto = getProductoImageUrl(producto);
									const detalleProducto = [
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

									const etiquetaEstado = producto.condicion
										? `Condición ${producto.condicion}`
										: producto.enStock
											? "Disponible"
											: "Sin stock";

									return (
										<div
											key={producto._id}
											className="group rounded-2xl transition-all p-4 flex flex-col gap-4 hover:shadow-lg product-card"
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
												{urlImagenProducto ? (
													<img
														src={urlImagenProducto}
														alt={producto.nombre}
														className="absolute inset-0 h-full w-full object-cover"
														loading="lazy"
													/>
												) : null}
												<span
													className="absolute top-3 left-3 rounded-full"
													style={{
														fontSize: "11px",
														padding: "4px 8px",
														backgroundColor: "rgba(255, 255, 255, 0.9)",
														border: "1px solid var(--color-border)",
														color: "var(--color-black)",
													}}>
													{etiquetaEstado}
												</span>
											</div>
											<div className="trend-card-content">
												<h3
													className="text-sm font-medium"
													style={{ color: "var(--color-black)" }}>
													{producto.nombre}
												</h3>
												<p
													className="text-xs"
													style={{ color: "var(--color-gray)" }}>
													{detalleProducto || producto.descripcion || "Especificaciones disponibles"}
												</p>
												<div className="trend-price">
													<span
														className="text-sm font-semibold"
														style={{ color: "var(--color-black)" }}>
														{formatPrice(producto.precio)}
													</span>
												</div>
												<div className="trend-cta">
													<button
														disabled={!producto.enStock}
														onClick={() => handleAddToCart(producto._id)}
														className="w-full text-xs rounded-full transition-colors hover:opacity-90 disabled:opacity-60 primary-btn"
														style={{
															padding: "0.4rem 0.75rem",
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
