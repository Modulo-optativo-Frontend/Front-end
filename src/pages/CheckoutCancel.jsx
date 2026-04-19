import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../components/layout/SiteFooter.jsx";
import { Button } from "../components/ui/Button.jsx";
import { getAuthToken, clearAuth } from "../lib/auth.js";

export function CheckoutCancel() {
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
					<p className="sl-kicker">Pago cancelado</p>
					<div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center border border-[rgba(255,123,123,0.45)] bg-[rgba(255,123,123,0.12)] text-3xl text-(--color-error)">
						!
					</div>
					<h1 className="sl-display mx-auto mt-6 max-w-2xl text-3xl font-semibold md:text-5xl">
						El pago no se ha completado
					</h1>
					<p className="sl-copy mx-auto mt-4 max-w-2xl text-sm md:text-base">
						No se ha realizado ningún cargo. Puedes volver al carrito para
						revisar tu pedido o intentarlo de nuevo cuando quieras.
					</p>
					<div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
						<div className="sl-panel-soft p-4">
							<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
								Pago
							</p>
							<p className="sl-display mt-3 text-lg font-semibold text-(--color-error)">
								Cancelado
							</p>
						</div>
						<div className="sl-panel-soft p-4">
							<p className="text-[10px] uppercase tracking-[0.28em] text-(--color-gray)">
								Estado
							</p>
							<p className="sl-display mt-3 text-lg font-semibold">
								Disponible
							</p>
						</div>
					</div>
					<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
						<Button
							variant="secondary"
							onClick={() => navigate("/carrito")}
							className="sm:min-w-52">
							Volver al carrito
						</Button>
						<Button
							onClick={() => navigate("/checkout")}
							className="sm:min-w-52">
							Reintentar pago
						</Button>
					</div>
				</section>
			</main>
			<SiteFooter />
		</div>
	);
}
