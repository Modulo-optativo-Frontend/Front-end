import { Link } from "react-router-dom";

function SiteHeader({ token, handleLogout }) {
	return (
		<header className="sl-header border-b border-(--color-border) bg-[rgba(245,245,247,0.8)] backdrop-blur-md">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-black) text-xs font-semibold text-white">
						SL
					</div>
					<span className="text-black text-sm font-semibold uppercase tracking-[0.2rem]">
						SilverLine
					</span>
				</Link>

				<nav className="hidden items-center gap-6 text-sm text-(--color-gray) md:flex">
					<a href="#macs" className="text-(--color-gray-dark) transition-colors hover:opacity-80">
						MacBooks
					</a>
					<a href="#why" className="text-(--color-gray-dark) transition-colors hover:opacity-80">
						Por qué SilverLine
					</a>
					<Link to="/catalogo" className="text-(--color-gray-dark) transition-colors hover:opacity-80">
						Catálogo
					</Link>
				</nav>

				<div className="flex items-center gap-3 text-sm relative">
					<Link
						to="/carrito"
						className="secondary-btn rounded-full px-3 py-1.5 text-xs transition-colors hover:opacity-90">
						Carrito
					</Link>

					{token ? (
						<button
							type="button"
							onClick={handleLogout}
							className="secondary-btn rounded-full px-4 py-2 text-sm transition-colors hover:opacity-90">
							Logout
						</button>
					) : (
						<>
							<Link to="/login" className="text-(--color-gray-dark) transition-colors hover:opacity-80">
								Iniciar sesión
							</Link>
							<Link
								to="/registro"
								className="primary-btn rounded-full px-4 py-2 text-sm transition-colors hover:opacity-90">
								Crear cuenta
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}

export default SiteHeader;
