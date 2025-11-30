import { Link } from "react-router-dom";

function Login() {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<Link
						to="/"
						className="inline-flex items-center gap-2 mb-6">
						<div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-xs font-semibold text-white">
							SL
						</div>
						<span className="text-sm font-semibold uppercase text-slate-900" style={{ letterSpacing: '0.2em' }}>
							SilverLine
						</span>
					</Link>
					<h1 className="text-3xl font-semibold text-slate-900 mb-2">
						Iniciar sesión
					</h1>
					<p className="text-sm text-slate-500">
						Accede a tu cuenta de SilverLine
					</p>
				</div>

				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-2">
							Email
						</label>
						<input
							type="email"
							className="w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
							placeholder="tu@email.com"
							style={{ padding: '10px 16px' }}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-700 mb-2">
							Contraseña
						</label>
						<input
							type="password"
							className="w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
							placeholder="••••••••"
							style={{ padding: '10px 16px' }}
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-slate-900 text-white rounded-lg hover:bg-black transition-colors font-medium"
						style={{ padding: '10px 16px' }}>
						Iniciar sesión
					</button>
				</form>

				<p className="text-center text-sm text-slate-500 mt-6">
					¿No tienes cuenta?{" "}
					<Link
						to="/registro"
						className="text-slate-900 font-medium hover:underline">
						Crear cuenta
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
