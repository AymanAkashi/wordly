"use client";
import React, { useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const DarkMode = () => {
    const [darkMode, setDarkMode] = React.useState<boolean>(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localTheme = localStorage.getItem("theme");
            if (localTheme) {
                document.documentElement.classList.add(localTheme);
                setDarkMode(localTheme === "dark");
            } else {
                const darkMode = window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;
                document.documentElement.classList.add(
                    darkMode ? "dark" : "light"
                );
                setDarkMode(darkMode);
            }
        }
    });
    return (
        <button
            className="p-1 rounded-full shadow-md  transition-colors duration-100 delay-75 "
            type="button"
            title={`Switch to ${darkMode ? "light" : "dark"} mode`}
            onClick={() => {
                localStorage.setItem("theme", darkMode ? "light" : "dark");
                document.documentElement.classList.toggle("dark");
                setDarkMode((prev) => !prev);
            }}
        ></button>
    );
};

export default DarkMode;
