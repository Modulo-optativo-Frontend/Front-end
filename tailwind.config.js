/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			// Espaciado compatible con Bootstrap
			spacing: {
				0: "0",
				1: "0.25rem", // 4px
				2: "0.5rem", // 8px
				3: "1rem", // 16px
				4: "1.5rem", // 24px
				5: "3rem", // 48px
				// Mantener algunos valores de Tailwind útiles
				6: "4rem", // 64px
				8: "2rem", // 32px (útil)
				10: "2.5rem", // 40px (útil)
				12: "3rem", // 48px (igual a 5)
				14: "3.5rem", // 56px
				16: "4rem", // 64px (igual a 6)
				20: "5rem", // 80px
				24: "6rem", // 96px
			},
		},
	},
	plugins: [],
};
