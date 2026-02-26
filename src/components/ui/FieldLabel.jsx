import { cn } from "../../lib/cn.js";

export function FieldLabel({ className, children, ...props }) {
	return (
		<label
			className={cn("mb-2 block text-sm font-medium text-(--color-gray-dark)", className)}
			{...props}>
			{children}
		</label>
	);
}
