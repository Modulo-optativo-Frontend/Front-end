import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { useNavigate } from "react-router-dom";
import { clearAuth, getAuthToken, getAuthUser } from "../../lib/auth.js";
import { Button } from "../../components/ui/Button.jsx";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api.js";

// UTILIDAD: recibe una fecha en formato ISO y la devuelve formateada en español
// Ej: "2024-03-15T10:00:00Z" → "15 mar 2024"
// Pista: usa Intl.DateTimeFormat con locale "es-ES"
function formatFecha(fechaStr) {
	if (!fechaStr) return "—";
	return new Intl.DateTimeFormat("es-ES", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(fechaStr));
}

function renderDireccion(pedido) {
	if (!pedido.entrega) return null;
	if (pedido.entrega.metodo === "domicilio") {
		const d = pedido.entrega.direccion;
		return `${d?.calle} ${d?.numero}, ${d?.ciudad}`;
	}
	return `Recogida · ${pedido.entrega.puntoNombre}`;
}

export default function DashboardUser() {
	const navigate = useNavigate();
	const authToken = getAuthToken();
	const usuario = getAuthUser();

	// TODO: declarar el estado de pedidos (array vacío) y cargandoPedidos (true)

	//array
	const [pedidos, setPedidos] = useState([]);
	const [mensajeError, setMensajeError] = useState("");

	//bolean
	const [cargandoPedidos, setCargandoPedidos] = useState(true);
	// TODO: useEffect que llame a apiFetch("/api/pedidos/mis-pedidos", { token: authToken })
	useEffect(() => {
		async function cargarPedidos() {
			try {
				const res = await apiFetch("/api/pedidos/mis-pedidos", {
					token: authToken,
				});
				setPedidos(res.data || []);
			} catch (error) {
				setMensajeError(error.message);
			} finally {
				setCargandoPedidos(false);
			}
		}
		cargarPedidos();
	}, [authToken]);
	//       y guarde el resultado en el estado de pedidos
	//       cuando termine (con éxito o error) desactiva cargandoPedidos

	// TODO: calcular ultimoPedido (primer elemento del array) y totalPedidos (length)

	function handleLogout() {
		clearAuth();
		navigate("/");
	}

	// TODO: si no hay authToken, no renderizar nada (return null)

	return (
		<div className="sl-page flex min-h-screen flex-col">
			<SiteHeader
				authToken={authToken}
				onLogout={handleLogout}
			/>

			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:py-14">
				{/* Cabecera de la página */}
				<section className="mb-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
					<div>
						<p className="sl-kicker">Panel de usuario</p>
						<h1 className="sl-display mt-4 text-4xl font-semibold text-(--color-black) md:text-6xl">
							Mi cuenta
						</h1>
						<p className="sl-copy mt-5 max-w-2xl text-sm md:text-base">
							Gestiona tus datos, revisa tus pedidos y controla tu actividad en
							SilverLine.
						</p>
					</div>
					<div className="sl-panel p-5">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							Estado de la cuenta
						</p>
						<div className="mt-4 flex items-center justify-between border-b border-(--color-border) pb-4">
							<span className="sl-display text-sm font-semibold">
								Cuenta activa
							</span>
							<span className="text-sm font-semibold text-(--color-signal)">
								Verificada
							</span>
						</div>
						<p className="sl-copy mt-4 text-sm">
							{mensajeError ? mensajeError : ""}
						</p>
					</div>
				</section>

				{/* Telemetría rápida */}
				<section className="mb-6 grid gap-3 sm:grid-cols-3">
					<div className="sl-panel-soft p-4">
						{/* TODO: mostrar "—" si cargandoPedidos, si no mostrar totalPedidos */}
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							—
						</p>
						<p className="sl-display mt-3 text-2xl font-semibold">
							Total pedidos
						</p>
					</div>
					<div className="sl-panel-soft p-4">
						{/* TODO: mostrar "—" si cargandoPedidos,
						         la fecha del ultimoPedido si existe,
						         o "Sin pedidos" si el array está vacío */}
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							—
						</p>
						<p className="sl-display mt-3 text-xl font-semibold">
							{renderDireccion(pedidos[0])}
						</p>
					</div>
					<div className="sl-panel-soft p-4">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							Estado
						</p>
						<p className="sl-display mt-3 text-xl font-semibold text-(--color-signal)">
							Activo
						</p>
					</div>
				</section>

				<div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
					{/* Datos personales */}
					<section className="space-y-4">
						<div className="flex items-center justify-between">
							<p className="sl-kicker">Datos personales</p>
							<div className="sl-chip">USR-01</div>
						</div>

						<div className="sl-panel p-5">
							<div className="space-y-5">
								<div className="border-b border-(--color-border) pb-5">
									{/* TODO: mostrar usuario?.email */}
									<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
										—
									</p>
									<p className="sl-display mt-2 text-base font-semibold">
										{usuario?.email}
									</p>
								</div>
								<div className="border-b border-(--color-border) pb-5">
									{/* TODO: mostrar la fecha de creación con formatFecha(usuario?.createdAt) */}
									<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
										—
									</p>
									<p className="sl-display mt-2 text-base font-semibold">
										{formatFecha(usuario?.createdAt)}{" "}
									</p>
								</div>
								<div>
									<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
										Dirección principal
									</p>
									<p className="sl-copy mt-2 text-sm">Sin dirección guardada</p>
								</div>
							</div>
						</div>
					</section>

					{/* Accesos rápidos */}
					<section className="space-y-4">
						<div className="flex items-center justify-between">
							<p className="sl-kicker">Accesos rápidos</p>
							<div className="sl-chip">NAV-02</div>
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="sl-panel p-4">
								<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
									[P-01]
								</p>
								<p className="sl-display mt-3 text-base font-semibold">
									Mis pedidos
								</p>
								<p className="sl-copy mt-2 text-sm">
									Consulta el historial y estado de tus compras.
								</p>
								<Button
									onClick={() => navigate("/mis-pedidos")}
									className="mt-4 w-full">
									Ver pedidos
								</Button>
							</div>

							<div className="sl-panel p-4">
								<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
									[C-02]
								</p>
								<p className="sl-display mt-3 text-base font-semibold">
									Catálogo
								</p>
								<p className="sl-copy mt-2 text-sm">
									Explora todos los productos disponibles en la tienda.
								</p>
								<Button
									onClick={() => navigate("/catalogo")}
									className="mt-4 w-full">
									Ver catálogo
								</Button>
							</div>

							<div className="sl-panel p-4">
								<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
									[K-03]
								</p>
								<p className="sl-display mt-3 text-base font-semibold">
									Mi carrito
								</p>
								<p className="sl-copy mt-2 text-sm">
									Revisa los artículos pendientes de compra.
								</p>
								<Button
									onClick={() => navigate("/carrito")}
									className="mt-4 w-full">
									Ver carrito
								</Button>
							</div>

							<div className="sl-panel p-4">
								<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
									[S-04]
								</p>
								<p className="sl-display mt-3 text-base font-semibold">
									Sesión
								</p>
								<p className="sl-copy mt-2 text-sm">
									Cierra tu sesión actual en SilverLine.
								</p>
								<Button
									variant="secondary"
									onClick={handleLogout}
									className="mt-4 w-full border-[rgba(255,123,123,0.3)] text-(--color-error)">
									Cerrar sesión
								</Button>
							</div>
						</div>
					</section>
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
