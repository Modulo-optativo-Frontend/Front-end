import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { getAuthToken, clearAuth } from "../../lib/auth.js";

export function CheckoutSuccess() {
	const navigate = useNavigate();
	const authToken = getAuthToken();

	return (
		<div className="sl-page flex min-h-screen flex-col">
			<SiteHeader
				authToken={authToken}
				onLogout={() => {
					clearAuth();
					navigate("/");
				}}
			/>
			<main className="mx-auto flex w-full max-w-4xl flex-1 items-center px-4 py-12">
				<section className="sl-panel w-full p-8 text-center md:p-12">
					<p className="sl-kicker">Pedido confirmado</p>
					<div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center border border-[rgba(124,247,212,0.45)] bg-[rgba(124,247,212,0.12)] text-3xl text-(--color-signal)">
						OK
					</div>
					<h1 className="sl-display mx-auto mt-6 max-w-2xl text-3xl font-semibold md:text-5xl">
						Tu compra se ha completado correctamente
					</h1>
					<p className="sl-copy mx-auto mt-4 max-w-2xl text-sm md:text-base">
						Hemos recibido el pago y te enviaremos la confirmación por correo.
						Ahora empezaremos a preparar tu pedido.
					</p>
					<div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
						<div className="sl-panel-soft p-4">
							<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
								Estado
							</p>
							<p className="sl-display mt-3 text-lg font-semibold text-(--color-signal)">
								Confirmado
							</p>
						</div>
						<div className="sl-panel-soft p-4">
							<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
								Correo
							</p>
							<p className="sl-display mt-3 text-lg font-semibold">
								Email enviado
							</p>
						</div>
						<div className="sl-panel-soft p-4">
							<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
								Siguiente paso
							</p>
							<p className="sl-display mt-3 text-lg font-semibold">
								Preparación
							</p>
						</div>
					</div>
					<Button
						onClick={() => navigate("/")}
						className="mt-10 w-full sm:w-auto">
						Volver al inicio
					</Button>
				</section>
			</main>
			<SiteFooter />
		</div>
	);
}
