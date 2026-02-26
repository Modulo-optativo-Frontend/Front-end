import { Link } from "react-router-dom";
import { BrandMark } from "../ui/BrandMark.jsx";
import { Button } from "../ui/Button.jsx";

export function SiteHeader({ authToken, onLogout }) {
	return (
		<header className="border-b border-(--color-border) bg-white/90 backdrop-blur-md">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
				<BrandMark />

				<nav className="hidden items-center gap-6 text-sm text-(--color-gray-dark) md:flex">
					<Link to="/">Inicio</Link>
					<Link to="/catalogo">Catálogo</Link>
					<Link to="/carrito">Carrito</Link>
				</nav>

				<div className="flex items-center gap-3 text-sm">
					<Link to="/carrito" className="text-(--color-gray-dark)">
						Carrito
					</Link>
					{authToken ? (
						<Button variant="secondary" onClick={onLogout}>
							Logout
						</Button>
					) : (
						<>
							<Link to="/login" className="text-(--color-gray-dark)">
								Login
							</Link>
							<Link to="/registro" className="text-(--color-blue)">
								Registro
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
