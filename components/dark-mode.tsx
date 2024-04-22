"use client";
import React, { useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const DarkMode = () => {
    const [darkMode, setDarkMode] = React.useState(() => {
        return localStorage.getItem("theme") === "dark" ? true : false;
    });
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);
    return (
        <button
            className="p-1 rounded-full shadow-md  transition-colors duration-100 delay-75 hover:shadow-lg dark:hover:shadow-lg hover:scale-105 dark:hover:text-yellow-500 hover:text-sky-950"
            type="button"
            title={`Switch to ${darkMode ? "light" : "dark"} mode`}
            onClick={() => {
                localStorage.setItem("theme", darkMode ? "light" : "dark");
                document.documentElement.classList.toggle("dark");
                setDarkMode((prev) => !prev);
            }}
        >
            {!darkMode ? (
                <FiMoon className="h-6 w-6 sm:w-8 sm:h-8" />
            ) : (
                <FiSun className="h-6 w-6 sm:w-8 sm:h-8" />
            )}
        </button>
    );
};

export default DarkMode;
