import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { apiFetch } from "../lib/api.js";
import { getAuthToken, setAuthToken, setAuthUser } from "../lib/auth.js";

export function Registro() {
	const navigate = useNavigate();
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [emailUsuario, setEmailUsuario] = useState("");
	const [passwordUsuario, setPasswordUsuario] = useState("");
	const [errorRegistro, setErrorRegistro] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (getAuthToken()) {
			navigate("/");
		}
	}, [navigate]);

	async function handleRegistroSubmit(event) {
		event.preventDefault();
		setErrorRegistro("");

		if (!nombreUsuario || !emailUsuario || !passwordUsuario) {
			setErrorRegistro("Nombre, email y contraseña son obligatorios");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await apiFetch("/api/usuarios/registrar", {
				method: "POST",
				body: {
					name: nombreUsuario,
					email: emailUsuario,
					password: passwordUsuario,
				},
			});

			const tokenRespuesta = response?.data?.token;
			const nombreRespuesta = response?.data?.nombre;

			setAuthToken(tokenRespuesta);
			setAuthUser({ name: nombreRespuesta || nombreUsuario, email: emailUsuario });
			navigate("/");
		} catch (error) {
			setErrorRegistro(error.message || "No se pudo crear la cuenta");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-white px-4">
			<div className="w-full max-w-md rounded-2xl border border-(--color-border) bg-white p-8">
				<h1 className="text-2xl font-semibold text-black">Crear cuenta</h1>

				<form onSubmit={handleRegistroSubmit} className="mt-6 space-y-4">
					<div>
						<label className="mb-2 block text-sm text-(--color-gray-dark)">Nombre</label>
						<input
							type="text"
							value={nombreUsuario}
							onChange={(event) => setNombreUsuario(event.target.value)}
							className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm text-(--color-gray-dark)">Email</label>
						<input
							type="email"
							value={emailUsuario}
							onChange={(event) => setEmailUsuario(event.target.value)}
							className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm text-(--color-gray-dark)">Contraseña</label>
						<input
							type="password"
							value={passwordUsuario}
							onChange={(event) => setPasswordUsuario(event.target.value)}
							className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm"
						/>
					</div>

					{errorRegistro ? (
						<p className="text-sm text-(--color-error)">{errorRegistro}</p>
					) : null}

					<Button type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
					</Button>
				</form>

				<p className="mt-6 text-sm text-(--color-gray)">
					¿Ya tienes cuenta? <Link to="/login" className="text-(--color-blue)">Inicia sesión</Link>
				</p>
			</div>
		</div>
	);
}
