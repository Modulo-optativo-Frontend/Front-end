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
					<h1 className="text-3xl font-medium tracking-tight mb-3">Welcome back</h1>
					<p className="text-sm text-neutral-400">
						Enter your credentials to access your account.
					</p>
				</div>

				{/* Card */}
				<div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
					<form
						onSubmit={manejarEnvio}
						className="space-y-6">
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
								value={datosLogin.email}
								onChange={manejarCambio}
								required
								className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-sm placeholder:text-neutral-600 focus:border-white/30 focus:bg-black focus:ring-1 focus:ring-white/30 outline-none transition-all duration-300"
								placeholder="name@example.com"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300">
									Password
								</label>
								<button
									type="button"
									className="text-[10px] uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">
									Forgot password?
								</button>
							</div>
							<div className="relative">
								<input
									type={mostrarPassword ? "text" : "password"}
									id="password"
									name="password"
									value={datosLogin.password}
									onChange={manejarCambio}
									required
									className="w-full px-4 py-3 pr-12 rounded-lg bg-black/50 border border-white/10 text-sm placeholder:text-neutral-600 focus:border-white/30 focus:bg-black focus:ring-1 focus:ring-white/30 outline-none transition-all duration-300"
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setMostrarPassword((previo) => !previo)}
									className="absolute inset-y-0 right-0 px-4 text-[10px] uppercase tracking-wider text-neutral-500 hover:text-white transition-colors">
									{mostrarPassword ? "Hide" : "Show"}
								</button>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id="remember"
								className="w-4 h-4 rounded border-white/20 bg-black/50 text-white focus:ring-0 focus:ring-offset-0 checked:bg-white checked:border-white transition-colors cursor-pointer"
							/>
							<label htmlFor="remember" className="text-xs text-neutral-400 select-none cursor-pointer">
								Keep me signed in
							</label>
						</div>

						<button
							type="submit"
							className="w-full py-3.5 bg-white text-black rounded-lg text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-200 transition-colors duration-300 mt-2">
							Sign in
						</button>
					</form>
				</div>

				<p className="mt-8 text-center text-xs text-neutral-500">
					Don't have an account?{" "}
					<Link
						to="/registro"
						className="text-white hover:text-neutral-300 transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white">
						Create one now
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;

