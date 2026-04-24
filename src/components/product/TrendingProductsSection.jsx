import { getProductoImageUrl } from "../../lib/media.js";
import { FeedbackMessage } from "../ui/FeedBackMessage.jsx";
import { Button } from "../ui/Button.jsx";

export function TrendingProductsSection({
	productosDestacados,
	productos,
	cartMessage,
	isLoadingProductos,
	productosError,
	formatPrice,
	handleAddToCart,
}) {
	return (
		<section
			id="macs"
			className="font-mono border-b border-(--color-border)">
			{/* 000400 TRENDING-DIVISION */}
			<div
				aria-hidden="true"
				className="border-b border-(--color-border) px-4 py-2 flex items-center justify-between">
				<p className="text-xs font-bold uppercase">
					000400 TRENDING-PRODUCTS-DIVISION
				</p>
				<p className="text-xs font-bold">
					SHOWING: {productosDestacados.length} RECORDS
				</p>
			</div>

			{cartMessage ? (
				<div className="border-b border-(--color-border) px-4 py-3">
					<FeedbackMessage
						message={cartMessage}
						className="text-xs"
					/>
				</div>
			) : null}

			{isLoadingProductos ? (
				<div
					className="px-4 py-4"
					role="status"
					aria-live="polite">
					<p className="text-xs uppercase">
						<span className="sr-only">Cargando productos...</span>
						<span aria-hidden="true">
							[ ] LOADING PRODUCT-RECORDS.................................
						</span>
					</p>
				</div>
			) : productosError ? (
				<div className="px-4 py-4">
					<FeedbackMessage
						message={productosError}
						successMatch="__no_match__"
						className="text-xs"
					/>
				</div>
			) : productos.length === 0 ? (
				<div className="px-4 py-4">
					<p className="text-xs uppercase">[--] NO-RECORDS-FOUND</p>
				</div>
			) : (
				<div className="flex flex-wrap border-b border-black">
					{productosDestacados.map((producto, idx) => {
						const urlImagenProducto = getProductoImageUrl(producto);
						const detalleProducto = [
							producto.modelo,
							producto.almacenamientoGb
								? `${producto.almacenamientoGb}GB`
								: null,
							producto.memoriaRamGb ? `${producto.memoriaRamGb}GB-RAM` : null,
						]
							.filter(Boolean)
							.join(" / ");

						const etiquetaEstado = producto.condicion
							? `COND-${producto.condicion}`
							: producto.enStock
								? "DISPONIBLE"
								: "SIN-STOCK";

						return (
							<div
								key={producto._id}
								className={`product-card flex flex-col w-full sm:w-1/2 lg:w-1/5 border-(--color-border) ${idx > 0 ? "border-l" : ""}`}>
								{/* image */}
								<div
									className="border-b border-(--color-border) relative bg-(--color-gray-light)"
									style={{ aspectRatio: "4/3" }}>
									{urlImagenProducto ? (
										<img
											src={urlImagenProducto}
											alt={producto.nombre}
											className="absolute inset-0 h-full w-full object-cover"
											loading="lazy"
										/>
									) : null}
									<span className="absolute left-0 top-0 border-r border-b border-(--color-border) bg-(--color-accent) px-2 py-1 text-[10px] font-bold text-(--color-white) uppercase">
										{etiquetaEstado}
									</span>
								</div>
								{/* data */}
								<div className="flex flex-col flex-1 p-3 gap-1">
									<p className="text-[10px] uppercase text-(--color-gray)">
										{detalleProducto || "SPECS-N/A"}
									</p>
									<h3 className="text-xs font-bold uppercase leading-tight">
										{producto.nombre}
									</h3>
									<div className="border-t border-dashed border-(--color-border) my-1" />
									<p className="text-right text-sm font-bold">
										{formatPrice(producto.precio)}
									</p>
								</div>
								{/* cta */}
								<Button
									disabled={!producto.enStock}
									onClick={() => handleAddToCart(producto._id)}
									ariaLabel={
										producto.enStock
											? `Añadir ${producto.nombre} al carrito`
											: `${producto.nombre} sin stock`
									}
									className="min-h-0 w-full rounded-none border-0 border-t border-(--color-border) px-3 py-2 text-xs">
									{producto.enStock ? "[+] ADD-TO-CART" : "[X] OUT-OF-STOCK"}
								</Button>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}

export default TrendingProductsSection;
