import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../components/layout/SiteFooter.jsx";
import { Button } from "../components/ui/Button.jsx";
import { FeedbackMessage } from "../components/ui/FeedBackMessage.jsx";
import { Link } from "../components/ui/Link.jsx";
import { apiFetch } from "../lib/api.js";
import { clearAuth, getAuthToken } from "../lib/auth.js";
import { getProductoImageUrl } from "../lib/media.js";

export function Detalle() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [productoDetalle, setProductoDetalle] = useState(null);
	const [loadingProducto, setLoadingProducto] = useState(true);
	const [errorProducto, setErrorProducto] = useState("");
	const [mensajeCarrito, setMensajeCarrito] = useState("");

	const authToken = getAuthToken();

	useEffect(() => {
		async function cargarDetalleProducto() {
			setLoadingProducto(true);
			setErrorProducto("");

			try {
				const response = await apiFetch(`/api/productos/${id}`);
				setProductoDetalle(response.data || null);
			} catch (error) {
				setErrorProducto(error.message || "No se pudo cargar el producto");
			} finally {
				setLoadingProducto(false);
			}
		}

		cargarDetalleProducto();
	}, [id]);

	async function handleAddToCart() {
		if (!authToken) {
			navigate("/login");
			return;
		}

		if (!productoDetalle?._id) {
			setMensajeCarrito("Producto inválido");
			return;
		}

		setMensajeCarrito("");

		try {
			await apiFetch("/api/carrito/items", {
				method: "POST",
				body: { productoId: productoDetalle._id },
				token: authToken,
			});
			setMensajeCarrito("Producto añadido al carrito");
		} catch (error) {
			setMensajeCarrito(error.message || "No se pudo añadir el producto");
		}
	}

	function handleLogout() {
		clearAuth();
		navigate("/");
	}

	if (loadingProducto) {
		return (
			<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="flex-1 p-4">
					<div className="border border-(--color-border) p-4">
						<p className="text-xs font-bold uppercase">
							000100 SYSTEM-PROCESS-DIVISION
						</p>
						<div className="my-2 border-t border-dashed border-(--color-border)" />
						<p className="text-xs">
							[ ] LOADING PRODUCT-RECORD.................................
						</p>
					</div>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (errorProducto || !productoDetalle) {
		return (
			<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="flex-1 p-4">
					<div className="border border-(--color-border) p-4">
						<p className="text-xs font-bold uppercase">
							000100 EXCEPTION-HANDLER-DIVISION
						</p>
						<div className="my-2 border-t border-dashed border-(--color-border)" />
						<FeedbackMessage
							message={errorProducto || "Product record not found"}
							successMatch="__no_match__"
							className="text-xs"
						/>
						<div className="my-2 border-t border-dashed border-(--color-border)" />
						<Link
							to="/catalogo"
							variant="text"
							className="text-xs">
							[&lt;] RETURN-TO-CATALOG-INDEX
						</Link>
					</div>
				</main>
				<SiteFooter />
			</div>
		);
	}

	const imagenProducto = getProductoImageUrl(productoDetalle);

	return (
		<div className="font-mono flex min-h-screen flex-col bg-(--color-surface) text-(--color-black)">
			<SiteHeader
				authToken={authToken}
				onLogout={handleLogout}
			/>

			<main className="flex-1 p-4">
				{/* 000100 IDENTIFICATION-DIVISION */}
				<div className="border border-(--color-border) p-2">
					<p className="text-xs font-bold uppercase">
						000100 IDENTIFICATION-DIVISION
					</p>
					<p className="text-xs font-bold uppercase">
						000200 PRODUCT-DETAIL-MODULE........................ V1.0
					</p>
				</div>

				{/* 000300 NAV-CONTROL-SECTION */}
				<div className="-mt-px border border-(--color-border) px-4 py-2 flex items-center justify-between">
					<Link
						to="/catalogo"
						variant="plain"
						className="text-xs font-bold uppercase">
						[&lt;] RETURN-TO-CATALOG-INDEX
					</Link>
					<span className="text-xs">REF: PROD-{id}</span>
				</div>

				{/* 000400 MAIN-DATA-GRID */}
				<div className="-mt-px flex border border-(--color-border)">
					{/* 000500 IMAGE-DATA-SECTION */}
					<div className="w-1/2 border-r border-(--color-border) flex flex-col">
						<div className="border-b border-(--color-border) p-2">
							<p className="text-xs font-bold uppercase">
								000500 IMAGE-DATA-SECTION
							</p>
						</div>
						<div
							className="relative flex-1 bg-(--color-gray-light)"
							style={{ aspectRatio: "4/3" }}>
							{imagenProducto ? (
								<img
									src={imagenProducto}
									alt={productoDetalle.nombre}
									className="absolute inset-0 h-full w-full object-cover"
								/>
							) : (
								<div className="flex h-full items-center justify-center text-xs uppercase tracking-widest">
									[NO-IMAGE-DATA]
								</div>
							)}
						</div>
					</div>

					{/* 000600 PRODUCT-DATA-SECTION */}
					<div className="flex w-1/2 flex-col">
						<div className="border-b border-(--color-border) p-2">
							<p className="text-xs font-bold uppercase">
								000600 PRODUCT-DATA-SECTION
							</p>
						</div>

						{/* NOMBRE */}
						<div className="border-b border-dashed border-(--color-border) p-4">
							<p className="text-xs uppercase text-(--color-gray)">
								FIELD: NOMBRE-COMERCIAL
							</p>
							<p className="mt-1 text-base font-bold uppercase leading-tight">
								{productoDetalle.nombre}
							</p>
						</div>

						{/* DESCRIPCION */}
						<div className="border-b border-dashed border-(--color-border) p-4">
							<p className="text-xs uppercase text-(--color-gray)">
								FIELD: DESCRIPCION-PRODUCTO
							</p>
							<p className="mt-1 text-xs leading-relaxed">
								{productoDetalle.descripcion || "-- SIN DESCRIPCION --"}
							</p>
						</div>

						{/* MODELO + PRECIO */}
						<div className="border-b border-dashed border-(--color-border) flex">
							<div className="w-1/2 border-r border-dashed border-(--color-border) p-4">
								<p className="text-xs uppercase text-(--color-gray)">MODELO</p>
								<p className="mt-1 text-xs font-bold">
									{productoDetalle.modelo || "---"}
								</p>
							</div>
							<div className="w-1/2 p-4 flex flex-col">
								<p className="text-xs uppercase text-(--color-gray)">
									PRECIO-UNIT
								</p>
								<p className="mt-1 text-right text-xl font-bold">
									{new Intl.NumberFormat("es-ES", {
										style: "currency",
										currency: "EUR",
									}).format(productoDetalle.precio || 0)}
								</p>
							</div>
						</div>

						{/* STOCK STATUS */}
						<div className="border-b border-dashed border-(--color-border) p-4">
							<p className="text-xs uppercase text-(--color-gray)">
								STATUS: INVENTARIO-CONTROL
							</p>
							<p className="mt-1 text-xs font-bold uppercase">
								{productoDetalle.enStock
									? "[*] EN-STOCK............. DISPONIBLE"
									: "[X] SIN-STOCK............ AGOTADO"}
							</p>
						</div>

						{/* 000700 CART-ACTION-SECTION */}
						<div className="p-4 flex-1 flex flex-col justify-end">
							<p className="mb-2 text-xs font-bold uppercase">
								000700 CART-ACTION-SECTION
							</p>
							<Button
								onClick={handleAddToCart}
								disabled={!productoDetalle.enStock}
								className="w-full !rounded-none !bg-(--color-accent) !text-(--color-white) font-mono text-xs font-bold uppercase hover:!bg-(--color-highlight) hover:!text-(--color-black) border border-(--color-border) !transition-none">
								{productoDetalle.enStock
									? "[+] ADD-TO-CART"
									: "[X] OUT-OF-STOCK"}
							</Button>
							{mensajeCarrito ? (
								<FeedbackMessage
									message={mensajeCarrito}
									className="mt-2 text-xs"
								/>
							) : null}
						</div>
					</div>
				</div>

				{/* 000900 END-OF-RECORD */}
				<div className="-mt-px border border-(--color-border) p-2">
					<p className="text-xs font-bold uppercase">
						000900 END-OF-RECORD......................... STATUS: OK
					</p>
				</div>

				{/* BARCODE FOOTER */}
				<div className="-mt-px border border-(--color-border) px-4 pt-3 pb-2">
					<div className="flex h-10 items-stretch gap-px overflow-hidden">
						{[
							3, 1, 2, 4, 1, 3, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4,
							3, 1, 2, 1, 3, 4, 2, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 2,
							3, 4, 1, 2, 3, 1,
						].map((w, i) => (
							<div
								key={i}
								style={{ width: `${w * 3}px` }}
								className="bg-(--color-black)"
							/>
						))}
					</div>
					<p className="mt-1 text-center text-xs tracking-[0.4em]">*{id}*</p>
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
