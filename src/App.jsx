import React, {useState, useEffect} from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import {ThemeContext, ThemeProvider, useTheme} from './contexts'

function App() {

  const [themeMode, setThemeMode] = useState('light')

  useEffect (() => {

    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(themeMode)

  }, [themeMode])

  const toLightTheme = () => {
    setThemeMode('light')
  }

  const toDarkTheme = () => {
    setThemeMode('dark')
  }

  return (
    <>
    <ThemeProvider value={{themeMode, toLightTheme, toDarkTheme}}>
      <Header/>
      </ThemeProvider>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
