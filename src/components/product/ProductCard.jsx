import { Link } from "react-router-dom";
import { Card } from "../ui/Card.jsx";
import { Button } from "../ui/Button.jsx";
import { getProductoImageUrl } from "../../lib/media.js";

function formatPrice(precioProducto) {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(precioProducto || 0);
}

export function ProductCard({ producto, onAddToCart }) {
	const imagenProducto = getProductoImageUrl(producto);

	return (
		<Card className="flex flex-col gap-3 p-4">
			<div className="relative overflow-hidden rounded-xl bg-(--color-gray-light)" style={{ aspectRatio: "4/3" }}>
				{imagenProducto ? (
					<img
						src={imagenProducto}
						alt={producto.nombre}
						className="absolute inset-0 h-full w-full object-cover"
						loading="lazy"
					/>
				) : null}
			</div>
			<p className="text-xs text-(--color-gray)">
				{producto.modelo || "Modelo"}
			</p>
			<h3 className="text-sm font-semibold text-black">
				{producto.nombre || "Producto"}
			</h3>
			<p className="text-sm font-semibold text-black">
				{formatPrice(producto.precio)}
			</p>
			<div className="mt-1 flex gap-2">
				<Button
					onClick={() => onAddToCart(producto._id)}
					disabled={!producto.enStock}
					className="flex-1">
					Añadir al carrito
				</Button>
				<Link
					to={`/detalle/${producto._id}`}
					className="rounded-full border border-(--color-border) px-4 py-2 text-sm text-(--color-gray-dark)">
					Detalle
				</Link>
			</div>
		</Card>
	);
}
