import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { apiFetch } from "../../lib/api.js";
import { clearAuth, getAuthToken } from "../../lib/auth.js";

function formatearPrecio(precio) {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(precio || 0);
}

function formatearFecha(fechaStr) {
	if (!fechaStr) return "—";
	return new Intl.DateTimeFormat("es-ES", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(fechaStr));
}

function obtenerClaveMes(fechaStr) {
	if (!fechaStr) return "Sin fecha";
	const fecha = new Date(fechaStr);
	if (Number.isNaN(fecha.getTime())) return "Sin fecha";
	return new Intl.DateTimeFormat("es-ES", {
		month: "short",
		year: "2-digit",
	}).format(fecha);
}

function GraficoDatos({ tipo = "bar", etiquetas, conjuntoDatos, titulo }) {
	const referenciaCanvas = useRef(null);

	useEffect(() => {
		if (!referenciaCanvas.current) return undefined;

		const grafico = new Chart(referenciaCanvas.current, {
			type: tipo,
			data: { labels: etiquetas, datasets: conjuntoDatos },
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						labels: {
							color: "#edf4ff",
							font: { family: "IBM Plex Mono" },
						},
					},
					title: {
						display: Boolean(titulo),
						text: titulo,
						color: "#ffe071",
						font: { family: "Oxanium", size: 13 },
					},
				},
				scales:
					tipo === "doughnut"
						? undefined
						: {
								x: {
									ticks: { color: "#8ca4c4" },
									grid: { color: "rgba(173, 226, 255, 0.12)" },
								},
								y: {
									beginAtZero: true,
									ticks: { color: "#8ca4c4" },
									grid: { color: "rgba(173, 226, 255, 0.12)" },
								},
							},
			},
		});

		return () => grafico.destroy();
	}, [conjuntoDatos, etiquetas, tipo, titulo]);

	return (
		<div className="h-72">
			<canvas ref={referenciaCanvas} />
		</div>
	);
}

function extraerListaDeRespuesta(respuesta) {
	const datosRespuesta = respuesta?.data;

	if (Array.isArray(datosRespuesta)) {
		return datosRespuesta;
	}

	if (Array.isArray(datosRespuesta?.usuarios)) {
		return datosRespuesta.usuarios;
	}

	if (Array.isArray(datosRespuesta?.pedidos)) {
		return datosRespuesta.pedidos;
	}

	if (Array.isArray(respuesta?.usuarios)) {
		return respuesta.usuarios;
	}

	if (Array.isArray(respuesta?.pedidos)) {
		return respuesta.pedidos;
	}

	return [];
}

export default function PanelAdministrador() {
	const navegar = useNavigate();
	const tokenAutenticacion = getAuthToken();
	const [usuarios, setUsuarios] = useState([]);
	const [pedidos, setPedidos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [mensajeError, setMensajeError] = useState("");

	useEffect(() => {
		async function cargarAdmin() {
			setCargando(true);
			setMensajeError("");

			const [respuestaUsuarios, respuestaPedidos] = await Promise.allSettled([
				apiFetch("/api/usuarios", { token: tokenAutenticacion }),
				apiFetch("/api/pedidos", { token: tokenAutenticacion }),
			]);

			if (respuestaUsuarios.status === "fulfilled") {
				setUsuarios(extraerListaDeRespuesta(respuestaUsuarios.value));
			}

			if (respuestaPedidos.status === "fulfilled") {
				setPedidos(extraerListaDeRespuesta(respuestaPedidos.value));
			}

			const errores = [respuestaUsuarios, respuestaPedidos]
				.filter((resultado) => resultado.status === "rejected")
				.map((resultado) => resultado.reason?.message)
				.filter(Boolean);

			if (errores.length) {
				setMensajeError(errores.join(" · "));
			}

			setCargando(false);
		}

		cargarAdmin();
	}, [tokenAutenticacion]);

	function cerrarSesion() {
		clearAuth();
		navegar("/");
	}

	const estadisticas = useMemo(() => {
		const ingresos = pedidos.reduce((acumulado, pedido) => acumulado + (pedido.total || 0), 0);
		const pendientes = pedidos.filter((pedido) => pedido.estado === "pendiente").length;
		const clientes = usuarios.filter((usuario) => {
			const rolUsuario = String(usuario.role || usuario.rol || "").toLowerCase();
			return rolUsuario !== "admin" && rolUsuario !== "administrador";
		}).length;

		return { ingresos, pendientes, clientes };
	}, [pedidos, usuarios]);

	const pedidosPorEstado = useMemo(() => {
		const estados = pedidos.reduce((acumulado, pedido) => {
			const estado = pedido.estado || "sin estado";
			acumulado[estado] = (acumulado[estado] || 0) + 1;
			return acumulado;
		}, {});

		return {
			etiquetas: Object.keys(estados),
			valores: Object.values(estados),
		};
	}, [pedidos]);

	const ventasPorMes = useMemo(() => {
		const meses = pedidos.reduce((acumulado, pedido) => {
			const claveMes = obtenerClaveMes(pedido.creadoEn || pedido.createdAt);
			acumulado[claveMes] = (acumulado[claveMes] || 0) + (pedido.total || 0);
			return acumulado;
		}, {});

		return {
			etiquetas: Object.keys(meses),
			valores: Object.values(meses),
		};
	}, [pedidos]);

	const usuariosRecientes = usuarios.slice(0, 6);
	const pedidosRecientes = pedidos
		.slice()
		.sort(
			(pedidoActual, pedidoSiguiente) =>
				new Date(pedidoSiguiente.creadoEn || pedidoSiguiente.createdAt || 0) -
				new Date(pedidoActual.creadoEn || pedidoActual.createdAt || 0),
		)
		.slice(0, 6);

	return (
		<div className="sl-page flex min-h-screen flex-col">
			<SiteHeader
				authToken={tokenAutenticacion}
				onLogout={cerrarSesion}
			/>

			<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:py-14">
				<section className="mb-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
					<div>
						<p className="sl-kicker">Panel de administrador</p>
						<h1 className="sl-display mt-4 text-4xl font-semibold text-(--color-black) md:text-6xl">
							Control operativo
						</h1>
						<p className="sl-copy mt-5 max-w-2xl text-sm md:text-base">
							Gestión de usuarios, pedidos, compras recientes y lectura rápida de actividad.
						</p>
					</div>
					<div className="sl-panel p-5">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							Acceso
						</p>
						<div className="mt-4 flex items-center justify-between border-b border-(--color-border) pb-4">
							<span className="sl-display text-sm font-semibold">Administrador</span>
							<span className="text-sm font-semibold text-(--color-signal)">Autorizado</span>
						</div>
						<p className="sl-copy mt-4 text-sm">
							{mensajeError
								? `Datos parciales: ${mensajeError}`
								: "Rutas protegidas por token y rol admin."}
						</p>
					</div>
				</section>

				<section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					<div className="sl-panel-soft p-4">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">Usuarios</p>
						<p className="sl-display mt-3 text-2xl font-semibold">{cargando ? "—" : usuarios.length}</p>
					</div>
					<div className="sl-panel-soft p-4">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">Clientes</p>
						<p className="sl-display mt-3 text-2xl font-semibold">
							{cargando ? "—" : estadisticas.clientes}
						</p>
					</div>
					<div className="sl-panel-soft p-4">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">Pedidos</p>
						<p className="sl-display mt-3 text-2xl font-semibold">{cargando ? "—" : pedidos.length}</p>
					</div>
					<div className="sl-panel-soft p-4">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">Ingresos</p>
						<p className="sl-display mt-3 text-xl font-semibold text-(--color-signal)">
							{cargando ? "—" : formatearPrecio(estadisticas.ingresos)}
						</p>
					</div>
				</section>

				<section className="grid gap-6 lg:grid-cols-2">
					<div className="sl-panel p-5">
						<p className="sl-kicker">Gráficos</p>
						<h2 className="sl-display mt-3 text-xl font-semibold">Ventas por mes</h2>
						<GraficoDatos
							etiquetas={ventasPorMes.etiquetas.length ? ventasPorMes.etiquetas : ["Sin datos"]}
							conjuntoDatos={[
								{
									label: "Ingresos",
									data: ventasPorMes.valores.length ? ventasPorMes.valores : [0],
									backgroundColor: "rgba(124, 247, 212, 0.48)",
									borderColor: "#7cf7d4",
									borderWidth: 1,
								},
							]}
						/>
					</div>

					<div className="sl-panel p-5">
						<p className="sl-kicker">Pedidos</p>
						<h2 className="sl-display mt-3 text-xl font-semibold">Estados</h2>
						<GraficoDatos
							tipo="doughnut"
							etiquetas={pedidosPorEstado.etiquetas.length ? pedidosPorEstado.etiquetas : ["Sin datos"]}
							conjuntoDatos={[
								{
									label: "Pedidos",
									data: pedidosPorEstado.valores.length ? pedidosPorEstado.valores : [1],
									backgroundColor: [
										"rgba(255, 224, 113, 0.72)",
										"rgba(124, 247, 212, 0.72)",
										"rgba(125, 214, 255, 0.72)",
										"rgba(255, 123, 123, 0.72)",
									],
									borderColor: "rgba(237, 244, 255, 0.26)",
								},
							]}
						/>
					</div>
				</section>

				<section className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
					<div className="sl-panel p-5">
						<div className="mb-4 flex items-center justify-between gap-4">
							<div>
								<p className="sl-kicker">Gestión de usuarios</p>
								<h2 className="sl-display mt-3 text-xl font-semibold">Usuarios recientes</h2>
							</div>
							<div className="sl-chip">USR</div>
						</div>
						<div className="space-y-3">
							{usuariosRecientes.length ? (
								usuariosRecientes.map((usuario, indice) => (
									<div
										key={usuario._id || usuario.id || usuario.email || indice}
										className="border-b border-(--color-border) pb-3 last:border-b-0 last:pb-0">
										<p className="sl-display text-sm font-semibold">
											{usuario.name || usuario.nombre || usuario.email || "Usuario"}
										</p>
										<p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-(--color-gray)">
											{usuario.email || "sin email"} · {usuario.role || usuario.rol || "cliente"}
										</p>
									</div>
								))
							) : (
								<p className="sl-copy text-sm">No hay usuarios disponibles.</p>
							)}
						</div>
					</div>

					<div className="sl-panel p-5">
						<div className="mb-4 flex items-center justify-between gap-4">
							<div>
								<p className="sl-kicker">Compras</p>
								<h2 className="sl-display mt-3 text-xl font-semibold">Pedidos recientes</h2>
							</div>
							<div className="sl-chip">{estadisticas.pendientes} pendientes</div>
						</div>
						<div className="space-y-3">
							{pedidosRecientes.length ? (
								pedidosRecientes.map((pedido, indice) => (
									<div
										key={pedido._id || pedido.id || indice}
										className="grid gap-2 border-b border-(--color-border) pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto]">
										<div>
											<p className="sl-display text-sm font-semibold">
												#{pedido._id?.slice(-8)?.toUpperCase() || pedido.id || "Pedido"}
											</p>
											<p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-(--color-gray)">
												{formatearFecha(pedido.creadoEn || pedido.createdAt)} · {pedido.estado || "sin estado"}
											</p>
										</div>
										<p className="text-sm font-semibold text-(--color-warning)">
											{formatearPrecio(pedido.total)}
										</p>
									</div>
								))
							) : (
								<p className="sl-copy text-sm">No hay pedidos disponibles.</p>
							)}
						</div>
					</div>
				</section>

				<section className="mt-6 grid gap-3 md:grid-cols-3">
					<Button onClick={() => navegar("/catalogo")}>Revisar catálogo</Button>
					<Button
						variant="secondary"
						onClick={() => navegar("/mis-pedidos")}>
						Ver mis pedidos
					</Button>
					<Button
						variant="secondary"
						onClick={cerrarSesion}
						className="border-[rgba(255,123,123,0.3)] text-(--color-error)">
						Cerrar sesión
					</Button>
				</section>
			</main>

			<SiteFooter />
		</div>
	);
}
