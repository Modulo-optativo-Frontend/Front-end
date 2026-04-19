import { Link } from "react-router-dom";
import { BrandMark } from "../ui/BrandMark.jsx";
import { Button } from "../ui/Button.jsx";

export function SiteHeader({ authToken, onLogout }) {
	return (
		<header className="sl-header">
			<div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
				<BrandMark />

				<nav className="hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-(--color-gray-dark) md:flex">
					<Link
						to="/"
						className="rounded-full border border-transparent px-3 py-2 hover:border-(--color-border) hover:bg-white/5">
						Inicio
					</Link>
					<Link
						to="/catalogo"
						className="rounded-full border border-transparent px-3 py-2 hover:border-(--color-border) hover:bg-white/5">
						Catálogo
					</Link>
					<Link
						to="/carrito"
						className="rounded-full border border-transparent px-3 py-2 hover:border-(--color-border) hover:bg-white/5">
						Carrito
					</Link>
				</nav>

				<div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-(--color-gray-dark)">
					<Link
						to="/carrito"
						className="rounded-full border border-(--color-border) px-3 py-2 text-(--color-muted) hover:text-(--color-signal)">
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
								className="text-(--color-gray-dark) hover:text-(--color-signal)">
								Login
							</Link>
							<Link
								to="/registro"
								className="text-(--color-blue) hover:text-(--color-warning)">
								Registro
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
