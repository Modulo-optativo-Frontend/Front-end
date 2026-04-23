export function SiteFooter() {
	return (
		<footer className="border-t border-(--color-border) bg-black/10">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-[11px] uppercase tracking-[0.22em] text-(--color-gray) md:flex-row">
				<p>© {new Date().getFullYear()} SilverLine Mission Commerce</p>
				<div className="flex gap-4 text-(--color-gray-dark)">
					<a href="#" aria-label="Política de privacidad">Privacidad</a>
					<a href="#" aria-label="Términos y condiciones">Términos</a>
					<a href="#" aria-label="Contactar con SilverLine">Contacto</a>
				</div>
			</div>
		</footer>
	);
}
