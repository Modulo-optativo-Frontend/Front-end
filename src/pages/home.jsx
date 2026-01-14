// Importa useState para guardar "estado" (datos que cambian) dentro del componente
import { useState } from "react";
// Importa Link para navegar entre rutas sin recargar la página
import { Link } from "react-router-dom";

// Componente/página Home: una función que devuelve JSX (la UI)
function Home() {
	// Estado: lista de productos añadidos al carrito (empieza vacío)
	const [cart, setCart] = useState([]);
	// Estado: controla si el panel del carrito está abierto o cerrado
	const [cartOpen, setCartOpen] = useState(false);

	// Función: añade un Mac al carrito (crea un array nuevo con el item al final)
	const addToCart = (mac) => {
		setCart([...cart, mac]);
	};

	// Función: elimina un producto del carrito por su índice
	const removeFromCart = (indexToRemove) => {
		setCart(cart.filter((_, index) => index !== indexToRemove));
	};

	// Datos "mock": lista de productos (no backend, solo frontend)
	const macs = [
		{
			nombre: "MacBook Air M1",
			detalle: "13” · 256 GB · 8 GB RAM",
			precio: "899 €",
			tag: "Best seller",
		},
		{
			nombre: "MacBook Pro 14” M1 Pro",
			detalle: "14” · 512 GB · 16 GB RAM",
			precio: "1.699 €",
			tag: "Pro choice",
		},
		{
			nombre: "MacBook Air M2",
			detalle: "13” · 512 GB · 8 GB RAM",
			precio: "1.199 €",
			tag: "New design",
		},
		{
			nombre: "MacBook Pro 16” Intel",
			detalle: "16” · 512 GB · 16 GB RAM",
			precio: "1.299 €",
			tag: "Great display",
		},
	];

	// Render: lo que se ve en pantalla (se re-ejecuta cuando cambia el estado)
	return (
		// Contenedor general de la página
		<div className="min-h-screen bg-white text-slate-900">
			{/* NAVBAR: cabecera superior con logo y navegación */}
			<header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
				{/* Contenedor centrado y con máximo ancho */}
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					{/* Logo: link que vuelve a Home */}
					<Link to="/" className="flex items-center gap-2">
						{/* Círculo con iniciales */}
						<div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-semibold text-white">
							SL
						</div>
						{/* Nombre de marca */}
						<span
							className="text-sm font-semibold uppercase text-slate-900"
							style={{ letterSpacing: "0.2rem" }}>
							SilverLine
						</span>
					</Link>

					{/* Navegación interna (solo visible en pantallas md+) */}
					<nav className="hidden md:flex items-center gap-6 text-sm text-slate-500">
						<a
							href="#macs"
							className="hover:text-slate-900 transition-colors">
							MacBooks
						</a>
						<a
							href="#why"
							className="hover:text-slate-900 transition-colors">
							Por qué SilverLine
						</a>
					</nav>

					{/* Links a Login y Registro */}
					<div className="flex items-center gap-3 text-sm">
						<Link
							to="/login"
							className="text-slate-600 hover:text-slate-900 transition-colors">
							Iniciar sesión
						</Link>
						<Link
							to="/registro"
							className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm hover:bg-black transition-colors">
							Crear cuenta
						</Link>
					</div>
				</div>
			</header>

			{/* MAIN: contenido principal de la página */}
			<main>
				{/* HERO: bloque principal de presentación */}
				<section className="border-b border-slate-200">
					<div className="max-w-6xl mx-auto px-4 py-12">
						<div className="max-w-2xl">
							<p
								className="text-xs font-medium uppercase text-slate-500 mb-2"
								style={{ letterSpacing: "0.22em" }}>
								REFURBISHED MACBOOK STORE
							</p>
							<h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
								MacBooks reacondicionados listos para tu siguiente proyecto.
							</h1>
							<p className="text-sm md:text-base text-slate-500 mb-6">
								Seleccionamos cada equipo uno a uno, revisamos batería, pantalla
								y rendimiento, para que solo tengas que encenderlo y crear.
							</p>
							<div className="flex flex-wrap gap-3">
								{/* Botón/Link que baja a la sección de productos */}
								<a
									href="#macs"
									className="rounded-full bg-slate-900 text-white text-sm hover:bg-black transition-colors"
									style={{ padding: "10px 20px" }}>
									Ver MacBooks disponibles
								</a>
								{/* Botón decorativo (sin funcionalidad por ahora) */}
								<button
									className="rounded-full border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
									style={{ padding: "10px 20px" }}>
									Cómo revisamos cada equipo
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* GRID MACS: listado de productos */}
				<section id="macs" className="border-b border-slate-200">
					<div className="max-w-6xl mx-auto px-4 py-12">
						<div className="flex items-center justify-between mb-6">
							<h2
								className="text-sm font-semibold uppercase text-slate-600"
								style={{ letterSpacing: "0.22em" }}>
								En tendencia esta semana
							</h2>
							<p className="text-xs text-slate-400">Mostrando 4 modelos</p>
						</div>

						{/* Grid responsive: 1 columna, 2 en sm, 4 en lg */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{/* Recorre macs y crea una card por producto */}
							{macs.map((mac, index) => (
								<div
									key={index}
									className="group border border-slate-200 rounded-2xl bg-white/60 hover:bg-white hover:border-slate-300 transition-colors p-4 flex flex-col gap-4">
									{/* Zona “imagen” placeholder */}
									<div
										className="rounded-xl bg-slate-100 relative overflow-hidden"
										style={{ aspectRatio: "4/3" }}>
										{/* Tag superior (Best seller / Pro choice...) */}
										<span
											className="absolute top-3 left-3 rounded-full bg-white/80 border border-slate-200 text-slate-700"
											style={{ fontSize: "11px", padding: "4px 8px" }}>
											{mac.tag}
										</span>
									</div>

									{/* Info del producto */}
									<div className="flex flex-col gap-2">
										<h3 className="text-sm font-medium text-slate-900">
											{mac.nombre}
										</h3>
										<p className="text-xs text-slate-500">{mac.detalle}</p>

										{/* Precio + botón añadir */}
										<div className="flex items-center justify-between mt-2">
											<span className="text-sm font-semibold text-slate-900">
												{mac.precio}
											</span>

											{/* Botón: al click añade este producto al carrito */}
											<button
												onClick={() => addToCart(mac)}
												className="text-xs rounded-full border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
												style={{ padding: "6px 12px" }}>
												Añadir
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* WHY SILVERLINE: sección de texto informativo */}
				<section id="why" className="border-b border-slate-200">
					<div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h2
								className="text-sm font-semibold uppercase text-slate-600 mb-3"
								style={{ letterSpacing: "0.22em" }}>
								Por qué SilverLine
							</h2>
							<p className="text-sm text-slate-500">
								Una experiencia cercana al producto nuevo, con precios realmente
								ajustados y garantía.
							</p>
						</div>

						<div className="space-y-4 text-sm text-slate-600">
							<p>
								<span className="font-medium text-slate-900">
									Revisión completa
								</span>{" "}
								de hardware, puertos, teclado, pantalla y batería en cada
								equipo.
							</p>
							<p>
								<span className="font-medium text-slate-900">
									Configuración limpia
								</span>{" "}
								con la última versión compatible de macOS listo para usar.
							</p>
						</div>

						<div className="space-y-4 text-sm text-slate-600">
							<p>
								<span className="font-medium text-slate-900">
									Garantía incluida
								</span>{" "}
								y opción de ampliarla si quieres más tranquilidad.
							</p>
							<p>
								<span className="font-medium text-slate-900">
									Envío rápido y seguro
								</span>{" "}
								con embalaje reforzado y seguimiento.
							</p>
						</div>
					</div>
				</section>

				{/* BOTÓN CISTELLA (PLEGADA): botón flotante con contador */}
				<button
					onClick={() => setCartOpen(!cartOpen)}
					className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-sm shadow-lg">
					🛒 {cart.length}
				</button>

				{/* PANEL CISTELLA (DESPLEGADA): aparece solo si cartOpen es true */}
				{cartOpen && (
					<div className="fixed top-20 right-6 z-50 w-72 bg-white border border-slate-200 shadow-lg rounded-xl p-4">
						{/* Cabecera del panel */}
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-sm font-semibold">Tu cistella</h3>
							{/* Botón para cerrar el panel */}
							<button
								onClick={() => setCartOpen(false)}
								className="text-xs text-slate-500 hover:text-slate-900">
								Cerrar
							</button>
						</div>

						{/* Si el carrito está vacío, muestra mensaje */}
						{cart.length === 0 ? (
							<p className="text-sm text-slate-500">La cistella està buida</p>
						) : (
							<>
								{/* Lista de productos añadidos */}
								<div className="space-y-2">
									{cart.map((item, index) => (
										<div
											key={index}
											className="flex items-center justify-between text-sm">
											{/* Nombre y precio */}
											<div className="flex flex-col">
												<span className="text-slate-700">{item.nombre}</span>
												<span className="text-xs text-slate-400">
													{item.precio}
												</span>
											</div>

											{/* Botón para quitar este item del carrito */}
											<button
												onClick={() => removeFromCart(index)}
												className="text-xs px-2 py-1 rounded-full border border-slate-300 hover:bg-slate-900 hover:text-white transition-colors">
												Quitar
											</button>
										</div>
									))}
								</div>

								{/* Botón “Ir a pagar” simulado (solo UI, sin backend) */}
								<button
									onClick={() =>
										alert(
											"Ir a pagar (simulado). Aquí iría tu checkout 😄"
										)
									}
									className="w-full mt-4 bg-slate-900 text-white py-2 rounded-lg hover:bg-black transition-colors text-sm">
									Ir a pagar
								</button>
							</>
						)}
					</div>
				)}
			</main>

			{/* FOOTER: pie de página */}
			<footer className="border-t border-slate-200">
				<div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
					<p>
						© {new Date().getFullYear()} SilverLine. MacBooks reacondicionados.
					</p>
					<div className="flex gap-4">
						<a href="#" className="hover:text-slate-800">
							Privacidad
						</a>
						<a href="#" className="hover:text-slate-800">
							Términos
						</a>
						<a href="#" className="hover:text-slate-800">
							Contacto
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

// Exporta el componente para poder usarlo en rutas u otros archivos
export default Home;
