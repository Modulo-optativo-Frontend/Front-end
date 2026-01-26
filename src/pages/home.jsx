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
			precio: "800 €",
			tag: "Pro choice",
		},
		{
			nombre: "MacBook Air M2",
			detalle: "13” · 512 GB · 8 GB RAM",
			precio: "700 €",
			tag: "New design",
		},
		{
			nombre: "MacBook Pro 16” Intel",
			detalle: "16” · 512 GB · 16 GB RAM",
			precio: "699 €",
			tag: "Great display",
		},
	];

	return (
		<div
			className="min-h-screen text-slate-900"
			style={{ backgroundColor: "var(--color-white)" }}>
			{/* NAVBAR */}
			<header
				className="backdrop-blur-md"
				style={{
					borderBottom: "1px solid var(--color-border)",
					backgroundColor: "rgba(245, 245, 247, 0.8)",
				}}>
				<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
					<Link
						to="/"
						className="flex items-center gap-2">
						<div
							className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
							style={{
								backgroundColor: "var(--color-black)",
								color: "var(--color-white)",
							}}>
							SL
						</div>
						<span
							className="text-sm font-semibold uppercase"
							style={{ letterSpacing: "0.2rem", color: "var(--color-black)" }}>
							SilverLine
						</span>
					</Link>

					<nav
						className="hidden md:flex items-center gap-6 text-sm"
						style={{ color: "var(--color-gray)" }}>
						<a
							href="#macs"
							className="transition-colors hover:opacity-80"
							style={{ color: "var(--color-gray-dark)" }}>
							MacBooks
						</a>
						<a
							href="#why"
							className="transition-colors hover:opacity-80"
							style={{ color: "var(--color-gray-dark)" }}>
							Por qué SilverLine
						</a>
					</nav>

					<div className="flex items-center gap-3 text-sm">
						<Link
							to="/login"
							className="transition-colors hover:opacity-80"
							style={{ color: "var(--color-gray-dark)" }}>
							Iniciar sesión
						</Link>
						<Link
							to="/registro"
							className="px-4 py-2 rounded-full text-sm transition-colors hover:opacity-90"
							style={{
								backgroundColor: "var(--color-blue)",
								color: "var(--color-white)",
							}}>
							Crear cuenta
						</Link>
					</div>
				</div>
			</header>

			<main>
				{/* HERO */}
				<section style={{ borderBottom: "1px solid var(--color-border)" }}>
					<div className="max-w-6xl mx-auto px-4 py-12">
						<div className="max-w-2xl">
							<p
								className="text-xs font-medium uppercase mb-2"
								style={{ letterSpacing: "0.22em", color: "var(--color-blue)" }}>
								REFURBISHED MACBOOK STORE
							</p>
							<h1
								className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
								style={{ color: "var(--color-black)" }}>
								MacBooks reacondicionados. Listos para crear.
							</h1>
							<p
								className="text-sm md:text-base mb-6"
								style={{ color: "var(--color-gray)" }}>
								Certificado. Conectar y crear.
							</p>
							<div className="flex flex-wrap gap-3">
								<a
									href="#macs"
									className="rounded-full text-sm transition-colors hover:opacity-90"
									style={{
										padding: "10px 20px",
										backgroundColor: "var(--color-blue)",
										color: "var(--color-white)",
									}}>
									Ver MacBooks disponibles
								</a>
								<button
									className="rounded-full text-sm transition-colors hover:opacity-80"
									style={{
										padding: "10px 20px",
										border: "1px solid var(--color-border)",
										color: "var(--color-black)",
									}}>
									Cómo revisamos cada equipo
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* GRID MACS */}
				<section
					id="macs"
					style={{ borderBottom: "1px solid var(--color-border)" }}>
					<div className="max-w-6xl mx-auto px-4 py-12">
						<div className="flex items-center justify-between mb-6">
							<h2
								className="text-sm font-semibold uppercase"
								style={{
									letterSpacing: "0.22em",
									color: "var(--color-gray-dark)",
								}}>
								En tendencia esta semana
							</h2>
							<p
								className="text-xs"
								style={{ color: "var(--color-gray)" }}>
								Mostrando 4 modelos
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{macs.map((mac, index) => (
								<div
									key={index}
									className="group rounded-2xl transition-all p-4 flex flex-col gap-4 hover:shadow-lg"
									style={{
										border: "1px solid var(--color-border)",
										backgroundColor: "rgba(255, 255, 255, 0.6)",
									}}>
									<div
										className="rounded-xl relative overflow-hidden"
										style={{
											aspectRatio: "4/3",
											backgroundColor: "var(--color-gray-light)",
										}}>
										<span
											className="absolute top-3 left-3 rounded-full"
											style={{
												fontSize: "11px",
												padding: "4px 8px",
												backgroundColor: "rgba(255, 255, 255, 0.9)",
												border: "1px solid var(--color-border)",
												color: "var(--color-black)",
											}}>
											{mac.tag}
										</span>
									</div>
									<div className="flex flex-col gap-2">
										<h3
											className="text-sm font-medium"
											style={{ color: "var(--color-black)" }}>
											{mac.nombre}
										</h3>
										<p
											className="text-xs"
											style={{ color: "var(--color-gray)" }}>
											{mac.detalle}
										</p>
										<div className="flex items-center justify-between mt-2">
											<span
												className="text-sm font-semibold"
												style={{ color: "var(--color-black)" }}>
												{mac.precio}
											</span>
											<button
												className="text-xs rounded-full transition-colors hover:opacity-90"
												style={{
													padding: "6px 12px",
													backgroundColor: "var(--color-blue)",
													color: "var(--color-white)",
												}}>
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
					style={{ borderBottom: "1px solid var(--color-border)" }}>
					<div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h2
								className="text-sm font-semibold uppercase mb-3"
								style={{
									letterSpacing: "0.22em",
									color: "var(--color-gray-dark)",
								}}>
								Por qué SilverLine
							</h2>
							<p
								className="text-sm"
								style={{ color: "var(--color-gray)" }}>
								Una experiencia cercana al producto nuevo, con precios realmente
								ajustados y garantía.
							</p>
						</div>
						<div
							className="space-y-4 text-sm"
							style={{ color: "var(--color-gray)" }}>
							<p>
								<span
									className="font-medium"
									style={{ color: "var(--color-black)" }}>
									Revisión completa
								</span>{" "}
								de hardware, puertos, teclado, pantalla y batería en cada
								equipo.
							</p>
							<p>
								<span
									className="font-medium"
									style={{ color: "var(--color-black)" }}>
									Configuración limpia
								</span>{" "}
								con la última versión compatible de macOS listo para usar.
							</p>
						</div>
						<div
							className="space-y-4 text-sm"
							style={{ color: "var(--color-gray)" }}>
							<p>
								<span
									className="font-medium"
									style={{ color: "var(--color-black)" }}>
									Garantía incluida
								</span>{" "}
								y opción de ampliarla si quieres más tranquilidad.
							</p>
							<p>
								<span
									className="font-medium"
									style={{ color: "var(--color-black)" }}>
									Envío rápido y seguro
								</span>{" "}
								con embalaje reforzado y seguimiento.
							</p>
						</div>
					</div>
				</section>
			</main>

			{/* FOOTER */}
			<footer style={{ borderTop: "1px solid var(--color-border)" }}>
				<div
					className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
					style={{ color: "var(--color-gray)" }}>
					<p>
						© {new Date().getFullYear()} SilverLine. MacBooks reacondicionados.
					</p>
					<div className="flex gap-4">
						<a
							href="#"
							className="hover:opacity-70 transition-opacity"
							style={{ color: "var(--color-gray-dark)" }}>
							Privacidad
						</a>
						<a
							href="#"
							className="hover:opacity-70 transition-opacity"
							style={{ color: "var(--color-gray-dark)" }}>
							Términos
						</a>
						<a
							href="#"
							className="hover:opacity-70 transition-opacity"
							style={{ color: "var(--color-gray-dark)" }}>
							Contacto
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Home;
