import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { apiFetch } from "../lib/api.js";
import { getAuthToken, setAuthToken, setAuthUser } from "../lib/auth.js";

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
		<div className="font-mono flex min-h-screen items-center justify-center bg-white px-4">
			<div className="w-full max-w-md border border-black bg-white">
				{/* HEADER */}
				<div className="border-b border-black p-3">
					<p className="text-xs font-bold uppercase">
						000100 LOGIN-ACCESS-DIVISION
					</p>
					<p className="text-xs font-bold uppercase">
						000200 MODULE: USER-AUTH-INPUT........... STATUS: ACTIVE
					</p>
				</div>

				<form
					onSubmit={handleLoginSubmit}
					className="p-6">
					{/* EMAIL */}
					<div className="mb-4">
						<label className="mb-1 block text-xs font-bold uppercase">
							FIELD: EMAIL-ADDRESS
						</label>
						<input
							type="email"
							value={emailUsuario}
							onChange={(event) => setEmailUsuario(event.target.value)}
							className="w-full border border-black bg-white px-3 py-2 font-mono text-xs uppercase focus:outline-none focus:bg-[#f2f2f2]"
						/>
					</div>

					{/* PASSWORD */}
					<div className="mb-4">
						<label className="mb-1 block text-xs font-bold uppercase">
							FIELD: PASSWORD-DATA
						</label>
						<input
							type="password"
							value={passwordUsuario}
							onChange={(event) => setPasswordUsuario(event.target.value)}
							className="w-full border border-black bg-white px-3 py-2 font-mono text-xs focus:outline-none focus:bg-[#f2f2f2]"
						/>
					</div>

					{errorLogin ? (
						<div className="mb-4 border border-dashed border-black p-2">
							<p className="text-xs font-bold uppercase">
								[!] FAULT: {errorLogin}
							</p>
						</div>
					) : null}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full">
						{isSubmitting ? "[ ] PROCESANDO..." : "[>] INICIAR-SESION"}
					</Button>
				</form>

				<div className="border-t border-dashed border-black px-6 py-3">
					<p className="text-xs uppercase">
						[?] SIN-CUENTA &gt;{" "}
						<Link
							to="/registro"
							className="font-bold underline">
							REGISTRATE
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
