import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { dark } from "@clerk/themes";
import localFont from "next/font/local";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import ContextProvider from "@/context/ContextProvider";
import { Jockey_One } from "next/font/google";

const TechnoRacer = localFont({ src: "../public/fonts/TechnoRaceItalic.otf" });
const JockeyOne = Jockey_One({
    display: "swap",
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Wordly - Learn a new language with ease",
    description: "Learn a new language with ease",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: "#22c55e",
                },
            }}
        >
            <html lang="en" className="dark">
                <body
                    className={`${TechnoRacer.className} ${JockeyOne.className} min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-bl from-white to-gray-400 dark:from-black dark:to-gray-800 text-black dark:text-white transition-all delay-75 duration-100 `}
                >
                    <ContextProvider>
                        <ThemeProvider>
                            {/* <NavBar /> */}
                            {children}
                            <SpeedInsights />
                            {/* <div></div> */}
                        </ThemeProvider>
                    </ContextProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
