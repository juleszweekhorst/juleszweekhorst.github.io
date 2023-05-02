// React modules
import React, { useState } from "react";
// Navbar
import Navigation from "./Navigation";
// Database
import { DbProvider } from "./DbProvider";
// Style
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeContext } from "./contexts/ThemeContext";
import './styles/styles.scss';

function App() {
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());

  return (
    <DbProvider>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <div className={`theme-${theme}`}>
            <div className="App">
              <Navigation/>
            </div>
        </div>
      </ThemeContext.Provider>
    </DbProvider>
  );
}

export default App;

