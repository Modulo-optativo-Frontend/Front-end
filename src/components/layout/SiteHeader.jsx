import { Button } from "../ui/Button.jsx";
import { Link } from "../ui/Link.jsx";

export function SiteHeader({ authToken, onLogout, dash }) {
	const navButtonClasses =
		"relative inline-flex min-h-[2.9rem] items-center justify-center gap-[0.65rem] border border-line bg-[rgba(11,21,46,0.66)] px-[1.15rem] py-3 font-['Oxanium','Arial_Narrow',sans-serif] text-[0.78rem] font-bold uppercase tracking-[0.18em] text-ink transition-[transform,border-color,background-color,color,box-shadow] duration-180 ease-in hover:-translate-y-px hover:border-signal/60 hover:bg-[rgba(14,28,60,0.88)] hover:text-signal";

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
					variant="plain"
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
						className={navButtonClasses}>
						[MACBOOKS]
					</a>
					<a
						href="#why"
						className={`-ml-px ${navButtonClasses}`}>
						[POR-QUE]
					</a>
					<Link
						to="/catalogo"
						variant="secondary"
						className={`-ml-px ${navButtonClasses}`}>
						[CATALOGO]
					</Link>
				</nav>

				<div className="flex items-center gap-0 text-xs">
					<Link
						to="/carrito"
						variant="secondary"
						className="min-h-0 px-4 py-2 text-xs">
						[CARRITO]
					</Link>
					{authToken ? (
						<>
							<Link
								to="/mis-pedidos"
								variant="secondary"
								className="-ml-px min-h-0 px-4 py-2 text-xs">
								[MIS PEDIDOS]
							</Link>
							<Button
								variant="secondary"
								onClick={onLogout}
								className="-ml-px min-h-0 px-4 py-2 text-xs">
								[LOGOUT]
							</Button>
							{dash ? (
								<Button
									onClick={dash}
									className="-ml-px border border-(--color-border) px-5 py-2 text-xs font-bold uppercase">
									[U] MI-CUENTA
								</Button>
							) : null}
						</>
					) : (
						<>
							<Link
								to="/login"
								variant="secondary"
								className="-ml-px min-h-0 px-4 py-2 text-xs">
								[LOGIN]
							</Link>
							<Link
								to="/registro"
								variant="primary"
								className="-ml-px min-h-0 px-4 py-2 text-xs">
								[REGISTRO]
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
