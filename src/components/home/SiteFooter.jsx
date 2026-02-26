function SiteFooter() {
	return (
		<footer className="border-t border-(--color-border)">
			<div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-(--color-gray) md:flex-row">
				<p>© {new Date().getFullYear()} SilverLine. MacBooks reacondicionados.</p>
				<div className="flex gap-4">
					<a href="#" className="text-(--color-gray-dark) transition-opacity hover:opacity-70">Privacidad</a>
					<a href="#" className="text-(--color-gray-dark) transition-opacity hover:opacity-70">Términos</a>
					<a href="#" className="text-(--color-gray-dark) transition-opacity hover:opacity-70">Contacto</a>
				</div>
			</div>
		</footer>
	);
}

export default SiteFooter;
