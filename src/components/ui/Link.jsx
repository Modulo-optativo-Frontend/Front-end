import { Link as RouterLink } from "react-router-dom";

export function Link({
	to,
	children,
	variant = "plain",
	className = "",
	...props
}) {
	const baseClasses =
		"transition-[transform,border-color,background-color,color,box-shadow] duration-180 ease-in";

	const variantClasses = {
		primary:
			"relative inline-flex min-h-[2.9rem] items-center justify-center gap-[0.65rem] border border-line bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] px-[1.15rem] py-3 font-['Oxanium','Arial_Narrow',sans-serif] text-[0.78rem] font-bold uppercase tracking-[0.18em] text-space shadow-[0_10px_30px_rgba(255,107,61,0.28)] hover:-translate-y-px hover:border-signal/60 hover:bg-[linear-gradient(135deg,#ff8752,#ffd27b)] hover:shadow-[0_14px_36px_rgba(255,107,61,0.34)]",
		secondary:
			"relative inline-flex min-h-[2.9rem] items-center justify-center gap-[0.65rem] border border-line bg-[rgba(11,21,46,0.66)] px-[1.15rem] py-3 font-['Oxanium','Arial_Narrow',sans-serif] text-[0.78rem] font-bold uppercase tracking-[0.18em] text-ink hover:-translate-y-px hover:border-signal/60 hover:bg-[rgba(14,28,60,0.88)] hover:text-signal",
		ghost:
			"inline-flex items-center justify-center rounded-full border border-transparent px-3 py-2 hover:border-border hover:bg-white/5",
		text:
			"inline-flex items-center gap-1 font-bold underline underline-offset-4 text-warning hover:text-signal",
		plain: "",
	}[variant];

	return (
		<RouterLink
			to={to}
			className={`${baseClasses} ${variantClasses} ${className}`.trim()}
			{...props}>
			{children}
		</RouterLink>
	);
}
