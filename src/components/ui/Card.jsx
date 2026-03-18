export function Card({ children, className = "" }) {
	return (
		<div
			className={`rounded-2xl border border-(--color-border) bg-white ${className}`}>
			{children}
		</div>
	);
}
