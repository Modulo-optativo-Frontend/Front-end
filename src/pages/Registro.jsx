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
		<div className="font-mono flex min-h-screen items-center justify-center bg-(--color-surface) px-4">
			<div className="w-full max-w-md border border-(--color-border) bg-(--color-surface)">
				{/* HEADER */}
				<div className="border-b border-(--color-border) p-3">
					<p className="text-xs font-bold uppercase">
						000100 REGISTER-ACCESS-DIVISION
					</p>
					<p className="text-xs font-bold uppercase">
						000200 MODULE: NEW-USER-CREATION.......... STATUS: ACTIVE
					</p>
				</div>

				<form
					onSubmit={handleRegistroSubmit}
					className="p-6">
					{/* NOMBRE */}
					<div className="mb-4">
						<label className="mb-1 block text-xs font-bold uppercase">
							FIELD: NOMBRE-USUARIO
						</label>
						<input
							type="text"
							value={nombreUsuario}
							onChange={(event) => setNombreUsuario(event.target.value)}
							className="w-full border border-black bg-white px-3 py-2 font-mono text-xs uppercase focus:outline-none focus:bg-[#f2f2f2]"
						/>
					</div>

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
							className="w-full border border-(--color-border) bg-(--color-surface) px-3 py-2 font-mono text-xs focus:outline-none focus:bg-(--color-gray-light)"
						/>
					</div>

					{errorRegistro ? (
						<div className="mb-4 border border-dashed border-(--color-border) p-2">
							<p className="text-xs font-bold uppercase">
								[!] FAULT: {errorRegistro}
							</p>
						</div>
					) : null}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full">
						{isSubmitting ? "[ ] CREANDO..." : "[+] CREAR-CUENTA"}
					</Button>
				</form>

				<div className="border-t border-dashed border-(--color-border) px-6 py-3">
					<p className="text-xs uppercase">
						[?] YA-TIENES-CUENTA &gt;{" "}
						<Link
							to="/login"
							className="font-bold underline">
							INICIA-SESION
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
