import { Link } from "react-router-dom";

function HeroSection({ heroImageUrl }) {
	return (
		<section className="font-mono border-b border-(--color-border)">
			{/* 000200 HERO-IDENTIFICATION-DIVISION */}
			<div className="border-b border-(--color-border) px-4 py-2">
				<p className="text-xs font-bold uppercase">
					000200 HERO-IDENTIFICATION-DIVISION
				</p>
				<p className="text-xs font-bold uppercase">
					000210 MODULE: REFURBISHED-MACBOOK-STORE........ STATUS: ACTIVE
				</p>
			</div>

			<div className="flex border-b border-(--color-border)">
				{/* TEXT COLUMN */}
				<div className="w-1/2 border-r border-(--color-border) p-8 flex flex-col justify-between">
					<div>
						<p className="text-xs font-bold uppercase mb-2">
							FIELD: TAGLINE-DATA
						</p>
						<div className="border-t border-dashed border-(--color-border) mb-4" />
						<h1 className=" text-2xl font-bold uppercase leading-tight text-(--color-black)">
							MACBOOKS
							<br />
							REACONDICIONADOS.
							<br />
							LISTOS PARA CREAR.
						</h1>
						<p className="hero-subtitle mt-4 text-xs uppercase">
							[ ] CERTIFICADO. CONECTAR Y CREAR.
						</p>
					</div>
					<div className="mt-8 border-t border-dashed border-(--color-border) pt-4">
						<p className="text-xs font-bold uppercase mb-3">
							000220 CTA-ACTION-SECTION
						</p>
						<div className="flex gap-0">
							<Link
								to="/catalogo"
								className="primary-btn border border-(--color-border) bg-(--color-accent) px-5 py-2 text-xs font-bold uppercase text-white hover:bg-(--color-highlight) hover:text-black">
								[+] IR-AL-CATALOGO
							</Link>
							<button
								type="button"
								className="secondary-btn -ml-px border border-(--color-border) px-5 py-2 text-xs font-bold uppercase hover:bg-(--color-gray-light)">
								[?] COMO-REVISAMOS
							</button>
						</div>
					</div>
				</div>

				{/* IMAGE COLUMN */}
				<div className="w-1/2 flex flex-col">
					<div className="border-b border-(--color-border) px-4 py-1">
						<p className="text-xs font-bold uppercase">
							000230 IMAGE-DATA-SECTION........ REF: HERO-IMG-01
						</p>
					</div>
					<div
						className="relative flex-1 bg-(--color-gray-light)"
						style={{ aspectRatio: "16/10" }}>
						{heroImageUrl ? (
							<img
								src={heroImageUrl}
								alt="MacBook destacado de SilverLine"
								className="absolute inset-0 h-full w-full object-cover"
							/>
						) : (
							<div className="flex h-full items-center justify-center text-xs uppercase tracking-widest">
								[NO-IMAGE-DATA]
							</div>
						)}
						<div className="absolute left-0 bottom-0 border-t border-r border-(--color-border) bg-(--color-accent) px-3 py-1">
							<p className="bauhaus-chip text-xs font-bold uppercase text-(--color-white)">
								* DESTACADO *
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
