// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Registro from "./pages/registro.jsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/registro" element={<Registro />} />
		</Routes>
	);
}

export default App;
