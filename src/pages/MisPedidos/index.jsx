import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { apiFetch } from "../../lib/api.js";
import { clearAuth, getAuthToken } from "../../lib/auth.js";

function formatPrice(precio) {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(precio || 0);
}

function formatFecha(fechaStr) {
	if (!fechaStr) return "—";
	return new Intl.DateTimeFormat("es-ES", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(fechaStr));
}

const ESTADO_CONFIG = {
	pendiente: {
		label: "Pendiente",
		color: "text-(--color-warning)",
		borderColor: "border-[rgba(255,224,113,0.45)]",
		bgColor: "bg-[rgba(255,224,113,0.08)]",
		codigo: "EST-01",
	},
	procesando: {
		label: "Procesando",
		color: "text-(--color-blue)",
		borderColor: "border-[rgba(100,180,255,0.45)]",
		bgColor: "bg-[rgba(100,180,255,0.08)]",
		codigo: "EST-02",
	},
	enviado: {
		label: "Enviado",
		color: "text-(--color-signal)",
		borderColor: "border-[rgba(124,247,212,0.45)]",
		bgColor: "bg-[rgba(124,247,212,0.08)]",
		codigo: "EST-03",
	},
	entregado: {
		label: "Entregado",
		color: "text-(--color-signal)",
		borderColor: "border-[rgba(124,247,212,0.55)]",
		bgColor: "bg-[rgba(124,247,212,0.12)]",
		codigo: "EST-04",
	},
	cancelado: {
		label: "Cancelado",
		color: "text-(--color-error)",
		borderColor: "border-[rgba(255,123,123,0.45)]",
		bgColor: "bg-[rgba(255,123,123,0.08)]",
		codigo: "EST-05",
	},
};

function EstadoBadge({ estado }) {
	const cfg = ESTADO_CONFIG[estado] || ESTADO_CONFIG["pendiente"];
	return (
		<span
			className={`inline-flex items-center gap-2 border px-3 py-1 text-[10px] uppercase tracking-[0.28em] font-semibold ${cfg.color} ${cfg.borderColor} ${cfg.bgColor}`}>
			{cfg.label}
		</span>
	);
}

function TarjetaPedido({ pedido }) {
	const [expandido, setExpandido] = useState(false);
	const cfg = ESTADO_CONFIG[pedido.estado] || ESTADO_CONFIG["pendiente"];
	const items = pedido.items || [];
	const totalProductos = items.reduce((acc, i) => acc + (i.cantidad || 0), 0);

	return (
		<article className={`sl-panel border-l-2 ${cfg.borderColor}`}>
			<div className="p-5">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div className="flex items-start gap-4">
						<div
							className={`flex h-11 w-11 shrink-0 items-center justify-center border text-[10px] font-semibold ${cfg.borderColor} ${cfg.bgColor} ${cfg.color}`}>
							{cfg.codigo}
						</div>
						<div className="min-w-0">
							<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
								Pedido #{pedido._id?.slice(-8)?.toUpperCase() || "—"}
							</p>
							<p className="sl-display mt-1 text-sm font-semibold text-(--color-black)">
								{formatFecha(pedido.creadoEn || pedido.createdAt)}
							</p>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<EstadoBadge estado={pedido.estado} />
						<span className="text-sm font-semibold text-(--color-warning)">
							{formatPrice(pedido.total)}
						</span>
						<Button
							onClick={() => setExpandido((v) => !v)}
							variant="secondary"
							className="min-h-0 border-0 bg-transparent px-0 py-0 text-[10px] tracking-[0.24em] text-(--color-gray) shadow-none hover:bg-transparent hover:text-(--color-signal)">
							{expandido
								? "Ocultar"
								: `Ver ${totalProductos} producto${totalProductos !== 1 ? "s" : ""}`}
						</Button>
					</div>
				</div>

				{pedido.entrega && (
					<p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-(--color-gray)">
						{pedido.entrega.metodo === "domicilio"
							? `Envío · ${pedido.entrega.direccion?.calle || ""} ${pedido.entrega.direccion?.numero || ""}, ${pedido.entrega.direccion?.ciudad || ""}`
							: `Recogida · ${pedido.entrega.puntoNombre || pedido.entrega.puntoId || ""}`}
					</p>
				)}
			</div>

			{expandido && items.length > 0 && (
				<div className="border-t border-(--color-border) px-5 pb-5 pt-4">
					<div className="space-y-3">
						{items.map((item, idx) => {
							const producto = item.producto || {};
							return (
								<div
									key={producto._id || idx}
									className="flex items-center justify-between gap-4 border-b border-white/6 pb-3 last:border-b-0 last:pb-0">
									<div>
										<p className="sl-display text-sm font-semibold text-(--color-black)">
											{producto.nombre || "Producto"}
										</p>
										<p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-(--color-gray)">
											Cantidad: {item.cantidad}
										</p>
									</div>
									<p className="text-sm font-semibold text-(--color-warning)">
										{formatPrice((producto.precio || 0) * (item.cantidad || 0))}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</article>
	);
}

function TelemetriaPedidos({ pedidos }) {
	const totalGastado = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);
	const enCurso = pedidos.filter(
		(p) => p.estado === "procesando" || p.estado === "enviado",
	).length;

	return (
		<div className="grid gap-3 sm:grid-cols-3">
			<div className="sl-panel-soft p-4">
				<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
					Pedidos totales
				</p>
				<p className="sl-display mt-3 text-2xl font-semibold">
					{pedidos.length}
				</p>
			</div>
			<div className="sl-panel-soft p-4">
				<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
					Gastado
				</p>
				<p className="sl-display mt-3 text-2xl font-semibold">
					{formatPrice(totalGastado)}
				</p>
			</div>
			<div className="sl-panel-soft p-4">
				<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
					En curso
				</p>
				<p className="sl-display mt-3 text-2xl font-semibold text-(--color-signal)">
					{enCurso}
				</p>
			</div>
		</div>
	);
}

export function MisPedidos() {
	const navigate = useNavigate();
	const authToken = getAuthToken();
	const [pedidos, setPedidos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!authToken) {
			navigate("/login");
			return;
		}

		async function cargarPedidos() {
			try {
				const respuesta = await apiFetch("/api/pedidos/mis-pedidos", {
					token: authToken,
				});
				setPedidos(respuesta.data || []);
			} catch (err) {
				setError(err.message || "No se pudieron cargar los pedidos");
			} finally {
				setLoading(false);
			}
		}

		cargarPedidos();
	}, [authToken, navigate]);

	function handleLogout() {
		clearAuth();
		navigate("/");
	}

	if (!authToken) return null;

	return (
		<div className="sl-page flex min-h-screen flex-col">
			<SiteHeader
				authToken={authToken}
				onLogout={handleLogout}
			/>

			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:py-14">
				<section className="mb-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
					<div>
						<p className="sl-kicker">Tu historial</p>
						<h1 className="sl-display mt-4 max-w-3xl text-4xl font-semibold text-(--color-black) md:text-6xl">
							Mis pedidos
						</h1>
						<p className="sl-copy mt-5 max-w-2xl text-sm md:text-base">
							Consulta el estado y el detalle de todos tus pedidos realizados en
							SilverLine.
						</p>
					</div>
					<div className="sl-panel p-5">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							Estado del sistema
						</p>
						<div className="mt-4 flex items-center justify-between border-b border-(--color-border) pb-4">
							<span className="sl-display text-sm font-semibold">
								Historial activo
							</span>
							<span className="text-sm font-semibold text-(--color-signal)">
								Listo
							</span>
						</div>
						<p className="sl-copy mt-4 text-sm">
							Los estados se actualizan en tiempo real conforme avanza tu
							pedido.
						</p>
					</div>
				</section>

				{loading ? (
					<div className="sl-panel w-full p-10 text-center">
						<p className="sl-kicker">Cargando</p>
						<h2 className="sl-display mt-4 text-2xl font-semibold">
							Recuperando tus pedidos
						</h2>
						<p className="sl-copy mt-3 text-sm">
							Estamos obteniendo tu historial de compras.
						</p>
					</div>
				) : error ? (
					<div className="sl-panel w-full p-10 text-center">
						<p className="sl-kicker">Aviso del sistema</p>
						<h2 className="sl-display mt-4 text-2xl font-semibold">
							No hemos podido cargar tus pedidos
						</h2>
						<p className="sl-copy mx-auto mt-3 max-w-md text-sm">{error}</p>
						<Button
							variant="secondary"
							onClick={() => navigate("/")}
							className="mt-8">
							Volver al inicio
						</Button>
					</div>
				) : pedidos.length === 0 ? (
					<div className="sl-panel w-full p-10 text-center">
						<p className="sl-kicker">Sin pedidos</p>
						<h2 className="sl-display mt-4 text-2xl font-semibold">
							Todavía no has realizado ningún pedido
						</h2>
						<p className="sl-copy mx-auto mt-3 max-w-md text-sm">
							Explora el catálogo y realiza tu primera compra.
						</p>
						<Button
							onClick={() => navigate("/catalogo")}
							className="mt-8">
							Ver catálogo
						</Button>
					</div>
				) : (
					<section className="space-y-6">
						<TelemetriaPedidos pedidos={pedidos} />
						<div className="space-y-4">
							{pedidos
								.slice()
								.sort(
									(a, b) =>
										new Date(b.creadoEn || b.createdAt || 0) -
										new Date(a.creadoEn || a.createdAt || 0),
								)
								.map((pedido, idx) => (
									<TarjetaPedido
										key={pedido._id || idx}
										pedido={pedido}
									/>
								))}
						</div>
					</section>
				)}
			</main>

			<SiteFooter />
		</div>
	);
}
