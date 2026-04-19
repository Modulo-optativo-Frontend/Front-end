import { Link } from "react-router-dom";
import { FeedbackMessage } from "../ui/FeedBackMessage.jsx";

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
			<FeedbackMessage
				message={cartError}
				successMatch="__no_match__"
				className="text-xs"
			/>
		);
	}

	// 2️⃣ Loading
	else if (isCartLoading) {
		content = <p className="text-xs uppercase">[ ] LOADING CART-RECORDS....</p>;
	}

	// 3️⃣ No hay token
	else if (!token) {
		content = (
			<div className="text-xs">
				<FeedbackMessage
					message="Necesitas iniciar sesion para consultar el carrito."
					successMatch="__no_match__"
					className="text-xs"
				/>
				<Link
					to="/login"
					onClick={closeCart}
					className="mt-2 block border border-(--color-border) bg-(--color-accent) px-3 py-1 text-center text-xs font-bold uppercase text-(--color-white) hover:bg-(--color-highlight) hover:text-(--color-black)">
					[&gt;] LOGIN
				</Link>
			</div>
		);
	}

	// 4️⃣ Carrito vacío
	else if (!cartItems || cartItems.length === 0) {
		content = (
			<p className="text-xs uppercase">[--] CART-EMPTY........... 0 ITEMS</p>
		);
	}

	// 5️⃣ Carrito con productos
	else {
		content = (
			<div>
				{cartItems.map(function (item) {
					const producto = item.producto;

					let id = item.producto;
					if (producto && producto._id !== undefined && producto._id !== null) {
						id = producto._id;
					}
					let nombre = "PRODUCTO";
					if (
						producto &&
						producto.nombre !== undefined &&
						producto.nombre !== null
					) {
						nombre = producto.nombre;
					}
					let modelo = "N/A";
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
							className="border-b border-dashed border-(--color-border) py-2">
							<div className="flex items-start justify-between gap-2">
								<div>
									<p className="text-[10px] font-bold uppercase">{nombre}</p>
									<p className="text-[10px] uppercase text-(--color-gray)">
										{modelo}
									</p>
									<p className="text-[10px] uppercase">QTY: {cantidad}</p>
								</div>
								<div className="text-right">
									<p className="text-xs font-bold">
										{formatPrice(precio * cantidad)}
									</p>
									<button
										type="button"
										onClick={function () {
											handleRemoveFromCart(id);
										}}
										className="mt-1 border border-(--color-border) px-2 py-0.5 text-[10px] font-bold uppercase hover:bg-(--color-gray-light)">
										[-] QUITAR
									</button>
								</div>
							</div>
						</div>
					);
				})}

				<div className="mt-2 flex items-center justify-between border-t border-(--color-border) pt-2">
					<span className="text-xs font-bold uppercase">TOTAL</span>
					<span className="text-sm font-bold">{formatPrice(cartTotal)}</span>
				</div>

				<button
					type="button"
					onClick={handleClearCart}
					className="mt-2 w-full border border-(--color-border) px-3 py-1 text-xs font-bold uppercase hover:bg-(--color-gray-light)">
					[x] VACIAR-CARRITO
				</button>
			</div>
		);
	}

	return (
		<div
			role="dialog"
			aria-label="Carrito de compra"
			className="font-mono absolute right-0 top-12 w-80 border border-(--color-border) bg-[rgba(6,12,25,0.98)] shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
			<div className="flex items-center justify-between border-b border-(--color-border) px-3 py-2">
				<p className="text-xs font-bold uppercase">000300 CART-DATA-SECTION</p>
				<button
					type="button"
					onClick={closeCart}
					className="border border-(--color-border) px-2 py-0.5 text-xs font-bold uppercase hover:bg-(--color-gray-light)">
					[X]
				</button>
			</div>
			<div className="p-3">{content}</div>
		</div>
	);
}

export default CartDropdown;
