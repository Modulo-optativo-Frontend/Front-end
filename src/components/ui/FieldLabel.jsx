export function FieldLabel({ children, htmlFor }) {
	return (
		<label
			htmlFor={htmlFor}
			className={"mb-2 block text-sm font-medium text-(--color-gray-dark"}>
			{children}
		</label>
	);
}
