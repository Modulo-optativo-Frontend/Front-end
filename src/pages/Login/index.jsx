import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button.jsx";
import { FeedbackMessage } from "../../components/ui/FeedBackMessage.jsx";
import { Link } from "../../components/ui/Link.jsx";
import { apiFetch } from "../../lib/api.js";
import { getAuthToken, setAuthToken, setAuthUser } from "../../lib/auth.js";

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
		<div className="sl-page flex min-h-screen items-center justify-center px-4">
			<div className="sl-panel w-full max-w-md">
				{/* HEADER */}
				<div className="border-b border-(--color-border) p-3">
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-warning)">
						Iniciar sesión
					</p>
					<p className="mt-1 text-xs tracking-[0.08em] text-(--color-gray)">
						Accede a tu cuenta para continuar con tu compra.
					</p>
				</div>

				<form
					onSubmit={handleLoginSubmit}
					className="p-6">
					{/* EMAIL */}
					<div className="mb-4">
						<label
							htmlFor="login-email"
							className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-(--color-gray)">
							Correo electrónico
						</label>
						<input
							id="login-email"
							type="email"
							value={emailUsuario}
							onChange={(event) => setEmailUsuario(event.target.value)}
							className="sl-input text-xs uppercase"
							autoComplete="email"
						/>
					</div>

					{/* PASSWORD */}
					<div className="mb-4">
						<label
							htmlFor="login-password"
							className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-(--color-gray)">
							Contraseña
						</label>
						<input
							id="login-password"
							type="password"
							value={passwordUsuario}
							onChange={(event) => setPasswordUsuario(event.target.value)}
							className="sl-input text-xs"
							autoComplete="current-password"
						/>
					</div>
					{errorLogin ? (
						<FeedbackMessage
							message={errorLogin}
							successMatch="__no_match__"
							className="mb-4 text-xs"
						/>
					) : null}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full">
						{isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
					</Button>
				</form>

				<div className="border-t border-dashed border-(--color-border) px-6 py-3">
					<p className="text-xs text-(--color-gray)">
						¿No tienes cuenta?{" "}
						<Link
							to="/registro"
							variant="text">
							Regístrate
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
