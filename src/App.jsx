import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Detalle } from "./pages/Detalle";
import { Carrito } from "./pages/Carrito";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { Checkout } from "./pages/Checkout";
import { CheckoutSuccess } from "./pages/CheckoutSuccess";
import { CheckoutCancel } from "./pages/CheckoutCancel";

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
		</Routes>
	);
}

export default App;
