import React, { useEffect, useState } from "react";

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "system";
    });

    const [resolvedTheme, setResolvedTheme] = useState(
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            : theme
    );

    useEffect(() => {
        if (theme === "system") {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setResolvedTheme(systemPrefersDark ? "dark" : "light");
        } else {
            setResolvedTheme(theme);
        }
    }, [theme]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
        document.documentElement.classList.toggle("light", resolvedTheme !== "dark");
        if (theme !== "system") {
            localStorage.setItem("theme", theme);
        }
    }, [resolvedTheme, theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = (e) => {
            if (theme === "system") {
                setResolvedTheme(e.matches ? "dark" : "light");
            }
        };
        mediaQuery.addEventListener("change", handleSystemThemeChange);
        return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }, [theme]);

    const setThemePreference = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setThemePreference }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const ThemeContext = React.createContext();