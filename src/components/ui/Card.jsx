export function Card({ children }) {
	return (
		<div
			className={`rounded-2xl border border-(--color-border) bg-white }`}>
			{children}
		</div>
	);
}
