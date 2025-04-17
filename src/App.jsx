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
  //todo:
  //1. Add everything from store and Context API to local-storage
  //2. Retrieve evrything from localStorage to store and Context API when loaded/rendered first time
  //3. Make a last_seen value in the store, that will keep track of the last time the data was updated, subtract the stored time and current time (at loading/first-time rendering) and see the Math.floor of the value. If greater than 1, then subtract it from the timeRemaining of every task whose status was ongoing

  const [themeMode, setThemeMode] = useState("light");
  const dispatch = useDispatch();

  const lastSeenTime = useSelector((state) => state.task.lastSeen); 

  let intervalReference;
  let lastSeenUpdateRef; //this keeps track of the lastSeenUpdate interval (which updates the lastSeen time in evry few ms)

  //This dispatches a action (which updates the ime of ongoing task), it reduces the amount of time the user was inactive (offline)
  useEffect(() => {
    console.log(lastSeenTime);
    const timeDiff = Math.floor(Date.now() - lastSeenTime);

    if (timeDiff) {
      dispatch(updateOfflineTime(timeDiff));
    }
  }, []);

  //! (warning) change time here
  //This is used to update the lastSeen time every few ms (make it quick for better precision)
  useEffect(() => {
    clearInterval(lastSeenUpdateRef);

    lastSeenUpdateRef = setInterval(() => {
      dispatch(updateLastSeen(Date.now()));
    }, 1);
  }, []);

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
