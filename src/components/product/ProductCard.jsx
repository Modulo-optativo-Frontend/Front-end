import { Link } from "react-router-dom";
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
		<div className="font-mono flex flex-col border border-(--color-border) bg-(--color-surface)">
			{/* HEADER ROW */}
			<div className="border-b border-(--color-border) px-2 py-1">
				<p className="text-[10px] font-bold uppercase text-(--color-black)">
					PROD-REC
				</p>
			</div>
			{/* IMAGE */}
			<div
				className="relative border-b border-(--color-border) bg-(--color-gray-light)"
				style={{ aspectRatio: "4/3" }}>
				{imagenProducto ? (
					<img
						src={imagenProducto}
						alt={producto.nombre}
						className="absolute inset-0 h-full w-full object-cover"
						loading="lazy"
					/>
				) : null}
			</div>
			{/* DATA */}
			<div className="flex-1 p-3">
				<p className="text-[10px] uppercase text-(--color-gray)">
					{producto.modelo || "MODELO-N/A"}
				</p>
				<h3 className="mt-1 text-xs font-bold uppercase leading-tight text-(--color-black)">
					{producto.nombre || "PRODUCTO"}
				</h3>
				<div className="my-2 border-t border-dashed border-(--color-border)" />
				<p className="text-right text-sm font-bold text-(--color-black)">
					{formatPrice(producto.precio)}
				</p>
				<div className="my-2 border-t border-dashed border-(--color-border)" />
				<p className={`text-[10px] font-bold uppercase ${
					producto.enStock
						? "text-(--color-black)"
						: "text-(--color-gray)"
				}`}>
					{producto.enStock ? "[*] EN-STOCK" : "[X] SIN-STOCK"}
				</p>
			</div>
			{/* ACTIONS */}
			<div className="flex border-t border-(--color-border)">
				<Button
					onClick={() => onAddToCart(producto._id)}
					disabled={!producto.enStock}
					className="flex-1 border-0 border-r border-(--color-border)">
					{producto.enStock ? "[+] CART" : "[X] STOCK"}
				</Button>
				<Link
					to={`/detalle/${producto._id}`}
					className="flex-1 border-0 px-4 py-2 text-center text-xs font-bold uppercase bg-(--color-surface) text-(--color-black) hover:bg-(--color-gray-light)">
					[i] VER
				</Link>
			</div>
		</div>
	);
}
