import { ProductCard } from "./ProductCard.jsx";

export function ProductGrid({ productos, onAddToCart }) {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{productos.map((productoActual) => (
				<ProductCard
					key={productoActual._id}
					producto={productoActual}
					onAddToCart={onAddToCart}
				/>
			))}
		</div>
	);
}
