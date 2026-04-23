export function FeedbackMessage({
	message,
	successMatch = "añadido",
	className = "text-sm",
	mt = "",
}) {
	if (!message) return null;

	const isSuccess = message.toLowerCase().includes(successMatch.toLowerCase());
	const wrapperClass = isSuccess ? "sl-status" : "sl-alert";
	const titleClass = isSuccess ? "sl-status-title" : "sl-alert-title";
	const copyClass = isSuccess ? "sl-status-copy" : "sl-alert-copy";

	return (
		<div
			className={`${wrapperClass} ${className} ${mt}`.trim()}
			role={isSuccess ? "status" : "alert"}
			aria-live={isSuccess ? "polite" : "assertive"}
			aria-atomic="true">
			<span className={titleClass}>
				{isSuccess ? "Operación completada" : "Atención"}
			</span>
			<span className={copyClass}>{message}</span>
		</div>
	);
}
