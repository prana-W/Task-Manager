import React, { useState, useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { ThemeContext, ThemeProvider, useTheme } from "./contexts";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { reduceTime } from "./features/tasks/taskSlice";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const dispatch = useDispatch();

  let intervalReference;

  const updateTime = () => {
    dispatch(reduceTime());
  }

  useEffect(() => {

    clearInterval(intervalReference);

    intervalReference = setInterval(updateTime, 1000); //add the same time interval as in the timeSlice method
  }, []);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const toLightTheme = () => {
    setThemeMode("light");
  };

  const toDarkTheme = () => {
    setThemeMode("dark");
  };

  return (
    <>
      <ThemeProvider value={{ themeMode, toLightTheme, toDarkTheme }}>
        <Header />
      </ThemeProvider>
      <Toaster position="top-left" />
      <Outlet />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
