import { Link } from "react-router-dom";

export function BrandMark({ to = "/", className = "" }) {
	return (
		<Link
			to={to}
			className={`inline-flex items-center gap-2 font-mono no-underline ${className}`.trim()}>
			<span className="flex h-8 w-8 items-center justify-center border border-(--color-border) bg-(--color-accent) text-xs font-bold text-(--color-white)">
				SL
			</span>
			<span className="text-sm font-bold uppercase tracking-widest text-(--color-black)">
				SILVERLINE
			</span>
		</Link>
	);
}
