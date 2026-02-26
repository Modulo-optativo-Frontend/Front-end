export function Button({
	type = "button",
	onClick,
	children,
	disabled = false,
	variant = "primary",
	className = "",
}) {
	const baseClasses =
		"rounded-full px-4 py-2 text-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-60";

	const variantClasses =
		variant === "secondary"
			? "border border-(--color-border) text-(--color-gray-dark)"
			: "bg-(--color-blue) text-white";

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
