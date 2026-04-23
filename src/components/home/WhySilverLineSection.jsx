function WhySilverLineSection() {
	return (
		<section
			id="why"
			aria-label="Por qué SilverLine"
			className="font-mono border-b border-(--color-border)">
			<div
				aria-hidden="true"
				className="border-b border-(--color-border) px-4 py-2">
				<p className="text-xs font-bold uppercase">
					000800 WHY-SILVERLINE-DIVISION
				</p>
			</div>
			<div className="flex border-b border-(--color-border)">
				<div className="w-1/3 border-r border-black p-6">
					<p
						aria-hidden="true"
						className="text-xs font-bold uppercase mb-2">
						FIELD: DESCRIPCION-MODULO
					</p>
					<div className="border-t border-dashed border-black mb-3" />
					<p className="text-xs uppercase leading-relaxed">
						UNA EXPERIENCIA CERCANA AL PRODUCTO NUEVO, CON PRECIOS REALMENTE
						AJUSTADOS Y GARANTIA.
					</p>
				</div>
				<div className="w-1/3 border-r border-black p-6">
					<p
						aria-hidden="true"
						className="text-xs font-bold uppercase mb-2">
						FIELD: SERVICIOS-A
					</p>
					<div className="border-t border-dashed border-black mb-3" />
					<div className="space-y-3 text-xs uppercase leading-relaxed">
						<p>
							<span className="font-bold">[*] REVISION-COMPLETA</span> DE
							HARDWARE, PUERTOS, TECLADO, PANTALLA Y BATERIA.
						</p>
						<p>
							<span className="font-bold">[*] CONFIGURACION-LIMPIA</span> CON
							ULTIMA VERSION COMPATIBLE DE MACOS.
						</p>
					</div>
				</div>
				<div className="w-1/3 p-6">
					<p
						aria-hidden="true"
						className="text-xs font-bold uppercase mb-2">
						FIELD: SERVICIOS-B
					</p>
					<div className="border-t border-dashed border-black mb-3" />
					<div className="space-y-3 text-xs uppercase leading-relaxed">
						<p>
							<span className="font-bold">[*] GARANTIA-INCLUIDA</span> Y OPCION
							DE AMPLIARLA.
						</p>
						<p>
							<span className="font-bold">[*] ENVIO-RAPIDO-SEGURO</span> CON
							EMBALAJE REFORZADO Y SEGUIMIENTO.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default WhySilverLineSection;
