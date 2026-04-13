import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../components/layout/SiteFooter.jsx";
import { Button } from "../components/ui/Button.jsx";
import { apiFetch } from "../lib/api.js";
import { clearAuth, getAuthToken } from "../lib/auth.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(precio) {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(precio || 0);
}

function formatNumeroTarjeta(valor) {
	const soloDigitos = valor.replace(/\D/g, "").slice(0, 16);
	return soloDigitos.replace(/(.{4})/g, "$1 ").trim();
}

function formatFechaExpiracion(valor) {
	const soloDigitos = valor.replace(/\D/g, "").slice(0, 4);
	if (soloDigitos.length >= 3) {
		return soloDigitos.slice(0, 2) + "/" + soloDigitos.slice(2);
	}
	return soloDigitos;
}

// ─── Datos estáticos ──────────────────────────────────────────────────────────

const PUNTOS_RECOGIDA = [
	{
		id: "madrid-centro",
		nombre: "SilverLine Madrid Centro",
		direccion: "Calle Gran Vía, 48, Madrid",
		horario: "Lun–Sáb 10:00–20:00",
	},
	{
		id: "barcelona-gracia",
		nombre: "SilverLine Barcelona Gràcia",
		direccion: "Carrer de Verdi, 12, Barcelona",
		horario: "Lun–Sáb 10:00–20:00",
	},
	{
		id: "valencia-centro",
		nombre: "SilverLine Valencia Centro",
		direccion: "Calle Colón, 28, Valencia",
		horario: "Lun–Sáb 10:00–20:00",
	},
];

const PASOS_CHECKOUT = [
	{ numero: 1, label: "Entrega" },
	{ numero: 2, label: "Pago" },
	{ numero: 3, label: "Resumen" },
];

// ─── Indicador de pasos ───────────────────────────────────────────────────────

function IndicadorPasos({ pasoActual }) {
	return (
		<div className="font-mono flex items-center border border-(--color-border)">
			{PASOS_CHECKOUT.map((paso, idx) => {
				const esActual = paso.numero === pasoActual;
				const esCompletado = paso.numero < pasoActual;
				const esUltimo = idx === PASOS_CHECKOUT.length - 1;

				return (
					<div
						key={paso.numero}
						className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase ${esUltimo ? "" : "border-r border-(--color-border)"} ${esCompletado ? "bg-(--color-black) text-(--color-white)" : esActual ? "bg-(--color-gray-light) text-(--color-black)" : "bg-(--color-surface) text-(--color-gray)"}`}>
						<span>{esCompletado ? "[OK]" : `[${paso.numero}]`}</span>
						<span>{paso.label.toUpperCase()}</span>
					</div>
				);
			})}
		</div>
	);
}

// ─── Paso 1: Entrega ──────────────────────────────────────────────────────────

function PasoEntrega({
	metodoEntrega,
	setMetodoEntrega,
	direccionEnvio,
	setDireccionEnvio,
	puntoRecogidaSeleccionado,
	setPuntoRecogidaSeleccionado,
	errorEntrega,
	onSiguiente,
}) {
	function handleCampoDireccion(campo, valor) {
		setDireccionEnvio((prev) => ({ ...prev, [campo]: valor }));
	}

	return (
		<div className="font-mono space-y-0">
			<div className="border-b border-(--color-border) p-3">
				<p className="text-xs font-bold uppercase">
					000500 DELIVERY-INPUT-SECTION
				</p>
			</div>

			{/* METHOD SELECTOR */}
			<div className="flex border-b border-(--color-border)">
				<button
					type="button"
					onClick={() => setMetodoEntrega("domicilio")}
					className={`flex-1 border-r border-(--color-border) px-4 py-3 text-left text-xs font-bold uppercase ${metodoEntrega === "domicilio" ? "bg-(--color-black) text-(--color-white)" : "bg-(--color-surface) text-(--color-black) hover:bg-(--color-gray-light)"}`}>
					[H] ENVIO-A-DOMICILIO
				</button>
				<button
					type="button"
					onClick={() => setMetodoEntrega("recogida")}
					className={`flex-1 px-4 py-3 text-left text-xs font-bold uppercase ${metodoEntrega === "recogida" ? "bg-(--color-black) text-(--color-white)" : "bg-(--color-surface) text-(--color-black) hover:bg-(--color-gray-light)"}`}>
					[P] PUNTO-DE-RECOGIDA
				</button>
			</div>

			{metodoEntrega === "domicilio" && (
				<div className="border-b border-(--color-border) p-4 space-y-3">
					<p className="text-xs font-bold uppercase">
						FIELD-GROUP: DIRECCION-ENVIO
					</p>
					<div className="grid grid-cols-3 gap-2">
						<div className="col-span-2">
							<label className="mb-1 block text-[10px] font-bold uppercase">
								CALLE *
							</label>
							<input
								type="text"
								value={direccionEnvio.calle}
								onChange={(e) => handleCampoDireccion("calle", e.target.value)}
								placeholder="CALLE GRAN VIA"
								className="w-full border border-(--color-border) bg-(--color-surface) px-3 py-2 font-mono text-xs uppercase focus:outline-none focus:bg-(--color-gray-light)"
							/>
						</div>
						<div>
							<label className="mb-1 block text-[10px] font-bold uppercase">
								NUMERO
							</label>
							<input
								type="text"
								value={direccionEnvio.numero}
								onChange={(e) => handleCampoDireccion("numero", e.target.value)}
								placeholder="48"
								className="w-full border border-(--color-border) bg-(--color-surface) px-3 py-2 font-mono text-xs uppercase focus:outline-none focus:bg-(--color-gray-light)"
							/>
						</div>
					</div>
					<div>
						<label className="mb-1 block text-[10px] font-bold uppercase">
							PISO/PUERTA
						</label>
						<input
							type="text"
							value={direccionEnvio.piso}
							onChange={(e) => handleCampoDireccion("piso", e.target.value)}
							placeholder="2A (OPCIONAL)"
							className="w-full border border-(--color-border) bg-(--color-surface) px-3 py-2 font-mono text-xs uppercase focus:outline-none focus:bg-(--color-gray-light)"
						/>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>
							<label className="mb-1 block text-[10px] font-bold uppercase">
								CIUDAD *
							</label>
							<input
								type="text"
								value={direccionEnvio.ciudad}
								onChange={(e) => handleCampoDireccion("ciudad", e.target.value)}
								placeholder="MADRID"
								className="w-full border border-(--color-border) bg-(--color-surface) px-3 py-2 font-mono text-xs uppercase focus:outline-none focus:bg-(--color-gray-light)"
							/>
						</div>
						<div>
							<label className="mb-1 block text-[10px] font-bold uppercase">
								COD-POSTAL *
							</label>
							<input
								type="text"
								inputMode="numeric"
								value={direccionEnvio.codigoPostal}
								onChange={(e) =>
									handleCampoDireccion(
										"codigoPostal",
										e.target.value.replace(/\D/g, "").slice(0, 5),
									)
								}
								placeholder="28013"
								className="w-full border border-(--color-border) bg-(--color-surface) px-3 py-2 font-mono text-xs focus:outline-none focus:bg-(--color-gray-light)"
							/>
						</div>
					</div>
				</div>
			)}

			{metodoEntrega === "recogida" && (
				<div className="border-b border-(--color-border) p-4 space-y-2">
					<p className="text-xs font-bold uppercase">
						FIELD-GROUP: PUNTO-RECOGIDA-SELECTOR
					</p>
					{PUNTOS_RECOGIDA.map((punto) => (
						<button
							key={punto.id}
							type="button"
							onClick={() => setPuntoRecogidaSeleccionado(punto.id)}
							className={`w-full border p-3 text-left text-xs uppercase ${puntoRecogidaSeleccionado === punto.id ? "border-(--color-border) bg-(--color-black) text-(--color-white)" : "border-(--color-border) bg-(--color-surface) text-(--color-black) hover:bg-(--color-gray-light)"}`}>
							<p className="font-bold">[*] {punto.nombre}</p>
							<p className="opacity-80">{punto.direccion}</p>
							<p className="opacity-60">{punto.horario}</p>
						</button>
					))}
				</div>
			)}

			{errorEntrega && (
				<div className="border-b border-dashed border-(--color-border) p-3">
					<p className="text-xs font-bold uppercase">
						[!] FAULT: {errorEntrega}
					</p>
				</div>
			)}

			<div className="p-4">
				<Button
					onClick={onSiguiente}
					className="w-full">
					[&gt;] CONTINUAR-CON-EL-PAGO
				</Button>
			</div>
		</div>
	);
}

// ─── Paso 2: Pago ─────────────────────────────────────────────────────────────

function PasoPago({
	datosTarjeta,
	setDatosTarjeta,
	errorPago,
	onSiguiente,
	onAnterior,
}) {
	function handleCampoTarjeta(campo, valor) {
		setDatosTarjeta((prev) => ({ ...prev, [campo]: valor }));
	}

	const numeroTarjetaFormateado = formatNumeroTarjeta(
		datosTarjeta.numeroTarjeta,
	);

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-black">Datos de pago</h2>

			<div className="space-y-4">
				<div>
					<label className="mb-1 block text-xs text-(--color-gray-dark)">
						Nombre en la tarjeta *
					</label>
					<input
						type="text"
						value={datosTarjeta.nombreTitular}
						onChange={(e) =>
							handleCampoTarjeta("nombreTitular", e.target.value)
						}
						placeholder="NOMBRE APELLIDO"
						className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm uppercase"
					/>
				</div>

				<div>
					<label className="mb-1 block text-xs text-(--color-gray-dark)">
						Número de tarjeta *
					</label>
					<input
						type="text"
						inputMode="numeric"
						value={numeroTarjetaFormateado}
						onChange={(e) =>
							handleCampoTarjeta(
								"numeroTarjeta",
								e.target.value.replace(/\s/g, ""),
							)
						}
						placeholder="0000 0000 0000 0000"
						className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm font-mono tracking-widest"
					/>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div>
						<label className="mb-1 block text-xs text-(--color-gray-dark)">
							Fecha de expiración *
						</label>
						<input
							type="text"
							inputMode="numeric"
							value={datosTarjeta.fechaExpiracion}
							onChange={(e) =>
								handleCampoTarjeta(
									"fechaExpiracion",
									formatFechaExpiracion(e.target.value),
								)
							}
							placeholder="MM/AA"
							maxLength={5}
							className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm"
						/>
					</div>
					<div>
						<label className="mb-1 block text-xs text-(--color-gray-dark)">
							CVV *
						</label>
						<input
							type="password"
							inputMode="numeric"
							value={datosTarjeta.cvv}
							onChange={(e) =>
								handleCampoTarjeta(
									"cvv",
									e.target.value.replace(/\D/g, "").slice(0, 4),
								)
							}
							placeholder="•••"
							className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm"
						/>
					</div>
				</div>
			</div>

			<p className="flex items-center gap-2 text-xs text-(--color-gray)">
				Tus datos están protegidos con cifrado SSL
			</p>

			{errorPago && <p className="text-sm text-(--color-error)">{errorPago}</p>}

			<div className="flex gap-3">
				<Button
					variant="secondary"
					onClick={onAnterior}
					className="flex-1">
					Volver
				</Button>
				<Button
					onClick={onSiguiente}
					className="flex-1">
					Ver resumen
				</Button>
			</div>
		</div>
	);
}

// ─── Paso 3: Resumen ──────────────────────────────────────────────────────────

function PasoResumen({
	itemsCarrito,
	totalCarrito,
	metodoEntrega,
	direccionEnvio,
	puntoRecogidaSeleccionado,
	realizandoPedido,
	errorCheckout,
	onConfirmar,
	onAnterior,
}) {
	const puntoRecogida = PUNTOS_RECOGIDA.find(
		(p) => p.id === puntoRecogidaSeleccionado,
	);

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-black">Resumen del pedido</h2>

			<div className="space-y-3 rounded-xl border border-(--color-border) p-4">
				<h3 className="text-sm font-semibold text-black">Productos</h3>
				{itemsCarrito.map((item, idx) => {
					const producto = item.producto || {};
					return (
						<div
							key={producto._id || idx}
							className="flex justify-between text-sm">
							<span className="text-black">
								{producto.nombre || "Producto"} × {item.cantidad}
							</span>
							<span className="font-medium text-black">
								{formatPrice((producto.precio || 0) * item.cantidad)}
							</span>
						</div>
					);
				})}
				<div className="flex justify-between border-t border-(--color-border) pt-3">
					<span className="font-semibold text-black">Total</span>
					<span className="font-semibold text-black">
						{formatPrice(totalCarrito)}
					</span>
				</div>
			</div>

			<div className="space-y-1 rounded-xl border border-(--color-border) p-4">
				<h3 className="text-sm font-semibold text-black">Entrega</h3>
				{metodoEntrega === "domicilio" ? (
					<p className="text-sm text-(--color-gray)">
						{direccionEnvio.calle} {direccionEnvio.numero}
						{direccionEnvio.piso ? `, ${direccionEnvio.piso}` : ""},{" "}
						{direccionEnvio.ciudad} {direccionEnvio.codigoPostal}
					</p>
				) : (
					<p className="text-sm text-(--color-gray)">
						{puntoRecogida?.nombre} — {puntoRecogida?.direccion}
					</p>
				)}
			</div>

			<div className="space-y-1 rounded-xl border border-(--color-border) p-4">
				<h3 className="text-sm font-semibold text-black">Pago</h3>
				<p className="text-sm text-(--color-gray)">
					Tarjeta de crédito/débito •••• ••••
				</p>
			</div>

			{errorCheckout && (
				<p className="text-sm text-(--color-error)">{errorCheckout}</p>
			)}

			<div className="flex gap-3">
				<Button
					variant="secondary"
					onClick={onAnterior}
					className="flex-1">
					← Volver
				</Button>
				<Button
					onClick={onConfirmar}
					disabled={realizandoPedido}
					className="flex-1">
					{realizandoPedido ? "Procesando..." : "Confirmar pedido"}
				</Button>
			</div>
		</div>
	);
}

// ─── Paso 4: Completado ───────────────────────────────────────────────────────

function PasoCompletado({ pedido, onIrInicio }) {
	const fecha = pedido?.createdAt
		? new Date(pedido.createdAt).toLocaleDateString("es-ES")
		: new Date().toLocaleDateString("es-ES");

	return (
		<div className="space-y-6 text-center">
			<div className="flex justify-center">
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
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

			<div>
				<h2 className="text-2xl font-semibold text-black">
					¡Pedido confirmado!
				</h2>
				<p className="mt-1 text-sm text-(--color-gray)">
					Recibirás una confirmación en tu email
				</p>
			</div>

			<div className="space-y-2 rounded-xl border border-(--color-border) p-4 text-left">
				<p className="text-sm">
					<span className="font-medium">Número de pedido:</span>{" "}
					{String(pedido?.orderId || pedido?._id || "")}
				</p>
				<p className="text-sm">
					<span className="font-medium">Fecha:</span> {fecha}
				</p>
				{typeof pedido?.total === "number" && (
					<p className="text-sm">
						<span className="font-medium">Total:</span>{" "}
						{formatPrice(pedido.total)}
					</p>
				)}
			</div>

			<Button
				onClick={onIrInicio}
				className="w-full">
				Volver al inicio
			</Button>
		</div>
	);
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function Checkout() {
	const navigate = useNavigate();
	const authToken = getAuthToken();

	// Paso actual: 1 = entrega, 2 = pago, 3 = resumen, 4 = completado
	const [pasoActual, setPasoActual] = useState(1);

	// Items del carrito para el resumen y cálculo del total
	const [itemsCarrito, setItemsCarrito] = useState([]);
	const [loadingCarrito, setLoadingCarrito] = useState(true);
	const [errorInicialCarrito, setErrorInicialCarrito] = useState("");

	// Datos del paso 1 — entrega
	const [metodoEntrega, setMetodoEntrega] = useState("domicilio");
	const [direccionEnvio, setDireccionEnvio] = useState({
		calle: "",
		numero: "",
		piso: "",
		ciudad: "",
		codigoPostal: "",
	});
	const [puntoRecogidaSeleccionado, setPuntoRecogidaSeleccionado] =
		useState("");
	const [errorEntrega, setErrorEntrega] = useState("");

	// Datos del paso 2 — pago
	const [datosTarjeta, setDatosTarjeta] = useState({
		nombreTitular: "",
		numeroTarjeta: "",
		fechaExpiracion: "",
		cvv: "",
	});
	const [errorPago, setErrorPago] = useState("");

	// Estado del paso 3 — confirmación
	const [realizandoPedido, setRealizandoPedido] = useState(false);
	const [errorCheckout, setErrorCheckout] = useState("");
	const [pedidoCompletado, setPedidoCompletado] = useState(null);

	// Cargamos el carrito al montar para mostrarlo en el resumen
	useEffect(() => {
		if (!authToken) {
			navigate("/login");
			return;
		}

		async function cargarCarrito() {
			try {
				const respuesta = await apiFetch("/api/carrito", { token: authToken });
				const items = respuesta.items || [];
				if (items.length === 0) {
					navigate("/carrito");
					return;
				}
				setItemsCarrito(items);
			} catch (error) {
				setErrorInicialCarrito(error.message || "No se pudo cargar el carrito");
			} finally {
				setLoadingCarrito(false);
			}
		}

		cargarCarrito();
	}, [authToken, navigate]);

	const totalCarrito = itemsCarrito.reduce((total, item) => {
		return total + (item.producto?.precio || 0) * (item.cantidad || 0);
	}, 0);

	// ── Validaciones por paso ───────────────────────────────────────────────

	function validarEntrega() {
		if (metodoEntrega === "domicilio") {
			if (
				!direccionEnvio.calle ||
				!direccionEnvio.ciudad ||
				!direccionEnvio.codigoPostal
			) {
				setErrorEntrega("Calle, ciudad y código postal son obligatorios");
				return false;
			}
		} else {
			if (!puntoRecogidaSeleccionado) {
				setErrorEntrega("Selecciona un punto de recogida");
				return false;
			}
		}
		setErrorEntrega("");
		return true;
	}

	function validarPago() {
		const { nombreTitular, numeroTarjeta, fechaExpiracion, cvv } = datosTarjeta;
		if (!nombreTitular || !numeroTarjeta || !fechaExpiracion || !cvv) {
			setErrorPago("Todos los campos de pago son obligatorios");
			return false;
		}
		if (numeroTarjeta.replace(/\s/g, "").length < 16) {
			setErrorPago("El número de tarjeta debe tener 16 dígitos");
			return false;
		}
		if (cvv.length < 3) {
			setErrorPago("El CVV debe tener al menos 3 dígitos");
			return false;
		}
		setErrorPago("");
		return true;
	}

	function irAlSiguientePaso() {
		if (pasoActual === 1 && validarEntrega()) setPasoActual(2);
		if (pasoActual === 2 && validarPago()) setPasoActual(3);
	}

	function irAlPasoAnterior() {
		if (pasoActual > 1) setPasoActual(pasoActual - 1);
	}

	async function confirmarPedido() {
		setRealizandoPedido(true);
		setErrorCheckout("");

		try {
			const bodyPedido =
				metodoEntrega === "domicilio"
					? { metodoEntrega, direccion: direccionEnvio }
					: { metodoEntrega, puntoRecogida: puntoRecogidaSeleccionado };

			const respuesta = await apiFetch("/api/pedidos/checkout", {
				method: "POST",
				token: authToken,
				body: bodyPedido,
			});

			const pedido = respuesta?.data ?? respuesta;
			setPedidoCompletado(pedido);
			setPasoActual(4);
		} catch (error) {
			setErrorCheckout(error.message || "No se pudo procesar el pedido");
		} finally {
			setRealizandoPedido(false);
		}
	}

	function handleLogout() {
		clearAuth();
		navigate("/");
	}

	// ── Renders condicionales ───────────────────────────────────────────────

	if (!authToken) return null;

	if (loadingCarrito) {
		return (
			<div className="flex min-h-screen flex-col bg-white">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
					<p className="text-sm text-(--color-gray)">Cargando carrito...</p>
				</main>
				<SiteFooter />
			</div>
		);
	}

	if (errorInicialCarrito) {
		return (
			<div className="flex min-h-screen flex-col bg-white">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
					<p className="text-sm text-(--color-error)">{errorInicialCarrito}</p>
					<Button
						variant="secondary"
						onClick={() => navigate("/carrito")}
						className="mt-4">
						Volver al carrito
					</Button>
				</main>
				<SiteFooter />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col bg-white">
			<SiteHeader
				authToken={authToken}
				onLogout={handleLogout}
			/>

			<main className="mx-auto w-full max-w-lg flex-1 px-4 py-10">
				<h1 className="mb-8 text-3xl font-semibold text-black">Checkout</h1>

				{pasoActual < 4 && (
					<div className="mb-8">
						<IndicadorPasos pasoActual={pasoActual} />
					</div>
				)}

				<div className="rounded-2xl border border-(--color-border) bg-white p-6">
					{pasoActual === 1 && (
						<PasoEntrega
							metodoEntrega={metodoEntrega}
							setMetodoEntrega={setMetodoEntrega}
							direccionEnvio={direccionEnvio}
							setDireccionEnvio={setDireccionEnvio}
							puntoRecogidaSeleccionado={puntoRecogidaSeleccionado}
							setPuntoRecogidaSeleccionado={setPuntoRecogidaSeleccionado}
							errorEntrega={errorEntrega}
							onSiguiente={irAlSiguientePaso}
						/>
					)}

					{pasoActual === 2 && (
						<PasoPago
							datosTarjeta={datosTarjeta}
							setDatosTarjeta={setDatosTarjeta}
							errorPago={errorPago}
							onSiguiente={irAlSiguientePaso}
							onAnterior={irAlPasoAnterior}
						/>
					)}

					{pasoActual === 3 && (
						<PasoResumen
							itemsCarrito={itemsCarrito}
							totalCarrito={totalCarrito}
							metodoEntrega={metodoEntrega}
							direccionEnvio={direccionEnvio}
							puntoRecogidaSeleccionado={puntoRecogidaSeleccionado}
							realizandoPedido={realizandoPedido}
							errorCheckout={errorCheckout}
							onConfirmar={confirmarPedido}
							onAnterior={irAlPasoAnterior}
						/>
					)}

					{pasoActual === 4 && (
						<PasoCompletado
							pedido={pedidoCompletado}
							onIrInicio={() => navigate("/")}
						/>
					)}
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
