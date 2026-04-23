export function Button({
	type = "button",
	onClick,
	children,
	disabled = false,
	variant = "primary",
	className = "",
	ariaLabel,
}) {
	const baseClasses =
		"relative inline-flex min-h-[2.9rem] items-center justify-center gap-[0.65rem] px-[1.15rem] py-3 font-['Oxanium','Arial_Narrow',sans-serif] text-[0.78rem] font-bold uppercase tracking-[0.18em] transition-[transform,border-color,background-color,color,box-shadow] duration-180 ease-in disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none disabled:shadow-none";

	const variantClasses =
		variant === "secondary"
			? "border border-line bg-[rgba(11,21,46,0.66)] text-ink hover:-translate-y-px hover:border-signal/60 hover:bg-[rgba(14,28,60,0.88)] hover:text-signal"
			: "border border-line bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] text-space shadow-[0_10px_30px_rgba(255,107,61,0.28)] hover:-translate-y-px hover:border-signal/60 hover:bg-[linear-gradient(135deg,#ff8752,#ffd27b)] hover:shadow-[0_14px_36px_rgba(255,107,61,0.34)]";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
			className={`${baseClasses} ${variantClasses} ${className}`.trim()}>
			{children}
		</button>
	);
}
