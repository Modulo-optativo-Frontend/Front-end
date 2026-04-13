export function Card({ children, className = "" }) {
	return (
		<div
			className={`border border-(--color-border) bg-(--color-surface) font-mono ${className}`}>
			{children}
		</div>
	);
}
