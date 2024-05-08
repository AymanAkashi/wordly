import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",

        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            backgroundSize: {
                "size-200": "200% 200%",
            },
            backgroundPosition: {
                "pos-0": "0% 0%",
                "pos-100": "100% 100%",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "image-fade": {
                    "0%": { opacity: "1", transform: "scale(1)" },
                    "25%": { opacity: "0", transform: "scale(0.5)" },
                    "75%": { opacity: "0", transform: "scale(0.5)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "cell-win": {
                    "0%": { transform: "rotateY(0deg)" },
                    "100%": { transform: "rotateY(360deg)" },
                },
                "bounce-rotate": {
                    "0%, 100%": {
                        transform: "translateY(-3%)",
                        rotate: "45deg",
                    },
                    "50%": { transform: "translateY(0)", rotate: "45deg" },
                },
                bounce: {
                    "0%, 100%": {
                        transform: "translateX(3%)",
                    },
                    "50%": { transform: "translateX(0)" },
                },
                "dash-rotate": {
                    "0%, 100%": {
                        backgroundSize: "100% 100%",
                        backgroundPosition: "0% 0%",
                    },
                    "50%": {
                        backgroundSize: "200% 200%",
                        backgroundPosition: "100% 100%",
                    },
                },
                "fading-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "color-change": "color-change 2s infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "image-fade": "image-fade 1s ease-in-out",
                "cell-win": "cell-win 2s ease-in-out",
                "fading-up": "fading-up 1s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("daisyui")],
} satisfies Config;

export default config;
