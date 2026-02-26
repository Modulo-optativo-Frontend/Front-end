import { Link } from "react-router-dom";

function CartDropdown({
	isOpen,
	closeCart,
	cartError,
	isCartLoading,
	token,
	cartItems,
	formatPrice,
	cartTotal,
	handleRemoveFromCart,
	handleClearCart,
}) {
	if (!isOpen) {
		return null;
	}

	let content;

	// 1️⃣ Error
	if (cartError) {
		content = (
			<p className="text-xs text-red-600 mb-2">{cartError}</p>
		);
	}

	// 2️⃣ Loading
	else if (isCartLoading) {
		content = (
			<p className="text-xs text-gray-500">Cargando carrito...</p>
		);
	}

	// 3️⃣ No hay token
	else if (!token) {
		content = (
			<div className="text-xs text-gray-500">
				<p>Inicia sesión para guardar tu carrito.</p>

				<Link
					to="/login"
					onClick={closeCart}
					className="inline-flex mt-3 rounded-full bg-blue-600 px-3 py-1.5 text-white text-xs">
					Iniciar sesión
				</Link>
			</div>
		);
	}

	// 4️⃣ Carrito vacío
	else if (!cartItems || cartItems.length === 0) {
		content = (
			<p className="text-xs text-gray-500">
				Aún no has añadido productos.
			</p>
		);
	}

	// 5️⃣ Carrito con productos
	else {
		content = (
			<div className="space-y-3">
				{cartItems.map(function (item) {
					const producto = item.producto;

					let id = item.producto;
					if (
						producto &&
						producto._id !== undefined &&
						producto._id !== null
					) {
						id = producto._id;
					}

					let nombre = "Producto";
					if (
						producto &&
						producto.nombre !== undefined &&
						producto.nombre !== null
					) {
						nombre = producto.nombre;
					}

					let modelo = "Modelo no disponible";
					if (
						producto &&
						producto.modelo !== undefined &&
						producto.modelo !== null
					) {
						modelo = producto.modelo;
					}

					let precio = 0;
					if (
						producto &&
						producto.precio !== undefined &&
						producto.precio !== null
					) {
						precio = producto.precio;
					}

					let cantidad = 0;
					if (item.cantidad !== undefined && item.cantidad !== null) {
						cantidad = item.cantidad;
					}

					return (
						<div
							key={String(id)}
							className="flex items-start justify-between gap-3">
							<div>
								<p className="text-xs font-medium text-gray-900">
									{nombre}
								</p>

								<p className="text-[11px] text-gray-500">{modelo}</p>

								<p className="text-[11px] text-gray-700">
									Cantidad: {cantidad}
								</p>
							</div>

							<div className="text-right">
								<p className="text-xs font-semibold text-gray-900">
									{formatPrice(precio * cantidad)}
								</p>

								<button
									type="button"
									onClick={function () {
										handleRemoveFromCart(id);
									}}
									className="mt-2 rounded-full border border-gray-200 px-2.5 py-1 text-[11px]">
									Quitar
								</button>
							</div>
						</div>
					);
				})}

				<div className="pt-3 border-t border-gray-200 flex items-center justify-between">
					<span className="text-xs text-gray-500">Total</span>

					<span className="text-sm font-semibold text-gray-900">
						{formatPrice(cartTotal)}
					</span>
				</div>

				<button
					type="button"
					onClick={handleClearCart}
					className="w-full rounded-full border border-gray-200 px-3 py-1.5 text-xs">
					Vaciar carrito
				</button>
			</div>
		);
	}

	return (
		<div
			role="dialog"
			aria-label="Carrito de compra"
			className="absolute right-0 top-12 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
			<div className="flex items-center justify-between mb-3">
				<p className="text-xs font-semibold uppercase tracking-widest text-gray-800">
					Tu carrito
				</p>

				<button
					type="button"
					onClick={closeCart}
					className="text-xs text-gray-500">
					Cerrar
				</button>
			</div>

			{content}
		</div>
	);
}

export default CartDropdown;
