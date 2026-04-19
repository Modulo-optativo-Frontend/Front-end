import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { FeedbackMessage } from "../components/ui/FeedBackMessage.jsx";
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
			setAuthUser({
				name: nombreRespuesta || nombreUsuario,
				email: emailUsuario,
			});
			navigate("/");
		} catch (error) {
			setErrorRegistro(error.message || "No se pudo crear la cuenta");
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
						Crear cuenta
					</p>
					<p className="mt-1 text-xs tracking-[0.08em] text-(--color-gray)">
						Regístrate para guardar tu pedido y comprar más rápido.
					</p>
				</div>

				<form
					onSubmit={handleRegistroSubmit}
					className="p-6">
					{/* NOMBRE */}
					<div className="mb-4">
						<label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-(--color-gray)">
							Nombre
						</label>
						<input
							type="text"
							value={nombreUsuario}
							onChange={(event) => setNombreUsuario(event.target.value)}
							className="sl-input text-xs uppercase"
						/>
					</div>

					{/* EMAIL */}
					<div className="mb-4">
						<label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-(--color-gray)">
							Correo electrónico
						</label>
						<input
							type="email"
							value={emailUsuario}
							onChange={(event) => setEmailUsuario(event.target.value)}
							className="sl-input text-xs uppercase"
						/>
					</div>

					{/* PASSWORD */}
					<div className="mb-4">
						<label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-(--color-gray)">
							Contraseña
						</label>
						<input
							type="password"
							value={passwordUsuario}
							onChange={(event) => setPasswordUsuario(event.target.value)}
							className="sl-input text-xs"
						/>
					</div>

					{errorRegistro ? (
						<FeedbackMessage
							message={errorRegistro}
							successMatch="__no_match__"
							className="mb-4 text-xs"
						/>
					) : null}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full">
						{isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
					</Button>
				</form>

				<div className="border-t border-dashed border-(--color-border) px-6 py-3">
					<p className="text-xs text-(--color-gray)">
						¿Ya tienes cuenta?{" "}
						<Link
							to="/login"
							className="font-bold underline text-(--color-warning)">
							Inicia sesión
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
