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
		<div className="min-h-screen bg-black text-white flex items-center justify-center px-6 font-sans selection:bg-white/20">
			<div className="max-w-md w-full">
				{/* Cabecera */}
				<div className="mb-12 text-center">
					<Link
						to="/"
						className="inline-flex items-center gap-2 justify-center mb-6 hover:opacity-80 transition-opacity">
						<span className="text-sm font-bold tracking-[0.25em] uppercase text-white">
							MACLINE FLEET
						</span>
					</Link>
					<h1 className="text-3xl font-medium tracking-tight mb-3">
						Create account
					</h1>
					<p className="text-sm text-neutral-400">
						Join us to save favorites and track collections.
					</p>
				</div>

				{/* Card */}
				<div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
					<form
						onSubmit={manejarEnvio}
						className="space-y-6">
						<div className="space-y-2">
							<label
								htmlFor="nombre"
								className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300">
								Full Name
							</label>
							<input
								type="text"
								id="nombre"
								name="nombre"
								value={datosRegistro.nombre}
								onChange={manejarCambio}
								required
								className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-sm placeholder:text-neutral-600 focus:border-white/30 focus:bg-black focus:ring-1 focus:ring-white/30 outline-none transition-all duration-300"
								placeholder="Adri Martínez"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={datosRegistro.email}
								onChange={manejarCambio}
								required
								className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-sm placeholder:text-neutral-600 focus:border-white/30 focus:bg-black focus:ring-1 focus:ring-white/30 outline-none transition-all duration-300"
								placeholder="name@example.com"
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300">
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									value={datosRegistro.password}
									onChange={manejarCambio}
									required
									className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-sm placeholder:text-neutral-600 focus:border-white/30 focus:bg-black focus:ring-1 focus:ring-white/30 outline-none transition-all duration-300"
									placeholder="••••••••"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="repetirPassword"
									className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300">
									Confirm
								</label>
								<input
									type="password"
									id="repetirPassword"
									name="repetirPassword"
									value={datosRegistro.repetirPassword}
									onChange={manejarCambio}
									required
									className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-sm placeholder:text-neutral-600 focus:border-white/30 focus:bg-black focus:ring-1 focus:ring-white/30 outline-none transition-all duration-300"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<input
								type="checkbox"
								id="terms"
								className="mt-1 w-4 h-4 rounded border-white/20 bg-black/50 text-white focus:ring-0 focus:ring-offset-0 checked:bg-white checked:border-white transition-colors cursor-pointer"
								required
							/>
							<label htmlFor="terms" className="text-xs text-neutral-400 select-none leading-relaxed">
								I agree to the{" "}
								<button
									type="button"
									className="text-white hover:text-neutral-300 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
									Terms
								</button>{" "}
								and{" "}
								<button
									type="button"
									className="text-white hover:text-neutral-300 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
									Privacy Policy
								</button>
								.
							</label>
						</div>

						<button
							type="submit"
							className="w-full py-3.5 bg-white text-black rounded-lg text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-200 transition-colors duration-300 mt-2">
							Create account
						</button>
					</form>
				</div>

				<p className="mt-8 text-center text-xs text-neutral-500">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-white hover:text-neutral-300 transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Registro;

