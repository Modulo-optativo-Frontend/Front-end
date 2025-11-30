import { Link } from "react-router-dom";

function Registro() {
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
						Crear cuenta
					</h1>
					<p className="text-sm text-slate-500">Únete a SilverLine hoy mismo</p>
				</div>

				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-2">
							Nombre completo
						</label>
						<input
							type="text"
							className="w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
							placeholder="Juan Pérez"
							style={{ padding: '10px 16px' }}
						/>
					</div>

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
						Crear cuenta
					</button>
				</form>

				<p className="text-center text-sm text-slate-500 mt-6">
					¿Ya tienes cuenta?{" "}
					<Link
						to="/login"
						className="text-slate-900 font-medium hover:underline">
						Iniciar sesión
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Registro;
