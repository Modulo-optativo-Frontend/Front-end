import { useState } from "react";
import { Link } from "react-router-dom";

function Registro() {
	const [datosRegistro, setDatosRegistro] = useState({
		nombre: "",
		email: "",
		password: "",
		repetirPassword: "",
	});

	const manejarCambio = (evento) => {
		const { name, value } = evento.target;
		setDatosRegistro({ ...datosRegistro, [name]: value });
	};

	const manejarEnvio = (evento) => {
		evento.preventDefault();
		console.log("Registro:", datosRegistro);
	};

	return (
		<div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				{/* Cabecera */}
				<div className="mb-10 text-center">
					<Link
						to="/"
						className="inline-flex items-center gap-2 justify-center mb-3">
						<span className="text-xs tracking-[0.25em] uppercase text-neutral-400">
							MACLINE
						</span>
					</Link>
					<h1 className="text-2xl font-semibold tracking-tight">
						Create account
					</h1>
					<p className="text-[11px] text-neutral-400 mt-2">
						Regístrate para guardar favoritos y seguir colecciones.
					</p>
				</div>

				{/* Card */}
				<div className="bg-neutral-900 border border-white/10 rounded-xl p-7 shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
					<form
						onSubmit={manejarEnvio}
						className="space-y-5 text-sm">
						<div>
							<label
								htmlFor="nombre"
								className="block text-[11px] font-medium uppercase tracking-[0.18em] mb-2">
								Full name
							</label>
							<input
								type="text"
								id="nombre"
								name="nombre"
								value={datosRegistro.nombre}
								onChange={manejarCambio}
								required
								className="w-full px-3 py-2.5 rounded-md bg-black border border-white/15 text-sm outline-none focus:border-white/40"
								placeholder="Adri Martínez"
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-[11px] font-medium uppercase tracking-[0.18em] mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={datosRegistro.email}
								onChange={manejarCambio}
								required
								className="w-full px-3 py-2.5 rounded-md bg-black border border-white/15 text-sm outline-none focus:border-white/40"
								placeholder="tucorreo@email.com"
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="password"
									className="block text-[11px] font-medium uppercase tracking-[0.18em] mb-2">
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									value={datosRegistro.password}
									onChange={manejarCambio}
									required
									className="w-full px-3 py-2.5 rounded-md bg-black border border-white/15 text-sm outline-none focus:border-white/40"
									placeholder="••••••••"
								/>
							</div>
							<div>
								<label
									htmlFor="repetirPassword"
									className="block text-[11px] font-medium uppercase tracking-[0.18em] mb-2">
									Confirm
								</label>
								<input
									type="password"
									id="repetirPassword"
									name="repetirPassword"
									value={datosRegistro.repetirPassword}
									onChange={manejarCambio}
									required
									className="w-full px-3 py-2.5 rounded-md bg-black border border-white/15 text-sm outline-none focus:border-white/40"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<div className="flex items-start gap-2 text-[11px] text-neutral-400">
							<input
								type="checkbox"
								className="mt-[3px] w-3 h-3 border-white/30 bg-black"
								required
							/>
							<p>
								I agree to the{" "}
								<button
									type="button"
									className="underline hover:text-white">
									Terms
								</button>{" "}
								and{" "}
								<button
									type="button"
									className="underline hover:text-white">
									Privacy Policy
								</button>
								.
							</p>
						</div>

						<button
							type="submit"
							className="w-full mt-2 py-2.5 bg-white text-black rounded-md text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-neutral-200 transition">
							Create account
						</button>
					</form>
				</div>

				<p className="mt-6 text-center text-[11px] text-neutral-400">
					¿Ya tienes cuenta?{" "}
					<Link
						to="/login"
						className="text-white hover:underline">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Registro;
