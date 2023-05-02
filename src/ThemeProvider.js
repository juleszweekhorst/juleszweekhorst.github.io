import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './contexts/ThemeContext';

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState(themes.dark);

    function changeTheme(theme) {
        setTheme(theme);
    }

    useEffect(() => {
        switch (theme) {
        case themes.light:
            document.body.classList.add('white-content');
            break;
        case themes.dark:
        default:
            document.body.classList.remove('white-content');
            break;
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}