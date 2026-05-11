"use client"

import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => { }
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') setIsDarkMode(true);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev)
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}