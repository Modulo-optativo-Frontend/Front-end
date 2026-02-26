import { Link } from "react-router-dom";

function HeroSection({ heroImageUrl }) {
	return (
		<section className="border-b border-(--color-border)">
			<div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
				<div className="max-w-2xl">
					<p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-(--color-blue)">
						REFURBISHED MACBOOK STORE
					</p>
					<h1 className="hero-title mb-4 text-4xl font-semibold tracking-tight text-black md:text-5xl">
						MacBooks reacondicionados. Listos para crear.
					</h1>
					<p className="hero-subtitle mb-6 text-sm text-(--color-gray) md:text-base">
						Certificado. Conectar y crear.
					</p>
					<div className="flex flex-wrap gap-3">
						<Link
							to="/catalogo"
							className="primary-btn rounded-full px-5 py-2.5 text-sm transition-colors hover:opacity-90">
							Ir al catálogo completo
						</Link>
						<button
							type="button"
							className="secondary-btn rounded-full border border-(--color-border) px-5 py-2.5 text-sm text-black transition-colors hover:opacity-80">
							Cómo revisamos cada equipo
						</button>
					</div>
				</div>
				<div className="product-card p-3 md:p-4">
					<div className="relative overflow-hidden rounded-2xl bg-(--color-gray-light)" style={{ aspectRatio: "16/10" }}>
						{heroImageUrl ? (
							<img
								src={heroImageUrl}
								alt="MacBook destacado de SilverLine"
								className="absolute inset-0 h-full w-full object-cover"
							/>
						) : null}
						<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.35)_100%)]" />
						<div className="absolute left-4 bottom-4 text-white">
							<p className="text-xs uppercase tracking-[0.2em] opacity-90 bauhaus-chip inline-block px-2 py-1">Destacado</p>
							<p className="text-lg font-semibold mt-2">MacBook reacondicionado premium</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
