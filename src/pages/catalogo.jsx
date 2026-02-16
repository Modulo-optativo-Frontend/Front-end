import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { clearAuth, getAuthToken } from "../lib/auth.js";
import { getProductoImageUrl } from "../lib/media.js";

const filtrosIniciales = {
	q: "",
	modelo: "",
	chip: "",
	condicion: "",
	enStock: "",
	minPrecio: "",
	maxPrecio: "",
	orden: "",
};

function Catalogo() {
	const [productos, setProductos] = useState([]);
	const [productosBase, setProductosBase] = useState([]);
	const [filtros, setFiltros] = useState(filtrosIniciales);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");
	const token = getAuthToken();
	const navigate = useNavigate();

	const modelosDisponibles = useMemo(() => {
		const setModelos = new Set(productosBase.map((p) => p.modelo).filter(Boolean));
		return [...setModelos].sort((a, b) => a.localeCompare(b));
	}, [productosBase]);

	const chipsDisponibles = useMemo(() => {
		const setChips = new Set(productosBase.map((p) => p.chip).filter(Boolean));
		return [...setChips].sort((a, b) => a.localeCompare(b));
	}, [productosBase]);

	const formatPrice = (value) =>
		new Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
		}).format(value || 0);

	const loadProductos = async (filtrosActivos = filtros) => {
		setIsLoading(true);
		setError("");
		try {
			const params = new URLSearchParams();
			Object.entries(filtrosActivos).forEach(([key, value]) => {
				if (value !== "") params.set(key, value);
			});
			const path = params.toString()
				? `/api/productos?${params.toString()}`
				: "/api/productos";
			const response = await apiFetch(path);
			const data = response.data || [];
			setProductos(data);
			if (!params.toString()) setProductosBase(data);
		} catch (err) {
			setError(err.message || "No se pudieron cargar productos");
		} finally {
			setIsLoading(false);
		}
	};

	const handleFiltroChange = (event) => {
		const { name, value } = event.target;
		setFiltros((prev) => ({ ...prev, [name]: value }));
	};

	const handleAplicarFiltros = async (event) => {
		event.preventDefault();
		await loadProductos(filtros);
	};

	const handleLimpiar = async () => {
		setFiltros(filtrosIniciales);
		await loadProductos(filtrosIniciales);
	};

	const handleAddToCart = async (productoId) => {
		if (!token) {
			setMessage("Inicia sesión para añadir productos al carrito");
			return;
		}
		setMessage("");
		try {
			await apiFetch("/api/carrito/items", {
				method: "POST",
				body: { productoId },
				token,
			});
			setMessage("Producto añadido al carrito");
		} catch (err) {
			setMessage(err.message || "No se pudo añadir el producto");
		}
	};

	const handleLogout = () => {
		clearAuth();
		navigate("/catalogo");
	};

	useEffect(() => {
		loadProductos(filtrosIniciales);
	}, []);

	return (
		<div className="min-h-screen sl-page" style={{ backgroundColor: "var(--color-white)" }}>
			<header
				className="backdrop-blur-md sl-header"
				style={{
					borderBottom: "1px solid var(--color-border)",
					backgroundColor: "rgba(245, 245, 247, 0.8)",
				}}>
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					<Link to="/" className="text-sm" style={{ color: "var(--color-blue)" }}>
						← Inicio
					</Link>
					<p className="text-sm font-semibold" style={{ color: "var(--color-black)" }}>
						Catálogo SilverLine
					</p>
					{token ? (
						<button
							type="button"
							onClick={handleLogout}
							className="text-xs rounded-full secondary-btn"
							style={{ padding: "0.375rem 0.8rem" }}>
							Logout
						</button>
					) : (
						<Link to="/login" className="text-sm" style={{ color: "var(--color-gray-dark)" }}>
							Login
						</Link>
					)}
				</div>
			</header>

			<main className="max-w-6xl mx-auto px-4 py-10">
				<form
					onSubmit={handleAplicarFiltros}
					className="rounded-2xl p-4 md:p-5 mb-8 grid grid-cols-1 md:grid-cols-4 gap-3 glass-panel"
					style={{ border: "1px solid var(--color-border)", backgroundColor: "#fff" }}>
					<input
						type="text"
						name="q"
						value={filtros.q}
						onChange={handleFiltroChange}
						placeholder="Buscar"
						className="rounded-xl px-3 py-2 text-sm md:col-span-2 sl-input"
						style={{ border: "1px solid var(--color-border)" }}
					/>
					<select
						name="modelo"
						value={filtros.modelo}
						onChange={handleFiltroChange}
						className="rounded-xl px-3 py-2 text-sm sl-input"
						style={{ border: "1px solid var(--color-border)" }}>
						<option value="">Modelo</option>
						{modelosDisponibles.map((modelo) => (
							<option key={modelo} value={modelo}>
								{modelo}
							</option>
						))}
					</select>
					<select
						name="chip"
						value={filtros.chip}
						onChange={handleFiltroChange}
						className="rounded-xl px-3 py-2 text-sm sl-input"
						style={{ border: "1px solid var(--color-border)" }}>
						<option value="">Chip</option>
						{chipsDisponibles.map((chip) => (
							<option key={chip} value={chip}>
								{chip}
							</option>
						))}
					</select>
					<select
						name="condicion"
						value={filtros.condicion}
						onChange={handleFiltroChange}
						className="rounded-xl px-3 py-2 text-sm sl-input"
						style={{ border: "1px solid var(--color-border)" }}>
						<option value="">Condición</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</select>
					<select
						name="enStock"
						value={filtros.enStock}
						onChange={handleFiltroChange}
						className="rounded-xl px-3 py-2 text-sm sl-input"
						style={{ border: "1px solid var(--color-border)" }}>
						<option value="">Stock</option>
						<option value="true">Disponible</option>
						<option value="false">Sin stock</option>
					</select>
					<input
						type="number"
						name="minPrecio"
						min="0"
						value={filtros.minPrecio}
						onChange={handleFiltroChange}
						placeholder="Precio mínimo"
						className="rounded-xl px-3 py-2 text-sm sl-input"
						style={{ border: "1px solid var(--color-border)" }}
					/>
					<input
						type="number"
						name="maxPrecio"
						min="0"
						value={filtros.maxPrecio}
						onChange={handleFiltroChange}
						placeholder="Precio máximo"
						className="rounded-xl px-3 py-2 text-sm sl-input"
						style={{ border: "1px solid var(--color-border)" }}
					/>
					<select
						name="orden"
						value={filtros.orden}
						onChange={handleFiltroChange}
						className="rounded-xl px-3 py-2 text-sm sl-input"
						style={{ border: "1px solid var(--color-border)" }}>
						<option value="">Orden</option>
						<option value="precioAsc">Precio ascendente</option>
						<option value="precioDesc">Precio descendente</option>
						<option value="anioDesc">Año reciente</option>
						<option value="anioAsc">Año antiguo</option>
					</select>
					<div className="md:col-span-4 flex gap-3">
						<button
							type="submit"
							className="rounded-full text-xs primary-btn"
							style={{
								padding: "8px 14px",
								backgroundColor: "var(--color-blue)",
								color: "var(--color-white)",
							}}>
							Aplicar filtros
						</button>
						<button
							type="button"
							onClick={handleLimpiar}
							className="rounded-full text-xs secondary-btn"
							style={{
								padding: "8px 14px",
								border: "1px solid var(--color-border)",
								color: "var(--color-gray-dark)",
							}}>
							Limpiar
						</button>
					</div>
				</form>

				<div className="flex items-center justify-between mb-6">
					<h2 className="text-sm font-semibold uppercase" style={{ letterSpacing: "0.2em" }}>
						Productos
					</h2>
					<p className="text-xs" style={{ color: "var(--color-gray)" }}>
						Mostrando {productos.length}
					</p>
				</div>

				{message ? (
					<p className="text-sm mb-4" style={{ color: message.includes("añadido") ? "#0a7f39" : "var(--color-error)" }}>
						{message}
					</p>
				) : null}

				{isLoading ? (
					<p style={{ color: "var(--color-gray)" }}>Cargando productos...</p>
				) : error ? (
					<p style={{ color: "var(--color-error)" }}>{error}</p>
				) : productos.length === 0 ? (
					<p style={{ color: "var(--color-gray)" }}>No hay productos para estos filtros.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{productos.map((producto) => {
							const urlImagenProducto = getProductoImageUrl(producto);
							return (
								<div
									key={producto._id}
									className="rounded-2xl p-4 flex flex-col gap-3 product-card"
									style={{ border: "1px solid var(--color-border)", backgroundColor: "#fff" }}>
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
									</div>
									<p className="text-xs" style={{ color: "var(--color-gray)" }}>
										{producto.modelo} {producto.anio ? `· ${producto.anio}` : ""}
									</p>
									<h3 className="text-sm font-semibold" style={{ color: "var(--color-black)" }}>
										{producto.nombre}
									</h3>
									<p className="text-xs" style={{ color: "var(--color-gray-dark)" }}>
										{producto.chip || "-"} · {producto.memoriaRamGb || "-"}GB RAM · {producto.almacenamientoGb || "-"}GB
									</p>
									<p className="text-sm font-semibold" style={{ color: "var(--color-black)" }}>
										{formatPrice(producto.precio)}
									</p>
									<div className="mt-2 flex gap-2">
										<button
											type="button"
											disabled={!producto.enStock}
											onClick={() => handleAddToCart(producto._id)}
											className="text-xs rounded-full disabled:opacity-60 primary-btn"
											style={{
												padding: "6px 10px",
												backgroundColor: "var(--color-blue)",
												color: "var(--color-white)",
											}}>
											Añadir
										</button>
										<Link
											to={`/productos/${producto._id}`}
											className="text-xs rounded-full secondary-btn"
											style={{
												padding: "6px 10px",
												border: "1px solid var(--color-border)",
												color: "var(--color-gray-dark)",
											}}>
											Detalle
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</main>
		</div>
	);
}

export default Catalogo;
