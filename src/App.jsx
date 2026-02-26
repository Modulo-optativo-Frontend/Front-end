import "./App.css";
import { Home } from "./pages/home";
import { Catalogo } from "./pages/catalogo";
import { Login } from "./pages/login";
import { Registro } from "./pages/registro";
import { DetalleProducto } from "./pages/detalle";

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
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/registro"
				element={<Registro />}
			/>
			<Route
				path="/productos/:id"
				element={<DetalleProducto />}
			/>
		</Routes>
	);
}

export default App;
