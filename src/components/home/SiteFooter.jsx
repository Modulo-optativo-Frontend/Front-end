function SiteFooter() {
	return (
		<footer className="font-mono border-t border-(--color-border) bg-(--color-surface)">
			<div className="flex w-full items-center justify-between px-4 py-2 text-xs">
				<p className="font-bold uppercase">000900 END-OF-PROGRAM</p>
				<div className="flex gap-0">
					<a
						href="#"
						className="border border-(--color-border) px-3 py-1 font-bold uppercase hover:bg-(--color-gray-light)">
						PRIVACIDAD
					</a>
					<a
						href="#"
						className="-ml-px border border-(--color-border) px-3 py-1 font-bold uppercase hover:bg-(--color-gray-light)">
						TERMINOS
					</a>
					<a
						href="#"
						className="-ml-px border border-(--color-border) px-3 py-1 font-bold uppercase hover:bg-(--color-gray-light)">
						CONTACTO
					</a>
				</div>
			</div>
			<div className="border-t border-(--color-border) px-4 pt-3 pb-2">
				<div className="flex h-8 items-stretch gap-px overflow-hidden">
					{[
						2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 3, 2, 1, 3, 4, 2,
						1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2,
						1, 4, 3, 2,
					].map((w, i) => (
						<div
							key={i}
							style={{ width: `${w * 3}px` }}
							className="bg-black"
						/>
					))}
				</div>
				<p className="mt-1 text-center text-xs tracking-[0.5em]">
					*SILVERLINE-MACBOOKS-REACONDICIONADOS*
				</p>
			</div>
		</footer>
	);
}

export default SiteFooter;
