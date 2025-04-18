import React, { useState, useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts";
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

  //This dispatches a action (which updates the time of ongoing task), it reduces the amount of time the user was inactive (offline)
  useEffect(() => {
    const timeDiff = ((Date.now() - lastSeenTime) / 60000).toFixed(2);

    if (timeDiff) {
      dispatch(updateOfflineTime(timeDiff));
    }

    const themeFromStorage = localStorage.getItem("theme");

    themeFromStorage && setThemeMode(themeFromStorage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (!lastSeenTime || lastSeenTime-Date.now() >= 5000) return;
    var lastSeenUpdateRef = setInterval(() => {
      dispatch(updateLastSeen(Date.now()));
    }, 100);

    return () => clearInterval(lastSeenUpdateRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //This is to update the timeRemaining in all ongoing tasks

  useEffect(() => {
    var intervalReference = setInterval(() => {
      dispatch(reduceTime());
    }, 600); //add the same time interval as in the timeSlice method

    return () => clearInterval(intervalReference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //This is used to update the theme
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const toLightTheme = () => {
    setThemeMode("light");
    localStorage.setItem("theme", "light");
  };

  const toDarkTheme = () => {
    setThemeMode("dark");
    localStorage.setItem("theme", "dark");
  };

  return (
    <>
      <ThemeProvider value={{ themeMode, toLightTheme, toDarkTheme }}>
        <Header />
      </ThemeProvider>
      <Toaster position="bottom-left" />
      <Outlet />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
