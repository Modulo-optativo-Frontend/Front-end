import { Link } from "../ui/Link.jsx";
import { BrandMark } from "../ui/BrandMark.jsx";
import { Button } from "../ui/Button.jsx";

export function SiteHeader({ authToken, onLogout }) {
	const navItemClasses =
		"min-h-0 rounded-none px-3 py-2 text-xs font-bold uppercase tracking-[0.18em]";

	return (
		<header className="sl-header">
			<div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
				<BrandMark />

				<nav
					aria-label="Navegación principal"
					className="hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-(--color-gray-dark) md:flex">
					<Link
						to="/"
						variant="secondary"
						className={navItemClasses}>
						Inicio
					</Link>
					<Link
						to="/catalogo"
						variant="secondary"
						className={navItemClasses}>
						Catálogo
					</Link>
					<Link
						to="/carrito"
						variant="secondary"
						className={navItemClasses}>
						Carrito
					</Link>
					{authToken ? (
						<Link
							to="/mis-pedidos"
							variant="secondary"
							className={navItemClasses}>
							Mis pedidos
						</Link>
					) : null}
				</nav>

				<div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-(--color-gray-dark)">
					<Link
						to="/carrito"
						variant="secondary"
						className={`${navItemClasses} text-muted`}>
						Carrito
					</Link>
					{authToken ? (
						<Button
							variant="secondary"
							onClick={onLogout}>
							Logout
						</Button>
					) : (
						<>
							<Link
								to="/login"
								variant="plain"
								className="hover:text-signal">
								Login
							</Link>
							<Link
								to="/registro"
								variant="plain"
								className="text-blue hover:text-warning">
								Registro
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
