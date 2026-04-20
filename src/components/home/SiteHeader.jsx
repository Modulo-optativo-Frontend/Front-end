import { Link } from "react-router-dom";

function SiteHeader({ token, handleLogout }) {
	return (
		<header className="sl-header font-mono border-b border-(--color-border) bg-(--color-surface)">
			<div className="border-b border-(--color-border) px-4 py-1">
				<p className="text-xs font-bold uppercase">
					000100 SYS-HEADER-DIVISION............... SILVERLINE-OS V1.0
				</p>
			</div>
			<div className="flex w-full items-center justify-between px-4 py-2">
				<Link
					to="/"
					className="inline-flex items-center gap-2">
					<span className="flex h-8 w-8 items-center justify-center border border-(--color-border) bg-(--color-black) text-xs font-bold text-(--color-white)">
						SL
					</span>
					<span className="text-sm font-bold uppercase tracking-widest text-(--color-black)">
						SILVERLINE
					</span>
				</Link>

				<nav className="hidden items-center gap-0 text-xs md:flex">
					<a
						href="#macs"
						className="border border-(--color-border) px-4 py-2 font-bold uppercase hover:bg-(--color-gray-light)">
						[MACBOOKS]
					</a>
					<a
						href="#why"
						className="-ml-px border border-(--color-border) px-4 py-2 font-bold uppercase hover:bg-(--color-gray-light)">
						[POR-QUE]
					</a>
					<Link
						to="/catalogo"
						className="-ml-px border border-(--color-border) px-4 py-2 font-bold uppercase hover:bg-(--color-gray-light)">
						[CATALOGO]
					</Link>
				</nav>

				<div className="flex items-center gap-0 text-xs">
					<Link
						to="/carrito"
						className="border border-(--color-border) px-4 py-2 font-bold uppercase hover:bg-(--color-gray-light)">
						[CARRITO]
					</Link>
					{token ? (
						<>
							<Link
								to="/mis-pedidos"
								className="-ml-px border border-(--color-border) px-4 py-2 font-bold uppercase hover:bg-(--color-gray-light)">
								[MIS PEDIDOS]
							</Link>
							<button
								type="button"
								onClick={handleLogout}
								className="-ml-px border border-(--color-border) px-4 py-2 font-bold uppercase hover:bg-(--color-gray-light)">
								[LOGOUT]
							</button>
						</>
					) : (
						<>
							<Link
								to="/login"
								className="-ml-px border border-(--color-border) px-4 py-2 font-bold uppercase hover:bg-(--color-gray-light)">
								[LOGIN]
							</Link>
							<Link
								to="/registro"
								className="-ml-px border border-(--color-border) bg-(--color-accent) px-4 py-2 font-bold uppercase text-(--color-white) hover:bg-(--color-highlight) hover:text-(--color-black)">
								[REGISTRO]
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}

export default SiteHeader;
