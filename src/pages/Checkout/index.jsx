import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { FeedbackMessage } from "../../components/ui/FeedBackMessage.jsx";
import { apiFetch } from "../../lib/api.js";
import { clearAuth, getAuthToken } from "../../lib/auth.js";

function formatPrice(precio) {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(precio || 0);
}

const PUNTOS_RECOGIDA = [
	{
		id: "madrid-centro",
		nombre: "SilverLine Madrid Centro",
		direccion: "Calle Gran Vía, 48, Madrid",
		horario: "Lun-Sáb 10:00-20:00",
	},
	{
		id: "barcelona-gracia",
		nombre: "SilverLine Barcelona Gracia",
		direccion: "Carrer de Verdi, 12, Barcelona",
		horario: "Lun-Sáb 10:00-20:00",
	},
	{
		id: "valencia-centro",
		nombre: "SilverLine Valencia Centro",
		direccion: "Calle Colon, 28, Valencia",
		horario: "Lun-Sáb 10:00-20:00",
	},
];

const PASOS_CHECKOUT = [
	{
		numero: 1,
		etiqueta: "Entrega",
		codigo: "STEP-01",
	},
	{
		numero: 2,
		etiqueta: "Resumen",
		codigo: "STEP-02",
	},
];

function IndicadorPasos({ pasoActual }) {
	return (
		<div className="grid gap-3 md:grid-cols-2">
			{PASOS_CHECKOUT.map((paso) => {
				const esActual = paso.numero === pasoActual;
				const esCompletado = paso.numero < pasoActual;

				return (
					<div
						key={paso.numero}
						className={`sl-panel flex items-center gap-4 px-4 py-4 ${esActual ? "border-[rgba(124,247,212,0.6)]" : ""}`}>
						<div
							className={`flex h-11 w-11 items-center justify-center border text-sm font-semibold ${esCompletado ? "border-[rgba(124,247,212,0.55)] bg-[rgba(124,247,212,0.16)] text-(--color-signal)" : esActual ? "border-[rgba(255,224,113,0.55)] bg-[rgba(255,107,61,0.16)] text-(--color-warning)" : "border-(--color-border) bg-white/5 text-(--color-gray)"}`}>
							{esCompletado ? "OK" : `0${paso.numero}`}
						</div>
						<div className="min-w-0">
							<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
								{paso.codigo}
							</p>
							<p className="sl-display text-sm font-semibold text-(--color-black)">
								{paso.etiqueta}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

function Campo({ label, id, children }) {
	return (
		<div>
			<label
				htmlFor={id}
				className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-(--color-gray)">
				{label}
			</label>
			{children}
		</div>
	);
}

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
		<div className="space-y-6">
			<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="sl-kicker">Paso 01</p>
					<h2 className="sl-display mt-3 text-2xl font-semibold text-(--color-black)">
						Configura la entrega
					</h2>
				</div>
				<div className="sl-chip">Datos de entrega</div>
			</div>

			<div className="grid gap-3 md:grid-cols-2">
				<Button
					variant="secondary"
					onClick={() => setMetodoEntrega("domicilio")}
					className={`sl-panel block min-h-0 w-full p-4 text-left normal-case tracking-normal ${metodoEntrega === "domicilio" ? "border-[rgba(124,247,212,0.55)]" : ""}`}>
					<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
						[D-01]
					</p>
					<p className="sl-display mt-3 text-lg font-semibold">
						Envío a domicilio
					</p>
					<p className="sl-copy mt-2 text-sm">
						Recibe tu pedido en la direccion indicada con seguimiento y entrega
						estandar.
					</p>
				</Button>

				<Button
					variant="secondary"
					onClick={() => setMetodoEntrega("recogida")}
					className={`sl-panel block min-h-0 w-full p-4 text-left normal-case tracking-normal ${metodoEntrega === "recogida" ? "border-[rgba(255,224,113,0.55)]" : ""}`}>
					<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
						[P-02]
					</p>
					<p className="sl-display mt-3 text-lg font-semibold">
						Punto de recogida
					</p>
					<p className="sl-copy mt-2 text-sm">
						Recoge tu pedido en una tienda SilverLine cuando mejor te venga.
					</p>
				</Button>
			</div>

			{metodoEntrega === "domicilio" ? (
				<div className="sl-panel sl-gridlines p-5">
					<div className="grid gap-4 md:grid-cols-3">
						<div className="md:col-span-2">
							<Campo
								label="Calle principal"
								id="checkout-calle">
								<input
									id="checkout-calle"
									type="text"
									value={direccionEnvio.calle}
									onChange={(e) =>
										handleCampoDireccion("calle", e.target.value)
									}
									placeholder="Calle Gran Vía"
									autoComplete="street-address"
									className="sl-input"
								/>
							</Campo>
						</div>
						<Campo
							label="Número"
							id="checkout-numero">
							<input
								id="checkout-numero"
								type="text"
								value={direccionEnvio.numero}
								onChange={(e) => handleCampoDireccion("numero", e.target.value)}
								placeholder="48"
								className="sl-input"
							/>
						</Campo>
						<div className="md:col-span-3">
							<Campo
								label="Piso o módulo"
								id="checkout-piso">
								<input
									id="checkout-piso"
									type="text"
									value={direccionEnvio.piso}
									onChange={(e) => handleCampoDireccion("piso", e.target.value)}
									placeholder="2A"
									autoComplete="address-line2"
									className="sl-input"
								/>
							</Campo>
						</div>
						<Campo
							label="Ciudad"
							id="checkout-ciudad">
							<input
								id="checkout-ciudad"
								type="text"
								value={direccionEnvio.ciudad}
								onChange={(e) => handleCampoDireccion("ciudad", e.target.value)}
								placeholder="Madrid"
								autoComplete="address-level2"
								className="sl-input"
							/>
						</Campo>
						<Campo
							label="Código postal"
							id="checkout-cp">
							<input
								id="checkout-cp"
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
								autoComplete="postal-code"
								className="sl-input"
							/>
						</Campo>
					</div>
				</div>
			) : (
				<div className="grid gap-3">
					{PUNTOS_RECOGIDA.map((punto) => (
						<Button
							key={punto.id}
							variant="secondary"
							onClick={() => setPuntoRecogidaSeleccionado(punto.id)}
							className={`sl-panel block min-h-0 w-full p-4 text-left normal-case tracking-normal ${puntoRecogidaSeleccionado === punto.id ? "border-[rgba(124,247,212,0.55)]" : ""}`}>
							<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
								<div>
									<p className="sl-display text-base font-semibold">
										{punto.nombre}
									</p>
									<p className="sl-copy mt-2 text-sm">{punto.direccion}</p>
								</div>
								<p className="text-[11px] uppercase tracking-[0.22em] text-(--color-warning)">
									{punto.horario}
								</p>
							</div>
						</Button>
					))}
				</div>
			)}

			{errorEntrega ? (
				<FeedbackMessage
					message={errorEntrega}
					successMatch="__no_match__"
				/>
			) : null}

			<Button
				onClick={onSiguiente}
				className="w-full">
				Continuar al resumen
			</Button>
		</div>
	);
}

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
		(punto) => punto.id === puntoRecogidaSeleccionado,
	);

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="sl-kicker">Paso 02</p>
					<h2 className="sl-display mt-3 text-2xl font-semibold text-(--color-black)">
						Revisa tu pedido
					</h2>
				</div>
				<div className="sl-chip">Resumen listo</div>
			</div>

			<div className="grid gap-4">
				<section className="sl-panel p-5">
					<div className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-4">
						<h3 className="sl-display text-base font-semibold">Productos</h3>
						<span className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							{itemsCarrito.length} productos
						</span>
					</div>
					<div className="mt-4 space-y-4">
						{itemsCarrito.map((item, idx) => {
							const producto = item.producto || {};
							return (
								<div
									key={producto._id || idx}
									className="flex items-start justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
									<div>
										<p className="sl-display text-sm font-semibold text-(--color-black)">
											{producto.nombre || "Producto"}
										</p>
										<p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-(--color-gray)">
											Cantidad: {item.cantidad}
										</p>
									</div>
									<p className="text-sm font-semibold text-(--color-warning)">
										{formatPrice((producto.precio || 0) * item.cantidad)}
									</p>
								</div>
							);
						})}
						<div className="flex items-center justify-between border-t border-(--color-border) pt-4">
							<p className="sl-display text-sm font-semibold">
								Total del pedido
							</p>
							<p className="sl-display text-lg font-semibold text-(--color-black)">
								{formatPrice(totalCarrito)}
							</p>
						</div>
					</div>
				</section>

				<div className="grid gap-4 md:grid-cols-2">
					<section className="sl-panel p-5">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							Entrega
						</p>
						<h3 className="sl-display mt-3 text-base font-semibold">Entrega</h3>
						<p className="sl-copy mt-3 text-sm">
							{metodoEntrega === "domicilio"
								? `${direccionEnvio.calle} ${direccionEnvio.numero}${direccionEnvio.piso ? `, ${direccionEnvio.piso}` : ""}, ${direccionEnvio.ciudad} ${direccionEnvio.codigoPostal}`
								: `${puntoRecogida?.nombre || ""} - ${puntoRecogida?.direccion || ""}`}
						</p>
					</section>

					<section className="sl-panel p-5">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							Pago
						</p>
						<h3 className="sl-display mt-3 text-base font-semibold">
							Pago seguro
						</h3>
						<p className="sl-copy mt-3 text-sm">
							Serás redirigido a Stripe para completar el pago de forma segura.
						</p>
					</section>
				</div>
			</div>

			{errorCheckout ? (
				<FeedbackMessage
					message={errorCheckout}
					successMatch="__no_match__"
				/>
			) : null}

			<div className="flex flex-col gap-3 md:flex-row">
				<Button
					variant="secondary"
					onClick={onAnterior}
					className="flex-1">
					Volver a entrega
				</Button>
				<Button
					onClick={onConfirmar}
					disabled={realizandoPedido}
					className="flex-1">
					{realizandoPedido ? "Redirigiendo al pago..." : "Confirmar y pagar"}
				</Button>
			</div>
		</div>
	);
}

function CheckoutTelemetry({ itemsCarrito, totalCarrito, metodoEntrega }) {
	return (
		<div className="grid gap-3 sm:grid-cols-3">
			<div className="sl-panel-soft p-4">
				<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
					Productos
				</p>
				<p className="sl-display mt-3 text-2xl font-semibold">
					{itemsCarrito.length}
				</p>
			</div>
			<div className="sl-panel-soft p-4">
				<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
					Total
				</p>
				<p className="sl-display mt-3 text-2xl font-semibold">
					{formatPrice(totalCarrito)}
				</p>
			</div>
			<div className="sl-panel-soft p-4">
				<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
					Entrega
				</p>
				<p className="sl-display mt-3 text-xl font-semibold">
					{metodoEntrega === "domicilio" ? "Domicilio" : "Recogida"}
				</p>
			</div>
		</div>
	);
}

export function Checkout() {
	const navigate = useNavigate();
	const authToken = getAuthToken();
	const [pasoActual, setPasoActual] = useState(1);
	const [itemsCarrito, setItemsCarrito] = useState([]);
	const [loadingCarrito, setLoadingCarrito] = useState(true);
	const [errorInicialCarrito, setErrorInicialCarrito] = useState("");
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
	const [realizandoPedido, setRealizandoPedido] = useState(false);
	const [errorCheckout, setErrorCheckout] = useState("");

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

	function validarEntrega() {
		if (metodoEntrega === "domicilio") {
			if (
				!direccionEnvio.calle ||
				!direccionEnvio.ciudad ||
				!direccionEnvio.codigoPostal
			) {
				setErrorEntrega("Calle, ciudad y codigo postal son obligatorios");
				return false;
			}
		} else if (!puntoRecogidaSeleccionado) {
			setErrorEntrega("Selecciona un punto de recogida");
			return false;
		}

		setErrorEntrega("");
		return true;
	}

	function irAlSiguientePaso() {
		if (pasoActual === 1 && validarEntrega()) {
			setPasoActual(2);
		}
	}

	function irAlPasoAnterior() {
		if (pasoActual > 1) {
			setPasoActual(pasoActual - 1);
		}
	}

	async function confirmarPedido() {
		setRealizandoPedido(true);
		setErrorCheckout("");

		try {
			const respuesta = await apiFetch("/api/checkout/create-session", {
				method: "POST",
				token: authToken,
			});

			window.location.href = respuesta.url;
		} catch (error) {
			setErrorCheckout(error.message || "No se pudo iniciar el pago");
			setRealizandoPedido(false);
		}
	}

	function handleLogout() {
		clearAuth();
		navigate("/");
	}

	if (!authToken) return null;

	if (loadingCarrito || errorInicialCarrito) {
		return (
			<div className="sl-page flex min-h-screen flex-col">
				<SiteHeader
					authToken={authToken}
					onLogout={handleLogout}
				/>
				<main className="mx-auto flex w-full max-w-4xl flex-1 items-center px-4 py-12">
					<div className="sl-panel w-full p-8 text-center">
						<p className="sl-kicker">
							{loadingCarrito ? "Preparando pedido" : "Aviso del sistema"}
						</p>
						<h1 className="sl-display mt-4 text-3xl font-semibold">
							{loadingCarrito
								? "Cargando checkout"
								: "No hemos podido abrir tu pedido"}
						</h1>
						<p className="sl-copy mx-auto mt-4 max-w-xl text-sm">
							{loadingCarrito
								? "Estamos recuperando los datos de tu carrito para preparar el pago."
								: errorInicialCarrito}
						</p>
						{!loadingCarrito ? (
							<Button
								variant="secondary"
								onClick={() => navigate("/carrito")}
								className="mt-8">
								Volver al carrito
							</Button>
						) : null}
					</div>
				</main>
				<SiteFooter />
			</div>
		);
	}

	return (
		<div className="sl-page flex min-h-screen flex-col">
			<SiteHeader
				authToken={authToken}
				onLogout={handleLogout}
			/>

			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:py-14">
				<section className="mb-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
					<div>
						<p className="sl-kicker">Finaliza tu compra</p>
						<h1 className="sl-display mt-4 max-w-3xl text-4xl font-semibold text-(--color-black) md:text-6xl">
							Finaliza tu compra
						</h1>
						<p className="sl-copy mt-5 max-w-2xl text-sm md:text-base">
							Revisa la entrega, comprueba el resumen y pasa al pago
						</p>
					</div>
					<div className="sl-panel p-5">
						<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
							Estado del pedido
						</p>
						<div className="mt-4 flex items-center justify-between border-b border-(--color-border) pb-4">
							<span className="sl-display text-sm font-semibold">
								Checkout activo
							</span>
							<span className="text-sm font-semibold text-(--color-signal)">
								Listo
							</span>
						</div>
						<p className="sl-copy mt-4 text-sm">
							Antes de pagar, validamos los datos de entrega y el resumen del
							pedido.
						</p>
					</div>
				</section>

				<section className="space-y-6">
					<CheckoutTelemetry
						itemsCarrito={itemsCarrito}
						totalCarrito={totalCarrito}
						metodoEntrega={metodoEntrega}
					/>
					<IndicadorPasos pasoActual={pasoActual} />
					<div className="sl-panel p-5 md:p-8">
						{pasoActual === 1 ? (
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
						) : (
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
					</div>
				</section>
			</main>

			<SiteFooter />
		</div>
	);
}
