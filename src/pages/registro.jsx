import { Link } from "react-router-dom";

function Registro() {
	return (
		<div
			className="min-h-screen flex items-center justify-center px-4"
			style={{ backgroundColor: "var(--color-white)" }}>
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<Link
						to="/"
						className="inline-flex items-center gap-2 mb-6">
						<div
							className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold"
							style={{
								backgroundColor: "var(--color-black)",
								color: "var(--color-white)",
							}}>
							SL
						</div>
						<span
							className="text-sm font-semibold uppercase"
							style={{ letterSpacing: "0.2em", color: "var(--color-black)" }}>
							SilverLine
						</span>
					</Link>
					<h1
						className="text-3xl font-semibold mb-2"
						style={{ color: "var(--color-black)" }}>
						Crear cuenta
					</h1>
					<p
						className="text-sm"
						style={{ color: "var(--color-gray)" }}>
						Únete a SilverLine hoy mismo
					</p>
				</div>

				<form className="space-y-4">
					<div>
						<label
							className="block text-sm font-medium mb-2"
							style={{ color: "var(--color-gray-dark)" }}>
							Nombre completo
						</label>
						<input
							type="text"
							className="w-full rounded-lg focus:outline-none focus:ring-2 transition-all"
							placeholder="Juan Pérez"
							style={{
								padding: "10px 16px",
								border: "1px solid var(--color-border)",
							}}
						/>
					</div>

					<div>
						<label
							className="block text-sm font-medium mb-2"
							style={{ color: "var(--color-gray-dark)" }}>
							Email
						</label>
						<input
							type="email"
							className="w-full rounded-lg focus:outline-none focus:ring-2 transition-all"
							placeholder="tu@email.com"
							style={{
								padding: "10px 16px",
								border: "1px solid var(--color-border)",
							}}
						/>
					</div>

					<div>
						<label
							className="block text-sm font-medium mb-2"
							style={{ color: "var(--color-gray-dark)" }}>
							Contraseña
						</label>
						<input
							type="password"
							className="w-full rounded-lg focus:outline-none focus:ring-2 transition-all"
							placeholder="••••••••"
							style={{
								padding: "10px 16px",
								border: "1px solid var(--color-border)",
							}}
						/>
					</div>

					<button
						type="submit"
						className="w-full rounded-lg transition-colors hover:opacity-90 font-medium"
						style={{
							padding: "10px 16px",
							backgroundColor: "var(--color-blue)",
							color: "var(--color-white)",
						}}>
						Crear cuenta
					</button>
				</form>

				<p
					className="text-center text-sm mt-6"
					style={{ color: "var(--color-gray)" }}>
					¿Ya tienes cuenta?{" "}
					<Link
						to="/login"
						className="font-medium hover:opacity-80 transition-opacity"
						style={{ color: "var(--color-blue)" }}>
						Iniciar sesión
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Registro;
