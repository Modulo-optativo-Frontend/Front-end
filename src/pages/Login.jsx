import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { apiFetch } from "../lib/api.js";
import {
	getAuthToken,
	setAuthToken,
	setAuthUser,
} from "../lib/auth.js";

export function Login() {
	const navigate = useNavigate();
	const [emailUsuario, setEmailUsuario] = useState("");
	const [passwordUsuario, setPasswordUsuario] = useState("");
	const [errorLogin, setErrorLogin] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (getAuthToken()) {
			navigate("/");
		}
	}, [navigate]);

	async function handleLoginSubmit(event) {
		event.preventDefault();
		setErrorLogin("");

		if (!emailUsuario || !passwordUsuario) {
			setErrorLogin("Email y contraseña son obligatorios");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await apiFetch("/api/usuarios/login", {
				method: "POST",
				body: {
					email: emailUsuario,
					password: passwordUsuario,
				},
			});

			const tokenRespuesta = response?.data?.token;
			const usuarioRespuesta = response?.data?.usuario;

			setAuthToken(tokenRespuesta);
			setAuthUser(usuarioRespuesta || { email: emailUsuario });
			navigate("/");
		} catch (error) {
			setErrorLogin(error.message || "No se pudo iniciar sesión");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-white px-4">
			<div className="w-full max-w-md rounded-2xl border border-(--color-border) bg-white p-8">
				<h1 className="text-2xl font-semibold text-black">
					Iniciar sesión
				</h1>

				<form
					onSubmit={handleLoginSubmit}
					className="mt-6 space-y-4">
					<div>
						<label className="mb-2 block text-sm text-(--color-gray-dark)">
							Email
						</label>
						<input
							type="email"
							value={emailUsuario}
							onChange={(event) =>
								setEmailUsuario(event.target.value)
							}
							className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm text-(--color-gray-dark)">
							Contraseña
						</label>
						<input
							type="password"
							value={passwordUsuario}
							onChange={(event) =>
								setPasswordUsuario(event.target.value)
							}
							className="w-full rounded-lg border border-(--color-border) px-3 py-2 text-sm"
						/>
					</div>

					{errorLogin ? (
						<p className="text-sm text-(--color-error)">
							{errorLogin}
						</p>
					) : null}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full">
						{isSubmitting ? "Accediendo..." : "Iniciar sesión"}
					</Button>
				</form>

				<p className="mt-6 text-sm text-(--color-gray)">
					¿No tienes cuenta?{" "}
					<Link
						to="/registro"
						className="text-(--color-blue)">
						Regístrate
					</Link>
				</p>
			</div>
		</div>
	);
}
