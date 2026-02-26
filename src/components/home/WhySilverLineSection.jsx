function WhySilverLineSection() {
	return (
		<section id="why" className="border-b border-(--color-border)">
			<div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-(--color-gray-dark)">
						Por qué SilverLine
					</h2>
					<p className="text-sm text-(--color-gray)">
						Una experiencia cercana al producto nuevo, con precios realmente ajustados y garantía.
					</p>
				</div>
				<div className="space-y-4 text-sm text-(--color-gray)">
					<p>
						<span className="font-medium text-black">Revisión completa</span>{" "}
						de hardware, puertos, teclado, pantalla y batería en cada equipo.
					</p>
					<p>
						<span className="font-medium text-black">Configuración limpia</span>{" "}
						con la última versión compatible de macOS listo para usar.
					</p>
				</div>
				<div className="space-y-4 text-sm text-(--color-gray)">
					<p>
						<span className="font-medium text-black">Garantía incluida</span>{" "}
						y opción de ampliarla si quieres más tranquilidad.
					</p>
					<p>
						<span className="font-medium text-black">Envío rápido y seguro</span>{" "}
						con embalaje reforzado y seguimiento.
					</p>
				</div>
			</div>
		</section>
	);
}

export default WhySilverLineSection;
