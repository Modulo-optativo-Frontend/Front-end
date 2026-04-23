import { FeedbackMessage } from "../ui/FeedBackMessage.jsx";
import { Button } from "../ui/Button.jsx";
import { Link } from "../ui/Link.jsx";

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
					variant="primary"
					onClick={closeCart}
					className="mt-2 flex w-full min-h-0 px-3 py-1 text-center text-xs">
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
									<Button
										variant="secondary"
										onClick={function () {
											handleRemoveFromCart(id);
										}}
										className="mt-1 min-h-0 px-2 py-0.5 text-[10px]">
										[-] QUITAR
									</Button>
								</div>
							</div>
						</div>
					);
				})}

				<div className="mt-2 flex items-center justify-between border-t border-(--color-border) pt-2">
					<span className="text-xs font-bold uppercase">TOTAL</span>
					<span className="text-sm font-bold">{formatPrice(cartTotal)}</span>
				</div>

				<Button
					variant="secondary"
					onClick={handleClearCart}
					className="mt-2 min-h-0 w-full px-3 py-1 text-xs">
					[x] VACIAR-CARRITO
				</Button>
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
				<Button
					variant="secondary"
					onClick={closeCart}
					className="min-h-0 px-2 py-0.5 text-xs">
					[X]
				</Button>
			</div>
			<div className="p-3">{content}</div>
		</div>
	);
}

export default CartDropdown;
