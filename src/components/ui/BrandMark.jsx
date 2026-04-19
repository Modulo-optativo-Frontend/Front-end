import { Link } from "react-router-dom";

export function BrandMark({ to = "/", className = "" }) {
	return (
		<Link
			to={to}
			className={`inline-flex items-center gap-3 font-mono no-underline ${className}`.trim()}>
			<span className="flex h-9 w-9 items-center justify-center border border-(--color-border) bg-[linear-gradient(135deg,var(--color-accent),var(--color-warning))] text-[11px] font-bold tracking-[0.25em] text-(--color-white) shadow-[0_0_22px_rgba(255,107,61,0.25)]">
				SL
			</span>
			<span className="flex flex-col leading-none">
				<span className="display-font text-sm font-bold tracking-[0.35em] text-(--color-black)">
					SILVERLINE
				</span>
				<span className="text-[9px] uppercase tracking-[0.32em] text-(--color-gray)">
					Orbital Goods Division
				</span>
			</span>
		</Link>
	);
}
