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
		<div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
			{/* NAVBAR */}
			<header className="w-full border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-5 text-[11px] tracking-[0.2em] uppercase font-medium">
					<div className="flex items-center gap-12">
						<Link
							to="/"
							className="text-sm font-bold tracking-[0.25em] hover:opacity-80 transition-opacity">
							MACLINE FLEET
						</Link>

						<nav className="hidden md:flex items-center gap-8 text-neutral-400">
							<a
								href="#mockups"
								className="hover:text-white transition-colors duration-300">
								MacBooks
							</a>
							<a
								href="#colecciones-grid"
								className="hover:text-white transition-colors duration-300">
								Collections
							</a>
							<a
								href="#journal"
								className="hover:text-white transition-colors duration-300">
								Journal
							</a>
							<a
								href="#about"
								className="hover:text-white transition-colors duration-300">
								About
							</a>
						</nav>
					</div>

					<div className="flex items-center gap-6">
						<Link
							to="/login"
							className="hover:text-neutral-300 transition-colors">
							Sign in
						</Link>
						<Link
							to="/registro"
							className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
							Join
						</Link>
					</div>
				</div>
			</header>

			<main className="w-full">
				{/* HERO: LOGO + CARRUSEL SIMPLE */}
				<section
					id="mockups"
					className="pt-20 pb-24 border-b border-white/5 px-6 lg:px-12">
					<div className="max-w-7xl mx-auto">
						<div className="flex flex-col items-center text-center mb-16 space-y-6">
							<h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
								MACLINE
								<br />
								<span className="font-light tracking-[0.1em] text-4xl md:text-6xl text-white">
									FLEET
								</span>
							</h1>
							<p className="text-sm md:text-base text-neutral-400 max-w-lg font-light leading-relaxed">
								Hand-picked refurbished MacBooks for designers, developers and
								creators. <span className="text-white">Ready for your next masterpiece.</span>
							</p>
						</div>

						{/* “Slider” de imágenes */}
						<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
							{Array.from({ length: 5 }).map((_, indice) => (
								<div
									key={indice}
									className="group relative aspect-[4/3] bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors duration-500">
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="text-[10px] tracking-[0.25em] uppercase text-neutral-600 group-hover:text-neutral-400 transition-colors">
											Shot {indice + 1}
										</span>
									</div>
									{/* Overlay effect */}
									<div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
								</div>
							))}
						</div>

						<div className="flex justify-center gap-2">
							<span className="w-2 h-2 rounded-full bg-white cursor-pointer" />
							<span className="w-2 h-2 rounded-full bg-neutral-800 hover:bg-neutral-600 cursor-pointer transition-colors" />
							<span className="w-2 h-2 rounded-full bg-neutral-800 hover:bg-neutral-600 cursor-pointer transition-colors" />
							<span className="w-2 h-2 rounded-full bg-neutral-800 hover:bg-neutral-600 cursor-pointer transition-colors" />
						</div>
					</div>
				</section>

				{/* TRENDING WEEKLY */}
				<section className="py-20 border-b border-white/5 px-6 lg:px-12">
					<div className="max-w-7xl mx-auto">
						<div className="flex items-end justify-between mb-12">
							<div>
								<h2 className="text-lg md:text-xl tracking-[0.2em] uppercase font-medium mb-2">
									Trending Weekly
								</h2>
								<div className="h-0.5 w-12 bg-white/20" />
							</div>
							<p className="text-[11px] text-neutral-500 tracking-wider uppercase">
								Showing 4 of 24 MacBooks
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{macsTendencia.map((mac, indice) => (
								<div
									key={indice}
									className="group bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden flex flex-col hover:border-white/20 hover:bg-neutral-900 transition-all duration-300">
									<div className="aspect-[4/3] bg-neutral-800/50 relative">
										<div className="absolute top-3 left-3">
											<span className="px-2 py-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded text-[9px] uppercase tracking-wider text-white/80">
												{mac.tipo}
											</span>
										</div>
									</div>
									<div className="p-5 flex-1 flex flex-col justify-between">
										<div className="space-y-2">
											<h3 className="text-base font-medium text-white group-hover:text-white transition-colors">
												{mac.nombre}
											</h3>
											<p className="text-xs text-neutral-400 font-light">
												{mac.resolucion}
											</p>
										</div>
										<div className="mt-6 flex items-center justify-between">
											<span className="text-sm font-medium text-white">
												{mac.precio}
											</span>
											<button className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300">
												<span className="text-lg leading-none mb-0.5">→</span>
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-16 flex justify-center">
							<button className="px-8 py-3 text-[11px] tracking-[0.2em] uppercase border border-white/20 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
								View all inventory
							</button>
						</div>
					</div>
				</section>

				{/* SHOP BY COLLECTIONS */}
				<section
					id="colecciones-grid"
					className="py-20 border-b border-white/5 px-6 lg:px-12">
					<div className="max-w-7xl mx-auto">
						<div className="flex items-end justify-between mb-12">
							<div>
								<h2 className="text-lg md:text-xl tracking-[0.2em] uppercase font-medium mb-2">
									Shop by Collections
								</h2>
								<div className="h-0.5 w-12 bg-white/20" />
							</div>
							<p className="text-[11px] text-neutral-500 tracking-wider uppercase">
								Curated for your needs
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{coleccionesMac.map((coleccion, indice) => (
								<div
									key={indice}
									className="group relative bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
									<div className="aspect-[16/10] bg-neutral-800/50" />
									<div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
										<div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
											<p className="text-xs text-neutral-400 mb-1">
												{coleccion.resolucion}
											</p>
											<h3 className="text-lg font-medium mb-2 text-white">
												{coleccion.nombre}
											</h3>
											<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
												<span className="text-[11px] text-white/80 uppercase tracking-wider">
													Explore
												</span>
												<span className="text-xs">→</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* NUEVA COLECCIÓN DESTACADA */}
				<section
					id="journal"
					className="py-20 border-b border-white/5 px-6 lg:px-12">
					<div className="max-w-7xl mx-auto">
						<div className="flex items-center justify-between mb-12">
							<h2 className="text-lg md:text-xl tracking-[0.2em] uppercase font-medium">
								Featured Stories
							</h2>
							<button className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
								Read Journal <span>→</span>
							</button>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							<div className="group bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-500">
								<div className="aspect-[16/9] bg-neutral-800/50" />
								<div className="p-8">
									<div className="flex items-center gap-3 mb-4">
										<span className="px-2 py-0.5 rounded-full border border-white/10 text-[10px] uppercase tracking-wider text-neutral-300">
											New Arrival
										</span>
										<span className="text-[10px] text-neutral-500 uppercase tracking-wider">
											Oct 24, 2023
										</span>
									</div>
									<h3 className="text-2xl font-medium mb-4 group-hover:text-neutral-200 transition-colors">
										House of M-Chip Collection 01
									</h3>
									<p className="text-sm text-neutral-400 leading-relaxed max-w-md mb-6">
										Una serie de MacBooks con chip M1 y M2 pensados para
										productividad y creatividad diaria. Performance meets efficiency.
									</p>
									<button className="text-[11px] tracking-[0.2em] uppercase border-b border-white/30 pb-0.5 hover:border-white transition-colors">
										Read Story
									</button>
								</div>
							</div>

							<div className="flex flex-col gap-8">
								<div className="flex-1 group bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-500 flex flex-col sm:flex-row">
									<div className="sm:w-2/5 bg-neutral-800/50 aspect-square sm:aspect-auto" />
									<div className="p-6 sm:p-8 flex flex-col justify-center">
										<span className="text-[10px] text-neutral-500 uppercase tracking-wider mb-3">
											Process
										</span>
										<h3 className="text-lg font-medium mb-3">
											How we grade every MacBook
										</h3>
										<p className="text-xs text-neutral-400 leading-relaxed mb-4">
											Te explicamos cómo revisamos, limpiamos y clasificamos cada
											equipo.
										</p>
										<span className="text-[10px] tracking-[0.2em] uppercase text-neutral-300 group-hover:text-white transition-colors">
											Learn more →
										</span>
									</div>
								</div>
								<div className="flex-1 group bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-500 flex flex-col sm:flex-row">
									<div className="sm:w-2/5 bg-neutral-800/50 aspect-square sm:aspect-auto" />
									<div className="p-6 sm:p-8 flex flex-col justify-center">
										<span className="text-[10px] text-neutral-500 uppercase tracking-wider mb-3">
											Guide
										</span>
										<h3 className="text-lg font-medium mb-3">
											Choosing the right chip
										</h3>
										<p className="text-xs text-neutral-400 leading-relaxed mb-4">
											M1, M1 Pro, M2... What do you really need for your workflow?
										</p>
										<span className="text-[10px] tracking-[0.2em] uppercase text-neutral-300 group-hover:text-white transition-colors">
											Read Guide →
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* NEWSLETTER & LIST */}
				<section
					id="about"
					className="py-24 px-6 lg:px-12">
					<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
						<div>
							<h2 className="text-3xl font-medium tracking-tight mb-4">
								Stay wild into your ideas.
							</h2>
							<p className="text-neutral-400 text-sm mb-8 max-w-xs leading-relaxed">
								Become a member & get 10% off on your first MacBook order. No spam, just quality.
							</p>
							<div className="flex items-center gap-4 border-b border-white/20 pb-4 max-w-md group focus-within:border-white transition-colors">
								<input
									type="email"
									placeholder="Email address"
									className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-600"
								/>
								<button className="text-[11px] tracking-[0.2em] uppercase hover:text-neutral-300 transition-colors">
									Subscribe
								</button>
							</div>
						</div>

						<div className="space-y-6">
							{coleccionesLista.map((coleccion, indice) => (
								<div
									key={indice}
									className="group flex items-center justify-between border-b border-white/5 py-4 hover:border-white/20 transition-colors">
									<div>
										<p className="text-sm font-medium mb-1 group-hover:text-white transition-colors">
											{coleccion.nombre}
										</p>
										<p className="text-xs text-neutral-500">
											{coleccion.texto}
										</p>
									</div>
									<span className="text-xs text-neutral-400 group-hover:text-white transition-colors">
										{coleccion.precio}
									</span>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>

			{/* FOOTER */}
			<footer className="border-t border-white/10 bg-black py-16 text-xs">
				<div className="max-w-7xl mx-auto px-6 lg:px-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
						<div className="md:col-span-1 space-y-4">
							<Link
								to="/"
								className="text-lg font-bold tracking-[0.2em] block">
								MACLINE FLEET
							</Link>
							<p className="text-neutral-500 leading-relaxed max-w-xs">
								Premium refurbished MacBooks.
								<br />
								Quality you can trust, prices you'll love.
							</p>
						</div>
						
						<div className="space-y-4">
							<h4 className="text-white font-medium uppercase tracking-wider text-[10px]">Shop</h4>
							<ul className="space-y-2 text-neutral-400">
								<li><a href="#" className="hover:text-white transition-colors">All MacBooks</a></li>
								<li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
								<li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
							</ul>
						</div>

						<div className="space-y-4">
							<h4 className="text-white font-medium uppercase tracking-wider text-[10px]">Company</h4>
							<ul className="space-y-2 text-neutral-400">
								<li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
								<li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
								<li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
							</ul>
						</div>

						<div className="space-y-4">
							<h4 className="text-white font-medium uppercase tracking-wider text-[10px]">Legal</h4>
							<ul className="space-y-2 text-neutral-400">
								<li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
								<li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
								<li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
							</ul>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-neutral-600">
						<p>© 2025 MacLine Fleet. All rights reserved.</p>
						<div className="flex gap-6 mt-4 md:mt-0">
							<a href="#" className="hover:text-neutral-400 transition-colors">Instagram</a>
							<a href="#" className="hover:text-neutral-400 transition-colors">Twitter</a>
							<a href="#" className="hover:text-neutral-400 transition-colors">LinkedIn</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Home;
