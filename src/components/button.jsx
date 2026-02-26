export function Button({ funcion, accionDelBoton }) {
	return (
		<button
			className="relative rounded-full border border-gray-300 px-4 py-2 text-xs text-gray-700 hover:opacity-80"
			onClick={funcion}>
			<span className="flex h-5 min-w-20 items-center justify-center rounded-full bg-black text-white text-[10px] font-semibold">
				{accionDelBoton}
			</span>
		</button>
	);
}
