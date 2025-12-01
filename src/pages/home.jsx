import { Link } from "react-router-dom";

function Home() {
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

	return (
		<div className="min-h-screen bg-white text-slate-900">
			{/* NAVBAR */}
			<header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					<Link
						to="/"
						className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-semibold text-white">
							SL
						</div>
						<span
							className="text-sm font-semibold uppercase text-slate-900"
							style={{ letterSpacing: "0.2rem" }}>
							SilverLine
						</span>
					</Link>

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

			<main>
				{/* HERO */}
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
								<a
									href="#macs"
									className="rounded-full bg-slate-900 text-white text-sm hover:bg-black transition-colors"
									style={{ padding: "10px 20px" }}>
									Ver MacBooks disponibles
								</a>
								<button
									className="rounded-full border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
									style={{ padding: "10px 20px" }}>
									Cómo revisamos cada equipo
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* GRID MACS */}
				<section
					id="macs"
					className="border-b border-slate-200">
					<div className="max-w-6xl mx-auto px-4 py-12">
						<div className="flex items-center justify-between mb-6">
							<h2
								className="text-sm font-semibold uppercase text-slate-600"
								style={{ letterSpacing: "0.22em" }}>
								En tendencia esta semana
							</h2>
							<p className="text-xs text-slate-400">Mostrando 4 modelos</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{macs.map((mac, index) => (
								<div
									key={index}
									className="group border border-slate-200 rounded-2xl bg-white/60 hover:bg-white hover:border-slate-300 transition-colors p-4 flex flex-col gap-4">
									<div
										className="rounded-xl bg-slate-100 relative overflow-hidden"
										style={{ aspectRatio: "4/3" }}>
										<span
											className="absolute top-3 left-3 rounded-full bg-white/80 border border-slate-200 text-slate-700"
											style={{ fontSize: "11px", padding: "4px 8px" }}>
											{mac.tag}
										</span>
									</div>
									<div className="flex flex-col gap-2">
										<h3 className="text-sm font-medium text-slate-900">
											{mac.nombre}
										</h3>
										<p className="text-xs text-slate-500">{mac.detalle}</p>
										<div className="flex items-center justify-between mt-2">
											<span className="text-sm font-semibold text-slate-900">
												{mac.precio}
											</span>
											<button
												className="text-xs rounded-full border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
												style={{ padding: "6px 12px" }}>
												Ver más
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* WHY SILVERLINE */}
				<section
					id="why"
					className="border-b border-slate-200">
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
			</main>

			{/* FOOTER */}
			<footer className="border-t border-slate-200">
				<div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
					<p>
						© {new Date().getFullYear()} SilverLine. MacBooks reacondicionados.
					</p>
					<div className="flex gap-4">
						<a
							href="#"
							className="hover:text-slate-800">
							Privacidad
						</a>
						<a
							href="#"
							className="hover:text-slate-800">
							Términos
						</a>
						<a
							href="#"
							className="hover:text-slate-800">
							Contacto
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Home;
