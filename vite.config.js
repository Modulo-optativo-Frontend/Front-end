import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			"/api": {
				target: "http://ecommerce-backend-dev:3000",
				changeOrigin: true,
			},
			"/images": {
				target: "http://ecommerce-backend-dev:3000",
				changeOrigin: true,
			},
		},
	},
});
