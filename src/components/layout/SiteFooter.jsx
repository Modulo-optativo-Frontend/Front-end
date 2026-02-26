export function SiteFooter() {
	return (
		<footer className="border-t border-(--color-border)">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-(--color-gray) md:flex-row">
				<p>© {new Date().getFullYear()} SilverLine</p>
				<div className="flex gap-4 text-(--color-gray-dark)">
					<a href="#">Privacidad</a>
					<a href="#">Términos</a>
					<a href="#">Contacto</a>
				</div>
			</div>
		</footer>
	);
}
