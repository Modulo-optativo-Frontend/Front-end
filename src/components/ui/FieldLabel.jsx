export function FieldLabel({ children }) {
	return (
		<label
			className={
				"mb-2 block text-sm font-medium text-(--color-gray-dark"
			}>
			{children}
		</label>
	);
}
