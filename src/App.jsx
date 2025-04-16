import React, { useState, useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { ThemeContext, ThemeProvider, useTheme } from "./contexts";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { reduceTime } from "./features/tasks/taskSlice";

function App() {

  //todo: 
  //1. Add everything from store and Context API to local-storage
  //2. Retrieve evrything from localStorage to store and Context API when loaded/rendered first time
  //3. Make a last_seen value in the store, that will keep track of the last time the data was updated, subtract the stored time and current time (at loading/first-time rendering) and see the Math.floor of the value. If greater than 1, then subtract it from the timeRemaining of every task whose status was ongoing

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
