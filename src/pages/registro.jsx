import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { getAuthToken, setAuthToken, setAuthUser } from "../lib/auth.js";

function Registro() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (getAuthToken()) {
			navigate("/");
		}
	}, [navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");

		if (!name || !email || !password) {
			setError("Nombre, email y contraseña son obligatorios");
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await apiFetch("/api/usuarios/registrar", {
				method: "POST",
				body: { name, email, password },
			});
			const { token, nombre } = response.data || {};
			setAuthToken(token);
			setAuthUser({ name: nombre || name, email });
			navigate("/");
		} catch (err) {
			setError(err.message || "No se pudo crear la cuenta");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center px-4 sl-page"
			style={{ backgroundColor: "var(--color-white)" }}>
			<div className="w-full max-w-md auth-panel p-8">
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
					<Link
						to="/"
						className="inline-flex mt-4 rounded-full text-xs secondary-btn"
						style={{ padding: "0.375rem 0.75rem" }}>
						← Volver a la landing
					</Link>
				</div>

				<form
					className="space-y-4"
					onSubmit={handleSubmit}>
					<div>
						<label
							className="block text-sm font-medium mb-2"
							style={{ color: "var(--color-gray-dark)" }}>
							Nombre completo
						</label>
						<input
							type="text"
							value={name}
							onChange={(event) => setName(event.target.value)}
							className="w-full rounded-lg focus:outline-none focus:ring-2 transition-all sl-input"
							placeholder="Juan Pérez"
							style={{
								padding: "0.625rem 1rem",
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
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="w-full rounded-lg focus:outline-none focus:ring-2 transition-all sl-input"
							placeholder="tu@email.com"
							style={{
								padding: "0.625rem 1rem",
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
							className="w-full rounded-lg focus:outline-none focus:ring-2 transition-all sl-input"
							placeholder="••••••••"
							style={{
								padding: "0.625rem 1rem",
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
						className="w-full rounded-lg transition-colors hover:opacity-90 font-medium disabled:opacity-60 primary-btn"
						style={{
							padding: "0.625rem 1rem",
							backgroundColor: "var(--color-blue)",
							color: "var(--color-white)",
						}}>
						{isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
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
