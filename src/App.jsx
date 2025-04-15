import React, {useState, useEffect} from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import {ThemeContext, ThemeProvider, useTheme} from './contexts'
import { Analytics } from "@vercel/analytics/react"

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
      <Analytics />
    </>
  );
}

export default App;
