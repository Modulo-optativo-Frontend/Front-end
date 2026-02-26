export function FeedbackMessage({ message, successMatch = "añadido", className = "text-sm", mt = "" }) {
	if (!message) return null;

	const messageColorClass = message.includes(successMatch)
		? "text-[#0a7f39]"
		: "text-(--color-error)";

	return (
		<p
			className={`${className} ${mt} ${messageColorClass}`.trim()}>
			{message}
		</p>
	);
}
