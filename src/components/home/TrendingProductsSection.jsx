import { getProductoImageUrl } from "../../lib/media.js";

function TrendingProductsSection({
	productosDestacados,
	productos,
	cartMessage,
	isLoadingProductos,
	productosError,
	formatPrice,
	handleAddToCart,
}) {
	const cartMessageColorClass = cartMessage?.includes("añadido")
		? "text-[#0a7f39]"
		: "text-(--color-error)";

	return (
		<section id="macs" className="border-b border-(--color-border)">
			<div className="max-w-6xl mx-auto px-4 py-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-(--color-gray-dark) text-sm font-semibold uppercase tracking-[0.22em]">
						En tendencia esta semana
					</h2>
					<p className="text-(--color-gray) text-xs">
						Mostrando {productosDestacados.length} modelos
					</p>
				</div>

				{cartMessage ? (
					<p className={`mb-4 text-sm ${cartMessageColorClass}`}>
						{cartMessage}
					</p>
				) : null}

				{isLoadingProductos ? (
					<p className="text-(--color-gray) text-sm">Cargando productos...</p>
				) : productosError ? (
					<p className="text-(--color-error) text-sm">{productosError}</p>
				) : productos.length === 0 ? (
					<p className="text-(--color-gray) text-sm">No hay productos disponibles ahora mismo.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 trend-grid">
						{productosDestacados.map((producto) => {
							const urlImagenProducto = getProductoImageUrl(producto);
							const detalleProducto = [
								producto.modelo,
								producto.almacenamientoGb ? `${producto.almacenamientoGb} GB` : null,
								producto.memoriaRamGb ? `${producto.memoriaRamGb} GB RAM` : null,
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
									className="product-card group flex flex-col gap-4 rounded-2xl border border-(--color-border) bg-[rgba(255,255,255,0.6)] p-4 transition-all hover:shadow-lg">
									<div className="relative overflow-hidden rounded-xl bg-(--color-gray-light)" style={{ aspectRatio: "4/3" }}>
										{urlImagenProducto ? (
											<img
												src={urlImagenProducto}
												alt={producto.nombre}
												className="absolute inset-0 h-full w-full object-cover"
												loading="lazy"
											/>
										) : null}
										<span
											className="absolute left-3 top-3 rounded-full border border-(--color-border) bg-[rgba(255,255,255,0.9)] px-2 py-1 text-[11px] text-black">
											{etiquetaEstado}
										</span>
									</div>
									<div className="trend-card-content">
										<h3 className="text-black text-sm font-medium">{producto.nombre}</h3>
										<p className="text-(--color-gray) text-xs">
											{detalleProducto || producto.descripcion || "Especificaciones disponibles"}
										</p>
										<div className="trend-price">
											<span className="text-black text-sm font-semibold">
												{formatPrice(producto.precio)}
											</span>
										</div>
										<div className="trend-cta">
											<button
												disabled={!producto.enStock}
												onClick={() => handleAddToCart(producto._id)}
												className="primary-btn w-full rounded-full px-3 py-1.5 text-xs text-white transition-colors hover:opacity-90 disabled:opacity-60">
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
	);
}

export default TrendingProductsSection;
