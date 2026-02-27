import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { apiFetch } from "../lib/api";

export function Checkout() {
	const navigate = useNavigate();
	const [pedido, setPedido] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let cancelled = false;

		async function cargarUltimoPedido() {
			setLoading(true);
			setError("");

			try {
				const respuesta = await apiFetch("/api/pedidos/mis-pedidos", {
					method: "GET",
					auth: true,
				});

				// Tu controller devuelve: { status: "success", data: pedidos }
				const pedidos = respuesta?.data ?? respuesta;

				if (!Array.isArray(pedidos) || pedidos.length === 0) {
					throw new Error("No hay pedidos para mostrar");
				}

				// Asumimos que vienen ordenados por createdAt desc (si no, lo ordenas en backend)
				const ultimo = pedidos[0];

				if (!cancelled) setPedido(ultimo);
			} catch (e) {
				if (!cancelled) setError(e.message || "Error cargando el pedido");
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		cargarUltimoPedido();
		return () => {
			cancelled = true;
		};
	}, []);

	if (loading) {
		return (
			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
				<p>Cargando pedido...</p>
			</main>
		);
	}

	if (error) {
		return (
			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
				<p className="text-red-600">{error}</p>
				<div className="mt-4">
					<Button
						variant="outline"
						onClick={() => navigate("/")}>
						Volver al inicio
					</Button>
				</div>
			</main>
		);
	}

	const fecha = pedido?.createdAt
		? new Date(pedido.createdAt).toLocaleDateString("es-ES")
		: new Date().toLocaleDateString("es-ES");

	const total =
		typeof pedido?.total === "number" ? pedido.total.toFixed(2) : pedido?.total;

	return (
		<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
			<section className="space-y-8">
				<div className="text-center">
					<div className="mb-4 flex justify-center">
						<div className="rounded-full bg-green-100 p-4">
							<svg
								className="h-8 w-8 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
					</div>

					<h1 className="text-3xl font-bold text-gray-900">
						¡Pedido completado!
					</h1>
					<p className="mt-2 text-gray-600">Gracias por tu compra</p>
				</div>

				<div className="rounded-lg bg-gray-50 p-6">
					<h2 className="text-lg font-semibold text-gray-900">
						Detalles del pedido
					</h2>

					<div className="mt-4 space-y-2 text-sm text-gray-600">
						<p>
							<span className="font-medium">Número de pedido:</span> #
							{String(pedido?._id).slice(-6)}
						</p>

						<p>
							<span className="font-medium">Fecha:</span> {fecha}
						</p>

						<p>
							<span className="font-medium">Total:</span> {total} €
						</p>
					</div>

					{/* Opcional: lista de items */}
					{Array.isArray(pedido?.items) && pedido.items.length > 0 && (
						<div className="mt-6 space-y-2">
							<h3 className="text-sm font-semibold text-gray-900">Productos</h3>
							{pedido.items.map((it, idx) => (
								<div
									key={it.producto?._id || idx}
									className="flex justify-between text-sm text-gray-700">
									<span>{it.producto?.nombre || "Producto"}</span>
									<span>{it.precioUnitario} €</span>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="flex justify-center gap-4">
					<Button
						variant="outline"
						onClick={() => navigate("/")}>
						Volver al inicio
					</Button>
					<Button onClick={() => navigate("/mis-pedidos")}>
						Ver mis pedidos
					</Button>
				</div>
			</section>
		</main>
	);
}
