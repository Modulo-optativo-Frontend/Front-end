import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import HeroSection from "./HeroSection.jsx";
import { TrendingProductsSection } from "../../components/product/TrendingProductsSection.jsx";
import WhySilverLineSection from "./WhySilverLineSection.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { apiFetch } from "../../lib/api.js";
import { clearAuth, getAuthToken, getAuthUser, isAdminUser } from "../../lib/auth.js";
import { getProductoImageUrl } from "../../lib/media.js";

function Home() {
	const navigate = useNavigate();

	const [productos, setProductos] = useState([]);
	const [productosError, setProductosError] = useState("");
	const [isLoadingProductos, setIsLoadingProductos] = useState(true);
	const [cartMessage, setCartMessage] = useState("");

	const token = getAuthToken();

	function formatPrice(value) {
		return new Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
		}).format(value || 0);
	}

	useEffect(() => {
		async function loadProductos() {
			setIsLoadingProductos(true);
			setProductosError("");

			try {
				const response = await apiFetch("/api/productos");
				setProductos(response.data || []);
			} catch (error) {
				setProductosError(error.message || "No se pudieron cargar productos");
			} finally {
				setIsLoadingProductos(false);
			}
		}

		loadProductos();
	}, []);

	async function handleAddToCart(productoId) {
		if (!token) {
			navigate("/login");
			return;
		}

		setCartMessage("");

		try {
			await apiFetch("/api/carrito/items", {
				method: "POST",
				body: { productoId },
				token,
			});
			setCartMessage("Producto añadido al carrito.");
		} catch (error) {
			const mensajes = {
				"token requerido": "Debes iniciar sesión para añadir productos",
			};
			setCartMessage(
				mensajes[error.message] ??
					error.message ??
					"No se pudo añadir el producto.",
			);
		}
	}

	function goToDash(token) {
		if (!token) {
			return;
		}
		navigate(isAdminUser(getAuthUser()) ? "/admin" : "/dashboard");
	}

	function handleLogout() {
		clearAuth();
		navigate("/");
	}

	const productosDestacados = productos.slice(0, 5);
	const heroImageUrl = getProductoImageUrl(productos[0] || {});

	return (
		<div className="font-mono min-h-screen bg-(--color-surface) text-(--color-black) sl-page">
			<SiteHeader
				authToken={token}
				onLogout={handleLogout}
				dash={goToDash}
			/>

			<main>
				<HeroSection heroImageUrl={heroImageUrl} />
				<TrendingProductsSection
					productosDestacados={productosDestacados}
					productos={productos}
					cartMessage={cartMessage}
					isLoadingProductos={isLoadingProductos}
					productosError={productosError}
					formatPrice={formatPrice}
					handleAddToCart={handleAddToCart}
				/>
				<WhySilverLineSection />
			</main>

			<SiteFooter />
		</div>
	);
}

export default Home;
