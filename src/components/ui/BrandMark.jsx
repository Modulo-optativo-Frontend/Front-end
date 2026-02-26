import { Link } from "react-router-dom";

export function BrandMark({ to = "/", className = "" }) {
	return (
		<Link
			to={to}
			className={`inline-flex items-center gap-2 ${className}`.trim()}>
			<span className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-black) text-xs font-semibold text-white">
				SL
			</span>
			<span className="text-sm font-semibold uppercase tracking-[0.2rem] text-black">
				SilverLine
			</span>
		</Link>
	);
}
