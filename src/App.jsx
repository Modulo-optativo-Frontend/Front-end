import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Detalle } from "./pages/Detalle";
import { Carrito } from "./pages/Carrito";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { Checkout } from "./pages/Checkout";
import { CheckoutSuccess } from "./pages/Checkout/CheckoutSuccess";
import { CheckoutCancel } from "./pages/Checkout/CheckoutCancel";
import { MisPedidos } from "./pages/MisPedidos";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/DashboardAdmin";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/catalogo"
				element={<Catalogo />}
			/>
			<Route
				path="/detalle/:id"
				element={<Detalle />}
			/>
			<Route
				path="/carrito"
				element={<Carrito />}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/registro"
				element={<Registro />}
			/>

			<Route
				path="/checkout"
				element={<Checkout />}
			/>

			<Route
				path="/checkout/success"
				element={<CheckoutSuccess />}
			/>
			<Route
				path="/checkout/cancel"
				element={<CheckoutCancel />}
			/>
			<Route
				path="/mis-pedidos"
				element={
					<ProtectedRoute>
						<MisPedidos />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<DashboardUser />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin"
				element={
					<ProtectedRoute adminOnly>
						<DashboardAdmin />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;
