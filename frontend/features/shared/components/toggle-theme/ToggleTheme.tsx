'use client'
import { MouseEvent, useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa6';
import { IoSunny } from 'react-icons/io5';
export const ToggleTheme = () => {
    const [theme, setTheme] = useState<"dark" | "light" | string>("");
    const toggleTheme = (e: MouseEvent<HTMLDivElement>) => {
        setTheme(theme === 'dark' ? "light" : "dark");
        const $root: HTMLDocument = (e.currentTarget.getRootNode() as HTMLDocument);
        $root.documentElement.classList.replace(theme, theme === 'dark' ? "light" : "dark");
        localStorage.setItem('theme', theme === 'dark' ? "light" : "dark");
    }
    useEffect(() => {
        if (window) {
            const localStorageTheme = localStorage.getItem('theme');
            setTheme(localStorageTheme || window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light');
            window.document.documentElement.classList.add(localStorageTheme || (theme === 'dark' ? "light" : "dark"));
        }
    }, []);
    return (
        <div className='cursor-pointer text-white' onClick={toggleTheme}>
            {
                theme === 'dark' ? <FaMoon /> : <IoSunny />
            }
        </div>
    )
}