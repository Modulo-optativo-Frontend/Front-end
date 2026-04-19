export function Button({
	type = "button",
	onClick,
	children,
	disabled = false,
	variant = "primary",
	className = "",
}) {
	const baseClasses =
		"px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60";

	const variantClasses =
		variant === "secondary" ? "secondary-btn" : "primary-btn";

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
