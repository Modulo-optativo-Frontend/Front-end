import { Link } from "react-router-dom";

function Home() {
	const macsTendencia = [
		{
			nombre: "MacBook Air M1",
			resolucion: "13” · 256 GB · 8 GB RAM",
			precio: "899 €",
			tipo: "Free shipping",
		},
		{
			nombre: "MacBook Pro 14” M1 Pro",
			resolucion: "14” · 512 GB · 16 GB RAM",
			precio: "1.699 €",
			tipo: "Refurb Premium",
		},
		{
			nombre: "MacBook Air M2",
			resolucion: "13” · 512 GB · 8 GB RAM",
			precio: "1.199 €",
			tipo: "New design",
		},
		{
			nombre: "MacBook Pro 16” Intel",
			resolucion: "16” · 512 GB · 16 GB RAM",
			precio: "1.299 €",
			tipo: "Great display",
		},
	];

	const coleccionesMac = [
		{
			nombre: "Colección Air Essentials",
			resolucion: "Modelos Air desde 2018",
			precio: "Desde 699 €",
		},
		{
			nombre: "Colección Pro Studio",
			resolucion: "Pro 13/14/16 para creativos",
			precio: "Desde 999 €",
		},
		{
			nombre: "Colección M-Chip",
			resolucion: "M1 / M2 / M3 seleccionados",
			precio: "Desde 899 €",
		},
		{
			nombre: "Colección Intel Classic",
			resolucion: "Pro Intel optimizados",
			precio: "Desde 649 €",
		},
		{
			nombre: "Colección Student Pack",
			resolucion: "Equipos para estudiar",
			precio: "Packs desde 749 €",
		},
		{
			nombre: "Colección Creator Pack",
			resolucion: "Equipo + accesorios",
			precio: "Packs desde 1.299 €",
		},
	];

	const coleccionesLista = [
		{
			nombre: "Air Essentials Collection",
			texto: "MacBook Air ligeros para trabajar y estudiar.",
			precio: "Desde 699 €",
		},
		{
			nombre: "Pro Studio Collection 01",
			texto: "Equipos pensados para edición de vídeo y diseño.",
			precio: "Desde 1.299 €",
		},
		{
			nombre: "M-Chip Collection 02",
			texto: "Solo modelos con chips Apple Silicon.",
			precio: "Desde 899 €",
		},
	];

	return (
		<div className="min-h-screen bg-black text-white">
			{/* NAVBAR */}
			<header className="w-full border-b border-white/10 bg-black/95 sticky top-0 z-40">
				<div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4 text-[11px] tracking-[0.25em] uppercase">
					<div className="flex items-center gap-8">
						<Link
							to="/"
							className="font-semibold">
							MACLINE FLEET
						</Link>

						<nav className="hidden md:flex items-center gap-6">
							<a
								href="#mockups"
								className="hover:text-neutral-300">
								MacBooks
							</a>
							<a
								href="#colecciones-grid"
								className="hover:text-neutral-300">
								Collections
							</a>
							<a
								href="#journal"
								className="hover:text-neutral-300">
								Journal
							</a>
							<a
								href="#about"
								className="hover:text-neutral-300">
								About
							</a>
						</nav>
					</div>

					<div className="flex items-center gap-4">
						<Link
							to="/login"
							className="hover:text-neutral-300">
							Sign in
						</Link>
						<Link
							to="/registro"
							className="hover:text-neutral-300">
							Join
						</Link>
					</div>
				</div>
			</header>

<main className="w-full px-6 lg:px-12 pb-24">
				{/* HERO: LOGO + CARRUSEL SIMPLE */}
				<section
					id="mockups"
					className="pt-12 pb-10 border-b border-white/10">
					<div className="flex flex-col items-center text-center mb-10">
						<h1 className="text-4xl md:text-6xl font-black tracking-[0.22em] leading-tight">
							MACLINE
							<br />
							<span className="text-3xl md:text-5xl">FLEET</span>
						</h1>
						<p className="mt-4 text-xs md:text-sm text-neutral-300 max-w-xl">
							Hand-picked refurbished MacBooks for designers, developers and
							creators. Listos para tu próximo proyecto.
						</p>
					</div>

					{/* “Slider” de imágenes: aquí son placeholders */}
					<div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
						{Array.from({ length: 5 }).map((_, indice) => (
							<div
								key={indice}
								className="relative aspect-[4/3] bg-neutral-800 rounded-lg overflow-hidden border border-white/10">
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400">
										MacBook shot {indice + 1}
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex justify-center gap-1 mt-2">
						<span className="w-1.5 h-1.5 rounded-full bg-white" />
						<span className="w-1.5 h-1.5 rounded-full bg-white/40" />
						<span className="w-1.5 h-1.5 rounded-full bg-white/40" />
						<span className="w-1.5 h-1.5 rounded-full bg-white/40" />
					</div>
				</section>

				{/* TRENDING WEEKLY */}
				<section className="pt-10 pb-12 border-b border-white/10">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-sm md:text-base tracking-[0.25em] uppercase">
							Trending Weekly
						</h2>
						<p className="text-[11px] text-neutral-400">
							Showing 4 of 24 MacBooks
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{macsTendencia.map((mac, indice) => (
							<div
								key={indice}
								className="bg-neutral-900 border border-white/10 rounded-md overflow-hidden flex flex-col">
								<div className="aspect-[4/3] bg-neutral-800" />
								<div className="px-4 py-3 flex-1 flex flex-col justify-between">
									<div className="space-y-1">
										<p className="text-xs text-neutral-400 uppercase tracking-[0.18em]">
											{mac.tipo}
										</p>
										<p className="text-sm font-medium">{mac.nombre}</p>
										<p className="text-[11px] text-neutral-400">
											{mac.resolucion}
										</p>
									</div>
									<div className="mt-3 flex items-center justify-between text-[11px]">
										<span className="text-neutral-200">{mac.precio}</span>
										<button className="px-3 py-1 rounded-full border border-white text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition">
											View
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="mt-8 flex justify-center">
						<button className="px-6 py-2 text-[11px] tracking-[0.22em] uppercase border border-white rounded-full hover:bg-white hover:text-black transition">
							See more
						</button>
					</div>
				</section>

				{/* SHOP BY COLLECTIONS */}
				<section
					id="colecciones-grid"
					className="pt-10 pb-12 border-b border-white/10">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-sm md:text-base tracking-[0.25em] uppercase">
							Shop by Collections
						</h2>
						<p className="text-[11px] text-neutral-400">
							Showing 6 curated collections
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{coleccionesMac.map((coleccion, indice) => (
							<div
								key={indice}
								className="bg-neutral-900 border border-white/10 rounded-md overflow-hidden flex flex-col">
								<div className="aspect-[4/3] bg-neutral-800" />
								<div className="px-4 py-3 space-y-1">
									<p className="text-sm font-medium">{coleccion.nombre}</p>
									<p className="text-[11px] text-neutral-400">
										{coleccion.resolucion}
									</p>
									<p className="text-[11px] text-neutral-200">
										{coleccion.precio}
									</p>
								</div>
							</div>
						))}
					</div>

					<div className="mt-8 flex justify-center">
						<button className="px-6 py-2 text-[11px] tracking-[0.22em] uppercase border border-white rounded-full hover:bg-white hover:text-black transition">
							Load more
						</button>
					</div>
				</section>

				{/* NUEVA COLECCIÓN DESTACADA */}
				<section
					id="journal"
					className="pt-10 pb-12 border-b border-white/10">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-sm md:text-base tracking-[0.25em] uppercase">
							Don&apos;t miss our new collection
						</h2>
						<button className="text-[11px] text-neutral-300 hover:text-white flex items-center gap-1">
							View all <span>›</span>
						</button>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
						<div className="bg-neutral-900 border border-white/10 rounded-md overflow-hidden flex flex-col">
							<div className="aspect-[16/9] bg-neutral-800" />
							<div className="px-5 py-4 space-y-2">
								<p className="text-xs text-neutral-400 uppercase tracking-[0.2em]">
									New · Collection
								</p>
								<h3 className="text-lg font-semibold">
									House of M-Chip Collection 01
								</h3>
								<p className="text-[11px] text-neutral-300 max-w-md">
									Una serie de MacBooks con chip M1 y M2 pensados para
									productividad y creatividad diaria.
								</p>
								<button className="mt-3 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase border border-white rounded-full hover:bg-white hover:text-black transition">
									Explore 24 MacBooks
								</button>
							</div>
						</div>

						<div className="bg-neutral-900 border border-white/10 rounded-md overflow-hidden flex flex-col">
							<div className="aspect-[16/9] bg-neutral-800" />
							<div className="px-5 py-4 space-y-2">
								<p className="text-xs text-neutral-400 uppercase tracking-[0.2em]">
									Journal
								</p>
								<h3 className="text-base font-semibold">
									How we grade every MacBook
								</h3>
								<p className="text-[11px] text-neutral-300">
									Te explicamos cómo revisamos, limpiamos y clasificamos cada
									equipo antes de ponerlo a la venta.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* NUESTAS COLECCIONES (LISTA) */}
				<section
					id="about"
					className="pt-10 pb-16">
					<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
						<h2 className="text-sm md:text-base tracking-[0.25em] uppercase">
							Our Collections
						</h2>
						<p className="text-[11px] text-neutral-400 max-w-xs">
							Save up to 40% frente a equipos nuevos gracias a nuestras
							colecciones curadas.
						</p>
					</div>

					<div className="space-y-2 mb-14">
						{coleccionesLista.map((coleccion, indice) => (
							<div
								key={indice}
								className="flex items-center justify-between border-t border-white/10 py-3 text-[11px] md:text-xs">
								<div className="space-y-1">
									<p className="font-medium tracking-[0.12em] uppercase">
										{coleccion.nombre}
									</p>
									<p className="text-neutral-400">{coleccion.texto}</p>
								</div>
								<p className="text-neutral-200">{coleccion.precio}</p>
							</div>
						))}
						<div className="border-t border-white/10" />
					</div>

					<div className="text-center space-y-4">
						<p className="text-xl md:text-2xl font-semibold tracking-[0.18em] uppercase">
							Stay wild into your ideas.
						</p>
						<p className="text-[11px] text-neutral-400">
							Become member &amp; get 10% off on your first MacBook.
						</p>
						<div className="max-w-sm mx-auto flex items-center gap-2 border-b border-white/30 pb-2">
							<input
								type="email"
								placeholder="Email address"
								className="flex-1 bg-transparent text-xs outline-none placeholder:text-neutral-500"
							/>
							<button className="text-[11px] tracking-[0.22em] uppercase">
								›
							</button>
						</div>
					</div>
				</section>
			</main>

			{/* FOOTER */}
			<footer className="border-t border-white/10 bg-black py-10 text-[11px]">
				<div className="max-w-6xl mx-auto px-6 lg:px-10">
					<div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
						<div className="space-y-2">
							<p className="text-lg font-black tracking-[0.22em]">
								MACLINE FLEET
							</p>
							<p className="text-neutral-500">
								© 2025 MacLine Fleet. All rights reserved.
							</p>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-neutral-400">
							<div className="space-y-1">
								<p className="text-white">About</p>
								<p>Licence</p>
								<p>Shop</p>
							</div>
							<div className="space-y-1">
								<p className="text-white">Get in touch</p>
								<p>Journal</p>
								<p>FAQs</p>
							</div>
							<div className="space-y-1">
								<p className="text-white">Legal</p>
								<p>Privacy Policy</p>
								<p>Cookies</p>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap gap-6 text-neutral-500">
						<p>Instagram</p>
						<p>Dribbble</p>
						<p>Behance</p>
						<p>YouTube</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Home;
