import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { setAuthToken, setAuthUser } from "../lib/auth.js";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Email y contraseña son obligatorios");
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await apiFetch("/api/usuarios/login", {
				method: "POST",
				body: { email, password },
			});
			const { token, usuario } = response.data || {};
			setAuthToken(token);
			setAuthUser(usuario || { email });
			navigate("/");
		} catch (err) {
			setError(err.message || "No se pudo iniciar sesión");
		} finally {
			setIsSubmitting(false);
		}
	};

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
						Iniciar sesión
					</h1>
					<p
						className="text-sm"
						style={{ color: "var(--color-gray)" }}>
						Accede a tu cuenta de SilverLine
					</p>
				</div>

				<form
					className="space-y-4"
					onSubmit={handleSubmit}>
					<div>
						<label
							className="block text-sm font-medium mb-2"
							style={{ color: "var(--color-gray-dark)" }}>
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
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
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="w-full rounded-lg focus:outline-none focus:ring-2 transition-all"
							placeholder="••••••••"
							style={{
								padding: "10px 16px",
								border: "1px solid var(--color-border)",
							}}
						/>
					</div>

					{error ? (
						<p
							className="text-sm"
							style={{ color: "var(--color-error)" }}>
							{error}
						</p>
					) : null}

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full rounded-lg transition-colors hover:opacity-90 font-medium disabled:opacity-60"
						style={{
							padding: "10px 16px",
							backgroundColor: "var(--color-blue)",
							color: "var(--color-white)",
						}}>
						{isSubmitting ? "Accediendo..." : "Iniciar sesión"}
					</button>
				</form>

				<p
					className="text-center text-sm mt-6"
					style={{ color: "var(--color-gray)" }}>
					¿No tienes cuenta?{" "}
					<Link
						to="/registro"
						className="font-medium hover:opacity-80 transition-opacity"
						style={{ color: "var(--color-blue)" }}>
						Crear cuenta
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
