import React, { useState, useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { ThemeContext, ThemeProvider, useTheme } from "./contexts";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  reduceTime,
  updateOfflineTime,
  updateLastSeen,
} from "./features/tasks/taskSlice";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const dispatch = useDispatch();

  const lastSeenTime = useSelector((state) => state.task.lastSeen);

  let intervalReference; //this is a reference for the setInterval used

  //This dispatches a action (which updates the time of ongoing task), it reduces the amount of time the user was inactive (offline)
  useEffect(() => {
    const timeDiff = Math.floor(Date.now() - lastSeenTime);

    if (timeDiff) {
      dispatch(updateOfflineTime(timeDiff));
    }
  }, []);


  // Updates the lastSeen time on every refresh or reload or load
  useEffect (() => {

    window.addEventListener('beforeunload', () => {
      dispatch(updateLastSeen(Date.now()))
    })
  
  }, [])

  //! (warning) change here
  //This is to update the timeRemaining in all ongoing tasks
  useEffect(() => {
    clearInterval(intervalReference);

    intervalReference = setInterval(() => {
      dispatch(reduceTime());
    }, 1000); //add the same time interval as in the timeSlice method
  }, []);

  //This is used to update the theme
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
