export function Button({
	type = "button",
	onClick,
	children,
	disabled = false,
	variant = "primary",
	className = "",
}) {
	const baseClasses =
		"px-4 py-2 text-xs font-bold uppercase font-mono disabled:cursor-not-allowed disabled:opacity-60 border border-(--color-border)";

	const variantClasses =
		variant === "secondary"
			? "bg-(--color-surface) text-(--color-black) hover:bg-(--color-gray-light)"
			: "bg-(--color-accent) text-(--color-white) hover:bg-(--color-highlight) hover:text-(--color-black)";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${variantClasses} ${className}`.trim()}>
			{children}
		</button>
	);
}
