import { ProductCard } from "./ProductCard.jsx";

export function ProductGrid({ productos, onAddToCart }) {
	return (
		<div className="border border-(--color-border) grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			{productos.map((productoActual) => (
				<div
					key={productoActual._id}
					className="-mt-px -ml-px">
					<ProductCard
						producto={productoActual}
						onAddToCart={onAddToCart}
					/>
				</div>
			))}
		</div>
	);
}
