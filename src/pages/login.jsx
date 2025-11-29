import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
	const [datosLogin, setDatosLogin] = useState({
		email: "",
		password: "",
	});
	const [mostrarPassword, setMostrarPassword] = useState(false);

	const manejarCambio = (evento) => {
		const { name, value } = evento.target;
		setDatosLogin({ ...datosLogin, [name]: value });
	};

	const manejarEnvio = (evento) => {
		evento.preventDefault();
		console.log("Login:", datosLogin);
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
					<h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
					<p className="text-[11px] text-neutral-400 mt-2">
						Accede a tu cuenta para gestionar tus MacBooks.
					</p>
				</div>

				{/* Card */}
				<div className="bg-neutral-900 border border-white/10 rounded-xl p-7 shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
					<form
						onSubmit={manejarEnvio}
						className="space-y-5 text-sm">
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
								value={datosLogin.email}
								onChange={manejarCambio}
								required
								className="w-full px-3 py-2.5 rounded-md bg-black border border-white/15 text-sm outline-none focus:border-white/40"
								placeholder="tucorreo@email.com"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-[11px] font-medium uppercase tracking-[0.18em] mb-2">
								Password
							</label>
							<div className="relative">
								<input
									type={mostrarPassword ? "text" : "password"}
									id="password"
									name="password"
									value={datosLogin.password}
									onChange={manejarCambio}
									required
									className="w-full px-3 py-2.5 pr-12 rounded-md bg-black border border-white/15 text-sm outline-none focus:border-white/40"
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setMostrarPassword((previo) => !previo)}
									className="absolute inset-y-0 right-0 px-3 text-[11px] text-neutral-400 hover:text-white">
									{mostrarPassword ? "Hide" : "Show"}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between text-[11px] text-neutral-400">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									className="w-3 h-3 border-white/30 bg-black"
								/>
								<span>Remember me</span>
							</label>
							<button
								type="button"
								className="hover:text-white">
								Forgot password?
							</button>
						</div>

						<button
							type="submit"
							className="w-full mt-2 py-2.5 bg-white text-black rounded-md text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-neutral-200 transition">
							Sign in
						</button>
					</form>
				</div>

				<p className="mt-6 text-center text-[11px] text-neutral-400">
					¿Aún no tienes cuenta?{" "}
					<Link
						to="/registro"
						className="text-white hover:underline">
						Crea una ahora
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
