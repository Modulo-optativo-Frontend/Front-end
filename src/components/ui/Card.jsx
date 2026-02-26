export function Card({ className = "", children }) {
	return (
		<div className={`rounded-2xl border border-(--color-border) bg-white ${className}`.trim()}>
			{children}
		</div>
	);
}
